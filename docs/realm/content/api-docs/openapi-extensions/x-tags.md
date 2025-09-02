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

- **[Schema definitions tag name configuration](../../../config/openapi/schema-definitions-tag-name.md)** - Add all schemas to a single tag for consolidated schema documentation organization
- **[x-displayName extension](./x-display-name.md)** - Give tags better human-readable display names for improved navigation and user experience
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
