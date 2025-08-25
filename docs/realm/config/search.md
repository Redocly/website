---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `search`

Customize search functionality in your project. By default, search appears in the top navigation bar in the far right corner.

Use the `search` configuration to:

- Hide the search bar
- Add keyboard shortcuts for search activation
- Add suggested pages to the search modal
- Configure search facets for advanced filtering

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "search"} /%}

## Search engines

Redocly supports two types of search engines for your project:

1. **FlexSearch**: The default search engine that supports limited facets configuration. You can only adjust the [group facet](#group-facets).
2. **Typesense**: An advanced search engine with full facets configuration capabilities. Requires an Enterprise or Enterprise+ plan.

## Default search configuration

### Default categories

The default search configuration applies to all documents and includes two predefined search categories:

- **Documentation**: Includes all Markdown files present in the project.
- **API Reference**: All OpenAPI, GraphQL, AsyncAPI, and SOAP API definitions.

These categories are configured using the `redocly_category` facet field and are visible when you open the search dialog.

### Default facets

For search engines that support full facets configuration capabilities (Typesense), Redocly provides an additional filter panel featuring predefined facets:

```yaml
search:
  filters:
    facets:
      - name: Category
        field: redocly_category
        type: multi-select
      - name: HTTP Method
        field: httpMethod
        type: tags
      - name: HTTP Path
        field: httpPath
        type: multi-select
      - name: API Title
        field: apiTitle
        type: multi-select
      - name: API Version
        field: apiVersion
        type: select
```

## Options

{% table %}

- Option
- Type
- Description

---

- engine
- string
- Specifies the search engine type.
  Typesense requires an Enterprise or Enterprise+ plan.
  Possible values: `flexsearch`, `typesense`.
  Default: `flexsearch`.

---

- hide
- boolean
- Hides the search bar when set to `true`.
  Search cannot be opened with keyboard shortcuts.
  Default: `false`.

---

- shortcuts
- [string]
- Keyboard shortcuts that activate search (for example, `ctrl+f`).
  Default: `⌘+k` or `ctrl+k`.

---

- suggestedPages
- [[Page item](#page-item-object)]
- List of suggested pages.

---

- filters
- [[Filters item](#filters-item-object)]
- Advanced filters configuration.

---

- ai
- [[AI search options](#ai-search-options)]
- AI search options.

{% /table %}

### Page item object

{% table %}

- Option
- Type
- Description

---

- page
- string
- **REQUIRED.** Path to the file representing the linked page.

---

- label
- string
- Link text displayed for the item.

---

- labelTranslationKey
- string
- Link text key used for [localization](./l10n.md).

{% /table %}

### Filters item object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the search filter panel when set to `true`.
  Default: `false`.

---

- facets
- [[Facet item](#facet-item-object)]
- List of user-defined search facets.

{% /table %}

### Facet item object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.** Name of the facet. Acts as a label for the filtering control in the search dialog.

---

- field
- string
- **REQUIRED.** Facet ID. Use this ID as a key in `metadata` section when adding facets to a page.

---

- type
- string
- **REQUIRED.** Control displayed in the search dialog.
  Values: `multi-select` (select multiple filter values), `select` (select a single filter value), `tags` (applies only to HTTP method facet).

---

- isTop
- boolean
- Indicates whether the facet is a top-level facet.

{% /table %}

### AI search options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the AI search button when set to `true`.
  Default: `true`

---

- prompt
- string
- Built-in instructions for AI search.
  Applied to all AI searches in the project and not visible to users.
  Use to set greeting, tone, or other answer conditions.

---

- suggestions
- [string]
- List of suggestions displayed in the AI search interface.

{% /table %}

**Data usage and privacy:** Curious how AI Search uses your data?
Redocly AI Search runs in **inference-only mode** and does not train or fine-tune AI models on your content.
For details, see the [AI Search data usage FAQ](../faq/ai-search-privacy.md).

{% admonition type="info" %}
AI search and Typesense search indexes are only built on the production branch.
Changes to search configuration or content exclusions, like the `excludeFromSearch` front matter option, may not immediately appear in search results until the next production build.
{% /admonition %}


## Apply facets to files

To apply facets to files, use metadata properties. You can assign specific metadata to your files, such as custom facet fields for advanced filtering or predefined ones like `redocly_category` for grouping.

### Markdown files

Apply facets to Markdown files using frontmatter:

```yaml
---
metadata: 
  redocly_category: Custom 
  owner: Redocly
---
```

### OpenAPI definitions

Apply facets to OpenAPI definitions using the `x-metadata` extension:

```yaml
openapi: 3.0.0
info:
  version: 1.3.3
  title: Swagger Petstore
  x-metadata:
    redocly_category: Custom
    owner: Redocly
```

### Using metadataGlobs

Use the `metadataGlobs` property in your `redocly.yaml` configuration file to apply facets to files using glob patterns:

```yaml
metadataGlobs:
  'museum/**':
    redocly_category: Museum
  'payments/**':
    redocly_category: Payments
```

## Group facets

The group facet categorizes search results and is displayed in the top panel of the search dialog for quick switching between categories.

{% admonition type="info" %}
Only `redocly_category` facet field is used as a group facet.
{% /admonition %}

## Examples

### Basic configuration

Hide the search bar:

```yaml
search:
  hide: true
```

Set keyboard shortcuts for search:

```yaml
search:
  shortcuts:
    - ctrl+f
    - cmd+k
    - /
```

Set suggested pages for the search modal:

```yaml
search:
  suggestedPages:
    - label: Home page
      page: index.page.tsx
    - page: /catalog/
```

### Search facets

Override the default `redocly_category` facet:

```yaml
search:
  filters:
    facets:
      - name: Custom 
        field: redocly_category
        type: select           
```

Create a custom facet:

```yaml
search:
  filters:
    facets:
      - name: Owner
        field: owner
        type: select            
```

Override all default search facets:

```yaml
search:
  filters:
    facets:
      - name: Category
        field: redocly_category
        type: multi-select
      - name: HTTP Method
        field: httpMethod
        type: tags
      - name: HTTP Path
        field: httpPath
        type: multi-select
      - name: API Title
        field: apiTitle
        type: multi-select
      - name: API Version
        field: apiVersion
        type: select
```

### AI search

Display the AI search button with a custom prompt:

```yaml
search:
  ai:
    hide: false
    prompt: Speak only in rhymes
```

Set AI search suggestions:

```yaml
search:
  ai:
    hide: false
    suggestions:
      - How to create a new API?
      - What is Redocly?
      - How to manage an organization?
```

## Resources

- **[MetadataGlobs configuration](./metadata-globs.md)** - Configure metadata extraction patterns for enhanced search functionality and content organization
- **[Localization configuration](./l10n.md)** - Configure search functionality for multiple languages and international content support
- **[Configure navbar](./navbar.md)** - Configure navigation bar settings including search integration and search button customization
- **[Navigation elements](../navigation/index.md)** - Configure navigation elements in your project for comprehensive site structure and search integration
- **[Predefined translation keys](../content/localization/translation-keys.md)** - Use predefined translation keys for search interface localization and internationalization
- **[Front matter configuration](./front-matter-config.md)** - Configure search dialog behavior on individual pages using front matter, including `excludeFromSearch` option to exclude specific pages from search results
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
