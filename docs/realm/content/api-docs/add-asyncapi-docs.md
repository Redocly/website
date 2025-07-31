# Add AsyncAPI descriptions

Transform your AsyncAPI description YAML or JSON file into interactive documentation by adding it to your project.
Add one or multiple Event-Driven API (EDA) descriptions to your project.

Add individual description files to your project alongside your other content, or use an [API catalog](../../config/catalog-classic.md) to showcase your EDAs alongside REST APIs and GraphQL.

If you use a `sidebars.yaml` file to organize your sidebar navigation, add your AsyncAPI descriptions to it for them to display in your navigation menu.

## Protocol support

Realm supports Apache Kafka protocol bindings and renders labels for RabbitMQ's Advanced Message Queuing Protocol (AMQP).
When Realm detects an AsyncAPI file containing Kafka bindings, it generates project pages with components specific to that protocol.

If your description file contains bindings from other protocols, the pages in your project may display some information as JSON code snippets instead of tables or forms.

## Before you begin

Make sure you have the following:

- AsyncAPI description files in YAML or JSON format (3.0.0 version of AsyncAPI is supported)

## Include AsyncAPI files in your project

If you have one or two AsyncAPI description files and no `sidebars.yaml` file in your project, place the files in your project at the root or in a folder.
The AsyncAPI reference documentation is automatically added to your sidebar when you run your project.

If you have a `sidebars.yaml` file in your project, add your AsyncAPI description to your `sidebars.yaml` file for it to appear in your sidebar navigation.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, add any files you want displayed in your sidebar navigation to it, including AsyncAPI descriptions.
For more information on configuring a `sidebars.yaml` file for your project, see [Configure navigation on the sidebar](../../navigation/sidebar.md).

To add an AsyncAPI file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the AsyncAPI description to your `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

If you have multiple API descriptions, group them to better organize your sidebar navigation.

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

- Organize multiple API descriptions by [configuring a catalog](../../config/catalog-classic.md).
- Help users find your content by [configuring navigation in the sidebar](../../navigation/sidebar.md).
- See the [Replay the API explorer](./replay.md) concept doc to learn more about making your API reference docs interactive.
- Use [AsyncAPI extensions](./asyncapi-extensions/index.md) in your API description to produce richer documentation.
