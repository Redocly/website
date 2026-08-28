---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Add GraphQL API descriptions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Transform your GraphQL schema files into reference documentation by integrating them into your project.
The resulting documentation shows both the high-level elements such as queries and mutations, and the details of all the individual data types.

Give your users the tools they need to make the most of your GraphQL APIs with comprehensive reference documentation.
Either add individual schema files to your project alongside your other content, or use a [classic catalog](../../config/catalog-classic.md).
The catalog showcases your GraphQL APIs alongside OpenAPI and AsyncAPI APIs.

Each GraphQL schema is served at its own URL with its own automatically generated reference sidebar, whether or not you use a `sidebars.yaml` file.
Use a `sidebars.yaml` file only when you want to place the reference alongside your other content with control over its order and grouping.

## Before you begin

Make sure you have the following:

- GraphQL schema files that use the SDL format (`.graphql` or `.gql`)

## Add a GraphQL schema to your project

To add a GraphQL schema to your project, place the file or files in your project either at the root or in a folder.
When you run your project, each schema is served as reference documentation with its own automatically generated sidebar.
The sidebar is built from the queries, mutations, and types in the schema.
For example, add a GraphQL schema file as `apis/sample-schema.graphql`, and then check the path `/apis/sample-schema/` in your project to see the documentation.

{% admonition type="info" name="The file path sets the reference URL" %}
The API reference's URL path matches the location of its GraphQL schema file in your project, with the file extension removed.
For example, `apis/schema.graphql` is served at `/apis/schema`.

To change the URL, rename or move the GraphQL schema file to the path you want it served from.
For more information, see [file-based routing](../project-structure.md#file-based-routing).
{% /admonition %}

You can place the reference inside a custom sidebar alongside your other content, with control over its order and grouping.
To do that, add your GraphQL schema to a `sidebars.yaml` file.
You can also link to the reference from anywhere, such as the [navbar](../../config/navbar.md), an in-page link, a card, or an [API catalog](../../config/catalog-classic.md).

To customize the API overview with title, description, and contact information, see [GraphQL info configuration](../../config/graphql/info.md).

## Add API reference to your site navigation

A `sidebars.yaml` file includes only the items you add to it, so add any files you want displayed in that sidebar, including GraphQL schema files.
For more information on configuring a `sidebars.yaml` file for your project, see [Sidebar configuration](../../navigation/sidebars.md).

You can add a GraphQL schema file to your project with a `sidebars.yaml` file.
Add the `page` and `label` keys with the corresponding values for the GraphQL schema file to your `sidebars.yaml` file, as in the following example:


```yaml {% title="sidebars.yaml" %}
- page: sample-schema.graphql
  label: Sample Schema
```

### Use the `group` key for multiple schemas

If you have multiple GraphQL schemas, you may want to use a `group` key for each description.
This way, the different endpoints are only revealed when selected.

To add multiple GraphQL schemas using `group` keys, update your `sidebars.yaml` file, as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Sample product 1 API
  items:
    - page: sample-api-1.graphql
      label: Sample product 1 API
- group: Sample product 2 API
  items:
    - page: sample-product-2.graphql
      label: Sample product 2 API
```

## Resources

- **[API catalog configuration](../../config/catalog-classic.md)** - Organize multiple API descriptions including GraphQL schemas with catalogs for better user experience and navigation
- **[Sidebar navigation setup](../../navigation/sidebars.md)** - Configure navigation structures to help users discover and access your GraphQL API documentation content
- **[GraphQL configuration reference](../../config/graphql/index.md)** - Complete customization options for GraphQL schema rendering and documentation behavior
- **[Navbar configuration](../../config/navbar.md)** - Add top-level links to your API references and other pages
