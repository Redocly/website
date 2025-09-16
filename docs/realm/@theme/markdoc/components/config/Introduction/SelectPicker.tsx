import * as React from 'react';
import styled from 'styled-components';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';
import { DropdownMenu } from '@redocly/theme/components/Dropdown/DropdownMenu';
import { Button } from '@redocly/theme/components/Button/Button';
import { CheckmarkIcon } from '@redocly/theme/icons/CheckmarkIcon/CheckmarkIcon';

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
    const maxVisibleItems = 3;
    const visibleItems = selectedOptions.slice(0, maxVisibleItems);
    const hasMoreItems = selectedOptions.length > maxVisibleItems;
    const remainingCount = selectedOptions.length - maxVisibleItems;

    return (
      <SelectDropdown
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
                    ×
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
      </SelectDropdown>
    );
  }

  return (
    <SelectDropdown
      className={className}
      withArrow={true}
      trigger={
        <Button variant="outlined">
          <OptionItem>
            <span>{getDisplayText()}</span>
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
  
  --dropdown-menu-item-justify-content: space-between;
  --dropdown-menu-item-bg-color: var(--bg-color-raised);
  --dropdown-menu-item-bg-color-hover: var(--bg-color-hover);
  --dropdown-menu-item-bg-color-active: var(--bg-color-hover);
  --dropdown-menu-item-color: var(--text-color-primary);
  --dropdown-menu-item-color-hover: var(--text-color-primary);
  --dropdown-menu-item-color-active: var(--text-color-primary);

  > button {
    width: 100%;
    justify-content: space-between;
    background-color: var(--input-bg-color);
  }
`;

const SelectedItemsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  width: 100%;
  overflow: hidden;
  align-items: center;
`;

const SelectedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--button-bg-color-secondary, #f3f4f6);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  color: var(--text-color-primary, #374151);
  white-space: nowrap;
  flex-shrink: 0;
  
  span {
    flex: 1;
  }
`;

const EllipsisItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-color-secondary, #6b7280);
  font-size: 12px;
  padding: 2px 4px;
  flex-shrink: 0;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: none;
  background: none;
  color: var(--text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
  flex-shrink: 0;
  
  &:hover {
    background-color: var(--bg-color-active, #e5e7eb);
    color: var(--text-color-primary, #374151);
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 8px);
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  img, svg {
    width: 16px;
    height: 16px;
    display: block;
  }
`;
