import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

import idle1 from '../../../images/game/web/idle-1.svg';
import idle2 from '../../../images/game/web/idle-2.svg';
import run1 from '../../../images/game/web/run-1.svg';
import run2 from '../../../images/game/web/run-2.svg';
import run3 from '../../../images/game/web/run-3.svg';

/**
 * Character states. Motion (running, jumping, wobbling) is applied by CSS on the wrapper,
 * the artwork itself is a sequence of SVG frames per state.
 */
export type CharacterState = 'idle' | 'run' | 'talk' | 'point' | 'happy' | 'confused';

type Frame = { src: string; ms: number };

/**
 * Frame sequences per state. Each frame is an SVG file (imported => URL) shown for `ms`.
 * States without their own artwork fall back to `idle`; motion still differs per state via CSS.
 *
 * To add artwork: drop `images/game/<state>-<n>.svg`, run it through svgo into `images/game/web/`
 * (add `viewBox="0 0 432 578"`), import it here and list it in the sequence.
 */
export const CHARACTER_FRAMES: Partial<Record<CharacterState, Frame[]>> = {
  // idle-2 = eyes open, idle-1 = closed-eyes smile (used as the blink and for "happy")
  idle: [
    { src: idle2, ms: 2600 },
    { src: idle1, ms: 160 },
  ],
  talk: [
    { src: idle2, ms: 1800 },
    { src: idle1, ms: 140 },
  ],
  happy: [{ src: idle1, ms: 10_000 }],
  run: [
    { src: run1, ms: 110 },
    { src: run2, ms: 110 },
    { src: run3, ms: 110 },
  ],
  point: [{ src: idle2, ms: 10_000 }],
  confused: [
    { src: idle2, ms: 900 },
    { src: idle1, ms: 300 },
  ],
};

/** Aspect ratio of the artwork (width / height) */
export const CHARACTER_ASPECT = 432 / 578;

/* -------------------------------- sequencer -------------------------------- */

function useFrameSequence(state: CharacterState): string {
  const frames = CHARACTER_FRAMES[state] ?? CHARACTER_FRAMES.idle ?? [];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    setI(0);
    if (frames.length <= 1) return;
    let idx = 0;
    let timer = 0;
    const tick = () => {
      idx = (idx + 1) % frames.length;
      setI(idx);
      timer = window.setTimeout(tick, frames[idx].ms);
    };
    timer = window.setTimeout(tick, frames[0].ms);
    return () => window.clearTimeout(timer);
  }, [state, frames]);

  return frames[i]?.src ?? frames[0]?.src ?? '';
}

/* --------------------------------- motion ---------------------------------- */

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;
const runStep = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;
const jump = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-16px) scale(1.04, 0.96); }
  60% { transform: translateY(-12px) scale(0.98, 1.02); }
`;
const wobble = keyframes`
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-6deg); }
  75% { transform: rotate(6deg); }
`;
const lean = keyframes`
  0%, 100% { transform: rotate(0) translateY(0); }
  50% { transform: rotate(-5deg) translateY(-3px); }
`;

const Wrapper = styled.div<{ $state: CharacterState; $h: number }>`
  height: ${({ $h }) => $h}px;
  width: ${({ $h }) => Math.round($h * CHARACTER_ASPECT)}px;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.18));
  ${({ $state }) => {
    switch ($state) {
      case 'run':
        return css`animation: ${runStep} 0.33s ease-in-out infinite;`;
      case 'happy':
        return css`animation: ${jump} 0.7s ease-in-out infinite;`;
      case 'confused':
        return css`animation: ${wobble} 1.2s ease-in-out infinite;`;
      case 'point':
        return css`animation: ${lean} 1.6s ease-in-out infinite;`;
      default:
        return css`animation: ${bob} 2.4s ease-in-out infinite;`;
    }
  }}
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }

  position: relative;

  /* All frames are stacked and toggled with visibility, so swapping never re-decodes an image
     (swapping src showed the theme's image background for a frame while the new SVG loaded). */
  & img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    user-select: none;
    -webkit-user-drag: none;
  }
  & img[data-active='false'] {
    visibility: hidden;
  }
`;

/** Every distinct frame file, rendered once and kept in the DOM. */
const ALL_FRAME_SRCS: string[] = Array.from(
  new Set(
    Object.values(CHARACTER_FRAMES)
      .flat()
      .filter((f): f is Frame => Boolean(f))
      .map((f) => f.src),
  ),
);

/**
 * `size` is the character height in px (the artwork is portrait).
 * `flip` mirrors it horizontally (e.g. when standing to the right of a card).
 */
export function Character({ state, size = 96, flip = false }: { state: CharacterState; size?: number; flip?: boolean }) {
  const src = useFrameSequence(state);
  return (
    <Wrapper $state={state} $h={size} data-character-state={state} style={flip ? { scale: '-1 1' } : undefined}>
      {ALL_FRAME_SRCS.map((frameSrc) => (
        <img
          key={frameSrc}
          src={frameSrc}
          data-active={frameSrc === src ? 'true' : 'false'}
          alt=""
          aria-hidden="true"
          draggable={false}
          decoding="sync"
        />
      ))}
    </Wrapper>
  );
}
