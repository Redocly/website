# Push files to Reunite API Curl Commands

Based on the updated `PushBody` schema in `reunite-api-subset.yaml`.


## Step 1: Upsert Remote

```bash
curl -X POST \
  "https://app.cloud.redocly.com/api/orgs/${ORG_ID}/projects/${PROJECT_ID}/remotes" \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CICD",
    "mountPath": "apis/example/@v1",
    "mountBranchName": "main",
    "autoSync": true,
    "autoMerge": true
  }'
```

**Save the returned `id` as `REMOTE_ID`.**

## Step 2: Push Files (Updated PushBody Schema)

### Push files with all required PushBody fields:

```bash
export REMOTE_ID="rem_from_step_1_response"

curl -X POST \
  "https://app.cloud.redocly.com/api/orgs/${ORG_ID}/projects/${PROJECT_ID}/pushes" \
  -H "Authorization: Bearer ${API_KEY}" \
  -F "remoteId=${REMOTE_ID}" \
  -F commit[message]="Add sample API documentation and endpoints" \
  -F commit[branchName]="main" \
  -F commit[author][name]="API Developer" \
  -F commit[author][email]="developer@example.com" \
  -F "isMainBranch=true" \
  -F "replace=false" \
  -F "files[openapi.yaml]=@openapi.yaml;type=text/yaml" \
  -F "files[README.md]=@README.md;type=text/markdown"
```

## Step 3: Get Push Status

```bash
export PUSH_ID="push_from_step_2_response"

curl -X GET \
  "https://app.cloud.redocly.com/api/orgs/${ORG_ID}/projects/${PROJECT_ID}/pushes/${PUSH_ID}" \
  -H "Authorization: Bearer ${API_KEY}"
```
