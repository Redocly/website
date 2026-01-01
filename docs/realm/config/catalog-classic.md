---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: |-
  Organize your content into a catalog that users can filter and search.
  You can configure multiple catalogs and set the link text, description, and filters.
---
# `catalogClassic`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}

{% img
  src="../content/images/catalog.png"
  alt="Screenshot of a catalog"
  withLightbox=true
/%}

## Options

{% table %}

- Option
- Type
- Description

---

- catalogClassic
- Map[string, [Catalog Classic](#catalog-classic-object)]
- **REQUIRED.**
  Map of strings allows for the definition of multiple catalogs.
  Strings represent catalog only in configuration file - they do not appear in published project.
  Example: `internal-apis`

{% /table %}

### Catalog classic object

{% table %}

- Option
- Type
- Description

---

- title
- string
- **REQUIRED.**
  Heading and page title in published project.
  Example: `Acme API catalog`

---

- titleTranslationKey
- string
- Page title key used for [localization](./l10n.md).

---

- icon
- string
- A [Font Awesome](https://fontawesome.com/icons) or relative path to icon image file.
  Font Awesome icons can be prefixed with type: `duotone`, `solid`, `regular` or `brands`.
  Example: `book`, `duotone book`, `./images/config-icon.svg`.

---

- description
- string
- **REQUIRED.**
  Description of the page that appears in published project.
  Example: `Discover how our APIs can support your business.`

---

- descriptionTranslationKey
- string
- Page description key used for [localization](./l10n.md).

---

- slug
- string
- **REQUIRED.**
  What you want the path segment of the URL for the catalog to be.
  Must have a leading and trailing slash.
  Must match the `page` or `href` value for the item on the [navbar](./navbar.md#item-object).
  Example: `/catalog/`

---

- filters
- [[Filter](#filter-object)]
- List of filter configurations which allows for quicker discovery.
  See [metadata](./metadata.md#catalog-categorization) for more information on how to categorize content for filtering.

---

- filterValuesCasing
- string
- Transform casing of filter values.
  Possible values: `lowercase`, `uppercase`, `sentence`, `original`.
  Default: `original`.

---

- separateVersions
- boolean
- Separates content with multiple versions into their own distinct catalog items.
  Default: `false`.

---

- groupByFirstFilter
- boolean
- Groups items by the first filter they belong to.
  Default: `false`.

---

- items
- [[Item](#item-object)]
- List of item configurations which determines what content is included in the catalog.

---

{% /table %}

### Filter object

{% table %}

- Option
- Type
- Description

---

- title
- string
- **REQUIRED.**
  Title of the filter to display above the filter options.

---

- titleTranslationKey
- string
- Filter title key used for [localization](./l10n.md).

---

- property
- string
- **REQUIRED.**
  Indicates the field from `x-metadata` (OpenAPI extension) or `metadata` (in front matter) to use for the filter.

---

- valuesMapping
- string
- Map filter values to different values.
  Useful for mapping legacy metadata values to new values.
  Default value: `{}`.

---

- missingCategoryName
- string
- If an API does not have `x-metadata` and the corresponding filter `property` defined, then the API belongs to this missing category.
  Default value: `Other`.

---

- missingCategoryNameTranslationKey
- string
- Missing category name key used for [localization](./l10n.md).

---

- type
- string
- Type of the filter in the UI.
  Possible values: `checkboxes` or `select`.

---

- parentFilter
- string
- Property name of the filter to use as a parent.
  The current filter becomes active only after the parent filter is selected.
  Useful with `select` filter as a parent.

---

- options
- [string]
- Static list of filter options to include for this filter.
  If not provided, the filter options are dynamically generated from the metadata values in the catalog.

{% /table %}

### Item object

{% table %}

- Option
- Type
- Description

---

- directory
- string
- **REQUIRED.**
  Path to the directory where the API descriptions or content files included in catalog are stored.
  Example: `./`.

---

- flatten
- boolean
- Recurses all included sub-directories for files that match the target types and includes them in the catalog.
  When false, only the top-level items that match the target types are in the catalog as well as the first file from every subdirectory.
  Default: `false`.

---

- includeByMetadata
- Map[string, [string]]
- Map of metadata properties to list of string values.
  Restricts what to include in the catalog.
  Example: `{"type": ["openapi"]}`.

{% /table %}

## Catalog classic routing behavior

When users click an item in the catalog, the routing behavior depends on your sidebar configuration:

- **With sidebars.yaml**: The catalog routes to the first item defined in the corresponding `sidebars.yaml` file that links to that catalog item
- **Without sidebars.yaml**: A sidebar is generated automatically from the files in the directory, and routing goes to the first file

This means clicking an OpenAPI document in the catalog may not navigate directly to the API reference documentation.
Instead, it navigates to whatever appears first in your sidebar configuration, such as a home page or getting started guide.

To ensure users reach specific content when clicking catalog items, organize your `sidebars.yaml` files so the most important content appears first, or create dedicated landing pages that introduce each API.

{% admonition type="info" %}

If you want to only show the catalog to users that are members of particular teams, configure
the `rbac` object in the `redocly.yaml` configuration file as follows:

```yaml
rbac:
  content:
    /catalog/:
      Developers: read
```

See [rbac](./rbac.md) reference documentation for more options and examples.

{% /admonition %}

## Examples

### Complete catalog setup

The following example shows a complete catalog configuration including the required `navbar` configuration to make the catalog accessible.

First, organize your API description files into a logical folder structure:

```treeview
my_project/
├── apis/
│   ├── payments/
│   │   ├── payments-api.yaml
│   │   └── webhooks-api.yaml
│   ├── users/
│   │   └── users-api.yaml
│   └── analytics/
│       ├── analytics-api.yaml
│       ├── index.md
│       └── getting-started.md
├── redocly.yaml
└── sidebars.yaml
```

Then configure your catalog in `redocly.yaml`:

```yaml {% title="redocly.yaml" %}
logo:
  image: ./images/logo.svg
  altText: Acme Corp
  link: https://example.com

catalogClassic:
  business:
    title: API Catalog
    description: 'Discover how our APIs can support your business'
    slug: /apis/
    items:
      - directory: ./apis
        flatten: true
        includeByMetadata:
          type: [openapi, graphql]
    filters:
      - title: Business Capability
        property: capability
        missingCategoryName: Other
        type: select
      - title: API Stage
        property: tags
        options: [beta, draft, stable]
        type: checkboxes
      - title: API Status
        property: tags
        options: [deprecated, active]
        type: checkboxes

navbar:
  items:
    - page: /apis/
      icon: ./images/api-icon.png
      linkedSidebars:
        - ./sidebars.yaml
    - label: Documentation
      href: https://redocly.com/docs/
      external: true
```

### Basic catalog configuration

The following is a minimal catalog configuration:

```yaml {% title="redocly.yaml" %}
catalogClassic:
  simple-catalog:
    title: API catalog
    description: 'Browse our available APIs'
    slug: /catalog/
    items:
      - directory: ./
        flatten: true
        includeByMetadata:
          type: [openapi]
```

### `x-metadata` filters in classic catalog

The following is an example of a classic catalog that uses `tags` property from `x-metadata` defined in the API description files.

```yaml {% title="redocly.yaml" %}
catalogClassic:
  simple-catalog:
    title: Simple API catalog
    description: Discover how our APIs can support your business
    slug: /apis/
    filters:
      - title: Content type
        property: tags
        options: [Books, Magazines]
        type: select
```

## Resources

- **[Sidebars configuration](../navigation/sidebars.md)** - Configure sidebar navigation structure to control how catalog items route when clicked by users
- **[x-metadata extension](../content/api-docs/openapi-extensions/x-metadata.md)** - Add metadata to OpenAPI files that can be used as catalog filters and displayed in API documentation
- **[Hide info metadata](./openapi/hide-info-metadata.md)** - Exclude metadata from API reference documentation when you want cleaner, focused documentation presentation
- **[API Governance](https://redocly.com/docs/cli/api-standards)** - Learn about API standards and governance practices for maintaining quality and consistency
- **[Configure classic scorecard](../reunite/project/configure-classic-scorecard.md)** - Set up scorecards to check APIs against standards and maintain quality metrics
- **[Metadata categorization](./metadata.md#catalog-categorization)** - Use metadata to filter and organize APIs in the classic catalog for better content discovery
- **[Configure navbar](./navbar.md)** - Follow steps to include your catalog link in the navigation bar for easy access
