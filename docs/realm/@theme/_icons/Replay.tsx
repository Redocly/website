import * as React from 'react';
import styled from 'styled-components';
import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
<svg width="52" height="57" viewBox="0 0 52 57" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M47.1441 35.5245C52.4377 32.4683 52.4377 24.8276 47.1441 21.7713L31.8756 12.9561L17.9384 26.8934C17.5619 27.2698 17.5619 27.8802 17.9384 28.2567L33.2361 43.5543L47.1441 35.5245Z"
    fill="url(#paint0_linear_5426_165574)"
  />
  <path
    d="M28.0502 46.5484L12.481 55.5373C7.18735 58.5936 0.570312 54.7732 0.570313 48.6607L0.570314 8.63515C0.570315 2.52259 7.18735 -1.29775 12.481 1.75853L26.6898 9.96201L13.8484 22.8034C11.2132 25.4387 11.2132 29.7113 13.8484 32.3466L28.0502 46.5484Z"
    fill="url(#paint1_linear_5426_165574)"
  />
  <defs>
    <linearGradient
      id="paint0_linear_5426_165574"
      x1="46.8387"
      y1="45.1396"
      x2="3.36988"
      y2="0.143738"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#C361FF" />
      <stop offset="0.411322" stop-color="#9461FF" />
      <stop offset="0.73777" stop-color="#207DFF" />
      <stop offset="1" stop-color="#1DA8F6" />
    </linearGradient>
    <linearGradient
      id="paint1_linear_5426_165574"
      x1="46.8387"
      y1="45.1396"
      x2="3.36988"
      y2="0.143738"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#C361FF" />
      <stop offset="0.411322" stop-color="#9461FF" />
      <stop offset="0.73777" stop-color="#207DFF" />
      <stop offset="1" stop-color="#1DA8F6" />
    </linearGradient>
  </defs>
</svg>
);

export const ReplayIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Replay',
}))<IconProps>``; 




