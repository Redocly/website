---
products:
  - Respect Monitoring
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Configure Respect Monitoring

You can configure Reunite to monitor the performance of your APIs using [Arazzo Descriptions](https://spec.openapis.org/arazzo/latest.html).
The output of each workflow is displayed as a chart on the Respect Monitoring page in Reunite, providing metrics for your APIs performance.

## Before you begin

Make sure you have the following:

- one or more Arazzo descriptions files that reference OpenAPI description files in your project
- a `redocly.yaml` configuration file in the root of your project

## Configure Respect Monitoring in `redocly.yaml`

To configure Respect Monitoring for your project:

1. In the `redocly.yaml` file at the root of your project, add a `reunite` option.
1. Inside `reunite`, add a `jobs` object.
1. Add a `path` option with the value of the file path for each Arazzo Description in your project, as in the following example:
    ```yaml {% title="redocly.yaml" %}
    reunite:
      jobs:
        - path: 'arazzo-jobs/core-api/api-health-check.yaml'
        - path: 'arazzo-jobs/storefront-api/api-tests.yaml'
    ```
1. For each item under the `jobs` object, in line with the `path` option add:
    - An `agent` option with `respect` as its value, as in the following example:
    ```yaml {% title="redocly.yaml" %}
    reunite:
      jobs:
        - path: 'arazzo-jobs/core-api/api-health-check.yaml'
          agent: respect
        - path: 'arazzo-jobs/storefront-api/api-tests.yaml'
          agent: respect
    ```
    - A `trigger` object with the following options:
      - An `event` option with `schedule` or `build` as its value.
        - Use `schedule` to run the job at regular intervals.
        - Use `build` to run the job whenever the project is built.
      - (Optional) An `interval` option with a [specified period](../../../config/reunite.md#trigger-object) as its value.
        This is only required when `event` is set to `schedule`.
        If you don't define an interval for a scheduled job, the workflow runs every hour by default.
        As in the following example:
         ```yaml {% title="redocly.yaml" %}
         reunite:
           jobs:
             - path: 'arazzo-jobs/core-apis/api-health-check.yaml'
               agent: respect
               trigger:
                 event: schedule
                 interval: 7d
             - path: 'arazzo-jobs/storefront-apis/api-tests.yaml'
               agent: respect
               trigger:
                 event: schedule
                 interval: 30d
             - path: 'arazzo-jobs/api-build-check.yaml'
               agent: respect
               trigger:
                 event: build
         ```
2. (Optional) Add an `inputs` object with a map of key-value pairs from the Arazzo Description.
3. (Optional) Add a `servers` object with a `sourceDescriptionName` option to override a target URL described in an OpenAPI Description.
4. (Optional) Add a `severity` object with a check type (`statusCodeCheck` | `successCriteriaCheck` | `schemaCheck` | `contentTypeCheck`) to severity level (`error` | `warn` | `off`) mapping, to override the severity level of the check.
   The default severity level is `error`.
5. (Optional) Add SLO (Service Level Objectives) monitoring with `slo` object to set performance thresholds in milliseconds:
   ```yaml {% title="redocly.yaml" %}
   reunite:
     jobs:
       - path: 'arazzo-jobs/api-health-check.yaml'
         agent: respect
         trigger:
           event: schedule
           interval: 1m
         slo:
           warn: 5000    # Warning threshold: 5 seconds
           error: 10000  # Error threshold: 10 seconds
   ```

## View Respect Monitoring preview results

After you complete your configuration, commit your changes, and open a pull request, you can see your Respect Monitoring results on the pull request's checks.
Respect Monitoring workflows only run once for preview builds.

To view your Respect Monitoring results on a preview build:

1. Navigate to the **Pull requests** page in Reunite.
1. Click the pull request with your Respect Monitoring configuration.
1. Scroll to the bottom of the page and click the arrow to open the list of checks.
1. Click the **Details** link next to **Respect Monitoring**.
1. Click the workflow.

{% img alt="Screenshot of pull request checks with Respect Monitoring check" src="./images/respect-monitoring-pr-checks.png" withLightbox=true /%}

### Ignore Respect Monitoring results

You can ignore Respect Monitoring results for a specific build by adding the `ignoreRespectMonitoring` option to the `reunite` object in your `redocly.yaml` file.
Setting this option to `true` sets the build's Respect Monitoring status to `warning` instead of `failed`.

```yaml {% title="redocly.yaml" %}
reunite:
  ignoreRespectMonitoring: true
```

### View Respect Monitoring result chart

When you merge your pull request with your Respect Monitoring configuration and deploy a production build, Reunite's **Respect Monitoring** page displays the results of each workflow in a chart.

To view your Respect Monitoring results on a production build, navigate to **Respect Monitoring** and click the workflow.
You can filter the results by dates and status.

{% img alt="Respect Monitoring chart" srcSet="./images/respect-monitoring-chart.png light, ./images/respect-monitoring-chart-dark.png dark" withLightbox=true /%}

## Examples

The following example defines monitoring for two Arazzo Descriptions, the `api-health-check.yaml` description, running every seven days, and the `api-tests.yaml` description, running every 30 days:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/core-apis/api-health-check.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 1w
      inputs:
        reportType: summary
        email: 'report@example.com'
    - path: 'arazzo-jobs/storefront-apis/api-tests.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 30d
      inputs:
        cleanupType: full
```

### Job with secret value inputs

The following example adds a configuration containing inputs with secret values by [adding a custom environment variable](../env-variables.md#settings-page):

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

### Job with server overrides

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

### Job with severity level overrides

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

### Job that runs on build

The following example adds a job that runs whenever the project is built:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/api-build-check.yaml'
      agent: respect
      trigger:
        event: build
```

### Job with SLO monitoring

The following example adds a job with SLO (Service Level Objectives) monitoring to track performance thresholds:

```yaml {% title="redocly.yaml" %}
reunite:
  jobs:
    - path: 'arazzo-jobs/api-performance-check.yaml'
      agent: respect
      trigger:
        event: schedule
        interval: 30s
      slo:
        warn: 2000 # Warning threshold: 2 seconds
        error: 5000 # Error threshold: 5 seconds
```

## Resources

- **[Reunite configuration reference](../../../config/reunite.md)** - Complete configuration options for Respect Monitoring including workflow scheduling, notification settings, and performance thresholds
- **[Manage Respect Monitoring](./manage-respect-monitoring.md)** - Configure SLA monitoring, subscribe to notifications, and manage workflows including archiving old workflows
