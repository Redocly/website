# Versions and revisions

The catalog tracks entity changes over time using two complementary concepts: versions and revisions.
This enables you to maintain multiple API versions and review historical changes.

## Understanding versions

Versions represent significant releases of an entity, typically following semantic versioning (for example, `1.0.0`, `2.1.0`).
Different versions of the same entity can coexist in the catalog.

### When to use versions

Use versions when:
- Releasing a new major API version with breaking changes
- Maintaining multiple supported versions simultaneously
- Tracking feature releases across entity lifecycle

### How versions work

Each entity can have multiple versions identified by the same `key` but different `version` values.
The catalog determines the default version using semantic version sorting, selecting the highest version.
The latest revision of that default version is then displayed as the current entity state.

On the catalog list page, only the current revision is displayed for each entity (the latest revision of the semantically highest version).
On the entity detail page, users can switch to view other revisions of all versions.

## Understanding revisions

Revisions are point-in-time snapshots of an entity within a specific version.
Each time an entity is updated, a new revision is created with an ISO 8601 timestamp.

### When revisions are created

Revisions are automatically created when:
- An entity file is modified and rebuilt
- An API description file changes (triggering re-extraction)
- An entity is created or updated via the API

When using the API, you can optionally specify a custom `revision` timestamp.
If not provided, the revision is automatically generated using the current ISO 8601 timestamp.

### Viewing entity history

The catalog UI provides a history view showing all revisions for an entity.
This allows you to:
- See when changes were made
- Compare different points in time
- Understand entity evolution

## Specifying versions

### In entity definition files

Set the version directly in the entity file:

```yaml
type: service
key: order-service
title: Order Service
version: '2.0.0'
summary: Handles order processing.
```

### Using folder structure

Version entities using the `@version` folder naming convention:

```treeview
catalog/
├── @v1/
│   └── order-service.entity.yaml
├── @v2/
│   └── order-service.entity.yaml
└── @latest/
    └── order-service.entity.yaml
```

Files in `@v1/` automatically have version `1`, files in `@v2/` have version `2`, and so on.

### In API description files

For auto-extracted entities, the version comes from the `info.version` field:

```yaml
openapi: 3.1.0
info:
  title: Museum API
  version: '2.1.0'  # This becomes the entity version
```

## Version resolution rules

When both file content and folder structure specify versions, these rules apply:

1. **Folder version is numeric** (for example, `@v1`, `@v2.0`):
   - If file specifies a different version, extraction fails with a conflict warning
   - If file doesn't specify version, folder version is used
   - If versions match, that version is used

2. **Folder version is non-numeric** (for example, `@latest`, `@beta`):
   - File version takes precedence if specified
   - Folder version is used if file doesn't specify

3. **No folder version**:
   - File version is used if specified
   - Entity has no version otherwise

### Example: version conflict

```treeview
catalog/
└── @v1/
    └── service.entity.yaml
```

```yaml
# service.entity.yaml
type: service
key: my-service
title: My Service
version: '2.0.0'  # Conflicts with @v1 folder!
```

This configuration produces a warning and the entity is not created:
> Entity "my-service" has conflicting versions: file version "2.0.0" differs from folder version "1"

## Querying versions and revisions

### Via the catalog UI

1. Navigate to an entity in the catalog
2. Click the version selector to switch between versions
3. Click the history button to view revisions

### Via the API

Query a specific version:

```bash
GET /api/catalog/entities?filter=key:equal:order-service&version=2.0.0
```

Query entity history (revisions):

```bash
GET /api/catalog/bff/revisions/:entityKey?version=2.0.0
```

Response:

```json
{
  "items": [
    {
      "revision": "2024-01-20T14:45:00Z",
      "isCurrent": true
    },
    {
      "revision": "2024-01-15T10:30:00Z",
      "isCurrent": false
    }
  ]
}
```

### In entity relations

Reference specific versions in entity relations:

```yaml
type: service
key: api-gateway
title: API Gateway
relations:
  - type: depends-on
    key: auth-service
    version: '1.0.0'  # Reference specific version
```

## Version sorting

The catalog determines the "current" (default) version by sorting all versions semantically and selecting the highest one.
When multiple versions exist, the sorting order is:

1. **Text versions** (highest) - `latest`, `beta`, `alpha` sort at the top, alphabetically among themselves
2. **Numeric versions** - Sorted by semantic versioning rules (`10.0.0` > `3.1.0` > `1.0.0`)
3. **Null/empty versions** - Treated as `0.0.0`
4. **Not specified** (lowest) - Entities without explicit versions

### Semantic version sorting

Numeric versions follow semantic versioning comparison:

- `10.0.0` > `3.0.0` > `1.0.0` (major version comparison)
- `1.2.0` > `1.1.0` > `1.0.0` (minor version comparison)
- `1.0.10` > `1.0.3` > `1.0.1` (patch version comparison)

### Example sort order

Given these versions, the catalog sorts them as (highest to lowest):

1. `latest` (text versions sort highest)
2. `10.0.0`
3. `3.1.0`
4. `3.0.0`
5. `2.0.0`
6. `1.0.0`
7. (no version specified)

The version at the top (`latest` in this example) is displayed as the current version by default.

### Default version and current revision

The catalog uses this two-step process to determine what to display:

1. **Default version** - Select the highest version using semantic sorting
2. **Current revision** - Select the latest revision (highest timestamp) within that default version

This combination of default version and its latest revision represents the current entity state shown in the catalog.
If entities with the same version exist in both file sources and API sources with matching revisions, they are merged.

{% img src="./images/versions-revisions-sidebar.png" alt="Entity sidebar showing versions with revisions listed under each version" /%}

## Entity merging

When an entity exists from multiple sources (project files and API) with the same key, version, and revision, the catalog merges them into a single view.

### How merging works

- **Simple fields** (title, summary, type): The most recently updated value is used
- **JSON fields** (metadata, tags, links, contact): Values are merged using JSON patch
- **Timestamps**: `createdAt` uses the earliest, `updatedAt` uses the latest

### Merging example

Entity from project file:

```yaml
type: service
key: order-service
title: Order Service
version: '1.0.0'
tags:
  - commerce
metadata:
  repository: https://github.com/example/order-service
```

Entity added via API with same key, version, and revision:

```json
{
  "type": "service",
  "key": "order-service",
  "version": "1.0.0",
  "tags": ["production"],
  "metadata": {
    "status": "active",
    "oncallTeam": "commerce-oncall"
  }
}
```

Merged result displayed in the catalog:

```yaml
type: service
key: order-service
title: Order Service
version: '1.0.0'
tags:
  - commerce
  - production
metadata:
  repository: https://github.com/example/order-service
  status: active
  oncallTeam: commerce-oncall
```

### Use cases for merging

- **Enriching file-based entities**: Add runtime metadata via API without modifying source files
- **Hybrid workflows**: Define base entities in files, add dynamic attributes via CI/CD
- **Gradual migration**: Start with API-managed entities, transition to file-based over time

## Best practices

### Versioning strategies

1. **Semantic versioning** - Use `MAJOR.MINOR.PATCH` for clear change communication
2. **Date-based versions** - Use `YYYY.MM` for time-based releases
3. **Named versions** - Use `latest`, `stable`, `beta` for deployment stages

### Organizing versioned entities

```treeview
apis/
├── @v1/
│   ├── museum-api.yaml
│   └── museum.entity.yaml
├── @v2/
│   ├── museum-api.yaml
│   └── museum.entity.yaml
└── @latest/
    └── museum-api.yaml  # Points to current version
```

### Maintaining version history

- Keep older versions accessible for clients still using them
- Document breaking changes between major versions
- Use the catalog history to track when changes occurred

## Resources

- **[Entity definition files](./entity-files.md)** - Define entities with versions
- **[Quickstart](./quickstart.md)** - Create your first catalog entities
- **[Content versioning](../versions.md)** - Version documentation content alongside APIs
- **[Catalog overview](./index.md)** - Introduction to catalog concepts
