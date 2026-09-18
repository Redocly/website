---
seo:
  title: Redoc CE specification extensions
---

# Redoc CE specification extensions

OpenAPI and AsyncAPI allow [specification extensions](https://spec.openapis.org/oas/v3.1.0#specification-extensions): custom fields that start with `x-` and that tools can interpret.
This page lists the extensions Redoc CE reads and renders.

Redoc CE ignores all other extensions.
That includes the extensions that depend on the Redocly platform, such as `x-rbac`, `x-seo`, `x-metadata`, `x-keywords`, `x-hideReplay`, `x-usePkce`, and `x-assertionType`.

To display custom `x-` fields as plain text in the documentation, set the [`showExtensions`](./config.md#openapi-options) option.
With `showExtensions: true`, Redoc CE displays every extension it does not read itself and keeps the Redocly-only fields `x-seo`, `x-keywords`, `x-metadata`, and `x-usePkce` hidden.
To display Redocly-only fields, list them explicitly: `showExtensions: ['x-seo', 'x-metadata']`.

## OpenAPI extensions

{% table %}

- Extension
- Description

---

- [x-additionalPropertiesName](../../realm/content/api-docs/openapi-extensions/x-additional-properties-name.md)
- Display a field name for an `additionalProperties` description.

---

- [x-badges](../../realm/content/api-docs/openapi-extensions/x-badges.md)
- Add visible badges to API operations.

---

- [x-codeSamples](../../realm/content/api-docs/openapi-extensions/x-code-samples.md)
- Provide the code samples to display for an operation.
  Redoc CE displays these samples and the payload sample, and does not generate samples for other languages.

---

- [x-displayName](../../realm/content/api-docs/openapi-extensions/x-display-name.md)
- Use a human-friendly display name for a tag.

---

- [x-enumDescriptions](../../realm/content/api-docs/openapi-extensions/x-enum-descriptions.md)
- Add readable labels for enum values.

---

- x-explicitMappingOnly
- Set on a schema with a `discriminator` to list only the schemas named in `discriminator.mapping`, and hide schemas matched implicitly.

---

- x-logo
- Display a logo at the top of the sidebar.
  Set `info.x-logo` with `url` (image URL), and optionally `href` (link target, defaults to `info.contact.url`), `altText`, and `backgroundColor`.

---

- [x-mcp](../../realm/content/api-docs/openapi-extensions/x-mcp.md)
- Document MCP servers and tools, and dsiplay the connect buttons in the page header.

---

- [x-summary](../../realm/content/api-docs/openapi-extensions/x-summary.md)
- Add a short summary of a response.

---

- [x-tagGroups](../../realm/content/api-docs/openapi-extensions/x-tag-groups.md)
- Group tags in the sidebar.

---

- [x-tags](../../realm/content/api-docs/openapi-extensions/x-tags.md)
- Add individual schemas to navigation sections alongside operations.

---

- [x-traitTag](../../realm/content/api-docs/openapi-extensions/x-trait-tag.md)
- Mark tags that label operations instead of grouping them.

---

- [x-webhooks](../../realm/content/api-docs/openapi-extensions/x-webhooks.md)
- Add webhooks to OpenAPI 3.0 and older descriptions.

{% /table %}

### Swagger 2.0 extensions

Redoc CE converts Swagger 2.0 descriptions to OpenAPI 3 before rendering, and reads the following extensions on the way:

- [x-examples](../../realm/content/api-docs/openapi-extensions/x-examples.md): add examples to a request, like the OpenAPI 3 `example` and `examples` keywords.
- [x-nullable](../../realm/content/api-docs/openapi-extensions/x-nullable.md): mark a schema as nullable.
- [x-servers](../../realm/content/api-docs/openapi-extensions/x-servers.md): add one or more target hosts for the API.

## AsyncAPI extensions

{% table %}

- Extension
- Description

---

- [x-additionalPropertiesName](../../realm/content/api-docs/asyncapi-extensions/x-additional-properties-name.md)
- Display a field name for an `additionalProperties` description.

---

- [x-badges](../../realm/content/api-docs/asyncapi-extensions/x-badges.md)
- Add visible badges to operations.

---

- x-displayName
- Use a human-friendly display name for a tag.

---

- [x-enumDescriptions](../../realm/content/api-docs/asyncapi-extensions/x-enum-descriptions.md)
- Add readable labels for enum values.

---

- x-logo
- Display a logo at the top of the sidebar, with the same `info.x-logo` fields as for OpenAPI.

---

- [x-tagGroups](../../realm/content/api-docs/asyncapi-extensions/x-tag-groups.md)
- Group tags in the sidebar.

{% /table %}

## GraphQL

GraphQL schemas have no extension mechanism.
Redoc CE renders the schema definition language as is, and takes the overview metadata from the [`info` option](./config.md#graphql-options).

## Security definitions injection

Redoc CE 2.x supported the `<!-- Redoc-Inject: <security-definitions> -->` comment in `info.description` to place the security schemes section.
Redoc CE 3.x does not read this comment.
Each operation displays its security requirements with a **View security details** action instead, so no placement in the description is needed.

## Resources

- **[OpenAPI extensions](../../realm/content/api-docs/openapi-extensions/index.md)** - Detailed reference for every extension, including examples
- **[AsyncAPI extensions](../../realm/content/api-docs/asyncapi-extensions/index.md)** - Detailed reference for the AsyncAPI extensions
- **[Configure Redoc CE](./config.md)** - Display custom extensions with `showExtensions`, and see every other option
- **[Migration from Redoc CE 2.x to 3.x](./config-migration.md)** - Other changes between the versions
