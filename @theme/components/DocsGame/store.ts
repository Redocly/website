/**
 * DocsGame store — a tiny framework-free store shared between:
 *  - Markdoc tags (`gameStep`, `gameSay`, `gameQuestion`, `gameOption`) that register content,
 *  - the page template (`DocsWithGame`) that renders the launcher, HUD and character.
 *
 * It intentionally avoids external state libraries: React's `useSyncExternalStore` is enough.
 * All DOM-related work happens on the client only (inside effects), so SSR stays untouched.
 */
import * as React from 'react';

export type GameMode = 'docs' | 'game';

export type GameOption = {
  id: string;
  /** Rendered Markdoc content of the option */
  label: React.ReactNode;
  correct: boolean;
  /** Optional explanation shown after the option is picked */
  feedback?: React.ReactNode;
};

export type GameMedia = {
  id: string;
  src: string;
  kind: 'image' | 'video';
  alt?: string;
  caption?: string;
  poster?: string;
  autoplay: boolean;
  loop: boolean;
};

export type GamePair = {
  id: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

/** Outcome recorded by kinds that are not "pick one option" (e.g. match) */
export type GameResult = { correct: boolean; detail?: string };

export type GameStep = {
  id: string;
  title?: string;
  /** Visually emphasised "don't skip this" step */
  highlight?: boolean;
  /** Sticker text on a highlighted step */
  badge?: string;
  /** What the character holds up on a highlighted step */
  sign?: string;
  /** Interaction kind (registered in ./kinds). `undefined` = auto: quiz if options exist, otherwise tip */
  type?: string;
  /** Character mood on arrival */
  mood?: string;
  /** DOM marker rendered by the `gameStep` tag — used for ordering and scrolling */
  element: HTMLElement | null;
  /** What the character says when it arrives at this step */
  say: React.ReactNode[];
  /** Images / gifs / videos shown in the bubble */
  media: GameMedia[];
  /** Question text (Markdoc content), if the step has a quiz */
  question: React.ReactNode | null;
  options: GameOption[];
  /** Pairs for the `match` kind */
  pairs: GamePair[];
  /** `match` kind: column headings */
  leftLabel?: string;
  rightLabel?: string;
  /** `match` kind: how many wrong connections still count as a correct step */
  allowedMistakes?: number;
};

export type GameState = {
  mode: GameMode;
  steps: GameStep[];
  currentIndex: number;
  /** stepId -> chosen optionId (quiz-like kinds) */
  answers: Record<string, string>;
  /** stepId -> result (kinds with their own scoring, e.g. match) */
  results: Record<string, GameResult>;
  /** Set when the last step is completed */
  finished: boolean;
};

type Listener = () => void;

const MODE_STORAGE_KEY = 'docs-game:mode';
const progressKey = (slug: string) => `docs-game:progress:${slug}`;

const initialState: GameState = {
  mode: 'docs',
  steps: [],
  currentIndex: 0,
  answers: {},
  results: {},
  finished: false,
};

let state: GameState = initialState;
const listeners = new Set<Listener>();

const warned = new Set<string>();

/** Reports an authoring mistake once per key, so re-renders don't spam the console. */
export function warnOnce(key: string, message: string) {
  if (warned.has(key)) return;
  warned.add(key);
  // eslint-disable-next-line no-console
  console.warn(`[DocsGame] ${message}`);
}

function emit() {
  listeners.forEach((l) => l());
}

function setState(patch: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) {
  const next = typeof patch === 'function' ? patch(state) : patch;
  state = { ...state, ...next };
  emit();
}

/** Steps are ordered by their position in the document, not by mount order. */
function sortSteps(steps: GameStep[]): GameStep[] {
  return [...steps].sort((a, b) => {
    if (!a.element || !b.element) return 0;
    if (a.element === b.element) return 0;
    // eslint-disable-next-line no-bitwise
    return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
}

function safeStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function currentSlug(): string {
  return typeof window !== 'undefined' ? window.location.pathname : '';
}

let persistenceEnabled = true;

function persistProgress() {
  if (!persistenceEnabled) return;
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.setItem(
      progressKey(currentSlug()),
      JSON.stringify({
        currentIndex: state.currentIndex,
        answers: state.answers,
        results: state.results,
        finished: state.finished,
      }),
    );
  } catch {
    /* ignore quota / privacy mode errors */
  }
}

function restoreProgress() {
  const storage = safeStorage();
  if (!storage) return;
  try {
    const raw = storage.getItem(progressKey(currentSlug()));
    if (!raw) return;
    const saved: unknown = JSON.parse(raw);
    if (!isPlainObject(saved)) return;
    // Stored data is untrusted. The index is clamped on read (`selectCurrentIndex`),
    // not here, because steps register after this runs.
    setState({
      currentIndex: typeof saved.currentIndex === 'number' && Number.isFinite(saved.currentIndex)
        ? Math.max(Math.trunc(saved.currentIndex), 0)
        : 0,
      answers: isPlainObject(saved.answers) ? (saved.answers as Record<string, string>) : {},
      results: isPlainObject(saved.results) ? (saved.results as Record<string, GameResult>) : {},
      finished: saved.finished === true,
    });
  } catch {
    /* ignore malformed data */
  }
}

/* ----------------------------- public actions ----------------------------- */

export const gameActions = {
  /** Toggle localStorage persistence (driven by config.persistProgress). */
  setPersistence(enabled: boolean) {
    persistenceEnabled = enabled;
  },

  /** Called by `gameStep` on mount. Returns an unregister function. */
  registerStep(step: GameStep): () => void {
    setState((prev) => {
      if (prev.steps.some((s) => s.id === step.id)) {
        warnOnce(
          `dup:${step.id}`,
          `Two gameStep tags share id "${step.id}". Ids must be unique per page — ` +
            'the second one replaces the first and progress for both is merged.',
        );
      }
      return { steps: sortSteps([...prev.steps.filter((s) => s.id !== step.id), step]) };
    });
    return () => {
      setState((prev) => ({ steps: prev.steps.filter((s) => s.id !== step.id) }));
    };
  },

  /** Called by nested tags (`gameSay`, `gameQuestion`, `gameOption`) to attach content to a step. */
  updateStep(id: string, updater: (step: GameStep) => GameStep) {
    setState((prev) => ({
      steps: prev.steps.map((s) => (s.id === id ? updater(s) : s)),
    }));
  },

  setMode(mode: GameMode) {
    setState({ mode });
    const storage = safeStorage();
    try {
      storage?.setItem(MODE_STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (mode === 'game') url.searchParams.set('mode', 'game');
      else url.searchParams.delete('mode');
      window.history.replaceState(window.history.state, '', url.toString());
    }
  },

  start() {
    restoreProgress();
    gameActions.setMode('game');
  },

  exit() {
    gameActions.setMode('docs');
  },

  goTo(index: number) {
    const max = Math.max(state.steps.length - 1, 0);
    setState({ currentIndex: Math.min(Math.max(index, 0), max), finished: false });
    persistProgress();
  },

  next() {
    const from = selectCurrentIndex(state);
    if (from >= state.steps.length - 1) {
      setState({ finished: true });
    } else {
      setState({ currentIndex: from + 1 });
    }
    persistProgress();
  },

  prev() {
    setState({ currentIndex: Math.max(selectCurrentIndex(state) - 1, 0), finished: false });
    persistProgress();
  },

  answer(stepId: string, optionId: string) {
    // First answer counts; changing the answer afterwards is not allowed.
    if (state.answers[stepId]) return;
    setState((prev) => ({ answers: { ...prev.answers, [stepId]: optionId } }));
    persistProgress();
  },

  /** Record the outcome of a step that has its own scoring (match, …). First result counts. */
  setResult(stepId: string, result: GameResult) {
    if (state.results[stepId]) return;
    setState((prev) => ({ results: { ...prev.results, [stepId]: result } }));
    persistProgress();
  },

  restart() {
    setState({ currentIndex: 0, answers: {}, results: {}, finished: false });
    persistProgress();
  },

  /**
   * Reads `?mode=game` from the URL (or the remembered mode) on first client render.
   * Returns true when game mode should be active.
   */
  hydrateMode(): boolean {
    if (typeof window === 'undefined') return false;
    const fromUrl = new URL(window.location.href).searchParams.get('mode') === 'game';
    let remembered = false;
    try {
      remembered = safeStorage()?.getItem(MODE_STORAGE_KEY) === 'game';
    } catch {
      /* ignore */
    }
    if (fromUrl || remembered) {
      restoreProgress();
      setState({ mode: 'game' });
      return true;
    }
    return false;
  },
};

/* ------------------------------ react binding ----------------------------- */

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return initialState;
}

export function useGameState(): GameState {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* -------------------------------- selectors ------------------------------- */

export function isStepScored(step: GameStep): boolean {
  return step.options.length > 0 || step.pairs.length > 0;
}

export function isStepAnswered(s: GameState, step: GameStep): boolean {
  return Boolean(s.answers[step.id] || s.results[step.id]);
}

export function selectScore(s: GameState): { correct: number; total: number } {
  const scored = s.steps.filter(isStepScored);
  const correct = scored.filter((st) => {
    if (s.results[st.id]) return s.results[st.id].correct;
    const chosen = s.answers[st.id];
    return chosen && st.options.find((o) => o.id === chosen)?.correct;
  }).length;
  return { correct, total: scored.length };
}

/**
 * The step index to render. `currentIndex` can point past the end when restored progress
 * predates a step being removed. Clamping on read keeps progress intact while steps are
 * still registering one by one.
 */
export function selectCurrentIndex(s: GameState): number {
  if (s.steps.length === 0) return s.currentIndex;
  return Math.min(Math.max(s.currentIndex, 0), s.steps.length - 1);
}

export function selectCurrentStep(s: GameState): GameStep | undefined {
  return s.steps[selectCurrentIndex(s)];
}
