# `security`

> A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement (`{}`) can be included in the array.

Type: array of Security Requirement Objects

## Security requirement object

> Lists the required security schemes to execute this operation.
> The name used for each property MUST correspond to a security scheme declared in the [Security Schemes](./security-schemes.md) under the [Components Object](./components.md).
>
> Security Requirement Objects that contain multiple schemes require that all schemes MUST be satisfied for a request to be authorized.
> This enables support for scenarios where multiple query parameters or HTTP headers are required to convey security information.
>
> When a list of Security Requirement Objects is defined on the OpenAPI Object or Operation Object, only one of the Security Requirement Objects in the list needs to be satisfied to authorize the request.

### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
{name} | [string] | Each name MUST correspond to a security scheme which is declared in the Security Schemes under the Components Object. If the security scheme is of type `"oauth2"` or `"openIdConnect"`, then the value is a list of scope names required for the execution, and the list MAY be empty if authorization does not require a specified scope. For other security scheme types, the array MAY contain a list of role names which are required for the execution, but are not otherwise defined or exchanged in-band.

{% admonition type="warning" %}
You MUST define the security schemes in components to be able to set security requirements.
{% /admonition %}

## Visuals

With the following security schemes:

```yaml
components:
  securitySchemes:
    api_keys:
      description: |
        Generate your secret API key in the app settings.
      name: secret-key
      type: apiKey
      in: header
    jwt:
      description: |
        Generate your JWT when you log in.
      type: http
      scheme: bearer
      bearerFormat: JWT
```

The security can be set using `api_keys` and `jwt` as values.

The following example shows that either `api_keys` or `jwt` can be used to meet the security requirement.
```yaml
security:
  - api_keys: []
  - jwt: []
```

![security with or](./images/security-01.png)

The following shows that both `api_keys` **AND** `jwt` MUST be used to meet the security requirement.
```yaml
security:
  - api_keys: []
    jwt: []
```
![security with and](./images/security-02.png)

## Types

- `SecurityRequirementList`
- `SecurityRequirement`

```js
const SecurityRequirement: NodeType = {
  properties: {},
  additionalProperties: { type: 'array', items: { type: 'string' } },
};
```
