# Manage collections and workflows

Collections store your workflows as Arazzo YAML files in the project folder.
Workflows are ordered sets of steps that call API operations and pass data between steps.

## Arazzo concepts

- **Collection**: The top‑level Arazzo document that contains one or more workflows.
- **Workflows**: Ordered sequences of steps that can share parameters and variables.
- **Steps**: Individual requests that reference an OpenAPI operation or a custom URL.

## Collections

Collections are top‑level Arazzo documents stored as YAML files in your project.
They define `sourceDescriptions` (where operations come from) and include one or more workflows.

- Use collections to group related workflows (for example, onboarding, billing, analytics).
- Sources can be local files or URLs.
- All `sourceDescriptions` also appear in the **APIs** tab for browsing operations.

## Workflows

Workflows are ordered sequences of steps that execute in order and can share parameters and variables.

- Define shared parameters at the workflow level (for example, common path parameters).
- Use inputs for values set at run time and outputs to pass data between steps.

## Steps

Steps represent individual requests.
They can reference an OpenAPI operation (preferred) or use a custom URL.

- When connected to an operation, Replay preloads method, path, parameters, and security.
- For custom URLs, you can still set method, URL, and parameters manually.
- Steps can define outputs to extract values from responses for later steps.

## Arazzo file structure

An Arazzo collection includes sources, workflows, and steps.
This example shows common fields you will see in files created by Replay.

```yaml
version: '1.0.0'
sourceDescriptions:
  - id: museum
    url: https://redocly.com/_spec/demo/openapi/museum-api.yaml
workflows:
  - id: get-event-flow
    name: Get one event
    parameters:
      pathParameters:
        - key: eventId
          value: ''
    steps:
      - id: list-events
        operationId: listSpecialEvents
        outputs:
          - name: eventId
            value: $response.body#/0/eventId
      - id: get-one-event
        operationId: getSpecialEvent
        parameters:
          pathParameters:
            - key: eventId
              value: $steps.list-events.outputs.eventId
```

Replay maintains this structure for you when you add, rename, or delete collections, workflows, and steps from the UI.

## Generated files

Replay writes the collection as an Arazzo YAML file to your project folder.
Open the project menu (top right) and click the folder icon to view files.

## Resources

- **[Replay overview](../index.md)** - Learn core concepts, request panel, history, and generated files
- **[Send requests](../requests.md)** - Build and send requests, view responses, and use history
- **[Manage APIs](../apis.md)** - Import OpenAPI files whose operations you connect to steps
- **[Manage environments](../environments.md)** - Define servers and inputs used across workflows
- **[Manage a collection](./collection.md)** - Create, rename, delete collections and manage sources
- **[Manage a workflow](./workflow.md)** - Add, rename, delete workflows and run them
- **[Manage a step](./step.md)** - Add steps, connect operations, configure parameters, and outputs
- **[Run a workflow](./run-workflow.md)** - Execute workflows, review results, and adjust severity
- **[Arazzo specification](https://www.openapis.org/arazzo-specification)** - Understand the workflow format stored in your collection files


