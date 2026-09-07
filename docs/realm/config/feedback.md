---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Customize how users leave feedback about your documentation content with this option.
---
# `feedback`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize how users leave feedback about your documentation content with the `feedback` option.
By default, the `feedback` sentiment form displays at the bottom of all Markdown and API reference pages, but you can customize or hide it.

The default configuration includes an email field for anonymous users to provide their email with the feedback.
The optional email input field is not displayed for logged-in users.

## Feedback system overview

Redocly's feedback system includes:
- **Page feedback forms** at the bottom of Markdown and API reference pages
- **Code snippet report icons** next to copy buttons in code examples
- **Feedback data collection** viewable in your project dashboard

### Form types

Choose from five feedback form types:

{% tabs %}

{% tab label="sentiment" %}
**Default form type** - Thumbs up/down icons for positive or negative reactions.
{% /tab %}

{% tab label="mood" %}
Three emoji icons (satisfied, neutral, dissatisfied) for more nuanced feedback.
{% /tab %}

{% tab label="rating" %}
Five-star rating system for numerical feedback (1-5 stars).
{% /tab %}

{% tab label="scale" %}
Ten-point scale with customizable labels for detailed rating (1-10).
{% /tab %}

{% tab label="comment" %}
Free-form text field for detailed written feedback.
{% /tab %}

{% /tabs %}

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "feedback"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the feedback form.
  Default: `false`

---

- type
- string
- Sets the feedback form type.
  Possible values: `sentiment`, `rating`, `comment`, `mood`, `scale`.
  Default: `sentiment`

---

- settings
- [Settings object](#settings-object)
- Contains specific settings for each feedback form type.

{% /table %}

### Settings object

{% table %}

- Option
- Type
- Description

---

- label
- string
- Text displayed with the feedback form.
  Default depends on the feedback form type.

  Default for `sentiment`, `rating`, `mood`, and `scale` types: "Was this helpful?"

  Default for `comment` type: "Share your feedback with us."

---

- submitText
- string
- Text displayed when users submit the feedback form.

  Default for `sentiment`, `rating`, `mood` and `scale` types: "Thank you for your feedback!"

  Default for `comment` type: "Thank you for helping improve our documentation!"

---

- comment
- [Comment object](#comment-object)
- Settings for a comment form that displays after users submit initial feedback.
  Not applicable for the `comment` feedback form type.

---

- reasons
- [Reasons object](#reasons-object)
- Settings for a reasons form that displays after users submit initial feedback.
  Not applicable for the `comment` feedback form type.

---

- leftScaleLabel
- string
- Label for the left-hand side of the scale explaining what lower numbers mean.
  Applicable only for the `scale` feedback form type.
  Default: "Not helpful at all"

---

- rightScaleLabel
- string
- Label for the right-hand side of the scale explaining what higher numbers mean.
  Applicable only for the `scale` feedback form type.
  Default: "Extremely helpful"

---

- optionalEmail
- [OptionalEmail object](#optional-email-object)
- Settings for the optional email input field in the feedback form.

  Collects email addresses from anonymous users for follow-up information.
  **For logged-in users, feedback forms automatically collect email addresses as part of the user data.**

  Applicable to all types of feedback forms.

{% /table %}

### Comment object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Enables or disables the comment option.
  Default: `false`.

---

- label
- string
- Text displayed with the comment feedback form field.
  Applicable only for the `rating` and `scale` feedback form type.
  Default: "Share your feedback with us."

---

- likeLabel
- string
- Text displayed with the comment form when users select the like icon.
  Applicable only for the `sentiment` feedback form type.
  Default: "What was most helpful?"

---

- dislikeLabel
- string
- Text displayed with the comment form when users select the dislike icon.
  Applicable only for the `sentiment` feedback form type.
  Default: "What can we improve?"

---

- satisfiedLabel
- string
- Text displayed with the mood form when users select the satisfied icon.
  Applicable only for the `mood` feedback form type.
  Default: "What was most helpful?"

---

- neutralLabel
- string
- Text displayed with the mood form when users select the neutral icon.
  Applicable only for the `mood` feedback form type.
  Default: "What can we improve?"

---

- dissatisfiedLabel
- string
- Text displayed with the mood form when users select the dissatisfied icon.
  Applicable only for the `mood` feedback form type.
  Default: "What can we improve?"

{% /table %}

### Reasons object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Enables or disables the reasons option.
  Default: `false`.

---

- label
- string
- Text displayed with the reasons feedback form.
  For `sentiment` and `mood`, this label applies to every reaction-specific configuration as the default.
  Default: "Which statement describes your thoughts about this page?"

---

- component
- string
- Sets the component type to multiple-choice checkboxes or single-choice radio buttons.
  Possible values: `checkbox`, `radio`.
  Default: `checkbox`.
  For `sentiment` and `mood`, this component applies to every reaction-specific configuration as the default.

---

- items
- [string]
- List of choices in the feedback form.
  For example, "Content was accurate" or "Content was confusing".
  For `sentiment` and `mood`, these items are included in every reaction-specific configuration as defaults.

---

- like
- [Value specific reasons object](#value-specific-reasons-object)
- Settings for reasons displayed when users select the like icon.
  Applicable only for the `sentiment` feedback form.

---

- dislike
- [Value specific reasons object](#value-specific-reasons-object)
- Settings for reasons displayed when users select the dislike icon.
  Applicable only for the `sentiment` feedback form.

---

- satisfied
- [Value specific reasons object](#value-specific-reasons-object)
- Settings for reasons displayed when users select the satisfied icon.
  Applicable only for the `mood` feedback form.

---

- neutral
- [Value specific reasons object](#value-specific-reasons-object)
- Settings for reasons displayed when users select the neutral icon.
  Applicable only for the `mood` feedback form.

---

- dissatisfied
- [Value specific reasons object](#value-specific-reasons-object)
- Settings for reasons displayed when users select the dissatisfied icon.
  Applicable only for the `mood` feedback form.

{% /table %}

### Optional Email object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the optional email input.
  Setting to true removes the input.
  Default: `false`.

---

- label
- string
- Text displayed with the optional email input.
  Default: "Your email (optional, for follow-up)".

---

- placeholder
- string
- Placeholder text for the optional email input.
  Default: "yourname@example.com".

{% /table %}

### Value-specific reasons object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Enables or disables the `reasons` option for a specific feedback value.
  Overrides the main [Reasons object](#reasons-object) `hide` option.
  Uses the [Reasons object](#reasons-object) `hide` option if not specified.
  Default: `false`.

---

- label
- string
- Text displayed with the reasons form for a specific feedback value.
  Overrides the main [Reasons object](#reasons-object) `label` option.
  Uses the [Reasons object](#reasons-object) `label` option if not specified.
  Default: "Which statement describes your thoughts about this page?"

---

- component
- string
- Sets the component type to multiple-choice checkboxes or single-choice radio buttons.
  Possible values: `checkbox`, `radio`.
  Overrides the main [Reasons object](#reasons-object) `component` option.
  Uses the [Reasons object](#reasons-object) `component` option if not specified.
  Default: `checkbox`.

---

- items
- [string]
- List of choices in the feedback form for a specific feedback value.
  Merged with the [Reasons settings](#reasons-object) `items` option.
  For example, "Content was accurate" or "Content was confusing".

{% /table %}

## Configuration scope

Configure feedback globally in your `redocly.yaml` file or for individual pages using front matter.

### Global configuration

Configure feedback for all pages in your project:

```yaml {% title="redocly.yaml" %}
feedback:
  type: sentiment
  settings:
    label: Was this helpful?
    submitText: Thanks for your feedback!
```

### API reference configuration

Configure feedback specifically for API reference documentation:

**OpenAPI:**
```yaml {% title="redocly.yaml" %}
openapi:
  feedback:
    type: rating
    settings:
      label: Rate this API endpoint
```

**GraphQL:**
```yaml {% title="redocly.yaml" %}
graphql:
  feedback:
    type: comment
    settings:
      label: Tell us about your experience with this schema
```

### Page-level configuration

Override global settings for individual pages using front matter:

```yaml {% title="example.md" %}
---
feedback:
  type: scale
  settings:
    label: How useful was this guide?
    leftScaleLabel: Not useful
    rightScaleLabel: Very useful
---
```

Front matter configurations take precedence over global settings, but inherit unspecified options from global configuration.

## Hide feedback

Hide feedback forms globally or for specific content types:

**Hide on all pages:**
```yaml {% title="redocly.yaml" %}
feedback:
  hide: true
```

**Hide on API reference only:**
```yaml {% title="redocly.yaml" %}
openapi:
  feedback:
    hide: true
```

## Extend feedback forms

Add additional questions after users submit initial feedback using `reasons` and `comment` options.

### Add reasons (checkboxes or radio buttons)

Collect structured follow-up feedback:

```yaml {% title="redocly.yaml" %}
feedback:
  settings:
    reasons:
      component: radio  # or "checkbox" for multiple selection
      label: What made this helpful?
      items:
        - Clear explanations
        - Good examples
        - Comprehensive coverage
```

### Add comment field

Collect free-form follow-up feedback:

```yaml {% title="redocly.yaml" %}
feedback:
  settings:
    comment:
      label: Tell us more about your experience
```

### Reaction-specific extensions

Configure different follow-up questions based on user's initial reaction (for `sentiment` and `mood` forms):

```yaml {% title="redocly.yaml" %}
feedback:
  type: sentiment
  settings:
    reasons:
      like:
        label: What did you find most helpful?
        items:
          - Clear examples
          - Step-by-step instructions
      dislike:
        label: What can we improve?
        items:
          - Add more examples
          - Clarify instructions
    comment:
      likeLabel: What was most helpful?
      dislikeLabel: What can we improve?
```

## View and manage feedback data

Feedback data is collected and viewable in your project dashboard under the **Feedback** tab.

### Page feedback data

The **Page feedback** tab shows:
- **Page**: File path where feedback was submitted
- **User**: Email address (for logged-in users) or "Anonymous"
- **Value**: The feedback rating/reaction submitted
- **Message**: Any comment text provided
- **Date**: When feedback was submitted
- **Status**: New, Archived, or Spam

### Code reports data

The **Code reports** tab shows feedback from code snippet report buttons:
- **Page**: File path containing the code snippet
- **Location**: Specific code snippet where issue was reported
- **User**: Email address or "Anonymous"
- **Message**: Description of the reported issue
- **Date**: When report was submitted

### Export feedback data

Download feedback data as CSV for analysis:
1. Select **Export** in the feedback dashboard
2. Choose date range
3. Download CSV file with all feedback data

## Localization

Localize feedback form text with `translations.yaml` files.
Don't set text values in `redocly.yaml` when using translations, as `redocly.yaml` settings override translation files.

## Examples

### Sentiment with extensions

```yaml {% title="redocly.yaml" %}
feedback:
  type: sentiment
  settings:
    label: Was this page helpful?
    submitText: Thanks for your feedback!
    reasons:
      component: radio
      like:
        label: What made this page helpful?
        items:
          - The content has great examples.
          - Clear step-by-step instructions
      dislike:
        label: What should we improve?
        items:
          - The content lacks practical examples.
          - Instructions are unclear
    comment:
      likeLabel: What was most helpful?
      dislikeLabel: What can we improve?
```

### Mood with specific reactions

```yaml {% title="redocly.yaml" %}
feedback:
  type: mood
  settings:
    label: How did this page make you feel?
    submitText: Thanks for your feedback!
    reasons:
      satisfied:
        label: What worked well?
        items:
          - The content was accurate
          - Easy to follow instructions
      neutral:
        label: What could be better?
        items:
          - More examples needed
          - Unclear in some places
      dissatisfied:
        label: What went wrong?
        items:
          - Content was hard to find
          - Instructions didn't work
```

### Scale (1-10 rating)

```yaml {% title="redocly.yaml" %}
feedback:
  type: scale
  settings:
    label: How helpful was this page?
    submitText: Thanks for your feedback!
    leftScaleLabel: Not helpful
    rightScaleLabel: Very helpful
```

### Star rating (1-5 stars)

```yaml {% title="redocly.yaml" %}
feedback:
  type: rating
  settings:
    label: Rate this page
    submitText: Thank you for your rating!
```

### Comment form

```yaml {% title="redocly.yaml" %}
feedback:
  type: comment
  settings:
    label: Share your experience with this page
    submitText: Your comment has been sent to our team!
```

### Optional email collection

```yaml {% title="redocly.yaml" %}
feedback:
  settings:
    optionalEmail:
      label: Email address for follow-up
      placeholder: yourname@example.com
```

## Resources

- **[CodeSnippet configuration](./code-snippet.md#report-object)** - Customize code snippet report buttons for collecting feedback on technical documentation and examples
- **[GraphQL feedback](./graphql/index.md)** - Configure feedback collection specifically for GraphQL reference documentation and schema exploration
- **[Front matter configuration](./front-matter-config.md)** - Configure feedback settings on individual pages using front matter for granular control
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation customization
