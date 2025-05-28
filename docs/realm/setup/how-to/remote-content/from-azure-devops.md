# Add remote files from Azure DevOps

If your content is stored in a repository on Azure DevOps Services, you can connect that repository, so you can access and publish those files in Reunite.

To connect an Azure DevOps repository, you must first create a new personal access token (PAT) token in Azure DevOps.
Afterward, you must create a new branch, enter the connection details, and merge the open pull request in Reunite.

## Create a new access token in Azure DevOps

{% partial file="../../../_partials/create-access-token-for-azure-org.md" /%}

## Create a new branch in Reunite

{% partial file="../../../_partials/create-branch.md" /%}

## Enter the connection details in Reunite

After you have created a new branch in Reunite, you can add remote content to your project in Reunite using the connection details you have collected from Azure DevOps.

To enter the connection details in Reunite:

1. In the file tree, select the folder (or click on the empty space to select the root directory) where you want to add the remote content folder.
1. Select **+ > New remote folder > Add Git repository**.
1. Enter a name for the new remote content folder and press the Enter or Return key.
1. Select **Azure DevOps Services**.
1. Enter a **Credential name** that identifies this Azure DevOps Services connection.
1. Enter the **Access token** you saved from the [Create a new access token in Azure DevOps](#create-a-new-access-token-in-azure-devops) step.
1. Enter the **Organization name** where you created the access token and select **Next**.
1. Select your **Organization > Repository > Branch**.
1. (Optional) Select the [**Folder**](../../concepts/remote-content.md#remote-contents-repository-folder), if you want to include only a specific folder from the repository.
1. (Optional) Select the [**Auto-sync**](../../concepts/remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](../../concepts/remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
1. Select **Add remote**.
   This action opens a pull request in Reunite automatically.
   Click the **View Pull Request** button next to your new branch name to view the pull request.

## Merge the open pull request in Reunite

After you enter the connection details in Redocly, a pull request to merge your updates with the default branch opens.
When you merge the pull request your changes are added to your main branch and a production deploy is triggered.

To merge the open pull request in Reunite:

1. Select the **View Pull Request** button next to your branch name.
1. Review your updates in the **Review** tab.
1. After the tests have run and your pull request has been approved, click the **Merge** button to merge your updates with the default branch.

## Related how-tos

- If you want to connect an entire repository from a Git provider, see [Connect a Git provider](../git-providers/connect-git-provider.md).
- Check out all the ways you can [use the Editor](../../../author/how-to/use-editor.md) in Reunite to create content.

## Resources

- Learn more about where you can view feedback and deployment details for [projects](../../concepts/projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../config/index.md).