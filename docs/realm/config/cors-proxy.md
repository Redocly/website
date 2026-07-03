---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Restrict the built-in CORS proxy to specific remote hosts and paths.
---

# `corsProxy`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Redocly projects include a built-in CORS proxy at `/_api/cors/` that lets browser-based features (such as the **Try it** console) reach APIs on different origins without running into CORS restrictions.

By default, the proxy forwards requests to any remote URL.
Use `corsProxy` to only forward URLs to an explicit allowlist of URL prefixes so that only known API hosts can be reached through your project's domain.

## Options

{% table %}

- Option
- Type
- Description

---

- allowedTargets
- [string]
- List of URL prefixes the CORS proxy is allowed to forward requests to.
  Each entry is matched as a **prefix** against the full target URL.
  When the list is non-empty, any request whose target does not start with one of these prefixes is rejected with a `403` response.
  When omitted or empty, the proxy forwards requests to any URL (default behavior).

---

{% /table %}

## Examples

### Restrict to a single API

```yaml
corsProxy:
  allowedTargets:
    - https://api.example.com/v1/
```

With this configuration, `/_api/cors/https://api.example.com/v1/users` is proxied, but `/_api/cors/https://evil.com/steal` is blocked.

### Allow multiple hosts

```yaml
corsProxy:
  allowedTargets:
    - https://api.example.com/
    - https://cdn.example.com/assets/
    - https://partner-api.acme.io/v2/
```

### Unrestricted (default)

When `corsProxy` is not specified, or `allowedTargets` is empty, the proxy forwards requests to any URL:

```yaml
corsProxy:
  allowedTargets: []
```

## Resources

- **[Configuration options](./index.md)** - Explore other project configuration options
- **[OpenAPI `corsProxyUrl`](./openapi/cors-proxy-url.md)** - Configure the CORS proxy URL used by the Try it console
