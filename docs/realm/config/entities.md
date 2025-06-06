---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `entities`

Configure entity catalogs to organize and display different types of entities in your documentation.
You can customize each catalog to include or exclude selected entities and configure specific filters for better content organization.

## Options

{% table %}

- Option
- Type
- Description

---

- catalogs
- Map of strings to [Catalog](#catalog-object)
- **REQUIRED.**
  Map of catalog configurations for different entity types.
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
- URL path segment for the catalog.
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
  Default: `[]`

---

- titleTranslationKey
- string
- Translation key for the catalog title.
  Example: `entities.catalogs.service.title`

---

- descriptionTranslationKey
- string
- Translation key for the catalog description.
  Example: `entities.catalogs.service.description`

---

- catalogSwitcherLabelTranslationKey
- string
- Translation key for the catalog switcher label.
  Example: `entities.catalogs.service.switcherLabel`

{% /table %}

### Include object

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Type of entity to include.
  Possible values: `service`, `domain`, `team`, `user`, `apiDescription`, `apiOperation`, `dataSchema`

{% /table %}

### Exclude object

{% table %}

- Option
- Type
- Description

---

- key
- string
- **REQUIRED.**
  Entity key to exclude from the catalog.
  Example: `paymentsApi`, `usersApi`

{% /table %}

### Filter object

{% table %}

- Option
- Type
- Description

---

- property
- string
- **REQUIRED.**
  The entity property to filter on.
  Example: `domains`, `name`, `tags`

---

- title
- string
- **REQUIRED.**
  Display title for the filter.
  Example: `Team name`, `Service type`

---

- type
- string
- Type of filter input.
  Possible values: `select`, `checkboxes`, `date-range`
  Default: `checkboxes`

---

- hide
- boolean
- Controls filter visibility.
  Default: `false`

---

- label
- string
- Display label for the filter.
  Example: `Filter by team`

---

- options
- string[]
- Predefined filter options.
  Example: `['frontend', 'backend', 'mobile']`

---

- titleTranslationKey
- string
- Translation key for the filter title.
  Example: `entities.filters.team.title`

---

- parentFilter
- string
- Reference to parent filter for hierarchical filtering.
  Example: `domain`

---

- valuesMapping
- object
- Map of internal values to display labels.
  Example: `{ "fe": "Frontend", "be": "Backend" }`

---

- missingCategoryName
- string
- Display name for entities without this property.
  Example: `Uncategorized`

---

- missingCategoryNameTranslationKey
- string
- Translation key for missing category name.
  Example: `entities.filters.missing.category`

{% /table %}

## Examples

Here's an example showing entity catalog configuration:

```yaml
entities:
  catalogs:
    # Hide the default catalog listing all entities
    all: 
      hide: true

    # Configure services catalog
    services: 
      slug: /catalog/services
      excludes: 
        - key: paymentsApi
        - key: legacyUserService
      filters:
        - property: tags
          title: Service Type
          type: checkboxes
          options: ['rest', 'graphql', 'grpc']
        - property: domains
          title: Domain
          type: select
          label: Filter by domain

    # Configure domains catalog with custom filters
    domains: 
      slug: /catalog/domains
      filters:
        - property: name
          title: Domain Name
          type: select
        - property: teams
          title: Owning Teams
          type: checkboxes

    # Configure teams catalog
    teams: 
      filters:
        - property: name
          title: Team Name
          type: select
        - property: domains
          title: Responsible Domains
          type: checkboxes
          hide: false

    # Configure users catalog
    users:
      filters:
        - property: teams
          title: Team Membership
          type: checkboxes
        - property: email
          title: Email Domain
          type: select
          valuesMapping:
            '@company.com': 'Company Email'
            '@contractor.com': 'Contractor Email'

    # Configure API descriptions catalog
    apiDescriptions:
      filters:
        - property: metadata.specType
          title: Specification Type
          type: checkboxes
          options: ['openapi', 'asyncapi', 'graphql', 'protobuf']
          missingCategoryName: 'Unknown Spec Type'
```

## Available entity types

The following entity types are supported in includes and filters:

- **service** - Resource related to code that can be deployed (API, SDK, library, application)
- **domain** - Logical grouping of services
- **team** - Collection of users
- **user** - Individual user
- **apiDescription** - API description entity
- **apiOperation** - Action within a service defined in API description (REST endpoint, GraphQL mutation/query, etc.)
- **dataSchema** - Schema of a data structure (JSON schema, OpenAPI schema, Avro schema, etc.)

## Resources

- Follow steps to [configure navigation](../author/how-to/configure-nav/navbar.md) to include your entity catalog links.
- See the [localization](./l10n.md) reference documentation for translation options.
- Configure [navbar](./navbar.md) to add entity catalog links to your navigation.
- Learn more about [entity types](../../intranet/roadmap/realm/2025-05/catalog/entity-types.md) and their schemas.
