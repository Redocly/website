---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `schemasExpansionLevel`

The `schemasExpansionLevel` option controls the expansion level of schemas in OpenAPI reference documentation. Set it to `all` to expand all schemas regardless of their level, or set it to a number to expand schemas up to the specified level.
Required properties are expanded by default to a depth of `4` levels.

## Options

{% table %}

* Option
* Type
* Description

---

* schemasExpansionLevel
* number | string | 'all'
* Sets the default expand level for schemas. There is no default value, so if this option is not configured nothing is expanded except for required properties, which are expanded to a depth of `4` levels.


{% /table %}

## Examples

The following example expands schemas up to 4 levels deep.

```yaml {% title="redocly.yaml" %}
openapi:
  schemasExpansionLevel: 4
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and schema expansion configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
