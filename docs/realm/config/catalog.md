---
config-name: entitiesCatalog
---
# Catalog configuration

Configure the catalog feature to display and organize entities in your project.
The catalog provides a centralized registry for APIs, services, domains, teams, and custom entity types.

## Basic configuration

Enable the catalog by adding `entitiesCatalog` to your `redocly.yaml`:

```yaml
entitiesCatalog:
  show: true
```

## Options

{% table %}
- Option
- Type
- Description
---
- show
- boolean
- Enable or disable the catalog. Default: `false`.
---
- catalogs
- object
- Configure individual catalog views. See [Catalogs configuration](#catalogs-configuration).
---
- entityTypes
- object
- Define custom entity types. See [Custom entity types](#custom-entity-types).
{% /table %}

## Catalogs configuration

Customize the built-in catalogs or create custom catalogs under `entitiesCatalog.catalogs`.

### Built-in catalogs

These catalogs are available by default:

{% table %}
- Catalog key
- Default slug
- Entity types shown
---
- all
- `all`
- All entity types
---
- services
- `services`
- service
---
- domains
- `domains`
- domain
---
- teams
- `teams`
- team
---
- users
- `users`
- user
---
- apiDescriptions
- `api-descriptions`
- api-description
---
- dataSchemas
- `data-schemas`
- data-schema
---
- apiOperations
- `api-operations`
- api-operation
{% /table %}

### Catalog options

Configure each catalog with these options:

{% table %}
- Option
- Type
- Description
---
- slug
- string
- URL path segment for the catalog (for example, `my-catalog` results in `/catalogs/my-catalog`).
---
- hide
- boolean
- Hide this catalog from the UI. Default: `false`.
---
- includes
- [object]
- Array of entity type filters to include. Each object has a `type` property.
---
- excludes
- [object]
- Array of entity exclusions. Each object has a `key` property for the entity key.
---
- filters
- [object]
- Configure filter options shown in the catalog UI. See [Filter configuration](#filter-configuration).
---
- titleTranslationKey
- string
- Translation key for the catalog title.
---
- descriptionTranslationKey
- string
- Translation key for the catalog description.
---
- catalogSwitcherLabelTranslationKey
- string
- Translation key for the catalog switcher label.
{% /table %}

### Filter configuration

Configure filters that appear in the catalog UI:

{% table %}
- Option
- Type
- Description
---
- property
- string
- **REQUIRED.** Entity property to filter on (for example, `tags`, `domains`, `metadata.status`).
---
- title
- string
- **REQUIRED.** Display title for the filter.
---
- titleTranslationKey
- string
- Translation key for the filter title.
---
- type
- string
- Filter UI type: `select`, `checkboxes`, or `date-range`. Default: `checkboxes`.
---
- options
- [string]
- Predefined filter options. If not set, options are auto-generated from entity data.
---
- hide
- boolean
- Hide this filter from the UI.
---
- parentFilter
- string
- Property name of a parent filter for hierarchical filtering.
---
- valuesMapping
- object
- Map of filter values to display labels.
{% /table %}

### Examples

#### Hide a built-in catalog

```yaml
entitiesCatalog:
  show: true
  catalogs:
    users:
      hide: true
```

#### Create a custom catalog

```yaml
entitiesCatalog:
  show: true
  catalogs:
    production-services:
      slug: production
      includes:
        - type: service
      filters:
        - property: tags
          title: Tags
        - property: domains
          title: Domain
        - property: metadata.status
          title: Status
          options:
            - production
            - beta
```

#### Exclude specific entities

```yaml
entitiesCatalog:
  show: true
  catalogs:
    services:
      excludes:
        - key: internal-debug-service
        - key: test-service
```

## Custom entity types

Define custom entity types under `entitiesCatalog.entityTypes`:

```yaml
entitiesCatalog:
  show: true
  entityTypes:
    database:
      name: Database
      description: Database instances and data stores
      metadataSchema:
        type: object
        properties:
          engine:
            type: string
            enum:
              - postgresql
              - mysql
              - mongodb
              - redis
            description: Database engine type
          connectionString:
            type: string
            description: Connection string pattern
        required:
          - engine
```

### Entity type options

{% table %}
- Option
- Type
- Description
---
- name
- string
- **REQUIRED.** Display name for the entity type.
---
- description
- string
- **REQUIRED.** Description of what this entity type represents.
---
- metadataSchema
- object
- **REQUIRED.** JSON Schema defining the metadata structure for validation.
---
- icon
- object
- Custom icon with `src` (path to icon) and optional `srcSet` properties.
{% /table %}

### Create a catalog for custom types

```yaml
entitiesCatalog:
  show: true
  entityTypes:
    database:
      name: Database
      description: Database instances
      metadataSchema:
        type: object
        properties:
          engine:
            type: string
        required:
          - engine
  catalogs:
    databases:
      slug: databases
      includes:
        - type: database
      filters:
        - property: metadata.engine
          title: Engine
```

## Complete example

```yaml
entitiesCatalog:
  show: true

  entityTypes:
    database:
      name: Database
      description: Database instances and clusters
      metadataSchema:
        type: object
        properties:
          engine:
            type: string
            enum: [postgresql, mysql, mongodb]
          region:
            type: string
        required: [engine]

    queue:
      name: Message Queue
      description: Message queue systems
      metadataSchema:
        type: object
        properties:
          provider:
            type: string
            enum: [rabbitmq, kafka, sqs]
        required: [provider]

  catalogs:
    all:
      filters:
        - property: type
          title: Type
        - property: domains
          title: Domain
        - property: tags
          title: Tags

    services:
      filters:
        - property: domains
          title: Domain
        - property: metadata.status
          title: Status
          options:
            - production
            - staging
            - development

    users:
      hide: true

    databases:
      slug: databases
      includes:
        - type: database
      filters:
        - property: metadata.engine
          title: Engine
        - property: metadata.region
          title: Region

    queues:
      slug: queues
      includes:
        - type: queue
      filters:
        - property: metadata.provider
          title: Provider
```

## RBAC configuration

Configure access control for catalog resources under `rbac.entitiesCatalog`.
See [Catalog access control](../content/catalog/catalog-rbac.md) for details.

```yaml
rbac:
  entitiesCatalog:
    catalogs:
      services:
        developers: read
        platform-team: admin
    entitiesTypes:
      service:
        platform-team: write
        '*': read
    entities:
      '**':
        authenticated: read
```

## Resources

- **[Catalog overview](../content/catalog/index.md)** - Introduction to catalog concepts
- **[Entity types](../content/catalog/entity-types.md)** - Built-in and custom entity types
- **[Entity definition files](../content/catalog/entity-files.md)** - Create entity YAML files
- **[Catalog access control](../content/catalog/catalog-rbac.md)** - Configure RBAC for catalog
