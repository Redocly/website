---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `sortRequiredPropsFirst`

By default, fields display in the order they appear in the API description.
The `sortRequiredPropsFirst` option moves required fields to the top of each schema section.

## Options

{% table %}

- Option
- Type
- Description

---

- sortRequiredPropsFirst
- boolean
- Sort required schema properties before optional ones.
  Default: `false`.

{% /table %}

## Examples

The following example shows required properties first:

```yaml {% title="redocly.yaml" %}
openapi:
  sortRequiredPropsFirst: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description
- **[Configuration options](../index.md)** - All the other options for your project
