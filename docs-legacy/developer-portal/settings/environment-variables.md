---
excludeFromSearch: true
---

# Environment variables

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Environment variables are used during build time for the developer portal.
They may also be used in the client-side code (when [explicitly allowed](../configuration/siteconfig/env-variables.md)).

They may be set using special [`.env.environment_name` files](../guides/environment-files.md), or configured one by one in the Workflows settings.

## Restricted environment variables

When defining custom names, avoid commonly reserved environment variables, such as `HOME` and `PATH`, and those related to the Node environment such as `NODE_ENV`.

Be aware of the [built-in environment variables](../guides/environment-variables-built-in.md) and know that changing the values may result in a behavior change during the build.

The `REDOCLY_` prefix is reserved for future use by Redocly.

## Add an environment variable

1. Navigate to **Portals**, and select a portal.
1. Select **Settings** > **Environment variables**.
1. Select "Add Variable".
1. Fill the form with the Environment variable name and value.
1. If the variable is a secret, select the secret checkbox so to store it in an encrypted format and not display it in the logs.

## Change an environment variable

1. Navigate to **Portals**, and select a portal.
2. Select **Settings** > **Environment variables**.
3. Select the _Edit_ icon next to the variable you want to change.
4. In the **Edit environment variable** dialog that opens, make changes to your variable name and/or value.
5. To confirm changes and exit the dialog, select **Save**.

## Remove an environment variable

1. Navigate to **Portals**, and select a portal.
1. Select **Settings** > **Environment variables**.
1. Select the _Delete_ icon next to the variable you want to remove. The variable is removed from the list immediately.
