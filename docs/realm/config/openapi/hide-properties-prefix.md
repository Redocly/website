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

* Option
* Type
* Description

---

* hidePropertiesPrefix
* boolean
* Shows or hides parent name for the nested properties inside schema. Defaults to `false`.

{% /table %}

## Examples

The following example hides the parent object names for nested properties.

```yaml {% title="redocly.yaml" %}
openapi:
  hidePropertiesPrefix: true
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
