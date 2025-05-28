import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';

import type { ResolvedNavItem, ResolvedNavLinkItem, ResolvedNavGroupItem } from '@redocly/config';

import { getPathnameForLocale, withPathPrefix } from '@redocly/theme/core/utils';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { Link } from '@redocly/theme/components/Link/Link';
import { Dropdown } from '@redocly/theme/components/Dropdown/Dropdown';

type NavbarItemProps = {
  navItem: ResolvedNavItem;
  className?: string;
};

export function NavbarItem({ navItem, className }: NavbarItemProps): JSX.Element | null {
  const { pathname } = useLocation();
  const { useTranslate, useI18nConfig, useTelemetry } = useThemeHooks();
  const { translate } = useTranslate();
  const { defaultLocale, currentLocale, locales } = useI18nConfig();
  const telemetry = useTelemetry();
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    setIsTouch(window.ontouchstart !== undefined);
  }, []);

  if ((navItem as ResolvedNavLinkItem).link) {
    const item = navItem as ResolvedNavLinkItem;

    const isActive =
      pathname ===
      withPathPrefix(getPathnameForLocale(item.link, defaultLocale, currentLocale, locales));
    return (
      <NavbarMenuItem
        active={isActive}
        data-component-name="Navbar/NavbarItem"
        className={className}
        onClick={() => telemetry.send('navbar_menu_item_clicked', { type: 'link' })}
      >
        <NavbarLink to={item.link} external={item.external} target={item.target} active={isActive}>
          {item.icon ? <NavbarIcon url={item.icon} /> : null}
          <NavbarLabel>{translate(item.labelTranslationKey, item.label)}</NavbarLabel>
          {item.external ? <LaunchIcon size="10px" /> : null}
        </NavbarLink>
      </NavbarMenuItem>
    );
  } else if ((navItem as ResolvedNavGroupItem).items) {
    const item = navItem as ResolvedNavGroupItem;
    const groupItems = item.items as ResolvedNavItem[];
    const isActive = groupItems
      .flatMap((groupItem) => {
        if (groupItem.link) {
          return (
            pathname ===
            withPathPrefix(
              getPathnameForLocale(groupItem?.link, defaultLocale, currentLocale, locales),
            )
          );
        }
        return false;
      })
      .includes(true);

    const descriptions = [
      'Collaborative editor suite',
      'Combo of Redoc, Revel, and Reef',
      'External developer showcase',
      'API reference and mock server',
      'Internal service catalog',
      'API monitoring',
    ];
    const groupItemsComponents = groupItems.reduce((acc, curr, index) => {
      if (curr.type.startsWith('separator')) {
        acc.push({ [curr.label as string]: [] });
      } else {
        if (curr.label === 'Reunite') {
          acc[acc.length - 1][Object.keys(acc[acc.length - 1])[0]].push(
            <ReuniteBlock key={`${curr.label}`} to={curr.link}>
              <ReuniteDescription>Build your docs with</ReuniteDescription>
              <LabelBlock>
                <IconText>
                  <Icon src={curr.icon} />
                  <p>{curr.label}</p>
                </IconText>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="inherit"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="28" height="28" rx="14" fill="inherit" />
                  <path
                    d="M14.875 9.625L14.2494 10.2344L17.5656 13.5625H8.75V14.4375H17.5656L14.2494 17.7507L14.875 18.375L19.25 14L14.875 9.625Z"
                    fill="inherit"
                  />
                </svg>
              </LabelBlock>
            </ReuniteBlock>,
          );
        } else {
          acc[acc.length - 1][Object.keys(acc[acc.length - 1])[0]].push(
            <StyledLink key={`${curr.label}`} to={curr.link}>
              {curr.icon && <Icon src={curr.icon} />}
              <TextBlock>
                {curr.label}
                {descriptions[index - 1] && <span>{descriptions[index - 1]}</span>}
              </TextBlock>
            </StyledLink>,
          );
        }
      }
      return acc;
    }, [] as any);

    const products: any = [];
    const openSource: any = [];
    let reunite: any = {};

    groupItemsComponents.map((item) => {
      Object.entries(item).map(([key, value]) => {
        if (key === 'Products') {
          (value as any).map((value, index) => {
            if (index === 0) {
              reunite = value;
            } else {
              products.push(value);
            }
          });
        } else {
          (value as any).map((value) => {
            openSource.push(value);
          });
        }
      });
    });

    return (
      <NavbarMenuItemDropdown
        trigger={
          <NavbarMenuItem
            active={isActive}
            data-component-name="Navbar/NavbarItem"
            className={className}
            onClick={() => telemetry.send('navbar_menu_item_clicked', { type: 'group' })}
          >
            <NavbarIcon url={item.icon} />
            <NavbarLabel>{translate(item.labelTranslationKey, item.label)}</NavbarLabel>
            <ArrowIcon
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="16" height="16" fill="none" style={{ mixBlendMode: 'multiply' }} />
              <path
                d="M8 10.9998L3 5.9998L3.7 5.2998L8 9.5998L12.3 5.2998L13 5.9998L8 10.9998Z"
                fill="#1C1C1C"
              />
            </ArrowIcon>
          </NavbarMenuItem>
        }
        triggerEvent={isTouch ? 'click' : 'hover'}
      >
        <DropdownCasket>
          <DropdownWrapper>
            <ProductsBlock>
              {reunite && (
                <DropdownListItemReunite style={{ display: 'flex' }}>
                  {reunite}
                </DropdownListItemReunite>
              )}
              <DropdownList>
                {products && (
                  <ListItemSection>
                    {products.map((link, index) => {
                      return (
                        <DropdownListItem
                          key={index}
                          product={`${link.key.toLowerCase()}`}
                          isLast={index === products.length - 1}
                        >
                          {link}
                        </DropdownListItem>
                      );
                    })}
                  </ListItemSection>
                )}

                {openSource && (
                  <OpenSourceBlock>
                    <Label>
                      <img src={require('./images/open-source-icon.svg')} />
                      Open source tools:
                    </Label>
                    <Items>
                      {openSource.map((link, index) => (
                        <span key={index}>{link}</span>
                      ))}
                    </Items>
                  </OpenSourceBlock>
                )}
              </DropdownList>
            </ProductsBlock>
          </DropdownWrapper>
        </DropdownCasket>
      </NavbarMenuItemDropdown>
    );
  } else return null;
}

const Items = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  a {
    color: var(--text-color-primary);
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

    :hover {
      text-decoration: underline;
    }
  }
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--text-color-description);
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  margin: 0;
`;

const OpenSourceBlock = styled.div`
  display: flex;
  /* width: 500px; */
  padding: 8px 12px;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
  background: var(--bg-open-source-tools);

  margin-top: 8px;
`;

const ProductsBlock = styled.div`
  display: flex;
  gap: 8px;
`;

const ReuniteBlock = styled(Link)`
  display: flex;
  border-radius: 4px;
  flex-direction: column;

  justify-content: space-between;
  width: inherit;

  &:hover {
    svg {
      transform: rotate(-45deg);
      transition: transform 0.3s ease-in-out;
      path {
        fill: var(--color-greyscale-90);
      }
    }
  }
`;

const ReuniteDescription = styled.p`
  color: var(--text-color-primary);
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  margin: 0;
`;

const LabelBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > svg {
    rect {
      fill: var(--color-ontonal);
    }
    path {
      fill: var(--color-arrow);
    }
  }

  a {
    section {
      background-color: var(--bg-color);
    }
    &:hover {
      section {
        background-color: var(--bg-color);

        svg {
          transform: rotate(-45deg);
          transition: transform 0.3s ease-in-out;
          path {
            fill: var(--color-greyscale-90);
          }
        }
      }
    }
  }
`;

const IconText = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  p {
    color: var(--text-color-primary);
    font-family: 'Red Hat Display';
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;

    margin: 0;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;

  color: var(--text-color-primary);

  span {
    color: var(--text-color-secondary);
  }
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;

const DropdownCasket = styled.div`
  background-color: transparent;
  padding: 18px 0 0 0;
  position: relative;
  width: 200px;
`;

export const DropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
  z-index: 1;
`;

export const DropdownListItem = styled.li<{ product?: string, isLast?: boolean }>`
  display: block;
  width: 100%;
  border: none;
  background: none;
  padding: 8px 12px;
  border-radius: var(--dropdown-list-item-border-radius);
  appearance: none;
  text-align: left;
  color: var(--text-color-primary);
  font-size: 14px;
  font-weight: 500;

  & > * {
    padding: var(--dropdown-list-item-padding-vertical) var(--dropdown-list-item-padding-horizontal);
    border-radius: var(--dropdown-list-item-border-radius);
    &:focus-visible {
      outline: 1px solid var(--dropdown-list-item-border-color-focused);
    }
  }

  :hover {
    background: ${({ product, isLast }) =>
      isLast
        ? 'var(--hover-last-navbar-color)'
        : `var(--${product}-color-hover)`};
  }
`;

const DropdownListItemReunite = styled(DropdownListItem)`
  display: flex;
  width: 212px;
  background-image: url(${require('./images/eclipse.svg')});
  padding: 20px 20px 22px 20px;

  :hover {
    background-image: url(${require('./images/eclipse.svg')});
  }
`;

const ListItemSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
`;

const DropdownWrapper = styled.div`
  && {
    position: absolute;
    top: 100%;
    bottom: auto;
    left: -150px;
    right: auto;
    margin: 0;
    min-width: var(--dropdown-list-min-width);
    max-width: var(--dropdown-list-max-width);
    max-height: var(--dropdown-list-max-height);
    padding: 8px;
    background-color: var(--dropdown-list-bg-color);
    border-radius: var(--dropdown-list-border-radius);
    box-shadow: var(--dropdown-list-box-shadow);
    border: 1px solid var(--dropdown-list-border-color);
    list-style-type: none;
    cursor: default;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 2;
  }

  a {
    text-decoration: none;
    color: var(--dropdown-content-color-default);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  position: relative;
  line-height: 22px;
  flex-direction: row;
  gap: 8px;

  span {
    font-size: 12px !important;
    color: var(--color-warm-grey-7) !important;
    line-height: 20px;
    font-weight: 400;
  }
`;

const ArrowIcon = styled.svg`
  margin-left: 5px;
  transition: transform 0.6 ease-in-out;
`;

const NavbarMenuItemDropdown = styled(Dropdown)`
  height: 32px;

  li {
    padding: 5px 10px 5px 12px;
  }

  &:hover {
    /* text-decoration: var(--navbar-item-text-decoration-hover);
    background: var(--navbar-item-bg-color-hover); */

    ${ArrowIcon} {
      transform: rotate(180deg);
    }
  }
`;

const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ active }) =>
    active ? 'var(--navbar-item-text-color-active)' : 'var(--navbar-text-color)'};
  text-decoration: ${({ active }) =>
    active ? 'var(--navbar-item-text-decoration-active)' : 'none'};
`;

const NavbarMenuItem = styled.li<{ active?: boolean }>`
  display: flex;
  padding: 5px 12px;
  font-family: var(--navbar-font-family);
  text-align: center;
  align-items: center;
  line-height: var(--navbar-item-line-height);
  font-weight: var(--navbar-item-font-weight);
  font-size: var(--navbar-font-size);
  z-index: 1;

  border-radius: var(--navbar-item-border-radius);
  border-bottom: ${({ active }) =>
    active ? 'var(--navbar-item-bottom-border-active)' : 'var(--navbar-item-bottom-border)'};

  background-color: ${({ active }) => active && 'var(--navbar-item-bg-color-active)'};
  color: ${({ active }) =>
    active ? 'var(--navbar-item-text-color-active)' : 'var(--navbar-text-color)'};
`;

const NavbarLabel = styled.span`
  cursor: pointer;
  vertical-align: middle;
`;

const NavbarIcon = styled.i<{ url?: string }>`
  ${({ url }) =>
    url &&
    css`
      background-image: url('${url}');
      width: var(--navbar-item-icon-width);
      height: var(--navbar-item-icon-height);
      display: inline-block;
      background-size: contain;
      margin-right: var(--navbar-item-icon-margin-right);
      vertical-align: middle;
      background-position: center;
      background-repeat: no-repeat;
    `}
`;
