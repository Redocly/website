import React from 'react';
import styled from 'styled-components';
import { linearGradient } from 'polished';
import { useLocation } from 'react-router-dom';

import type { ResolvedNavItem } from '@redocly/config';

import { breakpoints, isEmptyArray } from '@redocly/theme/core/utils';
import { useThemeConfig } from '@redocly/theme/core/hooks';
import { Link } from '@redocly/theme';

import { LeadCaptureToken } from '@redocly/marketing-pages/components/LeadCaptureToken/LeadCaptureToken.js';
import { MediaBox } from '@redocly/marketing-pages/components/PositionItems/MediaBox.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';

import { FooterColumns } from '../Footer/FooterColumns';

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps): JSX.Element | null {
  const { footer } = useThemeConfig() || {};
  const { items, copyrightText } = footer || {};
  if (isEmptyArray(items) || footer?.hide) {
    return null;
  }

  const { pathname } = useLocation();

  const colorfulPagesList = ['/', '/reunite', '/contact-us', '/reef'];

  return (
    <FooterContainer
      data-component-name="Footer/Footer"
      className={className}
      isColorful={colorfulPagesList.includes(pathname)}
      respect={pathname === '/respect'}
    >
      <ColumnsSection>
        <FooterColumns columns={items as unknown as ResolvedNavItem[]} copyrightText={copyrightText} />
      </ColumnsSection>
      <BottomSection p="20px" textAlign="center">
        <MediaBox maxWidth="660px">
          <StyledBox>
            <StyledText>Built with 💙 ☕️️ and 🌮. This website runs entirely on </StyledText>
            <BottomLink to="/portals/">
              <StyledText>Realm.</StyledText>
            </BottomLink>
          </StyledBox>
        </MediaBox>
      </BottomSection>
      <LeadCaptureToken />
    </FooterContainer>
  );
}

const BottomSection = styled(Box)`
  background-color: ${linearGradient({
    colorStops: ['#0068FB', '#7E41FF'],
    toDirection: 'to bottom right',
  })};
`;

const ColumnsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.small}) {
    flex-direction: row;
  }
`;

const FooterContainer = styled.footer<{ isColorful?: boolean; respect?: boolean }>`
  flex-shrink: 0;
  color: var(--footer-text-color);
  font-weight: var(--footer-font-weight);
  z-index: 10;
  background-color: ${({ isColorful, respect }) => {
    if (respect) {
      return 'var(--color-warm-grey-1)';
    }
    if (isColorful) {
      return 'var(--color-warm-grey-2)';
    }
    return 'transparent';
  }};
  border-top: 1px solid transparent;
  width: 100vw;
  height: fit-content;
  position: relative;
  bottom: 0;
`;

const BottomLink = styled(Link)`
  color: var(--color-normal);
  text-decoration: underline;
  text-transform: none;
  font-weight: 400;
  margin: 0 3px;
`;

const StyledText = styled.span`
  display: flex;
  align-items: center;
  color: var(--color-normal);
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  line-height: 1.5rem;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;
