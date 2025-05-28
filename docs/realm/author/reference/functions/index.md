---
title: Markdoc functions
seo:
  description: Learn about using built-in and custom Markdoc functions in Redocly.
---

# Markdoc functions

Markdoc functions add powerful capabilities to your Markdown content, enabling conditional logic and data manipulation.

Functions are typically used in two main ways:

1. **Conditional rendering:** Inside `{% if %}` tags to control whether a block of content is displayed based on variable values or other conditions.
2. **Direct output:** Within `{% ... %}` delimiters to directly output a computed value into the content.

## Call functions

Call functions using a syntax similar to programming languages:

`{% functionName(argument1, argument2, ...) %}`

Arguments can be literal values (strings, numbers, booleans), variables (like `$frontmatter.seo.title` or `$rbac.teams`), or results of other functions.

## Resources

- Explore the standard Markdoc functions in [Built-in functions overview](./built-in.md).
- Learn how to define and integrate your own custom functions in [Build a Markdoc function](../../../extend/tutorials/build-custom-function.md).
