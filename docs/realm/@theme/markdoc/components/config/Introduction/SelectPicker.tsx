import * as React from 'react';
import styled from 'styled-components';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';
import { DropdownMenu } from '@redocly/theme/components/Dropdown/DropdownMenu';
import { Button } from '@redocly/theme/components/Button/Button';
import { CheckmarkIcon } from '@redocly/theme/icons/CheckmarkIcon/CheckmarkIcon';
import { CloseIcon } from '@redocly/theme/icons/CloseIcon/CloseIcon';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectPickerProps<T = string> {
  options: SelectOption<T>[];
  value?: T | T[];
  placeholder?: string;
  onValueChange?: (value: T | T[]) => void;
  className?: string;
  multiple?: boolean;
}

export function SelectPicker<T = string>({ 
  options = [],
  value,
  placeholder = 'Select an option',
  onValueChange,
  className,
  multiple = false
}: SelectPickerProps<T>): React.ReactElement | null {
  if (options.length === 0) {
    return null;
  }

  const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

  const optionItems = options.map((option) => {
    const isSelected = selectedValues.includes(option.value);
    
    return {
      content: (
        <OptionItem>
          {option.icon && (
            <IconWrapper>
              {option.icon}
            </IconWrapper>
          )}
          <span>{option.label}</span>
        </OptionItem>
      ),
      suffix: isSelected && <CheckmarkIcon />,
      onAction: () => {
        if (multiple) {
          const newValues = isSelected 
            ? selectedValues.filter(v => v !== option.value)
            : [...selectedValues, option.value];
          onValueChange?.(newValues);
        } else {
          onValueChange?.(option.value);
        }
      },
      active: isSelected,
    };
  });

  const getDisplayText = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }
    if (multiple) {
      return `${selectedOptions.length} selected`;
    }
    return selectedOptions[0].label;
  };

  const handleRemoveItem = (valueToRemove: T, event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
    if (multiple) {
      const newValues = selectedValues.filter(v => v !== valueToRemove);
      onValueChange?.(newValues);
    }
  };

  if (multiple && selectedOptions.length > 0) {
    const maxVisibleItems = 2;
    const visibleItems = selectedOptions.slice(0, maxVisibleItems);
    const hasMoreItems = selectedOptions.length > maxVisibleItems;
    const remainingCount = selectedOptions.length - maxVisibleItems;

    return (
      <SelectDropdownMultiple
        className={className}
        withArrow={true}
        trigger={
          <Button variant="outlined">
            <SelectedItemsContainer>
              {visibleItems.map((option) => (
                <SelectedItem key={String(option.value)}>
                  {option.icon && (
                    <IconWrapper>
                      {option.icon}
                    </IconWrapper>
                  )}
                  <span>{option.label}</span>
                  <RemoveButton 
                    as="span"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleRemoveItem(option.value, e)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleRemoveItem(option.value, e);
                      }
                    }}
                  >
                    <IconWrapper>
                      <CloseIcon />
                    </IconWrapper>
                  </RemoveButton>
                </SelectedItem>
              ))}
              {hasMoreItems && (
                <EllipsisItem>
                  <span>+{remainingCount} more</span>
                </EllipsisItem>
              )}
            </SelectedItemsContainer>
          </Button>
        }
        triggerEvent="click"
      >
        <DropdownMenu items={optionItems} />
      </SelectDropdownMultiple>
    );
  }

  return (
    <SelectDropdown
      className={className}
      withArrow={true}
      trigger={
        <Button variant="outlined">
          <OptionItem>
            <span className={selectedOptions.length === 0 ? 'placeholder-text' : ''}>
              {getDisplayText()}
            </span>
          </OptionItem>
        </Button>
      }
      triggerEvent="click"
    >
      <DropdownMenu items={optionItems} />
    </SelectDropdown>
  );
}

const SelectDropdown = styled(Dropdown)`
  width: 100%;

  > button {
    width: 100%;
    height: 32px;
    padding-right: 12px;
    padding-left: 12px;
    justify-content: space-between;
    background-color: var(--input-bg-color);
    display: flex;
    align-items: center;

    .placeholder-text {
      color: var(--input-content-placeholder-color);
    }
  }

  > div {
    width: 100%;
  }
`;

const SelectDropdownMultiple = styled(SelectDropdown)`
  > button {
    padding-left: 4px;
  }
`;

const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: var(--button-bg-color-secondary);
  border-radius: 4px;
  padding-left: 8px;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--button-content-color);
  white-space: nowrap;
  flex-shrink: 0;
  
  span {
    flex: 1;
  }
`;

const EllipsisItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--button-content-color);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  padding-left: 4px;
  flex-shrink: 0;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 3px;
  border: none;
  background: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  border-radius: 50%;
  flex-shrink: 0;
  
  &:hover {
    background-color: var(--bg-color-active);
    color: var(--text-color-primary);
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  img, svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;
