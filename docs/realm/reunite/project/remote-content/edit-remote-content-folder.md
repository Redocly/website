# Edit remote content folder settings

You can update the following remote content folder settings:

- Git provider
- Git provider settings
- Auto-sync
- Auto-merge

These settings can be updated in Reunite either in the file tree of the editor, or on the Remote content page.

You _cannot_ update the following remote content folder settings:

* the Mount folder path
* the remote source

You must add a new remote content folder and delete the previous one.

## Before you begin

Make sure you have the following before you begin:

- a project in your organization in Reunite
- an existing remote content folder
- at least the [member](../../../access/roles.md#organization-roles) role for the Organization your project has been created in

## Update existing settings

You can update the settings on existing remote content folders from either the file tree of the editor or the Remote content page in Reunite.

To edit remote content folder settings:

1. From the file tree of the editor, right-click the folder with remote content (remote content folders have a cloud icon), then click **Edit**. \
   OR \
   From the Remote content page, click the additional options menu on the far right side of the table on the remote content folder row, then click **Edit**. \
  ![Open options menu on Reunite's Remote content page](../../images/reunite-remote-content-options.png)
2. Modify the settings as needed, depending on the source of your content:
    * For GitHub, see: [Add remote files from GitHub](./from-github.md#enter-the-connection-details-in-reunite)
    * For GitLab and GitLab self-managed repos, perform [Add remote files from GitLab](./from-gitlab.md#enter-the-connection-details-in-reunite)
    * For a CI/CD source, perform [Push remote content from an external source](./from-gitlab.md#enter-the-connection-details-in-reunite)
    * For a URL source, perform [Add remote content from a URL](./from-gitlab.md#enter-the-connection-details-in-reunite)
3. Click **Next**. \
   Reunite creates a pull request.
4. Review and merge the pull request.

## Resources

* Learn about the remote content feature in [Remote content](./remote-content.md).
* Find the how-to guides for different types of remote content in [Add remote files with one-way sync](./index.md).
* If you have turned off Auto-sync, you can [manually sync remote content](./manually-sync-remote-content.md).
