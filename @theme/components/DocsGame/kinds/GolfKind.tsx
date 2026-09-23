import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import type { StepKindProps } from './types';
import { useArrowSelection } from './useArrowSelection';
import { Hint, FeedbackBox } from './Hint';
import { t, focusRing } from '../theme';
import { useGameConfig } from '../config';

/**
 * Golf: every answer is a hole with a flag. Aim with ← →, swing with Enter / Space.
 * A correct answer drops the ball into the hole; a wrong one lands in the water.
 */

const W = 600;
const H = 230;
const BALL_START = { x: W / 2, y: 200 };
const HOLE_Y = 78;
const SWING_MS = 950;

const Question = styled.div`
  margin-top: 12px;
  font-weight: 600;
  color: ${t.text};
`;

const Course = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  margin-top: 12px;
  border-radius: ${t.radiusSm};
  overflow: hidden;
  user-select: none;
`;

const wave = keyframes`
  0%, 100% { transform: skewY(0deg); }
  50% { transform: skewY(-6deg); }
`;

const Flag = styled.polygon<{ $aimed: boolean }>`
  transform-box: fill-box;
  transform-origin: left center;
  ${({ $aimed }) =>
    $aimed &&
    css`
      animation: ${wave} 0.7s ease-in-out infinite;
    `}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Labels = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, minmax(0, 1fr));
  gap: 8px;
  margin-top: 8px;
`;

const LabelButton = styled.button<{ $aimed: boolean; $status?: 'correct' | 'wrong' | 'missed' }>`
  padding: 8px 10px;
  border-radius: ${t.radiusSm};
  border: 1px solid ${({ $aimed }) => ($aimed ? t.accent : t.border)};
  box-shadow: ${({ $aimed }) => ($aimed ? `0 0 0 3px ${t.accentSoft}` : 'none')};
  background: ${t.surfaceRaised};
  color: ${t.text};
  font: inherit;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  ${focusRing}
  &:disabled {
    cursor: default;
  }
  ${({ $status }) =>
    $status === 'correct' && `border-color: ${t.success}; background: color-mix(in srgb, ${t.success} 12%, transparent);`}
  ${({ $status }) =>
    $status === 'wrong' && `border-color: ${t.error}; background: color-mix(in srgb, ${t.error} 10%, transparent);`}
  ${({ $status }) => $status === 'missed' && `border-style: dashed; border-color: ${t.success};`}
  & p {
    margin: 0;
  }
`;

const SwingButton = styled.button`
  margin-top: 10px;
  padding: ${t.buttonPadding};
  border-radius: ${t.buttonRadius};
  border: 1px solid transparent;
  background: ${t.accent};
  color: ${t.onAccent};
  font-family: ${t.fontBase};
  font-size: ${t.buttonFontSize};
  font-weight: ${t.buttonFontWeight};
  cursor: pointer;
  &:hover:not(:disabled) {
    background: ${t.accentHover};
  }
  ${focusRing}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

type Phase = 'aim' | 'flying' | 'landed';

function holeX(i: number, count: number) {
  const pad = 70;
  if (count === 1) return W / 2;
  return pad + (i * (W - pad * 2)) / (count - 1);
}

export function GolfKind({ step, chosen, answered, answer, next, keyboard, hints }: StepKindProps) {
  const { labels } = useGameConfig();
  const count = step.options.length;
  const [phase, setPhase] = React.useState<Phase>(answered ? 'landed' : 'aim');
  const [ball, setBall] = React.useState(BALL_START);
  const [ballScale, setBallScale] = React.useState(1);
  const [splash, setSplash] = React.useState(false);
  const targetRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number>(0);

  const swing = React.useCallback(
    (i: number) => {
      if (phase !== 'aim' || !step.options[i]) return;
      const option = step.options[i];
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      targetRef.current = i;
      setPhase('flying');

      const from = BALL_START;
      const to = { x: holeX(i, count), y: HOLE_Y };
      const start = performance.now();
      const duration = reduce ? 0 : SWING_MS;

      const tick = (now: number) => {
        const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 2);
        const x = from.x + (to.x - from.x) * ease;
        const y = from.y + (to.y - from.y) * ease - Math.sin(p * Math.PI) * 110; // arc
        setBall({ x, y });
        setBallScale(1 + Math.sin(p * Math.PI) * 0.6); // "closer to camera" mid-flight
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          if (option.correct) {
            setBallScale(0); // drops into the hole
          } else {
            setSplash(true);
            setBall({ x: to.x + 34, y: HOLE_Y + 16 }); // rolls into the water hazard
          }
          setPhase('landed');
          answer(option.id);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [phase, step.options, count, answer],
  );

  React.useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const { index, setIndex } = useArrowSelection({
    count,
    enabled: keyboard && phase !== 'flying',
    answered: phase === 'landed',
    onConfirm: swing,
    onNext: next,
  });

  const chosenIndex = chosen ? step.options.findIndex((o) => o.id === chosen.id) : -1;

  return (
    <>
      <Question>{step.question}</Question>

      <Course viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Golf course with one hole per answer">
        {/* sky + green */}
        <rect x="0" y="0" width={W} height={H} fill={t.surfaceRaised} />
        <ellipse cx={W / 2} cy={H + 40} rx={W * 0.75} ry={170} fill={t.green} />
        <ellipse cx={W / 2} cy={H + 70} rx={W * 0.55} ry={150} fill={t.greenDark} opacity="0.35" />
        {/* water hazard band behind the holes */}
        <rect x="0" y={HOLE_Y + 8} width={W} height="22" fill={t.water} opacity="0.55" />

        {step.options.map((option, i) => {
          const x = holeX(i, count);
          const aimed = phase === 'aim' && i === index;
          const isTarget = chosenIndex === i;
          const flagColor = answered
            ? option.correct
              ? t.success
              : isTarget
                ? t.error
                : t.textMuted
            : aimed
              ? t.accent
              : t.textMuted;
          return (
            <g key={option.id}>
              {/* aiming line */}
              {aimed && (
                <path
                  d={`M ${BALL_START.x} ${BALL_START.y} Q ${(BALL_START.x + x) / 2} ${HOLE_Y - 90} ${x} ${HOLE_Y}`}
                  stroke={t.accent}
                  strokeWidth="2"
                  strokeDasharray="5 6"
                  fill="none"
                  opacity="0.7"
                />
              )}
              {/* sand around the hole */}
              <ellipse cx={x} cy={HOLE_Y + 2} rx="22" ry="7" fill={t.sand} opacity="0.9" />
              {/* hole */}
              <ellipse cx={x} cy={HOLE_Y} rx="9" ry="4" fill="#1c1c1c" />
              {/* pole + flag */}
              <line x1={x} y1={HOLE_Y} x2={x} y2={HOLE_Y - 46} stroke="#555" strokeWidth="2" />
              <Flag
                $aimed={aimed}
                points={`${x},${HOLE_Y - 46} ${x + 26},${HOLE_Y - 38} ${x},${HOLE_Y - 30}`}
                fill={flagColor}
              />
              <text x={x} y={HOLE_Y - 52} textAnchor="middle" fontSize="12" fontWeight="700" fill={t.text}>
                {String.fromCharCode(65 + i)}
              </text>
            </g>
          );
        })}

        {/* splash */}
        {splash && (
          <g>
            <circle cx={ball.x} cy={ball.y} r="14" fill="none" stroke={t.water} strokeWidth="3" opacity="0.9" />
            <circle cx={ball.x} cy={ball.y} r="22" fill="none" stroke={t.water} strokeWidth="2" opacity="0.5" />
          </g>
        )}

        {/* ball shadow + ball */}
        {ballScale > 0 && (
          <>
            <ellipse cx={ball.x} cy={BALL_START.y + 6} rx={7 * (2 - ballScale)} ry="2.5" fill="#000" opacity="0.18" />
            <circle cx={ball.x} cy={ball.y} r={6 * ballScale} fill="#fff" stroke="#999" strokeWidth="1" />
          </>
        )}

        {/* tee marker */}
        <rect x={BALL_START.x - 14} y={BALL_START.y + 9} width="28" height="4" rx="2" fill={t.greenDark} />
      </Course>

      <Labels $cols={count} role="group" aria-label="Answer options">
        {step.options.map((option, i) => {
          let status: 'correct' | 'wrong' | 'missed' | undefined;
          if (answered) {
            if (i === chosenIndex) status = option.correct ? 'correct' : 'wrong';
            else if (option.correct) status = 'missed';
          }
          return (
            <LabelButton
              key={option.id}
              type="button"
              $aimed={phase === 'aim' && i === index}
              $status={status}
              disabled={phase !== 'aim'}
              onClick={() => (i === index ? swing(i) : setIndex(i))}
              aria-label={`Hole ${String.fromCharCode(65 + i)}`}
            >
              {option.label}
            </LabelButton>
          );
        })}
      </Labels>

      {phase === 'aim' && (
        <SwingButton type="button" onClick={() => swing(index)}>
          Swing ⛳
        </SwingButton>
      )}

      {chosen && phase === 'landed' && (
        <FeedbackBox $correct={chosen.correct}>
          <strong>{chosen.correct ? `Hole in one! ${labels.correct}` : `Splash! ${labels.wrong}`}</strong>{' '}
          {chosen.feedback}
        </FeedbackBox>
      )}

      {keyboard && hints && phase === 'aim' && (
        <Hint>
          <kbd>←</kbd> <kbd>→</kbd> to aim, <kbd>Enter</kbd> to swing
        </Hint>
      )}
    </>
  );
}
