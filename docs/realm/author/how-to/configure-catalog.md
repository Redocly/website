# Customize catalog views

Organize resources in your project with catalog.
The catalog feature uses entities — structured definitions for APIs, services, teams, and domains to provide metadata, relationships, and automatic discovery.

This guide demonstrates how to customize catalog views and populate them with entities.

## Default catalog

The catalog works out of the box with preconfigured settings. Use auto-discovered entities or add your own.

### Built-in views

The catalog has built-in views for each entity type:
- `/catalogs/all` - all entities
- `/catalogs/services` - service entities
- `/catalogs/domains` - domain entities
- `/catalogs/teams` - team entities
- `/catalogs/users` - user entities
- `/catalogs/api-descriptions` - API description entities

### Automatic entity discovery

To discover entities in your project, catalog:

- Scans for entity files: `*.entity.yaml`, `*.entity.yml`, `*.entities.yaml`, or `*.entities.yml`.
- Extracts OpenAPI description files in your project.
  Each file becomes an `api-description` entity.

## Configure catalog views

Customize catalogs in the `entitiesCatalog` section of your `redocly.yaml` file. For a complete list of configuration options, see the [catalog configuration reference](../../config/entities-catalog.md).

### Basic configuration

```yaml {% title="redocly.yaml" %}
entitiesCatalog:
  catalogs:
    all:
      slug: all
      hide: false
      filters:
        - title: Entity Type
          property: type
          type: select
        - title: Tags
          property: tags
          type: checkboxes
    
    services:
      slug: services
      includes:
        - type: service
      filters:
        - title: Domain
          property: relations.partOf
          type: select
    
    apiDescriptions:
      slug: api-descriptions
      includes:
        - type: api-description
      filters:
        - title: Spec Type
          property: metadata.specType
          type: select
          options: [openapi, asyncapi]
```

### Customize views

For each catalog, you can:

- **Filter content**: Control which entities appear with `includes` and `excludes`.
- **Add filters**: Create UI filters for browsing by type, tags, teams, or other criteria.
- **Control visibility**: Hide catalogs with `hide: true`.
- **Set custom URLs**: Define custom slugs for catalog paths.

### Advanced filtering example

```yaml {% title="redocly.yaml" %}
entitiesCatalog:
  catalogs:
    production-services:
      slug: production
      includes:
        - type: service
      excludes:
        - key: deprecated-api
        - key: test-service
      filters:
        - title: Environment
          property: metadata.environment
          type: select
          options: [production, staging]
        - title: Critical Services
          property: tags
          type: checkboxes
          options: [critical, high-availability]
```

## Entity types

The catalog supports these built-in entity types:

- **`api-description`** - API specifications (like OpenAPI)
- **`service`** - Deployable resources (APIs, applications, libraries)
- **`domain`** - Logical groupings of entities
- **`team`** - Collections of users
- **`user`** - Individual users

## Create entities

Create entities to represent different assets in your organization, such as services, teams, and domains — among others.

You can create entities in two ways:
- **YAML files**: Define entities in `*.entity.yaml` or `*.entities.yaml` files in your project
- **API**: Use the Realm API to create and manage entities programmatically

### Create entities using `yaml` files

Define entities in `*.entity.yaml` or `*.entities.yaml` files. Here's a minimal example:

```yaml {% title="services/payments-api.entity.yaml" %}
type: service
key: payments-api
title: Payments API
summary: Handles payment processing and billing
tags: [payments, billing, api]
```

#### Examples

##### Service entity

The following example configures a service entity with a version, Git repository, Slack contact, and external links.

```yaml {% title="services/payments-api.entity.yaml" %}
type: service
key: payments-api
title: Payments API
summary: Core payment processing service
version: "2.1.0"
tags: [payments, microservice, critical]
git:
  - https://github.com/acme/payments-api
contact:
  slack:
    channels:
      - name: payments-team
links:
  - label: Production Dashboard
    url: https://grafana.acme.com/payments
  - label: API Documentation
    url: https://docs.acme.com/payments-api
```


##### Domain entity

The following example creates a `domain` entity that can be used to group related payment services.

```yaml {% title="domains/payments.entity.yaml" %}
type: domain
key: payments
title: Payments Domain
summary: All payment-related services and APIs
tags: [payments, business-domain]
```


##### Team entity

The following example configures a team with Slack contact information.

```yaml {% title="teams/platform-team.entity.yaml" %}
type: team
key: platform-team
title: Platform Team
summary: Maintains core infrastructure and developer tools
contact:
  slack:
    channels:
      - name: "platform-team"
```

### Create entities using the API

You can also create and manage entities programmatically using the Realm API. This approach is useful for integrating entity creation into CI/CD pipelines or building custom tooling.

For complete API documentation and available endpoints, see the [Realm API specification](../../apis/realm-openapi/openapi.yaml).

## Add entity relationships

Define relationships between entities using the `relations` field.

The following example configures a `service` entity that is owned by a team, is a part of a domain, and depends on other services.

```yaml {% title="services/payments-api.entity.yaml" %}
type: service
key: payments-api
title: Payments API
relations:
  - type: ownedBy
    key: platform-team
  - type: partOf
    key: payments
  - type: dependsOn
    key: users-api
  - type: consumesApi
    key: billing-api
```


### Team ownership example

Model team relationships with services, users, and domains.

The following example configures a `team` with members and owned services.

```yaml {% title="teams/platform-team.entity.yaml" %}
type: team
key: platform-team
title: Platform Team
summary: Maintains core infrastructure and developer tools
contact:
  slack:
    channels:
      - name: "platform-team"
relations:
  - type: hasMember
    key: john-doe
  - type: hasMember
    key: jane-smith
  - type: owns
    key: payments-api
  - type: owns
    key: users-api
```

## Automatic OpenAPI discovery


The following example demonstrates how OpenAPI metadata maps to entity properties.

Each `api-description` entity has these properties, extracted from the OpenAPI file:
- **`key`**: The `info.title` field, converted to kebab-case.
- **`title`**: From `info.title`
- **`summary`**: From `info.description` (markdown stripped)
- **`tags`**: From global `tags` array
- **`metadata.specType`**: `"openapi"`
- **`metadata.schema`**: Full OpenAPI specification as JSON string
- **`metadata.descriptionFile`**: Relative path to the OpenAPI file.

### Auto-generated entity example

For an OpenAPI file at `apis/payments.yaml` with this content:

```yaml {% title="apis/payments.yaml" %}
openapi: 3.0.0
info:
  title: Payments API
  description: Handles all payment operations
  version: 1.0.0
tags:
  - name: payments
  - name: billing
```

The catalog generates this `api-description` entity:

```yaml {% title="entities/payments-api.entity.yaml" %}
type: api-description
key: payments-api
title: Payments API
summary: Handles all payment operations
tags: [payments, billing]
metadata:
  specType: openapi
  schema: '{"openapi":"3.0.0","info":{"title":"Payments API"...}}'
  descriptionFile: apis/payments.yaml
```

## Resources

- [Entity reference](../reference/catalog-entity.md) for all entity properties.
- [Catalog configuration reference](../../config/entities-catalog.md) for display and filtering options.