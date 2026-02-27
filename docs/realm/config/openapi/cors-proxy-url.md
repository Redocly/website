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

The `corsProxyUrl` option controls which proxy Replay uses for cross-origin requests.

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
- Optional. By default, Realm uses its internal proxy endpoint (`/_api/cors/`).
  Set this option to override the proxy URL (for example, to use your own external proxy service).


{% /table %}

## Examples

Override the default proxy URL in your Redocly configuration file.

```yaml {% title="redocly.yaml" %}
openapi:
  corsProxyUrl: https://proxy.example.com/
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and CORS proxy configuration
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
