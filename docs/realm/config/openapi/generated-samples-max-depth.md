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

- Option
- Type
- Description

---

- generatedSamplesMaxDepth
- number
- Set the number of levels to generate payload samples.
  Default value is `8`.

{% /table %}

## Examples

The following example produces automatically generated payload samples with 3 levels:

```yaml {% title="redocly.yaml" %}
openapi:
  generatedSamplesMaxDepth: 3
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and sample generation depth configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
