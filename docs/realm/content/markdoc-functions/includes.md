---
title: includes function
seo:
  description: Reference for the Redocly Markdoc built-in function "includes".
---

# `includes` function

The `includes` function checks if an array contains a specific value.
It is commonly used within conditional logic (`{% if %}`) tags.

## Syntax

```markdoc
includes(array, value)
```

## Parameters

{% table %}

- Parameter
- Type
- Description

---

- array
- array
- **Required.** The array to check.
  Often a variable like `$frontmatter.tags` or an array defined directly.

---

- value
- scalar (string, number, boolean, null)
- **Required.** The value to search for within the array.

{% /table %}

## Returns

`true` if the `array` contains the `value`, otherwise `false`.

## Examples

### Check frontmatter tags

{% markdoc-example %}
  ```markdoc
  ---
  tags: ["tutorial", "api", "getting-started"]
  ---

  {% if includes($frontmatter.tags, "api") %}
  This page is relevant for API users.
  {% /if %}

  {% if not(includes($frontmatter.tags, "advanced")) %}
  This content is suitable for beginners.
  {% /if %}
  ```
{% /markdoc-example %}

### Check user teams membership

{% markdoc-example %}
  ```markdoc
  {% if includes($rbac.teams, "employee") %}
  You are an employee.
  {% /if %}
  ```
{% /markdoc-example %}