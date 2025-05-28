# Source descriptions and references

In Arazzo, `sourceDescriptions` is your bridge to the outside world—specifically, to the OpenAPI files (or even other Arazzo files) that define the APIs you're working with. When you're bending time with the Warp API, you don't want to rewrite every endpoint from scratch. Instead, `sourceDescriptions` lets you link to existing definitions and reference them dynamically. Let's explore its role, how to use `$ref` and runtime expressions, and some best practices for keeping multiple sources organized.

## The role of `sourceDescriptions`

The `sourceDescriptions` section is like a directory of API blueprints. It tells Arazzo where to find the OpenAPI specs your workflows depend on—like the Warp API's time-travel endpoints. Each entry in this array connects your steps to the operations they'll call, ensuring your workflows stay lean and reusable.

Here's a basic setup for the Warp API:

```yaml
arazzo: "1.0.1"
info:
  title: "Time Travel Ops"
  version: "1.0.0"
sourceDescriptions:
  - name: "warpApi"
    url: "https://api.warp.example.com/v1/openapi.yaml"
    type: "openapi"
workflows:
  - workflowId: "quickJump"
    summary: "A fast time hop"
    steps:
      - stepId: "travel"
        operationId: "warpApi.timeTravel"
```

## What's happening?

- `name: warpApi` is an alias you'll use to reference this source.
- `url`: Points to the OpenAPI file (e.g., openapi.yaml from Warp).
- `type`: Specifies it's an openapi file (you can also link to other Arazzo files with `arazzo`).

When a step uses `operationId: "warpApi.timeTravel"`, Arazzo knows to look in that OpenAPI file for the `timeTravel` operation. This keeps your Arazzo file focused on how to use the API, not what it is.

## Using `$ref` and runtime expressions

Arazzo takes referencing up a notch with `$ref` and runtime expressions, letting you pull in data dynamically. While `$ref` is more common in OpenAPI for static reuse, Arazzo leans on runtime expressions (like `$response.body.id`) for live data flow. However, `$ref` can still play a role in Arazzo description.

```yaml
sourceDescriptions:
  - name: "warpApi"
    url: "https://api.warp.example.com/v1/openapi.yaml"
    type: openapi
  - name: "commonAnchors"
    url: "./anchors.yaml"
    type: "arazzo"
workflows:
  - workflowId: getTimeAnchor
    inputs:
      $ref: '#/components/inputs/reusable-input'
...
components:
  inputs:
    reusable-input:
      type: object
      properties:
        description:
          type: string
```

Here, `commonAnchors` is another Arazzo file with predefined `anchors`, and `$ref` pulls one into your components for input object reuse.

## Runtime Expressions

More often, you'll use runtime expressions in steps to grab live data.
From our Warp example:

```yaml
steps:
  - stepId: "setAnchor"
    operationId: "warpApi.setAnchor"
    outputs:
      anchorId: $response.body#/id
  - stepId: "jump"
    operationId: "warpApi.timeTravel"
    requestBody:
      payload:
        destination: $steps.setAnchor.outputs.anchorId
```

The `$steps.setAnchor.outputs.anchorId` expression dynamically grabs the anchor ID from the previous step's response.

## Referencing across sources

When a step calls an operation, you can prefix the operationId with the source name (e.g., `warpApi.timeTravel`) if multiple sources are in play. Alternatively, use `operationPath` for precision:

```yaml
- stepId: "jump"
  operationPath: "{$sourceDescriptions.warpApi.url}#/paths/~1travels/post"
```

This points directly to the `/travels POST` endpoint in the Warp API's OpenAPI file.

## Best practices for multiple API sources

Managing several sourceDescriptions—say, Warp's core API plus a monitoring service—can get tricky. Here's how to keep it clean:

1. **Use Descriptive Names**: Pick names like `warpCore` or `timelineMonitor` over generic `api1`. It's clearer when referencing (e.g., `warpCore.timeTravel`).
2. **Centralize Sources**: Host OpenAPI files in a consistent place (e.g., a docs server or Git repo) and use absolute URLs. Local files (`./openapi.yaml`) work for testing but can break in production.
    ```yaml
    sourceDescriptions:
    - name: "warpCore"
      url: "https://api.warp.example.com/v1/openapi.yaml"
      type: openapi
    - name: "warpMonitor"
      url: "https://monitor.warp.example.com/openapi.yaml"
      type: openapi
    ```
3. **Version Control**: Include version info in URLs or filenames (e.g., `openapi-v1.yaml`) to avoid surprises when APIs update.
4. **Avoid Overlap**: If two sources define similar `operationId` (e.g., `timeTravel`), use `operationPath` or unique name prefixes to disambiguate.
5. **Test References**: Validate that every `operationId` or `operationPath` matches an existing operation—tools like Redocly CLI (redocly lint) can help.

## Why it matters

Source descriptions keeps your Arazzo workflows modular and connected to the broader API ecosystem. With Warp, you might link to timeline management, travel ops, and paradox checks—all without duplicating definitions. Throw in $ref for static reuse and runtime expressions for dynamic flow, and you've got a system that's both flexible and powerful.
Next time, we'll dig into success criteria—because even time travelers need to know if their jump landed smoothly!
