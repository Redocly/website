---
tocMaxDepth: 2
excludeFromSearch: true
---

# Developer portal changelog

{% partial file="../_snippets/banner-legacy-developer-portal.md" /%}

{% admonition type="info" %}
This changelog is divided into two tracks:

1 - [for 1.1.x releases](#developer-portal-11x)

2 - [for 1.0.x releases](#developer-portal-10x)
{% /admonition %}

## Developer portal 1.1.x

---

## Next

---

## 1.1.0-beta.143 (2025-05-15)

### Features

- Upgraded the Reference docs package to `2.45.9`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.142 (2024-12-16)

### Features

- Upgraded the Reference docs package to `2.45.7`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.141 (2024-11-15)

### Features

- Upgraded the Reference docs package to `2.45.5`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.140 (2024-10-15)

### Features

- Upgraded the Reference docs package to `2.45.4`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Fixed an issue where the last `href` link in `x-enumDescriptions` OpenAPI section did not apply custom `pathPrefix`, resulting in broken URLs.

---

## 1.1.0-beta.139 (2024-09-16)

### Features

- Upgraded the Reference docs package to `2.45.3`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.138 (2024-08-15)

### Features

- Upgraded the Reference docs package to `2.45.0`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Added an `onClick` event for the `WideTile` component.

---

## 1.1.0-beta.137 (2024-07-16)

### Features

- Add support for an environment variable `LOWERCASE_URL` to change tags in the OpenAPI description to lower case when they appear in URLs.
- Upgraded the Reference docs package to `2.43.8`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Fixed an issue with duplicated URLs in `sitemap.xml`.

---

## 1.1.0-beta.136 (2024-06-17)

### Fixes

- Fixed an issue where users were unable to scroll through Search Results on mobile devices.
- Upgraded the Reference docs package to `2.43.7`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.135 (2024-05-15)

### Features

- Upgraded the Reference docs package to `2.43.6`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.134 (2024-04-18)

### Features

- Upgraded the Reference docs package to `2.43.4`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.133 (2024-03-18)

### Features

- Add expiration date timeout for the authentication token, so logging users out event will be triggered on the UI as expected.

---

## 1.1.0-beta.132 (2024-02-19)

### Fixes

- Authentication tokens expire after the set expiration time, logging users out of the UI as expected.

---

## 1.1.0-beta.131 (2024-01-16)

### Features

- Upgraded the Reference docs package to `2.42.4`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.130 (2023-12-15)

### Fixes

- Fixed a problem with web-manifest missing `Authorization` header when Basic authorization applied.

---

## 1.1.0-beta.129 (2023-11-30)

### Fixes

- Fixed a problem with slow build times for OpenAPI files in the `static` folder.
- Prevent OpenAPI files in the `static` folder from being search-indexed twice.

---

## 1.1.0-beta.128 (2023-10-17)

### Fixes

- Fixed an issue that causes a failing build because of an unresolved `stream`.

---

## 1.1.0-beta.127 (2023-08-16)

### Features

- Upgraded the Reference docs package to `2.42.1`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the `@redocly/openapi-core` package to `1.0.2`.

### Fixes

- Added support for the `deepLinkPrefix` option with pagination set to `item`.
- Fixed an issue with copying code snippets text which contains environment variables.

---

## 1.1.0-beta.126 (2023-07-13)

### Features

- Added support for the `sideNavStyle` configuration option that defines the style of the navigation sidebar items (in the left-hand side of the page).
   The default style is `summary-only`. The `path-first` style shows the path first with the summary underneath. The `id-only` style shows the operation ID if provided; otherwise, it shows only the path.
- Upgraded the Reference docs package to `2.41.1`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the `@redocly/openapi-core` package to `1.0.0-beta.131`.
- Added support for disabling the version log for security reasons.

---

## 1.1.0-beta.125 (2023-06-15)

### Features

- Added "404 - Not Found" title to the 404 page.

---

## 1.1.0-beta.124 (2023-05-30)

### Features

- Upgraded the `@redocly/openapi-core` package to `1.0.0-beta.124`.

### Fixes

- Fixed an issue where a broken page would briefly display prior to redirecting to a different page.
- Fixed an issue with `sitemap.xml` generation for large portals.

---

## 1.1.0-beta.123 (2023-03-10)

### Fixes

- Fixed an issue with builds crashing when plugins read data.

---

## 1.1.0-beta.122 (2023-01-19)

### Fixes

- Upgraded the Reference docs package to `2.39.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.121 (2022-12-19)

### Features

- Upgraded the Reference docs package to `2.39.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.120 (2022-11-11)

### Fixes

- Fixed an issue where the sidebar disappears periodically.

### Features

- Upgraded the Reference docs package to `2.38.2` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.119 (2022-10-05)

### Features

- Upgraded the Reference docs package to `2.38.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.118 (2022-09-28)

### Features

- Upgraded the Reference docs package to `2.38.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Fixed an issue with scrolling to an anchor on initial page loads.

---

## 1.1.0-beta.117 (2022-09-22)

### Fixes

- Fixed an issue with seo `siteUrl` configuration not working for images.
- Fixed an issue with sidebar not hidden on mobile when navigating to different hash link.
- Fixed an issue with hidden search results when closing keyboard area on mobile devices.

---

## 1.1.0-beta.116 (2022-09-21)

### Features

- Upgraded the Reference docs package to `2.37.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the `@redocly/openapi-core` package to `1.0.0-beta.110`.

### Fixes

- Fixed an issue with incorrect search behavior on mobile devices.
- Fixed an issue with showing sidebar scrollbar when there are only a few links in it.
- Fixed an issue with incorrect "Last updated time" for markdown pages in some cases.

---

## 1.1.0-beta.115 (2022-09-14)

### Features

- Downloads Redocly configuration files (such as `redocly.yaml`) for each API in the API catalog.
- Added ability to set search input loading spinner color. Now the theme's `components.search.iconColor` property applies to the search input loading spinner too.
- Upgraded the Reference docs package to `2.36.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the `@redocly/openapi-core` package to `1.0.0-beta.109`.

---

## 1.1.0-beta.114 (2022-09-07)

### Fixes

- Fixed an issue with search performance where search data loaded multiple times.

### Features

- Added possibility to ignore entire folder during the build by placing underscore in front of folder's name. For more details refer to the [docs](./guides/organizing-files.md#exclude-folders-from-portal-builds).
- Upgraded the Reference docs package to `2.36.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the `@redocly/openapi-core` package to `1.0.0-beta.108`.

---

## 1.1.0-beta.113 (2022-08-31)

### Fixes

- Fixed an issue with invalid render order for MDX causing wrong images displayed after page refresh.
- Fixed an issue with invalid error formatting in console output.
- Fixed icon for info admonition.

### Features

- Upgraded the Reference docs package to `2.34.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

## 1.1.0-beta.112 (2022-08-25)

### Fixes

- Fixed an issue with incorrect id for definition, which path is specified under `oasDefinitions` section in `siteConfig.yaml` but does not have a corresponding `.page.yaml`.

### Features

- Upgraded the Reference docs package to `2.33.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Added new theme setting `externalIconUrl` to specify URL to external icon. Supports data-urls too.
  Example usage:

  ```theme.ts
  const customIconUrl = require('../images/external.svg');

  export const theme = {
    // ...
    externalIconUrl: customIconUrl,
    // ...
  }
  ```

---

## 1.1.0-beta.111 (2022-08-17)

### Fixes

- Fixed an issue with not including table content into search results.
- Fixed an issue with rendering mermaid diagrams when portal runs in local environment.

### Features

- Added support for wildcard `(*)` redirects. You can get more familiar with [redirects feature here](./guides/redirects.md).
- Added export of `Footer` component, so it can be wrapped in some container.
- Added `disableAutoApiDocs` config option to disable automatic API docs pages creation from OpenAPI files (without .page.yaml).
- Added possibility to customize external link icon.
- Upgraded the Reference docs package to `2.31.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.107`.

---

## 1.1.0-beta.110 (2022-08-10)

### Fixes

- Fixed an issue with rebuilding API definition in development mode.

### Features

- Added `disableLinkPrefetching` config option. If it is set to true, developer portal will do data prefetching only for hovered links.
- Upgraded the Reference docs package to `2.31.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.109 (2022-08-04)

### Fixes

- Fixed an issue with portal build failures when image attributes are used on pages.

---

## 1.1.0-beta.108 (2022-08-03)

### Fixes

- Fixed an issue where the [customizable images](https://redocly.com/docs-legacy/developer-portal/guides/markdown/#customizable-images) feature was breaking MDX pages if the development server started without the images optimization option.
- Fixed an issue where the search indexer failed for valid OpenAPI definitions.
- Fixed an issue with including jsx tags into search results.

### Features

- Added support for `--no-uglify` CLI option to disable JavaScript minification.
- Upgraded the Reference docs package to `2.29.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.107 (2022-07-27)

### Fixes

- Fixed an issue where the copy button is not displayed for a code snippet if its language is not specified.
- Fixed a missing alt attribute for `icon` in `Tile` components.
- Fixed an issue with deprecated `title` warnings.
- Fixed an issue with `drilldown` menu type overlapping.
- Fixed an issue with detecting lint ignore file during the portal build.

### Features

- Added support for [Rudderstack](./configuration/siteconfig/analytics.md).
- Added new theming options for [customizing](./configuration/theme.md) FAB (floating action button) component.
- Upgraded the Reference docs package to `2.27.3` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.105`.

---

## 1.1.0-beta.106 (2022-07-20)

### Fixes

- Fixed an issue with the API catalog not working for big API definitions in some cases.
- Fixed an issue with inconsistent behavior for the `deprecated` option in sidebar menu.
- Fixed an issue with div width has value `[object Object]`.

### Features

- Upgraded the Reference docs package to `2.27.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.105 (2022-07-13)

### Fixes

- Fixed an issue when `search-index.json` got filled with CSS text when using some UI libraries.

### Feature

- Upgraded the Reference docs package to `2.27.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.104`.

---

## 1.1.0-beta.104 (2022-07-06)

### Fixes

- Fixed an issue with the deprecated `showConsole` parameter.
- Fixed a portal crash on an empty `.page.yaml` file.
- Fixed title's anchors under the API authentication section.
- Fixed indexing paragraphs on the page for search.

### Feature

- Upgraded the Reference docs package to `2.26.3` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.103 (2022-07-01)

### Fixes

- Fixed an issue with page crashing when using custom Navbar and not passing `location` to `SearchBox`.

### Feature

- Upgraded the Reference docs package to `2.26.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.102 (2022-06-30)

### Fixes

- Fixed an issue with top-level sidebar groups not hidden with RBAC if they have nested separator.

### Feature

- Upgraded the Reference docs package to `2.26.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.103`.

---

## 1.1.0-beta.101 (2022-06-24)

### Fixes

- Fixed an issue with search results not being clickable in some cases.

## 1.1.0-beta.100 (2022-06-22)

### Feature

- Upgraded the Reference docs package to `2.25.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.99 (2022-06-15)

### Feature

- Upgraded the Reference docs package to `2.23.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.102`.

---

## 1.1.0-beta.98 (2022-06-08)

### Fixes

- Fixed an issue with GraphQL error when set API catalog `disableAutoSidebar` option to `true`.
- Fixed an issue with search result box show/hide behaviour after the item was selected.

---

## 1.1.0-beta.97 (2022-06-01)

### Feature

- Upgraded the Reference docs package to `2.22.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.100`.

### Fixes

- Fixed an issue with escaping backslashes when copying code samples.
- Fixed an issue when a page without a footer causes an error.
- Fixed an issue with schemas menu items not working properly.
- Fixed an issue with API catalog not working for API definitions in `json` format.
- Fixed an issue with cutted off request body in the _Try it_ console.

---

## 1.1.0-beta.96 (2022-05-25)

### Feature

- Upgraded the Reference docs package to `2.19.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Fixed an issue with RBAC sidebar items not filtered by default.
- Fixed an issue with the portal not loading API docs for multiple versions of an API when using the `index.page.yaml` file.

---

## 1.1.0-beta.95 (2022-05-19)

### Feature

- Upgraded the Reference docs package to `2.19.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.98`.

### Fixes

- Resolved an issue with `Code snippet` button text gets inside the searchIndex.
- Resolved an issue with the `WideTile` UI component layout.

---

## 1.1.0-beta.94 (2022-05-12)

### Feature

- Upgraded the Reference docs package to `2.15.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.97`.

---

## 1.1.0-beta.93 (2022-05-05)

### Feature

- Upgraded the Reference docs package to `2.14.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.95`.

### Fixes

- Resolved an issue with highlighting the last element in the MD(X) page TOC.
- OpenAPI definition files that have `_` at the start of the filename will not be included in the portal build.

---

## 1.1.0-beta.92 (2022-04-28)

### Feature

- Upgraded the Reference docs package to `2.13.7` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with linking to API reference pages from MD pages.

---

## 1.1.0-beta.91 (2022-04-21)

### Feature

- Upgraded the Reference docs package to `2.13.6` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.94`.

### Fixes

- Resolved an issue with the portal crashing when non-existing page is referenced from sidebars.
- Resolved a default value for catalog.yaml version summary.

---

## 1.1.0-beta.90 (2022-04-14)

### Feature

- Upgraded the Reference docs package to `2.13.5` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Search results on API reference pages will display operation descriptions when available.

### Fixes

- Resolved an issue with `.json`-based reference docs pages not working correctly in `sidebars.yaml`.

---

## 1.1.0-beta.89 (2022-04-07)

### Feature

- Upgraded the Reference docs package to `2.13.4` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.93`.

### Fixes

- Resolved an issue with missing `setParameterValue` export and fixed a broken `Reference docs hooks` code example in the documentation.
- Resolved an issue with search result disappear on scrollbar click.

---

## 1.1.0-beta.88 (2022-03-31)

### Feature

- Changed default value for search indexing depth for integrated Reference docs from 8 to 2. Set it to a number from 1 to 10 to control the maximum level of nested properties that should be included in the search index.
- Upgraded the Reference docs package to `2.13.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.91`.

---

## 1.1.0-beta.87 (2022-03-28)

### Fixes

- Resolved an issue with portal crashing builds on invalid `.yaml` files.

---

## 1.1.0-beta.86 (2022-03-28)

### Features

- Implemented the API catalog - a new approach for integrating the developer portal and the API registry. Use the `catalog.yaml` file to import assets and integrate multi-version APIs into your portal.

- You can add an "Edit page" button to all or some MD(X) pages in your portal. When enabled, the button is displayed at the top of each page, and can link to a GitHub or a GitLab repository. You can enable it globally for all pages in the `siteConfig.yaml` file, or control it per-page in the front matter.

- Starting with this release, portal version number is visible in the developer console to make troubleshooting easier.

- Reference docs pages can be integrated directly into the portal without creating `.page.yaml` files. To achieve this, add your OpenAPI definition file to the portal project and include it into a `sidebars.yaml` file. Note that this approach doesn't support multi-version APIs, integrating APIs from the Redocly API registry, restricting permissions with RBAC, or excluding specific API reference documentation from portal search results. To use those features, you have to integrate Reference docs with `.page.yaml` files as before.

### Deprecated

- Wildcard `/*` links (e.g. `acme.page.yaml/*`) for adding Reference pages to the portal sidebar are deprecated for the direct OpenAPI file integration. Those links only work when using `.page.yaml` files to integrate Reference docs into the portal.

---

## 1.1.0-beta.85 (2022-03-18)

### Features

- Upgraded the Reference docs package to `2.12.5` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the OpenAPI Core package to `1.0.0-beta.88` which allows using the `redocly.yaml` name for the configuration file.
- All table of contents sections on MD(X) pages have an "On this page" header.
- Implemented support for displaying a sidebar on pages not listed in any `sidebars.yaml` file. To do this, use the new `sidebar` option in the page front matter. Specify which sidebar to display by providing the path to the `sidebars.yaml` file or the sidebar name (if you're using the legacy sidebar configuration with `sidebarName`).

**Usage example**

```md Sidebar name
---
title: Adding sidebar to the page
sidebar: training
---
```

```md Path to sidebars file
---
title: Adding sidebar to the page
sidebar: ../sidebars.yaml
---
```

If you have defined multiple sidebars in the root `sidebars.yaml` file, the portal displays the first available sidebar from that file when you add its path to the front matter. In this case, we recommend you use the sidebar name in the front matter to precisely control which sidebar to show.
Front matter has priority over other configuration. If a page is listed in a `sidebars.yaml` file and has a different sidebar set in the front matter, the one from the front matter displays.

### Fixes

- Resolved an issue with `disableImagesOptimization` not working due to `sharp` dependency.

---

## 1.1.0-beta.84 (2022-03-10)

### Features

- Implemented support for API registry links on the `redocly.com` domain.
- Upgraded the Reference docs package to `2.12.3` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with Markdown references to symlinks.

---

## 1.1.0-beta.83 (2022-03-03)

### Features

- Implemented support for linting API definitions from the API registry. To use this feature, either add the `--lint-registry-definitions` option to the portal build command, or set up the `REDOCLY_LINT_REGISTRY_DEFINITIONS` environment variable.
- Upgraded the Reference docs package to `2.12.2` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the link checker in preview builds.
- Resolved an issue with the `GithubSlugger` import when upgrading to a new portal version.
- To improve the security of portal dependencies, we migrated from `shortid` to `nanoid` package.
- Resolved an issue with incorrect spacing in nested lists

---

## 1.1.0-beta.82 (2022-02-17)

### Features

- Upgraded the Reference docs package to `2.11.11` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with RBAC not applying configured permissions to assets (linked files).
- Resolved an issue with mutation breaking RBAC in build mode.

---

## 1.1.0-beta.81 (2022-02-11)

### Features

- Upgraded the Reference docs package to `2.11.6` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue that caused `className` errors in the browser console on MDX pages.
- Resolved an issue that caused warnings about resolving dependencies in the build log.
- Resolved an issue with request body example linting in **OpenApiTryIt** component.

---

## 1.1.0-beta.80 (2022-02-04)

### Features

- Added support for [Google Optimize](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-marketing-platform/). Read how to configure it for your portal on the [Analytics page](./configuration/siteconfig/analytics.md#google-marketing-platform).
- Upgraded the Reference docs package to `2.11.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with hot-reloading of OAS definition files.
- Resolved an issue with invalid mobile sidebar icon color in some cases.
- Resolved an issue with Gatsby version update crashing builds.
- Resolved an issue with support for multiple `sidebars.yaml` files on Windows.

## 1.1.0-beta.79 (2022-01-27)

### Fixes

- Resolved an issue with build failure on Node 17.x.

---

## 1.1.0-beta.78 (2022-01-20)

### Features

- This release adds support for multiple `sidebars.yaml` files and introduces changes to sidebar configuration in the portal. For complete instructions, make sure to read the [migration guide](./guides/migration-guide-sidebars.md).
- Upgraded the Reference docs package to `2.9.4` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.77 (2022-01-13)

### Features

- Upgraded the Reference docs package to `2.9.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.76 (2022-01-06)

### Features

- Upgraded the Reference docs package to `2.8.3` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with Navbar mobile menu disappears on the medium breakpoint.
- Resolved an issue with missing area-label in the search input.

---

## 1.1.0-beta.75 (2021-12-28)

### Features

- Upgraded the Reference docs package to `2.8.2` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.74 (2021-12-23)

### Features

- Locked the `openapi-cli` package version to `1.0.0-beta.67`.
- Upgraded the Reference docs package to `2.8.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with broken links to security in preview.

---

## 1.1.0-beta.73 (2021-12-09)

### Features

- Added a new experimental feature `--prefix-assets` (can also be used as an environment variable `REDOCLY_PREFIX_ASSETS`). This is useful in cases when you need to set a custom prefix for all asset paths in order to load them from an external resource.
- Upgraded the Reference docs package to `2.7.9` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with dynamic hashes that were not properly stripped from canonical URLs.
- Resolved an issue with prefixing search index with env variable `REDOCLY_PREFIX_ASSETS`.

---

## 1.1.0-beta.72 (2021-12-02)

### Features

- Upgraded the Reference docs package to `2.7.4` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the color of `Delete app` button in Apigee portal - changed it to primary.
- Resolved an issue with broken links inside the Reference docs Markdown descriptions.

---

## 1.1.0-beta.71 (2021-11-25)

### Features

- Added support for [amplitude analytics](https://amplitude.com/). For configuration settings check [this page](./configuration/siteconfig/analytics.md#amplitude).
- Added possibility to exclude page url from _sitemap.xml_ using `excludeFromSearch` option in frontmatter.
- `securityDefaults` property of `OpenApiTryIt` component can now accept a function. The number of function arguments depends on the number of dependencies specified in the `needs` property. Each argument should be provided in the form of a `{ request, response }` object.
- Added new component `ExplainStep`. It is designed to enhance Step by Step Guides with tips and instructions for every step.

**Usage Example**

```jsx
import {
  OpenApiTryIt,
  Alert,
  scrollToHeading
 } from '@redocly/developer-portal/ui';

## Step 1: Upsert a customer

<OpenApiTryIt
  definitionId="core"
  operationId="CreateUser"
  id="step-1"
/>

<ExplainStep
  needs={['step-1']}
  placeholder={(step1) => {
    if(!step1) {
      return (
        <Alert variant="danger">
          We should take <strong><i>data.user.id</i></strong> from the body of the response
          and use it as a <strong><i>userId</i></strong> query parameter in the next requests.
        </Alert>
      )
    } else {
      return (
        <Alert variant="success">
          <strong>User Id: {step1.response.body.data.user.id}</strong>
        </Alert>
      )
    }
  }}
/>

## Step 2: ...

```

### Fixes

- Resolved an issue with missing `copy` button in Markdown snippets.
- Resolved an issue with hash links to integrated Reference pages not working properly when pagination is set to `none`.

---

## 1.1.0-beta.70 (2021-11-18)

### Features

- Upgraded the Reference docs package to `2.7.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- New utility function `scrollToHeading` exported from `@redocly/developer-portal/ui`.
- Added a number of new properties to the `OpenApiTryIt` component to help you create interactive step-by-step guides. The new properties are:
  - `id` _(optional)_
  - `needs` _(optional)_
  - `placeholder` _(optional)_
  - `serverVariables` _(optional)_

`id` property is required if subsequent `OpenApiTryIt` instances rely on the response of the current component.

`needs` property should contain an array of Ids of preceding `OpenApiTryIt` components if it relies on their response bodies.

`placeholder` accepts a function that returns a component that is shown instead of `OpenApiTryIt` if it does not have enough information to perform a "Try It" request.

`serverVariables` accepts an object or a function that should return an object with server variables overrides. In case it's a function, the number of its arguments depends on the number of dependencies specified in the `needs` property. For more information about server variables, please, follow [this link](../api-reference-docs/guides/try-it-console.md#servers). You can also check out the example below.

We also improved some of the existing properties in the component:

- `properties` can now accept a function. The number of function arguments depends on the number of dependencies specified in the `needs` property. Each argument should be provided in the form of a `{ request, response }` object. The function should return a new object that is merged with the default body schema.

- `parameters` can now accept a function. The number of function arguments depends on the number of dependencies specified in the `needs` property. Each argument should be provided in the form of a `{ request, response }` object.

- the `defaultExample` property now can take the `false` value. In this case, the Request Body in `OpenApiTryIt` component is entirely overridden by the user-provided `properties` object.

**Usage Example**

```ts
import {
  OpenApiTryIt,
  Alert,
  scrollToHeading
 } from '@redocly/developer-portal/ui';

## Step 1: Upsert a customer

<OpenApiTryIt
  definitionId="core"
  operationId="CreateUser"
  id="step-1"
  properties={{
    firstName: "John",
    lastName: "Smith"
  }}
  serverVariables={{
    // Example of server url: https://api.example.com/org/{organizationId}
    organizationId: {
      default: 'Google',
      enum: ['Redocly', 'Rebilly']
    }
  }}
  onResponse={({ response }) => {
    if (response.ok) {
      scrollToHeading('#step-2-create-an-order')
    }
  }}
/>

We need to use the userId in the next request.

## Step 2: Create an order

<OpenApiTryIt
  definitionId="core"
  operationId="PlaceOrder"
  id="step-2"
  needs={['step-1']}
  properties={{
    cartId: '8bb31d4b-0b88-4a29-9f08-a2af65f95dcf'
  }}
  parameters={(step1) => ({
    query: {
      userId: step1.response.body.data.user.id
    }
  })}
  placeholder={(step1) => {
    return <Alert variant="warning">Please complete step 1</Alert>
  }}
/>

```

### Fixes

- Resolved an issue with missing `description` in type `ContentItemSeo` type.
- Resolved an issue with Node 17 compatibility.
- Resolved an issue with overriding parameters in `OpenApiTryIt` component when parameters in definition are defined on the path item level.
- Resolved an issue with Reference docs anchor links in Developer portal preview builds.

---

## 1.1.0-beta.69 (2021-11-11)

- We have reorganized configuration options for modifying the `<head>` contents in your portal. Instead of adding these options to the `meta` section in `siteConfig.yaml` or to the top level of page front matter, you should now define them in a new section called [seo](./configuration/siteconfig/seo.md). This means you can now use the same configuration syntax in front matter and in `siteConfig.yaml` - a big win for consistency!

Specifically, this affects the following configuration options:

- `description`
- `image`
- `keywords`
- `title`
- `lang`
- `sitemap` in front matter
- `siteUrl` in the `siteConfig.yaml` file

and the `x-meta` [specification extension](../api-reference-docs/specification-extensions/x-meta.md) supported in integrated Reference docs pages.

Compare the previous and the new configuration approach.

```diff In siteConfig
- meta:
-   title: Example Developer Portal
-   description: The best portal ever
-   image: example.png
-   keywords: documentation,portal,api
-
+ seo:
+   title: Example Developer Portal
+   description: The best portal ever
+   image: example.png
+   keywords: documentation,portal,api
+
```

```diff In front matter
- ---
- title: Supported Markdown features
- description: Using Markdown in your developer portal
- keywords: markdown,portal,documentation
- ---
-
+ ---
+ seo:
+   title: Supported Markdown features
+   description: Using Markdown in your developer portal
+   keywords: markdown,portal,documentation
+ ---
+
```

{% admonition type="warning" name="Important" %}
We recommend migrating to the new configuration approach as soon as possible. Although currently supported, the old approach is considered deprecated and reports warnings in the portal build log.
{% /admonition %}

---

### Features

- You can now set up [JSON-LD](https://json-ld.org/) parameters for your portal in the `siteConfig.yaml` file or in the front matter for individual MD(X) pages in the portal.
- Upgraded the Reference docs package to `2.6.1` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.
- Upgraded the latest version of the `openapi-cli` package.

### Fixes

- Resolved an issue with TOC anchor links scrolling to a wrong area on a second click.
- Resolved an issue with broken absolute links in previews.
- Resolved an issue with symlinked Markdown files referenced from MDX files causing the build to crash.
- Resolved an issue with the `sitemap.xml` file not found.
- Resolved an issue with absolute links without path prefixes in Markdown snippets and MDX pages.

---

## 1.1.0-beta.68 (2021-11-02)

### Fixes

- Resolved an issue with the Reference docs version switcher getting overlapped when used with a drilldown-style sidebar.
- Resolved an issue with H1 headings from Markdown files not used in sidebar labels.

---

## 1.1.0-beta.67 (2021-10-28)

### Features

- Upgraded the Reference docs package to `2.4.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the portal page table of contents not working with headings from reusable Markdown snippets.

---

## 1.1.0-beta.66 (2021-10-28)

Broken release.

## 1.1.0-beta.65 (2021-10-22)

### Features

- Upgraded the Reference docs package to `2.4.0` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the portal unnecessarily linting definitions from the registry when they should be skipped.

- Resolved an issue with code block formatting inside the `JsonSchema` component.

- Resolved an issue with the `selectFirstItemOnExpand: true` sidebar setting not working when RBAC is set up for the portal.

---

## 1.1.0-beta.64 (2021-10-19)

### Fixes

- Reverted a change to page TOC anchor links that caused issues in the previous two releases.

---

## 1.1.0-beta.63 (2021-10-19)

Broken release.

---

## 1.1.0-beta.62 (2021-10-18)

Broken release.

---

## 1.1.0-beta.61 (2021-10-15)

### Fixes

- Updated the `openapi-core` library with the latest version of `js-yaml` that includes fixes for recent issues.

- Resolved an issue with integrated Reference docs crashing when using custom components that override the ThemeProvider.

---

## 1.1.0-beta.60 (2021-10-14)

### Fixes

- Reverted the change that added `js-yaml` from `openapi-core` in the previous version.

---

## 1.1.0-beta.59 (2021-10-13)

### Features

- The `onResponse` callback option in the `OpenApiTryIt` component now supports the `request` argument that allows it to inspect request data after performing a request.

- The `OpenApiTryIt` component now supports the `securityDefaults` property that allows users to specify default values for security schemes in their example requests.

- When using the `Link` component for custom login pages, `previousPath` now is present in `location.state`. This can be useful to get the referrer page and redirect back to it after the login.

- Upgraded the Reference docs package to `2.3.0`.

- Added the `js-yaml` package from `openapi-core` and removed `js-yaml` from portal dependencies.

---

## 1.1.0-beta.58 (2021-10-11)

### Features

- The portal now supports a global configuration file for custom redirects. The file must be named `redirects.yaml` or `redirects.json` and stored in the root directory of the portal project. The contents of the file should map each source URL to one or more destination URLs, and optionally specify the redirect type. Here's an example `redirects.yaml` file:

```yaml
'/some-old-url/':
  to: '/new-url/'
  type: 301
'/some-other-old-url':
  to: '/new-url/'
```

### Fixes

- Resolved an issue with `+` symbol encoding in `operationId` values and in file names.

- Emacs lock fils are now automatically ignored to prevent crashing the portal on some file systems.

---

## 1.1.0-beta.57 (2021-10-06)

### Features

- You can now set the default MIME type for code samples in the `OpenApiCodeSample` component. Use the `defaultMimeType` configuration option to set the default MIME type, and the `onlyDefaultMimeType` option to show only the preset MIME type in code samples. This feature is entirely optional, and code samples retain their previous behavior if these options are omitted.

- The `OpenApiTryIt` component now supports an optional `onResponse` callback that can be used to work with the response data after a successful request. In the following example, the callback is used to forward the response data to the log:

```yaml
<OpenApiTryIt
  definitionId="petstore"
  operationId="addPet"
  defaultExample="bee"
  onResponse={(data) => console.log('data: ', data)}
/>
```

- You can now configure search indexing depth for integrated Reference docs with the `searchMaxDepth` option. Set it to a number from 1 to 10 to control the maximum level of nested references that should be included in the search index. The default value is 8.

- Your portal visitors can now interactively resize the columns in any table by dragging the separators between column names in the table header.

- Upgraded the Reference docs package to `2.1.24` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved a sidebar scrolling issue when using `menuStyle: drilldown` which resulted in the sidebar content overlapping and displaying duplicated artifacts.

- Resolved an issue with the page table of contents exceeding the page width.

---

## 1.1.0-beta.56 (2021-09-29)

### Fixes

- Removed unnecessary border styling around code blocks.

---

## 1.1.0-beta.55 (2021-09-28)

### Features

- Markdown code blocks now have a handy _Copy_ button, so you can copy the entire code block with one click! This feature is global (affects all pages in the portal) and it's enabled by default in the `1.1.0-beta.55` version.

To disable it, add the following to your `siteConfig.yaml` file:

```yaml
copyCodeSnippet:
  enable: false
```

The `copyCodeSnippet` section supports options for configuring the copy button and the notification that appears after selecting it. Read more about it in [the siteConfig documentation](./configuration/siteconfig/copy-codesnippet.md).

---

## 1.1.0-beta.54 (2021-09-28)

### Features

- You can now use the `schemaExpansionLevel` property in Portal components to set the default expansion behavior for schemas. To expand the whole schema contents, set it to `all`. If you set it to a specific number, schemas are expanded only up to that level. For example, `schemaExpansionLevel: 3` automatically expands schema contents up to three levels.

The following Portal components support the `schemaExpansionLevel` property:

- `JsonSchema`
- `OpenApiCodeSample`
- `OpenApiExample`
- `OpenApiRequestBody`
- `OpenApiResponse`
- `OpenApiTryIt`

To configure the schema expansion level, add the property to the `options` object when inserting the component into a page.

### Fixes

- Resolved an issue with the background color of code blocks in MD(X) pages.

---

## 1.1.0-beta.53 (2021-09-28)

### Fixes

- Resolved an issue with search indexing of schema field names in the `JsonSchema` component.

- Resolved a padding issue in the search box which caused the search icon to cover the text.

- Resolved a caching issue with the local development server.

---

## 1.1.0-beta.52 (2021-09-26)

### Fixes

- Resolved issues with the page ToC links, and ToC settings for backwards compatibility.
- Resolved issues with the logo settings. For backwards compatibility, if there is no logo `href` defined, we default to `/`.

---

## 1.1.0-beta.51 (2021-09-24)

### Fixes

- Resolved issues with inline code styles, and missing page ToC.
- Upgraded the Reference docs package to `2.1.21` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.50 (2021-09-22)

### Features

- Implemented support for customizing the sitemap record for specific pages in the portal. This functionality is provided by the [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/) plugin.

- Upgraded the Reference docs package to `2.1.17` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved a theming issue with the text color of response headers in integrated Reference docs. The `theme.colors.responses[type].color` now properly modifies the response header text color.

---

## 1.1.0-beta.49 (2021-09-21)

### Features

- Upgraded the Reference docs package to `2.1.14` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.48 (2021-09-20)

### Features

- You can now use two new React components in your portals: `OpenApiCodeSample` and `OpenApiTryIt`. Add them to MDX pages and create step-by-step guides to teach your API consumers how to build and integrate with your APIs. These components bring in the _Try It_ console functionality and interactive request code samples from Redocly Reference into your portal pages to help you design a consistent, seamless developer experience. Both components are highly customizable, allowing you to preset default values in request examples, control the appearance of code sample tabs, and use auto-generated code samples.

---

## 1.1.0-beta.47 (2021-09-20)

### Features

- We have simplified and consolidated the table of contents (ToC) configuration options. Instead of adding multiple separate top-level items to your `siteConfig.yaml` file, you can now control all ToC-related options in one place.

That place is the new `toc` section in `siteConfig.yaml`. It supports the following options:

- `enable` - boolean, replaces `enableToc`
- `maxDepth` - number, replaces `tocMaxDepth`, requires `enable:true`

Compare the previous and the new approach to configuring the ToC. The same syntax works in `siteConfig.yaml` and in page front matter.

```diff
- meta:
-   title: Example Developer Portal
- enableToc: true
- tocMaxDepth: 4
-
+ meta:
+   title: Example Developer Portal
+ toc:
+   enable: true
+   maxDepth: 4
+
```

{% admonition type="warning" name="Important" %}
We recommend migrating to the new ToC configuration approach as soon as possible. Although currently supported, the old approach is discontinued in one of the upcoming Portal releases.
{% /admonition %}

- The table of contents is now supported in MDX pages and can be configured in their front matter (just like for MD pages). If the TOC is configured globally in the `siteConfig.yaml` file, it is now displayed on MDX pages, too.

### Fixes

- Resolved an issue with the invisible sidebar button in mobile view when the primary color in the portal theme is set to white.

---

## 1.1.0-beta.46 (2021-09-17)

### Features

- Upgraded the Reference docs package to `2.1.12` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with Webpack that appeared when using `build` and `start` commands.

---

## 1.1.0-beta.45 (2021-09-14)

### Features

- Your portal logo image can now open any custom URL when clicked, so it's no longer just decorative, but useful too! To set the custom URL, add it as the value of the `logoHref` option in the `meta` section of your `siteConfig.yaml` file.

---

## 1.1.0-beta.44 (2021-09-13)

### Fixes

- Resolved a layout issue that appeared in landscape mode on iPhone X devices.

---

## 1.1.0-beta.43 (2021-09-09)

### Features

- Upgraded the Reference docs package to `2.1.10` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolve partially corrected issue with the `colorette` dependency from the previous release.

---

## 1.1.0-beta.42 (2021-09-08)

### Features

- Upgraded the Reference docs package to `2.1.7` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the broken `colorette` dependency that would cause a crash after updating `yarn.lock`.

---

## 1.1.0-beta.41 (2021-09-02)

### Fixes

- Resolved an issue with RBAC portals crashing post-build because of invalid `pages: null` values in the sidebar.

- Resolved an issue with crashed RBAC portal builds not reported as failed.

---

## 1.1.0-beta.40 (2021-08-31)

### Features

- Upgraded the Reference docs package to `2.1.4` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.39 (2021-08-30)

### Features

- Customers who use our Apigee integration notice the App page has been fully redesigned, and now includes more detailed information on the API key status.

---

## 1.1.0-beta.38 (2021-08-26)

### Features

- Upgraded the Reference docs package to `2.1.2` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

- Implemented support for custom sanitize hooks in overrides.

### Fixes

- Resolved an issue with `logoutUrl`.

---

## 1.1.0-beta.37 (2021-08-25)

### Features

- User claims and `idpId` are now supported in the login hook.

---

## 1.1.0-beta.36 (2021-08-20)

### Features

- Upgraded the Reference docs package to `2.0.15` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Fixed a typo in the build error message displayed when a snippet file is not found.

- Resolved a styling issue with portal search results that were displayed in white text on a white background.

- Resolved an issue with hook ordering that caused crashes for some customers.

---

## 1.1.0-beta.35 (2021-08-18)

### Features

- You can now use the `LoginMenu` component in custom overrides; for example, when you want to override the navbar but still use the default login menu.

- A new hook called `OnPagination` is now supported for integrated Reference docs, and runs on pagination between Reference docs pages.

- Upgraded the Reference docs package to `2.0.14` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.34 (2021-08-17)

### Features

- Upgraded the Reference docs package to `2.0.13` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.33 (2021-08-17)

### Features

- Upgraded the Reference docs package to `2.0.12` which fixes the issue with `enum` values not displaying properly, among other improvements. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.32 (2021-08-16)

### Features

- Implemented basic support for the `x-meta` specification extension for integrated Reference docs. Add it to your API definition on the operation level to control meta tags for each page (operation). The prerequisite is that your Reference docs has `pagination: item` configured. Here is a basic example of the `x-meta` syntax:

```yaml
x-meta:
  title: title
  description: descr
  keywords: test1, test2
  image: https://
```

- Upgraded the Reference docs package to `2.0.11` and implemented all fixes to integrated Reference docs. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

---

## 1.1.0-beta.31 (2021-08-13)

### Features

- When users search for information in your developer portal, the results are now more accurate thanks to improved search weights. More specifically, pages with titles that match the search query now appear higher in the list of results than the pages that only match the query in the text body.

### Fixes

- Resolved an issue with the order of React hooks that could crash on Reference docs pages in the portal.

---

## 1.1.0-beta.30 (2021-08-11)

### Features

- Upgraded the Reference docs package to `2.0.10` - check the [Reference docs changelog](../api-reference-docs/changelog.md) for details about this version.

### Fixes

- Resolved an issue with the Ctrl+F browser search override not working on Reference docs pages in the portal.

- Resolved an issue with the _Link_ React component that would cause a circular import crash when used in a specific way with `_override`.

- Resolved an issue with an extra path prefix in `unauthorizedTryIt.link`.

---

## 1.1.0-beta.29 (2021-08-10)

### Fixes

- Improved the order of search results so that more accurate results are displayed first.

- Resolved an issue with the login menu not showing up for some users.

- Resolved an issue with protected registry URLs that were not working correctly.

---

## 1.1.0-beta.28 (2021-08-06)

### Features

This major Developer portal release introduces support for [Reference docs 2.0](../../blog/reference-docs-redesign.md) and brings a complete visual overhaul to your integrated API reference docs.

It also introduces:

- major changes to the `Button` React component usage

- the latest version of the `openapi-cli` package

**For the full list of changes and upgrade instructions, make sure to read the [migration guide](./guides/migration-guide-1-1-0.md).**

{% admonition type="warning" name="How to roll back to the old Reference docs design?" %}
Developer portal users can downgrade their portal version to `1.0.0-beta.162` to use the old Reference docs design.
{% /admonition %}

## 1.1.0-beta.1 - 1.1.0-beta.27

Internal releases.

---

## Developer portal 1.0.x

## 1.0.0-beta.168 (2021-10-26)

### Fixes

- Resolved a Webpack issue with build and start commands.

---

## 1.0.0-beta.167 (2021-10-11)

### Fixes

- Resolved an issue with Emacs lock files that caused portal crashes on some file systems.

---

## 1.0.0-beta.166 (2021-09-09)

### Fixes

- Backported a `tty` fix from the `1.1.0-beta.x` release channel.

---

## 1.0.0-beta.165 (2021-08-26)

Internal changes.

---

## 1.0.0-beta.164 (2021-08-12)

### Features

- When users search for information in your developer portal, the results are now more accurate thanks to improved search weights. More specifically, pages with titles that match the search query now appears higher in the list of results than the pages that only match the query in the text body.

---

## 1.0.0-beta.163 (2021-08-10)

Internal release.

---

## 1.0.0-beta.162 (2021-08-03)

### Features

- You can now set the `lang` property for your portal to indicate the language of your content. To set it globally for the entire portal, add it to [the meta section](./configuration/siteconfig/meta.md) of the `siteConfig.yaml` file. You can also override the global setting for individual pages by setting it in the page front matter.

- The developer portal theme now supports a new `margin` option in the `logo` section. To configure it, you can use one value (applies the same margin to all sides of the image) or specify up to four separate values. The values must follow [the standard CSS margin property syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/margin).

### Fixes

- Resolved an issue with custom data loss when using `createTemplatePage` inside `createPages` caused by the `sourcePath` hook.

- Resolved an issue with portal builds crashing when Markdown-style image formatting was used in MDX pages.

---

## 1.0.0-beta.161 (2021-07-28)

### Features

- The logo image displayed in the portal navbar can now have custom alt text. To add it, use the `logoAltText` option [in the meta section](./configuration/siteconfig/meta.md) of the `siteConfig.yaml` file.

---

## 1.0.0-beta.160 (2021-07-20)

### Fixes

- Resolved a Windows issue with custom CSS imports and images in Markdown snippets.

---

## 1.0.0-beta.159 (2021-07-08)

### Fixes

- Resolved an issue with processing `.sample.js` imports.

---

## 1.0.0-beta.158 (2021-07-07)

### Fixes

- Resolved an issue with broken absolute links in reusable snippets.

---

## 1.0.0-beta.157 (2021-07-02)

### Features

- You can now import raw code samples from standalone files into MDX pages. The approach is similar to how you would import a React component. Save your code sample as a file in your portal project with the `.sample.ext` extension, where `ext` matches the code language extension (`py`, `js`...). Then, import it at the beginning of your MDX page and insert it in the page body like in this example:

```jsx
import codeSample from './code-samples/code.sample.js';

# Page title

Page text

## Example section with code sample

<pre><code>{codeSample}</code></pre>
```

### Fixes

- Resolved an issue with local CSS stylesheets not working for some Windows users.

- Improved the approach to calculating the last modified date for pages. Additionally, `lastModified` is now available through `pageContext` globally.

---

## 1.0.0-beta.156 (2021-06-23)

### Fixes

- Resolved issues caused by a conflicting dependency.

---

## 1.0.0-beta.155 (2021-06-23)

### Fixes

- Resolved a version compatibility issue with the `gatsby-remark-image-attributes` plugin.

---

## 1.0.0-beta.154 (2021-06-22)

### Fixes

- Upgraded the Reference docs package to the latest version (`1.5.13`).

- Resolved an issue that prevented the _Try it_ console in integrated Reference docs from functioning properly.

---

## 1.0.0-beta.153 (2021-06-18)

### Fixes

- Improved the print CSS stylesheets and removed the portal navbar from the print layout.

- Resolved a regular expression issue in the Apigee integration.

---

## 1.0.0-beta.152 (2021-06-17)

### Features

- Improved support for Markdown snippets makes it possible to use admonitions, links, images and code blocks in your reusable snippet files. Snippets are no longer limited only to Markdown target pages - you can now use them in MDX pages as well.

### Fixes

- Resolved a URL-encoding issue with developer email addresses for the Apigee integration that contain the `+` symbol.

---

## 1.0.0-beta.151 (2021-06-17)

### Features

- When inserting images into your Markdown pages, you can now specify their size. Supported image size parameters are `width` and `height`, and you can set both or just one for each image. The following example illustrates how to insert a resized image:

`![Description of a resized image](./path/to/image.png#width=500px;height:350px;)`

---

## 1.0.0-beta.150 (2021-06-16)

### Fixes

- Resolved an issue with illegible content in the JsonSchema component caused by a dark background.

---

## 1.0.0-beta.149 (2021-06-15)

### Features

- Developer portal pages are now more printer-friendly thanks to improvements to the print CSS stylesheet.

---

## 1.0.0-beta.148 (2021-06-11)

### Features

- The login component in the portal navbar now supports redirecting to a custom URL after users log out of the portal. You can set the custom URL in the `login.menu` section of the `siteConfig.yaml` file. Refer to the [login component documentation](./configuration/siteconfig/login.md) for more details.

### Fixes

- Resolved an issue with inconsistent dependencies that crashed the build after performing a clean install of the portal.

---

## 1.0.0-beta.147 (2021-06-07)

### Fixes

- Automatic exclusion of the top-level `README.md` file now works as intended. If your portal has this file in the root of the project, it is now automatically excluded from the portal build and from search.

---

## 1.0.0-beta.146 (2021-05-31)

### Fixes

- Resolved an issue with the search functionality that prevented the search results from including all scopes.

---

## 1.0.0-beta.145 (2021-05-27)

### Features

- Implemented support for controlling access to portal sidebars with RBAC.

### Fixes

- Long headings in MD(X) page table of contents are now automatically wrapped when they exceed the width of the page.

---

## 1.0.0-beta.144 (2021-05-25)

### Features

- The Developer portal sidebar now supports a new configuration option - `selectFirstItemOnExpand` - to control the behavior of group items. When this option is set to `true`, selecting the group name in the sidebar automatically activates the first item in the group. When using this option, you must not add the `page` option to the same `group`.

### Fixes

- Resolved an issue with circular references preventing the `MenuItem` override from importing the original `MenuItem` and decorating it.

- Upgraded the `@redocly/reference-docs` library to version `1.5.5`.

---

## 1.0.0-beta.143 (2021-05-20)

### Features

- Upgraded the `@redocly/reference-docs` library to version `1.5.4`. Check the [Reference docs changelog](../api-reference-docs/changelog.md) for details on what's new in that version.

### Fixes

- Resolved an issue with the login button using an invalid `pathPrefix` which affected the login page URL in build previews.

- Inline code in MD(X) pages now wraps properly and no longer exceeds the width of the containing element.

---

## 1.0.0-beta.142 (2021-05-18)

### Features
- If the content on your portal is protected behind a login, you can now set up the login component without having to implement custom overrides. Define the settings for your login button and menu [in the siteConfig.yaml file](./configuration/siteconfig/login.md), then customize the user avatar in the `components > login` section of the [theme.ts file](./configuration/theme.md). Note that the login component is disabled by default, and that it requires you to configure login and authentication settings for the portal.

- The portal now supports a login page in local development mode, making it easier to simulate the login process for debugging purposes.

- The following Apigee page components are now built into the portal and can be imported from `@redocly/developer-portal/apigee`:

  - `AppPage`
  - `AppsPage`
  - `CreateAppPage`

Check the [developer portal starter repository](https://github.com/Redocly/developer-portal-starter/pull/91) for an example, and refer to our [Apigee integration](./guides/apigee-integration-portal/overview.md) documentation to understand how Apigee works with Redocly Developer portal.

---

## 1.0.0-beta.141 (2021-05-12)

### Features

- You can now integrate [Google Global Site Tag](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-gtag) into your developer portal. When configured, this integration works only in production, not in local development mode. Check our [siteConfig.yaml documentation](./configuration/siteconfig/analytics.md) for instructions on how to set it up.

- Developer portal now supports overriding the global `App` wrapper to set a custom global context. The override should be created as a new file `_override/App.tsx`, and the portal must be restarted after saving the file to apply the changes.

- The `usePageData` helper can now return `pageId` (an internal portal page ID) and the page `frontmatter` object (if applicable).

### Deprecated

- The package `@redocly/ui` is now deprecated. **From this version forward, use `@redocly/developer-portal/ui` instead.**

---

## 1.0.0-beta.140 (2021-05-11)

### Fixes

- Resolved an issue with old versions of the `yaml` module that could happen when upgrading the portal without removing the `.lock` file.

- Resolved an issue with builds breaking for portals that use the `JsonSchema` component after upgrading to the `1.0.0-beta.139` version.

- Implemented the improvements from [Reference docs 1.5.1](../api-reference-docs/changelog.md).

---

## 1.0.0-beta.139 (2021-05-07)

### Features

- We have improved the organization of the main portal configuration file, `siteConfig.yaml`. All analytics integrations are now configured under the top-level `analytics` key. Compare the old and the new configuration syntax:

```diff
- ga:
-   trackingId: your-google-analytics-tracking-id
- googleTagManager:
-   id: your-google-tag-manager-id
-
+ analytics:
+   ga:
+     trackingId: your-google-analytics-tracking-id
+   googleTagManager:
+     id: your-google-tag-manager-id
+
```

Although the old configuration syntax still works, it displays warnings in the log, so we recommend switching to the new one.

- You can now integrate [FullStory analytics](https://www.fullstory.com/) into your developer portal. When configured, this integration works only in production, not in local development mode. Set it up in your `siteConfig.yaml` file like in the following example:

```yaml
analytics:
  fullstory:
    fs_org: YOUR_ORG_ID
```

### Deprecated

- The `headerIcon` option in the `siteConfig.yaml` configuration file has been deprecated. Use `logo` instead to set the path to your portal logo.

### Fixes

- Resolved an issue with the `hideInfoSection: true` not working in integrated Reference docs pages.

---

## 1.0.0-beta.138 (2021-04-29)

### Features

- Rich metadata images are now supported in the front matter of MD(X) pages. Add `image: /path/to/image-file` to the front matter of a page to set up its preview image. This image is displayed when sharing the link to the page on social media.

- You can now set the contents of the `<meta name="keywords">` tag in your portal. Provide the keywords as a comma-separated list, e.g. `keywords: documentation, api, openapi` in the `meta` section of the `siteConfig.yaml` file. You can also override the site-wide keywords and set them in the front matter of each individual MD(X) page.

- At last, the developer portal theme lets you style buttons. You can change the font weight and font family of the button text, control button shadowing and hover behavior, and set the border radius for the button element. All these options should be set in the `components > buttons` section of your `theme.ts` file. Additionally, we have improved the overall default appearance of buttons in the portal, and made their font sizes and shadows more consistent.

### Fixes

- Resolved an issue related to Next/Back buttons when RBAC is enabled in the portal.

---

## 1.0.0-beta.137 (2021-04-29)

Broken release.

---

## 1.0.0-beta.136 (2021-04-22)

### Fixes

- Resolved an issue with the wrong `core-js` import that was crashing the tests for some of our customers.

---

## 1.0.0-beta.135 (2021-04-19)

### Features

- To improve the navigation in your developer portal, you can now enable the "Back to" button on MD(X) pages. To enable the button site-wide, for all pages at once, add `showPrevButton: true` to the `siteConfig.yaml` file. Alternatively, enable it only on specific pages by adding `showPrevButton: true` to the page front matter.

- If you reference any files (such as images or Markdown pages) in the front matter of your MD(X) files, those files are now copied to the `static` folder in the portal. References to those files are automatically replaced by their destination links.

### Fixes

- Resolved an issue with `require` images caused by the upgrade to Gatsby v3.

---

## 1.0.0-beta.134 (2021-04-15)

### Features

- The portal can now use top-level context to pass the current API definition down to components. This allows users to import the context (as `import {usePageData} from '@redocly/developer-portal/ui'`) and use it in their own custom components (as `const {rawApiDefinition} = usePageData();`).

### Fixes

- Removed the old version of the API Overview page in integrated Reference docs and implemented support for the new one.

- After logout, the portal now redirects to a path with a trailing slash.

- Definition IDs with dashes (e.g. `api-main`) now work properly with components that require `definitionId`, such as OpenApiExample or OpenApiRequestBody.

- Resolved an issue where long group sublabels in drilldown sidebar style would overflow the sidebar width.

- Resolved an issue with the portal navbar not taking the full screen width and displaying gaps on the sides.

- Resolved an issue with incorrect paths for the Reference docs license key on Windows.

---

## 1.0.0-beta.133 (2021-04-15)

Broken release.

---

## 1.0.0-beta.132 (2021-04-13)

### Fixes

- Resolved an issue with RBAC where menu item permissions in the sidebar were lost for pages added using the `/*` pattern.

---

## 1.0.0-beta.131 (2021-04-13)

### Features

- We have migrated the Developer portal to [Gatsby v3](https://www.gatsbyjs.com/blog/gatsby-v3/), updated all outdated dependencies, and resolved security warnings.

{% admonition type="warning" %}
To upgrade your portal to this version, first remove `yarn.lock`, then run `yarn clean`, followed by `yarn install`.
{% /admonition %}

### Fixes

- Checkboxes for oAuth2 scopes in the clientCredentials flow are now properly rendered in the Reference docs _Try it_ console.

---

## 1.0.0-beta.130 (2021-04-07)

### Fixes

- Resolved an issue with the search index not working for partial operation path fragments (e.g. in `user/findById`, the `findById` part was not searchable).

- Improved the custom login functionality for multiple identity providers. This is supported only in developer portals hosted on-premise.

---

## 1.0.0-beta.129 (2021-04-06)

### Fixes

- Resolved an issue with the sidebar and the _Try it_ console scrolling under the navigation bar in some cases.

- Resolved an issue with auth section links pointing to an invalid URL when using the `index.page.yaml` file in the root of the portal.

---

## 1.0.0-beta.128 (2021-04-02)

### Fixes

- Resolved an issue with the Reference docs version switcher not working correctly for operations without a tag and the overview page.

- OAS definitions errors are now displayed in the terminal output.

- Improved page scrolling handlers to optimize performance.

---

## 1.0.0-beta.127 (2021-03-31)

### Features

- The `rightPanel > width` theming option can now accept the CSS `calc` function as a value.

---

## 1.0.0-beta.126 (2021-03-31)

### Features

- The `rightPanel > width` theming option now supports media query values, allowing you to customize it depending on the screen size (example: `rightPanel: { width: { medium: '40%', large: '800px'}}`).

- The `typography > links` section of the Developer portal theme now lets you customize the `textDecoration` value.

- The `pageId` is now passed to custom Markdown template properties.

### Fixes

- Pinned the version of the `informed` library to prevent an infinite loop when opening the _Try it_ console in Reference docs.

---

## 1.0.0-beta.125 (2021-03-29)

### Fixes

- Resolved an issue with RBAC not working for portals hosted in Workflows when the `auth` section was omitted from the `siteConfig.yaml` file.

---

## 1.0.0-beta.123 (2021-03-27)

### Features

- You can now customize the width and padding of the main content wrapper (the area containing the text from your MD(X) pages). This is done by modifying the values in the `contentWrapper` section of your portal `theme.ts` file:

```ts
components:
  contentWrapper: {
    maxWidth: '910px',
    paddingHorizontal: '0',
    paddingVertical: '40px',
  },
```

### Fixes

- Resolved an issue with the incorrect default `maxWidth` value of the main content wrapper element.

---

## 1.0.0-beta.122 (2021-03-27)

### Features

- You can now customize the values for `marginTop`, `marginBottom`, `marginLeft` and `marginRight` in the developer portal `theme.ts` file for all heading levels (H1 to H6). Here is an example for H2:

```ts
heading2: {
    fontSize: '1.50em',
    fontWeight: '600',
    color: '#000000',
    capitalize: false,
    marginTop: '1.25em',
    marginBottom: '0.8em',
},

```

- The developer portal now allows you to define the value of theming options as a breakpoints object. When configured in this way, theming options are used according to the breakpoints specified in the theme, ensuring your portal looks great at any screen size.

Here is an example excerpt from the `theme.ts` file showing how to define a breakpoints object for `typography.fontSize`:

```ts
  breakpoints: {
    small: '320px',
    medium: '720px',
    large: '1280px',
  },
  typography: {
    fontSize: { _: '36px', small: '42px', medium: '52px', large: '60px' },
    lineHeight: '1.6'
  }
```

In this example, the font size of 42 px is used only on small screen sizes. Values configured as strings (like `lineHeight` in the example) are used on all screen sizes. The special breakpoint `_` cannot be manually set in the `breakpoints` section of the theme, but you should use it in all breakpoints objects. It defines the value for the smallest screen sizes (0 to "small"). If you don't specify it, the default theme value is used instead.

The following theming options now support the breakpoints object as the value (in addition to previously supported string values):

```yaml
typography:
    fontFamily,
    fontSize,
    lineHeight,
    code:
        fontFamily,
        fontSize
    headings:
        fontFamily,
        lineHeight
    heading1 to heading6:
        fontFamily,
        fontSize,
        lineHeight,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginHorizontal,
        marginVertical
    rightPanelHeading:
        fontFamily,
        fontSize,
        lineHeight
    fieldName:
        fontFamily,
        fontSize,
        lineHeight
schema:
    constraints:
        fontFamily,
        fontSize,
        lineHeight
    examples:
        fontFamily,
        fontSize,
        lineHeight
sidebar:
    fontFamily
codeBlock:
    tokens:
        default:
            fontFamily,
            fontSize,
            lineHeight
```

- A new theming option `showAtBreakpoint` is supported in the `rightPanel` section of the `theme.ts` file. Use this option to control the starting screen size at which the right panel is visible in Reference docs pages. Its value must be a string, and it must match one of the breakpoints defined in the theme.

**Example**

```ts
rightPanel: {
    backgroundColor: 'red',
    textColor: '#000000',
    showAtBreakpoint: 'medium'
    }
```

### Fixes

- 301 redirects are now supported and are functional in build previews for developer portals hosted in Redocly Workflows.

- Removed the linear gradient when the `bgImage` property is used with the Jumbotron component.

---

## 1.0.0-beta.121 (2021-03-23)

### Features

- A new type of alert (or admonition) called `info` is now supported in Markdown files. Read more about [using admonitions](./guides/markdown.md#admonitions).

- You can now customize all types of alerts directly in the developer portal theme. New theming options cover font and color changes, including the option to set custom icons for alert boxes.

- Speaking of custom icons, you can now change the default icon used in the search bar (when search is enabled in your portal). Override the default icon with another one of your choice, or just modify its color. These options must be set in the developer portal theme.

- Blockquotes now support additional styling options in the developer portal theme.

### Fixes

- Internal links are now handled client-side and no longer trigger a full page reload.

- Resolved an issue with the `logout` helper function redirecting to a wrong location when the portal was built with `--prefix-paths`.

- Text formatted as inline code now properly supports line breaks and no longer overflows the page width.

- Removed excessive top margin from the content wrapper.

- The icons in alert boxes (also known as admonitions) are now centered in relation to the text, and their appearance has been improved to make them stand out.

---

## 1.0.0-beta.120 (2021-03-19)

### Features

- You can now disable [Sharp-based image optimization](https://github.com/lovell/sharp) for your developer portal by setting `disableImagesOptimization: true` in the `siteConfig.yaml` file. Sharp is now an optional dependency in the portal installation, so if it fails to install for any reason, the portal continues to work.

- Image optimization is now disabled by default in portal development mode. To enable it in your local development server:

  - either add the `--with-images-optimization` flag to the `start` command in `package.json`,

  - or run the server with `yarn start --with-images-optimization`.

---

## 1.0.0-beta.119 (2021-03-18)

### Features

- A new front matter option `redirectFrom` is now supported in MD(X) pages. Use this option to define a list of one or more URLs. This option creates meta-refresh redirects from all listed URLs to your page when building the portal.

### Fixes

- Resolved several minor issues with search indexing for integrated Reference docs with pagination set to `item` or `section`.

---

## 1.0.0-beta.118 (2021-03-18)

### Features

- Markdown files now support simpler, more convenient syntax for admonitions (warnings, notes, tips...). You can use these admonition types: `info`, `success`, `warning`, `danger`, `attention` - [read the documentation](./guides/markdown.md#admonitions) for more details. Here's a comparison of the old and the new syntax:

```diff
- <div class="warning"><b>Optional title</b>
-
- Some warning text
-
- </div>
+ :::warning Optional title
+
+ Some warning text
+
+ :::
```

### Fixes

- The search functionality now works for integrated Reference docs when pagination is set to `item` or `section`.

---

## 1.0.0-beta.117 (2021-03-16)

### Features

- New, simplified pagination options for Reference docs are now supported in the Developer portal. The behavior and settings for paginated Reference docs in the portal are now consistent with that of standalone Reference docs. Find more details on new defaults and how to adjust them in the [Migration guide](#migration-guide) section.

- A new configuration option `hideInfoDescription` is now supported in `.page.yaml` files for finer control over the integrated Reference docs content.

### Deprecated

- When integrating Reference docs into your portal, do not use the following options in `.page.yaml` file(s), as they are no longer supported:

  - `expand`

  - `includeSections`

  - `showInfo`

- When declaring the type for integrated Reference docs in `.page.yaml` file(s), set it as `type: reference-docs`. Setting it as `type: redoc` is no longer supported.

### Migration guide

After upgrading to **Developer portal 1.0.0-beta.117**, you may notice some changes in your integrated Reference docs. You may also need to modify the configuration options in your `.page.yaml` files.

**Here's a list of changes and new defaults you may want to adjust:**

- Build logs show warnings for the `type: redoc` value in your `.page.yaml` file(s). Change it to `type: reference-docs`.

- The `showInfo` option is no longer supported in `.page.yaml` files. The functionality of `showInfo: true` is now the default, so you can remove it from `.page.yaml`. To replace the functionality of `showInfo: false`, add `hideInfoSection: true` under `settings`.

```yaml
type: reference-docs
definitionId: example
settings:
  hideInfoSection: true
```

- By default, your integrated Reference docs now have an API overview page like the standalone Reference docs, with basic information about the API and the Download button. This page has its own menu item in the sidebar, and uses the `info.title` value from the API definition as the default item name. To set a custom menu item name, use the `label` option in the `.page.yaml` file. To hide the Download button on the API overview page, add `hideDownloadButton: true` under `settings`. To hide the entire API overview page and its menu item in the sidebar, add `hideInfoSection: true` under `settings`.

- The `expand` option is no longer supported in `.page.yaml` files. To replace the functionality of `expand: false`, add `pagination: none` under `settings` in your `.page.yaml` file, then include that `.page.yaml` file in `sidebars.yaml` as follows:

```yaml
exampleSidebar:
  - page: openapi/reference.page.yaml/*
  - page: other-example-page.md
```

To replace the functionality of `expand: true`, add either `pagination: item` or `pagination: section` under `settings`˙.

- The `includeSections` option is no longer supported in `.page.yaml` files. To replace the functionality of `includeSections: false`, add `hideInfoDescription: true` under `settings`. The functionality of `includeSections: true` is now the default, so you can remove it from `.page.yaml`.

- Markdown sections from your API definition `info.description` are now displayed by default. To hide them, add `hideInfoDescription: true` under `settings`. This does not hide the entire `info` section.

- The authentication section is added by default to your `info.description` sections. To hide it, add `noAutoAuth: true` under `settings`.

**In summary, consider adding these settings to hide content that's now visible by default:**

```yaml
settings:
  hideInfoSection: true
  hideInfoDescription: true
  hideDownloadButton: true
  noAutoAuth: true
```

### Fixes

- Implemented the set of improvements from [Reference docs 1.3.19](../api-reference-docs/changelog.md).

---

## 1.0.0-beta.116 (2021-03-11)

### Features

- New [theming options for item spacing](./configuration/sidebar-nav.md) are now supported in the sidebar.

### Fixes

- The version switcher sticks to the the top of the sidebar.
- Fixed group expand/collapse behavior for specific cases.
- Fixed inconsistent spacing when groups and pages are at the same level.

---

## 1.0.0-beta.115 (2021-03-10)

### Features

- In addition to previously supported relative links (`../guides/example.md`), your links to MD(X) files can now be absolute (`/guides/example.md`) from the root of the Developer portal. This gives you more freedom when linking your content.

- The version switcher element for quick navigation between multiple API documentation versions is now supported in the Developer portal. To enable it for integrated Reference docs in your portal, list the `versions` you want to display in the `.page.yaml` file(s). Read more in the [reference docs integration](./guides/reference-docs-integration.md).

---

## 1.0.0-beta.114 (2021-03-10)

## 1.0.0-beta.113 (2021-03-10)

Broken releases.

---

## 1.0.0-beta.112 (2021-03-04)

### Features

- Redocly Developer portal now sports a freshly redesigned sidebar. It's not just about the looks, either - several sidebar theming and configuration options are now available. For example, you can add a custom icon and custom description text to sidebar groups when using the `drilldown` sidebar style. A new type of separator - horizontal divider line - is also supported, and can be added to the sidebar as `separatorLine: true`. New theming options make it possible to change the sidebar background color, font family and size, separator color, and control the spacing of items. Read more on [how to customize the portal sidebar](./configuration/sidebar-nav.md) in the documentation.

**Updating to this version of Developer portal automatically changes the visual style of your portal sidebar, but it does not change your sidebars.yaml file contents.**

To revert to the old sidebar style, you must either downgrade your Developer portal to an older version or override the sidebar. A basic override example is available in [the developer portal starter repository](https://github.com/Redocly/developer-portal-starter/pull/15/files).

### Fixes

- Implemented the set of UX improvements to the _Try it_ console from [Reference docs 1.3.17](../api-reference-docs/changelog.md).

---

## 1.0.0-beta.111 (2021-03-03)

### Features

- The **Next to** navigation button visible at the bottom right of portal pages can now be hidden. You can disable it for the entire developer portal by setting `showNextButton` to `false` in the `siteConfig.yaml` file. Alternatively, hide it for each individual page by setting `showNextButton: false` in the front matter of your MD(X) files.

- Canonical URLs are now supported in the developer portal. To enable this, set a value for `siteUrl` in the `meta` section of your `siteConfig.yaml` file (for example, `siteUrl: 'https://www.example.com'`). This value will be used as the base URL for canonical links, and `rel="canonical"` will be automatically added to the head of all HTML pages in your portal.

---

## 1.0.0-beta.110 (2021-02-24)

### Features

- A new helper function called `usePathPrefix` is now available and can be imported from `@redocly/ui`.

- A new front matter option `exclude` is now supported on MD and MDX pages. Use it to exclude an entire page from the portal build by adding `exclude: true` to the page front matter.

- The `WideTile` component now supports the `maxWidth` property. You can configure the property as a percentage or as an exact amount of pixels.

### Fixes

- Issues with the Reference docs configuration option `showRightPanelToggle` have been resolved.

- Tile components now properly support `mailto:` links.

- If your developer portal project contains a top-level `README.md` file, this file is now excluded from the portal build.

- When using the `WideTile` component that contains an icon, the icon and the content is now aligned to the top of the tile element instead of to the center.

---

## 1.0.0-beta.109 (2021-02-16)

### Features

- Implemented support for multiple identity providers in the on-premise Docker container. Identity providers can be configured in the `auth` section of the siteConfig.yaml file.

- The `LoginPageLink` component now supports a new property called `idpId`. Use it to specify one of the identity providers configured in the siteConfig.yaml file. If you're using React hooks, you can now import the custom hook `useLoginPageUrl` from `@redocly/ui` and use it with `idpId` like in the following example:

```js
const loginLink = useLoginPageUrl(idpId);
```

**Note that these changes apply only to the on-premise Docker container, not to hosted Developer portals.**

### Deprecated

- The `allowLoginWith` configuration option for the on-premise Docker container is now deprecated and should not be used.

---

## 1.0.0-beta.108 (2021-02-12)

### Fixes

- Fixed breaking builds after `yarn.lock` and `node_modules` are deleted.

- Fixed the `--relative-paths` argument by using path prefixes from an environment variable.

- Fixed incorrect path resolution of reusable Markdown snippets.

---

## 1.0.0-beta.107 (2021-02-12)

Broken release.

---

## 1.0.0-beta.106 (2021-02-02)

### Fixes

- Pinned `mobx` dependency to prevent crashes when upgrading.

---

## 1.0.0-beta.105 (2021-01-28)

### Fixes

- The search index no longer crashes when page names start with `_`.

- Resolved a cryptic JavaScript error when the portal failed to load an OpenAPI definition.

- Improved real-time reloading when the sidebar state changes to `expanded`.

---

## 1.0.0-beta.104 (2021-01-25)

### Fixes

- Fixed crashing when reusable Markdown snippets are embedded in MDX.

- Added a warning that snippets are not supported in MDX.

- Removed bad `#undefined` hash in some links.

---

## 1.0.0-beta.103 (2021-01-25)

### Features

- Redocly now supports single-source authoring and content reuse with Markdown snippets. Create "chunks" of text, save them as Markdown files in your developer portal project, and embed them into other pages across the portal.

### Fixes

- Implemented support for `pathPrefix` in the RBAC feature.

- The HTTP scheme name (e.g. Bearer) is now capitalized in code samples.

---

## 1.0.0-beta.102 (2021-01-20)

### Features

- Users can now override defaults to customize `SearchInput` and `SearchResults` components.

---

## 1.0.0-beta.101 (2021-01-15)

### Fixes

- Removed many incorrect warnings that were cluttering the console output.

---

## 1.0.0-beta.100 (2021-01-15)

### Fixes

- Resolved an issue with mermaid diagrams overflowing the page size.

- Resolved a HTML-related nesting issue by rendering `ThinTile` as a `div` if it doesn't have the `to` property.

- Lint problems are now ignored for registry downloads.

---

## 1.0.0-beta.99 (2021-01-14)

### Features

- Developer portal now supports auto-generated C# and Python code samples in embedded API reference documentation.

### Fixes

- Implemented support for the correct default RBAC permission.

- The mobile view button for expanding the sidebar menu has been temporarily disabled because of a bug in the full non-paginated reference docs page.

---

## 1.0.0-beta.98 (2021-01-04)

### Features

- A new front matter configuration option is available - `excludeFromSearch`. When you add `excludeFromSearch: true` to the front matter of a Markdown page, the page is excluded from the search index and is not accessible from the search results.

- Implemented support for `matchPath` in MDX pages. This functionality is required for advanced client routes and for the upcoming Apigee portal integration.

### Fixes

- Hash fragments (named anchors) can now be used in relative links to MD and MDX pages; for example `[link](./file.md#section-id)`.

- Previously, OAS 2 API definitions could be imported only as files from the local filesystem. Now they can be imported from URLs, and they work with registry snapshot URLs (including the **Logs > Snapshots > Get Snapshot** option).

- Resolved a minor styling issue with the position of anchor link icons when targeting an HTML heading.

---

## 1.0.0-beta.97 (2020-12-30)

Broken release.

---

## 1.0.0-beta.96 (2020-12-17)

### Features

- It is now possible to customize the entire sidebar menu. Check [the developer portal starter](https://github.com/Redocly/developer-portal-starter/pull/48/commits/1d01b62ca63eb6616157cdf63c52d987516d19b8) repository for an example of how to change the sidebar style.

- By popular demand, links in the navigation bar can now have custom icons. To add a custom icon for an item, provide the path to the icon image as the value of the new `icon` field in the `nav` section of the `siteConfig.yaml` file. An example is available in [the developer portal starter](https://github.com/Redocly/developer-portal-starter/pull/54/files#diff-4248001cd025a68fa88a4400f1487281dc7b7142e27ad7af2fd76bbc34d126b2R25) repository.

### Fixes

- Improved the look of parameters with multiple examples in Reference docs.

---

## 1.0.0-beta.95 (2020-12-15)

### Fixes

- Implemented support for using API reference docs as the index page of the developer portal. This can be achieved either by renaming the reference docs page to `index.page.yaml` or by setting `path: "/"` in the corresponding `.page.yaml` file.
- `Button` components without a `to` link are now rendered as `<button>` instead of as `<a>`.
- Portal no longer crashes when the `siteConfig.yaml` file contains an invalid page item in `nav`.

---

## 1.0.0-beta.94 (2020-12-03)

### Features

- Sidebar items can now be customized independently of the developer portal theme. Check [the developer portal starter](https://github.com/Redocly/developer-portal-starter/pull/48) repository for an example of how to style the sidebar items.

---

## 1.0.0-beta.93 (2020-11-26)

### Features

- A new CLI option `--ignore-openapi-errors` is now supported. When this option is used, the portal build does not fail if validation errors are found in API definition files.

- Implemented a new helper React hook called `useAPICatalog` in `@redocly/ui`. It returns a list of all API definitions in the developer portal project (plus some metadata), and can be used to create API catalog pages.
  ​

---

## 1.0.0-beta.92 (2020-11-23)

- Internal release without changes.

---

## 1.0.0-beta.91 (2020-11-22)

### Features

- Implemented support for the RBAC (Role-based access control) feature. With RBAC, you can define permissions for accessing specific parts of your developer portal, and assign those permissions to different types of users (roles). This feature is available only to Enterprise customers, and only if the developer portal is hosted on-premise using Docker.

### Fixes

- Fixed the style for code blocks inside headings.

---

## 1.0.0-beta.90 (2020-11-18)

### Features

- The `siteConfig.yaml` file now supports linking to external API definition files by using `$ref` in the `oasDefinitions` section.

---

## 1.0.0-beta.89 (2020-11-13)

### Fixes

- Resolved an issue with alert content rendering when content was passed as React children.
- Minor TypeScript type fixes been implemented.

---

## 1.0.0-beta.88 (2020-11-06)

### Features

- The Alert UI component now supports nested content for all alert variants. Nested content is added to an alert using the `children` property.

### Fixes

- Properly applied the fix for broken code highlighting on initial page load (issue carried over from previous release).
- All page links on the portal now use lowercase letters. Page links that previously contained uppercase letters are automatically transformed to all lowercase letters (for example, `./developer-portal/Getting-Started.md` becomes `/developer-portal/getting-started/`). **As a consequence, some links may break after updating to this version of the Developer portal.**
- When adding pages to the portal using the `/*` "spread" pattern to include all files from a path, the pages are now grouped by folder in the navigation sidebar.

---

## 1.0.0-beta.87 (2020-11-02)

### Fixes

- Resolved an issue with broken code highlighting on initial page load.
- Implemented a performance fix in search-indexer for API definitions that use deep-nested `oneOf`. This change potentially resolves the RAM overflow issue reported by some customers.
- Fixed the 401 error for manifest.json file when using basic authentication.

---

## 1.0.0-beta.86 (2020-10-29)

### Features

- Code samples in Reference docs can now be automatically generated for curl, JavaScript, and Node.js. This feature can be enabled for on-premise Developer portal deployments by [editing the `.page.yaml` configuration file](./guides/reference-docs-integration.md).

### Fixes

- Reduced the clutter in the browser log output.

---

## 1.0.0-beta.85 (2020-10-28)

### Features

- Upgraded to the latest version of reference-docs. This version introduces support for [CORS Proxy configuration](../api-reference-docs/guides/try-it-console.md#request-handling), allowing more control over requests sent from the "Try It" API console.

---

## 1.0.0-beta.84 (2020-10-21)

### Features

- New options for styling the portal sidebar are now available; namely: `sidebar.textColor`, `sidebar.activeTextColor`, and `sidebar.activeBgColor`.

### Fixes

- The layout of API reference docs is no longer broken on small screen sizes in Firefox. [GitHub issue reference](https://github.com/Redocly/developer-portal-starter/issues/30)
- Styled components can now be used for styling `ThinTile`, `WideTile` and `Alert`.
- Custom queries are properly extracted from MDX files with Windows-style line endings.
- `colors.<color>.contrastText` can now be used for the `Alert` text color, where `<color>` is `warning`, `success`, `error`, or `info`.

---

## 1.0.0-beta.83 (2020-10-20)

### Features

- Allow running development server on GitHub Codespaces.
- Upgrade reference-docs to `v1.1.5`.
- Copy auth metadata to artifacts folder (for on-prem auth-server).

### Fixes

- Reduced clutter in the log output.

---

## 1.0.0-beta.82 (2020-09-28)

### Fixes

- Resolved an issue with redirecting to the developer portal home page
  after the user logs out.
- Exported the `setSecurityDetails` helper.

---

## 1.0.0-beta.81 (2020-09-15)

### Fixes

- Fix `requireLogin` infinite reloading.

---

## 1.0.0-beta.80 (2020-09-15)

### Fixes

- Fix some utility functions that were not exported.

---

## 1.0.0-beta.79 (2020-09-15)

### Features

- Export helpers for anonymous login.

### Fixes

- Fix JsonSchema style issue.

---

## 1.0.0-beta.78 (2020-09-11)

### Features

- Add new side menu style: `drilldown`.

---

## 1.0.0-beta.77 (2020-09-11)

### Features

- Add new OpenAPI-powered components: `OpenApiRequestBody`, `OpenApiExample`, `JsonSchema`.

### Bug fixes

- Fix non-`expanded` reference docs broken build.

### Deprecations

- Renamed `APIResponse` to `OpenApiResponse`.

---

## 1.0.0-beta.76 (2020-09-03)

### Features

- Use remote rendering for mermaid diagrams.
- Support for IdP issued tokens for Redocly Workflows OIDC integration.

---

## 1.0.0-beta.75 (2020-09-03)

Broken release.

---

## 1.0.0-beta.74 (2020-08-26)

### Bug fixes

- Fixed badge label for webhooks (with `x-webhooks` usage).

---

## 1.0.0-beta.73 (2020-08-25)

### Features

- Upgrade to the latest Redocly `reference-docs`:
  - `x-webhooks` support
  - accessibility features

### Bug fixes

- Fixed broken pages with spread `/*`.

---

## 1.0.0-beta.72 (2020-08-17)

### Bug fixes

- Proper error message for missing pages with spread `/*` instead of crash.

### Features

- Export some auth helpers: `useProxiedFetch`, `getUserJwt`, `getUserId`.

---

## 1.0.0-beta.71 (2020-07-28)

### Bug fixes

- Fixed WideTile icon margins.

---

## 1.0.0-beta.70 (2020-07-28)

### Bug fixes

- Adjusted default style of Tiles.

---

## 1.0.0-beta.69 (2020-07-28)

### Features

- Add new style properties to ThinTile and WideTile.
- Add `colors.navbar.gradient` toggle to the `theme.ts`.
- Support code snippet title

  <details>
  <summary> Example usage </summary>

  Syntax:

  ````md
  ```js JavaScript Example
  console.log('Hello, JS');
  ```

  ```python Python Example
  print('Hello, python');
  ```
  ````

  Result:

  ```js JavaScript Example
  console.log('Hello, JS');
  ```

  ```python Python Example
  print('Hello, python');
  ```

  </details>

- Upgrade `mermaid` to `^8.6.0` (support auto-wrapping and newlines).
- Add option `tocMaxDepth` to limit the number of nested levels (globally in `siteConfig.yaml` or in front matter).
- Add option `disableLastModified` to hide last modified label (globally in `siteConfig.yaml` or in front matter).

### Bug fixes

- Fix local css loading on Windows.
- Fix inconsistent box shadow for thin tile.
- Fix site meta image.
- Support relative paths starting with `./` in sidebar.yaml.
- Support `external: true` to show external site icon for sidebar menu items.
- Fix `"Next to"` button for groups with page.
