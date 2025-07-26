# Open a pull request in Reunite

To update your published project in Reunite, open a pull request to merge your development branch with the main branch.

## Before you begin

Make sure you have the following before you begin:

- a [project](../projects.md) in Reunite
- the [member role](../../../access/roles.md#organization-roles) in the organization for your project
- [a new branch](../use-editor.md#create-a-new-branch) with [commits or updates](../use-editor.md#commit-updates).

## Open a draft pull request

Pull requests run checks to be sure you are not adding syntax issues or broken links to the production build, create a preview build, and give other users an opportunity to comment on the changes before they are merged with the main branch.

To open a draft pull request:

{% partial file="../../../_partials/create-pr.md" /%}

After creating your draft pull request, you can continue committing changes to your branch until it is either closed or merged.

Before you merge your updates with the main branch, review them to be sure they contain what you expect.

## Pull request workflows

When your changes are ready to be reviewed, you should [update the pull request's state](./manage-pull-requests.md#update-state) to **Ready for review** and assign reviewers.
This notifies the team that there is a pull request awaiting their attention.

The reviewers will approve the pull request if they agree that the changes are ready to merge.
Once there are approving reviews, the [pull request can be merged](./review-pull-request.md#merge-a-pull-request), bringing your changes into the main branch of the project.

If you no longer want to continue working on a pull request and you do not want it merged with main, you can click the **Close pull request button**.
If you change your mind about that pull request later, you can click the **Reopen pull request** button.

## Resources

- Learn more about [using the editor](../use-editor.md) to create content in Markdown and Markdoc.
- If you are working on multiple projects, see [Switch between projects](../switch-between-projects.md).
- Learn more about the different parts of [Reunite](../../reunite.md), Redocly's cloud platform.
- Configure [reunite](../../../config/reunite.md) to allow publishing a build even if it contains broken links.
