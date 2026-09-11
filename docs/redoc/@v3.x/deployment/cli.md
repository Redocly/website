---
seo:
  title: Use Redocly CLI with Redoc CE
---

# Use Redocly CLI with Redoc CE

With [Redocly CLI](https://redocly.com/docs/cli/installation), you can bundle your API description and the Redoc CE documentation into a single HTML file, ready to host anywhere.

## Build API documentation

The Redocly CLI `build-docs` command uses Redoc CE to transform an API description file into a human-readable HTML file.

To build an HTML file using Redocly CLI:

- Enter the following command, replacing `apis/openapi.yaml` with your API description file's name and path:

    ```bash
    npx @redocly/cli build-docs apis/openapi.yaml
    ```

The command writes `redoc-static.html` to the current directory.
Use the `--output` option to choose another file name:

```bash
npx @redocly/cli build-docs apis/openapi.yaml --output docs/index.html
```

The page loads the Redoc CE script from the Redocly CDN.
Pass `--inlineBundle` to embed the script in the file, so the page also works offline and when opened directly from the filesystem:

```bash
npx @redocly/cli build-docs apis/openapi.yaml --inlineBundle
```

After the command finishes running, you can share the HTML file or host it on a platform of your choice.

## Configure Redoc CE

Redocly CLI reads the [configuration options](../config.md) from your `redocly.yaml` file.
Redocly CLI detects a file named `redocly.yaml` in the directory where you run the command.

Options live under the key that matches the type of your description: `openapi`, `asyncapi`, or `graphql`.
Each key applies to descriptions of that type only, so one file can configure all three.

```yaml {% title="redocly.yaml" %}
openapi:
  layout: stacked
  sortRequiredPropsFirst: true
  schemaDefinitionsTagName: Schemas
  downloadUrls:
    - title: Download OpenAPI description
      url: https://example.com/cafe.yaml
asyncapi:
  jsonSamplesDepth: 4
graphql:
  showBuiltInScalars: true
```

To pass an option on the command line instead, use the `--openapi`, `--asyncapi`, or `--graphql` option with dot notation.
The option must match the type of your description.
When you pass it, the command uses these values instead of the matching key in `redocly.yaml`:

```bash
npx @redocly/cli build-docs schema.graphql --graphql.layout=stacked --graphql.showBuiltInScalars
```

Telemetry in the built page is on by default.
To turn it off, pass `--disableTelemetry` or set `disableTelemetry: true` under the key of your specification type, as described in [Telemetry in Redoc CE](../telemetry.md#redocly-cli).

## Resources

- **[`build-docs`](https://redocly.com/docs/cli/commands/build-docs)** - The different options and ways to use this Redocly CLI command
- **[Redocly CLI commands](https://redocly.com/docs/cli/commands)** - Use Redocly CLI to maintain and transform your API description file
- **[Configure Redoc CE](../config.md)** - Every option you can set in `redocly.yaml`
- **[Redoc CE deployment guide](./intro.md)** - Step-by-step instructions for setting up your Redoc CE project
