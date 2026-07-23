---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Connect Cursor, Claude Code, VS Code, or another MCP client to your project's Docs MCP server.
---

# Connect an AI agent to the MCP server

The Docs MCP server is available at `/mcp` on your project root URL.
For example: `https://example.com/mcp`.
If your project is deployed under a path prefix, include the prefix: `https://example.com/my-prefix/mcp`.

Connect any MCP-capable AI tool to that URL to give it access to your documentation.
One connection covers everything the server offers — documentation discovery, search, and, when the project has it turned on, [API calling](./call-apis-with-ai-agents.md).

## Before you begin

Make sure you have the following before you begin:

- a project on an Enterprise or Enterprise+ plan with the Docs MCP server enabled (it is enabled by default)
- your MCP server URL: the project root URL plus `/mcp`

## Connect your AI tool

{% tabs %}
  {% tab label="Cursor" %}

1. In Cursor, open the command palette.
   - macOS: `Command + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
1. Type **Open MCP settings** in the command palette.
1. Select **Add custom MCP**.
   Cursor opens the `mcp.json` file.
1. In `mcp.json`, add your server configuration:

   ```json
   {
     "mcpServers": {
       "example-docs": {
         "url": "https://example.com/mcp"
       }
     }
   }
   ```

1. Save the `mcp.json` file.
1. Return to MCP settings and confirm the connection.
   If your project requires login, select **Needs login** and complete the sign-in flow in the browser.
   After connecting, Cursor displays the list of available tools.

To test the connection, ask a question in Cursor chat (Agent mode) that triggers an MCP tool.

  {% /tab %}

  {% tab label="Claude Code" %}

1. Run: `claude mcp add ${MCP_SERVER_NAME} ${URL} --transport http` where `${MCP_SERVER_NAME}` is your desired server name and `${URL}` is the MCP server URL.
1. In the Claude Code CLI, type `/mcp` and complete authentication if prompted.
   Claude Code lists the available tools with descriptions and parameters.

To test the connection, ask Claude Code to perform an instruction that uses an MCP tool.

  {% /tab %}

  {% tab label="VS Code" %}

1. In VS Code, open the command palette.
   - macOS: `Command + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
1. Type **MCP: Add Server** in the command palette.
1. Select **HTTP** to connect to a remote MCP server.
1. Enter the MCP server URL (for example, `https://example.com/mcp`).
1. Enter a name for the connection.
   If your project requires login, VS Code prompts you to open a sign-in page.
   Complete the sign-in flow with your credentials.

To test the connection, open Chat in Agent mode, select the **Tools** icon, and confirm that your MCP connection is displayed with a list of available tools.

  {% /tab %}
{% /tabs %}

Projects also offer built-in ways to share the connection with documentation readers:

- When [API calling](./call-apis-with-ai-agents.md) is turned on, eligible API docs pages advertise the MCP endpoint with a Connect button that deep-links into Cursor or VS Code, or copies the configuration.
- You can place the same button anywhere with the [Connect MCP Markdoc tag](../../content/markdoc-tags/connect-mcp.md).
- Opening the MCP server URL in a browser shows a setup page with the same connection options.

## Authenticate to the server

Public projects accept MCP connections without authentication.
If your project uses `requiresLogin` or restrictive RBAC, the MCP client runs a standard OAuth 2.0 sign-in flow the first time it connects — no tokens or headers to configure by hand.
After sign-in, the agent sees only the APIs and content the signed-in user is permitted to view.

## Verify the connection

Ask the connected agent to list its available tools:

- In the default `tools` variant, expect the documentation tools, such as `list-apis`, `get-endpoints`, and `search`.
- In the `codemode` variant, expect exactly two tools: `execute` and `describe-tools`.

For the difference between the variants, review [Server variants](./index.md#server-variants).

## Related how-tos

- [Let AI agents call your APIs](./call-apis-with-ai-agents.md)

## Resources

- **[Model Context Protocol server](./index.md)** - What the Docs MCP server exposes and how it protects your content
- **[MCP configuration reference](../../config/mcp.md)** - All `mcp` configuration options, including server variants and API calling
- **[Docs MCP reference](./openapi.yaml)** - Structured reference for the server's tools, schemas, and authentication metadata
- **[Connect MCP Markdoc tag](../../content/markdoc-tags/connect-mcp.md)** - Add a Connect MCP button anywhere in your documentation
