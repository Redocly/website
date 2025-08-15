---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# Gateway MCP server

Use the Gateway MCP server to interact with your APIs directly. The server generates tools so AI assistants can make API requests based on natural language instructions.

## How to connect

Gateway MCP is disabled by default, make sure you enabled it in your [configuration](../../config/mcp.md).

Once enabled, the Gateway MCP server is registered for each publicly accessible API (not restricted by `rbac` settings and not excluded by the `ignore` list in your `mcp` configuration).
Each Gateway MCP server is available at the same URL as your API reference, with `/mcp` appended.
For example: `https://example.com/apis/museum-api/mcp`.

## Tool generation

The Gateway MCP server automatically generates tools from your OpenAPI definitions.
Each API endpoint becomes a tool that AI assistants can use to make requests.


## Tool generation process

1. **OpenAPI parsing** — The server parses your OpenAPI definition files.
2. **Endpoint analysis** — Each API endpoint is analyzed for:
   - HTTP method
   - Path parameters
   - Query parameters
   - Request body schema
   - Response schemas
3. **Tool creation** — A tool is generated for each unique endpoint.
4. **Parameter mapping** — OpenAPI parameters are mapped to tool parameters.

## Generated tool structure

Each generated tool follows this format:

{% table %}
- Property
- Type
- Description
---
- name
- string
- Tool name generated from the operation ID or endpoint path.
---
- parameters
- [Parameter object]
- Tool parameters mapped from OpenAPI parameters for that specific endpoint such as path or query parameters, request body, etc.
{% /table %}

## Parameter mapping

OpenAPI parameters are mapped to tool parameters as follows:

{% table %}
- OpenAPI parameter
- Tool parameter
- Example
---
- Path parameter
- Required string
- `{id}` → `id: string`.
---
- Query parameter
- Required or optional parameter (based on schema)
- `?filter` with `required: true` → `filter: string`; otherwise `filter?: string`.
---
- Request body
- Object parameter (required based on schema)
- `requestBody.required: true` → `body: object`; otherwise `body?: object`.
{% /table %}

### Additional parameters

Some parameters are added by the Gateway MCP server to every generated tool:

{% table %}
- Parameter
- Type
- Description
---
- header
- Map[string, string]
- Optional. Additional HTTP headers to include with the request.
---
- serverUrl
- string
- Optional. Server base URL to use for the request. Present only when the OpenAPI document defines more than one server URL.
{% /table %}

### Utility tools

{% table %}
- Tool
- Parameters
- Description
---
- `get-server-urls`
- `-`
- Returns the list of server URLs defined in the OpenAPI document. Present only when the OpenAPI document defines more than one server URL.
{% /table %}

## Example tool generation

Consider this OpenAPI endpoint:

```yaml
/users/{id}:
  get:
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
      - name: include
        in: query
        schema:
          type: string
    responses:
      200:
        description: User details
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
```

The generated tool will be passed to MCP Client in a form of JSON schema:

```json
{
  "name": "get_user_by_id",
  "method": "GET",
  "parameters": {
    "id": {
      "type": "string",
      "required": true
    },
    "include": {
      "type": "string",
      "required": false
    }
  },
}
```

## Best practices

- Use descriptive OpenAPI operation IDs for better tool names.
- Document parameters thoroughly in your OpenAPI spec.
- Use proper response schemas for accurate response handling.
- Keep endpoint paths consistent and RESTful.
- Use standard HTTP methods appropriately.

## Resources

- **[MCP configuration reference](../../config/mcp.md)** - Configure MCP for your project
- **[Docs MCP server](./docs-mcp.md)** - Use the Docs MCP server to explore and discover APIs in your project.
