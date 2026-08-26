import React, { useId } from 'react';
import styled from 'styled-components';

import { CheckmarkIcon } from '@redocly/theme/icons/CheckmarkIcon/CheckmarkIcon';

export type ColorControlProps = {
  options: readonly string[];
  value?: string;
  onChange: (value: string) => void;
  /** Groups the inputs. Generated when the caller passes nothing. */
  name?: string;
  ariaLabel?: string;
  className?: string;
};

/**
 * Picks one of the palette color names. Each swatch carries the theme's own
 * `.tag-{name}` class, so it takes the color from `--tag-color` and also covers
 * the custom names a project defines in its stylesheet.
 */
export function ColorControl({
  options,
  value,
  onChange,
  name,
  ariaLabel,
  className,
}: ColorControlProps) {
  const generatedName = useId();

  return (
    <ColorControlWrapper
      data-component-name="ColorControl/ColorControl"
      className={className}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Swatch key={option} className={`tag-${option}`} title={option}>
          <Radio
            type="radio"
            name={name ?? generatedName}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <SwatchFill>
            {value === option && (
              <CheckMark>
                <CheckmarkIcon width="12" height="12" color="--color-static-white" />
              </CheckMark>
            )}
          </SwatchFill>
        </Swatch>
      ))}
    </ColorControlWrapper>
  );
}

const ColorControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  min-height: var(--demo-control-height, 32px);
`;

/* Shares the row with the other swatches, so a long palette never wraps. */
const Swatch = styled.label`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  max-width: 20px;
  cursor: pointer;
`;

/* Kept in the layout so it stays focusable with the keyboard. */
const Radio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const SwatchFill = styled.span`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--tag-color, var(--text-color-secondary));

  ${Radio}:focus-visible + & {
    outline: 2px solid var(--color-primary-base);
    outline-offset: 2px;
  }
`;

const CheckMark = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
