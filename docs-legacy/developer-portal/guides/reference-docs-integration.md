---
excludeFromSearch: true
---

# Integrate API reference docs into your developer portal

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Your developer portal can seamlessly integrate and display API reference documentation generated from API definitions.

You can configure this in any of the following ways:

- Directly integrate OpenAPI files as described in this guide.
- Use `.page.yaml` files described in [the advanced guide](reference-docs-integration-advanced.md).
- Use the [API catalog](api-catalog.md).

{% admonition type="warning" name="Limitations" %}
Direct OpenAPI integration doesn't support multi-version APIs, integrating APIs from the Redocly API registry, restricting permissions with RBAC, or excluding specific API reference documentation from portal search results.

If you need those features, you must use [the API catalog](api-catalog.md) or advanced configuration with `.page.yaml` files.
{% /admonition %}

## Step 1: Add OpenAPI files to the portal

Add one or more OpenAPI definition files to your portal project.
You can keep them in the project root or create custom folders to organize them alongside your other documentation pages.

Your OpenAPI files must be in YAML or JSON format.
Any file extension after the first `.` character in the file name is ignored when generating the URL for the page.
This means that you can name your files `api.oas3.yaml` or `payments-api.oas.yaml`, or `payments-api.yaml`.

In the examples in this guide, we've added a file named `acme.oas.yaml` to the `openapi` folder in the root of the project.

The portal supports single-file (bundled) and multi-file API definitions.

### Customize API reference settings

To customize the behavior and appearance of your integrated API reference documentation, create or modify the [Redocly configuration file](/docs/cli/configuration) in the root of your portal project.

In the configuration file, add any of the [supported Reference settings](/docs-legacy/api-reference-docs/configuration/functionality.md) to the `theme.openapi` section.

**Example redocly.yaml**

```yaml
lint:
  rules:
    example-rule-name: error
theme:
  openapi:
    pagination: section
    showConsole: true
    theme:
      menu:
        backgroundColor: '#fffff'
```

Note that these settings apply to all your API reference documentation integrated directly with OpenAPI files.
To use different settings for each integrated API reference page, you must use the advanced configuration with `.page.yaml` files.

## Step 2: Add OpenAPI files to the sidebar

To make sure your integrated Reference docs are accessible from the portal sidebar, link to your OpenAPI files in your `sidebars.yaml` file.

Add the Reference docs page to the sidebar as path to the OpenAPI file itself using the `page` key.
This adds all operations from your API definition to the sidebar without any explicit grouping.

However, some operations may be automatically displayed in groups if your API definition uses tags. You may define a group in the `sidebars.yaml` file manually.

**Example sidebars.yaml**

```yaml
- group: Product docs
  pages:
    - label: Overview
      page: developer-portal/overview.md
- group: Reference docs
  pages:
    - page: openapi/acme.oas.yaml
```

The following tables illustrate the behavior of integrated Reference docs depending on the pagination settings in the Redocly configuration file, tags from the API definition, and sidebar link types.

`pagination: none`

| Tags | Sidebar file link                                                                                                                                                                                                | Tag link format              | Operation link format                 |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------- |
| Yes  | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags have their own links but are not separated from operations. All operations are on a single continuous page. | /`reference`/#tag/`tagName`/ | /`reference`/#operation/`operationId` |
| No   | One top-level sidebar item with all operations under it. All operations are on a single continuous page.                                                                                                         | None                         | /`reference`/#operation/`operationId` |

`pagination: section`

| Tags | Sidebar file link                                                                                                                                                | Tag link format             | Operation link format                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| Yes  | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags have their own links but are not separated from operations. | /`reference`/tag/`tagName`/ | /`reference`/tag/`tagName`/#tag/`tagName`/operation/`operationId` |
| No   | Not supported - sidebar links don't work.                                                                                                                        | None                        | Not supported                                                     |

`pagination: item`

| Tags                      | Sidebar file link                                                                                                                                                                | Tag link format             | Operation link format                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------- |
| Tags with descriptions    | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. A tag and its description have their own link and page separate from operations. | /`reference`/tag/`tagName`/ | /`reference`/operation/`operationId`/ |
| Tags without descriptions | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags don't have their own links or pages, and just expand when clicked.          | None                        | /`reference`/operation/`operationId`  |
| No tags                   | One top-level sidebar item with all operations under it. Every operation is on its own page.                                                                                     | None                        | /`reference`/operation/`operationId`  |

## Step 3: Use API reference docs in MDX pages

To use your OpenAPI definition files in MDX pages, you must first declare them in the `oasDefinitions` section of the portal `siteConfig.yaml` file.

Declare the API definition in the following format:

`definitionId: target`

Where `definitionId` can be any custom name of your choice. You use this name to refer to your API definition in MDX components.

You must provide the `target` as a path to the OpenAPI definition root file in your portal project.

```yaml
oasDefinitions:
  acme: ./openapi/acme.oas.yaml
```

{% partial file="/docs-legacy/_snippets/api-definitions-in-mdx.md" /%}
