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

Configure multiple catalogs to organize and display different types of entities in your documentation.
You can customize each catalog to include or exclude selected entities to show relevant content to your users.
You can also configure filters specific to each catalog.

## Options

{% table %}

- Option
- Type
- Description

---

- catalogs
- Map of strings to [Catalog](#catalog-object)
- **REQUIRED.**
  Map of catalog configurations where each key represents a unique catalog identifier.
  Example: `services`, `domains`, `teams`
  Available catalog keys: `all`, `services`, `domains`, `teams`, `users`, `apiDescriptions`

{% /table %}

### Catalog object

{% table %}

- Option
- Type
- Description

---

- slug
- string
- **REQUIRED.**
  URL path segment for the catalog.
  Example: `services`, `domains`

---

- hide
- boolean
- Controls catalog visibility.
  Default: `false`

---

- includes
- \[[Include](#include-object)]
- List of inclusion rules that determine what content appears in the catalog.

---

- excludes
- \[[Exclude](#exclude-object)]
- List of exclusion rules that determine what content to omit from the catalog.

---

- filters
- \[[Filter](#filter-object)]
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

- Option
- Type
- Description

---

- type
- string[]
- **REQUIRED.**
  Type of entity to include.
  Possible values: `service`, `domain`, `team`, `user`, `api-description`

{% /table %}

### Exclude object

{% table %}

- Option
- Type
- Description

---

- key
- string[]
- Entity key to exclude from the catalog.
  Example: `paymentsApi`, `usersApi`

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
- \[string]
- Static list of filter options to include for this filter.
  If not provided, the filter options are dynamically generated from the metadata values in the catalog.

---

- titleTranslationKey
- string
- Translation key for the filter title.
  Example: `entities.filters.team.title`

---

- parentFilter
- string
- Property name of the filter to use as a parent.
  The current filter becomes active only after the parent filter is selected.
  Useful with `select` filter as a parent.

---

{% /table %}

## Examples

Here's an example showing more advanced configuration options:

```yaml
entitiesCatalog:
  catalogs:
    services:
      hide: true

    domains:
      slug: domains-and-services
      includes:
        - type: domain
        - type: service
      excludes:
        - key: communication-6m1zk6-domain-2
        - key: communication-6m1zk6-domain
      filters:
        - property: type
          label: Type
          options:
            - domain
            - service
          type: checkboxes
          title: Types
```

## Resources

- Follow steps to [configure navigation](../author/how-to/configure-nav/navbar.md) to include your catalog links.
- See the [localization](./l10n.md) reference documentation for translation options.
- Configure [navbar](./navbar.md) to add catalog links to your navigation.
