import React, { useId, useMemo } from 'react';
import styled from 'styled-components';

import { Select } from '@redocly/theme/components/Select/Select';
import { Switch } from '@redocly/theme/components/Switch/Switch';
import { Tooltip } from '@redocly/theme/components/Tooltip/Tooltip';
import { InformationIcon } from '@redocly/theme/icons/InformationIcon/InformationIcon';

import { ColorControl } from '../ColorControl/ColorControl';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { getControlKind, getEnumOptions } from './properties';

import type { AttributeControlKind, AttributeDescriptor, AttributeValue } from './properties';

export type AttributeControlProps = {
  name: string;
  /** Shown instead of the name, exactly as given. */
  label?: string;
  descriptor: AttributeDescriptor;
  value: AttributeValue;
  onChange: (value: AttributeValue) => void;
  className?: string;
};

export function AttributeControl({
  name,
  label: labelText,
  descriptor,
  value,
  onChange,
  className,
}: AttributeControlProps) {
  const controlId = useId();
  const kind = getControlKind(descriptor);
  // Select and ColorControl run effects on every new options identity, so keep the array stable.
  const options = useMemo(() => getEnumOptions(descriptor), [descriptor]);
  const selectOptions = useMemo(
    () =>
      options?.map((option) => ({
        value: option,
        label: String(option),
        element: String(option),
      })),
    [options],
  );
  const colorOptions = useMemo(() => options?.map((option) => String(option)), [options]);

  const label = (
    <LabelRow>
      <Label htmlFor={controlId}>
        {labelText ?? formatLabel(name)}
        {descriptor.required && <Required>*</Required>}
      </Label>
      {kind === 'color' && value !== undefined && <ValueName>{formatLabel(String(value))}</ValueName>}
      {descriptor.description && (
        <Tooltip tip={descriptor.description} placement="top" width="240px">
          <DescriptionTrigger type="button" aria-label={`About ${name}`}>
            <InformationIcon width="14" height="14" color="--icon-color-secondary" />
          </DescriptionTrigger>
        </Tooltip>
      )}
    </LabelRow>
  );

  // A switch keeps its label on one row, with the control at the end.
  if (kind === 'switch') {
    return (
      <SwitchFieldWrapper data-component-name="Demo/AttributeControl" className={className}>
        {label}
        <Switch value={Boolean(value)} onChange={onChange} />
      </SwitchFieldWrapper>
    );
  }

  return (
    <AttributeControlWrapper data-component-name="Demo/AttributeControl" className={className}>
      {label}
      {kind === 'color' && colorOptions ? (
        <ColorControl
          value={value === undefined ? undefined : String(value)}
          options={colorOptions}
          onChange={onChange}
          ariaLabel={name}
        />
      ) : kind === 'radio' && selectOptions ? (
        <RadioGroup
          value={value}
          options={selectOptions}
          onChange={onChange}
          ariaLabel={name}
          stretch
        />
      ) : kind === 'select' && selectOptions ? (
        <FullWidthSelect
          value={value}
          options={selectOptions}
          placeholder="Not set"
          clearable={!descriptor.required}
          onChange={(next) => onChange(next as AttributeValue)}
        />
      ) : kind === 'textarea' ? (
        <TextArea
          id={controlId}
          rows={2}
          value={value === undefined ? '' : String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <Input
          id={controlId}
          type={kind === 'number' ? 'number' : 'text'}
          value={value === undefined ? '' : String(value)}
          placeholder={descriptor.default === undefined ? 'Not set' : String(descriptor.default)}
          onChange={(event) => onChange(readInputValue(event.target.value, kind))}
        />
      )}
    </AttributeControlWrapper>
  );
}

/** Turns a name such as "badgeColor" or "persian-green" into "Badge color" / "Persian green". */
function formatLabel(name: string): string {
  const words = name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .toLowerCase();

  return words.charAt(0).toUpperCase() + words.slice(1);
}

function readInputValue(raw: string, kind: AttributeControlKind): AttributeValue {
  if (kind !== 'number') {
    return raw;
  }

  return raw === '' ? undefined : Number(raw);
}

const AttributeControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  min-width: 0;
`;

const SwitchFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  min-width: 0;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  min-height: 22px;
`;

const Label = styled.label`
  color: var(--text-color-secondary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);
`;

const ValueName = styled.span`
  color: var(--text-color-helper);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
`;

const Required = styled.span`
  color: var(--color-red-6, #d64545);
  margin-left: 2px;
`;

const DescriptionTrigger = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: help;

  &:focus-visible {
    outline: 2px solid var(--color-primary-base);
    outline-offset: 2px;
    border-radius: var(--border-radius);
  }
`;

const controlTypography = `
  color: var(--text-color-primary);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-base);
`;

const controlSurface = `
  border: 1px solid var(--input-border-color);
  border-radius: var(--border-radius-lg);
  background: var(--input-bg-color);

  &:hover {
    border-color: var(--color-warm-grey-4);
  }

  &:focus {
    border-color: var(--color-primary-base);
    outline: none;
  }
`;

const FullWidthSelect = styled(Select)`
  width: 100%;
  min-height: var(--demo-control-height);
`;

const Input = styled.input`
  ${controlTypography}
  ${controlSurface}
  width: 100%;
  min-height: var(--demo-control-height);
  padding: 0 var(--spacing-sm);
`;

const TextArea = styled.textarea`
  ${controlTypography}
  ${controlSurface}
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-family: var(--font-family-monospaced);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  resize: vertical;
`;
