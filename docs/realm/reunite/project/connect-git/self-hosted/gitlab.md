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
---
# Create an application in your GitLab self-managed

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Redocly supports OAuth 2.0 to identify your GitLab self-managed users.
Users can then authenticate and perform operations such as opening or merging your GitLab merge requests from Redocly.

To connect your GitLab self-managed instance to Reunite, you must create an OAuth 2 application on your instance.
Copy the **Application ID** and **Secret** for use in a later step in the process.

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

## Add a self-hosted Git provider

To add a self-hosted GitLab provider in Reunite for your organization:

1. On the Overview page for your organization, click **Self-hosted Git providers**.
2. Click **Add new provider**.
3. In the **Add new provider** modal, complete the following:
   - Choose a GitLab **Provider Type**.
   - Copy the **Redirect URI** and paste it into your provider's application settings.
   - Enter a name for the Git provider.
   - Enter the self-managed Git server URL.
   - Enter the application ID from your Git provider.
   - Enter the application secret from your Git provider.
4. Click **Save**.

  The self-hosted GitLab provider displays on the list of Git providers.
  Users in your organization can select this provider to [add a repository as a project source](../connect-git-provider.md) to Reunite.
  They can also [add content from a remote repository](../../remote-content/index.md).

## Edit self-hosted GitLab provider properties

You can edit the properties of your self-hosted Git provider to reflect the changes in your infrastructure.

To edit a self-hosted GitLab provider's properties:

1. On the Organization page, click **Self-hosted Git providers**.
2. Next to the Git provider you want to modify, click the **Edit** icon.
3. Adjust the details as needed.
4. Click **Save**.

## Delete an existing self-hosted GitLab provider

You can delete self-hosted Git provider integrations you no longer need.

To delete self-hosted Git provider instances:

1. On the Organization page, click **Self-hosted Git providers**.
2. Next to the Git provider you want to modify, click the **Delete** icon.
3. Enter the provider name; this step ensures that you delete the correct provider.
   Then click the **Delete** button to confirm deletion.

{% admonition type="danger" name="Irreversible action" %}
  Deleting a GitLab self-hosted provider instance removes all associated OAuth and personal access token authorization credentials.
  It also stops synchronization for remote content and projects related to this provider.

  Perform this action only if you're certain your organization has no use for this GitLab self-hosted provider instance.
{% /admonition %}

## Resources

- **[Include remote content](../../remote-content/index.md)** - Integrate content from external self-hosted GitLab repositories into your Reunite projects for secure enterprise documentation workflows
- **[Use the Editor](../../use-editor.md)** - Leverage Reunite's collaborative editing tools with self-hosted GitLab integration for secure content creation and team collaboration
- **[Manage projects](../../manage-projects.md)** - Access feedback, deployment details, and project settings for self-hosted GitLab-connected documentation projects
- **[Configuration reference](../../../../config/index.md)** - Complete redocly.yaml configuration options for GitLab self-managed integration and enterprise deployment customization
