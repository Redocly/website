import * as React from 'react';

/** The active step's card, published by `StepBubble`. */
export const StepCardContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null);

const SELF_ACTIVATING = 'button, a[href], [role="button"], summary';
const TEXT_ENTRY = ['INPUT', 'TEXTAREA', 'SELECT'];

/**
 * Keydown handler bound to the step card, not to `window`, so the game can't
 * preventDefault a key meant for the page.
 */
export function useStepKeydown(enabled: boolean, handler: (e: KeyboardEvent) => void) {
  const cardRef = React.useContext(StepCardContext);
  const handlerRef = React.useRef(handler);

  // In an effect, not during render: an abandoned render must not reach the listener.
  React.useEffect(() => {
    handlerRef.current = handler;
  });

  React.useEffect(() => {
    const el = cardRef?.current;
    if (!enabled || !el) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target) {
        if (TEXT_ENTRY.includes(target.tagName) || target.isContentEditable) return;
        // Enter/Space on a focused button already fires a click.
        if ((e.key === 'Enter' || e.key === ' ') && target.closest(SELF_ACTIVATING)) return;
      }
      handlerRef.current(e);
    };

    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [enabled, cardRef]);
}
