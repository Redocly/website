# Connect a Bitbucket Cloud repo

If your project files are stored in a remote repository on Bitbucket Cloud, you can connect that repository, so you can access, edit, and publish those files in Reunite.

To connect a Bitbucket Cloud repository, you must first create a new access token in Bitbucket Cloud, then enter the connection details in Reunite.

## Create a new repository access token in Bitbucket Cloud

{% partial file="../../../_partials/create-access-token-bitbucket-cloud.md" /%}

## Enter the connection details in Redocly

1. From your project, select **Settings > Git hosting**.
2. From the list of Git providers, select **Bitbucket Cloud**.
3. Enter a **Credential name** for the new Bitbucket Cloud credential.
4. Enter the **Workspace name** of the Bitbucket Cloud Workspace and select **Next**.
5. Enter the **Access token** you saved from the [Create a new repository access token in Bitbucket Cloud](#create-a-new-repository-access-token-in-bitbucket-cloud) step and select **Next**.
6. Select the **Namespace > Project > Branch**.
7. (Optional) Select the **Monorepo folder**, if your project files are part of a monorepo, and you want to include only a specific folder from the repository.
   {% admonition type="info" name="Monorepo folder" %}
   If you select to only include a specific folder from a monorepo:

   - Only files listed in file tree are cloned, no other files are included
   - Project builds are started only when branch contains changes to connected folder
   - Remote content can only be added to the connected folder.

   {% /admonition %}

8. Select **Next > Connect**.
   {% admonition type="warning" name="Warning" %}
   **This step deletes the files currently in the Redocly project and replaces them with the files in Bitbucket Cloud.**
   {% /admonition %}

## Resources

- **[Include remote content](../remote-content/index.md)** - Integrate content from external Bitbucket repositories into your Reunite projects for streamlined documentation workflows
- **[Use the Editor](../use-editor.md)** - Leverage Reunite's collaborative editing tools for content creation with Bitbucket integration and team collaboration features
- **[Projects overview](../projects.md)** - Manage feedback, deployment details, and project settings for Bitbucket-connected documentation projects
- **[Configuration reference](../../../config/index.md)** - Complete redocly.yaml configuration options for Bitbucket integration, automated deployment, and project customization
