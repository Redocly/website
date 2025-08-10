# Use previews

The previews feature shows the updates to a branch, as they would look when applied to the production deployment.
It's like having a staging server for every branch.
You can also share preview links with others, so they can provide you with feedback, not just on the Markdown, but on the formatting as well.

## Trigger a preview deployment

A preview deployment triggers automatically when the following events occur:

- a commit is made to a branch with an open pull request in Reunite
- a pull request is opened in Reunite or a connected Git provider
- a remote content folder is added to your Reunite project

## View preview deployment

You can access previews on the Deploys page, Editor, or Pull requests page in Reunite, after the preview build has passed all checks.

If you use an external Git provider for your repository or remote content, after the build is finished, you can access the build status, preview URL, and visual review in the Git provider.

{% admonition type="info" %}
Preview deployments are available for all unmerged development branches with open PRs in Reunite or a connected Git provider.

While you can view information of deployments or merged pull requests that had their branches deleted, you won't be able to access or generate their previews.
{% /admonition %}

### From the Deploys page

To view previews on the Deploys page:

1. Select the **Preview** toggle button.
2. Select the preview build for the deploy number you want to see.
   You can access previews for any existing pull request. Deploys are listed most recent to least, so the most recent deploy displays first.
3. Click the **Preview** button.

## From the Editor page

To view previews on the Editor page:

1. Switch to your branch
2. Click **Preview** from the top right corner. If it's the default branch, you will see **Production** deployment link.

### From the Pull requests page

To view previews on the Pull requests page:

1. Select the pull request.
2. Click **Preview**.

## View previews in GitHub checks

If you have connected a GitHub repository as a Git provider, you can also access preview builds from GitHub in GitHub checks.

To see previews in a GitHub check:

1. Navigate to the Pull Requests page for the repository in GitHub.
2. Select the Pull Request.
3. Scroll to the checks box and click the **Show all checks** link.
4. Click the **Details** link for the **Project preview** check.

## Restart previews

You can restart a preview deployment from the Deploy page.

To restart a preview build:

1. Select the **Preview** toggle.
2. Select the preview build for the deploy number you want to see.
   Deploys are listed most recent to least, so the most recent deploy displays first.
3. Select the **Restart** button.

Restart is not available for deleted/merged branches.

## Resources

- **[Connect a Git provider](./connect-git/connect-git-provider.md)** - Link your project to Git repositories for version control and automated deployment workflows
- **[Use the editor](./use-editor.md)** - Edit content directly in Reunite with collaborative editing tools and real-time collaboration features
- **[Use the Webview](./use-webview.md)** - View live previews of your content changes while editing for immediate visual feedback
