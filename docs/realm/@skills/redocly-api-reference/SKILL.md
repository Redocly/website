---
name: redocly-api-reference
description: >-
  Use when adding or configuring API reference documentation in a Redocly documentation project
  (Realm, Revel, Reef, or Redoc): rendering an OpenAPI, AsyncAPI, GraphQL, or SOAP (WSDL) description
  as reference pages, linking to them, the apis, openapi, asyncapi, graphql, and mockServer options
  in redocly.yaml, code samples, the Replay (Try it) console, the mock server, the sidebar of an API
  reference (tag groups), x- extensions such as x-tagGroups, x-codeSamples, or x-rbac, or showing an
  operation or schema in a Markdown page
  (openapi-code-sample, replay-openapi, json-schema).
  Not for linting, bundling, or splitting API files (use redocly-cli) or custom lint rules (use redocly-lint-rules).
---

# Redocly API reference docs

Reference for API reference documentation in Redocly projects: adding API descriptions, configuring how they render, extensions, and API content in Markdown pages.

If a detail is not in this file, fetch the `Full reference` link of the section. Do not guess option names.

## Add an API description

Put an OpenAPI (YAML or JSON, any version), AsyncAPI 3.0, or GraphQL SDL (`.graphql`, `.gql`) file anywhere in the project.
A Redocly project renders it as reference docs with its own sidebar, from its tags and operations. No configuration is necessary.

- **The file location sets the URL:** `apis/cafe-api.yaml` renders at `/apis/cafe-api`.
  To change the URL, move or rename the file. Nothing in `redocly.yaml` changes it.
- Link to the reference by its file path, with the extension, the same as a page:

```yaml {% title="sidebars.yaml" %}
- group: Cafe API
  items:
    - page: apis/cafe-api.yaml
```

The same `page: apis/cafe-api.yaml` works in the navbar and the footer.

Full reference: https://redocly.com/docs/realm/content/api-docs/add-openapi-docs.md

## The apis configuration

Use `apis` for the lint rules, decorators, and rendering options of one API.
An `apis` entry does not add a page and does not set the URL.

```yaml {% title="redocly.yaml" %}
openapi:
  layout: stacked
apis:
  cafe_api@v2:
    root: apis/cafe-api.yaml
    rules:
      operation-operationId-unique: error
    openapi:
      hideReplay: true
```

| Option | Type | Description |
|---|---|---|
| `root` | string | **Required.** Path to the root API description file. |
| `rules` | object | Lint rules for this API. |
| `extends` | [string] | Rulesets or config files to extend. |
| `decorators` | object | Decorators for this API. They run on bundle. |
| `preprocessors` | object | Like decorators, but they run before linting. |
| `output` | string | Output file of `redocly bundle` when you run it with no API name. |
| `openapi`, `asyncapi`, `graphql` | object | Rendering options for this API. |

- The key is `name` or `name@version`, with letters, numbers, and underscores only: `cafe_api@v2`.
- Rendering options go under the top-level `openapi`, `asyncapi`, or `graphql` key for all APIs, or under `apis.<name>.openapi` for one API. The per-API value wins.
  They do not go directly under `apis.<name>`.
- For linting commands and rules, load the `redocly-cli` skill, if it is installed (or fetch https://redocly.com/docs/cli/commands/lint.md).

Full reference: https://redocly.com/docs/realm/config/apis.md

## OpenAPI options

| Option | Default | Description |
|---|---|---|
| `layout` | `three-panel` | `three-panel`, or `stacked` (the right panel moves into the middle panel). |
| `hideReplay` | `false` | Hide the **Try it** buttons. |
| `codeSamples` | all languages | Languages and behavior of generated code samples. See [Code samples](#code-samples). |
| `downloadUrls` | - | Download links: a list of `title` and `url` (absolute, required). |
| `hideDownloadButtons` | `false` | Hide the download section. It does not make the description private. |
| `excludeFromSearch` | `false` | Remove the API from search and `llms.txt`. |
| `corsProxyUrl` | `/_api/cors/` | Proxy that Replay uses. `""` sends requests directly, and the API must allow CORS. |
| `hideInfoMetadata` | `false` | Hide the info metadata section. |
| `hideSchemaTitles` | `false` | Hide the schema title next to the type. |
| `hidePropertiesPrefix` | `false` | Hide the parent name prefix on nested properties. |
| `showExtensions` | `false` | Show `x-` fields: `true` for all, or a list of names. |
| `sortRequiredPropsFirst` | `false` | Show required properties first. |
| `onlyRequiredInSamples` | `false` | Show only required fields in request samples. |
| `jsonSamplesExpandLevel` | `2` | Expand level of JSON samples. A number or `all`. |
| `schemasExpansionLevel` | - | Expand level of schemas. A number or `all`. |
| `generatedSamplesMaxDepth` | `8` | Schema levels in generated samples. |
| `maxDisplayedEnumValues` | `10` | Number of enum values to show. |
| `schemaDefinitionsTagName` | - | Add all schemas to a sidebar section with this name. |
| `showSchemaCatalogLinks` | `false` | Show links to schemas that other API files in the project can use as `$ref`. |
| `sanitize` | `false` | Remove unsafe HTML and Markdown. |
| `feedback` | - | Hide or change the feedback form of each operation. |
| `events` | - | Event hooks for analytics: `tryItOpen`, `tryItSent`, `codeSamplesCopy`. |

Full reference: https://redocly.com/docs/realm/config/openapi.md

## Code samples

Generated code samples are on by default.
Set the languages and their order with `codeSamples`:

```yaml {% title="redocly.yaml" %}
openapi:
  codeSamples:
    skipOptionalParameters: true
    languages:
      - lang: curl
      - lang: JavaScript
        label: JS
      - lang: Java8+Apache
        label: Java 8
```

- `lang` values: `curl`, `C#`, `C#+Newtonsoft`, `Go`, `Java`, `Java8+Apache`, `JavaScript`, `Node.js`, `PHP`, `Python`, `R`, `Ruby`.
- `label` changes the tab name. `skipOptionalParameters` removes optional cookies, headers, and query parameters.
- A `lang` that is not in the list is not generated. Add it to the operation with `x-codeSamples`:

```yaml {% title="cafe-api.yaml" %}
paths:
  /menu:
    get:
      operationId: listMenuItems
      x-codeSamples:
        - lang: PHP
          source: |
            <?php $menu = file_get_contents("https://api.example.com/menu");
        - lang: Python
          source:
            $ref: code-samples/list-menu.py
```

Full reference: https://redocly.com/docs/realm/config/openapi/code-samples.md

## Replay and request values

Replay is the **Try it** console. It sends requests to your servers, or to the mock server.

- Hide it for all APIs or one API with `openapi.hideReplay: true`, or for one operation with `x-hideReplay: true`.
- Replay sends requests through the built-in CORS proxy at `/_api/cors/`.
  Limit the targets with `corsProxy.allowedTargets`, a list of URL prefixes. Other targets get `403`.
- For an API on a private network, set `corsProxyUrl` to a proxy inside that network.

To prefill headers, query and path parameters, cookies, the body, security values, and server variables, eject `configure.ts`:

```bash
npx @redocly/cli eject component ext/configure.ts
```

```typescript {% title="@theme/ext/configure.ts" %}
export function configure(context) {
  return {
    requestValues: {
      headers: { 'Operation-ID': context.operation.operationId || '' },
      query: { limit: '10' },
      security: { default: { token: { access_token: 'example-token' } } },
    },
  };
}
```

- `context` has `userClaims`, `info`, `operation` (`name`, `path`, `operationId`, `href`, `method`), and `servers`.
- Key `security` by `default`, or by a scheme ID from `components.securitySchemes`. Basic auth takes `username` and `password`. API key and bearer take `token.access_token`.
- Values merge with the examples in the description. A parameter must already exist in the description.
- To get values from an API at runtime, eject `ext/use-configure-replay.ts` instead.

Full reference: https://redocly.com/docs/realm/customization/configure-request-values.md

## Mock server

The mock server is on by default for each API description.
It returns sample responses from the description, with no backend, at `/_mock/<path-to-description>/`, for example `/_mock/apis/cafe-api/`.

```yaml {% title="redocly.yaml" %}
mockServer:
  strictExamples: true
  position: replace
  description: Development server
```

| Option | Default | Description |
|---|---|---|
| `off` | `false` | Turn off the mock server. |
| `strictExamples` | `false` | `true` returns the examples unchanged. `false` puts request values into the response. |
| `errorIfForcedExampleNotFound` | `false` | Return an error when a requested example does not exist. |
| `position` | `first` | Place in the Replay server list: `first`, `last`, `replace`, or `off`. |
| `description` | `Mock server` | Label in the Replay server list. |

`position: off` hides the mock server from the list. It still answers requests from other API clients.

Full reference: https://redocly.com/docs/realm/config/mock-server.md

## OpenAPI extensions

| Extension | Location | Purpose |
|---|---|---|
| `x-tagGroups` | Root | Groups of tags in the sidebar: `name`, `tags`. A tag that is in no group does not show. |
| `x-displayName` | Tag | Human-friendly tag name. |
| `x-traitTag` | Tag | A tag that labels operations and does not group them. |
| `x-tags` | Schema | Add a schema to a tag section. |
| `x-badges` | Operation, parameter, schema | Badges: `name`, `color` (default `grey`), `position` (`before`, `after`). |
| `x-codeSamples` | Operation | Custom code samples: `lang`, `source` (text or `$ref`). |
| `x-hideReplay` | Operation | Hide Replay for the operation. |
| `x-rbac` | Any object | Team-to-role map. Hides the object from users without access, also in the downloaded file. |
| `x-seo` | Operation | `title`, `description`, `keywords`, `image` of the operation page. |
| `x-metadata` | Info | Key-value table at the top of the reference, and catalog filters. |
| `x-keywords` | Description, operation, tag | Promote or exclude items in search. |
| `x-enumDescriptions` | Schema | Descriptions of enum values. Only the listed values show. |
| `x-summary` | Response | Short response summary. |
| `x-additionalPropertiesName` | `additionalProperties` schema | Field name shown for additional properties. |
| `x-webhooks` | Root | Webhooks in OpenAPI 3.0 or earlier. |
| `x-usePkce` | OAuth `authorizationCode` flow | Turn on PKCE. |
| `x-mcp` | Root | Document MCP servers and tools. Experimental. |

```yaml {% title="cafe-api.yaml" %}
x-tagGroups:
  - name: Ordering
    tags: [Menu, Orders]
paths:
  /orders:
    post:
      operationId: createOrder
      x-badges:
        - name: Beta
          position: before
      x-rbac:
        authenticated: read
```

- `x-rbac` teams include `anonymous`, `authenticated`, and `*`. Roles: `none`, `read`, `write`, `triage`, `maintain`, `admin`.
- OpenAPI 2.0 only: `x-example`, `x-examples`, `x-nullable`, `x-servers`.

Full reference: https://redocly.com/docs/realm/content/api-docs/openapi-extensions.md

## AsyncAPI

AsyncAPI 3.0 files render the same way as OpenAPI files, with their own URL and sidebar.
Kafka bindings get protocol-specific components, and AMQP (RabbitMQ) bindings get labels.

| Option | Default | Description |
|---|---|---|
| `layout` | `three-panel` | `three-panel` or `stacked`. |
| `jsonSamplesDepth` | `3` | Depth of JSON samples in protocol binding panels. |
| `downloadUrls` | - | Download links: `title`, `url`. |
| `excludeFromSearch` | `false` | Remove from search and `llms.txt`. |
| `feedback` | - | Hide or change the feedback form. |

Extensions: `x-badges` (channel, operation, schema), `x-enumDescriptions`, `x-metadata`, `x-rbac`, `x-seo` (operation, channel), `x-tagGroups`, `x-additionalPropertiesName`.
The old `@redocly/portal-plugin-async-api` plugin is deprecated. Remove it from `plugins` and `package.json`.

Full reference: https://redocly.com/docs/realm/config/asyncapi.md

## GraphQL

GraphQL SDL files get a sidebar from their queries, mutations, and types.

```yaml {% title="redocly.yaml" %}
graphql:
  info:
    title: Cafe API
    version: v1
  menu:
    groups:
      - name: Orders
        items:
          includeByName: ['/order/i']
    otherItemsGroupName: Other
```

| Option | Default | Description |
|---|---|---|
| `info` | - | Overview: `title`, `version`, `description`, `termsOfService`, `contact`, `license`. |
| `menu` | - | Sidebar groups: `groups`, `otherItemsGroupName`, `requireExactGroups`. |
| `fieldExpandLevel` | `4` | Maximum depth of the **Return type** section. |
| `jsonSamplesDepth` | `1` | Depth of JSON samples. |
| `samplesMaxInlineArgs` | `2` | Arguments on one line in a sample. More go on separate lines. |
| `showBuiltInScalars` | `false` | Show `Int`, `Float`, `String`, `Boolean`, `ID`. |
| `showBuiltInDirectives` | `false` | Show `skip`, `include`, `deprecated`, `specifiedBy`, `oneOf`. |
| `excludeFromSearch`, `feedback` | - | Same as for OpenAPI. |

- A menu group has `name`, and one or more of `items`, `queries`, `mutations`, `subscriptions`, `types`, `directives`. Each takes `includeByName` or `excludeByName` regular expressions.
- `info` priority: `apis.<name>.graphql.info`, then `graphql.info`, then schema directives (`@redocly_info`), then the schema docstring.

Full reference: https://redocly.com/docs/realm/config/graphql.md

## SOAP

SOAP docs need the `@redocly/portal-plugin-soap-api` plugin, and files with the `.wsdl` extension.

1. Add `@redocly/realm` (or your product package) and the plugin to `package.json`.
2. Turn on the plugin in `redocly.yaml`: `plugins: ['@redocly/portal-plugin-soap-api/plugin.js']`.
3. Put the WSDL file in the project. `apis/service.wsdl` renders at `/apis/service`.

The error `Theme "@redocly/portal-plugin-soap-api" not found` means that `package.json` has no product package.

Full reference: https://redocly.com/docs/realm/content/api-docs/add-soap-docs.md

## API content in Markdown pages

Show one operation or schema in a guide.
Point `descriptionFile` and `$ref` at a local file with a relative path.
In `pointer`, encode `/` in a path as `~1`: `/paths/~1orders/post`.

### OpenAPI code sample

```markdoc
{% openapi-code-sample descriptionFile="../apis/cafe-api.yaml" operationId="listMenuItems" language="curl" /%}
```

| Attribute | Type | Description |
| --- | --- | --- |
| `descriptionFile` | string | **Required.** Relative path to the OpenAPI description. |
| `operationId` | string | Operation ID. Required without `pointer`. |
| `pointer` | string | JSON pointer to the operation. |
| `exampleKey` | string | Key of the operation example to use. |
| `language` | string | One language, case-sensitive: `Payload`, `curl`, `C#`, `Node.js`, `JavaScript`, `Python`, `R`, `Ruby`, `PHP`, `Go`, `Java`. |
| `parameters` | object | Values for `header` and `query` parameters. |
| `requestBody` | object | Replaces the request body. |
| `environment` | string | Limits the environment picker to one server. |
| `environments` | object | Variables for each server, named after the security schemes: `Scheme_token`, `Scheme_username`. |

`openapi-response-sample` shows the response example of one operation. It takes `descriptionFile`, `operationId` or `pointer`, and `exampleKey`.

### Replay OpenAPI

Embeds the Replay console for one operation.

```markdoc
{% replay-openapi descriptionFile="../apis/cafe-api.yaml" pointer="/paths/~1orders/post" /%}
```

It takes the same attributes as `openapi-code-sample`, and also `mimeType` and `hideOtherSecuritySchemes` (hide the **Other** group in the **Authorization type** dropdown).

### JSON schema and JSON example

```markdoc
{% json-schema schema={ "$ref": "../apis/cafe-api.yaml#/components/schemas/Order" } options={ "requiredPropsFirst": true } /%}

{% json-example schema={ "$ref": "../apis/cafe-api.yaml#/components/schemas/Order" } mode="read" /%}
```

| Tag | Attributes |
| --- | --- |
| `json-schema` | `schema` (required, inline or local `$ref`), `title`, `options` (`hideSchemaPattern`, `hideSchemaTitles`, `maxDisplayedEnumValues`, `requiredPropsFirst`). |
| `json-example` | `value` (literal JSON or `$ref`, wins over `schema`), `schema`, `mode` (`read` hides `writeOnly` properties, `write` hides `readOnly` properties). |

Full reference: https://redocly.com/docs/realm/content/markdoc-tags/openapi-code-sample.md

## Common mistakes

| Mistake | Correct approach |
| --- | --- |
| An `apis` entry to publish or move an API | The file location sets the URL |
| A link to the built URL of the reference | Link to the file: `page: apis/cafe-api.yaml` |
| `hideReplay` or other rendering options directly under `apis.<name>` | Under `openapi`, or `apis.<name>.openapi` |
| An `apis` key with a hyphen, such as `cafe-api@v2` | Letters, numbers, and underscores: `cafe_api@v2` |
| `x-tagGroups` that leave out some tags | Put every tag in a group. Tags that are in no group do not show |
| `x-enumDescriptions` for some values only | Only the listed values show |
| `hideDownloadButtons` to protect an API | It only hides the buttons. Use `x-rbac` |
| A code sample `lang` that is not supported, with no `x-codeSamples` | No sample is generated. Add `x-codeSamples` |
| `pointer="/paths//orders/post"` | Encode the slashes: `/paths/~1orders/post` |
| `language="javascript"` in `openapi-code-sample` | Values are case-sensitive: `JavaScript` |
