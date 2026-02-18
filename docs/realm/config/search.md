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
description: Customize the search functionality in your project.
---
# `search`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the search functionality in your project.
By default, search appears in the top navigation bar in the far right corner.

Use the `search` configuration to:

- hide the search bar
- add keyboard shortcuts for search activation
- add suggested pages to the search modal
- configure search facets for advanced filtering
- boost the ranking of pages for specific search terms
- prevent pages from appearing for specific search terms

To query search programmatically (for example, with scripts or Model Context Protocol), use the [Search API](../customization/search-api/openapi.yaml) which contains authentication, request parameters, and response format.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "search"} /%}

## Search engines

Redocly supports two types of search engines for your project:

1. **FlexSearch**: The default search engine that supports limited facets configuration.
   You can only adjust the [group facet](#group-facets).
2. **Typesense**: An advanced search engine with full facets configuration capabilities.
   Requires an Enterprise or Enterprise+ plan.

## Default search configuration

### Default categories

The default search configuration applies to all documents and includes two predefined search categories:

- **Documentation**: Includes all Markdown files present in the project.
- **API Reference**: All OpenAPI, GraphQL, AsyncAPI, and SOAP API definitions.

These categories are configured using the `redocly_category` facet field and are visible when you open the search dialog.

### Default facets

For search engines that support full facets configuration capabilities (Typesense), Redocly provides an additional filter panel featuring predefined facets:

```yaml {% title="redocly.yaml" %}
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
  This property is  *deprecated*.
  Use [AI Assistant](./ai-assistant.md) option instead.


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
- **REQUIRED.** Name of the facet.
  Acts as a label for the filtering control in the search dialog.

---

- field
- string
- **REQUIRED.** Facet ID.
  Use this ID as a key in `metadata` section when adding facets to a page.

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

The `excludeFromSearch` option excludes content from search (both AI search and keyword search), `llms.txt` and sitemap.
See [excludeFromSearch documentation](./front-matter-config.md#front-matter-only-options) for details.

{% /admonition %}

AI search and Typesense search indexes are only built on the production branch.
Changes to search configuration or content exclusions, like the `excludeFromSearch` front matter option, may not immediately appear in search results until the next production build.

## Apply facets to files

To apply facets to files, use metadata properties.
You can assign specific metadata to your files, such as custom facet fields for advanced filtering or predefined ones like `redocly_category` for grouping.

### Markdown files

Apply facets to Markdown files using front matter:

```yaml {% title="index.md" %}
---
metadata: 
  redocly_category: Custom 
  owner: Redocly
---
```

### OpenAPI definitions

Apply facets to OpenAPI definitions using the `x-metadata` extension:

```yaml {% title="museum.yaml" %}
openapi: 3.1.0
info:
  version: 2.3.3
  title: Museum
  x-metadata:
    redocly_category: Custom
    owner: Redocly
```

### Use `metadataGlobs`

Use the `metadataGlobs` property in your `redocly.yaml` configuration file to apply facets to files using glob patterns:

```yaml {% title="redocly.yaml" %}
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

## Curate search results

Influence the ranking of specific pages in search results for particular search terms.
Use `keywords` option in the front matter of a page or `x-keywords` in an OpenAPI description file to boost the page to the top of search results or exclude the page from appearing for certain keywords.

{% admonition type="info" %}
Curation is only available for the Typesense search engine, which requires an Enterprise or Enterprise+ plan.
{% /admonition %}

Behavior of pages with keywords:

- For each keyword in `includes`, the page is promoted to the top position in search results.
- If you use the same keyword in multiple pages, the pages appear at the top of search results in the order they were indexed by the search engine.
- Keywords are not case-sensitive.
- The word order in keywords is preserved: searching for "pay apple" won't trigger a keyword "apple pay".
- The first matching keyword triggers curation and stops additional keywords from being processed for that search.

### Curation parameters

Configure curation using the `keywords` object:

{% table %}

- Option
- Type
- Description

---

- includes
- [string]
- List of keywords or phrases that promote this page to the top of search results when these terms are used in the search query.

---

- excludes
- [string]
- List of keywords or phrases that prevent this page from appearing in search results when these terms are used in the search query.
  Overrides `includes` for the same keyword.

{% /table %}

### Apply curation to files

#### Markdown files

Apply curation to Markdown files using front matter:

```yaml {% title="payments.md" %}
---
keywords:
  includes:
    - apple pay
    - apple wallet
    - digital wallet
  excludes:
    - google pay
    - paypal
---
```

#### OpenAPI description files

Apply curation to OpenAPI definitions using the `x-keywords` extension.
You can apply curation at three different levels:

##### Description level

Apply curation to the root document of the API description.
The `includes` keywords boost the root document to the top of search results.
The `excludes` keywords remove the entire description file from search results for these terms.

```yaml {% title="payments.yaml" %}
openapi: 3.0.0
x-keywords:
  includes:
    - payment api
    - transaction
  excludes:
    - deprecated
info:
  version: 1.0.0
  title: Payment API
```

##### Tag level

Apply curation to a specific tag:

```yaml {% title="payments.yaml" %}
tags:
  - name: payments
    description: Payment operations
    x-keywords:
      includes:
        - wallet
        - checkout
      excludes:
        - refund
```

##### Operation level

Apply curation to individual operations:

```yaml {% title="payments.yaml" %}
paths:
  /payments:
    post:
      tags:
        - payments
      summary: Create a payment
      description: Process a new payment transaction.
      operationId: createPayment
      x-keywords:
        includes:
          - apple pay
          - credit card
        excludes:
          - google pay
          - paypal
```

#### React pages

Apply curation to React pages using front matter:

```tsx {% title="index.page.tsx" %}
export const frontmatter = {
  search: {
    title: 'React gitlab page',
    description: 'Test description for search',
    keywords: {
      includes: ['github', 'swc', 'page'],
      excludes: ['git', 'gitlab'],
    },
  }
};
```

## Examples

### Basic search configuration

Hide the search bar:

```yaml {% title="redocly.yaml" %}
search:
  hide: true
```

Set keyboard shortcuts for search:

```yaml {% title="redocly.yaml" %}
search:
  shortcuts:
    - ctrl+f
    - cmd+k
    - /
```

Set suggested pages for the search modal:

```yaml {% title="redocly.yaml" %}
search:
  suggestedPages:
    - label: Home page
      page: index.page.tsx
    - page: /catalog/
```

### Search facets

Override the default `redocly_category` facet:

```yaml {% title="redocly.yaml" %}
search:
  filters:
    facets:
      - name: Custom 
        field: redocly_category
        type: select           
```

Create a custom facet:

```yaml {% title="redocly.yaml" %}
search:
  filters:
    facets:
      - name: Owner
        field: owner
        type: select            
```

Override all default search facets:

```yaml {% title="redocly.yaml" %}
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

{% admonition type="warning" %}
This option is deprecated.
Use [AI Assistant](./ai-assistant.md) instead.
{% /admonition %}

Display the AI search button with a custom prompt:

```yaml {% title="redocly.yaml" %}
search:
  ai:
    hide: false
    prompt: Speak only in rhymes
```

Set AI search suggestions:

```yaml {% title="redocly.yaml" %}
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
