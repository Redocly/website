import React from 'react';
import styled from 'styled-components';

import { FooterColumn } from './FooterColumn';
import type { ResolvedNavItem } from '@redocly/config';
import { breakpoints } from '@redocly/theme/core/utils';

interface FooterColumnsProps {
  columns: ResolvedNavItem[];
  className?: string;
  copyrightText?: string;
}

export function FooterColumns({
  columns,
  className,
  copyrightText,
}: FooterColumnsProps): JSX.Element | null {
  if (!columns?.length) {
    return null;
  }

  return (
    <FooterColumnsContainer data-component-name="Footer/FooterColumns" className={className}>
      <FooterRow>
        {columns.map((column, index) => (
          <FooterColumn
            key={`${column.label}_${index}`}
            column={column}
            subscribeSection={columns.length - 1 === index}
            copyrightText={copyrightText}
          />
        ))}
      </FooterRow>
    </FooterColumnsContainer>
  );
}

export const FooterColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  margin: 0;
  flex: 1;
  padding: 64px 20px 38px 20px;
  align-items: center;
  max-width: 1504px;

  @media screen and (min-width: ${breakpoints.small}) {
    margin: 0 auto;
  }
`;

export const FooterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  width: 100%;

  @media screen and (min-width: ${breakpoints.small}) {
    justify-content: space-between;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: ${breakpoints.medium}) {
    margin-bottom: -60px;
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (min-width: ${breakpoints.large}) {
    padding: 0 100px;
  }
`;
