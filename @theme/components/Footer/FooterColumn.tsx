import React from 'react';
import styled, { css } from 'styled-components';

import type { ResolvedNavItem } from '@redocly/config';

import { breakpoints } from '@redocly/theme/core/utils';
import { useThemeHooks } from '@redocly/theme/core/hooks';
import { LaunchIcon } from '@redocly/theme/icons/LaunchIcon/LaunchIcon';
import { Link } from '@redocly/theme/components/Link/Link';
import { Image } from '@redocly/theme/components/Image/Image';

import { ResponsiveImg } from '@redocly/marketing-pages/components/ImageComponents/ResponsiveImg.js';
import { Box } from '@redocly/marketing-pages/ui/Box.js';

import { FooterCopyright } from './FooterCopyright';

type FooterColumnProps = {
  column: ResolvedNavItem;
  className?: string;
  subscribeSection?: boolean;
  copyrightText?: string;
};

export function FooterColumn({
  column,
  className,
  subscribeSection,
  copyrightText,
}: FooterColumnProps): JSX.Element {
  const { useTranslate, useTelemetry } = useThemeHooks();
  const { translate } = useTranslate();
  const telemetry = useTelemetry();
  const { items = [] } = column;

  const iconsOnly = items.every((item) => item.label === item.link && (item.icon || item.srcSet));

  const label = translate(column.labelTranslationKey, column.label);
  const labelOrLink =
    column.type === 'link' ? (
      <Link to={column.link} external={column.external} target={column.target}>
        {label}
      </Link>
    ) : (
      label
    );

  return (
    <FooterColumnContainer data-component-name="Footer/FooterColumn" className={className}>
      <FooterColumnTitle>{labelOrLink}</FooterColumnTitle>
      {subscribeSection && (
        <IconsWrapper>
          <Link to="https://github.com/Redocly">
            <ResponsiveImg src={require('../../../images/icons/github.svg')} alt="GitHub icon" />
          </Link>
          <Link to="https://www.linkedin.com/company/redocly">
            <ResponsiveImg src={require('../../../images/icons/linkedin.svg')} alt="LinkedIn icon" />
          </Link>
          <Link to="https://x.com/Redocly">
            <ResponsiveImg src={require('../../../images/icons/logo-x.svg')} alt="X icon" />
          </Link>
          <Link to="https://www.youtube.com/@redocly">
            <ResponsiveImg src={require('../../../images/icons/youtube.svg')} alt="YouTube icon" />
          </Link>
        </IconsWrapper>
      )}
      <FooterColumnItems $iconsOnly={iconsOnly} $subscribeSection={subscribeSection}>
        {items?.map((columnItem, columnItemIndex) => {
          if (columnItem.type === 'error') {
            return null;
          }

          return columnItem.type === 'separator' ? (
            <FooterSeparator key={columnItem.label + '_' + columnItemIndex}>
              {translate(columnItem.labelTranslationKey, columnItem.label)}
            </FooterSeparator>
          ) : (
            <FooterLink
              key={columnItemIndex}
              to={columnItem.link}
              external={columnItem.external}
              target={columnItem.target}
              data-cy={columnItem.label}
              $iconsOnly={iconsOnly}
              onClick={() => telemetry.send('footer_item_clicked', {})}
            >
              {columnItem.icon || columnItem.srcSet ? (
                <FooterLinkIcon>
                  <Image src={columnItem.icon} srcSet={columnItem.srcSet} />
                </FooterLinkIcon>
              ) : null}
              {!iconsOnly && translate(columnItem.labelTranslationKey, columnItem.label)}
              {columnItem.external ? <LaunchIcon size="10px" /> : null}
            </FooterLink>
          );
        })}
        {subscribeSection && (
          <FooterSection>
            <FooterCopyright copyrightText={copyrightText || ''} />
          </FooterSection>
        )}
      </FooterColumnItems>
    </FooterColumnContainer>
  );
}

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--typography-text-color);
  font-family: Inter;
`;

const FooterColumnTitle = styled.p`
  display: inline-block;
  font-weight: var(--footer-title-font-weight);
  margin-top: 0;
  margin-bottom: var(--mobile-footer-title-margin-bottom);
  color: var(--text-color-primary);

  font-family: Red Hat Display;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;

  @media screen and (min-width: ${breakpoints.small}) {
    margin-bottom: var(--footer-title-margin-bottom);
  }
`;

const IconsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  margin: 0 0 10px 0;

  ${ResponsiveImg} {
    padding: 8px;
    max-width: 32px;
    background-color: var(--color-warm-grey-2);
    border-radius: 6px;
  }
`;

const FooterColumnContainer = styled.div<{ subscribeSection?: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  word-break: break-word;
  margin: 0 0 var(--mobile-footer-column-margin-bottom) 0;
  align-content: left;
  flex-wrap: wrap;
  margin-bottom: 60px;
  margin-left: 20px;

  @media screen and (max-width: ${breakpoints.small}) {
    &:nth-child(5) {
      grid-column: span 2;
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.small}) and (max-width: ${breakpoints.medium}) {
    &:nth-child(5) {
      grid-column: span 3;
    }
  }

  @media screen and (min-width: ${breakpoints.medium}) {
    margin-bottom: 60px;
    padding: 0;
  }
`;

export const FooterLinkIcon = styled.div`
  display: inline-flex;
  width: var(--footer-item-icon-width);
  height: var(--footer-item-icon-height);
  margin-right: var(--footer-item-icon-margin-right);
  vertical-align: middle;
  border: 1px solid var(--footer-item-icon-border-color);
  border-radius: var(--footer-item-icon-border-radius);
  padding: var(--footer-item-icon-padding);
`;

const FooterLink = styled(Link)<{ $iconsOnly: boolean }>`
  color: var(--text-color-secondary);
  text-decoration: none;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 8px;

  &:hover {
    color: var(--text-color-secondary);
  }

  &:last-child ${FooterLinkIcon} {
    margin-right: ${({ $iconsOnly }) => ($iconsOnly ? '0' : 'var(--footer-item-icon-margin-right)')};
  }
`;

export const FooterColumnItems = styled.div<{ $iconsOnly: boolean; $subscribeSection }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: ${(props) => (props.$iconsOnly ? 'row' : 'column')};

  ${({ $subscribeSection }) =>
    $subscribeSection &&
    css`
      @media screen and (max-width: ${breakpoints.medium}) {
        flex-direction: row;
        gap: 24px;
        justify-content: start;
      }
    `}

  @media screen and (min-width: ${breakpoints.small}) {
    justify-content: flex-start;
  }
`;

const FooterSeparator = styled.div`
  opacity: 0.75;
  margin: 10px 0 5px 0;
  font-size: 0.75em;
  text-transform: uppercase;
`;
