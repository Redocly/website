---
excludeFromSearch: true
---

# Advanced API docs integration

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

In addition to [quick integration with OpenAPI files](reference-docs-integration.md), the developer portal supports an advanced approach for integrating API docs into the portal with `.page.yaml` files.

This approach is required if you want to document multi-version APIs, restrict access to content with RBAC, or integrate API definitions from Redocly API registry without using the API catalog.

## Step 1: Declare your API definition(s)

Declare one or more API definitions in the `oasDefinitions` section at the top level of the `siteConfig.yaml` file.

Your API definition could be in a [multi-file format](/learn/openapi/multi-file-definitions.md) or already bundled to a single file. JSON and YAML are both supported, but we use YAML in examples throughout this guide.

Declare the API definition in the following format:

`definitionId: target`

Where `definitionId` can be any custom name of your choice. You use this name to refer to your API definition in the developer portal.

You can provide the `target` in any of the following ways:

- A path to the API definition root file in the developer portal project

```yaml
oasDefinitions:
  acme: ./openapi/acme.yaml
```

- A remote URL

```yaml
oasDefinitions:
  acme: https://example.com/acme.yaml
```

- A Redocly API [registry snapshot URL](../../api-registry/guides/snapshots.md)

```yaml
oasDefinitions:
  acme: https://api.redoc.ly/registry/testing_acme/bundle/adam-api/1.0/main/openapi.yaml
```

The benefit of linking to the API registry if you use the "latest" production snapshot URL is that the developer portal rebuilds when that API is updated, so your docs are not outdated.

If you use a private registry URL, you need to use the [openapi login command](/docs/cli/commands/login) to log in for local development.

### Declare multiple APIs

You can declare multiple API definitions at once, and use any of the supported link types for each of the definitions. Every API definition must have a unique name (`definitionId`).

```yaml
oasDefinitions:
  acme: ./openapi/acme.yaml
  acme-v2: https://api.redoc.ly/registry/testing_acme/bundle/adam-api/2.0/main/openapi.yaml
  my-api: https://api.redoc.ly/registry/testing_acme/bundle/my-api/1.0.0/develop/openapi.yaml
```

## Step 2: Add pages that reference the definitions

Manually create a file `reference.page.yaml` in your portal project. You can name the file differently, but it **must** have the `.page.yaml` extension. Use the `.page.yaml` file to configure the behavior of integrated API docs like in the following example:

```yaml Single API
type: reference-docs
definitionId: acme
settings:
  jsonSampleExpandLevel: 'all'
```

```yaml Multi-versions API
type: reference-docs
versions:
  - definitionId: acme
    id: v1
    title: Acme V1
    isDefault: false
  - definitionId: acme-v2
    id: v2
    title: Acme V2
    isDefault: true

settings:
  jsonSampleExpandLevel: 'all'
```

### Supported fields in `.page.yaml` files

| Field               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Required                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `type`              | Specifies the configuration file type. Must be set to `reference-docs`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Required                                            |
| `definitionId`      | References the key (API definition name) declared in the `siteConfig.yaml`. In the **Single API** example above, `acme` is declared as the key. The `definitionId` field accepts only one value per each `.page.yaml` file, so if you want to include multiple versions of an API, use the `versions` option instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Required but mutually exclusive with `versions`     |
| `versions`          | If the API has multiple versions and you want a version switcher to appear in the API documentation, then define `versions` instead of `definitionId`. The `versions` is an array with one node per version. Each node must contain a unique `definitionId`. It may also contain an `id`, `title`, and `isDefault` value.<br><br>The `id` is used in the URL path segment and must be a unique value as well (if not defined, defaults to the `definitionId` value).<br><br>The `title` is used in the version switcher menu as the API display name (if not defined, defaults to the `definitionId` value).<br><br>The `isDefault` is the version that is pre-selected (if not defined, defaults to the first version listed in the file).<br><br>The contents of the version switcher menu are ordered in the same way as the `versions` array. | Required but mutually exclusive with `definitionId` |
| `label`             | Defines a custom label to use as the title for the API Overview page in the portal sidebar. If not defined, the value of `info.title` from the API definition is used by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Optional                                            |
| `excludeFromSearch` | If set to true, it is excluded from search results and the sitemap. Default value is false.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Optional                                            |
| `permission`        | Can be used to define the permission with [role-based access controls](../configuration/rbac.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Optional                                            |
| `settings`          | Add any of [Redocly's feature.openapi options](/docs-legacy/api-reference-docs/configuration/functionality.md) to this object.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Optional                                            |

### Set up pagination for integrated API docs

Your integrated API docs can optionally use pagination. The configuration settings and the behavior of this functionality are compatible with standalone API docs, ensuring a consistent user experience.

The following pagination modes are supported:

- `none` - no pagination. All content is displayed as one continuously scrolling page. This is the default pagination setting.

- `section` - each section is displayed as its own page. Tags and tag groups are treated as sections, so all operations grouped under one tag are displayed on one page. Operations without any tags are not supported in this mode, and pagination does not work for such operations. In this mode, tag description text is displayed on the section page together with the operations. Every page automatically gets a **Next to...** navigation button at the bottom.

- `item` - each operation is displayed as its own page, regardless of tags and grouping. In this mode, tag description text is displayed on its own separate page. If a tag doesn't have a description, selecting the tag in the sidebar expands the group to show operations under it. Every page automatically gets a **Next to...** navigation button at the bottom.

To enable pagination, add any of the modes to the `settings` section of the `.page.yaml` file:

```yaml
type: reference-docs
definitionId: acme
settings:
  pagination: section
  showConsole: true
```

If your `.page.yaml` file has multiple versions defined, the same pagination settings apply to all versions.

Keep in mind that:

- data models always render as separate pages (in both `section` and `item` modes).

- Markdown text from the `info.description` field of the API definition always behaves like a section. In `item` mode, it is displayed all on one page, instead of split into separate pages.

{% admonition type="warning" name="Important" %}
We strongly recommend you rebuild the portal after modifying pagination settings to avoid potential caching issues.
{% /admonition %}

### Show or hide content in integrated API docs

#### API overview page

By default, your integrated docs have an API overview page. This page contains basic information about the API generated from the `info` object in your API definition (the same as in standalone API docs).

To hide the entire API overview page, set `hideInfoSection` to `true`:

```yaml
type: reference-docs
definitionId: acme
settings:
  hideInfoSection: true
```

To hide only the download button on the API overview page, set `hideDownloadButton` to `true`:

```yaml
type: reference-docs
definitionId: acme
settings:
  hideDownloadButton: true
```

When you add API docs to the portal sidebar, the API overview page is automatically included as its own sidebar item. It uses the `info.title` value from the API definition as the item name. You can override this by defining a custom `label` in the `.page.yaml` file:

```yaml
type: reference-docs
definitionId: acme
label: ACME Docs Overview
settings:
  pagination: section
  showConsole: true
```

#### Markdown descriptions

By default, all Markdown text from the `info.description` field of your API definition is visible in the integrated API docs. To hide it, set `hideInfoDescription` to `true`:

```yaml
type: reference-docs
definitionId: acme
settings:reference
  hideInfoDescription: true
```

Setting `hideInfoDesciption` to `true` keeps other information from the `info` section in your API docs (such as `externalDocs`, `version` and the download button) while hiding all Markdown from `info.description`.

#### Authentication

By default, an authentication section is added to your `info.description` and displayed in integrated API docs. To hide it, set `noAutoAuth` to `true`:

```yaml
type: reference-docs
definitionId: acme
settings:
  noAutoAuth: true
```

If you hide the `info` section by setting `hideInfoSection: true`, links to the authentication section from other parts of the documentation are automatically disabled, since there is no target content for them to link to.

#### "Next to" button

When you configure `pagination: section` or `pagination: item` for your integrated API docs, all pages automatically get a "Next to..." navigation button at the bottom.

To hide this button, set `showNextButton` to `false` in the `.page.yaml` file:

```yaml
type: reference-docs
definitionId: acme
settings:
  showNextButton: false
```

## Step 3: Include the pages in the sidebar (or other places)

To make sure your integrated API docs are accessible from the portal sidebar, link to the `.page.yaml` file within `sidebars.yaml`.

You can add the API docs page to the sidebar in any of the following ways:

- As a plain file link to the `.page.yaml` file. All operations from your API definition are included in the sidebar as a group, and the group is labeled with the API name.

- As a "wildcard" link to the `.page.yaml` file (for example, `acme.page.yaml/*`). This adds all operations from your API definition to the sidebar without any explicit grouping. However, some operations may be automatically grouped if your API definition uses tags. You may define a group in the `sidebars.yaml` file manually.

- As a link to a specific operation or tag in your API definition. This creates a link to a single operation or tag in the sidebar. You can link to an operation by targeting its `operationId` (for example, `reference.page.yaml#operation/exampleOperation`) if `pagination: item` is set in the referenced `.page.yaml` file. To link to a tag, you must target its name (for example, `reference.page.yaml#tag/exampletag`) and `pagination: section` must be set in the referenced `.page.yaml` file.

{% admonition type="warning" name="Important" %}
An operation can only be referenced once within the sidebars. A sidebar with both `reference.page.yaml` and `reference.page.yaml#operation/createUsersWithArrayInput` would have a conflict because the `createUsersWithArrayInput` operation is already included in the `reference.page.yaml`.
{% /admonition %}

The following examples illustrate different ways to include API docs pages in the sidebar.

```yaml All operations (grouped)
- group: Reference docs
  pages:
    - page: reference.page.yaml
```

```yaml All operations (wildcard without grouping)
- group: Reference docs
  pages:
    - page: reference.page.yaml/*
```

```yaml Single operation
- group: Reference docs
  pages:
    - page: reference.page.yaml#operation/createUsersWithArrayInput
```

The following tables illustrate the behavior of integrated API docs depending on the pagination, API definition tags, and sidebar link types.

`pagination: none`

| Tags | Sidebar file link                                                                                                                                                                                                | Sidebar wildcard link                                                                                                                                                                    | Tag link format              | Operation link format                 |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------- |
| Yes  | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags have their own links but are not separated from operations. All operations are on a single continuous page. | Every tag is a top-level sidebar item with operations grouped under it. Tags have their own links but are not separated from operations. All operations are on a single continuous page. | /`reference`/#tag/`tagName`/ | /`reference`/#operation/`operationId` |
| No   | One top-level sidebar item with all operations under it. All operations are on a single continuous page.                                                                                                         | Every operation is a top-level sidebar item. All operations are on a single continuous page.                                                                                             | None                         | /`reference`/#operation/`operationId` |

`pagination: section`

| Tags | Sidebar file link                                                                                                                                                | Sidebar wildcard link                                                                                                                    | Tag link format             | Operation link format                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------------------------- |
| Yes  | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags have their own links but are not separated from operations. | Every tag is a top-level sidebar item with operations grouped under it. Tags have their own links but are not separated from operations. | /`reference`/tag/`tagName`/ | /`reference`/tag/`tagName`/#tag/`tagName`/operation/`operationId` |
| No   | Not supported - sidebar links don't work.                                                                                                                        | Not supported - sidebar links don't work.                                                                                                | None                        | Not supported                                                     |

`pagination: item`

| Tags                      | Sidebar file link                                                                                                                                                                | Sidebar wildcard link                                                                                                                                    | Tag link format             | Operation link format                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------- |
| Tags with descriptions    | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. A tag and its description have their own link and page separate from operations. | Every tag is a top-level sidebar item with operations grouped under it. A tag and its description have their own link and page separate from operations. | /`reference`/tag/`tagName`/ | /`reference`/operation/`operationId`/ |
| Tags without descriptions | One top-level sidebar item as the main group. Every tag is a subgroup with operations under it. Tags don't have their own links or pages, and just expand when clicked.          | Every tag is a top-level sidebar item with operations grouped under it. Tags don't have their own links or pages, and just expand when clicked.          | None                        | /`reference`/operation/`operationId`  |
| No tags                   | One top-level sidebar item with all operations under it. Every operation is on its own page.                                                                                     | Every operation is a top-level sidebar item and has its own page.                                                                                        | None                        | /`reference`/operation/`operationId`  |

## Step 4: Render API docs in MDX pages

{% partial file="/docs-legacy/_snippets/api-definitions-in-mdx.md" /%}
