---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `onlyRequiredInSamples`

By default, the generated request samples include all available fields.
The `onlyRequiredInSamples` option restricts the request samples to include required fields only.
Use this option if you have a large number of optional fields that can make request samples difficult to read.

## Options

{% table %}

- Option
- Type
- Description

---

- onlyRequiredInSamples
- boolean
- Show only the required fields in request samples.
  Default value: `false`.

{% /table %}

## Examples

The following example produces request samples that show the required properties only:

```yaml {% title="redocly.yaml" %}
openapi:
  onlyRequiredInSamples: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and sample generation principles
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
