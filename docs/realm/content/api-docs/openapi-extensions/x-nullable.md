# OpenAPI extension: `x-nullable`

{% admonition type="warning" name="Compatibility warning" %}

This specification extension is supported only in OpenAPI 2.0.
In OpenAPI 3.0, use `nullable`.
In OpenAPI 3.1, use an array of types and include `null` in the list.

{% /admonition %}

Use `x-nullable` in your OpenAPI 2.0 documents to mark schemas with the label `Nullable` in the API documentation.
This indicates that the value of a particular property may be `null`.
Add it to the `schema` OpenAPI object.

## Location

Use the `x-nullable` extension in an Schema object.

## Options

{% table %}

- Option
- Type
- Description

---

- x-nullable
- boolean
- Marks schema as a nullable.

{% /table %}

## Examples

The following example show how to mark the `country` Schema as `nullable`.

```yaml
swagger: '2.0'
schemas:
  country:
    type: string
    description: Country of origin
    x-nullable: true
```

## Resources

- **[Migration notes from OpenAPI 3.0 to 3.1](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0)** - Learn about nullable changes and migration considerations between OpenAPI versions
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
