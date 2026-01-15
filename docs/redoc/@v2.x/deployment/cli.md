---
seo:
  title: Use Redocly CLI with Redoc CE
---

# Use Redocly CLI with Redoc CE

With [Redocly CLI](https://redocly.com/docs/cli/installation), you can bundle your OpenAPI definition and API documentation (made with Redoc CE) into an HTML file and render it locally.

## Build API documentation

The Redocly CLI `build-docs` command uses Redoc CE to transform an API description file into a human-readable HTML file.

To build an HTML file using Redocly CLI:

- Enter the following command, replacing `apis/openapi.yaml` with your API description file's name and path:

```bash
npx @redocly/cli build-docs apis/openapi.yaml
```

After the command finishes running, you can share the HTML file or host it on a platform of your choice.

## Resources

- **[`build-docs`](https://redocly.com/docs/cli/commands/build-docs)** - Learn about the different options and ways you can use this Redocly CLI command
- **[Redocly CLI commands](https://redocly.com/docs/cli/commands)** - Explore how you can use Redocly CLI's to maintain and transform your API description file
- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
