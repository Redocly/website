# Specification extensions

While the OpenAPI specification tries to accommodate most use cases, additional data can be used to extend the specification and augment its functionality. These additional properties are known as specification extensions (previously called "vendor extensions"). The extension properties are implemented as patterned fields that start with the `x-` naming convention.

Redocly has implemented a number of specification extensions to help you enrich your API documentation and adapt your OpenAPI definitions to different scenarios.

The specification extensions are grouped according to the element(s) of the OpenAPI specification that they extend. Specification extensions can only be used in the sections of your OpenAPI definition that support them - for example, you can't use an extension that modifies the `info` object inside the `tag` object.

Select the name of a specification extension in the list to read more on how to use it.

## Supported specification extensions by object

### OAS root/Swagger object

Extend the OpenAPI [Root Object](https://spec.openapis.org/oas/v3.1.0#openapi-object).

- [x-servers](./specification-extensions/x-servers.md) - OpenAPI 2.0 only

- [x-tagGroups](./specification-extensions/x-tag-groups.md)

- [x-webhooks](./specification-extensions/x-webhooks.md) - OpenAPI 2.0 and 3.0 only

### Info object

Extend the OpenAPI [Info Object](https://spec.openapis.org/oas/v3.1.0#info-object).

- [x-logo](./specification-extensions/x-logo.md)

### Tag object

Extend the OpenAPI [Tag Object](https://spec.openapis.org/oas/v3.1.0#tag-object).

- [x-displayName](./specification-extensions/x-display-name.md)

- [x-traitTag](./specification-extensions/x-trait-tag.md)

### Operation object

Extend the OpenAPI [Operation Object](https://spec.openapis.org/oas/v3.1.0#operation-object).

- [x-codeSamples](./specification-extensions/x-code-samples.md)

- [x-hideTryItPanel](./specification-extensions/x-hideTryItPanel.md)

- [x-meta](./specification-extensions/x-meta.md)

### Parameter object

Extend the OpenAPI [Parameter Object](https://spec.openapis.org/oas/v3.1.0#parameter-object).

- [x-example and x-examples](./specification-extensions/x-examples.md) - OpenAPI 2.0 only

### Response object

Extend the OpenAPI [Response Object](https://spec.openapis.org/oas/v3.1.0#response-object).

- [x-summary](./specification-extensions/x-summary.md)

### Schema object

Extend the OpenAPI [Schema Object](https://spec.openapis.org/oas/v3.1.0#schema-object).

- [x-additionalPropertiesName](./specification-extensions/x-additional-properties-name.md)

- [x-enumDescriptions](./specification-extensions/x-enum-descriptions.md)

- [x-nullable](./specification-extensions/x-nullable.md) - OpenAPI 2.0 only

- [x-tags](./specification-extensions/x-tags.md)

### Security schemes object

Extend the OpenAPI [Security Scheme Object](https://spec.openapis.org/oas/v3.1.0#security-scheme-object).

- [x-defaultClientId](./specification-extensions/x-default-clientid.md)

- [x-usePkce](./specification-extensions/x-use-pkce.md)

{% admonition type="info" name="Tip" %}
Learn about how to use specification extensions for other purposes such as [hiding an API path, operation, or schema property](../../docs/cli/guides/hide-apis).
{% /admonition %}
