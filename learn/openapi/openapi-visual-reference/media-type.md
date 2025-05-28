# Media Type Object

The Media Type Object is one of the important building blocks of OpenAPI.
While it is directly used in components, it is used throughout the specification by various components (`parameters`, `requestBodies`, `responses`, `callbacks`, `pathItems`) as well as `paths` and `webhooks`.

The Media Type Object is used within named maps where the key is typically the media type, and the Media Type Object is the value.

| Field name | Type | Description |
|---|:---:|---|
| schema | [Schema Object](./schemas.md) | The schema defining the content of the request, response, or parameter. |
| example | Any | Example of the media type. The example object SHOULD be in the correct format as specified by the media type. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a schema which contains an example, the `example` value SHALL _override_ the example provided by the schema.|
| examples | Map[ string, [Example Object](./example.md) \| Reference Object] | Examples of the media type. Each example object SHOULD match the media type and specified schema if present. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a schema which contains an example, the `examples` value SHALL _override_ the example provided by the schema.|
| encoding | Map[ string, [Encoding Object](./encoding.md)] | A map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. The encoding object SHALL only apply to `requestBody` objects when the media type is `multipart` or `application/x-www-form-urlencoded`.|

{% admonition type="info" name="`example` vs. `examples`" %}
The `example` and `examples` fields are mutually exclusive.
Redocly prefers the `examples` field as it allows for:
- multiple examples
- extra metadata such as an example name and description
{% /admonition %}

## Visuals

Visual examples are inside of the respective components documentation.

## Types

- `MediaTypesMap`
- `MediaType`

```ts
const MediaType: NodeType = {
  properties: {
    schema: 'Schema',
    example: { isExample: true },
    examples: mapOf('Example'),
    encoding: mapOf('Encoding'),
  },
};
```
