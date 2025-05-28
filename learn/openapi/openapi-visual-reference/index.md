# Redocly's visual reference to OpenAPI

Before you start, it's helpful to:
- Know [what's an API](https://redocly.com/blog/whats-an-api/)
- Learn the [YAML essentials](/learn/yaml/index.md)
- Be comfortable with Markdown

## The OpenAPI Specification

From the specification:

> The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to HTTP APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, documentation, or through network traffic inspection. When properly defined, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.
>
> An OpenAPI definition can then be used by documentation generation tools to display the API, code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.

**Restated:** OpenAPI describes HTTP APIs (sometimes referred to as REST APIs). It can be generated and consumed by both machines and people.

## Structure of this visual reference

Navigate throughout the OpenAPI file structure, and each page contains:

- Excerpts from the OAS
- YAML examples with Redocly rendered screenshots
- Type definitions (which is how you can interact with specs programmatically using custom rules and decorators).

## Difference from Swagger

Swagger is the former name of OpenAPI.

In 2015, SmartBear Software donated the Swagger specification to the Linux Foundation, and renamed the specification to the OpenAPI Specification.

Interested in the origin of the swagger name?
[Perfect for API trivia](https://twitter.com/adamaltman/status/1304060760583270402).

## OpenAPI file structure

An OpenAPI file is a YAML or JSON file with these root mapping keys:
- [openapi](./openapi.md) (**REQUIRED**)
- [info](./info.md) (**REQUIRED**)
- [servers](./servers.md)
- [paths](./paths.md) (**REQUIRED in 3.0**)
- [webhooks](./webhooks.md) (Introduced in 3.1, and Redocly supports it in 3.0 as `x-webhooks` -- keys starting with `x-` are known as "specification extensions")
- [components](./components.md)
- [security](./security.md)
- [tags](./tags.md)
- [externalDocs](./external-docs.md)
- jsonSchemaDialect (Introduced in 3.1)

The Redocly type to describe the root is `Root`.

As a quick refresher from YAML maps, the order of the keys isn't important, so these may appear in any order within the OpenAPI root document.

The following is an example of a minimal OpenAPI 3.0 file:

```yaml
openapi: 3.0.3
info:
  title: Minimal example
  version: demo
paths: {}
```

Note that the three required root mapping keys have their own required properties.

## Reference structure

- [openapi](./openapi.md)
- [info](info.md)
  - [contact](./contact.md)
  - [license](./license.md)
- [servers](./servers.md)
  - [server variables](./server-variables.md)
- [paths](./paths.md)
  - [path items](./path-item.md)
  - [operations](./operation.md)
    - [parameters](./parameters.md)
    - [media type objects](./media-type.md)
    - [request body](./request-body.md)
    - [responses](./responses.md)
      - [response](./response.md)
- [webhooks (or x-webhooks)](./webhooks.md)
- [components](./components.md)
  - [schemas](./schemas.md)
    - [string](./string.md)
    - [number](./number.md)
    - [integer](./integer.md)
    - [array](./array.md)
    - [object](./object.md)
    - [null](./null.md)
  - [responses](./named-responses.md)
  - [parameters](./parameters.md)
    - [parameter](./parameter.md)
  - [examples](./examples.md)
    - [example](./example.md)
  - [requestBodies](./named-request-bodies.md)
  - [headers](./header.md)
  - [pathItems](./named-path-items.md)
  - [securitySchemes](./security-schemes.md)
    - [OAuth2 flows](./oauth-flows.md)
  - [links](./links.md)
  - [callbacks](./callbacks.md)
  - [reference objects (`$ref`)](./reference.md)
- [security](./security.md)
- [tags](./tags.md)
- [externalDocs](./external-docs.md)
- [specification extensions](./specification-extensions.md)
