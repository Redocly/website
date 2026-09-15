import * as React from 'react';

/**
 * Shared keyboard handling: ← → (and ↑ ↓) move a highlight over `count` items,
 * Enter / Space confirm. When `enabled` is false nothing is bound.
 * After the step is answered, Enter continues to the next step.
 */
export function useArrowSelection(opts: {
  count: number;
  enabled: boolean;
  answered: boolean;
  onConfirm: (index: number) => void;
  onNext: () => void;
  initial?: number;
}) {
  const { count, enabled, answered, onConfirm, onNext, initial = 0 } = opts;
  const [index, setIndex] = React.useState(initial);

  React.useEffect(() => {
    if (!enabled) return;
    const handler = (e: KeyboardEvent) => {
      // Don't steal keys from inputs, the search box, etc.
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (answered) return;
          e.preventDefault();
          setIndex((i) => (i - 1 + count) % count);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          if (answered) return;
          e.preventDefault();
          setIndex((i) => (i + 1) % count);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (answered) onNext();
          else onConfirm(index);
          break;
        default:
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, answered, count, index, onConfirm, onNext]);

  return { index, setIndex };
}
