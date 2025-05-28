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
- Set to `true` to indicate that this tag is not used for the purpose of navigation grouping. Default is `false`.

{% /table %}

## Examples

For an OpenAPI description where the operations that return collections are tagged "Collection" in addition to their section/navigation tags, the following example marks the Collection tag as a trait, so that its heading and description are still shown to the user, but endpoints are not repeated there:

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

- Give the tags better display names using [x-displaNames](./x-display-name.md).
- Group the tags into sections with [x-tagGroups](./x-tag-groups.md).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).

