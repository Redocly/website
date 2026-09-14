---
seo:
  title: Redoc CE
---

# Redoc CE: Open source API documentation tool

Redoc CE is a clean and easy way to produce web-ready documentation from an API description.
One renderer handles OpenAPI, AsyncAPI, and GraphQL descriptions.
Point it at your description file, and customize the output to meet the needs of your users.

Redoc CE is based around a three-panel layout, with clear sections for navigation, detailed documentation, and request/response examples.
Readers can switch to a stacked layout that moves the examples into the main column, and between light and dark color modes.

## Headline features

- One renderer for OpenAPI, AsyncAPI, and GraphQL descriptions, and for MCP servers described with `x-mcp`.
  See [Supported specifications](./supported-specifications.md) for the versions and the detection rules.
- Three-panel and stacked layouts, with light and dark color modes.
- Built-in search across operations, schemas, and descriptions.
- Deep links to every operation, schema, and field.
  Hash-based routing works from any static host, and history routing is available when your server supports it.
- **Copy for LLM**, **Open in Claude**, and **Open in ChatGPT** actions in the page header.
  Readers can hand the relevant slice of your API description to an assistant.
  The **Open in** actions point the assistant at your description file.
  They appear when Redoc CE knows the description file's URL from `spec-url`, `specUrl`, or `downloadUrls`.
- Payload samples, your own `x-codeSamples`, and a download panel for the description file.
- Markdown descriptions, [specification extensions](./redoc-vendor-extensions.md) such as `x-logo`, `x-tagGroups`, and `x-codeSamples`, and theming through CSS variables.
- Drop-in HTML element, JavaScript `init` function, React component, Docker image, and Redocly CLI for static builds.

## Demo

[Try the live demo](https://redocly.github.io/redoc/3.x) to see Redoc CE render the sample descriptions.

## Usage

Redoc CE is provided as a CLI tool, an HTML element, a JavaScript function, a React component, and a Docker image.
All of them accept the same [configuration options](./config.md).

### Generate documentation from the CLI

If you have Node.js installed, you can generate documentation using `npx`:

```sh
npx @redocly/cli build-docs openapi.yaml
```

The tool outputs by default to a file named `redoc-static.html` that you can open in your browser.
See the [CLI deployment documentation](./deployment/cli.md) for details.

> [Redocly CLI](https://github.com/Redocly/redocly-cli/) does more than docs, check it out and add linting, bundling and more to your API workflow.

### Add an HTML element to the page

Create an HTML page, or edit an existing one, and add the following:

```html
<redoc spec-url="https://redocly.github.io/redoc/cafe.yaml"></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
```

Serve the HTML file and open it in your browser, and your API documentation is displayed on the page.

Set `spec-url` to your own OpenAPI, AsyncAPI, or GraphQL description.
Redoc CE detects the specification type from the file, as described in [Supported specifications](./supported-specifications.md).
See the [HTML deployment documentation](./deployment/html.md) for the attribute rules and the `init` function.

### More usage options

- [Redocly CLI](./deployment/cli.md): build a single HTML file with your documentation from the command line.
- [JavaScript `init` function](./deployment/html.md#the-init-function): render into your own container and pass options as an object.
- [React component](./deployment/react.md): render the documentation inside a React application.
- [Frontend frameworks](./deployment/frameworks.md): render the documentation in Vue, Angular, Next.js, or any other framework.
- [Docker image](./deployment/docker.md): serve the documentation from a container.

Check out the [deployment documentation](./deployment/intro.md) for details on each option.

## Configure Redoc CE

Redoc CE is highly configurable.
Every deployment method accepts the same configuration settings.
Only the syntax you use to supply them differs by platform:

- Using Redocly CLI, configuration goes in the `redocly.yaml` file under the `openapi`, `asyncapi`, or `graphql` key, matching the type of your description.
  The same names work as command-line options: `--openapi.<option>`, `--asyncapi.<option>`, or `--graphql.<option>`.
- In HTML, add options as attributes of the `<redoc>` element, written in kebab-case.
- In JavaScript, pass an options object to `init`.
- In React, pass an options object in the `options` prop.
- In Docker, pass attributes in the `REDOC_OPTIONS` environment variable.

The following example displays the stacked layout, lists required properties first, and groups schemas under a **Schemas** entry in the sidebar:

```html
<redoc
  spec-url="https://redocly.github.io/redoc/cafe.yaml"
  layout="stacked"
  sort-required-props-first="true"
  schema-definitions-tag-name="Schemas"
></redoc>
<script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
```

The same configuration as an options object, rendered into the first `<redoc>` element on the page:

```html
<redoc></redoc>
<script type="module">
  import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

  init('https://redocly.github.io/redoc/cafe.yaml', {
    layout: 'stacked',
    sortRequiredPropsFirst: true,
    schemaDefinitionsTagName: 'Schemas',
  });
</script>
```

For a complete list of configuration options, visit the [configuration reference](./config.md).

## Resources

- **[Redoc CE quickstart](./quickstart.md)** - Build documentation from an existing API description in one HTML file
- **[Supported specifications](./supported-specifications.md)** - OpenAPI, AsyncAPI, GraphQL, and MCP inputs Redoc CE renders, and how it detects the specification type
- **[Redoc CE deployment guide](./deployment/intro.md)** - The CLI, HTML element, JavaScript function, React component, and Docker image deployment options
- **[Use Redocly CLI with Redoc CE](./deployment/cli.md)** - Build a single HTML file from your API description
- **[Configure Redoc CE](./config.md)** - Every configuration option and how to pass it in each deployment
- **[Redoc CE specification extensions](./redoc-vendor-extensions.md)** - The `x-` extensions Redoc CE reads
- **[Migration from Redoc CE 2.x to 3.x](./config-migration.md)** - Update pages, options, and React code written for Redoc CE 2.x
- **[Redoc CE on GitHub](https://github.com/Redocly/redoc)** - Source, issues, and contribution guidelines for the project
