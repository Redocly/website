# Configure sidebar groups

Use groups to organize related content into a nested navigation structure in your sidebar. Groups can contain all supported [sidebar elements](sidebar.md), including other groups.

## Before you begin

Make sure you have the following before you begin:

- A {% $env.PUBLIC_PORTAL_NAME %} project with enough Markdown files to organize into groups

## Add group to sidebar

To add a group to the sidebar:

1. Add a `group` object to your `sidebars.yaml` file.
2. Use the `items` property to add `page` entries, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  items:
  - page: policies/about-us.md
    label: About the Museum
  - page: policies/faq.md
    label: Museum FAQ
```

Groups can also contain other sidebar elements or other nested groups, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  items:
  - page: policies/about-us.md
    label: About the Museum
  - page: policies/faq.md
    label: Museum FAQ
  - group: External Resources
    items:
    - href: https://access.si.edu/museum-professionals
      label: Smithsonian Resources
    - href: https://www.aam-us.org/topic/resource-library/
      label: American Alliance of Museums
```

## Configure navigation behavior

Groups can optionally open pages when clicked. There are two configurations:
- Navigate to a group's landing page.
- Navigate to the first entry in the group.

### Open group landing page

When a page is assigned to a group, clicking the group expands the group's elements and *opens that group's page*.

Set a group's page using the `page` property on the `group` object, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  page: policies/index.md
  items:
  - page: policies/about-us.md
    label: About the Museum
  - page: policies/faq.md
    label: Museum FAQ
```

In this example, clicking **Museum Policies** in the sidebar:
- Expands the group's elements
- **Museum Policies** is focused in sidebar
- Opens _example.com/policies_

However, if the file is named something other than _index.md_, then the filename resolves to the url, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  page: policies/about-us.md
  items:
  - page: policies/faq.md
    label: Museum FAQ
```

In this example, clicking the **Museum Policies** in the sidebar:
- Expands the group's elements
- **Museum Policies** is focused in sidebar
- Opens _example.com/policies/about-us_

### Open first page in group

Groups can be configured so that clicking the group expands the group's elements and _opens the first page_ in the group.

Set this group behavior using the `selectFirstItemOnExpand` property, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  selectFirstItemOnExpand: true
  items:
  - page: policies/about-us.md
    label: About the Museum
  - page: policies/faq.md
    label: Museum FAQ
```

In this example, clicking the **Museum Policies** in the sidebar:
- Expands the group's elements
- Sidebar focus drops to **About the Museum** entry
- Opens _example.com/policies/about-us_

## Configure expand behavior

Groups are "expandable", meaning they can expand and collapse to reveal or hide their elements. That behavior can be configured.

Set the `expanded` property to change a group's expand behavior, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Policies
  expanded: true
  items:
  - page: policies/about-us.md
    label: About the Museum
  - page: policies/faq.md
    label: Museum FAQ
```

In this example, the **Museum Policies** group is automatically expanded when the page opens.

There are three settings available: `true`, `false`, and `always`. Learn more about them on the [sidebars reference page](../../reference/sidebars.md).

## Organize with separators

Separators are static sidebar entries used for organizing your sidebar content into distinct sections They can be especially useful with groups.

### Add a text separator

Text separators add custom text to the sidebar and work well as section titles.

Add text separators to your groups using the `separator` option, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Exhibits
  items:
  - separator: Paintings
  - page: exhibits/van-gogh.md
  - page: exhibits/frida-kahlo.md
  - separator: Fossils
  - page: exhibits/fossils/cenozoic-era.md
  - page: exhibits/fossils/mesozoic-era.md 
```

### Add a line separator

Line separators add horizontal line breaks between items. They can be added as direct sidebar entries or a property on a group.

Add line separators as entries, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Exhibits
  items:
  - separator: Paintings
  - page: exhibits/van-gogh.md
  - page: exhibits/frida-kahlo.md
  - separatorLine: true
  - separator: Fossils
  - page: exhibits/fossils/cenozoic-era.md
  - page: exhibits/fossils/mesozoic-era.md 
```

Add line separators to groups, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Museum Exhibits
  separatorLine: true
  items:
  - group: Paintings
    separatorLine: true
    items: 
    - page: exhibits/van-gogh.md
    - page: exhibits/frida-kahlo.md
  - group: Fossils
    items:
    - page: exhibits/fossils/cenozoic-era.md
    - page: exhibits/fossils/mesozoic-era.md 
```

## Related how-tos

* [Configure navigation on the sidebar](./sidebar.md)
* Controlling group-level permissions using [RBAC in the sidebar](../../../setup/how-to/rbac/links-and-groups-permissions.md#in-the-sidebar).

## Resources

* [Sidebar config reference](../../reference/sidebars.md)
