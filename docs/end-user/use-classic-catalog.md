# Use a classic catalog

A classic catalog aggregates the APIs in the project and displays them as a set of tiles.
A project can have multiple catalogs, and each catalog has its own page in the project.

If a project contains one or more classic catalogs, you can access them using links in the project's navigation elements, or in the project's pages.
Links to access a project's catalogs depends on the project's configuration.

Each API tile displays the title and the description from the corresponding API description file.
To access documentation for an API, click anywhere on the tile.
Tiles may link to introduction pages, or getting started guides for an API rather than directly to the API description pages.

## Filter APIs in a classic catalog

Your project's classic catalogs may contain a **Filters** pane on the left side of the screen.
You can use the interface elements to find or filter APIs in a catalog.

### Search in a classic catalog

You can filter the APIs by searching for a phrase in the description file's title or description.

To search for APIs in a catalog:

- Start typing in the **Filters** panel's search field.
  
The catalog displays only the APIs that contain your search phrase in the title or the description.

### Filter APIs by tags

The classic catalog uses tags to categorize APIs in your project.
These tags are defined in the project's metadata and API description files' `x-metadata` extension.
In the **Filters** panel, these tags are grouped into categories and displayed as drop-down lists or checkboxes.

To filter APIs using tags:

- Select a tag from one or more categories.

The catalog updates to display APIs with selected tags.

## Resources

- [Interact with API documentation](./interact-with-api.md)
- [Interact with pages](./interact-with-pages.md)
- [Test APIs using Replay](./test-apis.md)
- Explore other ways you can interact with the [user interface](./index.md)