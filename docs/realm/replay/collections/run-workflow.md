# Run a workflow

Run all steps in a workflow in order and review detailed results for each step.

## Before you run

- Select the active environment.
- Ensure required inputs have values.
- Verify each step is connected to an operation or has a valid custom URL.

## Start a run

- Open a workflow and click the **Run workflow** button in the header.
- Or run from the tree using the Play button on the workflow.

Replay executes steps sequentially and collects results.

## Run results

The results view shows:

- Total steps, number of successes and failures.
- Date and total duration of the run.
- A list of steps with status, method, step ID, elapsed time, and HTTP status code.

Click a step to expand details, including request and response.

### Step details

- Request: method, URL, headers, body.
- Response: status code, time, size, headers, cookies, and body.
- Outputs: values extracted by the step.
- Success criteria: evaluation results, if configured.

### Severity settings

Use **Severity settings** to control which issues mark the run as failed.
Adjust these rules to fit your use case during development vs. validation.

### Run again

Click **Run again** to re‑execute the workflow with your latest changes.

## Troubleshooting

- 4xx/5xx statuses: verify environment, server variables, and credentials.
- Missing outputs: confirm the JSON pointer (for example, `$response.body#/path`) matches the response.
- Unresolved references: run the full workflow—some values such as `$steps.*.outputs.*` only resolve during runs.

## Resources

- **[Manage a workflow](./workflow.md)** - Configure tabs, inputs, outputs, and settings
- **[Manage a step](./step.md)** - Set parameters, add outputs, and validate responses
- **[Manage environments](../environments.md)** - Choose the active environment and provide inputs
- **[Replay overview](../index.md)** - Concepts and navigation


