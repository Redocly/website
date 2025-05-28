---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `generatedSamplesMaxDepth`

The `generatedSamplesMaxDepth` option controls how many schema levels automatically generated for payload samples.
The default is 8 which works well for most APIs, but you can adjust it if necessary for your use case.

## Options

{% table %}

* Option
* Type
* Description

---

* generatedSamplesMaxDepth
* number
* Set the number of levels to generate payload samples. Default value is `8`.

{% /table %}

## Examples

The following example produces automatically generated payload samples with 3 levels:

```yaml {% title="redocly.yaml" %}
openapi:
  generatedSamplesMaxDepth: 3
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
