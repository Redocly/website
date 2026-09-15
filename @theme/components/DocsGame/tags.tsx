/**
 * React components behind the Markdoc tags.
 *
 * In "docs" mode they render nothing visible — only an invisible marker `<div>`
 * that tells the game engine where each step lives in the document.
 * In "game" mode the active step renders the `StepBubble` in place (in the document flow),
 * right under the section it belongs to, so no coordinate math is required.
 */
import * as React from 'react';
import { gameActions, useGameState, type GameOption as GameOptionType, type GameMedia } from './store';
import { StepBubble, FinishCard } from './StepBubble';

/* --------------------------------- contexts -------------------------------- */

const StepContext = React.createContext<string | null>(null);
const QuestionContext = React.createContext<((option: GameOptionType) => () => void) | null>(null);

let autoIdCounter = 0;

/* --------------------------------- GameStep -------------------------------- */

type GameStepProps = {
  id?: string;
  title?: string;
  /** Interaction kind: tip | quiz | golf | match (see ./kinds). Auto-detected when omitted. */
  type?: string;
  mood?: string;
  /** Emphasise this step (sticker, pulsing border, attention flash, character sign) */
  highlight?: boolean;
  badge?: string;
  sign?: string;
  /** match kind: labels + tolerance */
  leftLabel?: string;
  rightLabel?: string;
  allowedMistakes?: number;
  children?: React.ReactNode;
};

export function GameStep({
  id,
  title,
  type,
  mood,
  highlight = false,
  badge,
  sign,
  leftLabel,
  rightLabel,
  allowedMistakes,
  children,
}: GameStepProps) {
  const [stepId] = React.useState(() => id || `step-${++autoIdCounter}`);
  const markerRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const state = useGameState();

  React.useEffect(() => {
    const unregister = gameActions.registerStep({
      id: stepId,
      title,
      type,
      mood,
      highlight,
      badge,
      sign,
      element: markerRef.current,
      say: [],
      media: [],
      question: null,
      options: [],
      pairs: [],
    });
    setMounted(true);
    return unregister;
  }, [stepId, title, type, mood, highlight, badge, sign]);

  const index = state.steps.findIndex((s) => s.id === stepId);
  const isActive = state.mode === 'game' && !state.finished && index === state.currentIndex;
  const isDone = state.mode === 'game' && index > -1 && index < state.currentIndex;
  const isFinishHere = state.mode === 'game' && state.finished && index === state.steps.length - 1;

  return (
    <StepContext.Provider value={stepId}>
      <div
        ref={markerRef}
        data-game-step={stepId}
        data-game-step-active={isActive || undefined}
        data-game-step-done={isDone || undefined}
        data-game-mood={mood}
        data-game-highlight={highlight || undefined}
        data-game-left-label={leftLabel}
        data-game-right-label={rightLabel}
        data-game-allowed-mistakes={allowedMistakes}
        style={{ scrollMarginTop: '120px' }}
      >
        {/* Children only register content; they render nothing. Mount them after the step exists. */}
        {mounted && children}
        {isActive && <StepBubble stepId={stepId} index={index} />}
        {isFinishHere && <FinishCard />}
      </div>
    </StepContext.Provider>
  );
}

/* --------------------------------- GameSay --------------------------------- */

export function GameSay({ children }: { children?: React.ReactNode }) {
  const stepId = React.useContext(StepContext);

  React.useEffect(() => {
    if (!stepId) return;
    const node = <React.Fragment key={`say-${Math.random()}`}>{children}</React.Fragment>;
    gameActions.updateStep(stepId, (s) => ({ ...s, say: [...s.say, node] }));
    return () => gameActions.updateStep(stepId, (s) => ({ ...s, say: s.say.filter((n) => n !== node) }));
    // children are static Markdoc content — registering once is intended
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId]);

  return null;
}

/* ------------------------------- GameQuestion ------------------------------ */

export function GameQuestion({ children }: { children?: React.ReactNode }) {
  const stepId = React.useContext(StepContext);

  React.useEffect(() => {
    if (!stepId) return;
    // The question node is rendered later inside the bubble. `gameOption` children render
    // nothing there (no QuestionContext), so only the question text is visible.
    gameActions.updateStep(stepId, (s) => ({ ...s, question: <>{children}</> }));
    return () => gameActions.updateStep(stepId, (s) => ({ ...s, question: null }));
    // children are static Markdoc content — registering once is intended
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId]);

  const registerOption = React.useCallback(
    (option: GameOptionType) => {
      if (!stepId) return () => {};
      gameActions.updateStep(stepId, (s) => ({
        ...s,
        options: [...s.options.filter((o) => o.id !== option.id), option],
      }));
      return () =>
        gameActions.updateStep(stepId, (s) => ({ ...s, options: s.options.filter((o) => o.id !== option.id) }));
    },
    [stepId],
  );

  // Mount children once (hidden) so nested `gameOption` tags can register through the context.
  return (
    <div hidden aria-hidden="true">
      <QuestionContext.Provider value={registerOption}>{children}</QuestionContext.Provider>
    </div>
  );
}

/* -------------------------------- GameOption ------------------------------- */

type GameOptionProps = { correct?: boolean; feedback?: string; children?: React.ReactNode };

export function GameOption({ correct = false, feedback, children }: GameOptionProps) {
  const register = React.useContext(QuestionContext);
  const [optionId] = React.useState(() => `opt-${Math.random().toString(36).slice(2, 8)}`);

  React.useEffect(() => {
    if (!register) return;
    return register({ id: optionId, correct, feedback, label: children });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, optionId]);

  return null;
}

/* -------------------------------- GameMedia -------------------------------- */

type GameMediaProps = {
  src: string;
  alt?: string;
  caption?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
};

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;

/** Image / gif / video shown inside the bubble. Videos autoplay muted & looped by default. */
export function GameMedia({ src, alt, caption, poster, autoplay, loop }: GameMediaProps) {
  const stepId = React.useContext(StepContext);
  const [mediaId] = React.useState(() => `media-${Math.random().toString(36).slice(2, 8)}`);

  React.useEffect(() => {
    if (!stepId || !src) return;
    const kind: GameMedia['kind'] = VIDEO_EXT.test(src) ? 'video' : 'image';
    const item: GameMedia = {
      id: mediaId,
      src,
      kind,
      alt,
      caption,
      poster,
      autoplay: autoplay ?? kind === 'video',
      loop: loop ?? kind === 'video',
    };
    gameActions.updateStep(stepId, (s) => ({ ...s, media: [...s.media.filter((m) => m.id !== mediaId), item] }));
    return () => gameActions.updateStep(stepId, (s) => ({ ...s, media: s.media.filter((m) => m.id !== mediaId) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, src]);

  return null;
}

/* --------------------------------- GamePair -------------------------------- */

type GamePairProps = { left?: string; right?: string; children?: React.ReactNode };

/**
 * One left/right pair for `type="match"`. Use attributes for short text
 * (`{% gamePair left="docs-admins" right="Owner" /%}`).
 */
export function GamePair({ left, right }: GamePairProps) {
  const stepId = React.useContext(StepContext);
  const [pairId] = React.useState(() => `pair-${Math.random().toString(36).slice(2, 8)}`);

  React.useEffect(() => {
    if (!stepId) return;
    gameActions.updateStep(stepId, (s) => ({
      ...s,
      pairs: [...s.pairs.filter((p) => p.id !== pairId), { id: pairId, left, right }],
    }));
    return () => gameActions.updateStep(stepId, (s) => ({ ...s, pairs: s.pairs.filter((p) => p.id !== pairId) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, left, right]);

  return null;
}
