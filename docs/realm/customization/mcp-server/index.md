---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# MCP Server

Model Context Protocol is a standard to simplify how applications can provide context to large language models (LLMs).

It enables LLMs to use external tools & services, with MCP servers exposing your data to AI and MCP clients allowing access to that data.

With Realm you can setup your MCP Server and expose API Catalog directly to AI and MCP clients.

## Common use cases

By exposing your OpenAPI spec via MCP server, AI can:

- **Make Authenticated requests** - With proper authentication, AI can execute requests and gather data based on the access provided by OAuth2 Provider.
- **Real-time API guidance** - Users can ask AI on how to use specific endpoints, how to perform an action and even extract API reference based on your request.

## Reference documentation

To reference the documentation for MCP Server, see:
- [MCP server usage](./mcp-server-usage.md) for MCP server methods and usage.
- [MCP server authentication](./mcp-server-authentication.md) to get familiar with authentication.
- List of [avalable catalog tools](./catalog-tools.md).
- View full configuration details in the `mcp` [configuration reference](../../config/mcp.md).