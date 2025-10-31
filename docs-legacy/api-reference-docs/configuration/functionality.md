---
excludeFromSearch: true
seo:
  title: Configure API docs functionality
---

# Configuration options for API docs

{% admonition type="info" name="Open source Redoc" %}

Users of open source Redoc should refer to the [Redoc configuration documentation](/docs/redoc/@v2.x/config.md).

{% /admonition %}

To control the functionality of your API documentation, specify the configuration options depending on the selected usage method.

- When using a JavaScript library, specify the options in the second argument of the `init` function.
- When using our Workflows hosted service or our CLI for on-premise deployments, we recommend specifying the options in the [Redocly configuration file](/docs/cli/configuration). In this case, specify the options in the `theme.openapi` section. Note that [live configuration](#live-configuration) in Workflows may be used to override the Redocly configuration file.

Expand the `theme` object `openapi` schema below to show all supported configuration options.
The premium version of Redocly API docs can use all of the listed options.
The Redoc Community Edition (free and open source version) can only use the options marked as supported.
All of the listed options are compatible with the Redocly configuration file used [in the API registry and Redocly CLI](/docs/cli/configuration), and [in Developer portal](/docs-legacy/developer-portal/guides/reference-docs-integration).

## `theme` object `openapi` schema

{% json-schema
  schema={
    "$ref": "./reference-docs-schema.yaml"
  }
/%}

## Example configuration with JavaScript library

```js
RedoclyReferenceDocs.init(
  '<path to api definition>',
  {
    licenseKey: '<license-key.here>',
    pagination: 'section',
    generateCodeSamples: {
      languages: [{ lang: 'curl' }, { lang: 'Node.js' }, { lang: 'JavaScript', label: 'JS' }],
      skipOptionalParameters: true,
    },
    theme: {
      colors: {
        primary: {
          main: '#6EC5AB',
        },
      },
      typography: {
        fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
        fontSize: '15px',
        lineHeight: '1.5',
        code: {
          code: '#87E8C7',
          backgroundColor: '#4D4D4E',
        },
      },
      menu: {
        backgroundColor: '#ffffff',
      },
    },
    hooks: {
      BeforeOperationSummary: (operation) => ({ html: `<i>ID: ${operation.operationId}</i>` }),
    },
  },
  document.querySelector('#redoc_container'),
);
```

## Example Redocly configuration file

The Redocly configuration file is compatible with the CLI and our hosted API registry.

```yaml
theme
  openapi:
    licenseKey: <license-key-here>
    pagination: section
    theme:
      sidebar:
        backgroundColor: '#ffffff'
```

## Live configuration

If you're using Workflows to build your API docs, you can override any existing configuration in `redocly.yaml` by using the **Live configuration** editor.

1. On the **API registry** page, select your API version.

2. From the **Overview** page of the selected API version, access the **Settings** tab.

3. On the **Settings** page, select **Features**, and then select the **Configuration** button. This opens the live configuration editor.

Any settings you enter in the live configuration editor are merged with the existing `redocly.yaml` settings.
Live configuration settings have higher priority and override the configuration file settings in case of conflict.

To apply changes you've made in the live configuration editor, select **Save**. This triggers a new build in the registry.
