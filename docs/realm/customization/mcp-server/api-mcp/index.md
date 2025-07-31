---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# API MCP server

The API MCP server enables AI assistants to interact with your APIs directly. It provides tools for making authenticated API requests and accessing OpenAPI definitions.

## Key features

- Make authenticated API requests
- Access OpenAPI definitions
- Execute API operations securely
- Handle API responses

## Authentication

The API MCP server uses OAuth2 authentication to ensure secure API access. AI assistants can only execute operations that the authenticated user has permission to perform.

For authentication setup details, see [MCP server authentication](../mcp-server-authentication.md).

## Tool generation

The API MCP server automatically generates tools based on your OpenAPI definitions. Each API endpoint becomes a tool that AI assistants can use to make requests.

For details about tool generation and usage, see [API tools](./tools.md).

## Next steps

- Learn about [API tool generation](./tools.md)
- Set up [MCP server authentication](../mcp-server-authentication.md)
- View the [MCP configuration reference](../../../config/mcp.md)