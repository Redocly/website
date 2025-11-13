# Send requests

Use the request panel to build and send HTTP requests.
Start here to try an endpoint quickly, then save it to reuse.

{% admonition type="info" name="How requests work" %}
Every request in Replay is an Arazzo step.
Set up a request in one of two ways:
- Connect to an OpenAPI operation (recommended).
- Enter a custom URL (a simple request — a step without a connected operation).
Use **Save as** to add the request as a step in a collection.
For field‑by‑field details, see **[Manage a step → Configure a step](./collections/step.md#configure-a-step)**.
{% /admonition %}

## Before you begin

- Import at least one OpenAPI file into your project.
- Set a server URL in an environment (or use the mock server when available).

## Build a request

- Choose your setup: connect an operation or enter a custom URL.
- Select the method and URL. Use Edit to view variables and Preview to see the resolved URL.
- Use tabs to add Security, Path, Query, Headers, Cookies, and Body values.
- If connected to an operation, **Reset** restores defaults from the spec.
For complete configuration, see **[Manage a step](./collections/step.md#configure-a-step)**.

## Send a request

- Click **Send**.
- Replay executes the request using the active environment.

## View the response

After sending, the response panel shows:

- Status code, response time, and size
- Response body (JSON, text, HTML, or XML)
- Response headers and cookies

Use the copy icon to copy the response or body where available.

## Save or copy a request

- **Save as**: Save the current request as a step you can reuse in a workflow.
- **Copy URL**: Copy the fully resolved URL from the header.

## Switch environment

- Select a different environment to change servers and inputs.
Replay resolves server variables, path parameters, and inputs from the active environment.

## History

- View recently sent requests with status codes.
- Search or clear history.
- Reopen a past entry to review or send again.

## Troubleshooting

If an output reference like `$steps.step-id.outputs.name` doesn’t resolve, run the full workflow instead of sending a single step.

## Resources

- **[Replay overview](./index.md)** - Understand how requests fit with APIs, environments, and workflows
- **[Manage a step](./collections/step.md)** - Configure steps (requests), connect operations, and define outputs
- **[Manage environments](./environments.md)** - Configure servers and inputs used when sending requests
- **[Manage collections and workflows](./collections/index.md)** - Connect steps to operations and pass data between steps


