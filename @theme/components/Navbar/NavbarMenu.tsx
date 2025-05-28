import React from 'react';
import styled from 'styled-components';

import type { ResolvedConfigLinks, ResolvedNavItem } from '@redocly/config';

import { NavbarItem } from '@redocly/theme/components/Navbar/NavbarItem';
import { breakpoints } from '@redocly/theme/core/utils';

export function NavbarMenu({
  menuItems,
  className,
}: {
  menuItems: ResolvedConfigLinks;
  className?: string;
}): JSX.Element | null {

  React.useEffect(() => {
    const tabs = document.querySelectorAll('[data-component-name="Navbar/NavbarItem"]');
    const navMenu = document.getElementById('navigation-menu');
    const navbarMenu = document.getElementById('nav-items-block');

    tabs.forEach((tab) => {
      tab.addEventListener('mouseover', () => {
        if (navbarMenu !== null && navMenu !== null) {
          const tabRect = tab.getBoundingClientRect();
          const navbarRect = navbarMenu?.getBoundingClientRect();

          const width = tabRect.width;
          const transform = tabRect.left - navbarRect.left;

          navMenu.style.width = `${width}px`;
          navMenu.style.transform = `translateX(${transform}px)`;
          navMenu.style.opacity = '1';
        }
      });
    });

    navbarMenu?.addEventListener('mouseleave', () => {
      navMenu !== null && (navMenu.style.opacity = '0');
    });
  },[])

  return (
    <NavItemsContainer data-component-name="Navbar/NavbarMenu" className={className}>
      <NavItemsBlock id="nav-items-block">
        <NavigationMenu id="navigation-menu" />
        {(menuItems as ResolvedNavItem[]).map((navItem, index) => {
          return (
            <NavbarItem
              key={`${navItem.label}_${index}`}
              data-cy={navItem.label}
              navItem={navItem}
            />
          );
        })}
      </NavItemsBlock>
    </NavItemsContainer>
  );
}

const NavigationMenu = styled.div`
  position: absolute;
  left: 0;
  width: 40px;
  height: 32px;
  transition-duration: 250ms;
  transition-property: width, transform;
  transition-timing-function: ease;
  background-color: var(--navbar-item-bg-color-hover);
  border-radius: var(--navbar-item-border-radius);
  opacity: 0;
`;

const NavItemsBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
`;

const NavItemsContainer = styled.ul`
  list-style: none;
  padding: 0;
  display: none;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (min-width: ${breakpoints.medium}) {
    display: flex;
  }
`;
