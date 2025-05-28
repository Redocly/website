# Theming options for API docs

{% admonition type="warning" name="Note" %}
Redoc doesn't load any fonts by default, so you have to take care of it yourself.
{% /admonition %}

To customize the style of your API documentation, specify the theming options in the `theme.openapi.theme` object. This applies regardless of your preferred docs deployment method.
If you're using our Workflows (cloud hosted service) or our CLI for on-premise deployments, we recommend specifying the theming options in [the Redocly configuration file](/docs/cli/configuration).

Expand the `theme` schema below to show all available theming options. Options supported in Redoc Community Edition (the free and open source version of the product) are marked to distinguish them from options supported only in the premium version of the product.

## `theme.openapi.theme` schema

{% json-schema
  schema={
    "$ref": "./reference-docs-theming-schema.yaml"
  }
/%}

## Example theme

A simple example that you can add to your `redocly.yaml`, and customize with your own colours and styles.

```yaml
theme:
  openapi:
    theme:
      sidebar:
        backgroundColor: 'ivory'
      rightPanel:
        textColor: 'ivory'
        backgroundColor: '#001036'
      typography:
        links:
          color: '#0090cc'
```
