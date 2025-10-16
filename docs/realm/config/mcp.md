---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---

# `mcp`

Redocly automatically generates Model Context Protocol (MCP) servers from your documentation and OpenAPI descriptions.
MCP servers make your content accessible to AI tools in the MCP ecosystem (such as ChatGPT, Claude, Cursor, Goose).

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

- gateway
- [Gateway object](#gateway-object)
- Gateway MCP configuration options.

{% /table %}

### Docs object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide Docs MCP while keeping other MCP features (Gateway MCP) accessible.
  Default: `false`.

---

- name
- string
- Set the name displayed to MCP clients during the initial connection.
  Default: `"Docs MCP server"`.

---

- ignore
- [string]
- List of patterns or identifiers to ignore in the Docs MCP server.
  Default: `[]`.

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

---

- ignore
- [string]
- List of patterns or identifiers to ignore in the Gateway MCP server.
  Default: `[]`.

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
    ignore:
      - internal-api
      - deprecated-endpoints
  # Gateway MCP settings
  gateway:
    hide: false
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
  gateway:
    hide: true
    ignore: []
```

## Resources

- **[MCP servers overview](../customization/mcp-server/index.md)** - Configure MCP servers and integrate with third-party services
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
