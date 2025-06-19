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

- [openapi](./index.md) - Learn more about using `openapi` configuration.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)
- Explore other [configuration options](../index.md) for your project.
