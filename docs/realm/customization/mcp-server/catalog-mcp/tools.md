---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Catalog MCP tools

Here you can find the full available list of MCP server catalog tools.

## Authentication Tools

{% table %}

- Tool
- Parameters
- Description

---

- `auth_initiate_login`
- `-`
- Initiates the authentication process

---

- `auth_check_status`
- `sessionId?: string`
- Checks authentication status

{% /table %}

## API Discovery Tools

{% table %}

- Tool
- Parameters
- Description

---

- `list-apis`
- `sessionId?: string`<br>`name?: string`
- Lists available APIs

---

- `get-endpoints`
- `sessionId?: string`<br>`name: string`
- Gets API endpoints

---

- `get-endpoint-info`
- `sessionId?: string`<br>`name: string`<br>`path: string`<br>`method: string`
- Gets endpoint details

{% /table %}

## Definition Tools

{% table %}

- Tool
- Parameters
- Description

---

- `get-definitions-info`
- `sessionId?: string`
- Gets API definitions info

---

- `get-full-definition`
- `sessionId?: string`<br>`name: string`
- Gets complete OpenAPI spec

{% /table %}

## Schema Tools

{% table %}

- Tool
- Parameters
- Description

---

- `get-schemas`
- `sessionId?: string`<br>`name: string`
- Gets all API schemas

---

- `get-schema`
- `sessionId?: string`<br>`name: string`<br>`schemaName: string`
- Gets specific schema

{% /table %}

## Path Tools

{% table %}

- Tool
- Parameters
- Description

---

- `get-paths`
- `sessionId?: string`<br>`name: string`
- Gets all API paths

---

- `get-path-info`
- `sessionId?: string`<br>`name: string`<br>`path: string`
- Gets path details

{% /table %}

## References

To reference the documentation for MCP Server, see:
- [MCP server usage](../mcp-server-usage.md) for MCP server methods and usage.
- [MCP server authentication](../mcp-server-authentication.md) to get familiar with authentication.
- View full configuration details in the `mcp` [configuration reference](../../../config/mcp.md).