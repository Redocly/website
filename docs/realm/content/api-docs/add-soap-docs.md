---
keywords:
  excludes:
    - package.json
---

# Add SOAP documentation from a WSDL file

Transform your WSDL files into reference documentation by integrating them into your project.
Give your users the tools they need to make the most of your SOAP APIs with comprehensive reference documentation.
Either add individual schema files to your project alongside your other content, or use a [classic catalog](../../config/catalog-classic.md) to showcase your SOAP APIs alongside OpenAPI and AsyncAPI APIs.

## About the SOAP API plugin

The SOAP API documentation plugin (`@redocly/portal-plugin-soap-api`) uses a <a href="https://github.com/vpulim/node-soap" target="_blank">SOAP library</a> to generate documentation from your WSDL files.
When you add this plugin to your project, it automatically detects WSDL specification files and includes them as SOAP documentation pages.
To be recognized, the specification files must have a `.wsdl` extension.

## Before you begin

Make sure you have the following:

- a `redocly.yaml` file in the root of your project
- a `package.json` file in the root of your project
- the Redocly package for the product you use (such as `@redocly/realm`) listed as a dependency in the `package.json` file

{% admonition type="warning" name="Local dependencies required" %}
Redocly projects can be previewed locally without installing dependencies, but to add the SOAP plugin, you must have both Realm and the SOAP plugin installed as local dependencies.

If you see the error `Theme "@redocly/portal-plugin-soap-api" not found`, then check that you have the `@redocly/realm` package listed in your `package.json` file.
{% /admonition %}

## Install the Redocly SOAP API plugin

To generate reference documentation for WSDL files, you must have the Redocly SOAP API plugin installed in your project.
If you are working locally, you must install the plugin using a package manager.
If you are working in Reunite, you must add the plugin as a dependency in your `package.json` file.

### Install in Reunite

When you work in Reunite, you do not need to have a `package.json` file to build your project.
However, if you need to install a plugin that is not included in the standard project, you do need a `package.json` file.
If you are working in Reunite, to generate SOAP reference documentation from a WSDL file, you must add a `package.json` file with the Redocly SOAP API plugin listed as a dependency.

Use the following example `package.json` file that includes the Redocly SOAP API plugin as a dependency, updating `*` with the [latest version](https://www.npmjs.com/package/@redocly/portal-plugin-soap-api):

```json {% title="package.json" %}
{
  "name": "demo project",
  "version": "1.0.0",
  "private": true,
  "description": "demo",
  "dependencies": {
    "@redocly/portal-plugin-soap-api": "*"
  }
}
```

### Install using a package manager

Redocly projects can be previewed locally without installing dependencies, but to add the Redocly SOAP plugin, you must have both Realm and the SOAP plugin installed as local dependencies.

To install the Redocly SOAP plugin, use one of the following commands, depending on the package manager you are using:

{% tabs %}

{% tab label="npm" %}
```sh {% title="npm" %}
npm install @redocly/portal-plugin-soap-api
```
{% /tab %}

{% tab label="yarn" %}

```sh {% title="yarn" %}
yarn add @redocly/portal-plugin-soap-api
```

{% /tab %}

{% tab label="pnpm" %}

```sh {% title="pnpm" %}
pnpm add @redocly/portal-plugin-soap-api
```

{% /tab %}
{% /tabs %}

### Enable the plugin in redocly.yaml

After you have installed the plugin in your project, you must also enable it in your `redocly.yaml` file by adding it to the `plugins` object.

To enable the Redocly SOAP API plugin in your project, add the following configuration to your `redocly.yaml` file at the root of your project:

```yaml {% title="redocly.yaml" %}
plugins:
  - '@redocly/portal-plugin-soap-api/plugin.js'
```

## Add the WSDL file to your project

If you only have one or two WSDL files, and you do not have a `sidebars.yaml` file in your project, to add SOAP API documentation to your project, place the WSDL files in your project, either at the root or in a folder.
Afterward, the SOAP reference documentation is automatically added to your sidebar when you run your project.

If you have a `sidebars.yaml` file in your project, you must add your WSDL file to your `sidebars.yaml` file for it to be included in your sidebar navigation menu.

## Use the sidebars.yaml file

If you have a `sidebars.yaml` file in your project, you must add any files, including WSDL files, you want displayed in your sidebar to it.
For more information on configuring a `sidebars.yaml` file for your project, see [Sidebar configuration](../../navigation/sidebars.md).

To add a WSDL file to your project with a `sidebars.yaml` file, add the `page` and `label` keys with the corresponding values for the WSDL file to your `sidebars.yaml` file, as in the following example:

```yaml {% title="sidebars.yaml" %}
- page: apis/sample-api.wsdl
  label: Sample API
```

If you have multiple API descriptions, you can group them to better organize your sidebar navigation menu.

### Use the `group` key for multiple descriptions

If you have multiple WSDL files, you can use a `group` key for each so that the different endpoints are only revealed when selected.

To add multiple WSDL files using `group` keys, update your `sidebars.yaml` file as in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Sample product 1 API
  items:
    - page: apis/sample-api-1.wsdl
      label: Sample product 1 API
- group: Sample product 2 API
  items:
    - page: apis/sample-product-2.wsdl
      label: Sample product 2 API
```

## Resources

- **[API catalog configuration](../../config/catalog-classic.md)** - Organize multiple API descriptions including SOAP services with catalogs for better user experience and navigation
- **[Sidebar navigation setup](../../navigation/sidebars.md)** - Configure navigation structures to help users discover and access your SOAP API documentation content
- **[Replay API explorer](./replay.md)** - Add interactive API testing capabilities to your SOAP API reference documentation
