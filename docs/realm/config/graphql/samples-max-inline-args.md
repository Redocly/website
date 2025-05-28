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
- Sets the maximum number of inline arguments for samples. Default value is `2`.

{% /table %}

## Examples

The following example allows up to five inline arguments to be displayed in code samples.

```yaml {% title="redocly.yaml" %}
graphql:
  samplesMaxInlineArgs: 5
```

For longer-named arguments, a lower setting may produce more readable samples.

## Related options

- [jsonSamplesDepth](./json-samples-depth.md) - Sets the default expand level for JSON payload samples.
- [graphql](./index.md) - Learn more about using `graphql` configuration.

## Resources

- [GraphQL](https://graphql.org/)
