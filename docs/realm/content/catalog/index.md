# Catalog

Catalog is a centralized registry for organizing and discovering entities across your project.
It provides a unified view of APIs, services, domains, teams, and other resources, making it easier to understand system architecture and dependencies.

## Key concepts

The catalog system is built around these core concepts:

- **Entities** - Individual items in your catalog (APIs, services, domains, teams, users, and custom types)
- **Catalogs** - Filtered views of entities organized by type or custom criteria
- **Relations** - Connections between entities showing dependencies, ownership and much more
- **Versions** - Multiple versions of the same entity tracked over time
- **Revisions** - Point-in-time snapshots of entity changes for history tracking

{% img src="./images/catalog-list.png" alt="Catalog list view showing entities organized by type" /%}

## Entities

Entities are the building blocks of your catalog.
Each entity has a unique key, a type, and metadata that describes its purpose and characteristics.

### Built-in entity types

The catalog includes these built-in entity types:

{% table %}
- Type
- Description
---
- service
- Backend services, microservices, or applications
---
- domain
- Business domains or functional areas
---
- team
- Groups of people responsible for entities
---
- user
- Individual users with email addresses
---
- api-description
- API specification files (OpenAPI, AsyncAPI, GraphQL, Arazzo)
---
- api-operation
- Individual API endpoints or operations
---
- data-schema
- Data models and schema definitions
{% /table %}

### Custom entity types

Define custom entity types in your `redocly.yaml` to extend the catalog with domain-specific entities.
Custom entity types support custom metadata schemas for validation.

## How entities are discovered

Entities are added to the catalog through automatic discovery and the API:

1. **Entity definition files** - YAML files ending with `.entity.yaml` or `.entities.yaml` are automatically scanned and their entities added to the catalog
2. **API description extraction** - API files (OpenAPI, AsyncAPI, GraphQL, Arazzo) are automatically parsed to extract `api-description`, `api-operation`, and `data-schema` entities
3. **Catalog API** - Create, update, and delete entities programmatically for integration with external systems

Both entity definition files and API description files are automatically discovered during build - no additional configuration required beyond enabling the catalog.

## Catalogs

Catalogs are filtered views that organize entities by type.
The default catalogs include:

- **All** - Shows all entity types
- **Services** - Shows service entities
- **Domains** - Shows domain entities
- **Teams** - Shows team entities
- **Users** - Shows user entities
- **API Descriptions** - Shows API description entities
- **Data Schemas** - Shows data schema entities
- **API Operations** - Shows API operation entities

You can customize existing catalogs or create custom catalogs with specific entity type filters.

{% img src="./images/catalog-switcher.png" alt="Catalog switcher showing available catalog views" /%}

## Entity relations

Relations connect entities to model your system architecture.
Use relations to express:

- **Dependencies** - Which services depend on other services
- **Ownership** - Which teams own which entities
- **Composition** - How APIs and schemas relate to each other
- **Hierarchy** - Parent-child and membership relationships

### How entities and relations are extracted

The catalog uses different extractors to discover entities and relations:

1. **Filesystem extractor** - Scans `.entity.yaml` and `.entities.yaml` files to extract entities and their defined relations
2. **API description extractors** - Parse OpenAPI, AsyncAPI, GraphQL, and Arazzo files to extract `api-description`, `api-operation`, and `data-schema` entities with automatic parent-child relations
3. **Catalog API** - Create entities and relations programmatically for integration with external systems or CI/CD pipelines

## Versions and revisions

The catalog tracks entity changes over time using versions and revisions:

- **Versions** - Semantic versioning for entities (for example, `1.0.0`, `2.1.0`)
- **Revisions** - Timestamped snapshots of entity state for history tracking

Versions can be specified in entity files or inferred from folder structure using the `@version` folder naming convention.
The catalog determines the default version using semantic version sorting, selecting the highest version.
The latest revision of that default version is then used as the current entity state.

## Access control

Control who can view and modify catalog content using role-based access control (RBAC).
Configure access at multiple levels:

- **Catalog level** - Control access to entire catalogs
- **Entity type level** - Control access by entity type
- **Individual entity level** - Control access to specific entities

## Get started

- **[Quickstart](./quickstart.md)** - Create your first catalog entities with an interactive guide

## Related how-tos

- **[Define entities in files](./entity-files.md)** - Create entity definition files to populate your catalog
- **[Manage entities via API](./api-management.md)** - Use the Catalog API to programmatically manage entities

## Resources

- **[Catalog configuration](../../config/catalog.md)** - Configure catalog behavior in redocly.yaml
- **[Entity types](./entity-types.md)** - Define custom entity types with metadata schemas
- **[Entity relations](./entity-relations.md)** - Model connections between entities
- **[Versions and revisions](./versions-and-revisions.md)** - Understand version and revision tracking
- **[Catalog RBAC](./catalog-rbac.md)** - Configure access control for catalog resources
