import * as React from 'react';
import { useStepKeydown } from '../stepFocus';

/**
 * Shared keyboard handling: ← → (and ↑ ↓) move a highlight over `count` items,
 * Enter / Space confirm. When `enabled` is false nothing is bound.
 * After the step is answered, Enter continues to the next step.
 * Keys are only handled while focus is inside the step card (see `useStepKeydown`).
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

  useStepKeydown(enabled, (e) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (answered || count === 0) return;
        e.preventDefault();
        setIndex((i) => (i - 1 + count) % count);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        if (answered || count === 0) return;
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
  });

  return { index, setIndex };
}
