import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { gameActions, selectScore, useGameState } from './store';
import { Character, CHARACTER_ASPECT, type CharacterState } from './Character';
import { GhostButton, PrimaryButton } from './StepBubble';
import { useGameConfig } from './config';
import { t } from './theme';

/* ---------------------------------- banner --------------------------------- */

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 0 0 24px;
  padding: 12px 16px;
  border: 1px dashed var(--border-color-primary);
  border-radius: var(--border-radius-lg);
  background: var(--bg-color-tonal, var(--layer-color));
  color: var(--text-color-primary);

  & p {
    margin: 0;
  }
  & small {
    display: block;
    color: var(--text-color-secondary);
  }
`;

const BannerLead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/**
 * Rendered by the template at the top of the article.
 * Only shows when the page registered at least one `gameStep`.
 */
export function GameBanner() {
  const state = useGameState();
  const config = useGameConfig();
  const { pathname } = useLocation();

  // First client render: pick up `?mode=game` or the remembered mode, and reload progress on navigation.
  React.useEffect(() => {
    gameActions.hydrateMode();
  }, [pathname]);

  if (state.steps.length === 0) return null;

  if (state.mode === 'game') {
    return (
      <Banner data-component-name="DocsGame/Banner">
        <BannerLead>
          <Character state="talk" size={56} />
          <p>
            <strong>{config.title}</strong> — {config.playingText}
            {config.persistProgress && <small>Your progress is saved in this browser.</small>}
          </p>
        </BannerLead>
        <GhostButton type="button" onClick={() => gameActions.exit()}>
          {config.labels.exit}
        </GhostButton>
      </Banner>
    );
  }

  return (
    <Banner data-component-name="DocsGame/Banner">
      <BannerLead>
        <Character state="idle" size={56} />
        <p>
          <strong>{config.title}</strong>
          <small>
            {config.intro} ({state.steps.length} steps)
          </small>
        </p>
      </BannerLead>
      <PrimaryButton type="button" onClick={() => gameActions.start()}>
        {config.cta}
      </PrimaryButton>
    </Banner>
  );
}

/* ----------------------------------- HUD ----------------------------------- */

const Hud = styled.div`
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 8px 8px 16px;
  border-radius: 999px;
  border: 1px solid ${t.border};
  background: ${t.surface};
  color: ${t.text};
  box-shadow: ${t.shadow};
  font-family: ${t.fontBase};
  font-size: 13px;
  white-space: nowrap;

  & button {
    padding: 6px 12px;
    border-radius: 999px;
  }
`;

const Progress = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.button<{ $state: 'done' | 'active' | 'todo' }>`
  width: 10px;
  height: 10px;
  padding: 0 !important;
  border-radius: 50%;
  border: 1px solid ${t.accent};
  background: ${({ $state }) => ($state === 'todo' ? 'transparent' : t.accent)};
  opacity: ${({ $state }) => ($state === 'done' ? 0.55 : 1)};
  cursor: pointer;
  transform: ${({ $state }) => ($state === 'active' ? 'scale(1.3)' : 'none')};
  transition: transform 0.15s;
`;

/* -------------------------------- character -------------------------------- */

const Sign = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  min-width: 120px;
  max-width: 220px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 2px solid ${t.accent};
  background: ${t.surface};
  color: ${t.text};
  font-family: ${t.fontHeading};
  font-weight: 700;
  font-size: 13px;
  line-height: 1.3;
  text-align: center;
  box-shadow: ${t.shadow};
  white-space: normal;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 12px;
    height: 12px;
    background: ${t.surface};
    border-right: 2px solid ${t.accent};
    border-bottom: 2px solid ${t.accent};
    transform: translate(-50%, -6px) rotate(45deg);
  }
`;

const CharacterLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  pointer-events: none;
  will-change: transform;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s;

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.3s;
  }
`;

function useCharacterPosition(active: boolean, targetKey: string, CHARACTER_SIZE: number) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    if (!active) return;

    const measure = () => {
      const card =
        document.querySelector<HTMLElement>('[data-component-name="DocsGame/StepBubble"]') ||
        document.querySelector<HTMLElement>('[data-component-name="DocsGame/FinishCard"]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const width = Math.round(CHARACTER_SIZE * CHARACTER_ASPECT);
      const fitsLeft = rect.left - width - 12 > 8;
      // Stand to the left of the card when there is room, otherwise peek over its top-left corner.
      const x = fitsLeft ? rect.left + scrollX - width - 12 : rect.left + scrollX + 8;
      const y = fitsLeft ? rect.top + scrollY - CHARACTER_SIZE * 0.2 : rect.top + scrollY - CHARACTER_SIZE + 10;
      setPos({ x, y });
    };

    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    observer?.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [active, targetKey, CHARACTER_SIZE]);

  return pos;
}

function useCharacterState(RUN_DURATION_MS: number): CharacterState {
  const state = useGameState();
  const step = state.steps[state.currentIndex];
  const [running, setRunning] = React.useState(false);
  const targetKey = state.finished ? 'finish' : step?.id ?? '';

  // Every time the target changes, "run" for a moment, then settle into the step mood.
  React.useEffect(() => {
    if (state.mode !== 'game') return;
    setRunning(true);
    const t = window.setTimeout(() => setRunning(false), RUN_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [targetKey, state.mode, RUN_DURATION_MS]);

  if (running) return 'run';
  if (state.finished) return 'happy';
  if (!step) return 'idle';
  const chosen = state.answers[step.id];
  if (chosen) {
    const option = step.options.find((o) => o.id === chosen);
    return option?.correct ? 'happy' : 'confused';
  }
  const result = state.results[step.id];
  if (result) return result.correct ? 'happy' : 'confused';
  if (step.highlight && !step.mood) return 'point';
  const mood = step.mood as CharacterState | undefined;
  return mood && ['idle', 'talk', 'point', 'happy', 'confused'].includes(mood) ? mood : 'talk';
}

/**
 * Rendered once by the template. Portals the character and the HUD into <body>.
 */
export function GameOverlay() {
  const state = useGameState();
  const config = useGameConfig();
  const CHARACTER_SIZE = config.characterSize;
  const active = state.mode === 'game' && state.steps.length > 0;
  const targetKey = state.finished ? 'finish' : state.steps[state.currentIndex]?.id ?? '';
  const pos = useCharacterPosition(active, targetKey, CHARACTER_SIZE);
  const characterState = useCharacterState(config.runDurationMs);
  const currentStep = state.steps[state.currentIndex];
  const { correct, total } = selectScore(state);
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!active || !portalTarget) return null;

  return createPortal(
    <>
      <CharacterLayer
        data-component-name="DocsGame/Character"
        style={{
          opacity: pos ? 1 : 0,
          transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : undefined,
        }}
      >
        {currentStep?.highlight && characterState !== 'run' && !state.finished && (
          <Sign role="status">{currentStep.sign ?? 'Everyone skips this. Don’t.'}</Sign>
        )}
        <Character state={characterState} size={CHARACTER_SIZE} />
      </CharacterLayer>

      <Hud data-component-name="DocsGame/Hud" role="toolbar" aria-label="Mini-game progress">
        <Progress aria-label={`Step ${state.currentIndex + 1} of ${state.steps.length}`}>
          {state.steps.map((s, i) => (
            <Dot
              key={s.id}
              type="button"
              title={s.title ?? `Step ${i + 1}`}
              aria-label={s.title ?? `Step ${i + 1}`}
              $state={i < state.currentIndex || state.finished ? 'done' : i === state.currentIndex ? 'active' : 'todo'}
              onClick={() => gameActions.goTo(i)}
            />
          ))}
        </Progress>
        {total > 0 && (
          <span>
            Score {correct}/{total}
          </span>
        )}
        <GhostButton type="button" onClick={() => gameActions.exit()}>
          {config.labels.exit}
        </GhostButton>
      </Hud>
    </>,
    portalTarget,
  );
}
