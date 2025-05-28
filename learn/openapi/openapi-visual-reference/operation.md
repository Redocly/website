# Operation Object

<details>
<summary>
Excerpt from the OpenAPI 3.1 specification about the Operation object
</summary>

## Operation Object

Describes a single API operation on a path.

### Fixed Fields

Field Name | Type | Description
---|:---:|---
tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
summary | `string` | A short summary of what the operation does.
description | `string` | A verbose explanation of the operation behavior. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
externalDocs | [External Documentation Object](./external-docs.md) | Additional external documentation for this operation.
operationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is **case-sensitive**. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
parameters | [[Parameter Object](./parameter.md) \| [Reference Object](./reference.md)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](./path-item.md), the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](./parameter.md) and [location](./parameter.md). The list can use the [Reference Object](./reference.md) to link to parameters that are defined at the [OpenAPI Object's components/parameters](./parameters.md).
requestBody | [Request Body Object](./request-body.md) \| [Reference Object](./reference.md) | The request body applicable for this operation.  The `requestBody` is fully supported in HTTP methods where the HTTP 1.1 specification [RFC7231](https://tools.ietf.org/html/rfc7231#section-4.3.1) has explicitly defined semantics for request bodies.  In other cases where the HTTP spec is vague (such as [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1), [HEAD](https://tools.ietf.org/html/rfc7231#section-4.3.2) and [DELETE](https://tools.ietf.org/html/rfc7231#section-4.3.5)), `requestBody` is permitted but does not have well-defined semantics and SHOULD be avoided if possible.
responses | [Responses Object](./responses.md) | The list of possible responses as they are returned from executing this operation.
callbacks | Map[`string`, [Callback Object](./callbacks.md) \| [Reference Object](./reference.md)] | A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a [Callback Object](./callbacks.md) that describes a request that may be initiated by the API provider and the expected responses.
deprecated | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.
security | [[Security Requirement Object](./security.md)] | A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement (`{}`) can be included in the array. This definition overrides any declared top-level [`security`](./security.md). To remove a top-level security declaration, an empty array can be used.
servers | [[Server Object](./servers.md)] | An alternative `server` array to service this operation. If an alternative `server` object is specified at the Path Item Object or Root level, it will be overridden by this value.

This object MAY be extended with [Specification Extensions](./specification-extensions.md).

### Operation Object Example

```json
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "operationId": "updatePetWithForm",
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "schema": {
        "type": "string"
      }
    }
  ],
  "requestBody": {
    "content": {
      "application/x-www-form-urlencoded": {
        "schema": {
          "type": "object",
          "properties": {
            "name": {
              "description": "Updated name of the pet",
              "type": "string"
            },
            "status": {
              "description": "Updated status of the pet",
              "type": "string"
            }
          },
          "required": ["status"]
        }
      }
    }
  },
  "responses": {
    "200": {
      "description": "Pet updated.",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    },
    "405": {
      "description": "Method Not Allowed",
      "content": {
        "application/json": {},
        "application/xml": {}
      }
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```

```yaml
tags:
- pet
summary: Updates a pet in the store with form data
operationId: updatePetWithForm
parameters:
- name: petId
  in: path
  description: ID of pet that needs to be updated
  required: true
  schema:
    type: string
requestBody:
  content:
    'application/x-www-form-urlencoded':
      schema:
       type: object
       properties:
          name:
            description: Updated name of the pet
            type: string
          status:
            description: Updated status of the pet
            type: string
       required:
         - status
responses:
  '200':
    description: Pet updated.
    content:
      'application/json': {}
      'application/xml': {}
  '405':
    description: Method Not Allowed
    content:
      'application/json': {}
      'application/xml': {}
security:
- petstore_auth:
  - write:pets
  - read:pets
```

</details>

The operation is the granular unit for each API.
Redocly renders each operations http method and summary in the sidebar navigation in the order they are defined by default.

## Visuals

The operation object includes many other types. See [Media Type Object](./media-type.md), [Parameter](./parameter.md), [Request body](./request-body.md), [Responses](./responses.md), [Servers](./servers.md), [Security](./security.md) for types that are included in an operation. In addition, the operation has an `operationId`, `summary`, and `description`.



### `operationId`

The `operationId` is path segment or path fragment in deep links to a specific operation.

![operationId in URL](./images/operation-operation-id.png)

### `summary`

The `summary` displays in the sidebar navigation and the heading in the main panel.

![operation-summary-description](./images/operation-summary-description.png)

### `description`

The `description` displays under the `summary` in the main panel.
The description renders Markdown into HTML.
Use Markdown to style content.

![operation-summary-description](./images/operation-summary-description.png)

## Types

- `Operation`

The `Operation` type is filled with properties.

```js
const Operation: NodeType = {
  properties: {
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
    summary: { type: 'string' },
    description: { type: 'string' },
    externalDocs: 'ExternalDocs',
    operationId: { type: 'string' },
    parameters: listOf('Parameter'),
    security: listOf('SecurityRequirement'),
    servers: listOf('Server'),
    requestBody: 'RequestBody',
    responses: 'ResponsesMap',
    deprecated: { type: 'boolean' },
    callbacks: mapOf('Callback'),
    'x-codeSamples': listOf('XCodeSample'),
    'x-code-samples': listOf('XCodeSample'), // deprecated
  },
  required: ['responses'],
};
```
