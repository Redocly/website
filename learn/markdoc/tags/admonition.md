---
seo:
  title: Admonition Markdoc Tag
  description: Improve the clarity of your content by directing user attention to specific information with the Admonitions tag. Great for warnings, tips, and more.
---

# Admonition Tag [{% markdoc-tag-badge badgeType="Redocly" /%}](./tag-library#redocly-tag-badge)

The admonition tag calls your users' attention to a specific piece of information by placing it inside a pre-styled banner, separate from the main content.

{% admonition type="info" %}
Use admonitions to **add clarity** to your content or _communicate important information_.
{% /admonition %}

## Syntax and usage

Use the admonition tag to wrap content. Choose between the pre-built styles using `type`. Optionally add a header with `name`.

{% admonition type="warning" name="Important warning" %}
Stop! **Read me** before moving on.
{% /admonition %}
{% markdoc-example %}

```md {% process=false %}
{% admonition type="warning" name="Important warning" %}
  Stop! **Read me** before moving on.
{% /admonition %}
```

{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- `type`
- String
- **Required.**
  Sets the type of admonition to info, warning, success, or danger. Examples below.

---

- `name`
- String
- Adds a header to the admonition. Transforms to ALL CAPS.

{% /table %}

### Admonition types

{% admonition type="info" .smaller-admonition-margins %}
Type `info` creates an **Info** admonition.
{% /admonition %}
{% admonition type="warning" .smaller-admonition-margins %}
Type `warning` creates a **Warning** admonition.
{% /admonition %}
{% admonition type="success" .smaller-admonition-margins %}
Type `success` creates a **Success** admonition.
{% /admonition %}
{% admonition type="danger" .smaller-admonition-margins %}
Type `danger` creates a **Danger** admonition.
{% /admonition %}

## Examples

### Add relevant information

{% admonition type="info" %}
Admonitions can be _distracting_. Consider how they **help users** before adding them.
{% /admonition %}

{% markdoc-example %}

```md {% process=false %}
  {% admonition type="info" %}
    Admonitions can be _distracting_. Consider how they **help users** before adding them.
  {% /admonition %}
```

{% /markdoc-example %}

### Highlight something important

{% admonition type="warning" name="Read this!" %}
Users read admonitions _before_ content. They can communicate essential information.
{% /admonition %}

{% markdoc-example %}

```md {% process=false %}
  {% admonition type="warning" name="Read this!" %}
    Users read admonitions _before_ content. They can communicate essential information.
  {% /admonition %}
```

{% /markdoc-example %}

### Communicate urgency

{% admonition type="danger" name="Careful" %}
Don't abuse admonitions or readers will ignore them. You might need them to communicate something before a user makes an irreversible decision.
{% /admonition %}

{% markdoc-example .wrapped-code-snippet %}

```md
  {% admonition type="danger" name="Careful" %}
    Don't abuse admonitions or readers will ignore them. You might need them to communicate something before a user makes an irreversible decision.
  {% /admonition %}
```

{% /markdoc-example %}

### Celebrate wins

{% admonition type="success" name="Success" %}
You made it to the **last admonition example**. Hooray 🥳!
{% /admonition %}

{% markdoc-example %}

```md {% process=false %}
  {% admonition type="success" name="Success" %}
    You made it to the **last admonition example**. Hooray 🥳!
  {% /admonition %}
```

{% /markdoc-example %}

## Best practices

**Use in moderation**
Overuse of admonitions will reduce their effectiveness and users will learn to ignore them.

**Don't use for page content**
Carefully consider the information you put in your admonitions. They should add value and clarity or communicate something important. If readers don't know what to expect, then admonitions won't draw their attention effectively.

**Use clear headers**
Use short, impactful headers that reflect the content to set the tone and encourage users to pay attention to the message.

**Choose the right type**
Select the admonition type that aligns with the nature of the content. This helps users understand _intent_ and recognize the level of urgency. For example, you should use `warning` for cautionary information and `success` for confirmation or positive feedback.

**Admonitions _after_ content**
Avoid using admonitions as the first element below headers or section headers. Giving readers information to consider _before_ content adds to their cognitive load and reduces comprehension.
