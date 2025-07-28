# Add AsyncAPI documents using official AsyncAPI renderer

{% admonition type="warning" name="Deprecated plugin" %}
The Redocly AsyncAPI plugin is deprecated.

AsyncAPI documentation is supported natively in Realm and requires no configuration.
For information on how to add AsyncAPI description files to your project, see: [Add AsyncAPI descriptions](./add-asyncapi-docs.md).
To migrate to native support for AsyncAPI documentation, see: [Migrate to built-in AsyncAPI docs](#migrate-to-built-in-asyncapi-docs).
{% /admonition %}

Transform your AsyncAPI document files into reference documentation by integrating them into your project.
Give your users the tools they need to make the most of your Event-Driven APIs (EDAs) with comprehensive reference documentation.
Add individual document files to your project alongside your other content, or use a [classic version of the catalog](./add-classic-catalog.md) to showcase your EDAs alongside OpenAPI and AsyncAPI APIs.

## About the AsyncAPI plugin

The AsyncAPI documentation plugin (`@redocly/portal-plugin-async-api`) uses an official <a href="https://github.com/asyncapi/asyncapi-react" target="_blank">React component</a> to generate documentation for AsyncAPI 2.x and 3.x descriptions.
When added to your project, this plugin automatically detects AsyncAPI specifications and includes them in the project as pages.
To be detected, the specification files must have `.yaml` or `.json` extensions.

The generated documentation page includes multiple sections: info, servers, operations, messages, and schemas. Each section can be hidden using configuration options.

## Before you begin

Make sure you have the following:

- a `redocly.yaml` file in the root of your project
- a `package.json` file in the root of your project
- the Redocly package for the product you use (such as `@redocly/realm`) listed as a dependency in the `package.json` file

{% admonition type="warning" name="Local dependencies required" %}
Redocly projects can be previewed locally without installing dependencies, but to add the Redocly AsyncAPI plugin, you must have both Realm and the Redocly AsyncAPI plugin installed as local dependencies.

If you see the error `Theme "@redocly/portal-plugin-async-api" not found`, check that you have the `@redocly/realm` package listed in `package.json`.
{% /admonition %}

## Install the Redocly AsyncAPI plugin

To generate reference documentation for AsyncAPI document files, install the Redocly AsyncAPI plugin in your project.
If you are working locally, install the plugin using a package manager.
If you are working in Reunite, add the plugin as a dependency to your `package.json` file.

### Install in Reunite

To generate Event-Driven API reference documentation from an AsyncAPI document file, add a `package.json` file with the Redocly AsyncAPI plugin listed as a dependency.

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

Redocly projects can be previewed locally without installing dependencies, but to add the Redocly AsyncAPI plugin, install both the Realm and the Redocly AsyncAPI plugin as local dependencies.

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

After you install the plugin in your project, enable it in your `redocly.yaml` file by adding it to the `plugins` object.

To enable the Redocly AsyncAPI plugin in your project, add the following configuration to your `redocly.yaml` file at the root of your project:

```yaml {% title="redocly.yaml" %}
plugins:
  - '@redocly/portal-plugin-async-api/plugin.js'
```

## Add the AsyncAPI document file to your project

If you have one or two AsyncAPI document files and no `sidebars.yaml` file in your project, place the files in your project at the root or in a folder to add Event-Driven API (EDA) documentation to your project.
The EDA reference documentation is automatically added to your sidebar when you run your project.

If you do not have one yet, use one of the example files from [AsyncAPI github repository](https://github.com/asyncapi/spec/tree/master/examples).

If you have a `sidebars.yaml` file in your project, adding your AsyncAPI document file to your project does not add it to your sidebar automatically.
Add your AsyncAPI document file to your `sidebars.yaml` file.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, add any files you want displayed in your sidebar to it, including AsyncAPI document files.
For more information on configuring a `sidebars.yaml` file for your project, see [Configure navigation on the sidebar](../../navigation/sidebar.md).

To add an AsyncAPI document file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the AsyncAPI document file to your `sidebars.yaml` file:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.yaml
  label: Sample API
```

If you have multiple API documents, group them to better organize your sidebar navigation.

### Use the `group` key for multiple descriptions

If you have multiple AsyncAPI document files, use a `group` key for each so that the different endpoints are only revealed when selected.

To add multiple AsyncAPI document files using `group` keys, update your `sidebars.yaml` file:

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

## Migrate to built-in AsyncAPI docs

Realm supports AsyncAPI documents without further configuration.
If you are using the official AsyncAPI renderer (AsyncAPI plugin), Redocly recommends migrating to the built-in docs tool.

To migrate to built-in AsyncAPI docs:

- In the `redocly.yaml` file at the root of your project, delete the following line:

    ```yaml {% title="redocly.yaml" %}
    plugins:
      - '@redocly/portal-plugin-async-api/plugin.js'
    ```
Your AsyncAPI documentation is rendered using the built-in tool.

## Resources

- Organize multiple API descriptions by [adding a catalog](./add-classic-catalog.md).
- Help users find your content by [configuring navigation in the sidebar](../../navigation/sidebar.md).
- Learn how to [add OpenAPI reference docs](./add-openapi-docs.md).
- See the [Replay the API explorer](./replay.md) concept doc to learn more about making your API reference docs interactive.
- Check out the [AsyncAPI config reference](../../config/asyncapi.md) page to see the different options you can configure.
