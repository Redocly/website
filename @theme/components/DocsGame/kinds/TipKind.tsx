import * as React from 'react';
import type { StepKindProps } from './types';
import { Hint } from './Hint';
import { useStepKeydown } from '../stepFocus';

/** A stop without a question — just say/media content. Enter continues. */
export function TipKind({ next, keyboard, hints }: StepKindProps) {
  useStepKeydown(keyboard, (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    next();
  });

  if (!keyboard || !hints) return null;
  return (
    <Hint>
      Press <kbd>Enter</kbd> to continue
    </Hint>
  );
}
