---
excludeFromSearch: true
---

# Notifications

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Workflows can inform you about specific events in your portal project. You can configure which types of events to be notified about on the **Notifications** page.

## Add a notification

1. Navigate to the **Settings > Notifications** page of your portal project.

2. Select **Add notification** to open the dropdown menu where you can choose the notification delivery method. Workflows currently supports email notifications. Select **Email notification** in the dropdown.

3. In the **Email notifications** dialog that opens, select one or more events for which you want to receive notifications. Supported events are: **build succeeded**, **build failed**, **build recovered**.

4. After selecting the event(s), enter the email address to use for receiving notifications. Select **Save** to confirm your changes.

5. The configured notification is listed on the page. You can modify it (by selecting the pencil icon) or delete it (by selecting the bin icon) at any time. This does not trigger a new portal build.


## Delete a notification

1. Navigate to the **Settings > Notifications** page of your portal project.

2. In the list of configured notifications on the page, find the one you want to delete. Select the bin icon to the right of the notification.

3. The notification is immediately removed from the list, and no further notifications are sent for that specific configuration.

