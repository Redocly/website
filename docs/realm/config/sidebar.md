---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
keywords:
  includes:
    - sidebar
    - sidebars
description: Set the visibility of the sidebar in your project.
---
# `sidebar`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Set the visibility of the sidebar in your project.
The sidebar is the area on the left of your project that contains links to pages in your project.
The options here allow you to hide it if your site design doesn't require a sidebar.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the sidebar should be hidden.
  Default value: `false`.

{% /table %}

## Examples

The following configuration hides the sidebar.

```yaml
sidebar:
  hide: true
```

## Resources

- **[Sidebar configuration guide](../navigation/sidebars.md)** - Complete guide to configuring sidebar navigation structure and content organization for optimal user experience
- **[Navigation elements overview](../navigation/index.md)** - Explore navigation components available for your project
- **[Footer configuration](./footer.md)** - Configure footer settings and appearance to complement sidebar design and overall site navigation
- **[Navbar configuration](./navbar.md)** - Configure navbar settings and navigation elements to work seamlessly with your sidebar configuration

