# Manage APIs

APIs in Replay are OpenAPI YAML files included in your project.
Use this page to add, update, and remove API descriptions.

## Add an API

- Open the `APIs` tab.
- Click `Import OpenAPI file` and choose a `.yaml` or `.yml` file.
- The API appears in the list under `APIs`.

{% admonition type="info" name="Add from disk" %}
You can also copy an OpenAPI file into the project folder using your file system.
Right‑click anywhere in Replay and select `Reload` to pick up new files.
{% /admonition %}

## Update an API

- Edit the OpenAPI file on disk in your editor.
- Return to Replay, right‑click, and select `Reload` to refresh.
- Changes appear in requests, connected operations, and workflows.

## Remove an API

- Open the `APIs` tab.
- Hover over the API and choose `Delete`.
- Confirm the deletion.

Deleting an API removes it from Replay and deletes the OpenAPI file from your project folder.
This action is permanent; confirm before proceeding.

## Source descriptions from collections

The `APIs` tab also lists source descriptions referenced by your collections (Arazzo files), including those added by URL in a collection’s `sourceDescriptions`.
These entries appear alongside imported OpenAPI files so you can browse their operations.

{% admonition type="info" name="By-URL sources" %}
Source descriptions added by URL are displayed in the APIs list/tree for discovery and request building.
Manage the URL in the collection file; removing it from the collection removes it from this list.
{% /admonition %}

## Connect operations to steps

- Open a step in your collection.
- Click `Step settings` → `Connect operation`.
- Select an operation from the imported API, then click `Connect`.

After connecting, Replay populates method, path, parameters, and security based on the OpenAPI description.
Use `Reset` on the request panel to restore values from the connected operation.

## Browse and open operations

- In the `APIs` tab, expand an API to view its operation tree.
- Click any operation to open a new connected step for that operation in the main panel.
- Configure parameters if needed, then click **Save as** to save the step into a collection.

You can reuse the created step in workflows or run it as a standalone request.

## Resources

- **[Replay overview](./index.md)** - Learn the concepts and UI of Replay including requests, history, and generated files
- **[Manage collections and workflows](./collections/index.md)** - Create steps and connect them to OpenAPI operations within your workflows
- **[OpenAPI](https://www.openapis.org/)** - Provide accurate API descriptions for reliable request building
