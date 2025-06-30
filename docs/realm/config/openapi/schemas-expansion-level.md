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

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
