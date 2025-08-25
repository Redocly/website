---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `maxDisplayedEnumValues`

The `maxDisplayedEnumValues` displays only the specified number of enum values. The remaining values are hidden in an expandable area. By default 10 values are displayed which is ideal for usability.

## Options

{% table %}

* Option
* Type
* Description

---

* maxDisplayedEnumValues
* number
* Sets the number of enum values to display. The default behavior is that 10 values are displayed.

{% /table %}

## Examples

The following example displays three enum values for each enum field, any further values are available in an expandable section:

```yaml {% title="redocly.yaml" %}
openapi:
  maxDisplayedEnumValues: 3
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and enum value display configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
