import React, { useId } from 'react';
import styled from 'styled-components';

export type RadioGroupOption<T> = {
  value: T;
  label: string;
};

export type RadioGroupProps<T> = {
  options: readonly RadioGroupOption<T>[];
  value?: T;
  onChange: (value: T) => void;
  /** Groups the inputs. Generated when the caller passes nothing. */
  name?: string;
  ariaLabel?: string;
  /** Fills the available width and gives every option an equal share of it. */
  stretch?: boolean;
  className?: string;
};

export function RadioGroup<T>({
  options,
  value,
  onChange,
  name,
  ariaLabel,
  stretch = false,
  className,
}: RadioGroupProps<T>) {
  const generatedName = useId();

  return (
    <RadioGroupWrapper
      data-component-name="RadioGroup/RadioGroup"
      className={className}
      role="radiogroup"
      aria-label={ariaLabel}
      $stretch={stretch}
    >
      {options.map((option) => (
        <Option key={String(option.value)} $stretch={stretch}>
          <Radio
            type="radio"
            name={name ?? generatedName}
            value={String(option.value)}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <Segment>{option.label || 'none'}</Segment>
        </Option>
      ))}
    </RadioGroupWrapper>
  );
}

const RadioGroupWrapper = styled.div<{ $stretch: boolean }>`
  display: ${({ $stretch }) => ($stretch ? 'flex' : 'inline-flex')};
  width: ${({ $stretch }) => ($stretch ? '100%' : 'auto')};
  /* The control sits in a stretching column, so keep it at the width of its options. */
  align-self: flex-start;
  max-width: 100%;
  border: 1px solid var(--border-color-primary);
  border-radius: var(--border-radius-md);
  /* Scrolls rather than squeezing the labels when the row is too narrow. */
  overflow-x: auto;
  overflow-y: hidden;
`;

const Option = styled.label<{ $stretch: boolean }>`
  position: relative;
  display: flex;
  /* Share the row evenly when stretched, and never shrink otherwise so a label is never cut off. */
  flex: ${({ $stretch }) => ($stretch ? '1 1 0' : '0 0 auto')};
  min-width: 0;

  & + & {
    border-left: 1px solid var(--border-color-primary);
  }
`;

/* Kept in the layout so it stays focusable with the keyboard. */
const Radio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

const Segment = styled.span`
    --color-primary-main: var(--color-info-base);  
    
  flex: 1 1 auto;
  text-align: center;
  padding: 5px var(--spacing-xxs);
  background: var(--bg-color);
  color: var(--text-color-primary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
  cursor: pointer;
  white-space: nowrap;

  ${Radio}:hover + & {
    background: var(--color-warm-grey-2);
  }

  ${Radio}:checked + & {
    background: var(--color-primary-main);
    color: var(--color-primary-text-on-color);
    font-weight: var(--font-weight-medium);
    cursor: default;
  }

  ${Radio}:focus-visible + & {
    outline: 2px solid var(--color-primary-main);
    outline-offset: -2px;
  }
`;
