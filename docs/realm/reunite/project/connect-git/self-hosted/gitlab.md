## Create an application in your GitLab self-managed

{% partial file="../../../../_partials/create-application-gl-sm.md" /%}

## Add a self-hosted Git provider

To add a self-hosted GitLab provider in Reunite for your organization:

1. On the Overview page for your organization, click **Self-hosted Git providers**.
2. Click **Add new provider**.
3. In the **Add new provider** modal, complete the following:
   * Choose a GitLab **Provider Type**.
   * Copy the **Redirect URI** and paste it into your provider's application settings.
   * Enter a name for the Git provider.
   * Enter the self-managed Git server URL.
   * Enter the application ID from your Git provider.
   * Enter the application secret from your Git provider.
4. Click **Save**.

  The self-hosted GitLab provider displays on the list of Git providers. Users in your organization can select this provider to [add a repository as a project source](../connect-git-provider.md) to Reunite, or to [add content from a remote repository](../../remote-content/index.md).

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

{% admonition type="warning" %}
  Deleting a GitLab self-hosted provider instance removes all associated OAuth and personal access token authorization credentials, and stops synchronization for remote content and projects related to this provider.

  Perform this action only if you're certain your organization has no use for this GitLab self-hosted provider instance.
{% /admonition %}

## Resources

- Follow steps to [include remote content](../../remote-content/index.md) from a different repository in your project.
- Check out all the ways you can [use the Editor](../../use-editor.md) in Reunite to create content.
- Learn more about where you can view feedback and deployment details for [projects](../../projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../../config/index.md).