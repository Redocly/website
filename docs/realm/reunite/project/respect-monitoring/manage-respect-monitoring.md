---
products:
  - Respect Monitoring
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Manage Respect Monitoring

You can subscribe to notifications by Arazzo workflow, to receive a message when an API included in the Arazzo workflow does not pass the criteria checks.
You can configure SLA (Service Level Agreement) monitoring to track service availability and get notified when uptime falls below your target threshold.
You can also archive old workflows, so they do not clutter the Respect Monitoring page, allowing you to focus on active workflows.

## Before you begin

Make sure you have the following before you begin:

- Realm [owner organization role](../../../access/roles.md)
- an [Arazzo description file](https://spec.openapis.org/arazzo/latest.html) in project
- a [`job`](../../../config/reunite.md#jobs-object) configuration in your `redocly.yaml` file
- if you are configuring Slack notifications:
  - Slack Workspace owner permissions
  - the name of the public channel you plan to use

## Subscribe to notifications

Get Respect Monitoring incident updates and maintenance status updates sent directly to you.
You can select what severity level events you want reported in the notifications.
You can subscribe to Slack or email notifications.

### Subscribe to Slack notifications

Slack notifications are sent to the specified channel for a specific workflow.

To set up Slack notifications:

1. Select **Respect Monitoring** in the sidebar in Reunite.
1. Select the workflow you want to subscribe to.
1. Click **Notifications** in the top right side corner.
1. Click **Subscribe via Slack**.
1. Select the Slack workspace you want to install the Redocly app on and click **Allow** to install the Redocly Slack app to your Slack workspace.
1. Select a public Slack channel as the **Default channel** where the notifications are delivered.
1. (Optional) Add the default events you would like to receive notifications for.
   You must have at least one event listed to subscribe to notifications.
1. (Optional) Deselect the **Alert when back up** checkbox if you do not want to receive a notification when a down workflow is back up again.
1. (Optional) Use the slider or enter a lower number of errors for when the notification should be resent.
1. Click **Save**.

After you have subscribed, notifications are sent based on the interval time frame [configured in your `redocly.yaml` file](./configure-respect-monitoring.md).

### Subscribe to email notifications

Email notifications are sent to the specified email address for a specific workflow.

To set up email notifications:

1. Select **Respect Monitoring** in the sidebar in Reunite.
1. Select the workflow you want to subscribe to.
1. Click **Notifications** in the top right side corner.
1. Select the **Email** tab in the modal.
1. Add the default events you would like to receive notifications for.
   You must have at least one event listed to subscribe to notifications.
1. Click **Save**.

After you have subscribed, notifications are sent based on the interval time frame [configured in your redocly.yaml file](./configure-respect-monitoring.md).

## Configure SLA monitoring

Service Level Agreement (SLA) monitoring tracks your API's uptime and sends notifications when the service availability drops below your target threshold over a specified period.

SLA monitoring helps you:
- track service availability over time
- get notified when uptime falls below your target threshold
- monitor recovery after SLA breaches

### Before you configure SLA

Make sure you have:
- Realm [owner organization role](../../../access/roles.md)
- an active workflow in Respect Monitoring
- if you are configuring Slack notifications:
  - Slack Workspace owner permissions
  - the name of the public channel you plan to use

### Set up SLA monitoring

To configure SLA monitoring for a workflow:

1. On Reunite's **Respect Monitoring** tab, select the workflow you want to configure SLA monitoring for.
1. Click **Notifications** in the top right side corner.
1. Select the **SLA** tab in the modal.

{% img alt="Screenshot of Respect Monitoring notifications modal with SLA tab selected" src="./images/respect-monitoring-sla-tab.png" withLightbox=true /%}

1. Configure SLA target:
   - **Target uptime**: the minimum service availability percentage you expect to maintain (0-100%).
     Default is 99.9%.
     For example, 99.9% uptime allows approximately 43 minutes of downtime per month.
   - **Target period**: the number of days (1-30) over which the SLA is calculated.
     Default is 7 days.

{% img alt="Screenshot of SLA configuration showing target uptime and target period settings" src="./images/respect-monitoring-sla-configuration.png" withLightbox=true /%}

1. Configure notification channels:
   - **Send to Slack**: Enable to receive SLA breach and recovery notifications in Slack.
     If Slack is not yet connected, click **Connect Slack workspace** to install the Redocly app.
     Select the Slack channel where notifications should be sent.
   - **Send by Email**: Enable to receive SLA notifications via email.
     Add up to 5 email recipients who should receive notifications.
     Click **Add recipient** and enter an email address for each recipient.

{% img alt="Screenshot of SLA notifications configuration showing Slack and Email options" src="./images/respect-monitoring-sla-notifications.png" withLightbox=true /%}

1. (Optional) Enable **Alert when back up** to receive notifications when your service recovers and meets SLA targets again after a breach.
1. Review the alert summary that shows when alerts will trigger based on your configuration.
1. Click **Save**.

After you configure SLA monitoring, Reunite tracks your workflow's uptime and sends notifications when:
- uptime drops below the target percentage over the specified period (SLA breach)
- service recovers and meets SLA targets again (if **Alert when back up** is enabled)

### SLA monitoring example

The following example shows a typical SLA configuration:
- **Target uptime**: 99.9% (allows ~43 minutes downtime per month)
- **Target period**: 7 days
- **Notifications**: Enabled for Slack channel `#api-alerts` and email `team@example.com`
- **Alert when back up**: Enabled

With this configuration, Reunite sends notifications when:
- the API's uptime falls below 99.9% over any seven day period
- when the API recovers

## Archive workflows

You can archive workflows you no longer wish to continue running.

To archive a workflow:

1. On a new branch, remove the Arazzo Description from your project.
2. Delete the `job` from your `redocly.yaml` file.
3. Commit your changes and merge your pull request with your changes.
4. After deployment, you can still see the old workflow data by clicking the **Archived** toggle.

## Resources

- **[Configure Respect Monitoring](./configure-respect-monitoring.md)** - Set up comprehensive API performance monitoring and reliability tracking with automated workflow execution
- **[Reunite configuration reference](../../../config/reunite.md)** - Complete Respect Monitoring job configuration options for customizing monitoring behavior and thresholds
