# Redocly Reunite CI/CD push GitHub Action

{% configOptionRequirements plans=["Enterprise", "Enterprise+"] products=["Reunite"] /%}

Use a GitHub Action for pushing remote content to the Redocly Reunite project.
Users with their projects hosted in their own GitHub accounts, but without the Redocly GitHub application installed can use this action in the repository that holds the remote content to push their changes to the Reunite platform.
This action has some advantages over using the push command because it also sets corresponding commit statuses for project deployments and scorecards.

{% admonition type="info" %}
The best way to get started with the GitHub action is to copy the code snippet presented to you when you add a remote content source to your project.
{% /admonition %}

When you add a new Remote from CI/CD, you'll be presented with a starter template for the action that you can use.

## Options

{% table %}

- Option
- Type
- Description

---

- organization
- string
- **REQUIRED**.
  Your Redocly organization slug.

---

- project
- string
- **REQUIRED**.
  Your Redocly project slug.

---

- mountPath
- string
- **REQUIRED**.
  Path to folder where you files should be pushed.
  For example `src/docs/api`.

---

- files
- string
- **REQUIRED**.
  Files/folders list within your repo, separated by spaces.
  For example `openapi-files src/redocly-museum.yaml`.

---

- defaultBranch
- string
- The name of the default branch.
  If not provided, the action uses the repository's default branch.
  This is useful if you want to use a production branch with a different name than the repository's default (e.g., `main`).
  For example: `main`.

---

- githubToken
- string
- GitHub token for setting commit status.
  By default the existing `${{ github.token }}` is used.

---

- domain
- URL
- Redocly domain (if your Redocly app is hosted somewhere other than the default at `https://app.cloud.redocly.com`).

---

- maxExecutionTime
- integer
- Max execution time in seconds.
  If the deployment is not successful within this time, the action will fail.
  Default value: '1200' (20 minutes)

{% /table %}

## Authorization

This action requires authorization using an API key for your organization.
See [Manage organization-wide API keys](../../organization/api-keys.md) to obtain and update your API key.

Store the API key as an environment variable called `REDOCLY_AUTHORIZATION`.
The action will read this secret value from the environment when it executes.

{% admonition type="info"%}
To use this in workflow, add the API key as a Secret in your GitHub repository:

1. Navigate to your repository on GitHub.
2. Go to Settings > Secrets and variables > Actions.
3. Create a New repository secret named `REDOCLY_AUTHORIZATION`.
{% /admonition %}

## Permissions

This action requires:
- `contents: read` - for reading files for push.
- `statuses: write` - for writing commit statuses.

## Examples

The following example shows a GitHub workflow that pushes a `src/redocly-museum.yaml` file from the remote content repo
to the `src/docs/museum` folder inside an `example-project` in Reunite.

The action will run for pushes to any branch.
But Redocly API will detect pushes to main branch and non main branch and triggers corresponding preview or production deployments.


```yaml {% title=".github/workflows/redocly-push.yaml" %}
name: Push to Redocly Reunite (GH Workflow Example)

on:
  push:
    branches:
      - '**'

jobs:
  reunite-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      statuses: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Redocly Reunite push
        uses: redocly/reunite-push-action@v1
        with:
          organization: 'example-org'
          project: 'example-project'
          mountPath: 'src/docs/museum'
          files: 'src/redocly-museum.yaml'
        env:
          REDOCLY_AUTHORIZATION: ${{ secrets.REDOCLY_AUTHORIZATION }}
```

When the action runs, it updates with the build statuses of any scorecards and the project itself.

## Resources

- **[Add remote content](./index.md)** - Comprehensive guide to integrate various types of remote content sources into your Reunite projects for centralized documentation management
- **[Push CLI command](https://redocly.com/docs/cli/commands/push)** - Alternative method for sending remote content to Reunite projects using the Redocly CLI for non-GitHub users and custom workflows
