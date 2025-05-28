import * as React from 'react';
import styled from 'styled-components';

export function SplitView ({ children, leftViewWidth, rightViewWidth }) {
  return (
    <SplitViewWrapper className="split-view-wrapper" leftViewWidth={leftViewWidth} rightViewWidth={rightViewWidth}>
      {children}
    </SplitViewWrapper>
  );
}

const SplitViewWrapper = styled.div`
  margin: 16px 0;
  gap: 6px;
  justify-items: stretch;
  align-items: stretch;
  display: grid;

  grid-template-columns: ${props => props.leftViewWidth || '1fr'} ${props => props.rightViewWidth || '1fr'};
`;

export function LeftView({ children, title }) {
  return (
    <ViewWrapper>
      <ViewTitle>
        {title}
      </ViewTitle>
      {children}
    </ViewWrapper>
  );
}

export function RightView({ children, title }) {
  return (
    <ViewWrapper className="right-pane-wrapper">
      <ViewTitle>
        {title}
      </ViewTitle>
      {children}
    </ViewWrapper>
  );
}

const ViewTitle = styled.p`
  position: absolute;
  top: -13px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 10px;
  margin: 0;
  font-size: 1.05em;
  font-style: italic;
  opacity: 0.95;
  text-shadow: 1px 1px 1px #ddd;
  background: #FFF;
`

const ViewWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #E0E0E0; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 6px;
`