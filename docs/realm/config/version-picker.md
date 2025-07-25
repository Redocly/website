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
# `versionPicker`

If you have multiple versions of content, you can organize that content into versioned folders (folder names must start with `@`) and that content is displayed with a version picker UI element that users can use to select the version.
You can also add a `versions.yaml` file to set the default version and specify which versions should display.

The `versionPicker` configuration option allows you to hide the version picker or include the version picker even on content that does not have multiple versions.

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the version picker should be hidden.
  Default: `false`.

---

- showForUnversioned
- boolean
- Specifies if the version picker should be shown even for content that does not have multiple versions.
  Default: `false`.

{% /table %}

## Examples

The following configuration hides the version picker:

```yaml
versionPicker:
  hide: true
```

The following configuration shows the version picker even for unversioned content.

```yaml
versionPicker:
  showForUnversioned: true
```

## Related options

- Configure a product picker for multiple products using the [products](./products.md) configuration reference documentation.
- See the options for adding a language picker to your project in the [l10n](./l10n.md) configuration reference documentation.

## Resources

- Learn how to configure your `versions.yaml` file to specify the default version to display in [Add multiple versions](../content/versions.md).
- Find out how to organize your project if you have multiple products in [Add multiple projects](../navigation/multiple-products.md).
- Add a language picker if you have your content translated into multiple languages by [localizing your project](../content/localization/index.md).
- Use [front matter](./front-matter-config.md) to toggle the visibility of the version picker on individual pages.
- Explore other [configuration options](./index.md) for your project.
