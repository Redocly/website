---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `jsonSamplesExpandLevel`

The `jsonSamplesExpandLevel` option sets the default expand level for JSON payload samples (response and request body).
The maximum supported value is '+Infinity'.
It can also be configured as a string with the special value "all" that expands all levels.

## Options

{% table %}

- Option
- Type
- Description

---

- jsonSamplesExpandLevel
- number | string | 'all'
- Sets the default expand level for JSON payload samples.
  Default value is `2`.


{% /table %}

## Examples

The following example expands the JSON payload samples to a depth of five levels.

```yaml {% title="redocly.yaml" %}
openapi:
  jsonSamplesExpandLevel: 5
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and JSON sample expansion configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
