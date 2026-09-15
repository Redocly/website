import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { gameActions, isStepAnswered, selectScore, useGameState, type GameResult } from './store';
import { createPortal } from 'react-dom';
import { useGameConfig } from './config';
import { getStepKind } from './kinds';
import { MediaList } from './Media';
import { t, focusRing } from './theme';

const appear = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--docs-game-accent, var(--color-primary-main, #0044d4)) 45%, transparent), var(--docs-game-shadow, 0 8px 24px rgba(0,0,0,0.08)); }
  60% { box-shadow: 0 0 0 14px transparent, var(--docs-game-shadow, 0 8px 24px rgba(0,0,0,0.08)); }
`;

const wiggle = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

const flash = keyframes`
  0% { opacity: 0; }
  25% { opacity: 1; }
  100% { opacity: 0; }
`;

/** Full-screen dim that fades in and out once — grabs attention without blocking anything. */
const AttentionFlash = styled.div`
  position: fixed;
  inset: 0;
  z-index: 29;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.55) 100%);
  animation: ${flash} 1.8s ease-in-out both;
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Sticker = styled.div`
  position: absolute;
  top: -12px;
  right: 16px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid ${t.accent};
  background: ${t.accent};
  color: #fff;
  font-family: ${t.fontBase};
  font-weight: 600;
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 8px color-mix(in srgb, ${t.accent} 35%, transparent);
  animation: ${wiggle} 2.4s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    opacity: 0.9;
  }
`;

export const Card = styled.section<{ $highlight?: boolean }>`
  position: relative;
  margin: 16px 0 24px;
  padding: 16px 20px 18px;
  border: 1px solid ${t.border};
  border-left: 4px solid ${t.accent};
  border-radius: ${t.radius};
  background: ${t.surface};
  color: ${t.text};
  font-family: ${t.fontBase};
  box-shadow: ${t.shadow};
  animation: ${appear} 0.35s ease-out both;
  animation-delay: 0.55s; /* wait for the character to arrive */

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  & p:last-child {
    margin-bottom: 0;
  }
  ${({ $highlight }) =>
    $highlight &&
    css`
      border-left-color: ${t.accent};
      border-color: color-mix(in srgb, ${t.accent} 45%, ${t.border});
      animation: ${appear} 0.35s ease-out both, ${pulse} 1.8s ease-out 0.9s 3;
      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
  font-size: 13px;
  color: ${t.textMuted};
`;

export const Title = styled.strong`
  font-family: ${t.fontHeading};
  font-size: 17px;
  color: ${t.text};
`;

const Say = styled.div`
  color: ${t.text};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
`;

export const GhostButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: ${t.buttonPadding};
  border-radius: ${t.buttonRadius};
  border: 1px solid transparent;
  background: ${t.buttonSecondaryBg};
  color: ${t.buttonSecondaryText};
  font-family: ${t.fontBase};
  font-size: ${t.buttonFontSize};
  font-weight: ${t.buttonFontWeight};
  line-height: 1.4;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
  &:hover:not(:disabled) {
    background: ${t.buttonSecondaryBgHover};
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  ${focusRing}
`;

export const PrimaryButton = styled(GhostButton)`
  background: ${t.accent};
  color: ${t.onAccent};
  &:hover:not(:disabled) {
    background: ${t.accentHover};
  }
`;

type Props = { stepId: string; index: number };

export function StepBubble({ stepId, index }: Props) {
  const state = useGameState();
  const config = useGameConfig();
  const step = state.steps.find((s) => s.id === stepId);
  const cardRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = cardRef.current?.parentElement ?? cardRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, [stepId]);

  const answer = React.useCallback((optionId: string) => gameActions.answer(stepId, optionId), [stepId]);
  const setResult = React.useCallback((r: GameResult) => gameActions.setResult(stepId, r), [stepId]);
  const next = React.useCallback(() => gameActions.next(), []);
  const [flashDone, setFlashDone] = React.useState(false);

  if (!step) return null;

  const hasOptions = step.options.length > 0;
  const hasPairs = step.pairs.length > 0;
  const kindId = step.type ?? (hasPairs ? 'match' : hasOptions ? config.defaultQuizKind : 'tip');
  const kind = getStepKind(kindId) ?? getStepKind(hasOptions ? 'quiz' : 'tip')!;
  const Kind = kind.Component;

  const chosen = step.options.find((o) => o.id === state.answers[stepId]);
  const result = state.results[stepId];
  const answered = isStepAnswered(state, step);
  const requiresAnswer = kind.requiresAnswer ?? (hasOptions || hasPairs);
  const canContinue = !requiresAnswer || answered;
  const isLast = index === state.steps.length - 1;

  return (
    <Card
      ref={cardRef}
      data-component-name="DocsGame/StepBubble"
      data-kind={kindId}
      data-highlight={step.highlight || undefined}
      $highlight={step.highlight}
      aria-live="polite"
    >
      {step.highlight && !flashDone && typeof document !== 'undefined' &&
        createPortal(<AttentionFlash onAnimationEnd={() => setFlashDone(true)} />, document.body)}
      {step.highlight && <Sticker>{step.badge ?? 'Don’t skip this'}</Sticker>}
      <Header>
        <Title>{step.title ?? `Step ${index + 1}`}</Title>
        <span>
          {index + 1} / {state.steps.length}
        </span>
      </Header>

      {step.say.length > 0 && <Say>{step.say}</Say>}
      <MediaList items={step.media} />

      <Kind
        step={step}
        chosen={chosen}
        answered={answered}
        answer={answer}
        setResult={setResult}
        result={result}
        next={next}
        keyboard={config.keyboard}
        hints={config.keyboardHints}
      />

      <Footer>
        <GhostButton type="button" onClick={() => gameActions.prev()} disabled={index === 0}>
          {config.labels.back}
        </GhostButton>
        <PrimaryButton type="button" onClick={next} disabled={!canContinue}>
          {isLast ? config.labels.finish : config.labels.next}
        </PrimaryButton>
      </Footer>
    </Card>
  );
}

/* -------------------------------- FinishCard -------------------------------- */

const FinishWrap = styled(Card)`
  border-left-color: ${t.success};
  text-align: center;
`;

const Score = styled.div`
  font-family: ${t.fontHeading};
  font-size: 2.2rem;
  font-weight: 700;
  color: ${t.text};
  margin: 8px 0;
`;

export function FinishCard() {
  const state = useGameState();
  const { labels } = useGameConfig();
  const { correct, total } = selectScore(state);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <FinishWrap ref={ref} data-component-name="DocsGame/FinishCard" aria-live="polite">
      <Title>{labels.finishedTitle}</Title>
      {total > 0 && (
        <>
          <Score>
            {correct} / {total}
          </Score>
          <p>{correct === total ? labels.perfect : labels.good}</p>
        </>
      )}
      <Footer style={{ justifyContent: 'center' }}>
        <GhostButton type="button" onClick={() => gameActions.restart()}>
          {labels.playAgain}
        </GhostButton>
        <PrimaryButton type="button" onClick={() => gameActions.exit()}>
          {labels.backToDocs}
        </PrimaryButton>
      </Footer>
    </FinishWrap>
  );
}
