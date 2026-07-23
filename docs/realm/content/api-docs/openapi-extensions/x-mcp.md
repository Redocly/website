# OpenAPI extension: `x-mcp`

{% partial file="../../../_partials/experimental.md" /%}

The `x-mcp` extension has two roles, depending on where it is used:

- At the root of an OpenAPI description, it documents an MCP (Model Context Protocol) server, so consumers can review its tools, resources, and prompts in the rendered API docs.
- In the `info` object, it controls whether [AI agents can call the API](../../../customization/mcp-server/call-apis-with-ai-agents.md), and on individual operations it hides endpoints from the built-in [Docs MCP server](../../../customization/mcp-server/index.md).

## Location

{% table %}

- Location
- Role

---

- Root object
- Document an MCP server with the [MCP object](#mcp-object).

---

- Info object
- Control whether AI agents can call the API with the [Control object](#control-object).

---

- Path item or operation object
- Hide a specific endpoint from the Docs MCP server documentation tools with the [Docs control object](#docs-control-object).

{% /table %}

## Options

The shape of `x-mcp` depends on its location: the root object takes the [MCP object](#mcp-object), the `info` object takes the [Control object](#control-object), and path items or operations take the [Docs control object](#docs-control-object).

### MCP object

{% table %}

- Option
- Type
- Description

---

- protocolVersion
- string
- **REQUIRED.** The MCP protocol version supported by the server.

---

- servers
- [ [Server Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#serverObject) ]
- A list of server objects used to add one or more target endpoints for the MCP server.

---

- capabilities
- [Capabilities object](#capabilities-object)
- Server capabilities including supported features like logging, prompts, resources, and tools.

---

- tools
- [ [Tool object](#tool-object) ]
- Array of tools provided by the MCP server.

---

- resources
- [ [Resource object](#resource-object) ]
- Array of resources provided by the MCP server.

---

- prompts
- [ [Prompt object](#prompt-object) ]
- Array of prompts provided by the MCP server.

{% /table %}

### Capabilities object

{% table %}

- Option
- Type
- Description

---

- logging
- object
- Logging capabilities configuration.
  Empty object indicates basic logging support.

---

- prompts
- object
- Prompt capabilities configuration with optional `listChanged` boolean property.

---

- resources
- object
- Resource capabilities configuration with optional `subscribe` and `listChanged` boolean properties.

---

- tools
- object
- Tool capabilities configuration with optional `listChanged` boolean property.

{% /table %}

### Tool object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** The name of the tool.

---

- title
- string
- Title of the tool.

---

- description
- string
- Description of what the tool does.

---

- tags
- [ string ]
- Tags for the tool, used to group tools in the rendered documentation.

---

- inputSchema
- object
- **REQUIRED.** JSON Schema describing the expected input parameters for the tool.

---

- outputSchema
- object | string
- JSON Schema describing the tool's output, or a reference to a schema component.

---

- security
- [ object ]
- Security requirements for the tool, following OpenAPI security scheme format.

---

- x-badges
- [ [Badge object](./x-badges.md) ]
- Badges displayed next to the tool in the rendered documentation.

{% /table %}

### Resource object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** The name of the resource.

---

- title
- string
- Title of the resource.

---

- description
- string
- Description of the resource.

---

- uri
- string
- **REQUIRED.** URI template for accessing the resource.

---

- mimeType
- string
- **REQUIRED.** MIME type of the resource content.

---

- blob
- string
- Base64-encoded binary content of the resource.

---

- text
- string
- Text content of the resource.

---

- security
- [ object ]
- Security requirements for the resource, following OpenAPI security scheme format.

---

- tags
- [ string ]
- Tags for the resource, used to group resources in the rendered documentation.

---

- x-badges
- [ [Badge object](./x-badges.md) ]
- Badges displayed next to the resource in the rendered documentation.

{% /table %}

### Prompt object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** The name of the prompt.

---

- title
- string
- Title of the prompt.

---

- description
- string
- **REQUIRED.** Description of the prompt.

---

- arguments
- [ [Argument object](#argument-object) ]
- **REQUIRED.** Array of arguments for the prompt.

---

- security
- [ object ]
- Security requirements for the prompt, following OpenAPI security scheme format.

---

- tags
- [ string ]
- Tags for the prompt, used to group prompts in the rendered documentation.

---

- x-badges
- [ [Badge object](./x-badges.md) ]
- Badges displayed next to the prompt in the rendered documentation.

{% /table %}

### Argument object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** The name of the argument.

---

- description
- string
- **REQUIRED.** Description of the argument.

---

- required
- boolean
- **REQUIRED.** Whether the argument is required.

---

- example
- string
- Example value for the argument.

{% /table %}

### Control object

Use the Control object in the `info` object of an API description to control whether AI agents can call the API.

{% table %}

- Option
- Type
- Description

---

- gateway
- [Gateway control object](#gateway-control-object)
- Control whether AI agents can call the API.
  For APIs restricted by RBAC, the presence of this option opts the API into [API calling](../../../customization/mcp-server/call-apis-with-ai-agents.md).

{% /table %}

### Docs control object

Use the Docs control object on a path item or operation to hide it from the Docs MCP server documentation tools.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hide the endpoint from the Docs MCP server documentation tools.
  Default: `false`.

{% /table %}

### Gateway control object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- When set to `true`, AI agents cannot call the API.
  The API stays discoverable through the documentation tools.
  Default: `false`.

{% /table %}

## Examples

### Describe an MCP server

The following is an example of an `x-mcp` described within an OpenAPI description file:

```yaml {% title="api-clients-mcp.yaml" %}
openapi: 3.2.0
info:
  version: 1.0.0
  title: API Clients MCP
  license:
    name: MIT
servers:
  - url: http://localhost:8080/mcp

paths: {} # no paths

x-mcp:
  protocolVersion: '2025-06-18'
  capabilities:
    logging: {}
    prompts:
      listChanged: true
    resources:
      subscribe: true
    tools:
      listChanged: true
  tools:
    # this is the output of the list/tools call to the MCP
    - name: clients/get
      description: Get a list of clients with all scopes in a service domain.
      inputSchema:
        type: object
        properties:
          clientId:
            type: string
            description: The ID of the client to get.
      outputSchema:
        $ref: '#/components/schemas/Client'
      # we added the OAuth2 security scheme
      security:
        - OAuth2:
            scopes:
              read: Read access
    - name: clients/list
      description: Get a list of clients with all scopes in a service domain.
      inputSchema:
        type: object
        properties:
          paginationToken:
            type: string
            description: The pagination token to get the next page of clients.
      outputSchema:
        type: object
        properties:
          clients:
            type: array
            items:
              $ref: '#/components/schemas/Client'
          paginationToken:
            type: string
            description: The pagination token to get the next page of clients.
  resources: []

components:
  securitySchemes:
    OAuth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: http://localhost:8080/mcp/token
          scopes:
            read: Read access
            write: Write access
  schemas:
    Client:
      type: object
      properties:
        clientId:
          type: number
          description: The ID of the client.
        scopes:
          type: array
          items:
            type: string
          description: The scopes of the client.
      required:
        - clientId
        - scopes
```

The data is displayed as shown in the following screenshot:

{% img
  alt="Example MCP docs"
  src="./images/mcp-docs-example.png"
  withLightbox=true
/%}

### Hide an endpoint from the Docs MCP server

Hide a single endpoint while the rest of the API stays discoverable:

```yaml
paths:
  /users/{id}:
    delete:
      summary: Delete a user
      x-mcp:
        docs:
          hide: true
```

To hide a whole API from the MCP server, use the [`mcp.docs.ignore` configuration option](../../../config/mcp.md#docs-object).

### Control API calling per API

Opt a protected API into API calling:

```yaml
info:
  title: Billing API
  version: 1.0.0
  x-mcp:
    gateway: {}
```

Opt an API out of API calling while keeping it discoverable:

```yaml
info:
  title: Billing API
  version: 1.0.0
  x-mcp:
    gateway:
      hide: true
```

## Resources

- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
- **[Let AI agents call your APIs](../../../customization/mcp-server/call-apis-with-ai-agents.md)** - Turn on API calling and choose which APIs agents can call
- **[MCP configuration reference](../../../config/mcp.md)** - Project-level MCP options, including server variants and API calling
