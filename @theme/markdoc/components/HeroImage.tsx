import styled from 'styled-components';
import * as React from 'react';

import hero from '../../../docs-legacy/developer-portal/images/portal-hero.svg';
import refDocsHero from '../../../docs-legacy/api-reference-docs/images/ref-docs-hero.svg';
import { breakpoints } from '@redocly/theme/core/utils';

const images = {
  'portal-hero': hero,
  'ref-docs-hero': refDocsHero,
};

export function HeroImage({ src }) {
  return (
    <>
      <Image src={images[src]} alt="hero image" />
    </>
  );
}

const Image = styled.img`
  float: right;
  width: 40%;
  margin-top: -20px;
  display: none;
  top: 15%;
  right: 10%;

  @media screen and (min-width: ${breakpoints.large}) {
    width: 20%;
    display: inline-block;
    position: absolute;
  }
}
`;
