# Catalog access control

Control who can view and modify catalog resources using role-based access control (RBAC).
Configure access at the catalog level, entity type level, or individual entity level.

## Access levels

The catalog supports two access levels:

{% table %}
- Access level
- Required roles
- Allowed operations
---
- READ
- `read`, `triage`, `write`, `maintain`, `admin`
- View catalogs and entities, list entities, search
---
- WRITE
- `write`, `maintain`, `admin`
- Create, update, and delete entities via API
{% /table %}

## Configuration structure

Configure catalog RBAC under `rbac.entitiesCatalog` in your `redocly.yaml`:

```yaml
rbac:
  entitiesCatalog:
    catalogs:
      # Control access to specific catalogs
    entitiesTypes:
      # Control access by entity type
    entitiesGroups:
      # Control access to groups of entities
    entities:
      # Control access to individual entities
```

## Catalog-level access

Control which teams can view entire catalogs.
Users without read access to a catalog won't see it in the catalog switcher.

```yaml
rbac:
  entitiesCatalog:
    catalogs:
      services:
        developers: read
        admins: admin
      domains:
        all-employees: read
      internal-tools:
        platform-team: read
        '*': none  # Hide from other teams
```

In this example:
- `developers` can view the services catalog
- `all-employees` can view the domains catalog  
- `internal-tools` is only visible to `platform-team`

## Entity type access

Control access to all entities of a specific type.
This is useful for restricting sensitive entity types.

```yaml
rbac:
  entitiesCatalog:
    entitiesTypes:
      service:
        developers: read
        platform-team: write
      user:
        hr-team: write
        '*': read
      team:
        admins: write
        '*': read
```

In this example:
- Only `platform-team` can modify service entities
- Only `hr-team` can modify user entities
- Everyone can read team entities, but only `admins` can modify them

## Entity groups access

Control access to groups of related entities.
Use this to apply the same access rules to multiple entities at once.

```yaml
rbac:
  entitiesCatalog:
    entitiesGroups:
      - entities:
          - payment-service
          - billing-service
          - invoice-service
        config:
          finance-team: write
          developers: read
      - entities:
          - auth-service
          - user-service
        config:
          security-team: write
          '*': read
```

In this example:
- Finance-related services are writable by `finance-team`
- Security services are writable only by `security-team`

## Individual entity access

Control access to specific entities by key.
This provides the most granular control.

```yaml
rbac:
  entitiesCatalog:
    entities:
      '**':
        authenticated: read
        admins: admin
      secret-api:
        security-team: read
      internal-dashboard:
        platform-team: write
        '*': none
```

In this example:
- `**` sets default access for all entities
- `secret-api` is only readable by `security-team`
- `internal-dashboard` is writable by `platform-team` and hidden from others

## Access evaluation order

When a user accesses an entity, permissions are evaluated in this order:

1. **Catalog access** - Can the user view the catalog containing the entity?
2. **Entity type access** - Does the user have access to this entity type?
3. **Entity group access** - Is the entity in a group with restricted access?
4. **Individual entity access** - Are there specific rules for this entity?

Access is denied if any level blocks access.
The most specific matching rule determines the final permission.

## Wildcard patterns

Use these special patterns in your RBAC configuration:

{% table %}
- Pattern
- Description
---
- `*`
- Match all other teams not explicitly listed
---
- `**`
- Match all entities (when used as an entity key)
---
- `authenticated`
- Match all authenticated users
{% /table %}

## Complete example

Here's a comprehensive RBAC configuration for a catalog:

```yaml
rbac:
  entitiesCatalog:
    catalogs:
      all:
        authenticated: read
      services:
        developers: read
        platform-team: admin
      domains:
        architects: read
        admins: admin
      internal:
        platform-team: read
        '*': none

    entitiesTypes:
      service:
        platform-team: write
        developers: read
      domain:
        architects: write
        '*': read
      user:
        hr-team: write
        authenticated: read

    entitiesGroups:
      - entities:
          - payment-gateway
          - billing-engine
        config:
          finance-team: write
          pci-auditors: read
          '*': none

    entities:
      '**':
        authenticated: read
      secret-service:
        security-team: admin
        '*': none
      deprecated-api:
        admins: write
        '*': read
```

## Inherited permissions

Entities extracted from API description files inherit RBAC settings from:

1. **File-level RBAC** - Content RBAC rules for the source API file
2. **x-rbac extension** - RBAC settings in the API specification itself

```yaml
# In redocly.yaml
rbac:
  content:
    'apis/internal/**':
      internal-team: read
      '*': none
```

API files in `apis/internal/` and their extracted entities are only visible to `internal-team`.

## API access control

The Catalog API respects RBAC configuration:
- **GET requests** - Entities the user cannot access are filtered from results (users only see entities they have READ access to)
- **POST, PUT, PATCH, DELETE requests** - Require WRITE access; users without appropriate permissions receive a 403 Forbidden response

## Resources

- **[RBAC concepts](../../access/rbac.md)** - General RBAC concepts and configuration
- **[Roles and permissions](../../access/roles.md)** - Available roles and their permissions
- **[Catalog configuration](../../config/catalog.md)** - Configure catalog behavior
- **[Manage entities via API](./api-management.md)** - API operations affected by RBAC
