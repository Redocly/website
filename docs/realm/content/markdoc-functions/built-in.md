---
seo:
  description: Overview of standard built-in Markdoc functions and custom functions provided by Redocly.
---

# Built-in Markdoc functions

This page provides an overview and links to reference documentation for the built-in functions available for use in your Markdoc content. These include both standard Markdoc functions and additional functions provided by Redocly.

## Standard Markdoc functions

Markdoc provides a set of standard built-in functions essential for common tasks like comparisons and logical operations.

Key standard functions include:

- `equals`: Equality check.
- `and`: Logical AND operation.
- `or`: Logical OR operation.
- `not`: Logical NOT operation.
- `default`: Returns the second parameter if the first parameter is `undefined`.
- `debug`: Serializes the value as JSON, for debugging.

For a complete list and detailed usage of *all* standard functions, please refer to the **[official Markdoc Functions documentation](https://markdoc.dev/docs/functions)**.

## Redocly Functions

In addition to the standard set, Redocly provides custom functions:

- [`includes`](./includes.md): Checks if an array contains a specific value.
- [`concat`](./concat.md): Joins multiple arguments into a single string.

## Resources

- Learn about using built-in and custom [Markdoc functions](./index.md).
- Learn how to define and integrate your own custom functions in [Build a Markdoc function](../../customization/build-custom-function.md).
