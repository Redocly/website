# Add remote files from GitHub

If your content is stored in a repository on GitHub, you can connect that repository, so you can access and publish those files in Reunite.

To connect a GitHub repository, you must first install the Redocly app in GitHub.
Afterward, you must create a new branch, nter the connection details, and merge the open pull request in Reunite.

## Install the Redocly app in GitHub

{% partial file="../../../_partials/install-redocly-app-gh.md" /%}

## Create a new branch in Reunite

{% partial file="../../../_partials/create-branch.md" /%}

## Enter the connection details in Reunite

After you install the Redocly GitHub App on your organization in GitHub, and create a new branch, you can enter the connection details in Reunite.

To enter the connection details in Reunite:

1. In the file tree, select the folder (or click on the empty space to select the root directory) where you want to add the remote content folder.
1. Select **+ > New remote folder > Add Git repository**.
1. Enter a name for the new remote content folder and press the Enter or Return key.
1. Select **GitHub > Next**.
1. Authorize your Redocly organization to verify your GitHub identity.
1. Select your GitHub **Organization > Repository > Branch**.
2. (Optional) Select the [**Folder**](./remote-content.md#remote-contents-repository-folder), if you want to include only a specific folder from the repository.
3. (Optional) Select the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
4. Select **Add remote**.
   This action opens a pull request in Reunite automatically.
   Click the **View Pull Request** button next to your new branch name to view the pull request.

## Merge the open pull request in Reunite

After you enter the connection details in Reunite, a pull request to merge your updates with the default branch opens.
When you merge the pull request your changes are added to your main branch and a production deploy is triggered.

To merge the open pull request in Reunite:

1. Select the **View Pull Request** button next to your branch name.
1. Review your updates in the **Review** tab.
1. After the tests have run and your pull request has been approved, click the **Merge** button to merge your updates with the default branch.

## Resources

- If you want to connect an entire repository from a Git provider, see [Connect a Git provider](../connect-git/connect-git-provider.md).
- Check out all the ways you can [use the Editor](../use-editor.md) in Reunite to create content.
- Learn more about where you can view feedback and deployment details for [projects](../projects.md) in Reunite.
- View the different options for configuring your project in the `redocly.yaml` file in the [Configuration reference documentation](../../../config/index.md).
