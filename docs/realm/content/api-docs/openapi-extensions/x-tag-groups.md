# OpenAPI extension: `x-tagGroups`

Redoc uses tags as navigation groupings, so operations with the same tag are shown in the same section of the API reference documentation.
The `x-tagGroups` feature adds an additional layer of navigation above the tags, allowing more granularity.
Declare each group with a name, and add the tags to the group.

{% admonition type="warning" name="Group all tags" %}
The `x-tagGroups` feature forms the top level navigation for the API documentation.
Any tag that is not in a group will not be included in the output.

**Add all tags to a group in order to include them in the documentation.**
{% /admonition %}

Adding a navigation layer using `x-tagGroups` is particularly useful in making larger or combined APIs' documentation more navigable for users.

## Location

The `x-tagGroups` extension is used at the top level of an OpenAPI description.

## Options

{% table %}

- Option
- Type
- Description

---

- x-tagGroups
- [ [TagGroup Object](#taggroup-object) ]
- A list of tag groups.

{% /table %}

### TagGroup object

{% table %}

- Option
- Type
- Description

---

- name
- string
- The display name for the tag, used in the navigation bar and as a section heading.

---

- tags
- [ string ]
- List of tags to include in this group.

{% /table %}

## Examples

The following example shows the beginning of an OpenAPI description, with a list of tags.
The `x-tagGroups` extension is used to separate the color-related and size-related operations.

```yaml
openapi: 3.1.0
tags:
 - Red
 - Tiny
 - Huge
 - Purple
 - Orange
x-tagGroups:
 - name: Size
   tags:
    - Huge
    - Tiny
 - name: Color
   tags:
    - Orange
    - Purple
    - Red
```

The navigation in the API reference documentation using this `x-tagGroups` configuration will have the following structure:

- Size
  - Huge
  - Tiny
- Color
  - Orange
  - Purple
  - Red

## Resources

- **[x-displayName extension](./x-display-name.md)** - Give tags better human-readable display names for improved navigation and user experience
- **[x-traitTag extension](./x-trait-tag.md)** - Mark tags as traits rather than navigation elements for specialized tagging functionality
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
