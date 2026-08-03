---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Configure the Docs MCP server and exclude API descriptions from its catalog.
---

# `mcp`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use `mcp` to hide the Docs MCP server, change the name displayed to MCP clients, or exclude API descriptions from its catalog.
The configuration controls an available Docs MCP server; it does not enable a separate MCP service or API-request product.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides all MCP functionality for the project when set to `true`.
  Default: `false`.

---

- docs
- [Docs object](#docs-object)
- Configures the Docs MCP server.

{% /table %}

### Docs object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the Docs MCP server when set to `true`.
  Default: `false`.

---

- name
- string
- Sets the server name displayed to MCP clients when they connect.
  Default: `"Docs MCP server"`.

---

- ignore
- [string]
- Excludes API descriptions whose project-relative paths match the specified glob patterns.
  Excluded descriptions are unavailable to every MCP user.
  Default: `[]`.

{% /table %}

## Examples

### Change the server name

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    name: Acme developer docs
```

### Exclude API descriptions

Exclude API descriptions by their project-relative paths:

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    ignore:
      - apis/internal/**
      - apis/legacy/openapi.yaml
```

Use forward slashes in patterns, including on Windows.

### Hide the Docs MCP server

```yaml {% title="redocly.yaml" %}
mcp:
  docs:
    hide: true
```

Set the top-level `mcp.hide` option instead when you need to disable all MCP functionality for the project.

## Default configuration

```yaml {% title="redocly.yaml" %}
mcp:
  hide: false
  docs:
    hide: false
    name: Docs MCP server
    ignore: []
```

## Access control

The `hide` and `ignore` options remove the server or matching descriptions for every client.
They do not provide user-specific access control.

Use RBAC to control which users can access the `/mcp` endpoint and its content:

- Configure `access.rbac.features.mcp` to restrict the entire endpoint.
- Configure content RBAC to restrict individual pages and API descriptions.

The Docs MCP server applies the same content permissions as the published project.
See [RBAC feature configuration](./access/rbac.md#features-configuration) for details.

## Resources

- **[Docs MCP server](../customization/mcp-server/index.md)** - Understand the capabilities and access model
- **[Connect an AI client](../customization/mcp-server/connect-ai-client.md)** - Add the server to a supported MCP client
- **[Allow AI clients to call APIs](../customization/mcp-server/allow-api-requests.md)** - Configure per-description API request eligibility
- **[`x-mcp` OpenAPI extension](../content/api-docs/openapi-extensions/x-mcp.md)** - Configure MCP metadata in an OpenAPI description
