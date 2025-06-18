---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `stats`

Configure project statistics tracking and display. This option allows you to collect and display build and deployment statistics for your documentation project. Statistics are only visible to organization owners and require the appropriate permissions.

{% admonition type="info" %}
Project statistics are only available to users with the organization owner role and require the `ProjectStatistics` feature flag to be enabled.
{% /admonition %}

The statistics service automatically tracks anomalies in your project metrics and sends notifications when significant changes are detected (30% or more change in any metric).

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- Enable tracking of file extensions in statistics.
  When enabled, the service tracks the number of files by extension and detects significant changes.
  Default value: `false`

---

- apis
- [[API object](#api-object)]
- List of specific APIs to track in statistics.
  If not defined, the service automatically tracks all APIs in your project.
  For each API, the following metrics are collected:
  - `references`: Number of references in the API
  - `externalDocuments`: Number of external documents
  - `schemas`: Number of schemas
  - `parameters`: Number of parameters
  - `links`: Number of links
  - `pathItems`: Number of path items
  - `operations`: Number of operations
  - `tags`: Number of tags

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED**. Name of the API to track.

---

- path
- string
- **REQUIRED**. Path to the API description file.

{% /table %}

## Examples

### Basic configuration

Enable file extension tracking and automatic API tracking:

```yaml
stats:
  fileExtensions: true
```

### Track specific APIs

Configure statistics to track specific APIs:

```yaml
stats:
  fileExtensions: true
  apis:
    - name: main-api
      path: ./openapi/main.yaml
    - name: legacy-api
      path: ./openapi/legacy.yaml
```

## Anomaly Detection

The statistics service automatically detects anomalies in your project metrics. An anomaly is detected when any metric changes by 30% or more compared to the previous build. When anomalies are detected:

1. The service compares current metrics with the previous build
2. For file extensions, it tracks changes in the number of files by extension
3. For APIs, it tracks changes in all API metrics (references, schemas, operations, etc.)
4. If anomalies are detected, notifications are sent to the user who triggered the build

## Related options

- [rbac](./rbac.md) - Configure role-based access control for project statistics
- [reunite](./reunite.md) - Configure build and deployment monitoring

## Resources

- Explore other [configuration options](./index.md) for your project