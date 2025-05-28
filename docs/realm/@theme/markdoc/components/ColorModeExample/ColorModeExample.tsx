import * as React from 'react';
import styled from 'styled-components';
import { Image } from '@redocly/theme/components/Image/Image';

import sunImg from './sun.png';
import moonImg from './moon.png';

export function ColorModeExampleImage() {
  return (
    <ExampleWrapper>
      <Image srcSet={`${sunImg} light, ${moonImg} dark`} />
    </ExampleWrapper>
  )
}

const ExampleWrapper = styled.div`
  width: 200px;
  height: 200px;
`