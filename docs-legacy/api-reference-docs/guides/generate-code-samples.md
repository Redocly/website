---
excludeFromSearch: true
seo:
  title: Generate code samples automatically
---

# Generate code samples automatically

Redocly can automatically generate code samples in supported languages based on your API definition. You can control the display of optional properties and parameters, and hide request payload samples.

The [list of supported languages](../resources/code-samples-languages.md) indicates currently supported version(s) for each language.

{% admonition type="warning" %}
Auto-generated code samples are not available in Redoc (the "community edition").
{% /admonition %}

## Prerequisites

**Valid API definition file(s) with `requestBody` objects**

The content of auto-generated code samples is affected by the API definition in the following ways:

- If your API definition has several security schemes defined as alternatives in your _Security Scheme_ object, only the first one is included in auto-generated code samples. If the security schemes are defined as mandatory in every request, they are all included.

- If your API definition lists several servers in the `Server` object (for example, `default`, `development`, `production`...), only the first listed server is included in auto-generated code samples.

{% admonition type="info" name="Note" %}
Custom code samples directly added to the API definition using the `x-codeSamples` specification extension have precedence over auto-generated ones.

For instance, if your API definition already contains a JavaScript sample, and you enable auto-generated JavaScript samples, your docs only show the custom sample from the API definition.
{% /admonition %}

**Redocly Workflows user account and/or access to configuration files for Redocly Developer portal and API docs**

To enable auto-generated code samples, you must specify in which languages to generate them. The configuration procedure depends on the Redocly product you're using.

- If you manage your API definitions and documentation with Workflows, refer to the [Workflows](#workflows-configuration) section.

- If you're using the Redocly configuration file with Workflows or building API documentation on-premise, use the [API docs](#api-docs-configuration) instructions.

- To include auto-generated code samples in your developer portal, refer to the [Developer portal](#developer-portal-configuration) section.

## Configure code samples

### Workflows configuration

1. Log into Workflows and select the API version for which you want to configure auto-generated code samples.
2. From the **Overview** page, navigate to **Settings > Features**.
3. On the **Features** page, expand the **Generate code samples** section.
4. To enable code samples, select the desired language(s) from the list.
5. Select **Save** to apply changes. Saving your changes triggers a new build.

**Change order of languages**

You can change the order of languages by dragging them up or down in the list. This order affects the order of tabs (from left to right) in the **Request samples** section of your docs.

**Custom labels for code sample tabs**

By default, the names of selected languages are used as the tab captions in the **Request samples** section of your docs. To update it, select the pencil icon to the right of the language name, and set a custom label for the code sample tab.

**Control appearance of generated code samples**

To further control the appearance of generated code samples, you can enable the following settings as required:

- **Skip optional properties in auto-generated payload samples** - When selected, only required fields are included in auto-generated code samples and in request payload samples.

- **Do not show request payload tab** - When selected, the code sample for the request payload is not displayed in the _Request samples_ section of your docs.

- **Skip optional parameters** - When selected, optional parameters `cookies`, `headers` and `query params` are not included in generated code samples.

### Developer portal configuration

Your Developer portal can [integrate API docs](../../developer-portal/guides/reference-docs-integration.md) and contain API documentation for one or multiple API definitions.

1. To enable auto-generated code samples, you must modify the `.page.yaml` configuration file for each of the definitions that should have the code samples.

2. In the `.page.yaml` configuration file, find or create the `settings` object and add the `generateCodeSamples` settings like in the following example:

```yaml
type: reference-docs
definitionId: acme
settings:
generateCodeSamples:
  languages:
    - lang: JavaScript
      label: JS
    - lang: C#
    - lang: Java
    - lang: Go
```

Using this particular example enables generating code samples for JavaScript, C#, Java and Go.

### API docs configuration

To enable auto-generated code samples for API docs, you must modify the Redocly configuration file.

The following options refer to auto-generated code samples. They correspond to the options available in Workflows, and can be used in the `.page.yaml` configuration file(s) for Developer portal.

| Option                                       | Description                                                                                                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `generateCodeSamples`                        | The object that controls the options for auto-generating code samples. <br> _Note that custom code samples directly added to the API definition using the x-codeSamples specification extension have precedence over auto-generated ones._ |
| `generateCodeSamples.languages`              | Array of language config objects; indicates in which languages to generate code samples.                                                                                                                                                   |
| `generateCodeSamples.languages.lang`         | Can be one of `curl`, `C#`, `JavaScript`, `Java`, `Java+Apache`, `Go`, `Node.js`, `PHP`, `Python`, `R`, `Ruby`.                                                                                                                            |
| `generateCodeSamples.languages.label`        | Optional label for the generated code sample. Can be any string, e.g. `JS` or `Awesome Language`. When configured here, the label is displayed instead of `lang` as the tab caption in the **Request samples** section of your docs.       |
| `generateCodeSamples.skipOptionalParameters` | When enabled, optional parameters **cookies**, **headers** and **query params** are not included in generated code samples. The default value is `false`.                                                                                  |
| `onlyRequiredInSamples`                      | Skip optional properties in auto-generated payload samples. It also affects generated code samples. The default value is `false`.                                                                                                          |
| `hideRequestPayloadSample`                   | Do not show request `Payload` example. The default value is `false`.                                                                                                                                                                       |

The following excerpt from the Redocly configuration file illustrates how to enable auto-generated code samples for several languages, add a custom label to one of them, and hide the request payload tab from the API documentation.

```yaml
theme:
  openapi:
    htmlTemplate: ./docs/index.html
    generateCodeSamples:
      languages:
        - lang: curl
          label: Custom label
        - lang: Python
        - lang: JavaScript
    hideRequestPayloadSample: true
```
