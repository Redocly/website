---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `samplesMaxInlineArgs`

The `samplesMaxInlineArgs` option sets how many arguments are shown inline in the query sample.
When there are more arguments than the configured value, every argument will be shown on its own line.

## Options

{% table %}

- Option
- Type
- Description

---

- samplesMaxInlineArgs
- number
- Sets the maximum number of inline arguments for samples.
  Default value is `2`.

{% /table %}

## Examples

The following example allows up to five inline arguments to be displayed in code samples.

```yaml {% title="redocly.yaml" %}
graphql:
  samplesMaxInlineArgs: 5
```

For longer-named arguments, a lower setting may produce more readable samples.

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for customizing API reference documentation
- **[JSON samples depth configuration](./json-samples-depth.md)** - Set the default expand level for JSON payload samples to complement inline argument display
- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for comprehensive API reference documentation customization
