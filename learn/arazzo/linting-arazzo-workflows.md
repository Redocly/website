# Linting Arazzo workflows

Before you send your Warp API workflow into the time stream with Respect,
you need to make sure it's rock-solid.
A typo in an `operationId` or a broken reference could leave you stranded in 1889—or worse, vaporized.
That's where linting comes in.
Using Redocly CLI's `lint` command,
you can validate your Arazzo file's syntax and references,
catching errors early.
Let's lint our Tesla blueprint retrieval workflow,
fix common Warp-related issues,
and see why this step is a time traveler's best friend.

## Why lint Arazzo?

Linting checks your Arazzo file for mistakes—think of it as a pre-flight checklist for your Warp mission.
It ensures:

- **Syntax is clean**: No missing colons or misnested YAML.
- **References work**: Every `operationId` (e.g., `warpApi.timeTravel`) matches the Warp OpenAPI spec.
- **Consistency**: Inputs, outputs, and dependencies align properly.

Redocly CLI's `lint` command,
unlike Respect's execution,
doesn't hit the API—it's a static check.
Catch errors here,
and you'll save time (and timelines) when running with Respect later.

## Setting Up Redocly CLI

Grab your Arazzo file—we'll use `warp.arazzo.yaml` from our Tesla mission.
Ensure you're using a recent-version of Redocly CLI (post-Arazzo support).
We recommend to use npx to get the latest version:

```bash
npx @redocly/cli@latest lint warp.arazzo.yaml
```

### Linting the Tesla Blueprint Workflow

Here's the workflow we've been working with:
```yaml
arazzo: "1.0.1"
info:
  title: "Tesla Blueprint Retrieval Guide"
  version: "1.0.0"
sourceDescriptions:
  - name: "warpApi"
    url: "https://api.warp.example.com/v1/openapi.yaml"
    type: "openapi"
workflows:
  - workflowId: "retrieveTeslaBlueprint"
    summary: "Travel to 1889 to retrieve Tesla's lost blueprint and return safely"
    parameters:
      - name: "Authorization"
        in: "header"
        value: "Bearer {$inputs.token}"
    steps:
      - stepId: "setHomeAnchor"
        operationId: "warpApi.setAnchor"
        description: "Set an anchor in 2025."
        requestBody:
          payload:
            timestamp: "2025-02-19T12:00:00Z"
            description: "Mission start point - 2025 base"
        outputs:
          anchorId: $response.body#/id
      - stepId: "create1889Timeline"
        operationId: "warpApi.createTimeline"
        description: "Create a timeline to 1889."
        requestBody:
          payload:
            name: "Tesla Mission 1889"
            destination_time: "1889-03-10T23:50:00Z"
        outputs:
          timelineId: $response.body#/id
      - stepId: "jumpTo1889"
        operationId: "warpApi.timeTravel"
        description: "Travel to 1889."
        requestBody:
          payload:
            destination: $steps.create1889Timeline.outputs.timelineId
      - stepId: "registerBlueprint"
        operationId: "warpApi.registerItem"
        description: "Register Tesla's blueprint."
        requestBody:
          payload:
            description: "Tesla's lost blueprint"
        outputs:
          itemId: $response.body#/id
      - stepId: "returnTo2025"
        operationId: "warpApi.timeTravel"
        description: "Return to 2025 with the blueprint."
        requestBody:
          payload:
            destination: $steps.setHomeAnchor.outputs.anchorId
            items_transported:
              - $steps.registerBlueprint.outputs.itemId
```

## Tips for linting workflows

- Check references early: Lint before Respect to avoid runtime 404s from bad `operationIds`.
- Match the OpenAPI description: Ensure API operations (e.g., `setAnchor`) exist in the OpenAPI file.
- Fix dependencies: Double-check `$steps` references.
- Iterate fast: Lint after every edit; it's quicker than running Respect.
- Mock first: If sourceDescriptions URLs are live, test with mocks to avoid network flakiness.
