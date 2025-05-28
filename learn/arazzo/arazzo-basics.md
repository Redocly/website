# Arazzo basics: Structure and syntax

Ready to get your hands dirty with Arazzo? This guide will walk you through the nuts and bolts of the Arazzo Specification—its structure, its syntax, and how it all fits together. If you've worked with OpenAPI before, you'll feel right at home: Arazzo uses the same YAML or JSON format and builds on OpenAPI's foundation. Let's dive into what makes an Arazzo file tick and get you ready to write your first workflow.

## The big picture

An Arazzo file is a structured document that describes API workflows—sequences of calls with clear steps, dependencies, and outcomes. It's designed to be both human-readable (for you) and machine-readable (for tools). At its core, every Arazzo file has a few key pieces:

- `arazzo`: The version of the spec you're using (e.g., "1.0.1").
- `info`: Metadata like the title and version of your workflow.
- `sourceDescriptions`: Links to OpenAPI or Arazzo files your workflows rely on.
- `workflows`: The heart of Arazzo—where you define the sequences of API calls.
- `components`: Optional reusable bits you can reference elsewhere.

Think of it like a playbook: it tells you (or a tool) how to run the game, step by step. Let's break these down.

## The anatomy of an Arazzo file

Here's what each section does, with a simple example to tie it together.

1. `arazzo` (Required)
This is the version marker. It tells everyone which Arazzo spec you're following. As of February 2025, the latest is 1.0.1 (a patch over the 1.0.0 release from 2024). It's always at the top:
```yaml
arazzo: "1.0.1"
```

2. `info` (Required)
This is your workflow's ID card—basic metadata to keep things organized. It needs a title and version, but you can add a description or summary for clarity:
```yaml
info:
  title: "Simple Workflow"
  version: "1.0.0"
  description: "A basic workflow to buy a ticket and confirm it's valid."
```
3. `sourceDescriptions` (Required)
This section points to the OpenAPI files your workflow uses. It's how Arazzo connects to existing API definitions. Each entry has a name (for reference) and a url (where the file lives) and a type (currently the only valid values are `openapi` or `arazzo`):
```yaml
sourceDescriptions:
  - name: "warpAPI"
    url: "./warp/openapi.yaml"
    type: openapi
```
4. `workflows` (Required)
Here's where the magic happens. The workflows section is an array of workflow objects, each defining a sequence of API calls. Every workflow needs:
- `workflowId`: A unique identifier.
- `summary`: A human-friendly overview.
- `description`: A detailed explanation of the workflow.
- `steps`: The actual sequence of operations.
- `dependsOn`: Which workflow(s) it relies on (optional).

Inside steps, each step has:

- `stepId`: A unique name for the step.
- `operationId`: Links to an OpenAPI operation (from your sourceDescriptions).
- `parameters`: Inputs for the call (static or dynamic).
- `outputs`: What data it produces (optional).

Steps run in sequence by default, with each step using data from previous steps through runtime expressions.

5. `components` (Optional)
This is for reusable pieces—like parameters or steps—you might want to reference across workflows. It's like OpenAPI's components, but for Arazzo-specific stuff. We'll keep it simple and skip this for now.

## A simple example

Let's put it together with a basic workflow for a time travel API: setting an anchor in time. Assume we've got an [OpenAPI file](https://warp-multi-sidebars.redocly.app/_spec/apis/index.yaml?download) with operation `setAnchor`.
```yaml
arazzo: 1.0.1
info:
  title: Warp API
  version: 1.0.0
sourceDescriptions:
  - name: api-reference
    type: openapi
    url: openapi.yaml
workflows:
  - workflowId: missionLostInvention
    summary: Lost invention
    description: |-
      Travel back to the year 1889 and retrieve the blueprint for Nikola Tesla's lost invention before it's destroyed in a mysterious fire.
    inputs:
      type: object
      properties:
        token:
          type: string
          description: JWT Bearer token
          format: password
    parameters:
      - name: Authorization
        in: header
        value: "Bearer {$inputs.token}"
    steps:
      - stepId: setAnchorToCurrentTime
        operationId: api-reference.setAnchor
        description: Set an anchor to the current time.
        outputs:
          anchor_id: $response.body#/id
      - stepId: jumpTo1889
        operationId: api-reference.timeTravel
        description: "Travel to 1889 using the created timeline."
        requestBody:
          payload:
            destination: $steps.setAnchorToCurrentTime.outputs.anchor_id
# to be continued -- see a full walkthrough of this example in the next article
```

## What's happening here?

1. **Top Level**: We declare Arazzo 1.0.1 and give our workflow a title and version.
2. **Source**: We link to Warp's OpenAPI file.
3. **Workflow**: We define one workflow, `missionLostInvention`.
    - **Step 1**: `setAnchorToCurrentTime` calls `setAnchor` to set an anchor point in time.
    - **Step 2**: `jumpTo1889` calls `timeTravel` to travel to 1889 using the created timeline.

The `$` syntax is a runtime expression—think of it as a placeholder that grabs data dynamically when the workflow runs.

## How it ties to OpenAPI

Arazzo doesn't reinvent the wheel—it leans on OpenAPI. The `operationId` in each step (`setAnchor` and `timeTravel`) matches an `operationId` in the linked `api-reference`
