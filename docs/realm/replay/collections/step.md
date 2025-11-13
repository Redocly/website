# Manage a step

Steps are individual requests in a workflow.
Connect steps to OpenAPI operations (recommended) or use custom URLs.

{% admonition type="info" name="Relationship to requests" %}
All requests in Replay are Arazzo steps.
A simple request is a step without a connected operation; you can connect one later or save as‑is.
{% /admonition %}

## Add a step

- In the `Collections` tab, hover over a workflow.
- Click the `+ file` icon to add a step.
- Enter a step ID (for example, `list-events`) and save.

## Connect an operation

- Select the step to open it.
- Click `Step settings` → `Connect operation`.
- Choose an operation from an imported API and click `Connect`.

Replay preloads method, path, parameters, and security from the operation.
Use **Reset** on the request panel to restore defaults from the operation.

{% admonition type="info" name="Open from APIs" %}
From the **APIs** tab, click an operation to open a new connected step, then use **Save as** to add it to a collection.
{% /admonition %}

## Configure a step

Use tabs to define request data.

- **Security**: Choose an auth type and add credentials (No Auth, Basic, Digest, JWT, API key, OAuth 2.0, OpenID Connect).
- **Path**: Provide values for path parameters (for example, `{id}`).
- **Query**: Add query string parameters and values.
- **Headers**: Add request headers.
- **Cookies**: Add cookies.
- **Body**: Add JSON body content for POST/PUT/PATCH.

### Step settings

Configure step‑level metadata and behavior.

- **Info**
  - Step ID: Machine‑friendly identifier.
  - Description: Optional long description.
- **Operation**
  - Connected operation: The linked OpenAPI operation, if any.
- **Outputs**
  - Extract values from the response by adding a name and value (for example, `$response.body#/path`).
- **Success criteria**
  - Add one or more success criteria to validate the response.
- **Response**
  - View the response body, headers, cookies, and metadata after sending.

## Parameters, inputs, and outputs

- Reference environment inputs: `$inputs.name`.
- Extract values in this step as outputs and reuse them later via `$steps.step-id.outputs.name`.

{% admonition type="info" name="Resolution" %}
Values resolve at send/run time from, in order: step overrides → workflow parameters → environment inputs.
Some references (like `$steps.*.outputs.*`) resolve only during a workflow run.
{% /admonition %}

## Test or remove a step

- Test: click **Send** and review the response panel.
- Remove: hover the step in the workflow, choose `Delete`, and confirm.

If a reference like `$steps.step-id.outputs.name` doesn’t resolve, run the full workflow.

## Resources

- **[Manage a workflow](./workflow.md)** - Configure workflows, run them, and understand parameter resolution
- **[Run a workflow](./run-workflow.md)** - Execute workflows and review results for each step
- **[Manage environments](../environments.md)** - Configure inputs and servers used by steps
- **[Manage APIs](../apis.md)** - Browse and open operations to create connected steps
- **[Replay overview](../index.md)** - Concepts and navigation


