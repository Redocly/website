# Build a Markdoc tag

This topic explains how to register custom components that can be invoked by your content creators in Markdoc (Markdown) files.

Follow the tutorial to create two sample components: a simple line break component and a quiz component for some extra credit.

The line break is a very simple component, that adds a linebreak (`<br>`).
In reality, you can achieve the linebreak in Markdoc by ending a line with a `\`.
However, it makes for the simple "Hello World" of custom tags.
And it requires almost no React knowledge.

The quiz component, while a bit rough around the edges, is a lot more robust.
To understand it, you'll need to understand React.
However, if you do, and want to do more complex behavior, this is a good example to help you understand how to do that.

# Create directories

If they don't exist yet, create the `@theme` directory in your project root.
Inside of that, create a `markdoc` directory.

This is what your directory structure may look after you follow this tutorial.

```treeview
├─ @theme/
|  └── markdoc/
|    ├── components.tsx
|    └── schema.ts
```

## Create your components

Create a file `components.tsx` inside of the `markdoc` directory, and paste the following contents into it.

```tsx
import * as React from 'react';

export function Break() {
  return <br />;
}
```

We'll create the `Quiz.tsx` as extra credit later.

## Create your tags

Create a file `schema.ts` inside of the `markdoc` directory.
Paste the following contents in the file.

```ts
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  br: {
    render: 'Break',
    selfClosing: true,
  },
};
```

You've created your first Markdoc tag. The only thing left to do is use it.

In any file that ends with `.md` add the following `{% br /%}`.

## Add the Quiz component and tag

Add `Quiz` component to the `components.tsx` file.
You can either implement component inline or re-export it from another file.

Let's implement it in `Quiz.tsx` and re-export it from `components.tsx`.

```tsx
import * as React from 'react';

export { Quiz } from './components/Quiz';
export function Break() {
  return <br />;
}
```

This is the directory structure after you've added the `Quiz` component.

```treeview
├─ @theme/
|  ├── markdoc/
|      ├── components.tsx
|      ├── schema.ts
|      └── components/
|          └── Quiz.tsx
```

<details>
<summary>See @theme/markdoc/components/Quiz.tsx</summary>

```tsx
import * as React from 'react';
import styled from 'styled-components';

const { useState, useEffect, Fragment } = React;

function Question({ question, setAnswerStatus }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    if (selectedAnswerIndex != null) {
      setAnswerStatus(selectedAnswerIndex === question.correctAnswerIndex);
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
  }, [question]);

  const getClasses = (index) => {
    let classes = [];
    if (selectedAnswerIndex != null) {
      if (selectedAnswerIndex === index) {
        classes.push('selected');
      }
      if (index === question.correctAnswerIndex) {
        if (selectedAnswerIndex === index) {
          classes.push('correct');
        } else {
          classes.push('incorrect');
        }
      }
    }

    return classes.join(' ');
  };

  return (
    <QuestionEl>
      <QuestionText>{question.question}</QuestionText>
      <Answers>
        {question.answers.map((answer, index) => {
          return (
            <AnswerElement
              key={index}
              className={getClasses(index)}
              onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}
            >
              {answer}
            </AnswerElement>
          );
        })}
      </Answers>
    </QuestionEl>
  );
}

function ProgressBar({ currentQuestionIndex, totalQuestionsCount }) {
  const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100;

  return (
    <ProgressBarEl>
      <ProgressBarText>
        {currentQuestionIndex} answered ({totalQuestionsCount - currentQuestionIndex} remaining)
      </ProgressBarText>
      <ProgressBarInner style={{ width: `${progressPercentage}%` }} />
    </ProgressBarEl>
  );
}

export function Quiz({ questions }) {
  const [questionIndex, setQuestionIndex] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    setAnswerStatus(null);
  }, [questionIndex]);

  useEffect(() => {
    if (answerStatus) {
      setCorrectAnswerCount((count) => count + 1);
    }
  }, [answerStatus]);

  const onNextClick = () => {
    if (questionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setQuestionIndex(questionIndex == null ? 0 : questionIndex + 1);
    }
  };

  const onRestartClick = () => {
    setQuizComplete(false);
    setQuestionIndex(null);
    setCorrectAnswerCount(0);
  };

  if (questionIndex == null) {
    return (
      <Wrapper>
        <h1>Apply what was learned</h1>
        <Button onClick={onNextClick}>Start</Button>
      </Wrapper>
    );
  }

  return (
    <QuizWrapper>
      {quizComplete ? (
        <Fragment>
          <h1>Quiz complete!</h1>
          <p>
            You answered {correctAnswerCount} questions correctly (out of a total {questions.length}{' '}
            questions)
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <ProgressBar
            currentQuestionIndex={questionIndex}
            totalQuestionsCount={questions.length}
          />
          <Question question={questions[questionIndex]} setAnswerStatus={setAnswerStatus} />
          {answerStatus != null && (
            <div>
              <AnswerStatusEl>
                {!!answerStatus ? 'Correct! :)' : 'Your answer was incorrect :('}
              </AnswerStatusEl>
              <Button className="next" onClick={onNextClick}>
                {questionIndex === questions.length - 1
                  ? 'See results of this quiz'
                  : 'Next Question ->'}
              </Button>
            </div>
          )}
        </Fragment>
      )}

      {questionIndex != null && (
        <Button className="restart" onClick={onRestartClick}>
          Restart quiz
        </Button>
      )}
    </QuizWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 600px;
  margin: auto;
`;

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 600px;
  margin: auto;
`;

const Button = styled.button`
  background: #e8e8e8;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 3px solid #c9c9c9;
  border-radius: 3px;
  &.next {
    background: #6ad85c;
    border-bottom: 3px solid #5abc4e;
  }
  &.start {
    margin-top: 20px;
  }
  &.restart {
    margin-top: 20px;
  }
`;

const QuestionEl = styled.div`
  width: 100%;
`;

const QuestionText = styled.div`
  font-size: 1.2em;
  margin: 20px 0;
`;

const Answers = styled.div`
  margin-bottom: 20px;
`;

const AnswerElement = styled.div`
  padding: 4px;
  text-align: center;
  background: #f3f3f3;
  margin-bottom: 5px;
  border-radius: 3px;
  cursor: pointer;

  &.selected {
    background: gainsboro;
  }

  &.correct {
    background: #6ad85c;
    font-weight: bold;
  }

  &.incorrect {
    background: #df3636;
    font-weight: bold;
  }
`;

const AnswerStatusEl = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProgressBarEl = styled.div`
  width: 100%;
  background: #f3f3f3;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const ProgressBarInner = styled.div`
  background: #6ad85c;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  transition: ease all 0.5s;
  border-radius: 3px;
`;

const ProgressBarText = styled.div`
  font-size: 0.7em;
  position: absolute;
  z-index: 10;
`;
```

</details>

Next, add the quiz tag schema to `schema.ts`

```ts
import type { Schema } from '@markdoc/markdoc';

export const tags: Record<string, Schema> = {
  br: {
    render: 'Break',
    selfClosing: true,
  },
  quiz: {
    attributes: {
      questions: {
        type: 'Object',
        required: true,
      },
    },
    render: 'Quiz', // please make sure to export it in components.ts,
    selfClosing: true,
  },
};
```

You can use the quiz tag.
However, the quiz tag expects a property to define the quiz questions, which is easier to do in the front matter of the Markdown file.
The front matter is passed in as shown below.

{% markdoc-example %}

```markdoc {% process=false %}
---
questions:
  - question: Did you learn how to add a custom Markdoc tag?
    answers:
      - Yes
      - No
      - Maybe
    correctAnswerIndex: 1
  - question: How many places do you need to adjust to configure custom Markdoc tags?
    answers:
      - '0'
      - '1'
      - '2'
      - '3'
      - '4'
    correctAnswerIndex: 4
---

# Hello

Here is my quiz.

{% quiz questions=$frontmatter.questions /%}
```

{% /markdoc-example %}

We'd show you a working quiz here, but we'd rather spend more time on it and make it look and function better first.

## Extra credit

Make a custom tag of your own (it could be simple).
Our philosophy is in line with Confucious:

> I hear and I forget, I see and I remember, I do and I understand.

Go do!
