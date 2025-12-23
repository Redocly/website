// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';
import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.13992 7.45003C2.13992 6.86229 2.61638 6.38583 3.20412 6.38583H16.7727C17.3604 6.38583 17.8369 6.86229 17.8369 7.45003V21.0186C17.8369 21.6063 17.3604 22.0828 16.7727 22.0828H3.20412C2.61638 22.0828 2.13992 21.6063 2.13992 21.0186V7.45003Z"
      fill="#1677FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5981 4.4125C8.39995 4.4125 8.23932 4.57313 8.23932 4.77129V17.598C8.23932 17.7961 8.39995 17.9567 8.59811 17.9567H21.4248C21.6229 17.9567 21.7836 17.7961 21.7836 17.598V4.77129C21.7836 4.57313 21.6229 4.4125 21.4248 4.4125H8.5981ZM8.22715 3.33614C7.63941 3.33614 7.16295 3.81259 7.16295 4.40034V17.9689C7.16295 18.5566 7.63941 19.0331 8.22715 19.0331H21.7957C22.3835 19.0331 22.8599 18.5566 22.8599 17.9689V4.40034C22.8599 3.8126 22.3835 3.33614 21.7957 3.33614H8.22715Z"
      fill="#99CDFF"
    />
  </svg>
);

export const RedocIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Redoc',
}))<IconProps>``;
