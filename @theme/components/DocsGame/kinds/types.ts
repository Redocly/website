import type * as React from 'react';
import type { GameOption, GameResult, GameStep } from '../store';

/**
 * A "kind" is the interactive part of a step (quiz buttons, golf, …).
 * Adding a new mini-game = one component implementing `StepKindProps` + `registerStepKind()`.
 */
export type StepKindProps = {
  step: GameStep;
  /** Chosen option (if answered) */
  chosen?: GameOption;
  answered: boolean;
  /** Call to lock in an answer. Only the first call counts. */
  answer: (optionId: string) => void;
  /** For kinds with their own scoring: record the outcome. Only the first call counts. */
  setResult: (result: GameResult) => void;
  /** Recorded result, if any */
  result?: GameResult;
  /** Continue to the next step (used e.g. on Enter after answering) */
  next: () => void;
  /** Whether keyboard controls are enabled */
  keyboard: boolean;
  /** Whether to show keyboard hints */
  hints: boolean;
};

export type StepKind = {
  /** Value of `type` in the `gameStep` tag */
  id: string;
  Component: React.ComponentType<StepKindProps>;
  /** Whether the step blocks "Next" until answered (default: true when options exist) */
  requiresAnswer?: boolean;
};
