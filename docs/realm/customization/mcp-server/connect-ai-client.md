---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Connect an MCP-compatible AI client to the Docs MCP server.
---

# Connect an AI client to Docs MCP

Connect an MCP-compatible AI client to your project so it can search documentation and inspect published API descriptions.

## Before you begin

Make sure you have the following:

- A deployed project with the Docs MCP server available
- An MCP-compatible client
- Permission to access the project content you want to use
- The public URL of the project, including any path prefix

## Determine the server URL

Append `/mcp` to the project URL.

For example:

```text
https://docs.example.com/mcp
```

For a project published under a path prefix, include the prefix:

```text
https://example.com/developer/mcp
```

Do not use the upstream API server URL from an OpenAPI description.
The MCP client connects to the documentation project.

## Add the server to your client

Use the instructions for your MCP client.

{% tabs %}
  {% tab label="Cursor" %}

Add the server to a project-level `.cursor/mcp.json` file or to your global Cursor MCP configuration:

```json {% title=".cursor/mcp.json" %}
{
  "mcpServers": {
    "project-docs": {
      "url": "https://docs.example.com/mcp"
    }
  }
}
```

Save the file, then open Cursor's MCP settings and confirm that `project-docs` is connected.
If Cursor indicates that login is required, start the authentication flow and sign in to the project in your browser.

See [Cursor's MCP documentation](https://docs.cursor.com/en/tools/mcp) for configuration locations and client-specific troubleshooting.

  {% /tab %}
  {% tab label="Claude Code" %}

Add the remote HTTP server from a terminal:

```bash
claude mcp add --transport http project-docs https://docs.example.com/mcp
```

In Claude Code, run `/mcp` to inspect the connection.
If authentication is required, select the server and complete the browser sign-in flow.

See [Claude Code's MCP documentation](https://code.claude.com/docs/en/mcp) for scopes and additional connection options.

  {% /tab %}
  {% tab label="Visual Studio Code" %}

Add the server to `.vscode/mcp.json` in your workspace:

```json {% title=".vscode/mcp.json" %}
{
  "servers": {
    "projectDocs": {
      "type": "http",
      "url": "https://docs.example.com/mcp"
    }
  }
}
```

Open the Command Palette and run **MCP: List Servers**.
Start the server and confirm that you trust it when prompted.
If the project requires authentication, complete the browser sign-in flow.

See [Visual Studio Code's MCP documentation](https://code.visualstudio.com/docs/agent-customization/mcp-servers) for user-level configuration and troubleshooting.

  {% /tab %}
{% /tabs %}

## Verify the connection

Ask the AI client a question that requires project documentation, for example:

```text
Which APIs are documented in this project, and what does each API do?
```

Then ask it to inspect a specific operation:

```text
Find the operation for creating an order and summarize its required request fields.
```

A successful response should use the content available through the Docs MCP server rather than relying only on the model's general knowledge.

The exact tool names displayed by the client may vary.
The client discovers the available interface when it connects.

## Troubleshoot the connection

If the client cannot connect:

- Confirm that the URL includes the complete project path and ends in `/mcp`.
- Open the project in a browser and confirm that the current user can access it.
- Check whether `mcp.hide` or `mcp.docs.hide` disables the server.
- Check the `access.rbac.features.mcp` roles if the response is `401` or `403`.
- Restart or reconnect the MCP server from the client after changing project configuration.

## Resources

- **[Docs MCP server](./index.md)** - Understand the server capabilities and content access model
- **[Allow AI clients to call APIs](./allow-api-requests.md)** - Make selected OpenAPI server hosts available for requests
- **[MCP configuration reference](../../config/mcp.md)** - Configure the server and exclude content
- **[RBAC configuration reference](../../config/access/rbac.md)** - Configure access to project content and features
