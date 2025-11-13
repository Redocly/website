# Manage environments

Use environments to configure server URLs and reusable inputs for requests and workflows.

## Concepts

- **Environment**: A named context (for example, `default`, `staging`, `production`).
- **Server**: A base URL used to resolve an API operation’s path.
- **Inputs**: Named variables (for example, `username`, `password`, `apiKey`) you can reference across steps.

## Create, rename, set active, remove

- **Create**: Click `+ New environment` in the left panel.
- **Rename**: Select an environment and click the pencil icon next to its name.
- **Set as active**: Open the `More actions` menu (… or menu button) on an environment in the list and choose `Set as active`.
- **Remove**: From the same menu, choose `Remove environment` and confirm.

## Add a server

- In the selected environment, click `+ Add server` in the Servers section.
- Choose the API and enter the server URL.
- Save.

## Edit a server

- Click the server card and update the URL.
- Save.

### Server variables

- If the URL contains variables (for example, `{organizationId}`), click `Server variable` on the server card.
- Enter values for the variables and save.

## Remove a server

- In `Environments`, hover over the server and select `Delete`.
- Confirm.

## Add inputs

- In Inputs, type a name in the `New input` row and add a value.
- Toggle `Secret` to hide the value if needed.

Reference inputs in steps using `$inputs.name`.

## Edit or delete inputs

- Edit values inline.
- Delete an input using the delete action on the row.

## Switch the active environment

- Use `Set as active` from the environment’s menu in the left panel.
- Or select the environment from the environment selector in the request/workflow header.

Replay resolves server variables, path parameters, and inputs from the active environment when previewing or running requests.

## Resources

- **[Replay overview](./index.md)** - Understand how environments are used in requests and workflows
- **[Manage APIs](./apis.md)** - Add OpenAPI files and map servers to specific APIs
- **[Manage collections and workflows](./collections/index.md)** - Use inputs and resolved URLs within steps and across workflows
