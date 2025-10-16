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


# Docs MCP server

Use the Docs MCP server to explore and discover APIs in your project.
The server provides tools for browsing API definitions, exploring endpoints, and understanding API schemas.

## Enable the Docs MCP server

By default, the Docs MCP server is enabled for your project.
You can verify or configure it in your [MCP configuration](../../config/mcp.md).

After enabling, the Docs MCP server is registered at your root URL under the `/mcp` path.
For example: `https://example.com/mcp`.

## Authentication

If your project requires login (`rbac` or `requiresLogin` configured), the Docs MCP server requires users to authenticate using the configured method.
This requirement ensures that AI agents can only access APIs and operations the authenticated user has permission to view.

## Available tools

The Docs MCP server provides several categories of tools for AI assistants.

### Authentication tools

{% table %}

- Tool
- Parameters
- Description

---

- `whoami`
- `-`
- Returns information about the authenticated user.

---

{% /table %}

### API discovery tools

{% table %}

- Tool
- Parameters
- Description

---

- `list-apis`
- `name?: string`
- Lists available APIs with their context and purpose.
  Optionally filter by name.

---

- `get-endpoints`
- `name: string`
- Returns all endpoints and their descriptions for a specific API.

---

- `get-endpoint-info`
- `name: string`<br>`path: string`<br>`method: string`
- Returns comprehensive information about a specific endpoint, including parameters, security, and examples.

---

- `get-security-schemes`
- `name: string`
- Gets the security schemes for a specific API.

---

- `get-full-definition`
- `name: string`
- Returns the complete OpenAPI definition for an API.

{% /table %}

### Search tools

{% table %}

- Tool
- Parameters
- Description

---

- `search`
- `query: string`
- Searches across documentation and returns relevant content for a query.

{% /table %}

## Resources

- **[MCP server overview](./index.md)** - Learn about MCP servers and how to connect AI agents
- **[Gateway MCP server](./gateway-mcp.md)** - Enable AI assistants to make direct API requests
- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project