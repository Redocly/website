// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';

import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.7229 12.1481C18.3812 11.1934 18.3812 8.80665 16.7229 7.85194L11.94 5.09827L7.57399 9.45195C7.45606 9.56956 7.45606 9.76022 7.57399 9.87782L12.3661 14.6565L16.7229 12.1481Z"
      fill="url(#paint0_linear_4654_1247)"
    />
    <path
      d="M10.7416 15.5917L5.86442 18.3997C4.20614 19.3544 2.1333 18.161 2.1333 16.2516L2.1333 3.74852C2.1333 1.83909 4.20614 0.645706 5.86442 1.60042L10.3155 4.163L6.29279 8.17436C5.46727 8.99756 5.46727 10.3322 6.29279 11.1554L10.7416 15.5917Z"
      fill="url(#paint1_linear_4654_1247)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_4654_1247"
        x1="16.6273"
        y1="15.1517"
        x2="3.04998"
        y2="1.05776"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C361FF" />
        <stop offset="0.411322" stopColor="#9461FF" />
        <stop offset="0.73777" stopColor="#207DFF" />
        <stop offset="1" stopColor="#1DA8F6" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4654_1247"
        x1="16.6273"
        y1="15.1517"
        x2="3.04998"
        y2="1.05776"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C361FF" />
        <stop offset="0.411322" stopColor="#9461FF" />
        <stop offset="0.73777" stopColor="#207DFF" />
        <stop offset="1" stopColor="#1DA8F6" />
      </linearGradient>
    </defs>
  </svg>
);

export const ReplayIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Replay',
}))<IconProps>``;


