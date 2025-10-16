---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `showBuiltInDirectives`

Built-in directives:
- skip
- include
- deprecated
- specifiedBy
- oneOf

## Options

{% table %}

- Option
- Type
- Description

---

- showBuiltInDirectives
- boolean
- Display built-in GraphQL directives in the UI.
  Default: `false`.

{% /table %}

## Examples

Enable built-in directives:

```yaml {% title="redocly.yaml" %}
graphql:
  showBuiltInDirectives: true
```

## Resources

- **[GraphQL configuration](./index.md)** - Complete configuration reference for GraphQL docs
- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation

