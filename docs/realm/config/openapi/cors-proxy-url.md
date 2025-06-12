---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `corsProxyUrl`

The `corsProxyUrl` option allows using a custom CORS proxy server.

## Options

{% table %}

* Option
* Type
* Description

---

* corsProxyUrl
* string
* The value can be the Redocly CORS proxy URL (https://cors.redoc.ly) or the URL of a custom CORS proxy server.


{% /table %}

## Examples

Modify the value of the corsProxyUrl option in the Redocly configuration file.

```yaml {% title="redocly.yaml" %}
openapi:
  corsProxyUrl: https://cors.redoc.ly
```

## Related options

- [openapi](./index.md) - Learn more about using `openapi` configuration.

## Resources

- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenAPI visual reference](https://redocly.com/docs/openapi-visual-reference/)
