import { registerStepKind } from './registry';
import { TipKind } from './TipKind';
import { QuizKind } from './QuizKind';
import { GolfKind } from './GolfKind';
import { MatchKind } from './MatchKind';

registerStepKind({ id: 'tip', Component: TipKind, requiresAnswer: false });
registerStepKind({ id: 'quiz', Component: QuizKind });
registerStepKind({ id: 'golf', Component: GolfKind });
registerStepKind({ id: 'match', Component: MatchKind, requiresAnswer: true });

export { registerStepKind, getStepKind, listStepKinds } from './registry';
export type { StepKind, StepKindProps } from './types';
