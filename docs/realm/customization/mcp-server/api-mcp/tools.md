---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# API tool generation

The API MCP server automatically generates tools based on your OpenAPI definitions. This page explains how tools are generated and how to use them effectively.

## Tool generation process

1. **OpenAPI parsing** - The server parses your OpenAPI definition files
2. **Endpoint analysis** - Each API endpoint is analyzed for:
   - HTTP method
   - Path parameters
   - Query parameters
   - Request body schema
   - Response schemas
3. **Tool creation** - A tool is generated for each unique endpoint
4. **Parameter mapping** - OpenAPI parameters are mapped to tool parameters
5. **Authentication integration** - OAuth2 credentials are automatically applied to requests

## Generated tool structure

Each generated tool follows this format:

{% table %}
- Property
- Type
- Description
---
- name
- string
- Tool name generated from the endpoint path
---
- method
- string
- HTTP method (GET, POST, PUT, DELETE)
---
- parameters
- [Parameter object]
- Tool parameters mapped from OpenAPI parameters
---
- response
- [Response object]
- Expected response format
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
- `{id}` → `id: string`
---
- Query parameter
- Optional parameter
- `?filter` → `filter?: string`
---
- Request body
- Object parameter
- `requestBody` → `body: object`
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

The generated tool would look like:

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
  "response": {
    "type": "object",
    "schema": "#/components/schemas/User"
  }
}
```

## Best practices

1. Use descriptive OpenAPI operation IDs for better tool names
2. Document parameters thoroughly in your OpenAPI spec
3. Use proper response schemas for accurate response handling
4. Keep endpoint paths consistent and RESTful
5. Use standard HTTP methods appropriately

## Next steps

- Set up [MCP server authentication](../mcp-server-authentication.md)
- View the [MCP configuration reference](../../../config/mcp.md)
- Learn about the [Catalog MCP server](../catalog-mcp/index.md)