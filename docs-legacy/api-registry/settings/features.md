---
excludeFromSearch: true
---

# Features

Redocly automatically builds API documentation for all API versions in the registry.
The **Features** page lets you configure features related to the appearance and behavior of your API docs.

## Choose the API docs version

To change the product version used for generating API documentation, select the **Redocly API Reference Version** dropdown.

In the dropdown, you can choose between the latest and legacy versions.

The [Redocly Reference 2.0 migration guide](/docs-legacy/api-reference-docs/guides/migration-guide-2-0.md) provides a good overview of the differences between those versions.

## Use the Live configuration editor

The **Features** page provides a limited UI with customization options for your API docs.
If you want to configure your API docs in more depth, select the **Configuration** button to access the _Live configuration editor_.

In the editor, you can use any of the supported options from the [`theme.openapi` schema](/docs-legacy/api-reference-docs/configuration/functionality.md).

Before saving your changes in the editor, you can select the **Preview** button to check what the documentation will look like when you changes are applied.

Select **Save** to apply your changes and trigger a new build.

The changes you make in the editor are merged with any existing settings in the Redocly configuration file, if such a file exists in your API version source.

## Adjust Try-it settings

The **Try it settings** section contains options related to the _Try-it console_.

Find more information in the [Try-it console configuration guide](/docs-legacy/api-reference-docs/guides/try-it-console.md).

## Configure auto-generated code samples

The **Generate code samples** section contains options related to auto-generated code samples visible in the right panel of the API docs.

Find more information in the [code samples configuration guide](/docs-legacy/api-reference-docs/guides/generate-code-samples.md).
