# Manage a workflow

Workflows are ordered sequences of steps within a collection.
Use them to orchestrate multi‑step API flows and pass data between steps.

## Add a workflow

- In the `Collections` tab, hover over a collection.
- Click `+` to add a workflow.
- Enter a workflow name and save.

## Rename or delete a workflow

- Hover over the workflow name.
- To rename: choose `Rename`, edit the name, and save.
- To delete: choose `Delete` and confirm.

## Configure a workflow

Use tabs to define request data and workflow behavior.
For field‑by‑field guidance, see **[Manage a step → Configure parameters](./step.md#configure-parameters)**.

- **Security**: Choose an auth type and add credentials.
  Auth types include: No Auth, Basic Auth, Digest Auth, JWT, API key, OAuth 2.0, OpenID Connect.
- **Path**: Provide values for path parameters (for example, `{id}`).
- **Query**: Add query string parameters and values.
- **Headers**: Add request headers.
- **Cookies**: Add cookies.

### Parameters, inputs, and outputs

- Define shared parameters at the workflow level (for example, common path parameters).
- Provide runtime values as environment inputs and reference them as `$inputs.name`.
- Extract values in a step as outputs and reuse them in later steps via `$steps.step-id.outputs.name`.

{% admonition type="info" name="Resolution" %}
Values resolve at send/run time from, in order: step overrides → workflow parameters → environment inputs.
Some references (like `$steps.*.outputs.*`) resolve only during a workflow run.
{% /admonition %}

### Workflow settings

Configure workflow‑level metadata and schema.

- **Info**
  - Workflow ID: Machine‑friendly identifier.
  - Workflow name (Summary): Display name for the workflow.
  - Description: Optional long description.
- **Outputs**
  - Define outputs at the workflow level by adding a name and value.
  - Values can reference response fields (for example, `$response.body#/path`) from steps.
- **Workflow input schema**
  - Define inputs required to run the workflow.
  - Use the Visual builder or switch to JSON/YAML.
  - Add properties, set types and optional formats; use Recalculate when needed.
  - Inputs can be referenced in steps as `$inputs.name`.

## Run a workflow

- See **[Run a workflow](./run-workflow.md)** for the run UI, results, severity settings, and reruns.

## Resources

- **[Manage a collection](./collection.md)** - Where workflows live and how sources are defined
- **[Manage steps](./step.md)** - Add steps, connect operations, configure parameters, and outputs
- **[Manage environments](../environments.md)** - Inputs and servers used during runs
- **[Replay overview](../index.md)** - Concepts and navigation


