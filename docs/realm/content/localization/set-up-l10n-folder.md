# Set up folder structure for localization

To add localization support to your project, create a folder structure in your project that supports the different locales and add these locales to your `redocly.yaml` file.
Adding the locales to your `redocly.yaml` file configures your project to have a language picker that enables users to switch between the locales.

## Before you begin

Make sure you have the following:

- a `redocly.yaml` file at the root of your project

## Set up folders

For your Redocly project to recognize your translated content, you must place it in a specially named folder.
You can then organize your translated content within that folder by the different languages.

To set up localization folders:

1. Create a `@l10n` folder in the root directory of your project.
1. In the `@l10n` folder add a subfolder for each non-default language you want to support.
    Redocly recommends using [IETF language tags](./concept-l10n.md#language-subfolder-naming-conventions) to name the locale folders.
    For example, the following structure includes locale folders for Spanish, Spanish for the Latin America and Caribbean region, French, Japanese, and Chinese written in traditional and in simplified script:

    ```treeview {% title="Example folder structure for localization" %}
    your-awesome-project/
    ├── @l10n/
    │   ├── es-ES/
    │   ├── es-419/ 
    │   ├── fr/
    │   ├── ja/
    │   ├── zh-Hans/
    │   └── zh-Hant/
    ├── index.md
    └── redocly.yaml
    ```

## Configure locales in `redocly.yaml`

After you have organized your content into locale folders, define the labels for the languages you support.
These labels display in the language picker UI element.

To add the `l10n` configuration to the `redocly.yaml` file:

1. In `redocly.yaml` add the `l10n` key to the top level of the file.
    ```yaml {% title="redocly.yaml" %}
    l10n:
    ```
1. Add a `locales` option and inside it a map of `code` options with the values that are the names of your locale folders and the code for your project's default language. \
    The order of the language codes determines the order of languages in the language picker of your project.
    For example, the following configuration lists English first and Spanish last:
    ```yaml {% title="redocly.yaml" %}
    l10n:
      locales:
        - code: en
        - code: zh-Hans
        - code: zh-Hant
        - code: fr 
        - code: ja
        - code: es-419
        - code: es-ES
    ```
1. For each `code`, add a `name` option, and as its value, add the label you want to appear in the language picker, as in the following example:
    ```yaml {% title="redocly.yaml" %}
    l10n:
      locales:
        - code: en
          name: English
        - code: zh-Hans
          name: Chinese (Simplified)
        - code: zh-Hant
          name: Chinese (Traditional)
        - code: fr
          name: French
        - code: ja
          name: Japanese
        - code: es-419
          name: Spanish (Latin America)
        - code: es-ES
          name: Spanish (Spain)
    ```
1. Add the `defaultlocale` option with the value that is the code of the default language in your project.
   For example, the following configuration sets the default language for the project as English:
    ```yaml {% title="redocly.yaml" %}
    l10n:
      defaultLocale: en
      locales:
        - code: en
          name: English
        - code: zh-Hans
          name: Chinese (Simplified)
        - code: zh-Hant
          name: Chinese (Traditional)
        - code: fr
          name: French
        - code: ja
          name: Japanese
        - code: es-419
          name: Spanish (Latin America)
        - code: es-ES
          name: Spanish (Spain)
    ```

## Resources

* Find the next step to add localization to your project in [Configure localization](./index.md).
* Learn how to localize the UI labels in your project in [Localize labels using translation keys](./localize-labels.md)
