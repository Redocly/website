import React from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';

import type { ResolvedConfigLinks } from '@redocly/config';

import { breakpoints } from '@redocly/theme/core/utils';
import { useThemeHooks, useThemeConfig, useMobileMenu } from '@redocly/theme/core/hooks';
import { NavbarLogo } from '@redocly/theme/components/Navbar/NavbarLogo';
import { MenuMobile } from '@redocly/theme/components/Menu/MenuMobile';
import { ColorModeSwitcher } from '@redocly/theme/components/ColorModeSwitcher/ColorModeSwitcher';
import { LanguagePicker } from '@redocly/theme/components/LanguagePicker/LanguagePicker';
import { ProductPicker } from '@redocly/theme/components/Product/ProductPicker';
import { Button } from '@redocly/theme/components/Button/Button';
import { CloseIcon } from '@redocly/theme/icons/CloseIcon/CloseIcon';
import { Search } from '@redocly/theme/components/Search/Search';
import { Banner } from '@redocly/theme/components/Banner/Banner';

import { MenuIcon } from '@redocly/marketing-pages/icons/MenuIcon.js';
import { TextSmall } from '@redocly/marketing-pages/components/TypographyElements/TypographyElements.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';
import { useLocalStorage } from '@redocly/marketing-pages/hooks/useLocalStorage.js';

import { NavbarMenu } from './NavbarMenu';

export type NavbarProps = {
  className?: string;
};

export function Navbar({ className }: NavbarProps): JSX.Element | null {
  const { isOpen, openMobileMenu, closeMobileMenu } = useMobileMenu(false);
  const themeConfig = useThemeConfig();
  const { useI18n } = useThemeHooks();
  const { changeLanguage } = useI18n();

  const logo = themeConfig.logo;

  const { navbar } = themeConfig;

  const colorfulPagesList = ['/', '/reunite', '/contact-us', '/reef'];
  const defaultPageList = [
    '/',
    '/reunite',
    '/contact-us',
    '/reef',
    '/revel',
    '/pro',
    '/enterprise',
    '/enterprise-plus',
    '/pricing',
    '/realm',
    '/redoc',
  ];

  const { pathname } = useLocation();
  const showVSCodeExtensionBanner = pathname?.startsWith('/redocly-cli');

  const isDocsPage = pathname?.includes('/docs') && pathname !== '/docs-like-code';
  const isLearnPage = pathname?.startsWith('/learn/');
  const isDocsOrLearnPage = isDocsPage || isLearnPage;
  const isEditorPage = pathname === '/editor';
  const isPreviewPage = pathname === '/preview';

  React.useEffect(() => {
    if (!isDocsPage && !isLearnPage && !isEditorPage && !isPreviewPage) {
      document.documentElement.classList.replace('dark', 'light');
    } else {
      document.documentElement.classList.replace(
        'light',
        localStorage.getItem('colorSchema') || 'light',
      );
    }
  }, [isDocsPage, isLearnPage, isEditorPage, isPreviewPage]);

  const menu = themeConfig.navbar?.items;

  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollPos, setPrevScrollPos] = React.useState(0);

  const handleScroll = (prevScrollPos) => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos <= 20;
    setIsVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  React.useEffect(() => {
    handleScroll(window.pageYOffset + 1);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', () => handleScroll(prevScrollPos));

    return () => {
      window.removeEventListener('scroll', () => handleScroll(prevScrollPos));
    };
  }, [prevScrollPos]);

  if (navbar?.hide) {
    return null;
  }

  return (
    <NavbarContainer
      data-component-name="Navbar/Navbar"
      className={className}
      isVisible={isVisible}
      isTop={prevScrollPos === 0}
      isColorful={colorfulPagesList.includes(pathname)}
      isDefault={defaultPageList.includes(pathname)}
      isDocs={isDocsOrLearnPage || isEditorPage}
      showVSCodeExtensionBanner={showVSCodeExtensionBanner}
      isMobile={isOpen}
      isRespect={pathname === '/respect'}
    >
      {!showVSCodeExtensionBanner && <Banner />}
      {showVSCodeExtensionBanner && <VSCodeExtensionBanner />}
      {isOpen && <MenuMobile />}
      <NavbarRow>
        <LogoMenuWrapper>
          {logo && <NavbarLogo config={logo} />}
          <ProductPicker />
          {menu && <NavbarMenu menuItems={menu as unknown as ResolvedConfigLinks} />}
        </LogoMenuWrapper>
        <RightPanelWrapper>
          <LanguagePicker onChangeLanguage={changeLanguage} onlyIcon alignment="end" />
          <ColorModeSwitcherWrapper
            isVisible={isDocsOrLearnPage || pathname?.startsWith('/learn') || isEditorPage || isPreviewPage}
            isMobileOpen={isOpen}
          >
            <ColorModeSwitcher />
          </ColorModeSwitcherWrapper>
          <MobileMenuButton
            variant="text"
            data-cy="mobile-menu-button"
            onClick={isOpen ? closeMobileMenu : openMobileMenu}
            icon={isOpen ? <CloseIcon /> : <MenuIcon />}
          />
          {isDocsOrLearnPage && (
            <DesktopWrapper>
              <SearchWrapper>
                <Search />
              </SearchWrapper>
            </DesktopWrapper>
          )}
          <DesktopWrapper>
            <StyledLogInButton to="https://auth.cloud.redocly.com/login" className="landing-button">
              Log In
            </StyledLogInButton>
            <StyledSignUpButton
              to="https://auth.cloud.redocly.com/registration"
              className="landing-button"
            >
              Start 30-day free trial
            </StyledSignUpButton>
          </DesktopWrapper>
        </RightPanelWrapper>
      </NavbarRow>
    </NavbarContainer>
  );
}

const VSCodeExtensionBanner = () => {
  const [vsCodeExtensionBanner, setVSCodeExtensionBanner] = useLocalStorage(
    'vsCodeExtensionBanner',
    true,
  );

  if (vsCodeExtensionBanner === false) return <></>;
  return (
    <VSCodeExtWrapper>
      <Box alignItems="center">
        <TextSmall color="var(--secondary-color)">
          Open source strikes again! Check out our VS Code extension
        </TextSmall>
        <NewLabel>New</NewLabel>
      </Box>
      <Box marginLeft="auto" display="flex" alignItems="center">
        <InstallButton
          to="https://marketplace.visualstudio.com/items?itemName=Redocly.openapi-vs-code"
          target="_blank"
          variant="outlined"
          size="large"
        >
          Install
        </InstallButton>
        <MoreButton
          to="https://github.com/Redocly/redocly-vs-code"
          variant="text"
          target="_blank"
          size="medium"
        >
          Learn more
        </MoreButton>
        <CloseVSCodeExtensionBannerButton
          onClick={() => setVSCodeExtensionBanner(false)}
          variant="text"
          target="_blank"
        />
      </Box>
    </VSCodeExtWrapper>
  );
};

const RightPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const LogoMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 40px;
`;

const SearchWrapper = styled.div`
  margin: 0;
  padding: 0 10px;
  [data-component-name='Search/SearchTrigger'] {
    div {
      padding: 4px 12px;
      width: 100%;
      justify-content: start;
      cursor: pointer;
      color: var(--search-trigger-color);
      user-select: none;
      background-color: var(--search-trigger-bg-color);
    }
  }
`;

const MobileMenuButton = styled(Button)`
  margin-left: 0px !important;

  @media screen and (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const InstallButton = styled(Button)`
  :hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const MoreButton = styled(Button)`
  color: var(--secondary-color);

  :hover {
    color: var(--secondary-color);
    background: rgba(255, 255, 255, 0.05);
  }
`;

const VSCodeExtWrapper = styled(Box)`
  background-color: #a28dff;
  align-items: center;
  color: white;
  padding: 10px 20px;
  display: none;
  width: 100%;
  max-height: 60px;

  @media screen and (min-width: ${breakpoints.large}) {
    display: flex;
  }
`;

const CloseVSCodeExtensionBannerButton = styled(Button)`
  background-image: url(${require('../../../images/icons/close.svg')});
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  position: relative;
  padding: 5px;
  min-width: auto;
`;

const StyledSignUpButton = styled(Button)`
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-warm-grey-10);
  height: 32px;
  font-family: var(--navbar-font-family);
  font-size: 14px !important;
  font-weight: 500;
  line-height: 24px;
  color: var(--bg-color) !important;
  background-color: var(--text-color-primary);

  &:hover {
    background-color: var(--text-color-primary);
  }
`;

const StyledLogInButton = styled(StyledSignUpButton)`
  color: var(--color-warm-grey-8) !important;
  background-color: transparent;
  border: none;

  &:hover {
    background-color: transparent;
  }
`;

const DesktopWrapper = styled.div`
  display: none;
  gap: 12px;

  @media screen and (min-width: ${breakpoints.medium}) {
    display: flex;
  }
`;

const ColorModeSwitcherWrapper = styled.div<{ isVisible: boolean; isMobileOpen: boolean }>`
  display: ${({ isMobileOpen, isVisible }) => (isVisible && isMobileOpen ? 'block' : 'none')};
  margin-left: auto;
  margin-right: 10px;

  @media screen and (min-width: ${breakpoints.large}) {
    display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
    margin: 0;
  }
`;

export const NavbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: var(--navbar-menu-items-gap);
  height: var(--navbar-height);
  max-width: var(--navbar-container-max-width);
  margin-top: var(--banner-height);
  padding: 16px;
  transition: margin-top 0.4s ease-out;

  @media screen and (min-width: ${breakpoints.max}) {
    max-width: var(--container-max-width);
    margin-left: auto;
    margin-right: auto;
  }
`;

const NavbarContainer = styled.nav<{
  isDefault: boolean;
  isVisible: boolean;
  isTop: boolean;
  isColorful: boolean;
  isDocs: boolean;
  showVSCodeExtensionBanner: boolean;
  isMobile: boolean;
  isRespect: boolean;
}>`
  transition:
    border-color 0.3s ease-in-out,
    background 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    height 0.4s ease-out;

  ${({ isDocs }) =>
    !isDocs &&
    css`
      transform: ${(isVisible) =>
        isVisible
          ? 'translateY(0)'
          : 'translateY(calc((var(--navbar-height) + var(--banner-height)) * -1))'};
    `};
  border-bottom: 1px solid transparent;
  width: 100vw;
  --text-color: var(--navbar-text-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  height: calc(var(--navbar-height) + var(--banner-height));
  backdrop-filter: ${({ isTop, isDefault }) => isDefault && (isTop ? 'none' : 'blur(6px)')};

  font-size: var(--navbar-font-size);
  position: sticky;
  top: 0;
  z-index: var(--z-index-raised);
  padding: 0;
  background: ${({ isTop, isColorful, isDefault, isMobile, isRespect }) =>
    isRespect
      ? 'var(--color-warm-grey-1)'
      : !isDefault || isMobile
        ? 'var(--navbar-default-color)'
        : isTop
          ? 'transparent'
          : isColorful
            ? 'var(--navbar-bg-color-colorful)'
            : 'var(--navbar-bg-color)'};
  font-family: var(--navbar-font-family);

  @media print {
    background: transparent;
    display: none;
    > :not(a, img) {
      display: none !important;
    }
    img {
      padding: 0;
      margin: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.medium}) {
    border-bottom: ${({ isTop, isDocs }) =>
    (!isTop || isDocs) && '1px solid var(--color-warm-grey-3)'};
    height: ${({ showVSCodeExtensionBanner }) => showVSCodeExtensionBanner && 'auto'};

    ${NavbarRow} {
      padding: ${({ showVSCodeExtensionBanner }) =>
        showVSCodeExtensionBanner ? '0 40px' : 'var(--navbar-padding)'};
    }
  }
`;

const NewLabel = styled.div`
  display: inline-block;
  background: linear-gradient(to bottom, #fb3d3d, #6a11cb);
  padding: 6px 14px;
  margin-left: 5px;
  border-radius: 23px;
`;
