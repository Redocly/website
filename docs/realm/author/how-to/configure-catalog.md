# Configure catalog views

Organize resources in your organization with a catalog. The catalog uses **entities**—structured definitions for APIs, services, teams, and domains—to provide metadata, relationships, and automatic discovery.

This guide shows you how to configure catalog views and populate them with entities.

## Default catalog

The catalog works out of the box with preconfigured settings. Use auto-discovered entities or add your own.

### Built-in views

The catalog has built-in views for each entity type:
- `/catalogs/all` - All entities
- `/catalogs/services` - Service entities
- `/catalogs/domains` - Domain entities  
- `/catalogs/teams` - Team entities
- `/catalogs/users` - User entities
- `/catalogs/api-descriptions` - API description entities

### Automatic entity discovery

The catalog discovers entities in your project by:

1. **Scanning for entity files** - Files with `*.entity.yaml`, `*.entity.yml`, `*.entities.yaml`, or `*.entities.yml` extensions
2. **Extracting OpenAPI specifications** - from any OpenAPI file in your project. Each file becomes an `api-description` entity

## Configure catalog views

Customize catalogs in the `entitiesCatalog` section of your `redocly.yaml` file. For a complete list of configuration options, see the [catalog configuration reference](../../config/catalog.md).

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

Create entities to represent services, teams, domains, and users in your organization.

### Entity structure

Define entities in `*.entity.yaml` or `*.entities.yaml` files. Here's a minimal example:

```yaml {% title="services/payments-api.entity.yaml" %}
type: service
key: payments-api
title: Payments API
summary: Handles payment processing and billing
tags: [payments, billing, api]
```

### Examples

#### Service entity

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

This example shows a service entity with a version, Git repository, Slack contact, and external links.

#### Domain entity

```yaml {% title="domains/payments.entity.yaml" %}
type: domain
key: payments
title: Payments Domain
summary: All payment-related services and APIs
tags: [payments, business-domain]
```

This example creates a `domain` entity that can be used to group related payment services.

#### Team entity

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

This example defines a team with Slack contact information.

## Add entity relationships

Define relationships between entities using the `relations` field.

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

This example shows a `service` entity that is owned by a team, part of a domain, and depends on other services.

### Team ownership example

Model team relationships with services, users, and domains.

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

This example shows a `team` with members and owned services.

## Automatic OpenAPI discovery

The catalog creates `api-description` entities from OpenAPI specifications in your project.

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

This shows how OpenAPI metadata maps to entity properties.

## Resources

- See the [entity reference](../reference/catalog-entity.md) for all entity properties.
- See the [catalog configuration reference](../../config/catalog.md) for display and filtering options.