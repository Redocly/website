---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `jsonSamplesDepth`

The `jsonSamplesDepth` option sets the default depth for rendering JSON payload samples for queries and responses.
Use this option to set the depth to a comfortable default value for the data structure of your API.

## Options

{% table %}

- Option
- Type
- Description

---

- jsonSamplesDepth
- number
- Sets the default depth for rendering JSON payload samples.
  The default value is `1`.

{% /table %}

## Examples

The following example sets the depth for JSON payload samples to five levels.

```yaml {% title="redocly.yaml" %}
graphql:
  jsonSamplesDepth: 5
```

Using this setting, the samples will show up to five levels of nested payload data.

## Troubleshooting missing nested levels

If your sample responses appear to be missing nested levels, it may be because the data structure exceeds the default depth.
Increase the `jsonSamplesDepth` value to ensure all nested levels are rendered in the samples.
For example, set it to `10` for deeply nested schemas.

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for customizing API reference documentation
- **[Samples max inline arguments](./samples-max-inline-args.md)** - Configure the maximum number of inline arguments for samples to complement JSON payload depth settings
- **[Field expand level](./field-expand-level.md)** - Set the maximum depth of the Return type in the middle panel for comprehensive data structure display
