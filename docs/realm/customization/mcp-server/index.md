---
products:
  - Realm
  - Revel
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

## Docs MCP

- [Docs MCP server](./docs-mcp.md) — provides API exploration and discovery capabilities for APIs listed in your project.

By default, Docs MCP server is enabled for your project.

## Connect an AI agent to the MCP server

The Docs MCP server is registered at your root URL under the `/mcp` path.

### Use the MCP server

Users can connect their preferred AI tools that support MCP (for example, Cursor, Claude Code and VS Code) to your MCP server.

1. Enable the MCP server in your [configuration](../../config/mcp.md).
1. Copy your MCP server URL and add it to your tool.

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

- **[Docs MCP server](./docs-mcp.md)** - Use the Docs MCP server to explore and discover APIs in your API Docs
- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project