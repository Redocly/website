# Multi-product

Multi-product allows you to offer multiple sets of documentation in one project.
By selecting a product, users can switch between documentation sets.
Each documentation set can have its own `redocly.yaml` file, providing the ability to customize the documentation set's configuration, overriding the following options from the root `redocly.yaml` file:

- breadcrumbs
- codeSnippet
- feedback
- footer
- logo
- navbar
- sidebar
- search

This feature helps authors maintain their own documentation set separate from other documentation sets in the same project.
Using this feature helps users to find the content they need by separating it into easily identifiable sections.

## Product picker

After you configure multi-product in the root `redocly.yaml` file, a product picker drop-down menu is added to the far left side of the navbar navigation menu.
The product picker drop-down menu includes a list of products configured in the `redocly.yaml` file.
Each product or documentation set can be assigned a logo or icon that also displays in the product picker drop-down menu next to the label.

## Multi-product contrasted with versions

Multi-product is not the same as versioned content.
Versioned content offers users access to multiple documentation sets based on sequential versions of products.
When configured, versioned content provides users a version drop-down menu in the sidebar, so they can view the version of documentation they need based on the product version they are using.

Multi-product offers users access to multiple documentation sets based on different products.
When configured, multi-product provides a product picker drop-down menu in the navbar navigation menu that updates the sidebar navigation menu based on a product or documentation set.
Each product or documentation set can contain a `redocly.yaml` file with specific configurations for that documentation set.
You can also have different versions of content within different multi-product documentation sets.

## Search in multi-product

When users search from a project's home page, all content in the project is included in the search, even when multi-product is configured.
However, when users search from a page in a multi-product documentation set, the only content that is included in the search is content from that documentation set.
This behavior narrows the context of a user's search to a single documentation set.
In the search modal, a tag with the name of the product appears on the left side of the search field.
Users can remove product filtering of the search by clicking the **x** on the product tag.

## Resources

- Follow step-by-step instructions for [adding multiple products](./multiple-products.md).
- Learn how to set up versioned content in your project in the [Add versioned content](../content/versions.md) how-to documentation.
- View the [Version configuration options](../content/versions-config.md) reference documentation to find the option in a `versions.yaml` file that sets the default version to display.
- Find the correct format and options to use when configuring the [`products` configuration option](../config/products.md) in the `redocly.yaml` configuration reference documentation.
