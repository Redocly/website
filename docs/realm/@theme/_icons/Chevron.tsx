// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';

import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7 9.62495L2.625 5.24995L3.2375 4.63745L7 8.39995L10.7625 4.63745L11.375 5.24995L7 9.62495Z"
      fill="#22242B"
    />
  </svg>
);

export const ChevronIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Realm',
}))<IconProps>``;
