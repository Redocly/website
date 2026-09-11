---
seo:
  title: Supported specifications in Redoc CE
---

# Supported specifications

Redoc CE renders API reference documentation from OpenAPI, AsyncAPI, and GraphQL descriptions, and documents MCP servers described in an OpenAPI file.
One renderer handles all of them.
The same script, element, component, Docker image, and CLI command work for every specification.
All supported specifications accept the [configuration options](./config.md) in the same way.

Redoc CE detects the specification type from the description file you point it at, and renders one description per page.

## Specifications and versions

{% table %}

- Specification
- Versions
- What Redoc CE renders

---

- OpenAPI
- 3.2, 3.1, 3.0
- An overview page, operations grouped by tag, webhooks, and schema pages.

---

- Swagger
- 2.0
- Converted to OpenAPI 3 when the description loads, then rendered like an OpenAPI 3 description.

---

- AsyncAPI
- 3.x, 2.x
- An overview page with the servers, channels, and operations with their messages.

---

- GraphQL
- Schema definition language (SDL)
- An overview page, queries, mutations, subscriptions, and the objects, inputs, enums, interfaces, unions, scalars, and directives of the schema.
  Introspection JSON is not supported.

---

- MCP
- Servers described with the [`x-mcp`](../../realm/content/api-docs/openapi-extensions/x-mcp.md) extension
- The MCP servers and tools declared at the root of an OpenAPI description, with connect buttons in the page header.
  MCP is not a separate input: it is documented inside an OpenAPI description.

{% /table %}

## Specification detection

Redoc CE always detects the specification type from the description.
There is no setting for it.
The rules apply in this order:

1. A URL that ends in `.graphql` or `.gql` is fetched as a GraphQL schema.
1. Any other URL is loaded and bundled.
   A document with an `asyncapi` field is AsyncAPI, and every other document is OpenAPI.
   A document with a `swagger` field is converted to OpenAPI 3.
1. A URL that does not load as OpenAPI or AsyncAPI is fetched again as a GraphQL schema.
   A schema served from an API endpoint therefore works without a file extension.
1. A string is parsed as a JSON description when it is JSON, and read as a GraphQL schema in SDL otherwise.
1. An object follows the same `asyncapi` and `swagger` rules as a loaded document.

GraphQL introspection results are not accepted.
Redoc CE stops with an error that asks for the schema in SDL.

## One description per page

Redoc CE renders a single description at a time.
A page cannot combine an OpenAPI description with an AsyncAPI description or a GraphQL schema.
To document several APIs, or the same API in several specifications, create one page per description and link the pages from your site navigation.
In a React application, render one `RedocStandalone` per route.

## Point each deployment method at a description

{% table %}

- Method
- Description source

---

- [HTML element](./deployment/html.md)
- `spec-url` attribute with a URL or root-relative path

---

- [`init` function](./deployment/html.md#the-init-function)
- First argument: a URL, a parsed description object, a JSON string, or a GraphQL schema in SDL

---

- [React component](./deployment/react.md)
- `specUrl` prop for a URL, or `spec` prop for a parsed object, a JSON string, or a GraphQL schema in SDL

---

- [Docker image](./deployment/docker.md)
- `SPEC_URL` environment variable

---

- [Redocly CLI](./deployment/cli.md)
- Path or URL of the description passed to `build-docs`
{% /table %}

## Sample descriptions

The [deployment guide](./deployment/intro.md#api-description) lists sample descriptions for every specification, including Swagger 2.0 files.

## Options per specification

The standalone options such as `router`, `basePath`, and `disableTelemetry` apply to every specification.
The [OpenAPI options](./config.md#openapi-options) apply to OpenAPI descriptions, and the [AsyncAPI options](./config.md#asyncapi-options) and [GraphQL options](./config.md#graphql-options) apply to their specification only.
[Specification extensions](./redoc-vendor-extensions.md) such as `x-logo` and `x-tagGroups` are read from OpenAPI and AsyncAPI descriptions.
GraphQL schemas have no extension mechanism.
The overview metadata comes from the [`info`](../../realm/config/graphql/info.md) option.

## Resources

- **[Redoc CE quickstart](./quickstart.md)** - Render a description of any supported specification in one HTML file
- **[Configure Redoc CE](./config.md)** - Every option, including the AsyncAPI and GraphQL sections
- **[Redoc CE specification extensions](./redoc-vendor-extensions.md)** - The `x-` fields Redoc CE reads from OpenAPI and AsyncAPI descriptions
- **[OpenAPI extension `x-mcp`](../../realm/content/api-docs/openapi-extensions/x-mcp.md)** - Document MCP servers and tools inside an OpenAPI description
