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

* Option
* Type
* Description

---

* jsonSamplesDepth
* number
* Sets the default depth for rendering JSON payload samples. The default value is `1`.

{% /table %}

## Examples

The following example sets the depth for JSON payload samples to five levels.

```yaml {% title="redocly.yaml" %}
graphql:
  jsonSamplesDepth: 5
```

Using this setting, the samples will show up to five levels of nested payload data.

## Related options

- [samplesMaxInlineArgs](./samples-max-inline-args.md) - Maximum number of inline arguments for samples.
- [fieldExpandLevel](./field-expand-level.md) - Maximum depth of the `Return type` in the middle panel.
- [graphql](./index.md) - Learn more about using the `graphql` configuration.

## Resources

- [GraphQL](https://graphql.org/)