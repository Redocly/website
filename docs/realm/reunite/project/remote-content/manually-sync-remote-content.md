---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---
# Manually sync remote content

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

If you disabled [Auto-sync](./remote-content.md#auto-sync-and-auto-merge) for your remote content, you have to sync the content manually.

## Before you begin

Make sure you have the following:

- an existing remote content folder

## Manually sync remote content folders

To keep your content up-to-date with changes made in the remote, you can sync the folder.

To manually sync remote content folders:

1. Sync the folder in one of the following ways:
   - From the file tree of the editor, right-click the folder with remote content (remote content folders have a cloud icon), then click **Sync**.
   - From the Remote content page, click the additional options menu on the remote content folder row, then click **Sync**.
   {% img
     src="../../images/reunite-remote-content-options.png"
     alt="Open options menu on Reunite's Remote content page"
     withLightbox=true
   /%}
   A window opens with the branch chosen during the remote folder setup, and the following information on the last commit to that branch:
      - the commit message
      - the user who made commit
      - the Git hash linked to a commit on the remote source
2. (Optional) You can choose a different remote branch to pull the remote content from.
    You can do this if there are issues syncing the original branch, or a different branch has the content you want to include.
3. (Optional) You can check the changes from the last commit by clicking the commit hash.
4. Click **Confirm**.

If Reunite detects changes between the remote content source and your project, it completes the following tasks:

- Creates a new preview branch.
- Overwrites the files in your project's remote content folder with the remote source content.
- Starts a preview build.

If the remote content folder does not have [Auto-merge](./remote-content.md#auto-sync-and-auto-merge) enabled in Reunite, you must review the pull request and merge the content manually.

If Auto-merge is enabled and CI checks pass, Reunite additionally performs these operations:

- Creates a pull request to merge the updates from the preview branch to the default branch.
- Automatically merges the pull request.
- Starts a production build.

## Resources

- **[Remote content concepts](./remote-content.md)** - Understand remote content fundamentals including sync mechanisms, auto-merge capabilities, and folder path management
- **[Add remote files with one-way sync](./index.md)** - Discover supported remote content sources and learn step-by-step setup processes for various integration types
- **[Edit remote content folder settings](./edit-remote-content-folder.md)** - Modify configuration settings for existing remote content folders to optimize synchronization and workflow
