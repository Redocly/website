---
seo:
  title: Redocly Reference docs 2.0 migration guide
---

# Migration guide: Reference docs 2.0

> Reference docs 2.0 is a major release that brings many new features and usability improvements,
> plus a complete visual overhaul of your API documentation.
> This migration guide highlights changes that impact the appearance and behavior of your docs,
> and provides upgrade instructions for your Reference docs deployments.

In this guide:

1. [New features in Reference docs 2.0](#new-features)

2. [Compatibility changes](#compatibility-changes)

3. [Upgrade to Reference docs 2.0](#upgrade-to-reference-docs-20)

4. [Continue using Reference docs 1.x](#continue-using-reference-docs-1x)

5. [Reference docs 2.0 in Developer portal](#reference-docs-20-in-developer-portal)

## New features

Reference docs 2.0 introduces a number of new functionalities and theming options that let you customize your API documentation and make it easier to use.

Read more on how to use these new options in the Reference docs [configuration](../configuration/functionality.md) and [theming](../configuration/theming.md) documentation.

### OpenAPI 3.1 support

Reference docs can now build API documentation from definitions that use OpenAPI 3.1.

### Deep links

Previously, it was possible to get a direct link to any tag and operation in your API documentation. In Reference docs 2.0, this functionality goes deeper. Direct links are automatically created for every request parameter and request/response schema property, regardless of their nesting level. Hover over the parameter or property name in the middle panel, and select the link icon that appears to get the direct link.

Deep links are enabled by default in Reference docs 2.0. To disable them, add `disableDeepLinks: true` to your configuration file.

Note that deep links are not supported in callback and model schemas.

### Sticky language selection in code samples

When an operation has request code samples in multiple languages, you can select each language in the right panel of your API documentation. Previously, this selection did not persist after reloading the page, and it wasn't consistently applied to all operations. (If you selected Python for one operation, the next operation would not have Python selected when you navigated to it.)

Reference docs 2.0 supports sticky selection for request code samples in the right panel. The language you select is preserved between page reloads and across all operations on the page.

Additionally, you can configure which language is selected by default. Use the new option `defaultSampleLanguage` in your configuration file, and set it to any of the values from `generateCodeSamples.language.lang` (for example, `defaultSampleLanguage: 'JavaScript'`).

### Customizable code sample tabs

If your API documentation has code samples for many languages, only 5 tabs are shown by default in Reference docs 2.0. You can change this number in your configuration file with the new option `samplesTabsMaxCount`.

Tabs that exceed the configured number are automatically grouped into a "show more" menu at the end of the tab list, so you can quickly access them from there.

### On-the-fly layout switching

Previously, the layout of your API documentation could only be changed in the configuration files by the documentation maintainers, not by your readers. In Reference docs 2.0, two new buttons make it possible to change the layout dynamically, on-the-fly by anyone who has access to the API documentation.

The **Change Layout** button moves the middle panel to the center of the page, and places the contents of the right panel (code samples and the API console) into the middle panel. This layout is also known as the "stacked layout".

The **Hide Samples** button hides the entire right panel with code samples and the API console.

Both buttons are visible by default in the upper right corner of the API documentation page. You can hide them by setting `showChangeLayoutButton: false` and `showRightPanelToggle: false` in your configuration file.

When the buttons are hidden, dynamic layout switching is effectively disabled for documentation readers. Maintainers can still change the documentation layout by editing the configuration file (for example, set `pathInMiddlePanel: true` to move only the path link and HTTP verb to the middle panel).

To set the default layout of your API documentation, use the new theming options `layout.stacked` and `layout.three-panel`.

### Automated sorting

To help you organize tags, operations, and enum values in your API documentation, Reference docs now supports three new configuration options. Use `sortEnumValuesAlphabetically`, `sortOperationsAlphabetically` and `sortTagsAlphabetically` in your configuration file to sort them automatically in alphabetical order.

Your tags and operations are sorted alphabetically in the navigation sidebar, but also in the middle panel. If you enable alphabetical sorting for enum values, it applies to all schemas in your API documentation.

### Smart pagination

If your API definition has more than 50 operations, but you haven't configured any pagination settings, `section` pagination is used by default. This default applies only when using Reference docs CLI on-premise, and to Reference docs projects hosted in Redocly Workflows.

### New theming options

The following new theming options are supported and can be used in the `theme.ts` and in `redocly.yaml` configuration files:

```ts
colors.accent.contrastText
colors.accent.dark
colors.accent.light
colors.accent.main

colors.responses.[error|info|redirect|success].borderColor

colors.secondary.contrastText
colors.secondary.light
colors.secondary.main

colors.text.light

components.buttons
components.httpBadges
components.layoutControls
components.panels

layout.showDarkRightPanel
layout.stacked.maxWidth.[small|medium|large]
layout.three-panel.maxWidth.[small|medium|large]

rightPanel.panelBackgroundColor
rightPanel.panelControlsBackgroundColor
rightPanel.showAtBreakpoint

schema.caretColor
schema.caretSize
schema.defaultDetailsWidth
schema.labelsTextSize
schema.linesColor
schema.nestedBackground
schema.nestingSpacing
schema.requireLabelColor
schema.typeNameColor
schema.typeTitleColor

shape.borderRadius

sidebar.activeBackgroundColor
sidebar.borderRadius
sidebar.caretColor
sidebar.caretSize
sidebar.fontFamily
sidebar.fontSize
sidebar.group.subItemsColor
sidebar.rightLineColor
sidebar.separatorLabelColor
sidebar.showAtBreakpoint
sidebar.spacing.offsetLeft
sidebar.spacing.offsetNesting
sidebar.spacing.offsetTop
sidebar.spacing.paddingHorizontal
sidebar.spacing.paddingVertical
sidebar.spacing.unit

typography.links.textDecoration
```

The new theming option `layout.showDarkRightPanel` can be used to change the background of the entire right panel to dark-mode color. By default, this option is disabled (set to `false`).

## Compatibility changes

The following changes impact the behavior of Reference docs when you upgrade from a previous version.

### Default font settings

- Default font family in the Reference docs theme has changed to `typography.fontFamily='Source Sans Pro, sans-serif'`.

{% admonition type="warning" name="Important" %}
All users who have a custom HTML template for their Reference docs must add the following to their template:

`<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600%7CSource+Code+Pro:400:700" rel="stylesheet">`
{% /admonition %}

### Default search behavior and appearance

- The search functionality has moved to a floating window. Selecting the search field in the sidebar immediately opens a centered floating window where you can type in your search queries and access the search results.

- Browser search override is now enabled by default (`ctrlFHijack: true`). Pressing `Ctrl+F` or the equivalent keyboard shortcut for activating in-browser search now opens the floating search window.

### Changed configuration options

- All properties and values called `spec` and `specUrl` have been renamed to `definition` and `definitionUrl` respectively across the whole public API.

- The following configuration options have been renamed. Their functionality and usage remain the same:

  - `untrustedSpec` renamed to `untrustedDefinition`

  - `downloadSpecUrl` renamed to `downloadDefinitionUrl`

- The `showNextButton` option is now configured at the top-level of the configuration file. It is no longer used as `layout.showNextButton`.

- The `layout` configuration option is no longer used as an object. Its type is now `string` and it accepts one of two supported values (`three-panel`, `stacked`). All deprecated options previously supported by the `layout` object have been removed from the Reference docs documentation. If you have previously used the `layout` object to control pagination settings in your configuration file, you must change it to the `pagination` option.

### Deprecated theming options

The following theming options are no longer supported:

- top-level `borderRadius` and all its properties

- `rightPanelToggle` and all its properties

- `typography.fieldName.transform` and `typography.fieldName.color`

- `colors.responses.[error|info|redirect|success].color`

- `schema.arrow` and all its properties

- `sidebar.arrow` and all its properties

## Upgrade to Reference docs 2.0

### Hosted

1. To upgrade Reference docs hosted in Redocly Workflows, log into your Workflows organization.

2. Access the **Settings > API reference settings** page for your Reference docs project.

3. In the **General settings** section, select the Reference docs version to use for the project.

4. Confirm changes by selecting **Save settings** at the bottom of the page.

### On-premise

To upgrade Reference docs deployed as JS CDN, target the `v2.0.3` version when adding the script to your page:

```js
<script src="https://cdn.redoc.ly/reference-docs/v2.0.3/redocly-reference-docs.min.js"></script>
```

To upgrade Reference docs CLI, follow the same approach by targeting the version:

```sh
npm install @redocly/reference-docs@2.0.3
```

## Continue using Reference docs 1.x

### Hosted

1. To use an older version (1.x) of Reference docs hosted in Redocly Workflows, log into your Workflows organization.

2. Access the **Settings > API reference settings** page for your Reference docs project.

3. In the **General settings** section, select the Reference docs version to use for the project.

4. Confirm changes by selecting **Save settings** at the bottom of the page.

### On-premise

To continue using an older version (1.x) of Reference docs on-premise, pin the version number to a specific version in your CDN script or in your `npm` command˙:

```js
<script src="https://cdn.redoc.ly/reference-docs/v1.5.14/redocly-reference-docs.min.js"></script>
```

```sh
npm install @redocly/reference-docs@1.5.14
```

## Reference docs 2.0 in Developer portal

To use Reference docs 2.0 for integrated API documentation in your portal, you must switch to the `1.1.0-beta` release channel by updating your developer portal to the latest version.

Find the instructions and more details in the [Developer portal 1.1.0 migration guide](../../developer-portal/guides/migration-guide-1-1-0.md).
