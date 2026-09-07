If Reunite detects changes between the remote content source and your project, it completes the following tasks:

- Creates a new preview branch.
- Overwrites the files in your project's remote content folder with the remote source content.
- Starts a preview build.

If the remote content folder does not have [Auto-merge](../reunite/project/remote-content/remote-content.md#auto-sync-and-auto-merge) enabled in Reunite, you must review the pull request and merge the content manually.

If Auto-merge is enabled and CI checks pass, Reunite additionally performs these operations:

- Creates a pull request to merge the updates from the preview branch to the default branch.
- Automatically merges the pull request.
- Starts a production build.