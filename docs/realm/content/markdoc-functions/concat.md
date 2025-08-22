---
title: concat function
seo:
  description: Reference for the Redocly Markdoc built-in function "concat".
data:
  firstName: John
  lastName: Doe
  imageId: 237
---

# `concat` function

The `concat` function joins multiple arguments together into a single string.

## Syntax

```markdoc
concat(arg1, arg2, ..., argN)
```

## Parameters

{% table %}

- Parameter
- Type
- Description

---

- arg1, ..., argN
- scalar (string, number, boolean, null)
- **Required.** One or more values to concatenate.
  Non-string values are converted to their string representation (e.g., `true` becomes `"true"`, `123` becomes `"123"`, `null` becomes `"null"`).

{% /table %}

## Returns

A single string resulting from the concatenation of all provided arguments.

## Examples

### Concatenate strings

{% markdoc-example %}
  ```markdoc {% process=false %}
  Full name: {% concat($frontmatter.data.firstName, " ", $frontmatter.data.lastName) %}
  ```
{% /markdoc-example %}

**Result:**\
Full name: {% concat($frontmatter.data.firstName, " ", $frontmatter.data.lastName) %}

### Create dynamic image URLs

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% img src=concat("https://picsum.photos/id/", $frontmatter.data.imageId, "/300/200") /%}
  ```
{% /markdoc-example %}

**Result:**

{% img src=concat("https://picsum.photos/id/", $frontmatter.data.imageId, "/300/200") /%}

### Create dynamic card title

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% card title=concat("Author", " ", $frontmatter.data.firstName, " ", $frontmatter.data.lastName) %}
    I'm a **card**.
  {% /card %}
  ```
{% /markdoc-example %}

**Result:**

{% card title=concat("Author", " ", $frontmatter.data.firstName, " ", $frontmatter.data.lastName) %}
    I'm a **card**.
{% /card %}

## Resources

- **[Markdoc functions overview](./index.md)** - Learn about using built-in and custom functions for dynamic content manipulation and processing
- **[Build custom Markdoc functions](../../customization/build-custom-function.md)** - Define and integrate your own custom functions for advanced content processing and dynamic features