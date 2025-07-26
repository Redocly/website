# Manage environment variables

Environment variables are used during both build and run time for the project.

They may also be used in the client-side code (when [explicitly allowed](./env-variables.md)).

You can set environment variables in one of two ways:

- Add them to specially named [`.env.environment_name` files](./env-variables.md) in your project.
- Add them individually on the **Settings** page for the project.

## Restricted environment variables

When defining custom names, avoid commonly reserved environment variables, such as `HOME` and `PATH`, and those related to the Node environment such as `NODE_ENV`.

The `PUBLIC_` prefix is shared with the client side, and should not be used for any secrets.

The `REDOCLY_` prefix is reserved for future use by Redocly.

## Add an environment variable

1. Once logged in to Redocly, select the project.
1. Select **Settings** > **Environment variables**.
1. Select **Add environment variable**.
1. Enter the Environment variable name and value.
1. If the variable is a secret, select the secret checkbox to store it in an encrypted format and exclude it from the logs.

## Change an environment variable

1. Once logged in to Redocly, select the project.
1. Select **Settings** > **Environment variables**.
1. Hover over the environment variable you want to update.
1. Select the _Edit_ icon next to the variable you want to change.
1. In the **Edit environment variable** dialog that opens, make changes to your variable value select to make the variable secret.
1. Select **Save**.

## Remove an environment variable

1. Once logged in to Redocly, select the project.
1. Select **Settings** > **Environment variables**.
1. Select the _Delete_ icon next to the variable you want to remove. The variable is removed from the list immediately.
