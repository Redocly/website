import styled from 'styled-components';
import React from 'react';

import type { DrilldownMenuItemDetails, ItemState } from '@redocly/theme/core/types';

import { MenuItem } from '@redocly/theme/components/Menu/MenuItem';
import { FooterBlock, StyledLogInButton, StyledSignUpButton } from './MainMenu';

export type MenuListProps = {
  items: ItemState[];
  depth?: number;
  isMobile?: boolean;
  className?: string;
  onDrilldownOpen?: (drilldownDetails: DrilldownMenuItemDetails) => void;
};

export function ProductsMenu({
  depth = 0,
  items,
  className,
  isMobile,
}: MenuListProps): JSX.Element {
  const activeItem = items.find(({ active }) => active);

  const descriptions = [
    'Build your API with',
    'Combo of Redoc, Revel, and Reef',
    'External developer showcase',
    'API reference and mock server',
    'Internal service catalog',
    'API monitoring',
  ];

  for (let i = 0; i < descriptions.length; i++) {
    items[i + 1].sublabel = descriptions[i];
  }

  const products = getProducts(items);
  const openSourceTools = getOpenSourceTools(items);
  
  return (
    <MenuWrapper className={className} data-component-name="Menu/ProductsMenu">
      <div>
        {products.map((item, index) => {
          return item.label === 'Reunite' && item.type !== 'separator' ? (
            <ReuniteItem
              item={item}
              key={`${item.link || item.label}-${index}`}
              activeItem={activeItem}
              isMobile={isMobile}
              depth={depth}
            />
          ) : (
            <>
              {item.type !== 'separator' && (
                <>
                  <MenuItem
                    item={item}
                    key={`${item.link || item.label}-${index}`}
                    activeItem={activeItem}
                    isMobile={isMobile}
                    depth={depth}
                  />
                  <Separator />
                </>
              )}
            </>
          );
        })}
        {openSourceTools && (
          <OpenSourceToolsWrapper>
            <OpenSourceSeparator>
              <img src={require('../Navbar/images/open-source-icon.svg')} />
              <Title>Open source tools</Title>
            </OpenSourceSeparator>
            <div style={{backgroundColor: "var(--border-color-primary)", height: "1px"}}/>
            <Items>
              {openSourceTools.map((item, index) => (
                <OpenSourceItem
                  item={item}
                  key={`${item.link || item.label}-${index}`}
                  activeItem={activeItem}
                  isMobile={isMobile}
                  depth={depth}
                  isLast={index === openSourceTools.length - 2}
                />
              ))}
            </Items>
          </OpenSourceToolsWrapper>
        )}
      </div>
      <FooterBlock
      // style={{ position: 'fixed', bottom: '0', backgroundColor: 'white', width: '100%' }}
      >
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

const getProducts = (arr) => {
  const separatorsIndices = arr
    .map((obj, index) => (obj.type === 'separator' ? index : null))
    .filter((index) => index !== null);

  if (separatorsIndices.length < 2) {
    return [];
  }
  const start = separatorsIndices[0];
  const end = separatorsIndices[separatorsIndices.length - 1];

  return arr.slice(start + 1, end);
};

const getOpenSourceTools = (arr) => {
  const separatorsIndices = arr
    .map((obj, index) => (obj.type === 'separator' ? index : null))
    .filter((index) => index !== null);

  if (separatorsIndices.length < 2) {
    return [];
  }

  const end = separatorsIndices[separatorsIndices.length - 1];

  return arr.slice(end + 1, arr.length);
};

const OpenSourceItem = styled(MenuItem)<{isLast?: boolean}>`
  margin: 0 !important;
  border-bottom: 1px solid var(--border-color-primary);
  border-radius: 0 !important;

  a {
    margin: 8px 0 !important;
    padding: 0 !important;
    border-radius: 0 !important;
    border-left: ${({isLast}) => isLast && '1px solid var(--border-color-primary)'};
    li div span span {
      padding-left: ${({isLast}) => isLast && '16px'};
    }
  }

  &:last-child {
    border-bottom: none;

    a {
      margin: 8px 0 0 0 !important;
    }
  }
`

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Title = styled.p`
  color: var(--text-color-secondary);

  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  margin: 0;
`;

const OpenSourceSeparator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 8px;
`;

const OpenSourceToolsWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  flex-direction: column;

  border-radius: 4px;
  background: var(--bg-color-active);

  margin: 8px 12px 8px 12px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: var(--border-color-secondary);
  margin: 0 12px;
`;

const ReuniteItem = styled(MenuItem)`
  padding: 16px 16px 18px 16px !important;
  border-bottom: 0 !important;
  background-image: url(${require('../Navbar/images/eclipse.svg')});
  background-size: cover;
  margin-top: 8px !important;
  -webkit-text-fill-color: initial;

  a {
    padding: 0 !important;
    :active {
      background-color: transparent !important;
    }
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 0;
  }

  li {
    background-color: transparent !important;
    div a {
      width: auto !important;
    }
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

  img {
    width: 24px;
    height: 24px;
    border-radius: 0;
  }

  .menu-item-type-separator {
    padding: 8px 12px 0;
    color: var(--text-color-description);
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;

    li {
      background-color: transparent;
      margin: 0;
      padding: 0;
    }
  }

  .menu-item-type-default {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    align-self: stretch;
    border-radius: 4px;
    margin: 8px 12px;
    padding: 0;

    a {
      width: 100%;
      padding: 4px 16px;
      border-radius: 4px;

      :active {
        background-color: var(--menu-item-bg-color-active);
      }

      li {
        margin: 0;
        padding: 0;
        align-items: flex-start;
        background-color: transparent !important;

        div {
          span {
            overflow: hidden;
            color: var(--text-color-primary);
            text-overflow: ellipsis;
            font-family: 'Red Hat Display';
            font-size: 16px;
            font-weight: 600;
            line-height: 20px;
          }
          div {
            margin: 0;
          }
        }
      }
    }
  }
`;
