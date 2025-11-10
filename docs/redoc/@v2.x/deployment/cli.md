---
seo:
  title: Use the Redoc CLI
---

# How to use the Redocly CLI

With Redocly CLI, you can bundle your OpenAPI definition and API documentation (made with Redoc) into an HTML file and render it locally.

## Install Redocly CLI

To install the `@redocly/cli` package, either:

- Use `npm` to install it [globally](https://redocly.com/docs/cli/installation#install-globally).
- Use npx or Docker to install it during [runtime](https://redocly.com/docs/cli/installation#use-npx-at-runtime).

## Build the HTML file

The Redocly CLI `build-docs` command builds Redoc into an HTML file.

To build an HTML file using Redocly CLI:

- Enter the following command, replacing `apis/openapi.yaml` with your API description file's name and path:

```bash
redocly build-docs apis/openapi.yaml
```

See the [build-docs](https://redocly.com/docs/cli/commands/build-docs) documentation for more information on the different options and ways you can use the command.

Also, check out [Redocly CLI commands](https://redocly.com/docs/cli/commands), for more information on the different things you can do with Redocly CLI including linting, splitting, and bundling your API definition file.
