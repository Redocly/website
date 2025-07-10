# Add AsyncAPI documents

Transform your AsyncAPI description files into reference documentation by integrating them into your project.
Give your users the tools they need to make the most of your Event-Driven Architecture (EDA) with comprehensive reference documentation.
Either add individual document files to your project alongside your other content, or use an [API catalog](./add-catalog.md) to showcase your AsyncAPI documentation alongside OpenAPI and GraphQL APIs.

## Before you begin

Make sure you have the following:

- a `redocly.yaml` file at the root of your project
- a `package.json` file at the root of your project
- the Redocly package for the product you use (such as `@redocly/realm`) listed as a dependency in the `package.json` file

{% admonition type="warning" name="Local dependencies required" %}
Redocly projects can be previewed locally without installing dependencies, but to add the Redocly AsyncAPI plugin, you must have both Realm and the Redocly AsyncAPI plugin installed as local dependencies.

If you see the error `Theme "@redocly/portal-plugin-async-api" not found`, check that you have the `@redocly/realm` package listed in `package.json`.
{% /admonition %}

## Protocol support

The AsyncAPI plugin supports Apache Kafka protocol bindings.
When the plugin detects an AsyncAPI file containing Kafka bindings, it generates project pages with components specific to that protocol.

If your description file contains bindings from other protocols, the pages in your project may display some information in the form of a JSON code snippet instead of a table or form.

## Install the Redocly Async API plugin

To generate reference documentation for AsyncAPI document files, you must have the Redocly AsyncAPI plugin installed in your project.
If you are working in Reunite, [add the plugin as a dependency to your `package.json` file](#install-in-reunite).
If you are working locally, [install the plugin using a package manager](#install-using-a-package-manager).

### Install in Reunite

To generate reference documentation from an AsyncAPI document file, add a `package.json` file with the Redocly AsyncAPI plugin listed as a dependency.

Use the following example `package.json` file that includes the Redocly AsyncAPI plugin as a dependency, updating `*` with the [latest version](https://www.npmjs.com/package/@redocly/portal-plugin-async-api):

```json {% title="package.json" %}
{
  "name": "demo project",
  "version": "1.0.0",
  "private": true,
  "description": "demo",
  "dependencies": {
    "@redocly/portal-plugin-async-api": "*"
  }
}
```

### Install using a package manager

Redocly projects can be previewed locally without installing dependencies, but to add the Redocly AsyncAPI plugin, you must have both the Realm and the Redocly AsyncAPI plugin installed as local dependencies.

To install the Redocly AsyncAPI plugin, use one of the following commands, depending on the package manager you are using:

{% tabs %}

{% tab label="npm" %}
```sh {% title="npm" %}
npm install @redocly/portal-plugin-async-api
```
{% /tab %}

{% tab label="yarn" %}

```sh {% title="yarn" %}
yarn add @redocly/portal-plugin-async-api
```

{% /tab %}

{% tab label="pnpm" %}

```sh {% title="pnpm" %}
pnpm add @redocly/portal-plugin-async-api
```

{% /tab %}
{% /tabs %}

### Enable plugin in redocly.yaml

After you have installed the plugin in your project, you must also enable it in your `redocly.yaml` file by adding it to the `plugins` object.

To enable the Redocly AsyncAPI plugin in your project, add the following configuration to your `redocly.yaml` file at the root of your project:

```yaml {% title="redocly.yaml" %}
plugins:
  - '@redocly/portal-plugin-async-api/plugin.js'
```

For a complete plugin settings reference, see [AsyncAPI plugin configuration](../../config/asyncapi.md).

## Add the AsyncAPI description file to your project

If you only have one or two AsyncAPI document files, and you do not have a `sidebars.yaml` file in your project, to add AsyncAPI documentation to your project, place the files in your project, either at the root or in a folder.
Afterwards, the documentation is automatically added to your sidebar when you run your project.

If you do not have a description file yet, you can use one of the example files from [AsyncAPI github repository](https://github.com/asyncapi/spec/tree/master/examples).

If you have a `sidebars.yaml` file in your project, adding your AsyncAPI document file to your project does not add it to your sidebar automatically.
You must add your AsyncAPI document file to your `sidebars.yaml` file.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, you must add any files, including AsyncAPI document files, you want displayed in your sidebar to the file.
For more information on configuring a `sidebars.yaml` file for your project, see [Configure navigation on the sidebar](./configure-nav/sidebar.md).

To add an AsyncAPI document file to your project, add the `page` and `label` keys with the corresponding values for the AsyncAPI document file to your `sidebars.yaml` file, as in the following example:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

If you have multiple API documents, you can group them to better organize your sidebar navigation menu.

### Use the `group` key for multiple descriptions

If you have multiple AsyncAPI document files, you can use a `group` key for each so that the different endpoints are only revealed when selected.

To add multiple AsyncAPI document files using `group` keys, update your `sidebars.yaml` file, as in the following example:

```yaml
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

- For a complete plugin settings reference, see [AsyncAPI plugin configuration](../../config/asyncapi.md).
- Discover [AsyncAPI description examples](https://github.com/asyncapi/spec/tree/master/examples).
- Explore the official [AsyncAPI documentation](https://www.asyncapi.com/docs).
- Reference the page components of [AsyncAPI documentation pages](../reference/asyncapi-docs.md)
- Reference the page components of [Kafka AsyncAPI documentation pages](../reference/kafka-asyncapi-docs.md)
- Organize multiple API descriptions by [Adding a catalog](./add-catalog.md).
