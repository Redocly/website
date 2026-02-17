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

Email notifications are sent to the specified email address for a specific workflow../configure-respect-monitoring.md

To set up email notifications:

1. Select **Respect Monitoring** in the sidebar in Reunite.
1. Select the workflow you want to subscribe to.
1. Click **Notifications** in the top right side corner.
1. Select the **Email** tab in the modal.
1. Add the default events you would like to receive notifications for.
   You must have at least one event listed to subscribe to notifications.
1. Click **Save**.

After you have subscribed, notifications are sent based on the interval time frame [configured in your redocly.yaml file](./configure-respect-monitoring.md).

## Archive workflows

You can archive workflows you no longer wish to continue running../configure-respect-monitoring.md

To archive a workflow:

1. On a new branch, remove the Arazzo Description from your project.
2. Delete the `job` from your `redocly.yaml` file.
3. Commit your changes and merge your pull request with your changes.
4. After deployment, you can still see the old workflow data by clicking the **Archived** toggle.

## Resources

- **[Configure Respect Monitoring](./configure-respect-monitoring.md)** - Set up comprehensive API performance monitoring and reliability tracking with automated workflow execution
- **[Reunite configuration reference](../../../config/reunite.md)** - Complete Respect Monitoring job configuration options for customizing monitoring behavior and thresholds
