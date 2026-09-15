import * as React from 'react';
import type { StepKindProps } from './types';
import { Hint } from './Hint';

/** A stop without a question — just say/media content. Enter continues. */
export function TipKind({ next, keyboard, hints }: StepKindProps) {
  React.useEffect(() => {
    if (!keyboard) return;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if ((e.key === 'Enter' || e.key === ' ') && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyboard, next]);

  if (!keyboard || !hints) return null;
  return (
    <Hint>
      Press <kbd>Enter</kbd> to continue
    </Hint>
  );
}
