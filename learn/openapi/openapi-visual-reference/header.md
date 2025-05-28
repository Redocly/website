# Header Object

The header object is used to describe a response header in the headers map.

These are different from request headers which are types of parameters in OpenAPI.
The main differences are:

1. `name` MUST NOT be specified, it is given in the corresponding headers map.
1. `in` MUST NOT be specified, it is implicitly in header.
1. All traits that are affected by the location MUST be applicable to a location of header (for example, `style`).

| Field name | Type | Description |
|---|:---:|---|
| description | string | A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich text representation. |
| required | boolean | Determines whether this parameter is mandatory. Its default value is `false`. |
| deprecated | boolean | Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false. |
| schema | [Schema Object](./schemas.md) | The schema defining the type used for the header. |
| example | Any | Example of the header's potential value. The example SHOULD match the specified schema and encoding properties if present. The `example` field is mutually exclusive of the `examples` field. Furthermore, if referencing a `schema` that contains an example, the example value SHALL _override_ the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary. |
| examples | [Example Object](./example.md) | Examples of the header's potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The `examples` field is mutually exclusive of the `example` field. Furthermore, if referencing a `schema` that contains an example, the `examples` value SHALL _override_ the example provided by the schema.|


## Visual

```yaml
responses:
  '200':
    description: OK
    headers:
      Pagination-Count:
        description: The count of items in the collection.
        schema:
          type: integer
```

![response header](./images/response-header.png)

## Types

- `NamedHeaders` (for the [Components Object](./components.md))
- `Header`

```js
const Header: NodeType = {
  properties: {
    description: { type: 'string' },
    required: { type: 'boolean' },
    deprecated: { type: 'boolean' },
    allowEmptyValue: { type: 'boolean' },
    style: {
      enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
    },
    explode: { type: 'boolean' },
    allowReserved: { type: 'boolean' },
    schema: 'Schema',
    example: { isExample: true },
    examples: mapOf('Example'),
    content: 'MediaTypeMap',
  },
};
```
