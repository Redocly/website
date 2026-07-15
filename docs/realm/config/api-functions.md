---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Control where Redocly detects and hosts API functions.
---
# `apiFunctions`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `apiFunctions` option to set paths where Redocly detects and hosts API functions.

By default, API functions are hosted at the `@api` folder and the path is served at `/api`.

## Options

{% table %}

- Option
- Type
- Description

---

- folders
- [string]
- List of paths where the API functions are stored.\
  Default value: `/@api`

---

- rateLimit
- [Rate limit object](#rate-limit-object)
- Rate limiting applied to API function requests.
  By default, production deployments limit each client IP to 120 requests per minute across all API functions.

{% /table %}

### Rate limit object

{% table %}

- Option
- Type
- Description

---

- events
- number
- Maximum number of requests allowed per client IP within the window, for API functions no rule matches.
  Default: `120`

---

- window
- string
- Length of the rate limiting window, as a number followed by a unit: `s` (seconds), `m` (minutes), or `h` (hours).
  For example: `30s`, `1m`, `2h`. Default: `1m`

---

- rules
- [[Rate limit rule object](#rate-limit-rule-object)]
- Ordered list of rate limits for specific endpoint paths.
  Requests are counted by the first rule whose `paths` match; API functions no rule matches use the top-level `events` and `window`.

---

- disabled
- boolean
- Turns off rate limiting for API functions, including the default production limit.
  Default: `false`
  If you turn off rate limits, you risk exposing API functions to potential abuse or resource exhaustion.

{% /table %}

### Rate limit rule object

{% table %}

- Option
- Type
- Description

---

- paths
- [string]
- **REQUIRED.** List of glob patterns for the endpoint paths the rule applies to.
  Requests to all matching endpoints share the rule's budget.

---

- events
- number
- Maximum number of requests allowed per client IP within the rule's window.
  Defaults to the top-level `events` value.

---

- window
- string
- Length of the rule's rate limiting window, in the same format as the top-level `window`.
  Defaults to the top-level `window` value.

---

- disabled
- boolean
- Exempts the rule's paths from rate limiting entirely.
  Default: `false`

{% /table %}

Requests over the limit receive a `429 Too Many Requests` response with a `Retry-After` header indicating when to retry.
Branch preview deployments enforce rate limits the same way as production deployments, including the default limit.
Local development with `realm develop` and the visual editor preview enforce rate limits only when the `rateLimit` option is explicitly configured.

Rate limits are applied per client IP address.
Requests rejected by access controls do not count toward rate limits, so unauthenticated traffic cannot exhaust the budget of users sharing the same address.
In deployed projects, the client IP is read exclusively from the `X-Real-IP` header, which Redocly's edge proxy overwrites with the connecting client's address on every request — client-supplied forwarding headers such as `X-Forwarded-For` are ignored and cannot be used to evade limits.
Requests without a valid `X-Real-IP` address share a single budget.
In local development with `realm develop`, common forwarding headers are also accepted so you can simulate different clients; they are client-supplied there, so do not treat local rate limiting as a security control.
If you route traffic through your own proxy or CDN before it reaches Redocly, requests can appear to come from your proxy's address and share its budget.

{% admonition type="warning" name="Rate limits are approximate" %}
Each serving instance of a project counts requests independently, so the effective limit can be higher than the configured value while a project serves traffic from multiple instances.
Do not rely on rate limits as an exact request quota.
If an API function protects a downstream system with a strict quota, such as a third-party API or a database, enforce that quota inside the function as well.
{% /admonition %}

Rate limits protect API functions against abuse; they are not a substitute for authentication or authorization.
Control access to sensitive endpoints with [RBAC for API functions](../customization/api-functions/api-functions-reference.md#authorization).

## Example

```yaml {% title="redocly.yaml" %}
apiFunctions:
  folders:
    - /my/api/folder/path/
    - /my/second/api/folder/path/
```

When you add this configuration to your project, the API functions are located in the `/my/api/folder/path/` and `/my/second/api/folder/path/` folders as well as the `/@api` folder.
All the endpoints in these folders are available at `/my/api/folder/path/...` and `/my/second/api/folder/path/...`, respectively.

This configuration describes the following folder structure:

```treeview
/
├── my/api/folder/path/
│   ├── hello.ts
│   └── communities/
│       └── [id].get.ts
├── my/second/api/folder/path/
│   ├── world.ts
│   └── books/
│       └── [id].get.ts
```

The corresponding API endpoints are:
- `/my/api/folder/path/hello`
- `/my/api/folder/path/communities/[id]`
- `/my/second/api/folder/path/world`
- `/my/second/api/folder/path/books/[id]`

### Rate limit example

```yaml {% title="redocly.yaml" %}
apiFunctions:
  rateLimit:
    events: 60
    window: 1m
    rules:
      - paths:
          - /api/webhooks/**
        events: 10
        window: 30s
      - paths:
          - /api/status
        disabled: true
```

With this configuration, each client IP can make up to 10 requests per 30 seconds to endpoints under `/api/webhooks/`, counted together;
the `/api/status` endpoint is exempt from rate limiting;
and all other API functions share a separate budget of 60 requests per minute.

## Resources

- **[API functions reference](../customization/api-functions/api-functions-reference.md)** - Complete reference for available API functions and their implementation in your documentation projects
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization