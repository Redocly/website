---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Control which API server hosts AI clients can call through the Docs MCP server.
---

# Allow AI clients to call APIs

Allow AI clients connected to the Docs MCP server to send HTTP requests to selected API server hosts.
Redocly derives request eligibility and allowed hosts from the OpenAPI descriptions in your project.

## Before you begin

Make sure you have the following:

- Access to the Docs MCP server for your project
- An OpenAPI description included in the Docs MCP catalog
- Permission to edit the OpenAPI description
- A usable root-level OpenAPI `servers` entry

Start with an API operation that does not require upstream credentials.

## Review the default eligibility

The access level of an API description determines whether requests are allowed by default.

{% table %}

- API description access
- `info.x-mcp.gateway`
- API requests

---

- Available to the `anonymous` team
- Not set
- Allowed by default

---

- Available to the `anonymous` team
- `hide: true`
- Not allowed

---

- Protected by content RBAC
- Not set
- Not allowed

---

- Protected by content RBAC
- Empty object or `hide: false`
- Allowed for users who can access the description

{% /table %}

Eligibility follows access to the API description, not the authentication requirements of the upstream API.
Allowing a protected description does not bypass RBAC: each MCP user must still have permission to access that description.

## Allow requests for a protected description

Add an empty `gateway` object to `info.x-mcp`:

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Orders API
  version: 1.0.0
  x-mcp:
    gateway: {}
servers:
  - url: https://api.example.com
paths:
  /orders:
    get:
      summary: List orders
      responses:
        '200':
          description: Successful response
```

This setting opts the description into API requests.
It does not make the description visible to users who cannot access it through project RBAC.

## Prevent requests for a description

Set `info.x-mcp.gateway.hide` to `true`:

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Orders API
  version: 1.0.0
  x-mcp:
    gateway:
      hide: true
servers:
  - url: https://api.example.com
paths:
  /orders:
    get:
      summary: List orders
      responses:
        '200':
          description: Successful response
```

Use this setting to opt out a description that would otherwise be eligible, including a description available to anonymous users.

To remove the description from documentation discovery as well, exclude its relative path with `mcp.docs.ignore`.

## Declare allowed server hosts

Add each callable host to the root-level OpenAPI `servers` array.
Only root-level servers are used; path-level and operation-level servers do not add allowed hosts.

```yaml {% title="openapi.yaml" %}
servers:
  - url: https://api.example.com
    description: Production
  - url: https://sandbox-api.example.com
    description: Sandbox
```

Use absolute HTTP or HTTPS URLs with public, multi-label hostnames.
Relative URLs, IP-address hosts, private network hosts, and single-label hostnames do not make a callable host available.

For a templated hostname, define the permitted values with a server variable `enum`:

```yaml {% title="openapi.yaml" %}
servers:
  - url: https://{region}.api.example.com
    variables:
      region:
        default: us
        enum:
          - us
          - eu
```

An explicit `enum` gives project owners the clearest control over the hostnames an AI client can use.

{% admonition type="warning" name="Server access is host-wide" %}
An eligible server entry allows requests to the entire hostname, not only the paths and methods documented in the OpenAPI description.
Do not allow a host if it exposes undocumented endpoints that should not be reachable through the Docs MCP server.
Path-level or operation-level `x-mcp` settings do not narrow this boundary.
{% /admonition %}

## Understand API reference discovery

For an eligible API description in the Docs MCP catalog, Redocly can add root-level `x-mcp` metadata to the rendered API reference.
The metadata points compatible clients to the project's `/mcp` endpoint and provides a connection action on the API page.

If the OpenAPI Root Object already contains `x-mcp.servers`, Redocly preserves those author-defined MCP servers instead of advertising the Docs MCP endpoint on that API page.
The Info Object `x-mcp.gateway` setting controls API request eligibility independently of the root-level MCP server description.

## Understand request safeguards

Requests from the Docs MCP server have the following safeguards:

- Only hosts derived from eligible, caller-visible OpenAPI descriptions are allowed.
- Private, loopback, reserved, and literal IP targets are blocked.
- DNS results are checked again when the connection is created.
- Redirects are returned to the client but are not automatically followed.
- Each upstream request has a 30-second timeout.
- Each response body is limited to 1 MiB.
- A single execution has an outbound request budget; clients must split larger tasks across calls.

These controls reduce unintended network access, but they do not replace authorization, validation, rate limiting, or other protections on the upstream API.

## Verify API requests

After deploying the OpenAPI changes, reconnect the MCP client so it refreshes the server capabilities.

Ask the client to identify the API and perform a safe read request, for example:

```text
Find the Orders API, inspect its list-orders operation, and request the first page from the sandbox server.
Return the HTTP status and a short summary of the response.
```

If the request is blocked or unavailable:

- Confirm that the API description is included in the Docs MCP catalog.
- Confirm that the current MCP user can access the API description.
- For a protected description, confirm that `info.x-mcp.gateway` is present.
- For a public description, confirm that `info.x-mcp.gateway.hide` is not `true`.
- Confirm that the target hostname comes from a usable root-level `servers` entry.
- Confirm that the request uses HTTP or HTTPS and a public hostname.

## Resources

- **[Docs MCP server](./index.md)** - Understand documentation discovery and API request capabilities
- **[`x-mcp` OpenAPI extension](../../content/api-docs/openapi-extensions/x-mcp.md)** - Review the extension properties and placement
- **[MCP configuration reference](../../config/mcp.md)** - Exclude API descriptions or hide the server
- **[Connect an AI client](./connect-ai-client.md)** - Connect a client and verify Docs MCP access
