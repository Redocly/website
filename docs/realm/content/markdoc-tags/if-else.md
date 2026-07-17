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
# If and else tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `if` and `else` tags let you conditionally render content in Markdoc.
Use these tags with variables and functions to show the right content for the right user or context.

## Syntax and usage

Use `if` when you want content to render only when a condition is true.
Add `else` when you want fallback content when the `if` condition is not met.

**Example syntax:**

{% markdoc-example %}
  ```markdown {% process=false %}
  {% if equals($frontmatter.audience, "developer") %}
  This guide shows advanced API setup steps.
  {% else /%}
  This guide shows a high-level overview.
  {% /if %}
  ```
{% /markdoc-example %}

In Realm, you can chain multiple `else` branches with conditions.
The final `else /%` branch acts as the default fallback.

{% markdoc-example %}
  ```markdown {% process=false %}
  {% if equals($userClaims.plan, "enterprise") %}
  Access to enterprise-only docs.
  {% else equals($userClaims.plan, "pro") /%}
  Access to pro docs.
  {% else /%}
  Upgrade to unlock this section.
  {% /if %}
  ```
{% /markdoc-example %}

{% admonition type="warning" name="Values in Markdoc" %}

Markdoc treats only `undefined`, `null`, and `false` as falsey.
Values like `0`, empty strings, and empty arrays are treated as truthy.

{% /admonition %}

## Conditional function reference

Use built-in functions to keep conditional expressions readable and composable.

{% table %}

- Function
- Returns
- Description

---

- equals
- boolean
- Compares values using strict equality.
  Useful for role, plan, or environment checks.

---

- and
- boolean
- Returns true when all parameters are truthy.

---

- or
- boolean
- Returns true when at least one parameter is truthy.

---

- not
- boolean
- Negates a boolean expression.

---

- default
- mixed
- Returns a fallback value when the first parameter is undefined.

---

- debug
- string
- Serializes a value as JSON for debugging.
  Useful when testing variables in a condition.

{% /table %}

## Examples

The following examples show common conditional patterns for documentation.

### Gate content using the front matter

Use front matter variables to switch content variants in one page.

{% markdoc-example %}
  ```markdown {% process=false %}
  ---
  releaseStage: beta
  ---

  {% if equals($frontmatter.releaseStage, "beta") %}
  {% admonition type="warning" %}
  This feature is in beta and may change.
  {% /admonition %}
  {% else /%}
  This feature is generally available.
  {% /if %}
  ```
{% /markdoc-example %}

### Combine built-in functions

Compose conditions for more specific rules.

{% markdoc-example %}
  ```markdown {% process=false %}
  {% if and(equals($userClaims.role, "customer"), not($userClaims.isExpired)) %}
  Premium customer content.
  {% else /%}
  You need an active premium subscription.
  {% /if %}
  ```
{% /markdoc-example %}

### Use a custom function with if and else

Custom functions make repeated business logic reusable for authors.

**Example function definition:**

```typescript {% title="@theme/markdoc/schema.ts" %}
export const functions = {
  isAfterDate: {
    transform(parameters) {
      const inputDateString = parameters[0];
      const inputDate = new Date(inputDateString);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      return inputDate < currentDate;
    }
  }
};
```

**Example usage in content:**

{% markdoc-example %}
  ```markdown {% process=false %}
  {% if and(isAfterDate("2026-06-01"), not(isAfterDate("2026-07-01"))) %}
  {% admonition type="info" name="Sale" %}
  Limited-time offer is active.
  {% /admonition %}
  {% else /%}
  No active promotion.
  {% /if %}
  ```
{% /markdoc-example %}

## Best practices

Conditional tags are most useful when they improve relevance without making the document hard to maintain.

**Keep conditions readable**

Prefer simple expressions.
Move repeated logic into custom functions.

**Always include a fallback**

Use a final `else /%` branch when content can be hidden for some users.
Fallback text prevents empty sections.

**Use stable variables**

Base conditions on predictable values such as front matter, user claims, or environment flags.
Avoid conditions that rely on inconsistent runtime data.

**Test both paths**

Preview pages with values that trigger both `if` and `else` branches.
Confirm that hidden content does not leave confusing gaps.

## Resources

- **[Build a Markdoc function](../../customization/build-custom-function.md)** - Follow a tutorial for adding custom functions in a Redocly Realm project
- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to make your content dynamic with `if` and `else`
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
