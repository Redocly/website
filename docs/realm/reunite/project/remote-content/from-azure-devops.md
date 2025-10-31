# Add remote files from Azure DevOps

{% configOptionRequirements plans=["Enterprise", "Enterprise+"] products=["Reunite"] /%}

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

1. In the file tree, select the folder (or click on the empty space to select the root directory) where you want to add the remote content.
1. Select **+ > New remote folder > Add Git repository** to add a remote content folder, or **+ > New remote file > Add Git repository** to add a remote content file.
1. Enter a name for the new remote content (folder or file) and press the Enter or Return key.
1. Select **Azure DevOps Services**.
1. Enter a **Credential name** that identifies this Azure DevOps Services connection.
1. Enter the **Access token** you saved from the [Create a new access token in Azure DevOps](#create-a-new-access-token-in-azure-devops) step.
1. Enter the **Organization name** where you created the access token and select **Next**.
1. Select your **Organization > Repository > Branch**.
1. (Optional) Select the [**Folder**](./remote-content.md#remote-contents-repository-folder) or [**File**](./remote-content.md#remote-contents-repository-file), depending on whether you are adding a remote folder or a remote file.
1. (Optional) Click the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
3. (Optional) Select the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
1. Select **Add remote**.
   This action opens a pull request in Reunite automatically.

You can click the **View Pull Request** button next to your new branch name to view the pull request.


## Merge the open pull request in Reunite

After you enter the connection details in Redocly, a pull request to merge your updates with the default branch opens.
When you merge the pull request your changes are added to your main branch and a production deployment is triggered.

To merge the open pull request in Reunite:

1. Select the **View Pull Request** button next to your branch name.
1. Review your updates in the **Review** tab.
1. After the tests have run and your pull request has been approved, click the **Merge** button to merge your updates with the default branch.


## Resources

- **[Connect a Git provider](../connect-git/connect-git-provider.md)** - Connect entire Azure DevOps repositories to your project for comprehensive version control and automated deployment pipelines
- **[Use the Editor](../use-editor.md)** - Explore Reunite's collaborative editing environment for creating content with Azure DevOps remote content integration and team workflows
- **[Projects overview](../projects.md)** - Access feedback, deployment details, and project settings for Azure DevOps remote content-enabled documentation projects
- **[Configuration reference](../../../config/index.md)** - Complete redocly.yaml configuration options for Azure DevOps remote content integration and project customization
