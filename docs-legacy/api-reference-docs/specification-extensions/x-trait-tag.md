# x-traitTag

## Usage

Use `x-traitTag` to list a tag in the navigation sidebar as a single item, without any subitems (operations). Add it to the `tag` OpenAPI object.

When a tag has `x-traitTag` set to `true`, it appears without any content (subitems, operations) in the middle panel. However, you can add content to its `description` field, which is rendered in the middle panel. This is useful for handling common information like pagination and rate limits, as you can provide a detailed description for the tag using external Markdown files.

| Field Name |  Type   | Description                                                                                                                                                                                                                             |
| :--------- | :-----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-traitTag | boolean | In OpenAPI, operations can have multiple tags. This property distinguishes between tags that are used to group operations (default) from tags that are used to mark an operation with a certain trait (by setting the value to `true`). |

## Examples
{% tabs %}
```yaml YAML
openapi: '3.0'
info: ...
tags:
  - name: sample-123
    description: Example description
  - name: Pagination
    description: Pagination description (can use **markdown** _syntax_)
    x-traitTag: true
```
```json JSON
{
  "name": "Pagination",
  "description": "Pagination description (can use markdown syntax)",
  "x-traitTag": true
}
```
{% /tabs %}

### In Reference docs

![Trait tag in the sidebar and in the middle panel](./images/x-trait-tag.png)

{% admonition type="info" name="Related options" %}

Use [x-displayName](x-display-name.md) and [x-tagGroups](x-tag-groups.md) to further customize tags.

{% /admonition %}
