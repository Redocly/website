---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `showBuiltInScalars`

Built-in scalars:
- Int
- Float
- String
- Boolean
- ID

## Options

{% table %}

- Option
- Type
- Description

---

- showBuiltInScalars
- boolean
- Display built-in GraphQL scalar types in the UI.
  Default: `false`.

{% /table %}

## Examples

Enable built-in scalars:

```yaml {% title="redocly.yaml" %}
graphql:
  showBuiltInScalars: true
```

## Resources

- **[GraphQL configuration](./index.md)** - Complete configuration reference for GraphQL docs
- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation

