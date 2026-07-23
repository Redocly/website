---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Build a Markdoc tag

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

This topic explains how to register custom components that can be invoked by your content creators in Markdoc (Markdown) files.

Follow the tutorial to create two sample components: a simple line break component and a quiz component for some extra credit.

The line break is a very simple component, that adds a linebreak (`<br>`).
In reality, you can achieve the linebreak in Markdoc by ending a line with a `\`.
However, it makes for the simple "Hello World" of custom tags.
And it requires almost no React knowledge.

The quiz component, while a bit rough around the edges, is a lot more robust.
To understand it, you need to understand React.
However, if you do, and want to do more complex behavior, this is a good example to help you understand how to do that.

## Create directories

If you don't have it yet, create a `@theme` directory in your project root.
Inside `@theme`, create a `markdoc` directory.

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
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  br: {
    render: 'Break',
    selfClosing: true,
  },
};
```

You've created your first Markdoc tag.
The only thing left to do is use it.

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

export function Quiz({ title, summary, questions, children }) {
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
        {title ? <h1>{title}</h1> : null}
        {summary ? <Summary>{summary}</Summary> : null}
        {children}
        <Button className="start" onClick={onNextClick}>
          Start
        </Button>
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

const Summary = styled.p`
  margin: 0 0 1rem;
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
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  br: {
    render: 'Break',
    selfClosing: true,
  },
  quiz: {
    attributes: {
      title: { type: String },
      summary: { type: String },
      questions: {
        type: 'Object',
        required: true,
      },
    },
    render: 'Quiz', // make sure to export it in components.ts,
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

{% quiz title="Apply what you learned" summary="Two questions about custom Markdoc tags" questions=$frontmatter.questions %}
Review the tutorial before you begin.
{% /quiz %}
```

{% /markdoc-example %}

We'd show you a working quiz here, but we'd rather spend more time on it and make it look and function better first.

## Expose custom tags for LLMs

Realm generates plain Markdown for LLMs — the `quiz` tag may look interactive in the browser but contribute little text.
Add `renderForLlms` to control what the tag emits for LLMs.


### `renderForLlms`

The function receives the Markdoc AST `node` for your tag and a context object.
It should return a plain Markdown string.
The tag body is not included unless you call `getBody()` from the context object.

{% admonition type="warning" name="Security considerations" %}
Content returned by `renderForLlms` is emitted directly for LLMs.
Only return text you are comfortable making public — do not pull secrets, API keys, tokens, or other sensitive information.
{% /admonition %}

#### Context

{% table %}

- Field
- Type
- Description

---

- `getBody`
- () => string
- Returns plain Markdown from the tag body when called.

---

- `locale`
- string
- Code of the locale the page is rendered for, such as `en-US`.
  Taken from the page URL, so each localized copy of a page renders with its own locale.

---

- `translate`
- (key, fallback) => string
- Returns the value of a translation key from the current locale's `translations.yaml` file, or `fallback` when the key has no translation.

{% /table %}

### Examples

The examples below add `renderForLlms` to the `quiz` tag from this tutorial.

{% admonition type="info" %}
If you are updating an existing `schema.ts` file, replace `Schema` with `MarkdocTagSchema`.
`renderForLlms` is defined on `MarkdocTagSchema`, so keeping `Schema` can cause TypeScript errors.
{% /admonition %}

```markdoc {% process=false %}
{% quiz title="Apply what you learned" summary="Two questions about custom Markdoc tags" questions=$frontmatter.questions %}
Review the tutorial before you begin.
{% /quiz %}
```

#### Summary only

Return the `summary` attribute and omit the tag body.

```ts
import type { Node } from '@markdoc/markdoc';
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  quiz: {
    attributes: {
      title: { type: String },
      summary: { type: String },
      questions: { type: 'Object', required: true },
    },
    render: 'Quiz',
    renderForLlms: (node: Node) => node.attributes.summary ?? '',
  },
};
```

LLM output:

```md
Two questions about custom Markdoc tags
```

#### Full section

Return the `title` and `summary` attribute values, then append the tag body from `getBody()`.

```ts
import type { Node } from '@markdoc/markdoc';
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  quiz: {
    attributes: {
      title: { type: String },
      summary: { type: String },
      questions: { type: 'Object', required: true },
    },
    render: 'Quiz',
    renderForLlms: (node: Node, { getBody }) =>
      [node.attributes.title, node.attributes.summary, getBody()].filter(Boolean).join('\n'),
  },
};
```

LLM output:

```md
Apply what you learned
Two questions about custom Markdoc tags
Review the tutorial before you begin.
```

#### Localized output

If your project supports multiple languages, use `locale` and `translate` to return content in the reader's language.
The LLM Markdown for a page is generated per locale.
`renderForLlms` runs once for each localized copy of the page with that copy's `locale`.

`translate` looks up a key in the current locale's `translations.yaml` file and returns its value, or the `fallback` argument when the key isn't translated.
To set up translation keys, see [Localize UI labels using translation keys](../content/localization/localize-labels.md).

The `quiz` tag below labels its output with a translated word and the current locale:

```ts
import type { Node } from '@markdoc/markdoc';
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const tags: Record<string, MarkdocTagSchema> = {
  quiz: {
    attributes: {
      title: { type: String },
      summary: { type: String },
      questions: { type: 'Object', required: true },
    },
    render: 'Quiz',
    renderForLlms: (node: Node, { locale, translate }) =>
      `${translate('quiz.label', 'Quiz')} (${locale}): ${node.attributes.summary ?? ''}`,
  },
};
```

Add the `quiz.label` key to the `translations.yaml` file for each locale you support:

```yaml {% title="@l10n/es-ES/translations.yaml" %}
quiz.label: "Cuestionario"
```

The default locale has no translation for the key, so it falls back to `Quiz` (request `/quiz.md`):

```md
Quiz (en-US): Two questions about custom Markdoc tags
```

The Spanish locale returns the translated label (request `/es-ES/quiz.md`):

```md
Cuestionario (es-ES): Two questions about custom Markdoc tags
```

## Extra credit

Make a custom tag of your own (it could be simple).
Our philosophy is in line with Confucius:

> I hear and I forget, I see and I remember, I do and I understand.

Go do!

## Resources

- **[Markdoc tags](../content/markdoc-tags/index.md)** - See the full list of supported Markdoc tags
- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to use Markdoc in your documentation
- **[Customization](./index.md)** - Discover customizable components and customization options for your project
