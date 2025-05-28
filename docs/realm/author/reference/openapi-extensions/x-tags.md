# OpenAPI extension: `x-tags`

Redoc uses tags as navigation groupings, so operations with the same tag are shown in the same section of the API reference documentation.
The `x-tags` extension allows you to tag schema objects in your API description.
These schema objects appear alongside the operations in the page.

This approach can be useful as a way to provide data structure documentation independent of specific API endpoints.

## Location

The `x-tags` extension can be added to any schema object.

## Options

{% table %}

- Option
- Type
- Description

---

- x-tags
- [ string ]
- A list of tag names to add this schema to.

{% /table %}

## Examples

The following example shows adding `x-tags` to a schema object with a value of `Schemas`.
All the schema objects with the same `x-tags` entry will show up in the same section in the API reference documentation.

```yaml
components:
  schemas:
    MuseumDailyHours:
      description: Daily operating hours for the museum.
      x-tags:
        - Schemas
      type: object
      ...
```

You can use existing tags to show schemas alongside operations in your documentation, or add a new tag to the top-level `tags` array in your API description and use that new tag.

## Resources

- Add all schemas to a single tag with [schemaDefinitionsTagName](../../../config/openapi/schema-definitions-tag-name.md)
- Give the tags better display names using [x-displayNames](./x-display-name.md).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).


