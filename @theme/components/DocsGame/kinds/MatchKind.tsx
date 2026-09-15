import * as React from 'react';
import styled, { keyframes, css } from 'styled-components';
import type { StepKindProps } from './types';
import { Hint, FeedbackBox } from './Hint';
import { t, focusRing } from '../theme';
import { useGameConfig } from '../config';
import { useStepKeydown } from '../stepFocus';

/**
 * Match: connect items on the left with the items on the right they belong to.
 * Column headings and mistake tolerance come from the `gameStep` tag
 * (`leftLabel`, `rightLabel`, `allowedMistakes`); the closing lines from the game config.
 * Keyboard: ↑ ↓ (or ← →) move inside the active column, Enter picks — first a left item, then its match.
 * The step is "correct" when everything is connected with no more than `allowedMistakes` misses.
 */

/* Brand tokens (Redocly site variables from @theme/styles.css, with fallbacks) */
const brand = {
  blue: 'var(--color-primary-main, #0044d4)',
  blueSoft: 'var(--docs-game-blue-soft, #E4F0FF)',
  gradient: 'var(--realm-color-hover, linear-gradient(90deg, #E4F0FF 0%, #CDF8FD 100%))',
  grey10: 'var(--docs-game-board-bg, var(--color-greyscale-10, #F7F7F7))',
  grey30: 'var(--docs-game-board-border, var(--colors-greyscale-30, #C6C6CC))',
  grey50: 'var(--color-greyscale-50, #686773)',
  caption: 'var(--color-caption, #929199)',
  heading: 'var(--typography-header-color, #1C1C1C)',
  text: 'var(--typography-text-color, #222)',
  tagBg: 'var(--tag-basic-bg-color, #EDEDF2)',
  tagText: 'var(--tag-basic-content-color, #2A2B33)',
  surface: 'var(--bg-color, #fff)',
  labelFont: "'Gemunu Libre', var(--font-family-base, sans-serif)",
  codeFont: 'var(--code-font-family, "Source Code Pro", monospace)',
};

const Question = styled.div`
  margin-top: 12px;
  font-weight: 600;
  color: ${brand.heading};
`;

const Board = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 72px minmax(0, 1fr);
  gap: 10px 0;
  margin-top: 14px;
  padding: 16px;
  border-radius: 16px;
  background: ${brand.grey10};
  border: 1px solid ${t.border};
`;

/** Connectors are drawn on top of the board, from each left item to the right item it is matched with. */
const Wires = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
`;

const drawIn = keyframes`
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
`;

const WirePath = styled.path<{ $preview?: boolean }>`
  fill: none;
  stroke: ${brand.blue};
  stroke-width: 2;
  stroke-linecap: round;
  ${({ $preview }) =>
    $preview
      ? css`
          stroke-dasharray: 4 6;
          opacity: 0.6;
        `
      : css`
          stroke-dasharray: 1;
          animation: ${drawIn} 0.35s ease-out both;
        `}
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ColumnLabel = styled.div`
  font-family: ${brand.labelFont};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brand.caption};
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
`;
const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.04); }
  100% { transform: scale(1); }
`;

type ItemProps = { $focused: boolean; $picked: boolean; $matched: boolean; $shake: boolean; $side: 'left' | 'right' };

const Item = styled.button<ItemProps>`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid ${({ $focused, $picked, $matched }) => ($matched || $picked || $focused ? brand.blue : brand.grey30)};
  background: ${({ $matched, $picked, $focused, $side }) =>
    $matched ? brand.gradient : $picked || $focused ? brand.blueSoft : $side === 'left' ? brand.tagBg : brand.surface};
  color: ${({ $matched, $side }) => ($matched ? brand.blue : $side === 'left' ? brand.tagText : brand.heading)};
  font-family: ${({ $side }) => ($side === 'left' ? brand.codeFont : 'var(--font-family-base, inherit)')};
  font-size: ${({ $side }) => ($side === 'left' ? '13px' : '14px')};
  font-weight: ${({ $matched }) => ($matched ? 600 : 500)};
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, background 0.2s, color 0.2s;
  ${focusRing}
  &:hover:not(:disabled) {
    border-color: ${brand.blue};
  }
  &:disabled {
    cursor: default;
  }
  ${({ $shake }) =>
    $shake &&
    css`
      animation: ${shake} 0.4s ease-in-out;
      border-color: var(--color-brand-danger, #c0574f) !important;
    `}
  ${({ $matched }) =>
    $matched &&
    css`
      animation: ${pop} 0.35s ease-out;
    `}
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
  & p {
    margin: 0;
  }
`;

const Check = styled.span`
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${brand.blue};
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
`;

const Port = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${({ $on }) => ($on ? brand.blue : brand.grey30)};
  background: ${({ $on }) => ($on ? brand.blue : brand.surface)};
  transform: translateY(-50%);
  transition: background-color 0.2s, border-color 0.2s;
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: ${brand.caption};
`;

/** Deterministic shuffle so the right column is stable between renders / reloads */
function shuffled<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = (h ^ ch.charCodeAt(0)) * 16777619;
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    const j = h % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatchKind({ step, result, setResult, next, keyboard, hints }: StepKindProps) {
  const { labels } = useGameConfig();
  const pairs = step.pairs;
  const allowedMistakes = step.allowedMistakes ?? 0;
  const leftLabel = step.leftLabel ?? '';
  const rightLabel = step.rightLabel ?? '';

  const right = React.useMemo(() => shuffled(pairs, step.id), [pairs, step.id]);
  const done = Boolean(result);

  const [matched, setMatched] = React.useState<Set<string>>(() => new Set());

  // Pairs register in child effects, a tick after this first renders, so a completed
  // step can't fill this set from the initial state.
  React.useEffect(() => {
    if (!done) return;
    setMatched(new Set(pairs.map((p) => p.id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, pairs.length]);
  const [picked, setPicked] = React.useState<string | null>(null); // left pair id
  const [column, setColumn] = React.useState<0 | 1>(0);
  const [focus, setFocus] = React.useState(0);
  const [mistakes, setMistakes] = React.useState(0);
  const [shakeId, setShakeId] = React.useState<string | null>(null);
  const [streak, setStreak] = React.useState(0);

  const leftOpen = pairs.filter((p) => !matched.has(p.id));
  const rightOpen = right.filter((p) => !matched.has(p.id));

  const finish = React.useCallback(
    (totalMistakes: number) => {
      setResult({
        correct: totalMistakes <= allowedMistakes,
        detail: totalMistakes === 0 ? 'flawless' : `${totalMistakes} miss${totalMistakes === 1 ? '' : 'es'}`,
      });
    },
    [setResult, allowedMistakes],
  );

  const pickLeft = (pairId: string) => {
    if (done || matched.has(pairId)) return;
    setPicked(pairId);
    setColumn(1);
    setFocus(0);
  };

  const pickRight = (pairId: string) => {
    if (done || !picked || matched.has(pairId)) return;
    if (pairId === picked) {
      const nextMatched = new Set(matched);
      nextMatched.add(pairId);
      setMatched(nextMatched);
      setStreak((s) => s + 1);
      setPicked(null);
      setColumn(0);
      setFocus(0);
      if (nextMatched.size === pairs.length) finish(mistakes);
    } else {
      setMistakes((m) => m + 1);
      setStreak(0);
      setShakeId(pairId);
      window.setTimeout(() => setShakeId(null), 450);
    }
  };

  // keyboard
  useStepKeydown(keyboard, (e) => {
    const list = column === 0 ? leftOpen : rightOpen;
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        if (done || list.length === 0) return;
        e.preventDefault();
        setFocus((f) => (f - 1 + list.length) % list.length);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (done || list.length === 0) return;
        e.preventDefault();
        setFocus((f) => (f + 1) % list.length);
        break;
      case 'Escape':
        if (picked) {
          e.preventDefault();
          setPicked(null);
          setColumn(0);
        }
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        if (done) return next();
        const item = list[focus];
        if (!item) return;
        if (column === 0) pickLeft(item.id);
        else pickRight(item.id);
        break;
      }
      default:
    }
  });

  /* ----- connector geometry: measured from the DOM so wires follow the real rows ----- */
  const boardRef = React.useRef<HTMLDivElement>(null);
  const leftRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const [wires, setWires] = React.useState<{ key: string; d: string; preview?: boolean }[]>([]);

  const previewTarget = column === 1 && picked ? rightOpen[focus]?.id : undefined;

  React.useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const measure = () => {
      const b = board.getBoundingClientRect();
      const path = (leftId: string, rightId: string) => {
        const l = leftRefs.current[leftId]?.getBoundingClientRect();
        const r = rightRefs.current[rightId]?.getBoundingClientRect();
        if (!l || !r) return null;
        const x1 = l.right - b.left;
        const y1 = l.top + l.height / 2 - b.top;
        const x2 = r.left - b.left;
        const y2 = r.top + r.height / 2 - b.top;
        const c = (x2 - x1) / 2;
        return `M ${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
      };
      const next: { key: string; d: string; preview?: boolean }[] = [];
      matched.forEach((id) => {
        const d = path(id, id);
        if (d) next.push({ key: `m-${id}`, d });
      });
      if (picked && previewTarget) {
        const d = path(picked, previewTarget);
        if (d) next.push({ key: 'preview', d, preview: true });
      }
      setWires(next);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(board);
    return () => ro?.disconnect();
  }, [matched, picked, previewTarget, pairs.length]);

  if (pairs.length === 0) return null;

  return (
    <>
      {step.question && <Question>{step.question}</Question>}

      <Board
        ref={boardRef}
        role="group"
        aria-label={leftLabel && rightLabel ? `Match ${leftLabel} to ${rightLabel}` : 'Match the items'}
      >
        <Wires aria-hidden="true">
          {wires.map((w) => (
            <WirePath key={w.key} d={w.d} pathLength={1} $preview={w.preview} />
          ))}
        </Wires>

        <ColumnLabel>{leftLabel}</ColumnLabel>
        <div />
        <ColumnLabel>{rightLabel}</ColumnLabel>

        {pairs.map((pair, row) => {
          const rightPair = right[row];
          const leftIdx = leftOpen.findIndex((p) => p.id === pair.id);
          const rightIdx = rightOpen.findIndex((p) => p.id === rightPair.id);
          return (
            <React.Fragment key={pair.id}>
              <Item
                ref={(el) => {
                  leftRefs.current[pair.id] = el;
                }}
                type="button"
                $side="left"
                $focused={keyboard && !done && column === 0 && leftIdx === focus}
                $picked={picked === pair.id}
                $matched={matched.has(pair.id)}
                $shake={false}
                disabled={done || matched.has(pair.id)}
                onMouseEnter={() => !done && column === 0 && leftIdx > -1 && setFocus(leftIdx)}
                onClick={() => pickLeft(pair.id)}
              >
                {matched.has(pair.id) && <Check aria-hidden="true">✓</Check>}
                <span>{pair.left}</span>
                <Port $on={matched.has(pair.id) || picked === pair.id} style={{ right: -6 }} />
              </Item>
              <div />
              <Item
                ref={(el) => {
                  rightRefs.current[rightPair.id] = el;
                }}
                type="button"
                $side="right"
                $focused={keyboard && !done && column === 1 && rightIdx === focus}
                $picked={false}
                $matched={matched.has(rightPair.id)}
                $shake={shakeId === rightPair.id}
                disabled={done || matched.has(rightPair.id) || !picked}
                onMouseEnter={() => !done && column === 1 && rightIdx > -1 && setFocus(rightIdx)}
                onClick={() => pickRight(rightPair.id)}
              >
                <Port $on={matched.has(rightPair.id)} style={{ left: -6 }} />
                <span>{rightPair.right}</span>
                {matched.has(rightPair.id) && <Check aria-hidden="true">✓</Check>}
              </Item>
            </React.Fragment>
          );
        })}
      </Board>

      <Status>
        <span>
          {matched.size} / {pairs.length} connected
          {streak >= 2 && !done ? ` · 🔥 ${streak} in a row` : ''}
        </span>
        <span>{mistakes > 0 ? `${mistakes} miss${mistakes === 1 ? '' : 'es'}` : 'no misses yet'}</span>
      </Status>

      {result && (
        <FeedbackBox $correct={result.correct}>
          <strong>
            {result.correct
              ? result.detail === 'flawless'
                ? `Flawless! ${labels.correct}`
                : labels.correct
              : `All connected — but with ${result.detail}. ${labels.wrong}`}
          </strong>{' '}
          {result.correct ? labels.matchDone : labels.matchMissed}
        </FeedbackBox>
      )}

      {keyboard && hints && !done && (
        <Hint>
          <kbd>↑</kbd> <kbd>↓</kbd> to move, <kbd>Enter</kbd> to {picked ? 'connect' : 'pick a group'}
          {picked ? (
            <>
              , <kbd>Esc</kbd> to cancel
            </>
          ) : null}
        </Hint>
      )}
    </>
  );
}
