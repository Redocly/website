---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: |-
  Customize the behavior and appearance of integrated GraphQL documentation.
  Requires a GraphQL schema.
---
# `graphql`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the behavior and appearance of integrated GraphQL documentation.
Requires a GraphQL schema.

## Options

{% table %}

- Option
- Type
- Description

---

- [menu](./menu.md)
- object
- Menu options.

---

- [info](./info.md)
- [Info object](./info.md#options)
- API metadata including title, description, contact, and license information for the overview page.

---

- [samplesMaxInlineArgs](./samples-max-inline-args.md)
- number
- Maximum number of inline arguments for samples.

---

- [jsonSamplesDepth](./json-samples-depth.md)
- number
- Sets the default expand level for JSON payload samples.

---

- [fieldExpandLevel](./field-expand-level.md)
- number
- Maximum depth of the `Return type` in the middle panel.

---

- [feedback](../feedback.md)
- [Feedback object](../feedback.md#options)
- Hide or customize the type of or text included in the feedback form that displays at the end of each endpoint.

---

- [showBuiltInScalars](./show-built-in-scalars.md)
- boolean
- Show GraphQL built-in scalar types in the navigation and pages.

---

- [showBuiltInDirectives](./show-built-in-directives.md)
- boolean
- Show GraphQL built-in directives in the navigation and pages.

{% /table %}

## Behaviors and limitations

### Deprecations

Redocly renders deprecation notices for fields and enum values as per the GraphQL specification.
Note that the GraphQL specification does not support the `@deprecated` directive on object types.

Currently, there is a known limitation where deprecated input fields and objects might not be fully marked as deprecated in the UI.

### Custom scalars

Custom scalars currently render using a generic `Example Custom Scalar` placeholder.
Examples defined in the GraphQL schema for custom scalars are not yet supported.

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[Add GraphQL documentation to your project](../../content/api-docs/add-graphql-docs.md)** - Step-by-step guide to adding GraphQL API documentation to your Redocly project
