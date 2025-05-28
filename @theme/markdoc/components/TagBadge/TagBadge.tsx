import styled from 'styled-components';
import * as React from 'react';

export function TagBadge({ badgeType }) {
  return (
    <>
      {badgeType === 'Redocly' && <RedoclyTagBadge>Redocly Custom Tag</RedoclyTagBadge>}
      {badgeType === 'Built-in' && <BuiltinTagBadge>Built-in Markdoc Tag</BuiltinTagBadge>}
    </>
  );
}

const MarkdocTagBadge = styled.span`
  scroll-margin-top: 50px;
  border-radius: 10rem;
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: .75rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  text-rendering: optimizeLegibility;
`

const RedoclyTagBadge = styled(MarkdocTagBadge)`
  background-color: #6812CC;
  color: #fff;
`;

const BuiltinTagBadge = styled(MarkdocTagBadge)`
  background-color: #003e99;
  color: #fff;
`;