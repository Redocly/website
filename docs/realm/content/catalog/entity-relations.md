# Entity relations

Relations connect entities to show dependencies, ownership, composition, and other connections between catalog items.
Define relations in entity files or manage them programmatically via the Relations API.

## Relation types

The catalog supports these relation types for modeling different connections:

{% table %}
- Type
- Inverse type
- Description
---
- partOf
- hasParts
- Entity is a component of another entity
---
- owns
- ownedBy
- Entity owns or is responsible for another entity
---
- dependsOn
- dependencyOf
- Entity requires another entity to function
---
- uses
- usedBy
- Entity utilizes another entity
---
- creates
- createdBy
- Entity produces or generates another entity
---
- implements
- implementedBy
- Entity implements an interface or specification
---
- produces
- consumes
- Entity outputs data that another entity consumes
---
- extends
- extendedBy
- Entity extends or inherits from another entity
---
- supersedes
- supersededBy
- Entity replaces an older version or deprecated entity
---
- compatibleWith
- compatibleWith
- Entities work together or are interoperable
---
- relatesTo
- relatesTo
- General relationship without specific semantics
---
- hasMember
- memberOf
- Entity contains another entity as a member
---
- triggers
- triggeredBy
- Entity causes another entity to execute
---
- returns
- returnedBy
- Entity returns or produces another entity as output
---
- linksTo
- linksTo
- Entity links to another entity
{% /table %}

## Define relations in entity files

Add relations to entity definition files using the `relations` property:

```yaml
type: service
key: order-service
title: Order Service
summary: Processes customer orders.
relations:
  - type: owns
    key: orders-api
  - type: dependsOn
    key: payment-service
  - type: dependsOn
    key: inventory-service
    version: '2.0.0'
  - type: memberOf
    key: commerce-team
```

### Relation properties

{% table %}
- Property
- Type
- Description
---
- type
- string
- **REQUIRED.** Relation type from the supported types list.
---
- key
- string
- **REQUIRED.** Key of the target entity.
---
- version
- string
- Version of the target entity.
If not specified, relates to the current version.
---
- revision
- string
- Revision timestamp of the target entity.
If not specified, relates to the current revision.
{% /table %}

## Relations API

Manage relations programmatically using the Relations API endpoints.

### API endpoints

{% table %}
- Method
- Endpoint
- Description
---
- GET
- `/api/catalog/relations`
- List all relations with filtering and pagination
---
- GET
- `/api/catalog/relations/:id`
- Get a single relation by ID
---
- POST
- `/api/catalog/relations`
- Create a new relation
---
- PUT
- `/api/catalog/relations`
- Bulk upsert (create or update) multiple relations
---
- PATCH
- `/api/catalog/relations/:id`
- Update an existing relation
---
- DELETE
- `/api/catalog/relations/:id`
- Delete a relation
{% /table %}

### Create a relation

```bash
POST /api/catalog/relations
Content-Type: application/json

{
  "type": "dependsOn",
  "sourceKey": "order-service",
  "targetKey": "payment-service",
  "sourceVersion": "1.0.0",
  "targetVersion": "2.0.0"
}
```

### Relation API properties

{% table %}
- Property
- Type
- Description
---
- type
- string
- **REQUIRED.** Relation type.
---
- sourceKey
- string
- **REQUIRED.** Key of the source entity.
---
- targetKey
- string
- **REQUIRED.** Key of the target entity.
---
- sourceVersion
- string | null
- Version of the source entity.
---
- sourceRevision
- string | null
- Revision of the source entity.
---
- targetVersion
- string | null
- Version of the target entity.
---
- targetRevision
- string | null
- Revision of the target entity.
{% /table %}

### Bulk create relations

Create multiple relations in a single request:

```bash
PUT /api/catalog/relations
Content-Type: application/json

[
  {
    "type": "owns",
    "sourceKey": "commerce-team",
    "targetKey": "order-service"
  },
  {
    "type": "owns",
    "sourceKey": "commerce-team",
    "targetKey": "payment-service"
  },
  {
    "type": "dependsOn",
    "sourceKey": "order-service",
    "targetKey": "payment-service"
  }
]
```

Response (HTTP 207 Multi-Status):

```json
[
  {
    "status": "ok",
    "relation": {
      "id": "uuid-123",
      "type": "owns",
      "sourceKey": "commerce-team",
      "targetKey": "order-service"
    }
  },
  {
    "status": "ok",
    "relation": {
      "id": "uuid-456",
      "type": "owns",
      "sourceKey": "commerce-team",
      "targetKey": "payment-service"
    }
  },
  {
    "status": "ok",
    "relation": {
      "id": "uuid-789",
      "type": "dependsOn",
      "sourceKey": "order-service",
      "targetKey": "payment-service"
    }
  }
]
```

### List relations

Query relations with filtering:

```bash
GET /api/catalog/relations?filter=sourceKey:equal:order-service&sort=type:ASC
```

### Update a relation

```bash
PATCH /api/catalog/relations/uuid-123
Content-Type: application/json

{
  "targetVersion": "3.0.0"
}
```

### Delete a relation

```bash
DELETE /api/catalog/relations/uuid-123
```

Returns HTTP 204 No Content on success.

## Automatic relations from API extraction

When entities are extracted from API description files, the system automatically creates relations:

- **api-description → api-operation**: Operations are linked to their parent API with `partOf`/`hasParts` relations
- **api-description → data-schema**: Schemas are linked to their source API
- **api-operation → data-schema**: Operations link to their request/response schemas

## Modeling patterns

### Service dependencies

Model microservice architecture dependencies:

```yaml
type: service
key: api-gateway
title: API Gateway
relations:
  - type: dependsOn
    key: auth-service
  - type: dependsOn
    key: user-service
  - type: dependsOn
    key: rate-limiter
```

### Team ownership

Track which teams own which services:

```yaml
type: team
key: platform-team
title: Platform Team
relations:
  - type: owns
    key: api-gateway
  - type: owns
    key: auth-service
  - type: owns
    key: rate-limiter
```

### API composition

Show how APIs relate to each other:

```yaml
type: api-description
key: public-api
title: Public API
relations:
  - type: uses
    key: internal-auth-api
  - type: extends
    key: base-api-spec
```

## Resources

- **[Entity definition files](./entity-files.md)** - Define entities and their relations
- **[Manage entities via API](./api-management.md)** - Entity management API reference
- **[Catalog overview](./index.md)** - Introduction to catalog concepts
