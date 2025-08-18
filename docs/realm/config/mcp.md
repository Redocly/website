---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `mcp`

Redocly automatically generates Model Context Protocol (MCP) servers from your documentation and OpenAPI descriptions.
MCP servers make your content accessible to AI tools in the MCP ecosystem (such as ChatGPT, Claude, Cursor, Goose).

By default, only [Docs MCP server](../customization/mcp-server/docs-mcp.md) is enabled, but you can enable [Gateway MCP server](../customization/mcp-server/gateway-mcp.md) using `mcp` configuration.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the MCP server globally. When set to `true`, all MCP functionality is disabled.
  Default: `false`.

---

- docs
- [Docs object](#docs-object)
- Docs MCP configuration options.

---

- gateway
- [Gateway object](#gateway-object)
- Gateway MCP configuration options.

---

- ignore
- [string]
- Array of patterns or identifiers to ignore in the MCP server.
  Default: `[]`.

{% /table %}

### Docs object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide  Hide API MCP while keeping other MCP features (Gateway MCP) accessible.
  Default: `false`.

---

- name
- string
- Set the name displayed to MCP clients during the initial connection.
  Default: `"Docs MCP server"`.

{% /table %}

### Gateway object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide Gateway MCP while keeping other MCP features (Docs MCP) accessible.
  Default: `true`.

{% /table %}

## Examples

```yaml
# Global settings
mcp:
  hide: false
  # Docs MCP settings
  docs:
    hide: false
    name: My Custom Docs MCP Server
  # Gateway MCP settings
  gateway:
    hide: false
  # Ignored patterns
  ignore:
    - openapi-files/**
    - test-endpoints
```

## Default configuration

```yaml
mcp:
  hide: false
  docs:
    hide: false
    name: Docs MCP server
  gateway:
    hide: true
  ignore: []
```

## Resources

- **[MCP servers overview](../customization/mcp-server/index.md)** - Learn how you can configure MCP servers and integrate with third-party services.
- **[Docs MCP server](../customization/mcp-server/docs-mcp.md)** - Use the Docs MCP server to explore and discover APIs in your project.
- **[Gateway MCP server](../customization/mcp-server/gateway-mcp.md)** - Use the Gateway MCP server for direct interaction with your APIs
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
