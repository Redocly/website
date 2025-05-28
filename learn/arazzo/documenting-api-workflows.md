# Documenting API Workflows

The Warp API lets you hop through time, but without a solid guide, even the sharpest time traveler can get lost in 1889—or worse, unravel the timeline. Traditional API docs, like a raw OpenAPI file, list endpoints like `timeTravel` and `setAnchor`, but they don't tell you *how* to use them together. That's where Arazzo shines. It turns Warp's complex flows into clear, step-by-step documentation that's both human-friendly and machine-readable. Let's see how to document a time-travel workflow with Arazzo, using the Warp API to retrieve Tesla's blueprint as our mission.

## Why Arazzo beats traditional docs

OpenAPI specs are great for detailing *what* each endpoint does—parameters, responses, paths—but they leave the *how* up to you. For Warp, a newbie might see `createTimeline` and `timeTravel` and wonder: "Do I create first? What's a temporal anchor?" Arazzo solves this by mapping the sequence, dependencies, and intent in one place. It's like handing your team a time-travel manual instead of a parts list—faster onboarding, fewer paradoxes.

With Arazzo, you get:
- **Clarity**: Summaries and descriptions explain the big picture and each step.
- **Context**: Dependencies show what relies on what (e.g., travel needs a timeline).
- **Automation**: Tools can render it as interactive docs or test scripts.

## How to Document with Arazzo

Good documentation starts with the fields you already know, tuned for readability:
- **`summary`** (workflow-level): A one-liner of the mission.
- **`description`** (workflow or step): Extra context for humans.
- **`steps`**: The sequence, with clear `stepId`s and tied to Warp operations.

Here's a documented Warp workflow:

```yaml
arazzo: "1.0.1"
info:
  title: "Tesla Blueprint Retrieval Guide"
  version: "1.0.0"
sourceDescriptions:
  - name: "warpApi"
    url: "https://api.warp.example.com/v1/openapi.yaml"
    type: openapi
workflows:
  - workflowId: "retrieveTeslaBlueprint"
    summary: "Travel to 1889 to retrieve Tesla's lost blueprint and return safely"
    description: |-
      This workflow guides you through setting a temporal anchor in the present, creating a timeline to March 10, 1889, traveling back to retrieve Nikola Tesla's lost blueprint, and returning home. Follow these steps to avoid paradoxes and cosmic vaporization.
    steps:
      - stepId: "setHomeAnchor"
        operationId: "warpApi.setAnchor"
        description: "Set an anchor in 2025 to return to after the mission."
        requestBody:
          payload:
            timestamp: "2025-02-19T12:00:00Z"
            description: "Mission start point - 2025 base"
        outputs:
          anchorId: $response.body#/id
      - stepId: "create1889Timeline"
        operationId: "warpApi.createTimeline"
        description: "Create a timeline targeting March 10, 1889, before the fire destroys Tesla's lab."
        requestBody:
          payload:
            name: "Tesla Mission 1889"
            destination_time: "1889-03-10T23:50:00Z"
        outputs:
          timelineId: $response.body#/id
      - stepId: "jumpTo1889"
        operationId: "warpApi.timeTravel"
        description: "Travel to 1889 using the created timeline."
        requestBody:
          payload:
            destination: $steps.create1889Timeline.outputs.timelineId
      - stepId: "registerBlueprint"
        operationId: "warpApi.registerItem"
        description: "Register Tesla's blueprint as an item for transport back to 2025."
        requestBody:
          payload:
            description: "Tesla's lost blueprint - oscillating current design"
        outputs:
          itemId: $response.body#/id
      - stepId: "returnTo2025"
        operationId: "warpApi.timeTravel"
        description: "Return to the 2025 anchor, bringing the blueprint."
        requestBody:
          payload:
            destination: $steps.setHomeAnchor.outputs.anchorId
            items_transported:
              - $steps.registerBlueprint.outputs.itemId

## Breaking It Down

1. **Workflow Summary**: "Travel to 1889 to retrieve Tesla's lost blueprint and return safely" sets the mission.
2. **Description**: The multiline intro explains the goal and stakes—perfect for onboarding.
3. **Steps**: Each has a description that's concise yet vivid (for example, "before the fire destroys Tesla's lab" adds urgency).
4. **Flow**: Runtime expressions (`$steps.create1889Timeline.outputs.timelineId`) show the data handoff between steps.
