import styled, { css } from 'styled-components';

export const TextField = styled.input`
  border: var(--input-border);
  outline: none;
  padding: var(--input-padding);
  border-radius: var(--input-border-radius);
  background-color: var(--panel-try-it-input-background-color);
  color: var(--input-text-color);
  font-family: var(--input-font-family);
  font-size: var(--input-font-size);
  line-height: var(--input-line-height);

  &::placeholder {
    opacity: 0.6;
    color: var(--input-placeholder-text-color);
  }

  &:hover {
    color: var(--input-hover-text-color);
    border: var(--input-hover-border);
  }

  &:focus {
    color: var(--input-focus-text-color);
    border: var(--input-focus-border);
  }
`;

export const FormControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label<{ required?: boolean }>`
  padding-bottom: 6px;
  display: block;
  white-space: nowrap;
  line-height: 1em;

  ${({ required }) =>
    required &&
    css`
      &:after {
        display: inline-block;
        content: '*';
        margin-left: 4px;
        color: var(--color-error-base);
      }
    `}
`;

export const ErrorMessage = styled.div`
  color: var(--color-error-base);
  margin-top: 10px;
`;

export const TokenResult = styled.pre`
  &:empty:before {
    content: 'No token';
    color: var(--text-color-secondary);
  }

  background-color: var(--panel-try-it-input-background-color);
  font-size: 12px;
  border-radius: var(--input-border-radius);
  border: var(--input-border);
  padding: var(--input-padding);
`;
