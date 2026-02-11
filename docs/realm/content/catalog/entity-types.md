# Entity types

Entity types define the categories of items in your catalog.
The catalog includes built-in types for common use cases and supports custom types for domain-specific needs.

## Built-in entity types

These entity types are available by default and are automatically recognized during entity discovery.

### service

Represents backend services, microservices, or standalone applications.

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
metadata:
  repository: https://github.com/example/order-service
  status: production
```

### domain

Represents business domains or functional areas that organize related services and APIs.

```yaml
type: domain
key: payments
title: Payments Domain
summary: All payment processing and billing functionality.
tags:
  - billing
  - transactions
```

### team

Represents groups of people responsible for maintaining entities.

```yaml
type: team
key: platform-team
title: Platform Team
summary: Responsible for core infrastructure services.
contact:
  slack:
    channels:
      - name: platform-support
        url: https://slack.com/channels/platform-support
```

### user

Represents individual users with required email metadata.

```yaml
type: user
key: jane-smith
title: Jane Smith
metadata:
  email: jane.smith@example.com
```

### api-description

Represents API specification files.
These are typically auto-generated from OpenAPI, AsyncAPI, GraphQL, or Arazzo files.

```yaml
type: api-description
key: museum-api
title: Museum API
summary: Public API for museum exhibit information.
metadata:
  specType: openapi
  descriptionFile: openapi/museum.yaml
```

The `specType` can be: `openapi`, `asyncapi`, `graphql`, `arazzo`, `jsonschema`, `avro`, `zod`, or `protobuf`.

The `api-description` entity detail page includes an expanded sidebar with a **Documentation** section that lists the operations present on the API file.

{% img src="./images/api-description-detail.png" alt="API description entity detail page showing Documentation section with operations and schemas" /%}

### api-operation

Represents individual API endpoints or operations.
These are typically auto-generated from API description files.

```yaml
type: api-operation
key: get-exhibits
title: Get Exhibits
summary: Retrieve a list of museum exhibits.
metadata:
  method: GET
  path: /exhibits
```

The `method` can be: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `MUTATION`, `QUERY`, `SUBSCRIBE`, or `PUBLISH`.

### data-schema

Represents data models and schema definitions extracted from API files.

```yaml
type: data-schema
key: exhibit-model
title: Exhibit
summary: Represents a museum exhibit.
metadata:
  specType: openapi
```

## Custom entity types

Define custom entity types to extend the catalog with domain-specific entities.
Custom types support metadata validation schemas to ensure consistent data.

### Define custom entity types

Add custom entity types under `entitiesCatalog.entityTypes` in your `redocly.yaml`:

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
            enum:
              - postgresql
              - mysql
              - mongodb
            description: Database engine type
          version:
            type: string
            description: Database version
          region:
            type: string
            description: Deployment region
        required:
          - engine
```

### Custom entity type options

{% table %}
- Option
- Type
- Description
---
- name
- string
- **REQUIRED.** Display name shown in the catalog UI.
---
- description
- string
- **REQUIRED.** Description of what this entity type represents.
---
- metadataSchema
- object
- **REQUIRED.** JSON Schema defining the metadata structure for entities of this type.
---
- icon
- object
- Custom icon for the entity type. Contains `src` (path to icon) and optional `srcSet` for multiple resolutions.
{% /table %}

### Metadata schema properties

The `metadataSchema` uses JSON Schema format to define and validate entity metadata:

{% table %}
- Property
- Type
- Description
---
- type
- string
- Must be `object` for metadata schemas.
---
- properties
- object
- Object defining each metadata field and its schema.
---
- required
- [string]
- Array of required field names.
---
- additionalProperties
- boolean
- Whether to allow fields not defined in properties. Default: `true`.
{% /table %}

Each property in `properties` supports these schema attributes:

{% table %}
- Attribute
- Type
- Description
---
- type
- string
- Data type: `string`, `number`, `boolean`, `array`, or `object`.
---
- description
- string
- Description of the field shown in documentation.
---
- enum
- [string]
- Allowed values for string fields.
---
- pattern
- string
- Regex pattern for string validation.
---
- format
- string
- Standard format like `email`, `uri`, `date-time`.
---
- minimum
- number
- Minimum value for number fields.
---
- maximum
- number
- Maximum value for number fields.
{% /table %}

### Use custom entity types

After defining a custom entity type, create entities using that type in `.entity.yaml` files:

```yaml
type: database
key: users-db
title: Users Database
summary: Primary database for user accounts.
tags:
  - production
  - critical
metadata:
  engine: postgresql
  version: '15.4'
  region: us-east-1
```

### Create a catalog for custom entity types

Include custom entity types in a dedicated catalog:

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
        required:
          - engine
  catalogs:
    databases:
      slug: databases
      includes:
        - type: database
      filters:
        - title: Engine
          property: metadata.engine
        - title: Region
          property: metadata.region
```

## Entity detail page

Each entity has a detail page with a sidebar for navigation.
The sidebar structure varies based on entity type.

### Standard entity sidebar

For most entity types (service, domain, team, user, data-schema, api-operation), the sidebar includes:

- **Version history** - View and switch between versions and revisions
- **Overview** - Entity details, metadata, and properties
- **Relations graph** - Visual representation of entity relationships

{% img src="./images/entity-detail.png" alt="Standard entity detail page showing sidebar with Version history, Overview, and Relations graph" /%}

### api-description entity sidebar

The `api-description` entity type includes an additional **Documentation** section in the sidebar:

- **Version history** - View and switch between versions and revisions
- **Overview** - Entity details, metadata, and properties
- **Relations graph** - Visual representation of entity relationships
- **Documentation** - Expandable section showing operations and schemas extracted from the API file

This expanded navigation helps users explore the API structure directly from the entity detail page.

## Resources

- **[Entity definition files](./entity-files.md)** - Create YAML files to define entities
- **[Catalog configuration](../../config/catalog.md)** - Complete configuration reference
- **[Catalog overview](./index.md)** - Introduction to catalog concepts
