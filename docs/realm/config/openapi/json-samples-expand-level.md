---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `jsonSamplesExpandLevel`

The `jsonSamplesExpandLevel` option sets the default expand level for JSON payload samples (response and request body). The maximum supported value is '+Infinity'. It can also be configured as a string with the special value "all" that expands all levels.

## Options

{% table %}

* Option
* Type
* Description

---

* jsonSamplesExpandLevel
* number | string | 'all'
* Sets the default expand level for JSON payload samples. Default value is `2`.


{% /table %}

## Examples

The following example expands the JSON payload samples to a depth of five levels.

```yaml {% title="redocly.yaml" %}
openapi:
  jsonSamplesExpandLevel: 5
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
