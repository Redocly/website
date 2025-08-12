---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `hideSchemaTitles`

By default, users can see schema field **title** properties.

The `hideSchemaTitles` option allows the schema field **title** to be hidden.

```yaml {% title="redocly.yaml" %}
  schema:
    type: 'object'
    properties:
      name:
        title: Title
        type: string
        description: hooray
```

## Options

{% table %}

* Option
* Type
* Description

---

* hideSchemaTitles
* boolean
* Hides the schema title next to the type. Defaults to `false`.

{% /table %}

## Examples

The following example hides the schema **title** properties:

```yaml {% title="redocly.yaml" %}
openapi:
  hideSchemaTitles: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and schema title customization
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
