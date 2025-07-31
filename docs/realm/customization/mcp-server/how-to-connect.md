---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# How to connect your AI Agent to MCP Server

- Catalog MCP Server is registered and hosted at your root URL under the `/mcp` path.
- API MCP Servers are registered for each API documentation and is available under the same URL as your API Reference + `/mcp` (F.e. `https://example.com/apis/museum-api/mcp`)

## Using MCP server

Users can use their preferred AI tools that serve MCP client (Cursor, Claude Code, etc.) and connect them to MCP server.

1. Make sure your MCP server is enabled in configuration.
2. Users can copy your MCP server URL and add it to their tools.
3. By connecting to your MCP server, users can have standardized access to your OpenAPI documentation.

{% tabs %}
  {% tab label="Cursor" %}

#### MCP settings

1. Open the command palette:
   - macOS: `Command + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`

2. Type "Open MCP settings" in the command palette

3. Select "Add custom MCP"
   - This will open the `mcp.json` file

#### Configuring MCP server

1. In the `mcp.json` file, add your server configuration:
```json
{
  "mcpServers": {
    "example-mcp": {
      "url": "https://example.com/mcp",
      "transport": "http"
    }
  }
}
```

You can also pass additional headers that will be sent with each request:

```json
{
  "mcpServers": {
    "example-mcp": {
      "url": "https://example.com/mcp",
      "transport": "http",
      "headers": {
        "Authorization": "Basic MTIzOjEyMw=="
      }
    }
  }
}
```

2. Save the `mcp.json` file

#### Testing connection

Now in Cursor chat you can ask "What tools are available?" or "Give me a list of APIs?" (to retrieve list of APIs in your catalog). Cursor should have access to your catalog APIs.

  {% /tab %}
  {% tab label="Claude" %}
#### Claude settings

1. Add your MCP server to Claude
   - Navigate to the Connectors page in the Claude settings.
   - Select "Add custom connector".
   - Add your MCP server name and `URL`.
   - Select "Add".

2. Access your MCP server in your chat
   - When using Claude, select the attachments button.
   - Select your MCP server.
   - Query Claude with your MCP server as context.

#### Testing connection

Now in Claude chat you can ask "What tools are available?". Claude should now have access to your catalog APIs.

  {% /tab %}
{% /tabs %}


### MCP server monitoring

You can view list of available MCP tools using any MCP inspector.

{% img src="./images/monitoring.png" alt="monitoring.png" withLightbox=true width="" height="" /%}
