# Customize styles for a locale

You can apply styles to a specific locale by using a `:root` selector in the `@themes/styles.css` file.
This can be useful if you want to customize how certain UI elements look or change the font for a certain locale.

## Before you begin

Make sure you have the following:

- a Redocly project with a `l10n` folder containing your translated content organized into locales.
  See [l10n configuration](../../config/l10n.md) and [Add translated content](./localize-content.md) for more information.
- a `@theme/styles.css` file in your project.
  See [custom styles](../../branding/customize-styles.md) for more information.

## Add custom styles for a locale

To add styles that would only apply to a specific locale, you can use the `:root` element selector combined with a `lang` attribute selector in the `@theme/styles.css` file.
The `lang` attribute value should match the locale code from `redocly.yaml`.

For example, to add styles that would only apply to the Spanish locale, you can use the following:

```yaml {% title="redocly.yaml" %}
l10n:
  defaultLocale: en-US
  locales:
    - code: en-US
      name: English
    - code: es-ES
      name: Spanish
```

```css {% title="@theme/styles.css" %}
:root[lang="es-ES"] {
  /* styles for the Spanish locale */
}
```

## Resources

- **[Localization configuration](../../config/l10n.md)** - Configure language support, default locales, and localization behavior for your multi-language project
- **[Localize content files](./localize-content.md)** - Translate your documentation content into multiple languages with proper file organization and structure
- **[Custom styles guide](../../branding/customize-styles.md)** - Learn to customize your project's appearance using CSS variables and locale-specific styling techniques
