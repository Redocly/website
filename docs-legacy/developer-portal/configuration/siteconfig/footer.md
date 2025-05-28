---
excludeFromSearch: true
---

# `footer`

## Usage

To display a footer in your portal, you must define its contents in the `footer` section. Add it to the top level of the `siteConfig.yaml` file.

Items are displayed in the footer in the same order as they are defined in the `footer` section. Every item must have a name (defined by `label`) and a link (either to a page in the portal project or to an external resource). Footer items should be grouped into columns. Each `group` is displayed as one column.


{% admonition type="info" name="Related options" %}
Learn how to theme the portal footer in the [customization guide](../../guides/navbars-footers.md).
{% /admonition %}


## Options

| Option  | Description |
| ------------- | ------------- |
| `columns` | Applies the column-style formatting to the links in the footer. The `columns` section must contain at least one `group`. Each `group` must contain at least one item in the `items` list. Each `group` is displayed as one column, from left to right with links in the same order in which they are listed under `items`. |
| `copyrightText` | Sets the optional copyright text displayed at the bottom of the footer. |
| `external` | When set to `true`, opens footer items in a new browser tab or window. This is an optional property that you can use with `page` and `href` links. |
| `href` | Defines the link to an external resource (`href: 'https://example.com/docs'`). Enclose the links in single quotation marks. |
| `label` | Sets the name for the footer item (`label: Start page`). |
| `page` | Defines the link to a page in the developer portal project (`page: developer-portal/introduction.md`). |
| `permission` | When [using RBAC](../rbac.md#set-permissions-for-navigation-items) in the developer portal, this optional property sets the permission for displaying the footer item. User roles with the matching permission(s) are able to see the item in the footer when they log into the portal. The `permission` property can be set for individual footer items or for an entire `group` in the `columns` section. |


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
footer:
  copyrightText: Copyright © Example page
  columns:
    - group: Legal
      permission: read-docs
      items:
        - label: Terms of Use
          href: 'https://example.com/terms'
        - label: Privacy Notice
          href: 'https://example.com/privacy'
          external: true
    - group: Support
      items:
        - label: FAQ
          page: developer-portal/faq.md
          permission: read-docs
        - label: Contact us
          page: developer-portal/contact.mdx
          external: true
```
