---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `stats`

The statistics feature provides comprehensive insights into your project's API structure and content composition. It analyzes your OpenAPI specifications and project files to generate detailed metrics that help you understand and track changes in your project over time.

Statistics are displayed in three key locations:
- **Realm portal**: A dedicated `/stats` page with interactive tables showing API and file statistics
- **Reunite project page**: Project-level statistics table showing data from all builds
- **Reunite deploy page**: Statistics displayed alongside other deployment checks like build status and link checker

## Options

{% table %}

- Option
- Type
- Description

---

- apis
- [[API object](#api-object)]
- List of specific APIs to include in statistics.
  If not provided, statistics are collected for all OpenAPI files in the project.

---

- fileExtensions
- boolean
- Enable collection of file extension statistics.
  Default: `false`.

{% /table %}

### API object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED.**
  Display name for the API in statistics.

---

- path
- string
- **REQUIRED.**
  Relative path to the OpenAPI specification file.
  Example: `./apis/petstore.yaml`

{% /table %}

## Access control

The statistics page in Realm is protected by role-based access control (RBAC). By default:
- **Anonymous users**: No access to statistics
- **Authenticated users**: Read access to statistics

The statistics page is automatically available at `/stats` in your Realm portal when the feature is enabled.

{% admonition type="info" %}

Statistics require authentication to view. Users must be logged in to access the statistics page in Realm.
In Reunite, statistics are visible based on your organization permissions.

{% /admonition %}

## Examples

### Default configuration

By default, statistics are collected for all OpenAPI files in your project without any configuration:

```yaml {% title="redocly.yaml" %}
# No statistics configuration needed - enabled by default
# Statistics will be collected for all OpenAPI files found in the project
```

### Complete statistics setup

A comprehensive example showing statistics configuration with multiple APIs:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
  apis:
    - name: Payments API
      path: ./apis/payments/payments-api.yaml
    - name: Webhooks API
      path: ./apis/payments/webhooks-api.yaml
    - name: Users API
      path: ./apis/users/users-api.yaml
    - name: Analytics API
      path: ./apis/analytics/analytics-api.yaml
```

### File extension statistics only

If you only want to collect file extension statistics and collect metrics from all API`s:

```yaml {% title="redocly.yaml" %}
stats:
  fileExtensions: true
```

## Resources

- **[OpenAPI specification](https://redocly.com/docs/openapi-visual-reference/)** - Understanding OpenAPI structure helps interpret the API statistics metrics
