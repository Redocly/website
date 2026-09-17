import styled from 'styled-components';
import { t } from '../theme';

export const Hint = styled.p`
  margin: 10px 0 0;
  font-size: 12px;
  color: ${t.textMuted};

  & kbd {
    display: inline-block;
    min-width: 18px;
    padding: 1px 5px;
    border: 1px solid ${t.border};
    border-bottom-width: 2px;
    border-radius: 4px;
    background: ${t.surfaceRaised};
    font-family: inherit;
    font-size: 11px;
    text-align: center;
  }
`;

/**
 * Answer feedback. This is the live region for a step — not the whole card, which would
 * announce every frame of an animation to a screen reader.
 */
export const FeedbackBox = styled.p.attrs({ role: 'status' })<{ $correct: boolean }>`
  margin: 12px 0 0;
  padding: 10px 12px;
  border-radius: ${t.radiusSm};
  background: ${({ $correct }) =>
    $correct ? `color-mix(in srgb, ${t.success} 12%, transparent)` : `color-mix(in srgb, ${t.error} 10%, transparent)`};
  color: ${t.text};
`;
