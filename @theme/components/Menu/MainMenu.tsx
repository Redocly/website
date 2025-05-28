import styled from 'styled-components';
import React from 'react';

import { MenuItem } from '@redocly/theme/components/Menu/MenuItem';
import { MenuItemType } from '@redocly/theme/core/constants';
import { getMenuItemType } from '@redocly/theme/core/utils';

import { Button } from '@redocly/marketing-pages/components/Button/CustomButton.js';

import { MenuListProps } from './ProductsMenu';

export function MainMenu({
  depth = 0,
  items,
  className,
  isMobile,
  onDrilldownOpen
}: MenuListProps): JSX.Element {
  const activeItem = items.find(({ active }) => active);

  return (
    <MenuWrapper className={className} data-component-name="Menu/MainMenu">
      <div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <MenuItem
                item={item}
                key={`${item.link || item.label}-${index}`}
                activeItem={activeItem}
                isMobile={isMobile}
                depth={depth}
                onClick={() => {
                  if (getMenuItemType(item) === MenuItemType.DrillDown) {
                    onDrilldownOpen?.({ previousLink: activeItem?.link, item });
                  }
                }}
              />
              <Separator />
            </div>
          );
        })}
      </div>
      <FooterBlock>
        <StyledSignUpButton
          to="https://auth.cloud.redocly.com/registration"
          className="landing-button"
        >
          Start 30-day free trial
        </StyledSignUpButton>
        <StyledLogInButton to="https://auth.cloud.redocly.com/login" className="landing-button">
          Log In
        </StyledLogInButton>
      </FooterBlock>
    </MenuWrapper>
  );
}

const Separator = styled.div`
  height: 1px;
  background-color: var(--border-color-secondary);
  margin: 0 12px;
`;

export const StyledSignUpButton = styled(Button)`
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-warm-grey-10);
  height: 32px;
  font-family: var(--navbar-font-family);
  font-size: 14px !important;
  font-weight: 500;
  line-height: 24px;
  color: var(--bg-color) !important;
  background-color: var(--button-bg);
  width: -webkit-fill-available;

  &:hover {
    background-color: var(--text-color-primary);
  }
`;

export const StyledLogInButton = styled(StyledSignUpButton)`
  color: var(--color-warm-grey-8) !important;
  background-color: transparent;
  border: none;
  width: -webkit-fill-available;

  &:hover {
    background-color: transparent;
  }
`;

export const FooterBlock = styled.div`
  display: flex;
  padding: 12px 16px;
  margin-left: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: -webkit-fill-available;
  background-color: var(--menu-mobile-bg);
  margin-top: 30px;

  a {
    width: -webkit-fill-available;
  }
`;

const MenuWrapper = styled.ul`
  padding: var(--menu-padding);
  margin: var(--menu-margin);
  list-style: var(--menu-list-style);
  color: var(--menu-content-color);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  [data-component-name='Menu/MenuItem'] {
    a li, li {
      margin: 0;
      padding: 8px 12px 0;
      background-color: transparent;

      span span {
        display: flex;
        padding: 8px 0px;
        gap: 10px;

        color: var(--text-color-primary);

        font-family: 'Red Hat Display';
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 8px;
      }
    }
  }
`;
