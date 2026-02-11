# Entity definition files

Entity definition files are YAML files that define catalog entities.
Place these files anywhere in your project to populate the catalog with services, domains, teams, and other entity types.

## File naming conventions

Entity definition files use these naming patterns:

- `*.entity.yaml` or `*.entity.yml` - Single entity per file
- `*.entities.yaml` or `*.entities.yml` - Multiple entities per file

Example file names:
- `order-service.entity.yaml`
- `catalog-entries.entities.yaml`
- `team-definitions.entities.yaml`

## File structure

### Single entity file

A single entity file defines one entity:

```yaml
type: service
key: order-service
title: Order Service
summary: Handles order processing, payments, and fulfillment.
tags:
  - commerce
  - payments
domains:
  - orders
  - payments
metadata:
  repository: https://github.com/example/order-service
  language: Go
  status: production
links:
  - label: API Reference
    url: /api-docs/orders.yaml
  - label: Documentation
    url: /docs/order-service/
```

### Multiple entities file

A file with `.entities.yaml` extension can contain multiple entities as a YAML array:

```yaml
- type: service
  key: user-service
  title: User Service
  summary: Manages user accounts and authentication.
  tags:
    - identity

- type: service
  key: notification-service
  title: Notification Service
  summary: Sends notifications via email and SMS.
  tags:
    - messaging
```

## Entity properties

All entities share these common properties:

{% table %}
- Property
- Type
- Description
---
- type
- string
- **REQUIRED.** Entity type (for example, `service`, `domain`, `team`, `api-description`, or custom type).
---
- key
- string
- **REQUIRED.** Unique identifier in kebab-case. Pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Max 150 characters.
---
- title
- string
- **REQUIRED.** Human-readable name displayed in the catalog. Max 200 characters.
---
- summary
- string
- Brief description of the entity. Max 500 characters.
---
- tags
- [string]
- Array of tags for categorization and filtering.
---
- version
- string
- Entity version (for example, `1.0.0`). Can also be inferred from folder structure.
---
- contact
- object
- Contact information including Slack channels.
---
- links
- [object]
- Array of related links.
---
- relations
- [object]
- Array of relationships to other entities.
---
- metadata
- object
- Type-specific metadata. Some entity types require specific metadata fields.
{% /table %}

## Contact information

Add contact information for teams to reach entity owners:

```yaml
contact:
  slack:
    channels:
      - name: order-support
        url: https://slack.com/channels/order-support
      - name: commerce-team
```

## Links

Add links to related documentation, repositories, or dashboards:

```yaml
links:
  - label: API Reference
    url: /api-docs/orders.yaml
  - label: GitHub Repository
    url: https://github.com/example/order-service
  - label: Runbook
    url: https://wiki.example.com/runbooks/order-service
```

Link properties:

{% table %}
- Property
- Type
- Description
---
- label
- string
- **REQUIRED.** Link text displayed in the UI.
---
- url
- string
- **REQUIRED.** URL to the linked resource.
{% /table %}

## Relations

Define relationships between entities:

```yaml
relations:
  - type: owns
    key: order-api
  - type: depends-on
    key: payment-service
  - type: member-of
    key: commerce-team
```

Relation properties:

{% table %}
- Property
- Type
- Description
---
- type
- string
- **REQUIRED.** Relationship type.
---
- key
- string
- **REQUIRED.** Key of the related entity.
---
- version
- string
- Version of the related entity (optional).
---
- revision
- string
- Revision timestamp of the related entity (optional).
{% /table %}

Available relation types include: `owns`, `depends-on`, `member-of`, `api-of`, and more.

## Metadata by entity type

Some entity types require specific metadata fields:

### user metadata

```yaml
type: user
key: jane-doe
title: Jane Doe
metadata:
  email: jane.doe@example.com  # Required
```

### api-description metadata

```yaml
type: api-description
key: museum-api
title: Museum API
metadata:
  specType: openapi  # Required: openapi, asyncapi, graphql, arazzo, etc.
  descriptionFile: openapi/museum.yaml  # Required
```

### api-operation metadata

```yaml
type: api-operation
key: get-exhibits
title: Get Exhibits
metadata:
  method: GET  # Required: GET, POST, PUT, DELETE, PATCH, MUTATION, QUERY, SUBSCRIBE, PUBLISH
  path: /exhibits  # Required
  payload:
    - ExhibitInput
  responses:
    - ExhibitList
```

### data-schema metadata

```yaml
type: data-schema
key: exhibit-model
title: Exhibit
metadata:
  specType: openapi  # Required
```

## Excluded folders

Entity files in these folders are ignored:
- `node_modules`
- `dist`
- `build`
- `.git`
- `@l10n`

## Complete example

Here's a complete example of a service entity with all optional properties:

```yaml
type: service
key: order-service
title: Order Service
summary: |
  Handles order processing, payments, and fulfillment.
  Integrates with inventory and shipping services.
version: '2.1.0'
tags:
  - commerce
  - payments
  - production
domains:
  - orders
  - payments
contact:
  slack:
    channels:
      - name: order-support
        url: https://slack.com/channels/order-support
links:
  - label: API Reference
    url: /api-docs/orders.yaml
  - label: Documentation
    url: /docs/order-service/
  - label: Repository
    url: https://github.com/example/order-service
  - label: Dashboard
    url: https://grafana.example.com/d/order-service
relations:
  - type: owns
    key: orders-api
  - type: depends-on
    key: payment-service
  - type: depends-on
    key: inventory-service
metadata:
  repository: https://github.com/example/order-service
  language: Go
  framework: Gin
  status: production
  oncallTeam: commerce-oncall
```

## Resources

- **[Entity types](./entity-types.md)** - Learn about built-in and custom entity types
- **[Quickstart](./quickstart.md)** - Create your first catalog entities
- **[Versions and revisions](./versions-and-revisions.md)** - Track entity changes over time
- **[Catalog overview](./index.md)** - Introduction to catalog concepts
