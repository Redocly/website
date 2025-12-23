// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';

import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.38156 3.84727C9.729 3.49983 10.2923 3.49983 10.6397 3.84727L18.6607 11.8682C19.0082 12.2157 19.0082 12.779 18.6607 13.1264L10.6397 21.1474C10.2923 21.4948 9.729 21.4948 9.38156 21.1474L1.36059 13.1264C1.01315 12.779 1.01315 12.2157 1.36059 11.8682L9.38156 3.84727Z"
      fill="url(#paint0_linear_8173_96)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2238 3.86463C14.0943 3.73515 13.8844 3.73515 13.7549 3.86463L6.35133 11.2682C6.22185 11.3977 6.22185 11.6076 6.35133 11.7371L13.7549 19.1407C13.8844 19.2702 14.0943 19.2702 14.2238 19.1407L21.6274 11.7371C21.7569 11.6076 21.7569 11.3977 21.6274 11.2682L14.2238 3.86463ZM14.6185 2.85259C14.271 2.50515 13.7077 2.50515 13.3603 2.85259L5.33929 10.8736C4.99185 11.221 4.99185 11.7843 5.33929 12.1318L13.3603 20.1527C13.7077 20.5002 14.271 20.5002 14.6185 20.1527L22.6394 12.1318C22.9869 11.7843 22.9869 11.221 22.6394 10.8736L14.6185 2.85259Z"
      fill="url(#paint1_linear_8173_96)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_8173_96"
        x1="1.10001"
        y1="12"
        x2="22.9"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1677FF" />
        <stop offset="1" stopColor="#08C7E0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_8173_96"
        x1="5.07877"
        y1="11.5027"
        x2="22.9001"
        y2="11.5027"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D6E7FF" />
        <stop offset="1" stopColor="#D8F9FE" />
      </linearGradient>
    </defs>
  </svg>
);

export const RealmIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Realm',
}))<IconProps>``;
