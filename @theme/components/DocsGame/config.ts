import * as React from 'react';

/**
 * Everything an author can tweak without touching code.
 *
 * Defaults live here; a page can override any field through front matter:
 *
 * ---
 * game:
 *   title: SSO quest
 *   cta: Play the SSO quest
 *   keyboardHints: false
 * ---
 *
 * Site-wide overrides: change `defaultGameConfig` (or pass `config` to the template).
 */
export type GameConfig = {
  /** Name shown in the banner / HUD */
  title: string;
  /** Banner text in docs mode */
  intro: string;
  /** Button label that starts the game */
  cta: string;
  /** Banner text while playing */
  playingText: string;
  /** Labels */
  labels: {
    exit: string;
    back: string;
    next: string;
    finish: string;
    playAgain: string;
    backToDocs: string;
    correct: string;
    wrong: string;
    finishedTitle: string;
    perfect: string;
    good: string;
    /** `match` kind: closing line when every pair is connected */
    matchDone: string;
    /** `match` kind: closing line when it was finished with too many misses */
    matchMissed: string;
  };
  /** Show "use ← → / Enter" hints under interactive steps */
  keyboardHints: boolean;
  /** Enable keyboard navigation (arrows / Enter) */
  keyboard: boolean;
  /** Character height in px */
  characterSize: number;
  /** How long the character "runs" between steps (ms) */
  runDurationMs: number;
  /** Default interaction kind for steps that have options but no explicit `type` */
  defaultQuizKind: string;
  /** Remember progress in localStorage */
  persistProgress: boolean;
};

export const defaultGameConfig: GameConfig = {
  title: 'Guided walkthrough',
  intro: 'Prefer a guided walkthrough? A short interactive tour with tips and quick questions.',
  cta: 'See docs with tips & mini-game',
  playingText: 'Game mode is on — follow the guide from section to section.',
  labels: {
    exit: 'Exit game',
    back: '← Back',
    next: 'Next →',
    finish: 'Finish',
    playAgain: 'Play again',
    backToDocs: 'Back to docs',
    correct: 'Correct!',
    wrong: 'Not quite.',
    finishedTitle: 'You made it through!',
    perfect: 'Perfect run — you know this page inside out.',
    good: 'Good job. Revisit the highlighted answers above to close the gaps.',
    matchDone: 'Everything is connected the way it should be.',
    matchMissed: 'Re-read the section above and check the pairs you missed.',
  },
  keyboardHints: true,
  keyboard: true,
  characterSize: 120,
  runDurationMs: 700,
  defaultQuizKind: 'quiz',
  persistProgress: true,
};

export function mergeGameConfig(override: unknown): GameConfig {
  if (!override || typeof override !== 'object') return defaultGameConfig;
  const o = override as Partial<GameConfig>;
  return {
    ...defaultGameConfig,
    ...o,
    labels: { ...defaultGameConfig.labels, ...(o.labels ?? {}) },
  };
}

export const GameConfigContext = React.createContext<GameConfig>(defaultGameConfig);

export function useGameConfig(): GameConfig {
  return React.useContext(GameConfigContext);
}
