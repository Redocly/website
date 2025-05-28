// @ts-ignore eslint-disable-next-line
import * as React from 'react';
import styled from 'styled-components';
import type { IconProps } from '@redocly/theme/icons/types';

const Icon = (props: IconProps) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1.60004 13.0045C1.60004 8.17281 5.51687 4.25597 10.3485 4.25597C15.1802 4.25597 19.097 8.17281 19.097 13.0045C19.097 17.8361 15.1802 21.753 10.3485 21.753C5.51687 21.753 1.60004 17.8361 1.60004 13.0045Z" fill="#735CFF"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.97429 10.9955C5.97429 15.2356 9.41151 18.6728 13.6515 18.6728C17.8916 18.6728 21.3288 15.2356 21.3288 10.9955C21.3288 6.75551 17.8916 3.31828 13.6515 3.31828C9.41151 3.31828 5.97429 6.75551 5.97429 10.9955ZM13.6515 2.24704C8.81988 2.24704 4.90304 6.16388 4.90304 10.9955C4.90304 15.8272 8.81988 19.744 13.6515 19.744C18.4832 19.744 22.4 15.8272 22.4 10.9955C22.4 6.16388 18.4832 2.24704 13.6515 2.24704Z" fill="#C7BBFF"/>
  </svg>
);

export const RevelIcon = styled(Icon).attrs(() => ({
  'data-component-name': 'icons/Revel',
}))<IconProps>``; 