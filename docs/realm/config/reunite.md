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
description: Allow builds to publish even if Reunite detects issues in you project.
---
# `reunite`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Those issues are:
- Broken links
- Noncompliant API descriptions
- Markdoc syntax errors

Configure `jobs` to run the Respect command on Arazzo Descriptions.

## Options

{% table %}

- Option
- Type {% width="20%" %}
- Description

---

- ignoreLinkChecker
- boolean
- Publish a production project, even if Reunite detects broken links.
  Default value: `false`.

---

- ignoreLint
- boolean | object
- Publish a production project, even if Reunite detects an API description in the project that scores below the minimum standard set either by the `scorecard` or `api` options in the `redocly.yaml` file.
  Default value: `false`.

---

- ignoreMarkdocErrors
- boolean
- Publish a production project, even if Reunite detects Markdoc syntax errors.
  Default value: `false`.

---

- jobs
- [[Jobs object](#jobs-object)]
- Defines jobs based on Arazzo Descriptions in your project that can be used to monitor the performance of your APIs by referencing OpenAPI Descriptions in your project.

{% /table %}

## Jobs object

{% table %}

- Option
- Type
- Description

---

- path
- string
- **REQUIRED.** Specifies the path to an Arazzo Description in your project.

---

- agent
- string
- **REQUIRED.** Specifies the agent that runs the job.
  Only accepts `respect` as the value.

---

- trigger
- [[Trigger object](#trigger-object)]
- **REQUIRED.** Configure events that start the job.

---

- inputs
- Map[string, object]
- Map of strings to JSON schema objects used to define the input parameters used by the Arazzo Description.

---

- servers
- Map [string, object]
- Map of strings to source description objects.
  Define servers for the job.
  Used to override the server URL for a specific source description name in the Arazzo Description's `sourceDescriptions` object.

---

- severity
- [Severity object](#severity-object)
- Set the severity level based on the check type.

{% /table %}

### Trigger object

{% table %}

- Option
- Type
- Description

---

- event
- string
- **REQUIRED.** Specifies the type of event that triggers the job.
  Accepts either `schedule` or `build` as the value.
  - `schedule`: Runs the job at regular intervals.
  - `build`: Runs the job whenever the project is built.

---

- interval
- string
- Specifies the interval between each run of the job in minutes (m), hours (h) or days (d).
  Only required when `event` is set to `schedule`.
  If not defined, the default value is `1h`. Available values: `1m, 2m, 5m, 10m, 15m, 30m, 1h, 3h, 6h, 12h, 1d, 7d`

{% /table %}

### Severity object

{% table %}

- Option
- Type
- Description

---

- statusCodeCheck
- string
- Sets the severity level for the status code check.
  The status code check verifies if the status code returned with API responses matches the statuses described in the provided OpenAPI description.
  Can be one of the following levels: `error`, `warn`, `off`.
  Default: `error`

---

- successCriteriaCheck
- string
- Sets the severity level for the success criteria check.
  The success criteria check verifies if the success criteria defined in the Arazzo Description has been met.
  Can be one of the following levels: `error`, `warn`, `off`.
  Default: `error`

---

- schemaCheck
- string
- Sets the severity level for the schema check.
  The schema check verifies if the response body schema matches what is defined in the provided OpenAPI Description.
  Can be one of the following levels: `error`, `warn`, `off`.
  Default: `error`

---

- contentTypeCheck
- string
- Sets the severity level for the content type check.
  The content type check verifies if the `Content-Type` matches what is defined in the provided OpenAPI Description.
  Can be one of the following levels: `error`, `warn`, `off`.
  Default: `error`

{% /table %}

## Examples

### Ignore errors examples

The following example configuration allows you to publish production project deploys even if Reunite detects broken links, an API description in the project that scores below the minimum standard, and Markdoc errors:

```yaml {% title="redocly.yaml" %}
reunite:
  ignoreLinkChecker: true
  ignoreLint: true
  ignoreMarkdocErrors: true
```

You can also ignore specific API description files by making the `ignoreLint` option an object, as in the following example configuration:

```yaml {% title="redocly.yaml" %}
reunite:
  ignoreLinkChecker: true
  ignoreLint:
    docs/museum/**: true
    docs/travel.yaml: true
```

The errors are still reported, but they do not prevent publishing.

### Jobs configuration examples

The following example adds a basic configuration for Respect Monitoring where the job runs each minute:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/api-status.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1m
```

The following example adds a configuration that contains multiple jobs with inputs specific to the job:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/core-api/api-health-check.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 7d
      inputs:
        reportType: summary
        email: 'report@example.com'
    - path: 'arazzo-jobs/storefront-apis/api-tests.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1d
      inputs:
        cleanupType: full
```

The following example adds a configuration containing inputs with secret values by [adding a custom environment variable](../reunite/project/env-variables.md#settings-page):

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/api-maintenance.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1m
      inputs:
        apiKey: '{{ process.env.API_MAINTENANCE_KEY }}'
```

The following example adds a job that runs whenever the project is built:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/api-health-check.yaml'
      agent: respect
      trigger:
        event: build
```

The following example adds server overrides to an Arazzo Description:

```yaml
reunite:
  jobs:
    - path: 'arazzo-jobs/api-status.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1m
      servers:
        sourceDescriptionName: 'https://server1.com'
```

The following example adds severity level overrides to an Arazzo Description:

```yaml
reunite:
  jobs:
    - path: 'arazzo-jobs/api-status.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1m
      severity:
        statusCodeCheck: off
        successCriteriaCheck: warn
        schemaCheck: warn
        contentTypeCheck: error
```

## Resources

- **[Reunite platform](../reunite/reunite.md)** - Explore Redocly's cloud platform for creating, editing, previewing, and deploying API documentation projects with collaborative features
- **[Configure Respect Monitoring](../reunite/project/respect-monitoring/configure-respect-monitoring.md)** - Use reunite configuration options to track API performance and reliability with automated monitoring workflows
- **[Manage Respect Monitoring](../reunite/project/respect-monitoring/manage-respect-monitoring.md)** - Subscribe to notifications and manage monitoring settings for individual workflows and API endpoints
- **[Environment configuration](env.md)** - Set configuration options by environment to allow builds for development or preview while maintaining strict production standards
- **[RBAC configuration](rbac.md)** - Grant access to Reunite features and projects by teams using role-based access control for comprehensive permission management
