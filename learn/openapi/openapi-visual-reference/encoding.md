# Encoding Object


> A single encoding definition applied to a single schema property.

<details>
<summary>Excerpt from the OpenAPI 3.1 specification about the Encoding Object
</summary>

## Fixed Fields

Field Name | Type | Description
---|:---:|---
contentType | `string` | The Content-Type for encoding a specific property. Default value depends on the property type: for `object` - `application/json`;  for `array` – the default is defined based on the inner type; for all other cases the default is `application/octet-stream`. The value can be a specific media type (e.g. `application/json`), a wildcard media type (e.g. `image/*`), or a comma-separated list of the two types.
headers | Map[`string`, [Header Object](./header.md) \| [Reference Object](./reference.md)] | A map allowing additional information to be provided as headers, for example `Content-Disposition`.  `Content-Type` is described separately and SHALL be ignored in this section. This property SHALL be ignored if the request body media type is not a `multipart`.
style | `string` | Describes how a specific property value will be serialized depending on its type.  See [Parameter Object](./parameter.md) for details on the [`style`](./parameter.md) property. The behavior follows the same values as `query` parameters, including default values. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of `contentType` (implicit or explicit) SHALL be ignored.
explode | `boolean` | When this is true, property values of type `array` or `object` generate separate parameters for each value of the array, or key-value-pair of the map.  For other types of properties this property has no effect. When `style` is `form`, the default value is `true`. For all other styles, the default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of `contentType` (implicit or explicit) SHALL be ignored.
allowReserved | `boolean` | Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-2.2) `:/?#[]@!$&'()*+,;=` to be included without percent-encoding. The default value is `false`. This property SHALL be ignored if the request body media type is not `application/x-www-form-urlencoded` or `multipart/form-data`. If a value is explicitly defined, then the value of `contentType` (implicit or explicit) SHALL be ignored.

This object MAY be extended with [Specification Extensions](./specification-extensions.md).

### Encoding Object Example

```yaml
requestBody:
  content:
    multipart/form-data:
      schema:
        type: object
        properties:
          id:
            # default is text/plain
            type: string
            format: uuid
          address:
            # default is application/json
            type: object
            properties: {}
          historyMetadata:
            # need to declare XML format!
            description: metadata in XML format
            type: object
            properties: {}
          profileImage: {}
      encoding:
        historyMetadata:
          # require XML Content-Type in utf-8 encoding
          contentType: application/xml; charset=utf-8
        profileImage:
          # only accept png/jpeg
          contentType: image/png, image/jpeg
          headers:
            X-Rate-Limit-Limit:
              description: The number of allowed requests in the current period
              schema:
                type: integer
```

</details>

## Visuals

The encoding information is not presented visually.

## Types

- Encoding

```ts
const Encoding: NodeType = {
  properties: {
    contentType: { type: 'string' },
    headers: mapOf('Header'),
    style: {
      enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
    },
    explode: { type: 'boolean' },
    allowReserved: { type: 'boolean' },
  },
};
```
