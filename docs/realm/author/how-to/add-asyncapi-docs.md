# Add AsyncAPI descriptions

Transform your AsyncAPI description YAML or JSON file into interactive documentation by adding it to your project.
You can add one or multiple Event-Driven API (EDA) descriptions to your project.

Either add individual description files to your project alongside your other content, or use an [API catalog](./add-catalog.md) to showcase your EDAs alongside REST APIs and GraphQL.

If you are using a `sidebars.yaml` file to organize your sidebar navigation menu, you must add your AsyncAPI descriptions to it for them to display on your sidebar navigation menu.

## Protocol support

Realm supports Apache Kafka protocol bindings and renders labels for RabbitMQ's Advanced Message Queuing Protocol (AMQP).
When Realm detects an AsyncAPI file containing Kafka bindings, it generates project pages with components specific to that protocol.

If your description file contains bindings from other protocols, the pages in your project may display some information in the form of a JSON code snippet instead of a table or form.

## Before you begin

Make sure you have the following before you begin:

- an AsyncAPI description file or files in YAML or JSON format (3.0.0 version of AsyncAPI is supported)

## Include AsyncAPI files in your project

If you only have one or two AsyncAPI description files, and you do not have a `sidebars.yaml` file in your project, to add an AsyncAPI description to your project, place the file or files in your project either at the root or in a folder.
Afterward, the AsyncAPI reference documentation is automatically added to your sidebar when you run your project.

If you have a `sidebars.yaml` file in your project, you must add your AsyncAPI description to your `sidebars.yaml` file for it to be included in your sidebar navigation menu.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, you must add any files, including AsyncAPI descriptions, you want displayed in your sidebar navigation menu to it.
For more information on configuring a `sidebars.yaml` file for your project, see [Configure navigation on the sidebar](./configure-nav/sidebar.md).

To add an AsyncAPI file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the AsyncAPI description to your `sidebars.yaml` file, as in the following example:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

If you have multiple API descriptions, you can group them to better organize your sidebar navigation menu.

### Use the `group` key for multiple descriptions

If you have multiple AsyncAPI descriptions, you can use a `group` key for each description so that the different endpoints are only revealed when selected.

To add multiple AsyncAPI descriptions using `group` keys, update your `sidebars.yaml` file, as in the following example:

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

## Resources

- Organize multiple API descriptions by [Adding a catalog](./add-catalog.md).
- Help users find your content by [Configuring navigation in the sidebar](./configure-nav/sidebar.md).
- See the [Replay the API explorer](../../setup/concepts/replay.md) concept doc to learn more about making your API reference docs interactive.
- Use [AsyncAPI extensions](../reference/asyncapi-extensions/index.md) in your API description to produce richer documentation.
