---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
keywords:
  excludes:
    - package.json
---

# Add AsyncAPI descriptions

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Transform your AsyncAPI description YAML or JSON file into interactive documentation by adding it to your project.
Add one or multiple Event-Driven API (EDA) descriptions to your project.

Add individual description files to your project alongside your other content, or use an [API catalog](../../config/catalog-classic.md) to showcase your EDAs alongside REST APIs and GraphQL.

Each AsyncAPI description is served at its own URL with its own automatically generated reference sidebar, whether or not you use a `sidebars.yaml` file.
Use a `sidebars.yaml` file only when you want to place the reference alongside your other content with control over its order and grouping.

## Protocol support

Realm supports Apache Kafka protocol bindings and renders labels for RabbitMQ's Advanced Message Queuing Protocol (AMQP).
When Realm detects an AsyncAPI file containing Kafka bindings, it generates project pages with components specific to that protocol.

Your description file can contain bindings from other protocols.
In that case, the pages in your project may display some information as JSON code snippets instead of tables or forms.

## Before you begin

Make sure you have the following:

- AsyncAPI description files in YAML or JSON format (3.0.0 version of AsyncAPI is supported)

## Add an AsyncAPI description to your project

To add an AsyncAPI description to your project, place the file or files in your project at the root or in a folder.
When you run your project, each description is served as reference documentation with its own automatically generated sidebar.

{% admonition type="info" name="The file path sets the reference URL" %}
The API reference's URL path matches the location of its AsyncAPI description file in your project, with the file extension removed.
For example, `apis/asyncapi.yaml` is served at `/apis/asyncapi`.

To change the URL, rename or move the AsyncAPI description file to the path you want it served from.
For more information, see [file-based routing](../project-structure.md#file-based-routing).
{% /admonition %}

You can place the reference inside a custom sidebar alongside your other content, with control over its order and grouping.
To do that, add your AsyncAPI description to a `sidebars.yaml` file.
You can also link to the reference from anywhere, such as the [navbar](../../config/navbar/index.md), an in-page link, a card, or an [API catalog](../../config/catalog-classic.md).

## Add API reference to your site navigation

A `sidebars.yaml` file includes only the items you add to it, so add any files you want displayed in that sidebar, including AsyncAPI descriptions.
For more information on configuring a `sidebars.yaml` file for your project, see [Sidebar configuration](../../navigation/sidebars.md).

You can add an AsyncAPI file to your project with a `sidebars.yaml` file.
Add the `page` and `label` keys with the corresponding values for the AsyncAPI description to your `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

### Use the `group` key for multiple descriptions

If you have multiple AsyncAPI descriptions, use a `group` key for each description so that the different endpoints are only revealed when selected.

To add multiple AsyncAPI descriptions using `group` keys, update your `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- group: Sample product 1 API
  items:
    - page: apis/sample-api-1.yaml
      label: Sample product 1 API
- group: Sample product 2 API
  items:
    - page: apis/sample-product-2.yaml
      label: Sample product 2 API
```

## Migrate from the deprecated AsyncAPI docs plugin

Realm supports AsyncAPI documents without further configuration.
If you are using the deprecated AsyncAPI plugin, Redocly recommends migrating to the built-in docs tool.

To migrate to built-in AsyncAPI docs:

1. In the `redocly.yaml` file at the root of your project, delete the following lines:

    ```yaml {% title="redocly.yaml" %}
    plugins:
      - '@redocly/portal-plugin-async-api/plugin.js'
    ```
2. Remove the `@redocly/portal-plugin-async-api` dependency from your `package.json` file:

    ```json {% title="package.json" %}
    {
      "name": "demo project",
      "version": "1.0.0",
      "description": "demo",
      "dependencies": {
        "@redocly/portal-plugin-async-api": "*" // [!code --]
      }
    }
    ```

Your AsyncAPI documentation is rendered using the built-in tool.

## Resources

- **[API catalog configuration](../../config/catalog-classic.md)** - Organize multiple API descriptions including AsyncAPI specifications with catalogs for better user experience and navigation
- **[Sidebar navigation setup](../../navigation/sidebars.md)** - Configure navigation structures to help users discover and access your AsyncAPI documentation content
- **[AsyncAPI extensions](./asyncapi-extensions/index.md)** - Use custom extensions in your AsyncAPI descriptions to create richer, more detailed documentation with enhanced features
- **[Navbar configuration](../../config/navbar/index.md)** - Add top-level links to your API references and other pages
