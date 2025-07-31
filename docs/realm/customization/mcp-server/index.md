---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Model Context Protocol server

Model Context Protocol (MCP) is a standard that enables applications to provide context to large language models (LLMs). MCP servers expose your data to AI assistants, while MCP clients consume that data.

Realm provides built-in MCP server capabilities that expose your API catalog directly to AI assistants.

## Benefits

- **Secure API access** - AI assistants can make authenticated requests to act on your behalf.
- **Real-time API guidance** - Users receive accurate, contextual help about API endpoints and operations
- **Dynamic documentation** - AI assistants can extract and explain API reference content based on user needs

## Available MCP servers

Realm includes two types of MCP servers:

- [Catalog MCP server](./catalog-mcp/index.md) - Provides API catalog exploration and discovery capabilities
- [API MCP server](./api-mcp/index.md) - Exposes OpenAPI definitions and enables AI assistants to make authenticated API requests

## Next steps

- Learn about [API MCP server](./api-mcp/index.md) capabilities
- Explore [Catalog MCP server](./catalog-mcp/index.md) features
- View the [MCP configuration reference](../../config/mcp.md)