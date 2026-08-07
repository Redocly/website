---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hidePropertiesPrefix`

In complex data structures or object schemas where properties are nested within parent objects the `hidePropertiesPrefix` option enables the hiding of parent names for nested properties within the documentation.

## Options

{% table %}

- Option
- Type
- Description

---

- hidePropertiesPrefix
- boolean
- Shows or hides parent name for the nested properties inside schema.
  Defaults to `false`.

{% /table %}

## Examples

The following example hides the parent object names for nested properties.

```yaml {% title="redocly.yaml" %}
openapi:
  hidePropertiesPrefix: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and property prefix customization
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
