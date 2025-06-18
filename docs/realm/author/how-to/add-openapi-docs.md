# Add OpenAPI descriptions

Transform your OpenAPI description YAML or JSON file into interactive documentation by adding it to your project. You can add one or multiple OpenAPI descriptions to your project.

Either add individual description files to your project alongside your other content, or use a [classic version of the catalog](./add-classic-catalog.md) to showcase your REST APIs alongside GraphQL and AsyncAPI APIs.

If you are using a `sidebars.yaml` file to organize your sidebar navigation menu, you must add your OpenAPI descriptions to it for them to display on your sidebar navigation menu.

## Before you begin

Make sure you have the following before you begin:

- an OpenAPI description file or files in YAML or JSON format (all versions of OpenAPI are supported)

## Include OpenAPI files in your project

If you only have one or two OpenAPI description files, and you do not have a `sidebars.yaml` file in your project, to add an OpenAPI description to your project, place the file or files in your project either at the root or in a folder.
Afterward, the OpenAPI reference documentation is automatically added to your sidebar when you run your project.

If you have a `sidebars.yaml` file in your project, you must add your OpenAPI description to your `sidebars.yaml` file for it to be included in your sidebar navigation menu.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, you must add any files, including OpenAPI descriptions, you want displayed in your sidebar navigation menu to it.
For more information on configuring a `sidebars.yaml` file for your project, see [Configure navigation on the sidebar](./configure-nav/sidebar.md).

To add an OpenAPI file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the OpenAPI description to your `sidebars.yaml` file, as in the following example:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

If you have multiple API descriptions, you can group them to better organize your sidebar navigation menu.

### Use the `group` key for multiple descriptions

If you have multiple OpenAPI descriptions, you can use a `group` key for each description so that the different endpoints are only revealed when selected.

To add multiple OpenAPI descriptions using `group` keys, update your `sidebars.yaml` file, as in the following example:

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

## Related how-tos

- Organize multiple API descriptions by [adding a classic catalog](./add-classic-catalog.md).
- Help users find your content by [configuring navigation in the sidebar](./configure-nav/sidebar.md).

## Resources

- See the [Replay the API explorer](../../setup/concepts/replay.md) concept doc to learn more about making your API reference docs interactive.
- Use [OpenAPI extensions](../reference/openapi-extensions/index.md) in your API description to produce richer documentation.
- Check out the [OpenAPI](../../config/openapi/index.md) configuration reference to learn more about the configuration options you can apply to customize your OpenAPI description reference docs.

