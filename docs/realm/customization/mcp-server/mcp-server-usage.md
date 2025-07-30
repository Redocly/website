---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# MCP server usage

Your MCP server exposes tools for AI applications to search your documentation and interact with your APIs.

## Accessing MCP

Your MCP server is automatically generated and hosted at your documentation URL with the `/mcp` path.

## Using your MCP server

Users can use their preffered AI tools and connect them to MCP server.

1. Make sure your mcp server and configuration is enabled.
2. Users can copy your MCP server URL and add it to their tools.
3. By connecting to your MCP server, user can have standardized access to your openapi specifications.

### Cursor

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

2. Save the `mcp.json` file

#### Testing connection

Now in Cursor chat you can ask "What tools are available?" or "Give me a list of APIs?" (to retrieve list of APIs in your catalog). Cursor should have access to your catalog APIs.

### MCP server monitoring

You can view list of available MCP tools using any inspector or MCP client.

{% img src="./images/monitoring.png" alt="monitoring.png" withLightbox=true width="" height="" /%}
