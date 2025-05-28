---
excludeFromSearch: true
---

# GitHub

Use GitHub as a source for your API definitions and developer portal projects.

{% partial file="../../_snippets/source-github-connection.md" /%}

## Set up the connection

Select your organization.

![Organization screen](./images/github-select-organization.png)

Select from the list of repositories available to the Redocly Workflows app for the selected organization.

![GitHub select repo](./images/github-select-repository.png)

Select from the list of branches available.

![GitHub select branch](./images/github-select-branch.png)

If you are using a `redocly.yaml` file, there will be options of to select your root file based on the `apis` configuration within the file.

![Select path to root file](./images/github-select-root-file.png)

Note: Redocly Workflows app will detect a developer portal repo automatically and provide you with appropriate feedback.

![Developer portal detected](./images/github-redocly-portal-detected.png)

<!-- We should consider removing this feature

## Build other branches as previews

When you select to build other branches as previews, it will trigger a build when a new branch is pushed or a new commit is pushed to an existing non-default branch.
If a commit is pushed to your default branch, it will trigger a production build.

If your API version has other usages, it will trigger subsequent cascading preview builds of other APIs, reference docs, and developer portals.

![Build other branches as previews](./images/build-other-branches-as-previews.png) -->

{% partial file="../../_snippets/source-monorepo.md" /%}


## Lint and bundle previews

When you select to validate and bundle PRs as previews, it will trigger a build when:

- a new pull request (PR) is opened
- a new commit is pushed to any open PR

If your API version has other usages, it will trigger subsequent cascading preview builds of other APIs, reference docs, and developer portals.

![Lint and bundle PRs](./images/validate-and-bundle-prs.png)
