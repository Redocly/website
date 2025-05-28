## Choose Bitbucket as source

Choose the __Bitbucket self-managed__ option from the list and select "Next".

![Bitbucket as source provider](images/bitbucket-self-managed-01-select-provider.png)

## Configure source details

Select a project from the list.

![Select project](images/bitbucket-self-managed-02-select-project.png)

Repositories are grouped by project.
When you select a project, the list of repositories is populated with those available to you.

![Select repository](images/bitbucket-self-managed-03-select-repository.png)

When you select a repository, the list of available branches is populated.

![Select branch](images/bitbucket-self-managed-04-select-branch.png)

Provide the path to your root API definition file, e.g. `openapi.yaml`.

![Root file path](images/bitbucket-self-managed-05-file-path.png)

If you have provided the path to a `redocly.yaml` file, additional options to select the root file are available in the drop-down menu. These options are based on the `apis` configuration within the selected `redocly.yaml` file.

![Root file path for Definitions](images/bitbucket-self-managed-06-api-definitions.png)

If your project is a Redocly Developer portal, it will be detected automatically, displaying appropriate feedback.

![Developer portal detected](images/bitbucket-self-managed-07-dev-portal.png)
