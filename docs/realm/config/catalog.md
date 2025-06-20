---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `catalog`

Configure multiple catalogs to organize and display different types of entities in your documentation. Customize each catalog with inclusion/exclusion rules and UI filters.

## Options

{% table %}

- Property
- Type
- Description

---

- catalogs
- Map of strings to [Catalog object](#catalog-object)
- **REQUIRED.**
  A map of catalog configurations. The key for each entry is a unique catalog identifier.
  Built-in keys: `all`, `services`, `domains`, `teams`, `users`, `apiDescriptions`

{% /table %}

## `catalog` object

{% table %}

- Option
- Type
- Description

---

- slug
- string
- **REQUIRED.**
  URL path for the catalog (e.g., `services`, `domains`).

---

- hide
- boolean
- Controls catalog visibility.
  Default: `false`

---

- includes
- [[Include object](#include-object)]
- A list of rules to determine which entities to include in the catalog.

---

- excludes
- [[Exclude object](#exclude-object)]
- A list of rules to determine which entities to exclude from the catalog.

---

- filters
- [[Filter object](#filter-object)]
- List of filter configurations for the catalog.

---

- titleTranslationKey
- string
- Translation key for the catalog title.
  Example: `catalog.catalogs.service.title`

---

- descriptionTranslationKey
- string
- Translation key for the catalog description.
  Example: `catalog.catalogs.service.description`

---

- catalogSwitcherLabelTranslationKey
- string
- Translation key for the catalog switcher label.
  Example: `catalog.catalogs.service.switcherLabel`

{% /table %}

### Include object

{% table %}

- Property
- Type
- Description

---

- type
- [string]
- **REQUIRED.**
  Entity type to include.
  Possible values: `service`, `domain`, `team`, `user`, `api-description`

{% /table %}

### Exclude object

{% table %}

- Property
- Type
- Description

---

- key
- [string]
- Entity `key` to exclude.
  Example: `paymentsApi`, `usersApi`

{% /table %}

### Filter object

{% table %}

- Property
- Type
- Description

---

- title
- string
- **REQUIRED.**
  Display title for the filter.

---

- titleTranslationKey
- string
- Filter title key used for [localization](./l10n.md).

---

- property
- string
- **REQUIRED.**
  Entity property to use for filtering. The value can be from `metadata` or any other top-level entity property.

---

- label
- string
- Display label for the filter.
  Example: `Team name`

---

- type
- string
- Type of filter input.
  Possible values: `select`, `checkboxes`
  Default: `checkboxes`

---

- hide
- boolean
- Controls filter visibility.
  Default: `false`

---

- options
- [string]
- Static list of filter options.
  If not provided, the filter options are generated from the metadata values in the catalog.

---

- titleTranslationKey
- string
- Translation key for the filter title.
  Example: `entities.filters.team.title`

---

- parentFilter
- string
- Property name of the filter to use as a parent.
  The current filter becomes active after the parent filter is selected.
  Useful with `select` filter as a parent.

---

{% /table %}

## Examples

### Advanced configuration

```yaml {% title="redocly.yaml" %}
entitiesCatalog:
  catalogs:
    services:
      hide: true

    domains:
      slug: domains-and-services
      includes:
        - type:
          - domain
          - service
      excludes:
        - key:
          - communication-6m1zk6-domain-2
          - communication-6m1zk6-domain
      filters:
        - property: type
          label: Type
          options:
            - domain
            - service
          type: checkboxes
          title: Types
```

This example hides the default `services` catalog and creates a new, combined catalog for domains and services with a custom filter.

## Resources
- [Configure catalog](../author/how-to/configure-catalog.md) to organize and display entities.
- See the [localization reference](./l10n.md) for translation options.