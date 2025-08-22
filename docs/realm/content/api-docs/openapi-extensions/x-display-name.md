# OpenAPI extension: `x-displayName`


Tags are used in Redoc to group API endpoints into logical sets for navigation purposes.
Use `x-displayName` to give your tag a better presentation in the navigation bar on the left.

Adjusting the display name is very useful where the tags are either too long to be readable in the left-hand bar, or where the tag isn't a human-readable string.
Making the improved tag details part of the OpenAPI description means that the information can be used everywhere that the OpenAPI file is used.

## Location

Use the `x-displayName` extension in a Tag declaration.

## Options

{% table %}

- Option
- Type
- Description

---

- x-displayName
- string
- The text to use when presenting this tag as a navigation item and section header.
  Default is to use the tag name.

{% /table %}

## Examples

The following configuration renames the short tag name `finserv` to "Finance Services":

```yaml
tags:
  - name: finserv
    description: Operations for the Finance Services department.
    x-displayName: Finance Services
```

## Resources

- Group the tags into sections with [x-tagGroups](./x-tag-groups.md).
- Mark tags as traits rather than navigation with [x-traitTag](./x-trait-tag.md).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
