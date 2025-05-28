# Connect a GitLab repo

If your project files are stored in a remote repository on GitLab, you can connect that repository, so you can access, edit, and publish those files in Reunite.

To connect a GitLab repository, you must first create a new access token in GitLab, then enter the connection details in Reunite.

## Create a new access token in GitLab

{% partial file="../../../_partials/create-access-token-gl.md" /%}

## Enter the connection details in Redocly

1. From your project, select **Settings > Git hosting**.
2. From the list of Git providers, select **GitLab** or a self-managed GitLab instance. For more information, see [Manage self-hosted Git providers in Reunite](./self-hosted/gitlab.md)
3. Enter a **Credential name** for the new GitLab credential.
4. Enter the **Access token** you saved from the [Create new access token in GitLab](#create-a-new-access-token-in-gitlab) step and select **Next**.
5. Select the **Namespace > Project > Branch**.
6. (Optional) Select the **Monorepo folder**, if your project files are part of a monorepo, and you want to include only a specific folder from the repository.
   {% admonition type="info" name="Monorepo folder" %}
   If you select to only include a specific folder from a monorepo:

   - Only files listed in file tree are cloned, no other files are included
   - Project builds are started only when branch contains changes to connected folder
   - Remote content is allowed to add to connected folder only

   {% /admonition %}

7. Select **Next > Connect**.
   {% admonition type="warning" name="Warning" %}
   **This step deletes the files currently in the Redocly project and replaces them with the files in GitLab.**
   {% /admonition %}

## Related how-tos

- Follow steps to [include remote content](../remote-content/index.md) from a different repository in your project.
- Check out all the ways you can [use the Editor](../../../author/how-to/use-editor.md) in Reunite to create content.

## Resources

- Learn more about where you can view feedback and deployment details for [projects](../../concepts/projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../config/index.md).
