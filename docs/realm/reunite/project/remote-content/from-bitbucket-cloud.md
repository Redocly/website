# Add remote files from Bitbucket Cloud

{% configOptionRequirements plans=["Enterprise", "Enterprise+"] products=["Reunite"] /%}

If your project files are stored in a remote repository on Bitbucket Cloud, you can connect that repository, so you can access and publish those files in Redocly.

To connect a Bitbucket Cloud repository, you must first create a new repository access token in Bitbucket Cloud.
Afterward, you must create a new branch, enter the connection details, and merge the open pull request in Reunite.

## Create a new repository access token in Bitbucket Cloud

{% partial file="../../../_partials/create-access-token-bitbucket-cloud.md" /%}

## Create a new branch in Reunite

{% partial file="../../../_partials/create-branch.md" /%}

## Enter the connection details in Reunite

After you have created a new branch in Reunite, you can add remote content to your project in Reunite using the connection details you have collected from Bitbucket Cloud.

To enter the connection details in Reunite:

1. In the file tree, select a folder (or click on the empty space to select the root directory) where you want to add the remote content.
1. Select **+ > New remote folder > Add Git repository** to add a remote content folder, or **+ > New remote file > Add Git repository** to add a remote content file.
1. Enter a name for the new remote content (folder or file) and press **Enter** or **Return** key.
1. From the list of Git providers, select **Bitbucket Cloud**.
1. Enter a **Credential name** for the new Bitbucket Cloud credential.
1. Enter the **Workspace name** of the Bitbucket Cloud Workspace and select **Next**
1. Enter the **Access token** you saved from the [Create a new repository access token in Bitbucket Cloud](#create-a-new-repository-access-token-in-bitbucket-cloud) step and select **Next**.
1. Select the **Namespace > Project > Branch**.
1. (Optional) Select the [**Folder**](./remote-content.md#remote-contents-repository-folder) or [**File**](./remote-content.md#remote-contents-repository-file), depending on whether you are adding a remote folder or a remote file.
1. (Optional) Select the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
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

- **[Connect a Git provider](../connect-git/connect-git-provider.md)** - Connect entire Bitbucket repositories to your project for comprehensive version control and automated documentation workflows
- **[Use the Editor](../use-editor.md)** - Leverage Reunite's collaborative editing tools for content creation with Bitbucket remote content integration and team collaboration features
- **[Projects overview](../projects.md)** - Manage feedback, deployment details, and project settings for Bitbucket remote content-enabled documentation projects
- **[Configuration reference](../../../config/index.md)** - Complete redocly.yaml configuration options for Bitbucket remote content integration and project customization
