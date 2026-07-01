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

---

- excludeFromSearch
- boolean
- Excludes a GraphQL schema from search results and `llms.txt` when set to `true`.
  Default: `false`.

{% /table %}

## Examples

### Exclude a GraphQL API from search

To exclude a specific GraphQL API from the search results, locate the API in `redocly.yaml` and under the `graphql` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
apis:
  library@default:
    root: 'graphql/schema.graphql'
    graphql:
      excludeFromSearch: true
```

### Exclude all GraphQL APIs from search

To exclude all GraphQL APIs from the search results, under the `graphql` key, set the `excludeFromSearch` option to `true`.

```yaml {% title="redocly.yaml" %}
graphql:
  excludeFromSearch: true
```

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[Add GraphQL documentation to your project](../../content/api-docs/add-graphql-docs.md)** - Step-by-step guide to adding GraphQL API documentation to your Redocly project
