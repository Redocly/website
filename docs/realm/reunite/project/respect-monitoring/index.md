---
products:
  - Respect Monitoring
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Respect Monitoring

With Respect Monitoring you can leverage your [Arazzo](https://www.openapis.org/arazzo) Descriptions with Redocly's Respect command to keep track of your APIs' health and quality.

Use your [Arazzo workflows](https://spec.openapis.org/arazzo/latest.html#workflow-object) to create test cases for your APIs.
Then the Respect command can send requests to a server you choose and chain together data from previous requests.
Finally, integrate your OpenAPI Descriptions and Respect Monitoring automatically checks if response schemas match their specifications.

Respect Monitoring runs the following automatic checks against the provided OpenAPI Descriptions included in your Arazzo Descriptions:

- **status code check:** The status code check verifies if the status code returned with API responses matches the statuses described in the provided OpenAPI Description.
- **success criteria check:** The success criteria check verifies if the success criteria defined in the Arazzo Description has been met.
- **content-type check:** The schema check verifies if the response body schema matches what is defined in the provided OpenAPI Description.
- **schema check:** The content-type check verifies if the `Content-Type` matches what is defined in the provided OpenAPI Description.

You can preview a workflow's response in the pull request checks before you merge it with the main branch and deploy a production build.

{% img alt="Screenshot of pull request checks with Respect Monitoring check" srcSet="./images/respect-monitoring-pr-checks.png light, ./images/respect-monitoring-pr-checks-dark.png dark" withLightbox=true /%}

After you save your Arazzo Descriptions to your project, configure Respect Monitoring in your `redocly.yaml` file, and deploy a production build, Reunite's Respect Monitoring page displays the results of each Arazzo workflow in a chart.

{% img alt="Respect Monitoring chart" srcSet="./images/respect-monitoring-chart.png light, ./images/respect-monitoring-chart-dark.png dark" withLightbox=true /%}

This chart continuously updates according to the frequency you set in the `interval` option for the `trigger` object in your `redocly.yaml` file.
You can also subscribe to notifications to receive alerts in real-time when Respect Monitoring workflow jobs fail or succeed.

## Resources

- **[Configure Respect Monitoring](./configure-respect-monitoring.md)** - Set up Reunite to monitor API performance and reliability with automated workflow execution and reporting
- **[Reunite configuration reference](../../../config/reunite.md)** - Explore Arazzo workflow jobs configuration options for comprehensive API monitoring setup
- **[Manage Respect Monitoring](./manage-respect-monitoring.md)** - Subscribe to notifications and manage monitoring settings for individual workflows and API endpoints
