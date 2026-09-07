# OpenAPI extension: `x-traitTag`


Tags are used in Redoc to group operations together to help users to navigate the API reference.
Mark the tags that serve a purpose other than navigation as "traits". These tags:

- are displayed at the end of the documentation, including in the navigation
- show up with their description text
- don't include operations in their section

## Location

Apply the `x-traitTag` to any Tag item to indicate it is a trait tag rather than a navigation tag.

## Options

{% table %}

- Option
- Type
- Description

---

- x-traitTag
- boolean
- Set to `true` to indicate that this tag is not used for the purpose of navigation grouping.
  Default is `false`.

{% /table %}

## Examples

Consider an OpenAPI description where operations that return collections are tagged "Collection" in addition to their section tags.
The following example marks the Collection tag as a trait.
This displays the tag's heading and description without repeating the endpoints in that section:

```yaml
openapi: 3.1.0
tags:
  - name: Users
  - name: Orders
  - name: Collection
    description: |
      All collections are returned with the data in a field named `payload`, using JSON format.
      Use the `page` query parameter to advance between pages (default value is 1).
    x-traitTag: true 
```

## Resources

- **[x-displayName extension](./x-display-name.md)** - Give tags better human-readable display names for improved navigation and user experience
- **[x-tagGroups extension](./x-tag-groups.md)** - Group tags into logical sections for improved navigation structure and organization
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
