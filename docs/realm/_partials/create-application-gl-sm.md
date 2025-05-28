Redocly supports OAuth 2.0 to identify your GitLab self-managed users, so they can authenticate and perform operations such as opening or merging your GitLab merge requests from Redocly.

To connect your GitLab self-managed instance to Reunite, you must create an OAuth 2 application on your instance and copy the **Application ID** and **Secret** for use in a later step in the process.

The OAuth 2 application must have `api` scope and use one of the following Redirect URIs depending on your location:

{% tabs %}

{% tab label="US residency" %}

- Redirect URI: `https://app.cloud.redocly.com/callback/oauth2`.
- Scopes: `api`.

{% /tab %}

{% tab label="EU residency" %}

- Redirect URI: `https://app.cloud.eu.redocly.com/callback/oauth2`.
- Scopes: `api`.

{% /tab %}

{% /tabs %}

See [Create an application for OAuth 2.0](https://docs.gitlab.com/ee/integration/oauth_provider.html) in GitLab's documentation for more information on creating an application in GitLab.
