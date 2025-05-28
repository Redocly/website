import React from 'react';
import styled from 'styled-components';

import { useThemeHooks } from '@redocly/theme/core/hooks';
import { breakpoints } from '@redocly/theme/core/utils';

type FooterCopyrightProps = {
  copyrightText: string;
  className?: string;
};

export function FooterCopyright({
  copyrightText = '',
  className,
}: FooterCopyrightProps): JSX.Element | null {
  const { useTranslate } = useThemeHooks();
  const { translate } = useTranslate();

  return copyrightText ? (
    <FooterCopyrightWrapper
      className={className}
      data-component-name="Footer/FooterCopyright"
      data-translation-key="theme.footer.copyrightText"
    >
      <FooterCopyrightLabel>
        {translate('theme.footer.copyrightText', copyrightText)}
      </FooterCopyrightLabel>
    </FooterCopyrightWrapper>
  ) : null;
}

const FooterCopyrightWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-left: 4px;
  color: var(--text-color-secondary);
  text-align: var(--footer-copyright-text-align);

  @media screen and (min-width: ${breakpoints.medium}) {
    max-width: 200px;
    margin-left: 0;
  }
`;

const FooterCopyrightLabel = styled.div``;
