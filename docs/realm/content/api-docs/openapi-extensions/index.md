# OpenAPI extensions

OpenAPI supports [extensions to the specification](https://spec.openapis.org/oas/v3.1.0#specification-extensions).

The list of extensions supported in OpenAPI by Redoc is as follows:

- [x-additionalPropertiesName](./x-additional-properties-name.md) - Display a field name for an `additionalProperties` description.
- [x-assertionType](x-assertion-type.md) - Specify the OAuth Flow assertion type for the operation.
- [x-badges](./x-badges.md) - Add visible badges as indicators to API operations.
- [x-codeSamples](./x-code-samples.md) - Provide the code sample to display for an operation.
- [x-displayName](./x-display-name.md) - Use a human-friendly display name for a tag.
- [x-enumDescriptions](./x-enum-descriptions.md) - Readable labels for enum values.
- [x-hideReplay](./x-hide-replay.md) - Disable the Replay for the specific operation.
= [x-mcp](./x-mcp.md) - Document MCP servers and tools.
- [x-metadata](./x-metadata.md) - Add custom metadata at the top of the info section.
- [x-rbac](x-rbac.md) - Control access to OpenAPI objects.
- [x-traitTag](./x-trait-tag.md) - Indicate tags that label operations rather than grouping them.
- [x-tagGroups](./x-tag-groups.md) - Higher-level grouping for tags, used in the sidebar.
- [x-tags](./x-tags.md) - Add individual schemas to navigation sections alongside operations.
- [x-summary](x-summary.md) - Add short summary of the response.
- [x-webhooks](x-webhooks.md) - Add webhooks support to older API description (3.0 or earlier).
- [x-usePkce](./x-use-pkce.md) - Enable Proof Key for Code Exchange (PKCE) for the Oauth2 or OpenID Connect authorization code flow.

Additionally, the following extensions are supported for the older OpenAPI 2.x format:

- [x-examples](./x-examples.md) - Add custom examples to a request (make OpenAPI 3 `example(s)` keywords available)
- [x-nullable](./x-nullable.md) - Mark schemas as nullable in the API documentation.
- [x-servers](./x-servers.md) - Add one or more target hosts for the API.


## Resources

- **[Add OpenAPI definitions to your project](../add-openapi-docs.md)** - Complete guide for integrating OpenAPI documentation into your Redocly project with extensions support
