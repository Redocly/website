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

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
