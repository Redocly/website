# Localization (l10n)

The localization feature enables you to serve your project in multiple languages.
You can fully localize both the content of the project pages, and the labels of the UI components.

## Supported content types

You can include translations for the following types of content:

- **Markdown, OpenAPI, and GraphQL documents:** Content in Markdown, YAML, JSON, or SDL documents.
- **Navbar, footer, and sidebar labels:** Labels for items in the top navigation, side navigation, or footer navigation.
- **Base UI components:** Labels for the components that come bundled with the project, for example, the Login button label or the search input placeholder.
- **Content on React pages:** Content such as headers or tile labels included on React pages.

## Localization folder structure

To store the translated files, your project must have a `@l10n` folder at the root, with a subfolder for each additional supported language.
The files outside the `@l10n` folder, except for the React files, should be in the default language.

The following structure presents a project with a single content file, `index.md`:

```treeview
├── @l10n/
│   └── es-ES/
│       ├── index.md
│       └── translations.yaml
├── index.md
├── redocly.yaml
└── translations.yaml
```

In this example, the project supports Spanish localization and includes a `index.md` translated into Spanish in its language subfolder.

To be able to switch between languages in your project, target language files in the localization folders **must** have the same structure as the source language files in the root directory.
Both `index.md` files are in the same position relative to their parent folder, in this case, the root directory and `es-ES`.
You can think of each language subfolder as the "root directory" of each localization.

### Language subfolder naming conventions

Language subfolder names can contain only letters, numbers, and `-` or `_` symbols.
While you can name the subfolders however you want, Redocly recommends using
[IETF language tags](https://www.rfc-editor.org/rfc/rfc5646.html) like `en` or `en-US`.

The most commonly used language tags consist of a language code and two optional subtags.

* language code: two-letter lowercase language codes from [ISO 639-1](https://www.loc.gov/standards/iso639-2/php/English_list.php) standard: `en`, `uk`, `ar`, `es`, `ja`.
* script subtag: four-letter script code from [ISO-15924](https://www.unicode.org/iso15924/codelists.html): `Latn`, `Cyrl`, `Arab`, `Hans`, `Hant`.
* region subtag: two-letter uppercase country or region codes from [ISO 3166-1](https://www.iso.org/obp/ui/#search): `US`, `UA`, `ES`, `JP`.

The best practice is to use as few tags as necessary to differentiate between localization languages.

## `translations.yaml` file

A `translations.yaml` file in each language subfolder and in the root directory stores values of translation keys for base UI components, navigation, and React pages.
If your default language is US English, the translation keys for base UI components are already built in, and you do not have to include them in the `translations.yaml` file in the root directory.

## Default values of translation keys

When a certain language does not have a translation key defined, the project uses a translation key from the default language.
If the default language does not have this key defined, the project uses a default value.

All the default UI components have default labels defined out-of-the-box.

For React components, the default value is specified as a second argument when calling the `translate` function.

For navbar, footer, and sidebars links, `label`, `group`, and `separator` properties serve as default values.

If a Markdown, OpenAPI, or GraphQL page is not translated to one of the languages, the content of the page in the default language is used.

{% admonition type="warning" %}
If a Markdown, OpenAPI, or GraphQL page is present in a language subfolder inside  `@l10n`, but is missing for the default language, the page is ignored and is not included in the published project.
{% /admonition %}


## Resources

* Configure language support for your project by following the steps in the [Configure localization](../../author/how-to/config-l10n/index.md) how-to documentation.
