---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `onlyRequiredInSamples`

By default, the generated request samples include all available fields.
The `onlyRequiredInSamples` option restricts the request samples to include required fields only.
Use this option if you have a large number of optional fields that can make request samples difficult to read.

## Options

{% table %}

* Option
* Type
* Description

---

* onlyRequiredInSamples
* boolean
* Show only the required fields in request samples. Default value is `false`.

{% /table %}

## Examples

The following example produces request samples that show the required properties only:

```yaml {% title="redocly.yaml" %}
openapi:
  onlyRequiredInSamples: true
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
