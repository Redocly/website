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
  Default: `false`.

{% /table %}

## Examples

The following configuration hides the sidebar.

```yaml
sidebar:
  hide: true
```

## Related options

- Configure the [footer](./footer.md)
- Configure the [navbar](./navbar.md)

## Resources

For more information about sidebars:

- Learn more about [navigation in Redocly projects](../navigation/navigation.md)
- Read the [navigation elements overview](../navigation/index.md) for guidance on all navigation components
- The [sidebars.yaml reference](../navigation/sidebars.md) shows the sidebar configuration syntax and examples

