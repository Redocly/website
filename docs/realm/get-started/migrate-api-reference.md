# Migrate from Workflows

This guide is for users of Redocly's earlier Workflows API Docs product.
The steps in this guide cover how to migrate from your existing setup to using Redoc.

Redoc is our next-generation API reference documentation tool with code snippets, request/response examples, mock servers, and the Replay API explorer built into the page.
Publish Redoc projects to the Redocly Reunite platform (this version of Redoc is not licensed for use on other platforms; Enterprise+ customers may contact us to discuss other hosting arrangements).

## Create a new project

A [project](../reunite/project/projects.md) is one website and everything that goes with it.
The project consists of files and folders; your project comes with a Redocly-hosted repository or you can connect your own Git repository.

1. Sign up or log in to your Reunite account.

2. Go to your [Reunite dashboard](https://app.cloud.redocly.com) and [create a new project](../reunite/project/manage-projects.md#create-a-project).

Every project is different, so there are multiple ways to add content to your project:

- [Connect an existing Git repository](#connect-an-existing-git-repository) if you already use a repository source.
- [Upload an API description](#upload-an-api-description) to get started quickly.
- Use an [API description from an external URL](#add-an-api-from-an-external-url).
- If you prefer to use CI/CD to "push" content to a project, check the documentation for [pushing content from an external source](../reunite/project/remote-content/push.md).

### Connect an existing Git repository

If you have your API descriptions stored in a Git repository, this repository becomes the source for your Redoc project.

To make your existing Git repository the source for your Redoc project:

1. [Connect your repository](../reunite/project/connect-git/connect-git-provider.md) to get the existing content connected to the new project.

2. Don't worry if the Workflows project content doesn't build successfully when you first connect it to Reunite.
   The other sections in this guide cover the updates that may apply to your project.

{% admonition type="info" name="Use remote content for multiple repositories"%}
If you have API descriptions in multiple repositories, the [remote content](../reunite/project/remote-content/remote-content.md) feature supports connecting another repository (or more than one) as a source for the project.
{% /admonition %}

### Upload an API description

Upload your API description directly in the Editor for your project.
If you were using configuration in your Workflows project, add it to a file named `redocly.yaml`, and follow the steps in the section about [updating configuration options](#update-existing-configuration-options) later in this guide.

### Add an API from an external URL

If your API files are in a separate project than your Redocly setup, add them using the [remote content](../reunite/project/remote-content/remote-content.md) feature.

To add content using the remote content feature:

1.  Go to the Reunite editor in your new project.

2.  Click the plus sign icon (Add content) and select **New remote**.

3.  Select **Add URL link**, and enter the following required fields:

    - the URL of the API description
    - the file name to use in Reunite
    - how often to check for updates
    - where in the project to mount the file, such as `apis/my-api-name.yaml`

The API description is added to your project and you can see it in the preview.

## Multiple APIs

Redoc supports multiple API references in a single project.
Add each API description to your project, either directly or using [remote content](#add-an-api-from-an-external-url).

Add a `sidebars.yaml` file to the root of your project, and add each API to it as shown in the following example:

```yaml {% title="sidebars.yaml" %}
- group: Orders
  page: apis/orders/openapi.yaml
- group: Accounts
  page: apis/accounts/openapi.yaml
```

You can customize the order and display labels of the APIs, or group in another structure to suit your needs.
Visit the [sidebars documentation](../navigation/sidebars.md) for more information and examples.

## Multiple API versions

If you were using multiple versions of a single API, you can do the same thing with updated Redoc, but the structure looks a little different.

To create a structure for versioned APIs:

1.  Create one folder per version, starting with an `@` character.
    For example, if you have two versions of your API, version 10 and version 12, you might create a folder structure like this:

    - `apis/@v10/`
    - `apis/@v12/`

1.  Add the OpenAPI descriptions to the folders.

1.  In the project (or preview), use the dropdown to switch between versions; it retains the user's position in the API reference documentation for any entries which exist in both versions.

1.  (Optional) For additional control, [configure a `versions.yaml` file](../content/versions.md) to specify which versions should be displayed or not, and which is the default version.

## Update existing configuration options

If you had an existing `redocly.yaml`, there may be settings that need updating.
Feedback about outdated or unknown configuration options is available either [using Redocly CLI on your computer](#check-configuration-locally) or [using Reunite](#check-configuration-with-reunite).

### Check configuration with Reunite

Open the `redocly.yaml` file in the editor.
The editor will indicate any configuration that isn't supported in the newer products.
Check the list of [configuration updates](#update-configuration-settings) for advice on changing some of the most common settings as part of your migration project.

### Check configuration locally

Redocly CLI can help identify those changes, and verify that the config file is correct.

Start by checking the config with Redocly CLI using the following command:

```bash
redocly check-config
```

If there are settings that are outdated or unrecognized, the output displays warnings or errors.

### Update configuration settings

The following table shows how to update some commonly used configuration options to work with the new product:

{% table %}

- Previous configuration
- Replacement values

---

- `referenceDocs`
- This section is replaced by the `openapi` configuration setting.
  For example:

  ```yaml
  openapi:
    showExtensions: true
  ```

  Check the [openapi configuration documentation](../config/openapi/index.md) for all the options for configuring reference documentation.

---

- `htmlTemplate`
- Instead of supplying a template, use the configuration options for the navbar, sidebar, and footer sections.
  The [navigation documentation](../navigation/navigation.md) is a good starting point to find out more about each element.

---

- `apiDefinitions`
- Replace with `apis` and one named entry for each API in your project.
  Check the [`apis` configuration reference](https://redocly.com/docs/cli/configuration/reference/apis) for more information and examples.

---

- `lint`
- The `lint` entry is no longer needed.
  Instead, use the keys such as `extends` and `rules` at the top level of the `redocly.yaml` configuration file.

---

- `assert/*`
- The [configurable rules](https://redocly.com/docs/cli/rules/configurable-rules) syntax changed.
  Use `rule/` instead of `assert/` and check the configurable rules documentation for other changes.

---

- `pagination`
- Not supported.
  This version of Redoc has a modern style of pagination, operations are divided into sections by tags.

---

- `hideTryItPanel` or the older `hideConsole`
- Replaced by `hideReplay` as the "Try It" functionality is provided by [Replay](../content/api-docs/replay.md).

---

- `hideDownloadButton`
- Now named `hideDownloadButtons` since we support multiple downloads.
  Visit the [documentation for hiding download buttons](../config/openapi/hide-download-buttons.md) for more information.

---

- `requiredPropsFirst`
- Renamed to `sortRequiredPropsFirst`.
  View the [detailed documentation for sortRequiredPropsFirst](../config/openapi/sort-required-props-first.md) for more information.

  For more sorting options, try the [sorting plugin](https://github.com/Redocly/redocly-cli-cookbook/tree/main/custom-plugins/sorting) from the Redocly CLI cookbook.
  The plugin also includes a `property-sort` rule to check property ordering.

---

- `sortPropsAlphabetically`
- Removed, but can be replaced using a custom decorator such as the `properties-alphabetical` decorator in the [sorting plugin](https://github.com/Redocly/redocly-cli-cookbook/tree/main/custom-plugins/sorting) from the Redocly CLI cookbook.
  The plugin also includes a `property-sort` rule to check property ordering.

---

- `sortEnumValuesAlphabetically`
- Removed, use a custom decorator instead.
  Try the `enums-alphabetical` decorator in the [sorting plugin](https://github.com/Redocly/redocly-cli-cookbook/tree/main/custom-plugins/sorting) from the Redocly CLI cookbook.

---

- `sortTagsAlphabetically`
  Try the `tags-alphabetical` decorator in the [sorting plugin](https://github.com/Redocly/redocly-cli-cookbook/tree/main/custom-plugins/sorting) from the Redocly CLI cookbook.


---

- `generatedPayloadSamplesMaxDepth`
- Renamed to `generatedSamplesMaxDepth`.
  The [documentation for generatedSamplesMaxDepth](../config/openapi/generated-samples-max-depth.md) includes more information and examples.

---

- `jsonSampleExpandLevel`
- Renamed to `jsonSamplesExpandLevel`.
  The [documentation for jsonSamplesExpandLevel](../config/openapi/json-samples-expand-level.md) includes more information and examples.

---

- `schemaExpansionLevel`
- Renamed to `schemasExpansionLevel`.
  The [documentation for schemasExpansionLevel](../config/openapi/schemas-expansion-level.md) includes more information and examples.

{% /table %}

> If you spot another configuration setting that should be included in this guide, leave some feedback at the bottom of the page to let us know.

## Style the output

The styling mechanism had a big upgrade in the new products, and is now based on CSS variables for a more customizable and flexible experience.
Set colors, fonts, and styles by configuring your own theme.

To apply custom styles to your project:

1.  Create a directory called `@theme/` at the top level of your project.
2.  Add a `styles.css` file inside the new directory.
3.  To get you started with an example, paste the following example content:

    ```css {% title="@theme/styles.css" %}
    :root {
      --heading-text-color: var(--color-purple-7);
      --text-color-secondary: #22242b;
      --sidebar-bg-color: ivory;
      --panel-border: 3px solid teal;
    }

    :root.dark {
      --sidebar-bg-color: midnightblue;
      --text-color-secondary: #ffffdf;
    }

    ```

    This snippet changes a few colors in both light and dark modes, and the preview automatically updates to reflect the changes.

4.  Edit the `@theme/styles.css` file to reflect your own branding and preferences.
    Using "Inspect" in your browser developer tools shows the CSS class names that you can change.
    The documentation includes [branding and customization guides](../branding/index.md) to help you get started, and a full [CSS variables dictionary](../branding/css-variables/index.md) for your reference.

## Local development platform

Using a local development platform requires that your Reunite project exists in your own Git provider.
Our tools are based on [NodeJS](https://nodejs.org/en), so you will also need version 22.12.0 or later (alternatively -- v20.19.0 or later) and [npm](https://docs.npmjs.com/cli/v10/commands/npm) installed.

To run your project locally:

1.  Install [Redocly CLI](https://redocly.com/docs/cli/installation).

1.  Before making any changes, try the out-of-the-box Redoc experience by running the following command:

    ```bash
    redocly preview
    ```

    The `preview` command starts a local server, visit the URL shown (usually `<http://localhost:4000>`) to get a first glimpse of your API rendered with the newer Redoc tools.

1.  Use the sections throughout the guide to structure your repository to suit your needs, update the configuration, and adjust the styles as needed.

## Next steps

There are many more aspects to Redoc that you might like to explore.
Here are some suggestions for where to go next:

- View the list of [supported OpenAPI extensions](../content/api-docs/openapi-extensions/index.md).
- Check the [configuration options for OpenAPI documentation](../config/openapi/index.md), there are changes and additions in comparison to our older products.
- Learn how to [set a custom domain](../reunite/project/custom-domain.md) for your project.
