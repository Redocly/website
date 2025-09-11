---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `fieldExpandLevel`

The `fieldExpandLevel` option allows you to specify the maximum depth of the data available in the `Return type` section.
Use this option to define how much information is in this context; the user can click on the fields to view further arguments and other details.

## Options

{% table %}

- Option
- Type
- Description

---

- fieldExpandLevel
- number
- Indicates the maximum depth of the data described in the "Return type" section.
  This setting allows users to expand the fields to view further arguments and other details.
  Default value is `4`.


{% /table %}

## Examples

The following example sets the maximum depth of the `Return type` to three.

```yaml {% title="redocly.yaml" %}
graphql:
  fieldExpandLevel: 3
```

If you have fields with more than three levels of data structure within them, users will need to visit the data types documentation for that type rather than having it all displayed in the "Return type" section.

## Related options

- [jsonSamplesDepth](./json-samples-depth.md) - Sets the default expand level for JSON payload samples.
- [graphql](./index.md) - Learn more about using `graphql` configuration.

## Resources

- **[GraphQL](https://graphql.org/)** - Official GraphQL specification and documentation for understanding query language fundamentals
- **[GraphQL configuration](./index.md)** - Complete guide to GraphQL configuration options for customizing API reference documentation
