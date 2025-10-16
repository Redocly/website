# OpenAPI extension: `x-mcpConfig`

Use `x-mcpConfig` to control which API definitions or specific operations are exposed in the Docs MCP server and Gateway MCP server.
This extension allows fine-grained control over what content is accessible to AI assistants through MCP servers.

## Location

Apply `x-mcpConfig` at two levels:

- **Info level**: controls whether the entire API definition is exposed in MCP servers
- **Operation level**: controls whether specific operations are exposed in MCP servers

## Options

{% table %}

- Option
- Type
- Description

---

- x-mcpConfig
- [MCP Config object](#mcp-config-object)
- Configuration for controlling MCP server exposure.

{% /table %}

### MCP Config object

{% table %}

- Option
- Type
- Description

---

- docs
- [Docs Config object](#docs-config-object)
- Controls whether content is exposed in the Docs MCP server.

---

- gateway
- [Gateway Config object](#gateway-config-object)
- Controls whether content is exposed in the Gateway MCP server.

{% /table %}

### Docs Config object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- When set to `true`, excludes the API definition or operation from the Docs MCP server.
  Default is `false`.

{% /table %}

### Gateway Config object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- When set to `true`, excludes the API definition or operation from the Gateway MCP server.
  Default is `false`.

---

- ignoreAllOperation
- boolean
- When set to `true` at the info level, excludes all operations from the Gateway MCP server by default.
  Individual operations can still be exposed by setting `hide: false` at the operation level.
  Default is `true`.

{% /table %}

## Examples

### Hide entire API from Docs MCP server

The following example excludes the entire API definition from the Docs MCP server while keeping it available in the Gateway MCP server:

```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: Internal API
  description: This API is hidden from Docs MCP but available through Gateway MCP
  x-mcpConfig:
    docs:
      hide: true
    gateway:
      hide: false
paths:
  /users:
    get:
      summary: Get users
      operationId: getUsers
      # ...
```

### Hide specific operation from Gateway MCP server

The following example hides a specific operation from the Gateway MCP server while keeping it available in the Docs MCP server:

```yaml
paths:
  /admin/delete-all:
    delete:
      summary: Delete all data
      description: Dangerous operation that should not be exposed to AI assistants
      operationId: deleteAllData
      x-mcpConfig:
        docs:
          hide: false
        gateway:
          hide: true
      responses:
        '204':
          description: All data deleted successfully
```

### Enable all operations in Gateway MCP server

By default, all operations are hidden from the Gateway MCP server (`ignoreAllOperation: true`). To expose all operations:

```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: Public API
  description: This API has all operations available in Gateway MCP
  x-mcpConfig:
    gateway:
      ignoreAllOperation: false
paths:
  /users:
    get:
      summary: Get users
      operationId: getUsers
      # This operation is now available in Gateway MCP
```

### Selectively expose operations when ignoreAllOperation is true

When `ignoreAllOperation: true` (default), you can expose specific operations:

```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: Selective API
  x-mcpConfig:
    gateway:
      ignoreAllOperation: true  # Hide all operations by default
paths:
  /users:
    get:
      summary: Get users
      operationId: getUsers
      x-mcpConfig:
        gateway:
          hide: false  # Expose this specific operation
```

## Resources

- **[MCP server overview](../../../customization/mcp-server/index.md)** - Learn about MCP servers and how to connect AI agents
- **[Docs MCP server](../../../customization/mcp-server/docs-mcp.md)** - Explore and discover APIs in your project
- **[Gateway MCP server](../../../customization/mcp-server/gateway-mcp.md)** - Enable AI assistants to make direct API requests
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly
