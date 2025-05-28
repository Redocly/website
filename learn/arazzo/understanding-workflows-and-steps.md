# Understanding workflows and steps

In Arazzo, workflows and steps are your ticket to orchestrating API magic—or in this case, time travel. With the Warp API, we're not just calling endpoints; we're bending time itself. These core concepts let you define what happens, when, and how, turning a collection of time-travel operations into a seamless mission. Let's unpack how workflows and steps work in Arazzo, using the Warp API to jump back to 1889 and snag Tesla's lost blueprint. Buckle up—things are about to get temporal!

## What's a workflow?

The `workflows` section is the mission control of your Arazzo file. It's where you script sequences of API calls to pull off something big—like retrieving a lost invention from the past. Think of it as your time-travel itinerary: a set of instructions that takes you from the present to 1889 and back again.

In Arazzo, `workflows` is an array, so you can define multiple missions in one file. Each workflow has:
- `workflowId`: A unique name for the mission.
- `summary`: A quick rundown of what you're trying to achieve.
- `description` (optional): Extra details for context.
- `steps`: The time-hopping actions that make it happen.
- `dependsOn` (optional): Run a different workflow before running the given workflow (for example, to get credentials).

Here's a sneak peek:

```yaml
workflows:
  - workflowId: "teslaBlueprintMission"
    summary: "Travel to 1889 to retrieve Tesla's blueprint"
    steps:
      # Time travel steps go here
```
The `workflowId` is your mission's codename, and summary keeps it clear for anyone (or any time traveler) reading along.

## Breaking down steps

Inside a workflow, steps are the individual leaps through time—or API calls—that drive your mission. Each step is a precise instruction, telling Arazzo what to do, how to do it, and what it depends on. A step can include:
- `stepId`: A unique label for this action.
- `operationId`: Ties to a Warp API operation (e.g., timeTravel).
- `operationPath` (alternative): Points to a specific path/method in the OpenAPI file.
- `parameters` (optional): Inputs like timeline IDs or tokens.
- `outputs` (optional): Data you capture for the next jump.
- `requestBody`: The request body to pass to an operation as referenced by operationId or operationPath.

Steps run in sequence by default, with each step using data from previous steps through runtime expressions. Let's see it with the Warp API.

## A time-travel example

Imagine we're using the Warp API to retrieve Tesla's lost blueprint from 1889. Our mission: set an anchor, create a timeline, travel back, register the blueprint, and return. Here's how it looks:

```yaml
arazzo: "1.0.1"
info:
  title: "Tesla Blueprint Retrieval"
  version: "1.0.0"
sourceDescriptions:
  - name: "warpApi"
    url: "https://api.warp.example.com/v1/openapi.yaml"
    type: "openapi"
workflows:
  - workflowId: "teslaBlueprintMission"
    summary: "Travel to 1889 to retrieve Tesla's blueprint"
    steps:
      - stepId: "setHomeAnchor"
        operationId: "warpApi.setAnchor"
        requestBody:
          payload:
            timestamp: "2025-02-19T12:00:00Z"
            description: "Home base for return"
        outputs:
          anchorId: $response.body#/id
        successCriteria:
          - condition: "$statusCode == 201"
      - stepId: "create1889Timeline"
        operationId: "warpApi.createTimeline"
        requestBody:
          payload:
            name: "Tesla Mission 1889"
            destination_time: "1889-03-10T23:50:00Z"
        outputs:
          timelineId: $response.body#/id
        successCriteria:
          - condition: "$statusCode == 201"
      - stepId: "jumpTo1889"
        operationId: "warpApi.timeTravel"
        description: "Travel to 1889 using the created timeline."
        requestBody:
          payload:
            destination: $steps.create1889Timeline.outputs.timelineId
        successCriteria:
          - condition: "$statusCode == 200"
    outputs:
      timelineId: $steps.create1889Timeline.outputs.timelineId
  - workflowId: "registerBlueprint"
    summary: "Register the blueprint in our database"
    dependsOn:
      - "teslaBlueprintMission"
    steps:
      - stepId: "saveBlueprint"
        operationId: "warpApi.registerItem"
        requestBody:
          payload:
            name: "Tesla's Lost Blueprint"
            timeline_id: $workflows.teslaBlueprintMission.outputs.timelineId
        successCriteria:
          - condition: "$statusCode == 200"
```

## What's happening?
1. `Workflow 1`: `teslaBlueprintMission` outlines our time-travel heist.
   - `Step 1`: `setHomeAnchor`
     - Calls `setAnchor` to mark our present time (Feb 19, 2025).
     - Saves the anchorId from the response ($response.body.id).
     - Verifies success with a 201 status code.
   - `Step 2`: `create1889Timeline`
     - Calls `createTimeline` to set up a jump to 1889.
     - Captures the timelineId for the next step.
     - Verifies success with a 201 status code.
   - `Step 3`: `jumpTo1889`
     - Calls `timeTravel` to leap back, using the timelineId from Step 2.
     - Verifies success with a 200 status code.

2. `Workflow 2`: `registerBlueprint`
   - `Step 1`: `saveBlueprint`
     - Calls `registerItem` to save Tesla's Lost Blueprint.
     - Verifies success with a 200 status code.
