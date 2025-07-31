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

Configure the MCP server in your Redocly-powered API documentation using `mcp`. The MCP server allows users to:

- Integrate with powerful AI tools.
- Redocly generates an MCP server from your documentation and OpenAPI specifications, preparing your content for the broader AI ecosystem where any MCP client (like Claude, Cursor, Goose, and others) can connect to your documentation and APIs.

By default, the MCP server is enabled for your project.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the MCP server globally. When set to `true`, all MCP functionality is hidden from the UI.
  Default: `false`.

---

- catalog
- [Catalog](#catalog-object)
- Catalog-specific configuration options.

---

- api
- [API](#api-object)
- API-specific configuration options.

---

- ignore
- [string]
- Array of patterns or identifiers to ignore in the MCP server.
  Default: `[]`.

{% /table %}

### Catalog object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the catalog functionality of the MCP server.
  Default: `false`.

---

- name
- string
- Set a custom name for the Catalog MCP server as it appears in the UI.
  Default: `'Catalog MCP server'`.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the API functionality of the MCP server. When set to `true`, the API features will be hidden while keeping other MCP features accessible.
  Default: `false`.

{% /table %}

## Examples

```yaml
# Global MCP settings
hide: false
# Catalog settings
catalog:
  hide: false
  name: My Custom MCP Catalog
# API settings
api:
  hide: false
# Ignored patterns
ignore:
  - internal-api
  - test-endpoints
```

## Default Configuration

```yaml
hide: false
catalog:
  hide: false
  name: Catalog MCP server
api:
  hide: false
ignore: []
```

## Resources

- [MCP servers overview](../customization/mcp-server/index.md)
- [MCP servers usage](../customization/mcp-server/usage.md)