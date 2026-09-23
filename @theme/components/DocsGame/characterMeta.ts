/**
 * Split from `Character.tsx`, which statically imports over a megabyte of SVG artwork.
 * Import from here when you only need the state names or the aspect ratio.
 */
export type CharacterState = 'idle' | 'run' | 'talk' | 'point' | 'happy' | 'confused';

/** Aspect ratio of the artwork (width / height) */
export const CHARACTER_ASPECT = 432 / 578;
