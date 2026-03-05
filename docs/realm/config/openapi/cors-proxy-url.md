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

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "corsProxyUrl"} /%}
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- corsProxyUrl
- string
- The value can be the Redocly CORS proxy URL (https://cors.redoc.ly) or the URL of a custom CORS proxy server.


{% /table %}

## Examples

Modify the value of the corsProxyUrl option in the Redocly configuration file.

```yaml {% title="redocly.yaml" %}
openapi:
  corsProxyUrl: https://cors.redoc.ly
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and CORS proxy configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
