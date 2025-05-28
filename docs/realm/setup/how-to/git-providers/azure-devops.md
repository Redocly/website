# Add an Azure DevOps repo

If your project files are stored in a remote repository on Azure DevOps Services, you can connect that repository, so you can access, edit, and publish those files in Reunite.

To connect an Azure DevOps repository, you must first create a new Personal Access Token for your Azure organization, then enter the connection details in Reunite.

## Create a new access token in Azure DevOps

{% partial file="../../../_partials/create-access-token-for-azure-org.md" /%}

## Enter the connection details in Reunite

1. From your project, select **Settings > Git hosting > Azure DevOps**.
1. Enter a **Credential name** that identifies this Azure DevOps connection. For example, *"PAT for my ACME organization"*.
1. Enter the **Access token** you saved from the [Create a new access token in Azure DevOps](#create-a-new-access-token-in-azure-devops) step.
2. Enter the **Organization name** of the Azure DevOps Services Organization and select **Next**.
3. Select your **Organization > Repository > Branch**.
4. (Optional) Select the **Monorepo folder**, if your project files are part of a monorepo, and you want to include only a specific folder from the repository.
   {% admonition type="info" name="Monorepo folder" %}
   If you select to only include a specific folder from a monorepo:

   - Only files listed in file tree are cloned, no other files are included
   - Project builds are started only when branch contains changes to connected folder
   - Remote content is allowed to add to connected folder only

   {% /admonition %}

5. Select **Next > Connect**.
   {% admonition type="warning" name="Warning" %}
   **This step deletes the files currently in the Redocly project and replaces them with the files in Azure DevOps Services.**
   {% /admonition %}

## Related how-tos

- Follow steps to [include remote content](../remote-content/index.md) from a different repository in your project.
- Check out all the ways you can [use the Editor](../../../author/how-to/use-editor.md) in Reunite to create content.

## Resources

- Learn more about where you can view feedback and deployment details for [projects](../../concepts/projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../config/index.md).
