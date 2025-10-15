import styled from 'styled-components';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  line-height: var(--line-height-base);
  font-size: var(--font-size-base);
  padding: 0 8px;
  border: 1px solid var(--border-color-secondary);
  border-radius: 4px;
  color: var(--text-color-primary);
  background-color: var(--bg-color);
  white-space: nowrap;
`;

export default Badge;


