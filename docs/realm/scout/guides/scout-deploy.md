# Redocly Scout

Redocly Scout is a discovery and publishing tool for APIs and documentation. It is designed to be deployed in a customer's infrastructure and to be used with Reunite.

## Before you begin

Make sure the following before you begin:

- [create or use the existing Redocly organization and project IDs](https://github.com/Redocly/redocly-scout#redocly-portal)
- [register Scout as a GitHub App to the GitHub organization account](https://github.com/Redocly/redocly-scout#github-application)
- [build the Docker image](https://github.com/Redocly/redocly-scout#build-docker-image)

## Deploy with AWS Console

### Create ECR repository

1. Open [AWS ECR Repositories](https://us-east-1.console.aws.amazon.com/ecr/repositories?region=us-east-1).
2. Click "Create repository". ![create-a-new-repository.png](./images/deploy/create-a-new-repository.png)
3. Fill "Repository name" field. ![fill-repository-name.png](./images/deploy/fill-repository-name.png)
4. Click "Create repository".

### Build docker image and push to ECR repository

1. Open created repository.
2. Click "View push command". ![view-push-commands.png](./images/deploy/view-push-commands.png)
3. Execute provided commands. ![push-commands.png](./images/deploy/push-commands.png)
   > NOTE: Skip second step since you already built the Docker image.

### Create secrets

Sensitive data such as the GitHub private key, Redocly API key, and GitHub webhook secret should be stored in the AWS secret
manager.

1. Open [AWS Secrets Manager](https://us-east-1.console.aws.amazon.com/secretsmanager/listsecrets?region=us-east-1).
2. Click "Store a new secret". ![create-a-new-secret.png](./images/deploy/create-a-new-secret.png)
3. Choose secret type: "Other type of secret" -> "Plaintext" and specify its value and click "
   Next". ![fill-secret-value.png](./images/deploy/fill-secret-value.png)
4. Fill "Secret name" field and click "Next". ![fill-secret-name.png](./images/deploy/fill-secret-name.png)
5. Click "Store".

### Create task execution role

1. Open [AWS IAM Roles](https://us-east-1.console.aws.amazon.com/iamv2/home?#/roles)
2. Click "Create role"
3. Select "Custom trust policy"
4. Insert the following configuration in the "Custom trust policy" field.

```json
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

5. Click "Next"
6. Select `AmazonECSTaskExecutionRolePolicy` permission policy and click "Next"
7. Fill "Role name" and "Description" and click "Create role"

### Assign read secrets permission to the role

1. Open created on the previous step role
2. Click "Permissions policies" -> "Add permission" -> "Create inline policy"
3. Select "Secrets Manager" service -> Access level "Read" -> "GetSecretValue"
4. In the "Resources" section specify ARNs of created secrets.
5. Click "Next"
6. Fill "Policy name" and click "Create policy".

### Create task definition

1. Open [AWS ECS Task definitions](https://us-east-1.console.aws.amazon.com/ecs/v2/task-definitions?region=us-east-1).
2. Click "Create new task definition". ![create-a-new-task-definition.png](./images/deploy/create-a-new-task-definition.png)
3. Fill "Task definition family" field and container image
   URI. ![fill-task-definition-family.png](./images/deploy/fill-task-definition-family.png)
4. Add container port mappings and environment variables. ![fill-task-definition-port-mapping.png](./images/deploy/fill-task-definition-port-mapping.png)
   The list of ENV variables:

- PORT - the port the application is run on (default `8080`).
- MAX_CONCURRENT_JOBS - the number of jobs that can be executed in parallel (default `2`).
- AUTO_MERGE - merge PRs when updates are pushed to the main branch. One of [`true`, `false`] (default `false`).
- API_FOLDER - the path in the repository where Scout looks for API definitions (default `/`).
- DATA_FOLDER - the path to the folder where Scout stores temporary data.
- REDOCLY_API_URL - Redocly API base URL.
- REDOCLY_API_KEY - Redocly organization API token.
- REDOCLY_ORG_ID - Redocly organization ID.
- REDOCLY_PROJECT_ID - Redocly project ID.
- PORTAL_APIS_FOLDER - the path where Scout pushes discovered API definitions.
- REDOCLY_APIS - A JSON array of API configurations. Each configuration has the following fields:
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
    > NOTE: Extract sensitive data from a secrets manager. The sensitive data can be referred to within the definition of other values:
    >
    > ```shell
    > REDOCLY_APIS='[{
    >   "name": "external",
    >   "url": "https://api.redocly.com/api",
    >   "apiKey": "${REDOCLY_API_KEY}",
    >   "orgId": "org_xxx",
    >   "projectId": "prj_xxx",
    >   "jobContext": "{metadata.team}",
    >   "metadataRequired": true,
    >   "detectChanges": true,
    >   "autoMerge": true,
    >   "destFolderPath": "apis/{metadata.team}/{repoId}/{title}",
    > }]'
    > REDOCLY_API_KEY='sk_xxx'
    > ```
- LOG_FORMAT - one of [`pretty`, `json`] (default `json`).
- LOG_LEVEL - one of [`trace`, `debug`, `info`, `warn`, `error`, `fatal`] (default `info`).
- GITHUB_PROVIDERS - JSON array of GitHub app configurations. Each configuration has the following fields:
  - `url` - GitHub server url. Omit in case of GitHub cloud.
  - `appId` - GitHub application ID. `https://{github-server-url}/organizations/{org}/settings/apps` -> Redocly Scout -> `App ID`.
  - `appUserId` - GitHub application user that leaves Scout-related comments. `https://{github-server-url}/users/{app slug name}[bot]`
  - `privateKey` - GitHub application private key created during application configuration.
  - `webhookSecret` - GitHub webhook secret, created during application configuration.
    > NOTE: Sensitive data should be extracted from secrets manager. It can be referred to within the definition of other values:
    >
    > ```shell
    > GITHUB_PROVIDERS='[{
    >   "appId": "123",
    >   "appUserId": "456",
    >   "privateKey": "${MY_PRIVATE_KEY}",
    >   "webhookSecret": "${MY_WH_SECRET}"
    > }]'
    > MY_PRIVATE_KEY='-----BEGIN RSA PRIVATE KEY-----
    > MIIEp...6G2Hg==
    > -----END RSA PRIVATE KEY-----'
    > MY_WH_SECRET='my-secret'
    > ```
- `GITLAB_PROVIDERS` - JSON array of GitLab instance configurations. Each configuration has the following fields:
  - `url` - GitLab instance url. Omit if you use GitLab.com (GitLab Cloud).
  - `userId` - GitLab user ID; instructions for how to obtain it are available in [GitLab section](https://redocly.com/docs/realm/scout/guides/install/#gitlab).
  - `privateToken` - GitLab private token generated on the user's account.
  - `webhookSecret` - GitLab secret used when creating a webhook on GitLab.
    > NOTE: Sensitive data should be stored in a secrets manager and referred to within the definition of other values:
    >
    > ```shell
    > GITLAB_PROVIDERS='[{
    >   "userId": "456",
    >   "privateToken": "${MY_PRIVATE_TOKEN}",
    >   "webhookSecret": "${MY_WH_SECRET}"
    > }]'
    > MY_PRIVATE_TOKEN='my-private-token'
    > MY_WH_SECRET='my-secret'
    > ```

5. Configure task resources CPU/memory/storage and select task execution
   role. ![fill-task-definition-resources.png](./images/deploy/fill-task-definition-resources.png)
   > NOTE: There is a default `escTaskExecutionRole` role, but you could create a new one
6. Click "Create".

### Create ECS cluster

1. Open [AWS ECS Clusters](https://us-east-1.console.aws.amazon.com/ecs/v2/clusters?region=us-east-1).
2. Click "Create cluster". ![create-a-new-cluster.png](./images/deploy/create-a-new-cluster.png)
3. Fill "Cluster name" field, select VPC and subnets. ![fill-cluster-name.png](./images/deploy/fill-cluster-name.png)
4. Click "Create".

### Create Service

1. Open [AWS ECS Clusters](https://us-east-1.console.aws.amazon.com/ecs/v2/clusters?region=us-east-1) and select created
   cluster.
2. On the "Services" tab click "Create".
3. Fill service name and select the created task family. ![fill-service-name.png](./images/deploy/fill-service-name.png)
4. In the networking tab select VPC and its private subnets
   > NOTE: There are shouldn't be public subnets
5. Configure a new security group ![fill-service-security-group.png](./images/deploy/fill-service-security-group.png)
6. Turn off "Public IP" switch.
7. Create a new Application load balancer. ![fill-service-load-balancer.png](./images/deploy/fill-service-load-balancer.png)
8. Configure SSL certificates, target group and its
   healthcheck. ![fill-service-target-group.png](./images/deploy/fill-service-target-group.png)
9. Click "Create".

### Configure Load Balancer subnets

1. Open created service
2. Click "View load balancer"
3. Click "Actions" -> "Edit subnets"
4. In the networking mapping section select public subnets
5. Click "Save changes"

### Assign domain name

1. Copy load balancer domain name. "View load balancer" -> "DNS name".
2. Open [AWS Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/home#Dashboard).
3. Select hosted zone for selected SSL certificate.
4. Click "Create record".
5. Fill record details. ![fill-dns-details.png](./images/deploy/fill-dns-details.png)
6. Click "Create records".

## Deploy with AWS CLI

### Create ECR repository

```shell
aws ecr create-repository --repository-name redocly-scout
```

### Build docker image and push to ECR repository

```shell
docker tag redocly-scout:latest <ECR reposity ARN>:<image version>
docker push <ECR reposity ARN>:<image version>
```

### Create task secrets

```shell
aws secretsmanager create-secret --name scout-redocly-api-key --secret-string <Redocly API key>
aws secretsmanager create-secret --name scout-github-private-key --secret-string <GitHub app private key>
aws secretsmanager create-secret --name scout-github-webhook-secret --secret-string <GitHub app webhook secret>
```

### Create task definition

Please follow the official [AWS tutorial](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html) to create ECS Task

Example of `task_definition.json`:

```json
{
  "family": "redocly-scout-task",
  "containerDefinitions": [
    {
      "name": "redocly-scout",
      "image": "<image ARN>",
      "portMappings": [
        {
          "name": "redocly-scout-8080-tcp",
          "containerPort": 8080,
          "hostPort": 8080,
          "protocol": "tcp",
          "appProtocol": "http"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "PORT",
          "value": "8080"
        },
        {
          "name": "DATA_FOLDER",
          "value": "/tmp/redocly/scout-data/"
        },
        {
          "name": "REDOCLY_API_URL",
          "value": "https://<Redocly hostname>/api"
        },
        {
          "name": "MAX_CONCURRENT_JOBS",
          "value": "5"
        },
        {
          "name": "PORTAL_APIS_FOLDER",
          "value": "/apis"
        },
        {
          "name": "REDOCLY_PROJECT_ID",
          "value": "<Redocly project ID>"
        },
        {
          "name": "API_FOLDER",
          "value": "/"
        },
        {
          "name": "AUTO_MERGE",
          "value": "true"
        },
        {
          "name": "LOG_FORMAT",
          "value": "json"
        },
        {
          "name": "REDOCLY_ORG_ID",
          "value": "<Redocly organization ID>"
        },
        {
          "name": "LOG_LEVEL",
          "value": "debug"
        },
        {
          "name": "GITHUB_PROVIDERS",
          "value": "[{\"appId\": \"123\",\"appUserId\": \"456\",\"privateKey\": \"${MY_PRIVATE_KEY}\",\"webhookSecret\": \"${MY_WH_SECRET}\"}]"
        }
      ],
      "secrets": [
        {
          "name": "REDOCLY_API_KEY",
          "valueFrom": "<Redocly API key secret ARN>"
        },
        {
          "name": "MY_WH_SECRET",
          "valueFrom": "<GitHub app webhook secret ARN>"
        },
        {
          "name": "MY_PRIVATE_KEY",
          "valueFrom": "<GitHub app private key secret ARN>"
        }
      ]
    }
  ],
  "requiresCompatibilities": ["FARGATE"],
  "executionRoleArn": "<Execution role ARN>",
  "volumes": [],
  "networkMode": "awsvpc",
  "cpu": "1024",
  "memory": "2048"
}
```
