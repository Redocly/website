import * as React from 'react';
import styled from 'styled-components';

export interface ConfigSectionProps {
  children?: React.ReactNode;
  title: string;
  description: string;
}

export function ConfigSection({
  title,
  description,
  children
}: ConfigSectionProps): React.ReactElement {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{description}</SectionDescription>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  background-color: transparent;
  border: 1px solid var(--border-color-secondary);
  border-radius: 12px;
  padding: 24px;
  margin: 0 0 16px 0;
  width: 100%;
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
  margin: 0 0 8px 0;
  color: var(--text-color-primary);
`;

const SectionDescription = styled.p`
  font-size: 16px;
  line-height: 1.4;
  margin: 0 0 16px 0;
  color: var(--text-color-secondary);
`;

const SectionContent = styled.div`
  display: flex-column;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
`;
