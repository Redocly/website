import * as React from 'react';
import styled from 'styled-components';

export function GroupElements({ children, title }) {
  return (
    <GroupWrapper>
      {title && (
        <GroupTitle>
          {title}
        </GroupTitle>
      )}
      {children}
    </GroupWrapper>
  );
}

const GroupTitle = styled.p`
  position: absolute;
  top: -13px;
  left: 2.6%;
  transform: translateX(-50%);
  padding: 0 10px;
  font-weight: var(--font-weight-bold);
  background: #FFF;
`

const GroupWrapper = styled.div`
  position: relative;
  justify-content: center;
  border: 1px solid #E0E0E0; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-md);
  padding: 15px;

  ul {
    margin-bottom: 0px;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0px !important;
  }
`