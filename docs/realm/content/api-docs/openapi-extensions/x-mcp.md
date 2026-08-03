# OpenAPI extension: `x-mcp`

{% partial file="../../../_partials/experimental.md" /%}

Use `x-mcp` to describe an MCP server in an OpenAPI document or control whether the Docs MCP server can make requests to an API.
The extension has different schemas at the OpenAPI Root Object and Info Object.

## Locations

{% table %}

- Location
- Schema
- Purpose

---

- Root Object
- [MCP description object](#mcp-description-object)
- Describes one or more MCP server endpoints for display in the API reference.

---

- Info Object
- [Docs MCP control object](#docs-mcp-control-object)
- Controls API request eligibility for the OpenAPI description.

{% /table %}

The two schemas are independent.
A root-level `x-mcp` describes an MCP server for API consumers; an Info Object `x-mcp` configures how Redocly's Docs MCP server treats the API description.

When an eligible API description does not define root-level `x-mcp.servers`, Redocly can add metadata for the project's Docs MCP server to the rendered API reference.
Author-defined root-level servers take precedence and are not replaced.

## MCP description object

Add `x-mcp` to the OpenAPI Root Object to display MCP server metadata and connection actions in the API reference.

{% table %}

- Option
- Type
- Description

---

- protocolVersion
- string
- **REQUIRED.** Identifies the MCP protocol version supported by the server.

---

- servers
- [[Server object](https://spec.openapis.org/oas/v3.1.0#server-object)]
- Lists the MCP server endpoints.

---

- capabilities
- [Capabilities object](#capabilities-object)
- Describes the capabilities supported by the MCP server.

---

- tools
- [[Tool object](#tool-object)]
- Lists tools provided by the MCP server.

---

- resources
- [[Resource object](#resource-object)]
- Lists resources provided by the MCP server.

---

- prompts
- [[Prompt object](#prompt-object)]
- Lists prompts provided by the MCP server.

{% /table %}

### Capabilities object

{% table %}

- Option
- Type
- Description

---

- logging
- object
- Indicates logging support.
  Use an empty object when no additional properties are needed.

---

- prompts
- object
- Describes prompt support.
  The optional `listChanged` property indicates whether the server emits notifications when the prompt list changes.

---

- resources
- object
- Describes resource support.
  The optional `subscribe` and `listChanged` properties describe subscription and list-change support.

---

- tools
- object
- Describes tool support.
  The optional `listChanged` property indicates whether the server emits notifications when the tool list changes.

{% /table %}

### Tool object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Identifies the tool.

---

- title
- string
- Provides a human-readable title for the tool.

---

- description
- string
- Describes what the tool does.

---

- tags
- [string]
- Groups or categorizes the tool.

---

- inputSchema
- object
- Defines the tool input with JSON Schema.

---

- outputSchema
- object | string
- Defines the tool output with JSON Schema or a schema reference.

---

- security
- [object]
- Defines security requirements using the OpenAPI Security Requirement Object format.

{% /table %}

### Resource object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Identifies the resource.

---

- description
- string
- Describes the resource.

---

- uri
- string
- Provides the URI or URI template used to access the resource.

---

- mimeType
- string
- Identifies the MIME type of the resource content.

{% /table %}

### Prompt object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Identifies the prompt.

---

- title
- string
- Provides a human-readable title for the prompt.

---

- description
- string
- Describes the prompt.

---

- arguments
- [[Argument object](#argument-object)]
- Lists arguments accepted by the prompt.

{% /table %}

### Argument object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Identifies the argument.

---

- description
- string
- Describes the argument.

---

- required
- boolean
- Indicates whether the argument is required.
  Default: `false`.

{% /table %}

## Docs MCP control object

Add `x-mcp` to the OpenAPI Info Object to control whether the Docs MCP server can make requests to hosts declared by the description.

{% table %}

- Option
- Type
- Description

---

- gateway
- [API request object](#api-request-object)
- Explicitly allows or prevents API requests for this description.
  An empty object allows requests for an RBAC-protected description.

{% /table %}

### API request object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Prevents API requests for the description when set to `true`.
  An empty object or `hide: false` allows requests for an RBAC-protected description.

{% /table %}

Descriptions available to the `anonymous` team allow API requests by default.
Descriptions protected by content RBAC require the `gateway` object before requests are allowed.
For the complete eligibility and host rules, see [Allow AI clients to call APIs](../../../customization/mcp-server/allow-api-requests.md).

## Examples

### Describe an MCP server

The following root-level extension describes an MCP server and its tools for API-reference consumers:

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: API Clients MCP
  version: 1.0.0
paths: {}

x-mcp:
  protocolVersion: '2025-06-18'
  servers:
    - url: https://mcp.example.com/mcp
      description: Production MCP server
  capabilities:
    tools:
      listChanged: true
  tools:
    - name: clients/list
      description: List API clients.
      inputSchema:
        type: object
        properties:
          page:
            type: integer
            minimum: 1
      outputSchema:
        type: object
        properties:
          clients:
            type: array
            items:
              type: object
  resources: []
  prompts: []
```

The data is presented similar to the following screenshot:

{% img
  alt="API reference with MCP server metadata and tools"
  src="./images/mcp-docs-example.png"
  withLightbox=true
/%}

### Allow API requests for a protected description

The following Info Object extension opts an RBAC-protected description into API requests:

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Orders API
  version: 1.0.0
  x-mcp:
    gateway: {}
servers:
  - url: https://api.example.com
paths:
  /orders:
    get:
      summary: List orders
      responses:
        '200':
          description: Successful response
```

### Prevent API requests

The following Info Object extension prevents API requests for a description:

```yaml {% title="openapi.yaml" %}
openapi: 3.1.0
info:
  title: Orders API
  version: 1.0.0
  x-mcp:
    gateway:
      hide: true
servers:
  - url: https://api.example.com
paths:
  /orders:
    get:
      summary: List orders
      responses:
        '200':
          description: Successful response
```

## Resources

- **[Supported OpenAPI extensions](./index.md)** - Browse the OpenAPI extensions supported by Redocly
- **[Docs MCP server](../../../customization/mcp-server/index.md)** - Understand Docs MCP capabilities and access control
- **[Allow AI clients to call APIs](../../../customization/mcp-server/allow-api-requests.md)** - Configure eligibility and allowed server hosts
