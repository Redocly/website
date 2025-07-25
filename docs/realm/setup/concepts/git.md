# Source control

Reunite uses Git for version control, which means every change that is made to your project is recorded and tracked by Git.
Git is a widely-used distributed version control system that allows multiple developers to collaborate on a project by managing changes to source code and other files.
Git providers offer online Git hosting services, so teams can collaborate from around the world.

## Git terms

Git uses specific terminology that we also use in our interface including the following terms:

- **Commit:** A commit is a change you want tracked by Git and stored on your branch.
  Each commit requires a commit message that describes the changes that you made.
  Best practice is to chunk your changes into smaller sections that can be described succinctly.
- **Branch:** A Git branch is a place where you can put your commits.
  The default branch for all Redocly hosted projects in Reunite is the `main` branch.
  Best practice is to create a new development branch from the `main` branch before making any changes.
  This way, all changes can be reviewed before being added to the `main` branch and becoming part of your production build.
- **Pull request:** A pull request (PR) or merge request (MR) is when you want changes from a development branch to be part of the production build, so you open a PR to merge your development branch with the `main` branch.
  Pull requests show the differences between your branch and the `main` branch, run checks to be sure you are not adding broken links to the production build, create a deployment preview build, and give other users an opportunity to comment on the changes before they are merged with the `main` branch.

## Git providers

Redocly offers Git hosting for your projects, but if you already have your project files stored in a repository hosted by a Git provider, you can [connect either the entire repository or a folder in that repository](../../reunite/project/connect-git/connect-git-provider.md).

Redocly integrates with the following Git repository hosting providers:

- GitHub
- GitLab
- GitLab self-managed
- Azure DevOps

If you connect your Git provider repository to your Redocly project, the following tasks can be completed in both your Git provider or Reunite:

- Create branches
- Commit updates
- Open pull PRs or MRs
- Review PRs or MRs
- Merge PRs or MRs

All required checks from the Git provider must pass before you can merge a pull request in Reunite, but by default Reunite checks are not required to pass before you can merge a pull request in your Git provider.
You can configure your Git provider to wait for Reunite checks to pass before merging pull requests in your Git provider.
If you create a pull request or merge request in your Git provider, it is added in Reunite, but you can't edit the PR or MR description in Reunite.

## Related how-tos

- Learn how to [connect a Git provider](../../reunite/project/connect-git/connect-git-provider.md) to your Redocly project.
- Follow step-by-step instructions for [opening a pull request in Reunite](../../reunite/project/pull-request/open-pull-request.md).

## Resources

- Check out the configuration options for Reunite's checks in the [`reunite` configuration](../../config/reunite.md) reference documentation.
- Exclude files from your project's deployment with the [`ignore` configuration](../../config/ignore.md).
