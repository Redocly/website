## Connect a GitHub Enterprise Server
With Reunite you can integrate GitHub Enterprise Server as your Git provider using [GitHub Apps](https://docs.github.com/en/apps/using-github-apps/about-using-github-apps).

## Before you begin

Make sure you have the following:

-  an OWNER role in your GitHub organization

## Create a new GitHub App with a manifest flow

Redocly provides a possibility to create a new GitHub app via register app from a [manifest](https://docs.github.com/en/apps/sharing-github-apps/registering-a-github-app-from-a-manifest).

1. On the Overview page for your organization, click **Self-hosted Git providers**.
2. Click **Add new provider**.
3. In the **Add new provider** modal, complete the following:
   - Choose a GitHub **Provider Type**.
   - Enter a name for the Git provider.
   - Enter the GitHub Enterprise Server server URL.
   - Enter the GitHub Enterprise Server organization name where you want to create this app.
  You are redirected to your GitHub Enterprise Server where you need to confirm the app creation with the name you added in the **Name** field.
5. Click **Save**.

  The self-hosted GitHub Enterprise Server provider displays on the list of Git providers.
  Users in your organization can select this provider to [add a repository as a project source](../connect-git-provider.md) to Reunite, or to [add content from a remote repository](../../remote-content/index.md).

## Add an existing GitHub App

If you already have an existing GitHub App or want to create it on your own, you can select the **Add existing app** option.

To connect your GitHub Enterprise Server instance to Reunite, you must create a GitHub App on your instance and copy the **App ID**, **Client ID**, **App name**, **Client secret** and **Private key** for use in a later step in the process.

The GitHub App must have Repository permissions:

- Administration: read
- Checks: read
- Commit statuses: write
- Contents: write
- Metadata: read
- Pull requests: read
- Webhooks: write

Organization permissions:
- Members: read
- Webhooks: write

Account permissions:
- Email addresses: read

The App should be subscribed to the next webhook events: `create`, `delete`, `pull request` and `push`.
Use one of the following Redirect and Webhooks URIs based on your location:

{% tabs %}

{% tab label="US residency" %}

- Redirect URI: `https://app.cloud.redocly.com/callback/oauth2`.
- Webhooks URI: `https://app.cloud.redocly.com/webhooks/git/github_server`.

{% /tab %}

{% tab label="EU residency" %}

- Redirect URI: `https://app.cloud.eu.redocly.com/callback/oauth2`.
- Webhooks URI: `https://app.cloud.eu.redocly.com/webhooks/git/github_server`.


{% /tab %}

{% /tabs %}

See [Create GitHub App](https://docs.github.com/en/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps) in GitHub documentation for more information on creating a GitHub App.


To add a self-hosted GitHub Enterprise Server provider in Reunite for your organization:

1. On the Overview page for your organization, click **Self-hosted Git providers**.
2. Click **Add new provider**.
3. In the **Add new provider** modal, complete the following:
   - Choose a GitHub **Provider Type**.
   - Copy the **Redirect URI** and paste it into your provider's application settings.
   - Enter a name for the Git provider.
   - Enter the GitHub Enterprise Server URL.
   - Enter the GitHub Enterprise App ID from your Git provider.
   - Enter the GitHub Enterprise Client ID from your Git provider.
   - Enter the GitHub Enterprise App name from your Git provider.
   - Enter the GitHub Enterprise Client Secret from your Git provider.
   - Enter the GitHub Enterprise Private key from your Git provider.
4. Click **Save**.

    The self-hosted GitHub Enterprise Server provider displays on the list of Git providers.
    Users in your organization can select this provider to [add a repository as a project source](../connect-git-provider.md) to Reunite, or to [add content from a remote repository](../../remote-content/index.md).

## Edit GitHub Enterprise Server provider properties

You can edit the properties of your self-hosted Git provider to reflect the changes in your infrastructure.

To edit GitHub Enterprise Server provider's properties:

1. On the Organization page, click **Self-hosted Git providers**.
2. Next to the Git provider you want to modify, click the **Edit** icon.
3. Adjust the details as needed.
4. Click **Save**.

## Delete an existing GitHub Enterprise Server provider

You can delete self-hosted Git provider integrations you no longer need.

To delete self-hosted Git provider instances:

1. On the Organization page, click **Self-hosted Git providers**.
2. Next to the Git provider you want to modify, click the **Delete** icon.
3. Enter the provider name; this step ensures that you delete the correct provider.
   Then click the **Delete** button to confirm deletion.

{% admonition type="warning" %}
  Deleting a Git self-hosted provider instance removes all associated OAuth and personal access token authorization credentials, and stops synchronization for remote content and projects related to this provider.

  Perform this action only if you're certain your organization has no use for this GitHub Enterprise Server self-hosted provider instance.
{% /admonition %}

## Resources

- **[Include remote content](../../remote-content/index.md)** - Integrate content from external self-hosted GitHub repositories into your Reunite projects for enterprise documentation workflows
- **[Use the Editor](../../use-editor.md)** - Explore Reunite's collaborative editing environment with self-hosted GitHub Enterprise Server integration and secure version control
- **[Projects overview](../../projects.md)** - Access feedback, deployment details, and project settings for self-hosted GitHub-connected documentation projects
- **[Configuration reference](../../../../config/index.md)** - Complete redocly.yaml configuration options for GitHub Enterprise Server integration and enterprise deployment settings