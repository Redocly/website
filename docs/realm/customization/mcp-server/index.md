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

# Model Context Protocol server

Model Context Protocol (MCP) is a standard that enables applications to provide context to large language models (LLMs).
With MCP servers, AI assistants can retrieve additional information relevant to a user's query.

Realm provides built-in MCP server capabilities that expose your API Docs to AI assistants.

## Benefits

- **Real-time API guidance** — users receive accurate, contextual help about API endpoints and operations.
- **Secure API access** — AI assistants can make authenticated requests to act on behalf of a user.
- **Dynamic documentation** — AI assistants can extract and explain API reference content based on user needs.

## Docs MCP server

Use the Docs MCP server to explore and discover APIs in your project.
The server provides tools for browsing API definitions, exploring endpoints, and understanding API schemas.

### Key features

- Browse available APIs and their definitions.
- Explore API endpoints and operations.
- Access schema definitions and data models.
- Navigate API paths and their details.

### Connect an AI agent to the Docs MCP Server

After adding the option to the config file, the Docs is registered at your root URL under the `/mcp` path.
For example: `https://example.com/mcp`.

### Authentication

If your project requires login (`rbac` or `requiresLogin` configured), Docs MCP Server requires the user to authenticate using the configured method.
This requirement ensures that AI Agents can only access APIs and operations the authenticated user has permission to view.

### Available tools

#### Authentication tools

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

#### API discovery tools

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

- `get-full-api-description`
- `name: string`
- Returns the complete OpenAPI description.
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

## Connect an AI agent to the MCP server

The Docs MCP server is registered at your root URL under the `/mcp` path.

### Use the MCP server

Users can connect their preferred AI tools that support MCP (for example, Cursor, Claude Code and VS Code) to your MCP server.

1. Enable the MCP server in your [configuration](../../config/mcp.md).
2. Copy your MCP server URL and add it to your tool.

After connecting, the tool can access your OpenAPI documentation.

{% tabs %}
  {% tab label="Cursor" %}

#### Connect Cursor to the MCP server

1. In Cursor, open the command palette.
   - macOS: `Command + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
1. Type "Open MCP settings" in the command palette.
1. Select "Add custom MCP".

Cursor opens the `mcp.json` file.

#### Configure the MCP server

1. In `mcp.json`, add your server configuration:
```json
{
  "mcpServers": {
    "example-mcp": {
      "url": "https://example.com/mcp"
    }
  }
}
```

Optionally, you can also pass additional headers that will be sent with each request:

```json
{
  "mcpServers": {
    "example-mcp": {
      "url": "https://example.com/mcp",
      "headers": {
        "Authorization": "Basic MTIzOjEyMw=="
      }
    }
  }
}
```

1. Save the `mcp.json` file.

1. Return to MCP settings and confirm the connection.
   If authentication is required, select **Needs login** and complete the sign‑in flow.
   After connecting, Cursor displays the list of available tools.

#### Test the Cursor connection

In Cursor chat (Agent mode), ask a question that triggers an MCP tool.

  {% /tab %}

  {% tab label="Claude Code" %}

### Connect Claude Code to the MCP server

1. Run: `claude mcp add ${MCP_SERVER_NAME} ${URL} --transport http` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
1. In the Claude Code CLI, type `/mcp` and complete authentication if prompted.
1. Claude Code lists the available tools with descriptions and parameters.

#### Test the Claude Code connection

In the Claude Code CLI, ask the AI agent to perform an instruction that uses an MCP tool.

  {% /tab %}

   {% tab label="VS Code" %}

### Connect VS Code to the MCP server

1. In VS Code, open the command palette.
   - macOS: `Command + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
1. Type "MCP: Add Server" in the command palette.
1. Select "HTTP" to connect to a remote MCP server.
1. Enter the MCP server URL (for example, `https://example.com/mcp`).
1. Enter a name for the connection.

If the MCP server requires authentication, VS Code prompts you to open a sign‑in page.
Complete the sign‑in flow with your credentials.

#### Test the VS Code connection

Open Chat with AI in Agent mode and select the Tools icon.
Confirm that your MCP connection appears with a list of available tools.

Ask the AI to perform a query that uses an MCP tool.

  {% /tab %}
{% /tabs %}

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project