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

  You can set it to empty string to disable the proxy to send requests directly from user browser to the target API.
  This requires the target API to have CORS enabled.


{% /table %}

## Request flow and network requirements

When Replay uses a Redocly-hosted CORS proxy, requests are handled in this order:

1. Replay sends the request from the browser to your Redocly project build-in CORS proxy endpoint (`/_api/cors/`) or
   to the hosted CORS proxy endpoint (`https://cors.redocly.com/`).
2. The proxy sends the request to your target API and returns the response back to Replay.

The same outbound IP addresses are used by both the built-in proxy endpoint and the hosted proxy:

```sh
3.211.34.228
44.206.14.241
54.156.60.142
```

If your API is accessible only through a private network or VPN, configure `corsProxyUrl` to point to a proxy that runs inside your own network.

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
