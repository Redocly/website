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

In a schema, nested properties display with their parent names as a prefix, for example `parent.child`.
The `hidePropertiesPrefix` option removes that prefix, so each nested property shows its own name only.

## Options

{% table %}

- Option
- Type
- Description

---

- hidePropertiesPrefix
- boolean
- Hide the parent name prefix on nested schema properties.
  Default: `false`.

{% /table %}

## Examples

The following example hides the parent names:

```yaml {% title="redocly.yaml" %}
openapi:
  hidePropertiesPrefix: true
```

## Resources

- **[OpenAPI configuration](./index.md)** - All the options you can set under `openapi`.
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - The official standard for API descriptions.
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - A visual map of every part of an OpenAPI description.
- **[Configuration options](../index.md)** - All the other options for your project.
