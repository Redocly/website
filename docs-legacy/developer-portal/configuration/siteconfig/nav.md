---
excludeFromSearch: true
---

# `nav`

## Usage

To display a top navigation bar in your portal, you must define its contents in the `nav` section. Add it to the top level of the `siteConfig.yaml` file.

Items are displayed in the navbar in the same order as they are defined in the `nav` section. Every item must have a name (defined by `label`) and a link (either to a page in the portal project or to an external resource).

{% admonition type="info" name="Related options" %}
Learn how to theme the portal navbar in the [customization guide](../../guides/navbars-footers.md).
{% /admonition %}


## Options

| Option  | Description |
| ------------- | ------------- |
| `external` | When set to `true`, opens navbar items in a new browser tab or window. This is an optional property that you can use with `page` and `href` links. |
| `href` | Defines the link to an external resource (`href: 'https://example.com/docs'`). Enclose the links in single quotation marks. |
| `icon` | Defines the path to a custom icon displayed next to the navbar item name (`icon: developer-portal/images/home-icon.png`). This is an optional property that you can use with `page` and `href` links. |
| `label` | Sets the name for the navbar item (`label: Start page`). |
| `page` | Defines the link to a page in the developer portal project (`page: developer-portal/introduction.md`). |
| `permission` | When [using RBAC](../rbac.md#set-permissions-for-navigation-items) in the developer portal, this optional property sets the permission for displaying the navbar item. User roles with the matching permission(s) are able to see the item in the navbar when they log into the portal. |
| `search` | When set to `true`, enables the search functionality in the portal and displays the search input field in the navbar. Placing the `search` key at the end of the `nav` section displays the search input field to the rightmost side of the navbar. Place it at the beginning of the `nav` section to display it on the left side of the navbar. If you remove the `search` key from the `nav` section or set it to `false`, the search functionality in the portal is disabled. |


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
nav:
  - label: Home
    page: developer-portal/home.md
  - label: Example with an icon
    page: developer-portal/example.md
    icon: images/page-icon.png
  - label: Example in a new tab
    page: developer-portal/test.md
    external: true
  - label: External link
    href: 'https://example.com/docs'
  - search: true
```
