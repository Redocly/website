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

## Resources

- [openapi](./index.md) - Learn more about using `openapi` configuration.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
- Explore other [configuration options](../index.md) for your project.
