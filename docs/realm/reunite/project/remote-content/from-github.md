# Add remote files from GitHub

If your content is stored in a repository on GitHub, you can connect that repository, so you can access and publish those files in Reunite.

To connect a GitHub repository, you must first install the Redocly app in GitHub.
Afterward, you must create a new branch, enter the connection details, and merge the open pull request in Reunite.

## Install the Redocly app in GitHub

{% partial file="../../../_partials/install-redocly-app-gh.md" /%}

## Create a new branch in Reunite

{% partial file="../../../_partials/create-branch.md" /%}

## Enter the connection details in Reunite

After you install the Redocly GitHub App on your organization in GitHub, and create a new branch, you can enter the connection details in Reunite.

To enter the connection details in Reunite:

1. In the file tree, select the folder (or click on the empty space to select the root directory) where you want to add the remote content.
1. Select **+ > New remote folder > Add Git repository** to add a remote content folder, or **+ > New remote file > Add Git repository** to add a remote content file.
1. Enter a name for the new remote content (folder or file) and press the Enter or Return key.
1. Select **GitHub > Next**.
1. Authorize your Redocly organization to verify your GitHub identity.
1. Select your GitHub **Organization > Repository > Branch**.
1. (Optional) Select the [**Folder**](./remote-content.md#remote-contents-repository-folder) or [**File**](./remote-content.md#remote-contents-repository-file), depending on whether you are adding a remote folder or a remote file.
1. (Optional) Select the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
1. Select **Add remote**.
   This action opens a pull request in Reunite automatically.

You can click the **View Pull Request** button next to your new branch name to view the pull request.


## Merge the open pull request in Reunite

After you enter the connection details in Reunite, a pull request to merge your updates with the default branch opens.
When you merge the pull request your changes are added to your main branch and a production deploy is triggered.

To merge the open pull request in Reunite:

1. Select the **View Pull Request** button next to your branch name.
1. Review your updates in the **Review** tab.
1. After the tests have run and your pull request has been approved, click the **Merge** button to merge your updates with the default branch.

## Resources

- **[Connect a Git provider](../connect-git/connect-git-provider.md)** - Connect entire GitHub repositories to your project for comprehensive version control and automated workflows
- **[Use the Editor](../use-editor.md)** - Explore Reunite's collaborative editing tools for creating and managing content with GitHub remote content integration
- **[Projects overview](../projects.md)** - Access feedback, deployment details, and project settings for GitHub remote content-enabled documentation projects
- **[Configuration reference](../../../config/index.md)** - Complete redocly.yaml configuration options for GitHub remote content integration and project customization
