import * as React from 'react';
import styled from 'styled-components';
import type { StepKindProps } from './types';
import { useArrowSelection } from './useArrowSelection';
import { Hint, FeedbackBox } from './Hint';
import { t, focusRing } from '../theme';
import { useGameConfig } from '../config';

const Question = styled.div`
  margin-top: 12px;
  font-weight: 600;
  color: ${t.text};
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const OptionButton = styled.button<{ $status?: 'correct' | 'wrong' | 'missed'; $focused?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  padding: 10px 14px;
  border-radius: ${t.radiusSm};
  border: 1px solid ${({ $focused }) => ($focused ? t.accent : t.border)};
  box-shadow: ${({ $focused }) => ($focused ? `0 0 0 3px ${t.accentSoft}` : 'none')};
  background: ${t.surfaceRaised};
  color: ${t.text};
  font: inherit;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s, transform 0.1s, box-shadow 0.15s;

  &:hover:not(:disabled) {
    border-color: ${t.accent};
  }
  &:active:not(:disabled) {
    transform: scale(0.99);
  }
  &:disabled {
    cursor: default;
  }
  ${focusRing}

  ${({ $status }) =>
    $status === 'correct' && `border-color: ${t.success}; background: color-mix(in srgb, ${t.success} 12%, transparent);`}
  ${({ $status }) =>
    $status === 'wrong' && `border-color: ${t.error}; background: color-mix(in srgb, ${t.error} 10%, transparent);`}
  ${({ $status }) => $status === 'missed' && `border-style: dashed; border-color: ${t.success};`}

  & p {
    margin: 0;
  }
`;

const Key = styled.span`
  flex: none;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${t.accentSoft};
  color: ${t.accent};
`;

export function QuizKind({ step, chosen, answered, answer, next, keyboard, hints }: StepKindProps) {
  const { labels } = useGameConfig();
  const chosenId = chosen?.id;

  const { index, setIndex } = useArrowSelection({
    count: step.options.length,
    enabled: keyboard,
    answered,
    onConfirm: (i) => step.options[i] && answer(step.options[i].id),
    onNext: next,
  });

  return (
    <>
      <Question>{step.question}</Question>
      <Options role="group" aria-label="Answer options">
        {step.options.map((option, i) => {
          let status: 'correct' | 'wrong' | 'missed' | undefined;
          if (answered) {
            if (option.id === chosenId) status = option.correct ? 'correct' : 'wrong';
            else if (option.correct) status = 'missed';
          }
          return (
            <OptionButton
              key={option.id}
              type="button"
              $status={status}
              $focused={keyboard && !answered && i === index}
              disabled={answered}
              onMouseEnter={() => !answered && setIndex(i)}
              onClick={() => answer(option.id)}
            >
              <Key aria-hidden="true">{String.fromCharCode(65 + i)}</Key>
              <span>{option.label}</span>
            </OptionButton>
          );
        })}
      </Options>
      {chosen && (
        <FeedbackBox $correct={chosen.correct}>
          <strong>{chosen.correct ? labels.correct : labels.wrong}</strong> {chosen.feedback}
        </FeedbackBox>
      )}
      {keyboard && hints && !answered && (
        <Hint>
          <kbd>←</kbd> <kbd>→</kbd> to choose, <kbd>Enter</kbd> to answer
        </Hint>
      )}
    </>
  );
}
