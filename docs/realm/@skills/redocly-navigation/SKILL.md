---
name: redocly-navigation
description: >-
  Use when changing the navigation of a Redocly documentation project (Realm, Revel, Reef, or Redoc):
  the sidebar (sidebars.yaml), the navbar, the footer, breadcrumbs, next and previous page buttons,
  a product picker (products), content versions (@v1 folders, versions.yaml, version picker), or
  localized content (@l10n folders, translations.yaml, translation keys). Also use when a page does not
  show in the sidebar, shows the wrong sidebar, or has the wrong order or label.
  Not for page content or front matter (use redocly-authoring), the sidebar inside an API reference
  (use redocly-api-reference), the look of the navbar or footer, or replacing them with custom React components (use redocly-styling), or other
  redocly.yaml settings (use redocly-configuration).
---

# Redocly navigation reference

Reference for the navigation of Redocly documentation projects: sidebars, navbar, footer, breadcrumbs, page buttons, products, versions, and locales.

Sidebars go in `sidebars.yaml` files.
The navbar, footer, and other navigation areas go in `redocly.yaml`.

If a detail is not in this file, fetch the `Full reference` link of the section. Do not guess option names.

## Paths and URLs

- The file path sets the URL of a page: `guides/example.md` is `/guides/example`, and `guides/index.md` is `/guides`.
- Navigation entries link to files, with the extension: `page: guides/example.md`. An API description file is linked the same way: `page: apis/cafe-api.yaml`.
- The base of a relative path depends on the file that contains it:

| Where you write the path | Base of a relative path |
| --- | --- |
| A `sidebars.yaml` file | The folder of that sidebar file |
| `redocly.yaml` (`navbar`, `footer`, `breadcrumbs`) | The project root |
| A Markdown page | The folder of that page |

A path that starts with `/` always resolves from the project root.

Full reference: https://redocly.com/docs/realm/content/links.md

## Sidebars

When a Redocly project has no sidebar file, the sidebar is built from the folders:

- Items sort in natural order: `concept-2` comes before `concept-11`.
- `index.md` is the first item of its folder.
- The label is the first H1 of the page.
- An API description adds items from its tags and operations.

To control order, labels, and groups, create a `sidebars.yaml` file.

```yaml {% title="sidebars.yaml" %}
- page: index.md
  label: Overview
- group: Guides
  page: guides/index.md
  expanded: true
  items:
    - page: guides/quickstart.md
      badges:
        - name: New
          color: green
    - directory: guides/advanced
- separatorLine: true
- page: apis/cafe-api.yaml
  label: API reference
- href: https://community.example.com
  label: Community forum
  external: true
```

- The file name must end with `sidebars.yaml`: `sidebars.yaml`, `guides.sidebars.yaml`. `sidebar.yaml` and `sidebars.yml` do not work.
- No entry in `redocly.yaml` is necessary. The build finds the file.
- **After the first sidebar file exists, nothing is automatic:** a page shows a sidebar only when a sidebar file lists that page, or lists its folder with `directory`.
  New files do not appear until you add them.
  A sidebar file does not apply to its folder only because it is in that folder.
- To show no sidebar on one page, such as a landing page, leave that page out of every sidebar file.
- To choose a sidebar file for a page, set `sidebar.path` in its front matter. The front matter `sidebar` has no `label` and no `hide`.
- `sidebar.hide: true` in `redocly.yaml` hides the sidebar on every page.

### Link options

| Option | Type | Description |
| --- | --- | --- |
| `page` | string | Path to the file, extension included. Mutually exclusive with `href`. Without `label`, the text is the H1 of the page. |
| `href` | string | URL. Mutually exclusive with `page`. |
| `label` | string | Link text. |
| `labelTranslationKey` | string | Translation key for the link text. |
| `external` | boolean | Open in a new tab and add the external link symbol. Default: `false`. |
| `disconnect` | boolean | Show the link, but do not give this sidebar to the target page. Default: `false`. |
| `icon` | string | Icon. See [Icons](#icons). |
| `badges` | [object] | Badges next to the label. See [Badges](#badges). |
| `rbac` | object | Map of teams to access levels for this link. |
| `additionalProps` | object | Custom data for ejected theme components. |

### Group options

| Option | Type | Description |
| --- | --- | --- |
| `group` | string | **Required.** Group name. |
| `items` | [object] | **Required.** Links, groups, separators, and `$ref` entries. |
| `page` | string | Page that opens when the user selects the group. |
| `directory` | string | Folder path. Its files appear in natural order, and new files appear automatically. |
| `expanded` | `true`, `false`, `always` | Open on load, closed on load (default), or always open. |
| `selectFirstItemOnExpand` | boolean | Open the first item when the group expands. Default: `false`. |
| `menuStyle` | string | `drilldown`: show only the items of the selected group. |
| `groupTranslationKey` | string | Translation key for the group name. |
| `icon`, `badges`, `rbac` | | Same as for links. `rbac` applies to the group and all of its items. |

### Separators and references

| Option | Type | Description |
| --- | --- | --- |
| `separator` | string | Static text between items. |
| `separatorTranslationKey` | string | Translation key for the separator text. |
| `separatorLine` | boolean | A horizontal line. |
| `$ref` | string | Path to another sidebar file. Its entries expand in place. |

To split a large sidebar, keep one file for each section and join them with `$ref`:

```yaml {% title="sidebars.yaml" %}
- page: index.md
- $ref: /cafe/cafe.sidebars.yaml
- $ref: /customers/customers.sidebars.yaml
```

Paths inside `cafe.sidebars.yaml` resolve from `cafe/`, not from the project root.

### Badges

```yaml
- page: new-feature.md
  badges:
    - name: Beta
      color: purple
      position: before
```

| Option | Type | Description |
| --- | --- | --- |
| `name` | string | **Required.** Badge text. |
| `color` | string | A color name, a status, or a CSS value such as `'#ff9800'`. Default: `grey`. |
| `position` | string | `before` or `after` the label. Default: `after`. |
| `icon` | string | Icon. |

Color names: `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`, `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`.
Statuses: `success`, `processing`, `error`, `warning`, `default`, `approved`, `declined`, `pending`, `active`, `draft`, `deprecated`, `product`.

### Icons

The `icon` option is the same in sidebars, the navbar, and the footer. It accepts:

- A Font Awesome name: `book` or `regular book`, `solid book`, `duotone book`, `brands github`. The `fa-` prefix and other prefixes do not render.
- A relative path to an image: `./images/config-icon.svg`.
- One icon for each color mode: `srcSet: "./images/icon.svg light, ./images/icon-dark.svg dark"`.

### Access control

```yaml
- group: Partners
  rbac:
    Partners: read
    '*': none
  items:
    - page: partners/index.md
```

A hidden link does not protect the page. Users with the URL can still open it.
To protect the page, use `access.rbac` in `redocly.yaml`: load the `redocly-configuration` skill, if it is installed (or fetch https://redocly.com/docs/realm/config/access.md).
When RBAC hides all pages of a group, the group is also hidden.

Full reference: https://redocly.com/docs/realm/navigation/sidebars.md

## Navbar

Configure the navbar in `redocly.yaml`.
A dropdown is `group` plus `items`.
An item with `label` plus `items` is not valid: a Redocly project ignores the `items`.
The default theme supports one level of dropdown only.

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: guides/index.md
      label: Guides
    - group: Products
      items:
        - page: platform/index.md
          label: Platform
        - separator: Developer tools
        - page: cli/index.md
          label: CLI
    - page: product-a/index.md
      label: Product A
      linkedSidebars:
        - product-a/sidebars.yaml
    - href: https://support.example.com
      label: Support
      external: true
```

| Item option | Type | Description |
| --- | --- | --- |
| `page` | string | Path to the file from the project root, extension included. Mutually exclusive with `href`. |
| `href` | string | URL. Mutually exclusive with `page`. |
| `label` | string | Link text. |
| `labelTranslationKey` | string | Translation key for the link text. |
| `external` | boolean | Open in a new tab. Default: `false`. |
| `icon` | string | Icon. See [Icons](#icons). |
| `linkedSidebars` | [string] | Paths to sidebar files. Adds this item to the breadcrumbs of those sidebars. Top-level items only. |
| `rbac` | object | Map of teams to access levels. |
| `additionalProps` | object | Custom data for ejected theme components. |

- A group takes `group` and `items` (both required), `groupTranslationKey`, `linkedSidebars`, and `icon`.
- Use `separator` inside a dropdown to divide it into sections.
- `navbar.hide: true` hides the navbar, in `redocly.yaml` or in the front matter of a page.

Full reference: https://redocly.com/docs/realm/config/navbar.md

## Footer

Configure the footer in `redocly.yaml`.
Each entry in `footer.items` is one column.

```yaml {% title="redocly.yaml" %}
footer:
  copyrightText: © 2026 Example, Inc. All rights reserved.
  items:
    - group: Documentation
      items:
        - page: guides/index.md
          label: Guides
        - href: https://github.com/example
          label: GitHub
          external: true
          icon: brands github
```

- A column is a `group` with `items` (both required), and an optional `groupTranslationKey`.
- Footer items take the same options as navbar items.
- `copyrightText` is a plain string. It does not interpolate a year.
- `footer.hide: true` hides the footer, in `redocly.yaml` or in the front matter of a page.

Full reference: https://redocly.com/docs/realm/config/footer.md

## Breadcrumbs

Breadcrumbs come from the sidebar. They are on by default.
They do not show when no sidebar lists the page, or when the page is at the top level of its sidebar.

```yaml {% title="redocly.yaml" %}
breadcrumbs:
  prefixItems:
    - page: index.md
      label: Home
      icon: home
```

- `hide: true` turns off breadcrumbs.
- `prefixItems` are links that always show first. Each takes `page` (required), `label`, `labelTranslationKey`, and `icon`.
- To add a navbar item to the breadcrumbs of a sidebar, use `linkedSidebars` on the navbar item.

Full reference: https://redocly.com/docs/realm/config/breadcrumbs.md

## Next and previous buttons

The **Next page** and **Previous page** buttons follow the order of the sidebar.

```yaml {% title="redocly.yaml" %}
navigation:
  nextButton:
    text: Next chapter
  previousButton:
    hide: true
```

| Option | Where | Description |
| --- | --- | --- |
| `nextButton.hide`, `previousButton.hide` | `redocly.yaml` or front matter | Hide the button. |
| `nextButton.text`, `previousButton.text` | `redocly.yaml` or front matter | Text above the button. Default: `Next page`, `Previous page`. |
| `nextButton.page`, `previousButton.page` | Front matter only | Target page or URL. Use it for a custom reading order. |
| `nextButton.label`, `previousButton.label` | Front matter only | Text on the button. Default: the H1 of the target. |

Full reference: https://redocly.com/docs/realm/config/navigation.md

## Multiple products

`products` adds a product picker to the navbar.
It is a map, not a list. The key is for configuration only and does not show on the site.

```yaml {% title="redocly.yaml" %}
products:
  platform:
    name: Platform API
    icon: images/platform-icon.svg
    folder: products/platform/
  mobile:
    name: Mobile SDK
    folder: products/mobile/
```

- `name` and `folder` are required. A product folder cannot be inside the folder of another product.
- Give each product its own `sidebars.yaml` in its folder.
- A `redocly.yaml` in a product folder overrides `breadcrumbs`, `codeSnippet`, `feedback`, `footer`, `logo`, `navbar`, `sidebar`, `search`, and `mockServer` for that product.
- Search from a product page shows results for that product only.

Full reference: https://redocly.com/docs/realm/config/products.md

## Versions

Put each version in a folder that starts with `@`, next to the other versions: `cafe/@1.0/`, `cafe/@2.0/`.

- Any name is valid after `@`: `@latest`, `@1.0.0`, `@rc1`. Do not nest version folders.
- The version picker shows at the top of the sidebar.
- The default version gets no version segment in its URL: `cafe/@2.0/guide.md` is `/cafe/guide` when `2.0` is the default, and `cafe/@1.0/guide.md` is `/cafe/1.0/guide`.
  When the default changes, the URLs change.

Without `versions.yaml`, versions sort newest first, numeric-aware (`2.10` before `2.9`), and the first one is the default.
The sort does not follow semver: `1.0.0-rc.1` shows above `1.0.0`.
To set the order, the names, and the default, add `versions.yaml` next to the version folders:

```yaml {% title="versions.yaml" %}
default: latest
versions:
  - version: legacy
    name: Legacy version
  - version: latest
    name: Latest version
```

- `version` is the folder name without `@`. Quote numbers: `version: '1.0'`.
- Versions that the list does not include do not show.
- Without `default`, the last entry of `versions` is the default.
- In a sidebar, `directory: /cafe` lists all versions, and `page: /cafe/@1.0/index.md` shows only in the active version.
- `versionPicker` in `redocly.yaml` or in the front matter: `hide`, and `showForUnversioned` (show an inactive picker on content without versions).

Full reference: https://redocly.com/docs/realm/content/versions.md

## Localization

Put translated files in `@l10n/<locale>/`, with the same relative paths as the default-language files.
`index.md` in Spanish is `@l10n/es-ES/index.md`.

```yaml {% title="redocly.yaml" %}
l10n:
  defaultLocale: en
  locales:
    - code: en
      name: English
    - code: es-ES
      name: Spanish (Spain)
```

- `locales` adds the language picker. Each `code` must match an `@l10n` folder name, or `defaultLocale`.
- Use IETF tags such as `en` or `en-US`, with only letters, numbers, `-`, and `_`.
- Files that a locale does not have are copied from the default language at build time.
- Links in a default-language file point to the same locale automatically.
  From a locale file, link to a default-language-only file as if it is in that locale.
- Translate sidebar, navbar, and footer labels with `labelTranslationKey`, `groupTranslationKey`, and `separatorTranslationKey`.
  Define the keys in `translations.yaml` in the root and in each locale folder.
- `npx @redocly/cli translate <locale>` (or `translate all`) adds the keys to `translations.yaml`. It does not overwrite existing keys.
- A missing key falls back to the default locale. `de-AT` falls back to `de`.

```yaml {% title="sidebars.yaml" %}
- group: Getting started
  groupTranslationKey: sidebar.gettingStarted
  items:
    - page: installation.md
      labelTranslationKey: sidebar.installation
```

```yaml {% title="@l10n/es-ES/translations.yaml" %}
sidebar.gettingStarted: Empezando
sidebar.installation: Instalación
```

Full reference: https://redocly.com/docs/realm/content/localization/localize-labels.md

## Choose a navigation pattern

| Pattern | When to use |
| --- | --- |
| Automatic sidebar | Small project, and the folder structure is the order you want. |
| One root `sidebars.yaml` | Default. One hierarchy with custom labels and order. |
| `directory` entries | A folder that changes often, and natural order is correct. |
| Sidebar files for each section, joined with `$ref` | A large sidebar that different teams maintain. |
| Separate sidebar files with navbar links and `linkedSidebars` | Distinct sections (guides, API, tutorials) with their own navigation. |
| `menuStyle: drilldown` | A deep group that replaces the full sidebar when selected. |
| Navbar dropdown (`group`) | Many top-level destinations. One level only. |
| `products` | Separate documentation sets with a product picker. |
| `@` version folders | Versions of the same content. |
| `@l10n` | The same content in more than one language. |
| No sidebar entry | A landing page without a sidebar. |

Full reference: https://redocly.com/docs/realm/navigation.md

## Common mistakes

| Mistake | Correct approach |
| --- | --- |
| `sidebar.yaml` or `sidebars.yml` | The name must end with `sidebars.yaml` |
| A new page expected in the sidebar automatically | After a sidebar file exists, add each page, or use `directory` |
| A sidebar file expected to apply to its folder | A page gets a sidebar only when a sidebar file lists it or its folder |
| `sidebar: {label: ...}` or `sidebar: {hide: true}` in the front matter | Set the label in `sidebars.yaml`. Leave the page out of every sidebar file |
| Paths in a nested `sidebars.yaml` written from the project root | Start at the folder of that sidebar file, or start the path with `/` |
| A link without the extension, such as `page: guides/quickstart` | Keep the extension: `guides/quickstart.md` |
| A navbar dropdown from `label` plus `items` | `group` plus `items` |
| `linkedSidebars` on a nested navbar item | Top-level items only |
| `products` as a list with `id` and `slug` | A map of key to `name`, `folder`, `icon` |
| `{{ year }}` in `copyrightText` | Plain string only |
| Hiding a sidebar link to protect a page | Hidden links do not protect content. Use `access.rbac` |
| Numeric version names without quotes in `versions.yaml` | Quote them: `version: '1.0'` |
| `@l10n/spanish/` | The folder name must match the locale `code`, such as `es-ES` |
