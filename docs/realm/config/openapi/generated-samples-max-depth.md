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

The `generatedSamplesMaxDepth` option controls how many schema levels appear in generated payload samples.
The default is 8, which works well for most APIs.
Adjust it when your schemas need more or less depth.

## Options

{% table %}

- Option
- Type
- Description

---

- generatedSamplesMaxDepth
- number
- Set the number of schema levels in generated payload samples.
  Default: `8`.

{% /table %}

## Examples

The following example generates payload samples with 3 levels:

```yaml {% title="redocly.yaml" %}
openapi:
  generatedSamplesMaxDepth: 3
```

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`.
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions.
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description.
- **[Configuration options](../index.md)** - All the other options for your project.
