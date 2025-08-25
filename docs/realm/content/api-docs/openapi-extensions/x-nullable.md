# OpenAPI extension: `x-nullable`

{% admonition type="warning" name="Compatibility warning" %}

This specification extension is supported only in OpenAPI 2.0.
In OpenAPI 3.0, use `nullable`.
In OpenAPI 3.1, use an array of types and include `null` in the list.

{% /admonition %}

Use `x-nullable` in your OpenAPI 2.0 documents to mark schemas with the label `Nullable` in the API documentation. This indicates that the value of a particular property may be `null`. Add it to the `schema` OpenAPI object.

## Location

Use the `x-nullable` extension in an Schema object.

## Options

{% table %}

* Option
* Type
* Description

---

* x-nullable
* boolean
* Marks schema as a nullable.

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

- Check out the [Migration notes from OpenAPI 3.0 to 3.1](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0) to learn more about the nullable changes in those versions.
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
