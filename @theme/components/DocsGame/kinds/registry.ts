import type { StepKind } from './types';

const kinds = new Map<string, StepKind>();

export function registerStepKind(kind: StepKind) {
  kinds.set(kind.id, kind);
}

export function getStepKind(id: string | undefined): StepKind | undefined {
  return id ? kinds.get(id) : undefined;
}

export function listStepKinds(): string[] {
  return Array.from(kinds.keys());
}
