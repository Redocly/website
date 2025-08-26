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
---
# `sidebar`

The sidebar is the area on the left of your project that contains navigation.
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
- **[Navigation in Redocly projects](../navigation/navigation.md)** - Learn about navigation concepts and implementation strategies for effective site organization
- **[Navigation elements overview](../navigation/index.md)** - Complete guidance on all navigation components and their configuration for optimal user experience
- **[Footer configuration](./footer.md)** - Configure footer settings and appearance to complement sidebar design and overall site navigation
- **[Navbar configuration](./navbar.md)** - Configure navbar settings and navigation elements to work seamlessly with your sidebar configuration

