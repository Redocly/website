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

A schema field can set a **title** property, and Redoc displays it next to the field type.
The `hideSchemaTitles` option hides those titles.

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

- Option
- Type
- Description

---

- hideSchemaTitles
- boolean
- Hide the schema title next to the type.
  Default: `false`.

{% /table %}

## Examples

The following example hides the schema **title** properties:

```yaml {% title="redocly.yaml" %}
openapi:
  hideSchemaTitles: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description
- **[Configuration options](../index.md)** - All the other options for your project
