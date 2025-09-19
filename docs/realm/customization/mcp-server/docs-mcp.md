---
products:
  - Realm
  - Revel
plans:
  - Enterprise
  - Enterprise+
---

# Docs MCP server

Use the Docs MCP server to explore and discover APIs in your project.
The server provides tools for browsing API definitions, exploring endpoints, and understanding API schemas.

## Key features

- Browse available APIs and their definitions.
- Explore API endpoints and operations.
- Access schema definitions and data models.
- Navigate API paths and their details.

## Connect an AI agent to the Docs MCP Server

Make sure Docs MCP option is enabled in your config.
After adding the option to the config file, the Docs is registered at your root URL under the `/mcp` path.
For example: `https://example.com/mcp`.

## Authentication

If your project requires login (`rbac` or `requiresLogin` configured), Docs MCP Server requires the user to authenticate using the configured method.
This requirement ensures that AI Agents can only access APIs and operations the authenticated user has permission to view.

## Available tools

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
- `name: string`<br>`path: string`<br>`method: string`
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
- Searches documentation and returns relevant content for a query.

{% /table %}


## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure Model Context Protocol for your project