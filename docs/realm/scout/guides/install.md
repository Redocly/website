# Install Scout

## Before you begin

### [Generate Redocly API key](../../reunite/organization/api-keys.md)

### Webhook setup

Scout needs access to your Git source control. You need to provide the Scout webhook URL to your Git source control and pass credentials to the Scout via configuration.

Note: Webhook setup requires URL of the Scout instance from the next step.
You can configure a temporary URL first and then update it later.

#### GitLab

To run Scout in GitLab, create a new user on behalf of which Scout makes operations on connected repositories and leaves comments in merge requests.

1. Create a new user with a `Maintainer` role by following these [instructions](https://docs.gitlab.com/ee/user/profile/account/create_accounts.html).
2. Add newly created user as a member of projects or groups you want to sync with your main Redocly project.
3. Sign in into newly created user account and [create personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) (scopes: `api`) - save it for the configuration step.
4. Go to `https://{gitlab-server-url}/api/v4/users?username={username}` where `{username}` is the user that Scout performs actions on behalf of. Copy the value of the user id for the configuration step.
5. [Configure a GitLab webhook](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#configure-a-webhook-in-gitlab) for every project or group (at least GitLab Premium is required) to sync:
   - URL: `https://{scout-url}/webhooks/gitlab`
   - Secret token is optional but if you provide one then save it for the configuration step.
   - Triggers: `Push events` and `Merge request events`

#### GitHub

To run Scout in GitHub you need to create a GitHub application and provide it with access to your repositories.
It allows Scout to create comments and set statuses in your PRs.

1. Create a new application `https://{github-server-url}/organizations/{org}/settings/apps`
2. Fill required fields
   - Github App name: `Redocly Scout`
   - Homepage URL: `https://redocly.com`
   - Webhook URL: `https://{scout-url}/webhooks/github`
   - Secret: any value, you need to provide same value to Scout config WEBHOOK_SECRET field
   - Repository permissions:
     - Contents: `read-only`
     - Pull requests: `read and write`
     - Commit statuses: `read and write`
   - User permissions:
     - Email addresses: `read-only`
   - Subscribe to events: `PullRequest`, `Push`
3. Scroll down to Private keys and generate a new private key
4. Go to Optional features -> Activate optional features for Redocly Scout -> User-to-server token expiration -> toggle `Opt-in`

## Running Scout in your infra

You could run a Scout instance with Docker:

```shell
docker run redocly/scout
```

Scout is a source available tool and you could run it from source which could be found in [this repository](https://github.com/redocly-demo/redocly-scout).

### Configuration

{% table %}

- Environment variable {% width="30%" %}
- Description

---

- `PORT`
- The port that the application runs on.
  Default value: `8080`.

---

- `MAX_CONCURRENT_JOBS`
- The number of jobs that can be executed in parallel.
  Default value: `2`.

---

- `AUTO_MERGE`
- If set to `true`, merges PRs when updates are pushed to the main branch.
  Default value: `false`.

---

- `API_FOLDER`
- The path in the repository where Scout looks for API definitions.
  Default value: `/`.

---

- `DATA_FOLDER`
- The path to the folder where Scout stores temporary data.
  Example: `/tmp/redocly/scout-data/`.

---

- `REDOCLY_API_URL`
- Redocly API base URL.
  Example: `https://app.beta.redocly.com/api`.

---

- `REDOCLY_API_KEY`
- Redocly organization [API token](../../reunite/organization/api-keys.md).

---

- `REDOCLY_ORG_ID`
- Redocly organization ID.
  Example: `acme-org`.

---

- `REDOCLY_PROJECT_ID`
- Redocly project ID.
  Example: `acme-portal`.

---

- `REDOCLY_DEST_FOLDER_PATH`
- The path where Scout pushes discovered API definitions.
  You can use `{title}`, `{repoId}`, `{orgId}` and `{metadata}` variables here. Use dot notation to access metadata nested properties.
  Default value: `apis/{metadata.team}/{repoId}/{title}`.

---

- `REDOCLY_JOB_CONTEXT`
- A job execution context.
  You can reference same variables as in `REDOCLY_DEST_FOLDER_PATH`.
  Example: `{metadata.team}`.

---

- `REDOCLY_APIS`
- A JSON array of API configurations. Each configuration has the following fields:

  - `name` - API name.
  - `url` - API URL.
  - `apiKey` - API key.
  - `orgId` - Organization ID.
  - `projectId` - Project ID.
  - `jobContext` - A job execution context.
  - `metadataRequired` - If set to `true`, Scout requires metadata in the repository to run.
  - `detectChanges` - If set to `true`, Scout detects changes in the API definitions and create a changelog.
  - `autoMerge` - If set to `true`, Scout merges PRs when updates are pushed to the main branch.
  - `destFolderPath` - The path to the location where Scout pushes discovered API definitions.
  - `mountBranchName` - The branch name to mount the API definitions to.

    You can keep your secrets as separate values. The secrets can be referred to within the definition of other values:

  ```shell
  REDOCLY_APIS='[{
    "name": "external",
    "url": "https://api.redocly.com/api",
    "apiKey": "${REDOCLY_API_KEY}",
    "orgId": "org_xxx",
    "projectId": "prj_xxx",
    "jobContext": "{metadata.team}",
    "metadataRequired": true,
    "detectChanges": true,
    "autoMerge": true,
    "destFolderPath": "apis/{metadata.team}/{repoId}/{title}",
  }]'
  REDOCLY_API_KEY='sk_xxx'
  ```
---

- `LOG_FORMAT`
- Possible values: `pretty`, `json`.
  Default value: `json`.

---

- `LOG_LEVEL`
- Possible values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
  Default value: `info`.

---

- `GITHUB_PROVIDERS`
- JSON array of GitHub app configurations. Each configuration has the following fields:

  - `url` - GitHub server url. Omit in case of GitHub cloud.
  - `appId` - GitHub application ID. `https://{github-server-url}/organizations/{org}/settings/apps` -> Redocly Scout -> `App ID`.
  - `appUserId` - GitHub application user that leaves Scout-related comments. `https://{github-server-url}/users/{app slug name}[bot]`
  - `privateKey` - GitHub application private key created during application configuration.
  - `webhookSecret` - GitHub webhook secret, created during application configuration.

  You can keep your secrets as separate values. They can be referred to within the definition of other values:

  ```shell
  GITHUB_PROVIDERS='[{
    "appId": "123",
    "appUserId": "456",
    "privateKey": "${MY_PRIVATE_KEY}",
    "webhookSecret": "${MY_WH_SECRET}"
  }]'
  MY_PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----
  MIIEp...6G2Hg==
  -----END RSA PRIVATE KEY-----'
  MY_WH_SECRET='my-secret'
  ```

---

- `GITLAB_PROVIDERS`
- JSON array of GitLab instance configurations. Each configuration has the following fields:

  - `url` - GitLab instance url. Omit if you use GitLab.com (GitLab Cloud).
  - `userId` - Your GitLab user id. The instructions for how to obtain it are available in the [GitLab section](#gitlab).
  - `privateToken` - GitLab private token generated on the user's account.
  - `webhookSecret` - The secret used when creating a webhook on GitLab.

  You can keep your secrets as separate values. They can be referred to within the definition of other values:

  ```shell
  GITLAB_PROVIDERS='[{
    "userId": "123",
    "privateToken": "d7dsf7s5d76576sdf5sd5f76",
    "webhookSecret": "${MY_WH_SECRET}"
  }]'
  MY_WH_SECRET='my-secret'
  ```

---

- `REDOCLY_REMOTES`
- JSON array of remote configurations for pushing additional files. Scout will push those files that match the rules declared here, in addition to pushing APIs. Each entry has the following fields:

  - `namespaceId` - ID of the namespace (organization slug) of the Git repository.
  - `repositoryId` - ID of the Git repository (repository slug for GitHub).
  - `providerId` - Git provider ID per `GITHUB_PROVIDERS` or `GITLAB_PROVIDERS`, `appId` for GitHub or instance URL origin (e.g. `https://gitlab.com`) for GitLab.
  - `contentPath` - Path to the content (folder or file) in the source repository to sync.
  - `contentType` - `file` or `folder`, `folder` by default.
  - `mountPath` - Path to mount the content in the Project repository.

  ```shell
  GITLAB_PROVIDERS='[{
    "namespaceId": "my-org",
    "repositoryId": "config-repo",
    "providerId": "123",
    "contentPath": "./service-domains.yaml",
    "contentType": "file",
    "mountPath": ".lint/service-domains.yaml"
  }]'
  ```
{% /table %}
