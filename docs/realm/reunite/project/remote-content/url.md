# Add remote content from a URL

{% configOptionRequirements plans=["Enterprise", "Enterprise+"] products=["Reunite"] /%}

Use the [remote content](./remote-content.md) feature to include content from external sources in your project.
This approach is useful for including a single, publicly-available file as part of your published project.

## Add a remote URL source

To add content from a remote file:

1. In the file tree, select the folder (or click on the empty space to select the root directory) to which you want to add the remote content folder.
1. Select **+ > New remote file > Add URL link**.
1. Enter a name for the new remote content folder and press **Enter** or **Return** key.
1. Enter the URL of a publicly-available file to include in the project.
1. Select a sync frequency, between 15 minutes and 12 hours.
  Files that update infrequently can be synced less often.
1. (Optional) Click the [**Auto-sync**](./remote-content.md#auto-sync-and-auto-merge) or [**Auto-merge**](./remote-content.md#auto-sync-and-auto-merge) toggles to turn off either option.
1. Click **Add remote**.
   This action opens a pull request in Redocly automatically.
   After refreshing your browser, you should see a **View Pull Request** button next to your new branch name.

## Merge the open pull request in Redocly

After you enter the connection details in Redocly, a pull request to merge your updates with the default branch opens.

1. Refresh your browser to see a **View Pull Request** button next to your new branch name.
2. Select **View Pull Request**.
3. Review your updates in the **Review** tab.
4. After the tests have run and your pull request has been approved, click the **Merge** button to merge your updates with the default branch.

## Resources

- **[Adding remote content types](./index.md)** - Explore guides for integrating various remote content sources including Git repositories, URLs, and other external systems
- **[Remote content concepts](./remote-content.md)** - Understand remote content fundamentals including URL-based sync, verification processes, and integration capabilities
