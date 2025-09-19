---
products:
  - Realm
  - Revel
plans:
  - Enterprise
  - Enterprise+
---
# `mcp`

Redocly automatically generates Model Context Protocol (MCP) servers from your documentation and OpenAPI descriptions.
MCP servers make your content accessible to AI tools in the MCP ecosystem (such as ChatGPT, Claude, Cursor, Goose).

[Docs MCP server](../customization/mcp-server/docs-mcp.md) is enabled by default.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the MCP server globally.
  When set to `true`, all MCP functionality is disabled.
  Default: `false`.

---

- docs
- [Docs object](#docs-object)
- Docs MCP configuration options.

---

- ignore
- [string]
- List of patterns or identifiers to ignore in the MCP server.
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
- Hide  Hide Docs MCP.
  Default: `false`.

---

- name
- string
- Set the name displayed to MCP clients during the initial connection.
  Default: `"Docs MCP server"`.

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
```

With configuration you can ignore specific files and filename patterns that will not be seen inside of the MCP server:

```yaml
# Global settings
mcp:
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
  ignore: []
```

## Resources

- **[MCP servers overview](../customization/mcp-server/index.md)** - Learn how you can configure MCP servers and integrate with third-party services
- **[Docs MCP server](../customization/mcp-server/docs-mcp.md)** - Use the Docs MCP server to explore and discover APIs in your project
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization