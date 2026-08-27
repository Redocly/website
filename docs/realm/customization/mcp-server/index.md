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
For the current MCP endpoint details, authentication semantics, server metadata, and tool schemas, see the [Docs MCP reference](./openapi.yaml).

## MCP server card

The MCP server card is a standardized JSON document that lets agents discover the Docs MCP server: its tools, transport endpoint, and capabilities.
The discovery is a single request that follows the Model Context Protocol server-card format.
It is available at `/.well-known/mcp/server-card.json` when the MCP server is enabled.

```http
GET https://example.com/.well-known/mcp/server-card.json
```

The following example response describes a login-protected server that also publishes skills:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
  "version": "1.0",
  "protocolVersion": "2025-06-18",
  "serverInfo": {
    "name": "Docs MCP server",
    "title": "Docs MCP server",
    "version": "2026-07-13"
  },
  "description": "Redocly Cafe documentation.",
  "documentationUrl": "https://example.com/",
  "transport": {
    "type": "streamable-http",
    "endpoint": "/mcp"
  },
  "capabilities": {
    "logging": {},
    "tools": { "listChanged": true },
    "resources": { "listChanged": true },
    "completions": {}
  },
  "authentication": {
    "required": true,
    "schemes": ["bearer", "oauth2"]
  },
  "tools": ["dynamic"]
}
```

The card lists the server's tools, declares its `/mcp` transport endpoint, and states its authentication requirements when the server requires login.
When your project publishes [agent skills](../agent-skills/index.md#skills-as-mcp-resources), the card's capabilities advertise resource support so agents know to list them.

## Restrict access to the MCP server

Control which teams can access the MCP server with the `rbac.features.mcp` option, the same way `rbac.features.aiSearch` controls access to AI search.

In the following example, only members of the Developers team can access the MCP server:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    features:
      mcp:
        Developers: read
```

When a team-based role is set for the `mcp` feature, only teams with a role other than `none` can access the MCP server.
Users must sign in unless the `anonymous` team is granted such a role, either directly or through the `*` wildcard.
The wildcard covers all teams that are not listed explicitly, including `anonymous`.
When the `anonymous` team has no access, requests without a valid token receive a `401` response.
Authenticated users who don't belong to an allowed team receive a `403` response.

For more details, see the [RBAC configuration reference](../../config/access/rbac.md#features-configuration).

## Connect an AI agent to the MCP server

After you enable the Docs MCP server in [configuration](../../config/mcp.md), it is available at `/mcp` on your project root URL.
For example: `https://example.com/mcp`.

### Use the MCP server

Users can connect their preferred AI tools that support MCP (for example, Cursor, Claude Code and VS Code) to your MCP server.

{% numbered-list %}
  {% numbered-item %}
  Enable the MCP server in your [configuration](../../config/mcp.md).
  {% /numbered-item %}
  {% numbered-item %}
  Copy your MCP server URL and add it to your tool.
  {% /numbered-item %}
{% /numbered-list %}

After connecting, the tool can access your OpenAPI documentation.

{% tabs %}
  {% tab label="Cursor" %}

#### Connect Cursor to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In Cursor, open the command palette.
- macOS: `Command + Shift + P`
- Windows/Linux: `Ctrl + Shift + P`
  {% /numbered-item %}
  {% numbered-item %}
  Type "Open MCP settings" in the command palette.
  {% /numbered-item %}
  {% numbered-item %}
  Select "Add custom MCP".
  {% /numbered-item %}
{% /numbered-list %}

Cursor opens the `mcp.json` file.

#### Configure the MCP server

{% numbered-list %}
  {% numbered-item %}
  In `mcp.json`, add your server configuration:

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
  {% /numbered-item %}
  {% numbered-item %}
  Save the `mcp.json` file.
  {% /numbered-item %}
  {% numbered-item %}
  Return to MCP settings and confirm the connection.
  If authentication is required, select **Needs login** and complete the sign‑in flow.
  After connecting, Cursor displays the list of available tools.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Cursor connection

In Cursor chat (Agent mode), ask a question that triggers an MCP tool.

  {% /tab %}

  {% tab label="Claude Code" %}

### Connect Claude Code to the MCP server

{% numbered-list %}
  {% numbered-item %}
  Run: `claude mcp add --transport http ${MCP_SERVER_NAME} ${URL}` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
  {% /numbered-item %}
  {% numbered-item %}
  In the Claude Code CLI, type `/mcp` and complete authentication if prompted.
  {% /numbered-item %}
  {% numbered-item %}
  Claude Code lists the available tools with descriptions and parameters.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Claude Code connection

In the Claude Code CLI, ask the AI agent to perform an instruction that uses an MCP tool.

  {% /tab %}

  {% tab label="Claude Desktop" %}

### Connect Claude Desktop to the MCP server

The Claude Desktop configuration file only launches stdio commands, so the entry connects to the remote server through the `mcp-remote` bridge.

{% numbered-list %}
  {% numbered-item %}
  In Claude Desktop, open **Settings → Developer → Edit Config**.
  {% /numbered-item %}
  {% numbered-item %}
  Add this entry to the configuration file:

  ```json
  {
    "mcpServers": {
      "example-mcp": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "https://example.com/mcp"]
      }
    }
  }
  ```
  {% /numbered-item %}
  {% numbered-item %}
  Restart Claude Desktop.
  {% /numbered-item %}
{% /numbered-list %}

If the MCP server requires authentication, `mcp-remote` opens a sign‑in page in your browser on the first connection.

#### Test the Claude Desktop connection

In a Claude Desktop chat, ask a question that uses an MCP tool.

  {% /tab %}

   {% tab label="VS Code" %}

### Connect VS Code to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In VS Code, open the command palette.
- macOS: `Command + Shift + P`
- Windows/Linux: `Ctrl + Shift + P`
  {% /numbered-item %}
  {% numbered-item %}
  Type "MCP: Add Server" in the command palette.
  {% /numbered-item %}
  {% numbered-item %}
  Select "HTTP" to connect to a remote MCP server.
  {% /numbered-item %}
  {% numbered-item %}
  Enter the MCP server URL (for example, `https://example.com/mcp`).
  {% /numbered-item %}
  {% numbered-item %}
  Enter a name for the connection.
  {% /numbered-item %}
{% /numbered-list %}

If the MCP server requires authentication, VS Code prompts you to open a sign‑in page.
Complete the sign‑in flow with your credentials.

#### Test the VS Code connection

Open Chat with AI in Agent mode and select the Tools icon.
Confirm that your MCP connection appears with a list of available tools.

Ask the AI to perform a query that uses an MCP tool.

  {% /tab %}

  {% tab label="Codex CLI" %}

### Connect Codex CLI to the MCP server

{% numbered-list %}
  {% numbered-item %}
  Run: `codex mcp add ${MCP_SERVER_NAME} --url ${URL}` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
  {% /numbered-item %}
  {% numbered-item %}
  If the MCP server requires authentication, run `codex mcp login ${MCP_SERVER_NAME}` and complete the sign‑in flow.
  {% /numbered-item %}
  {% numbered-item %}
  Run `codex mcp list` and confirm the server appears.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the Codex CLI connection

In the Codex CLI, ask the AI agent to perform an instruction that uses an MCP tool.

  {% /tab %}

  {% tab label="ChatGPT desktop app" %}

### Connect the ChatGPT desktop app to the MCP server

{% numbered-list %}
  {% numbered-item %}
  In the ChatGPT desktop app, go to **Settings → Plugins → MCPs**.
  {% /numbered-item %}
  {% numbered-item %}
  Add a server with the "Streamable HTTP" type and your MCP server URL (for example, `https://example.com/mcp`).
  {% /numbered-item %}
  {% numbered-item %}
  Restart the app.
  {% /numbered-item %}
{% /numbered-list %}

#### Test the ChatGPT connection

In a ChatGPT chat, ask a question that uses an MCP tool.

  {% /tab %}
{% /tabs %}

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project
- **[RBAC configuration reference](../../config/access/rbac.md)** - Restrict MCP server access to specific teams
- **[Agent skills](../agent-skills/index.md)** - Publish task-focused `SKILL.md` instructions and the discovery endpoints agents read to find them
