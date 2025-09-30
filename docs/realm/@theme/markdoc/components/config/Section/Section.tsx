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
      <SectionContent>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </SectionHeader>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}

const SectionContainer = styled.div`
  background-color: transparent;
  border: 1px solid var(--border-color-primary);
  border-radius: 12px;
  padding: 16px;
  margin: 0 0 16px 0;
  width: 100%;
  box-sizing: border-box;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SectionTitle = styled.h2`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-xl);
  color: var(--text-color-primary);
  margin-top: 0px;
  margin-bottom: 0px;
`;

const SectionDescription = styled.p`
  color: var(--text-color-secondary);
  line-height: var(--line-height-base);
  font-size: var(--font-size-base);
  margin-bottom: 0 !important;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
