---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Catalog tools

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
- `sessionId?: string` <br> `name?: string`
- Lists available APIs with their context and purpose

---

- `get-endpoints`
- `sessionId?: string`<br>`name: string`
- Get all endpoints and their description for a specific API

---

- `get-endpoint-info`
- `sessionId?: string`<br>`name: string`<br>`path: string`<br>`method: string`
- Get comprehensive information about specific endpoint including parameters, security, and examples

---

- `get-security-schemes`
- `sessionId?: string`<br>`name: string`<br>`path: string`<br>`method: string`
-  Get the security schemes for a specific API

---

- `get-full-definition`
- `sessionId?: string`<br>`name: string`
- Get the complete OpenAPI definition for an API
  
{% /table %}

## Search tools

{% table %}

- Tool
- Parameters
- Description

---

- `search`
- `sessionId?: string`<br>`query: string`
- Search across the documentation to fetch relevant content for a given query

{% /table %}

## References

To reference the documentation for MCP Server, see:
- [MCP server usage](../usage.md) for a guide on how to connect to MCP server.
- [MCP server authentication](./authentication.md) to get familiar with authentication.
- View full configuration details in the `mcp` [configuration reference](../../../config/mcp.md).