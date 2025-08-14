# Add GraphQL API descriptions

Transform your GraphQL schema files into reference documentation by integrating them into your project.
The resulting documentation shows both the high-level elements such as queries and mutations, and the details of all the individual data types.

Give your users the tools they need to make the most of your GraphQL APIs with comprehensive reference documentation.
Either add individual schema files to your project alongside your other content, or use a [classic catalog](../../config/catalog-classic.md) to showcase your GraphQL APIs alongside OpenAPI and AsyncAPI APIs.

If you are using a `sidebars.yaml` file to organize your sidebar navigation menu, you must add your GraphQL API descriptions to it for them to display on your sidebar navigation menu.

## Before you begin

Make sure you have the following before you begin:
  
- GraphQL schema file or files using the SDL format (`.graphql` or `.gql`)

## Include GraphQL schema in your project

If you only have one or two GraphQL schema files, and you do not have a `sidebars.yaml` file in your project, to add a GraphQL schema to your project, place the file or files in your project either at the root or in a folder.
Afterward, the GraphQL reference documentation is automatically added to your sidebar when you run your project.
For example, add a GraphQL schema file as `apis/sample-schema.graphql`, and then check the path `/apis/sample-schema/` in your project to see the documentation.

If you have a `sidebars.yaml` file in your project, you must add your GraphQL schema to your `sidebars.yaml` file for it to be included in your sidebar navigation menu.

## Add schema to sidebar

If you have a `sidebars.yaml` file in your project, you must add any files, including GraphQL schema files, you want displayed in your sidebar to it.
For more information on configuring a `sidebars.yaml` file for your project, see [Sidebar configuration](../../navigation/sidebars.md).

To add a GraphQL schema file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the GraphQL schema file to your `sidebars.yaml` file, as in the following example:


```yaml {% title="sidebars.yaml" %}
- page: sample-schema.graphql
  label: Sample Schema
```

If you have multiple API descriptions, you can group them to better organize your sidebar navigation menu.

### Use the `group` key for multiple schemas

If you have multiple GraphQL schemas, you may want to use a `group` key for each description so that the different endpoints are only revealed when selected.

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
