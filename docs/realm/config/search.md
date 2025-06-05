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

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "search"} /%}

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
  Default: `/`.

---

- suggestedPages
- [[Page item](#page-item-object)]
- List of suggested pages.

---

- filters
- [[Filter item](#filter-item-object)]
- Advanced filter configuration.

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

### Filter item object

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

## Examples

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

Override default search facets:

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

## Resources

- [Configure search facets](../extend/how-to/configure-search-facets.md)
- [Configure localization](./l10n.md)
- [Configure navbar](./navbar.md)
- [Configure navigation elements in your project](../author/how-to/configure-nav/index.md)
- [Predefined translation keys](../author/reference/translation-keys.md)
- Use [front matter](./front-matter-config.md) to configure the behavior of the Search dialog on individual pages.
- Explore other [configuration options](./index.md) for your project.
