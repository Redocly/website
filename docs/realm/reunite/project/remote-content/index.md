# Add remote files with one-way sync

{% configOptionRequirements plans=["Enterprise", "Enterprise+"] products=["Reunite"] /%}

The [remote content](./remote-content.md) feature allows adding content from a variety of external sources.
If you have files in a Git repository, you can include them in your project as a remote content folder or as a single remote file.
Remote content folders and files are synced one way.
Updates pushed to your online Git repository are reflected in the Redocly project, which you can then deploy and publish through Redocly.

- How to add content from a Git provider: pick the guide for your Git hosting from the list below.

  - [GitHub](from-github.md)
  - [GitLab and GitLab self-managed](from-gitlab.md)
  - [Azure DevOps](from-azure-devops.md)
  - [Bitbucket Cloud](from-bitbucket-cloud.md)

- How to [add content from a remote URL](url.md)
- How to [push content from an external source to Redocly](./push.md)

Read the [overview of the remote content verification processes](./verify-remote-content.md) for more information about how the process works.
