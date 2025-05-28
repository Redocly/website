---
seo:
  title: Use the Reference docs CLI tool
---

# Build static API reference documentation

## Benefits of using static API reference documentation

Static API documentation produces static HTML and CSS files based on your API definition.

The Redocly JS CDN builds the documentation on each page load. There is a performance penalty for doing that, which is magnified based on the size of the API definition.

Static API documentation benefits from SEO-friendly routes.

Use this when:

- You have a large API definition and page-load speed is really important.
- You are using layout scope sections to give you SEO-friendly URLs and content.
- You have an existing CI script for deployments which makes using a CLI tool a natural fit.
- You cannot use Redocly's Workflows due to your organizational internal policies.

{% admonition type="info" %}
Redocly uses this tool within our own **Workflows** product.
{% /admonition %}

## What is `reference-docs` CLI?

The `reference-docs` CLI tool creates static API documentation (HTML, JS and CSS files) which opens instantly.

If you update your API definition, you need to rebuild your documentation. For this purpose, you can set up a build step for each API definition change. This is exactly what our Workflows product does.

{% admonition type="warning" %}
This feature is only available in our Enterprise plans.
{% /admonition %}

## Install `reference-docs` CLI

1. To obtain a license key, refer to the [on-premise license key](./on-premise.md) topic.

2. Install the CLI tool with npm:

```sh
npm install @redocly/reference-docs --global
```

**or with yarn**

```sh
yarn global add @redocly/reference-docs
```

{% admonition type="info" %}
If you do not want to install the CLI tool, you can use [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
{% /admonition %}

## Create static documentation

To create static documentation, run this command:

```sh
reference-docs build <path or url to api definition>
```

This pre-renders static files into `redocly-static`.

### Advanced customization options

```sh

reference-docs build <api definition>

bundle definition into zero-dependency HTML-file [aliases: bundle]

Positionals:
  definition  path or URL to your OpenAPI Definition or config

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --options       Redoc options, use dot notation, e.g. options.nativeScrollbars
                  or pass JSON value e.g. --options '{"nativeScrollbars": true}'
  -o, --output    Output dir                [string] [default: "redocly-static"]
  --title         Page Title           [string] [default: "Redoc documentation"]
  -u, --definition-url  API definition URL, URL for a download button,
                  uses API definition URL by default                    [string]
  -t, --template  Path to handlebars page template, see <https://git.io/vh8fP>
                  for the example                                       [string]
  -q, --query     Query params to use for downloading resources         [string]
  --prefix-paths  Overwrite routingBasePath Redoc setting
                                                          [string] [default: ""]
  --from-folder   Render all OpenAPI definitions in the folder
                                                          [string] [default: ""]
  --group-by      JSON pointer to grouping property inside the definition, e.g.
                  "info.x-domain"                         [string] [default: ""]
  --serve         Serve build artifacts after bundle  [boolean] [default: false]
  -p              Server port                           [number] [default: 3000]

```

{% admonition type="warning" %}
You need version 1.1.3 or later for this to work.
{% /admonition %}

```bash
reference-docs --version
```

### Example with Try It console enabled

```yaml
# sample Redocly configuration file

theme:
  openapi:
    licenseKey: <insert your license key>
```

```bash
reference-docs build openapi.yaml
```

```bash
REDOCLY_LICENSE_KEY=<insert your license key> reference-docs build openapi.yaml
```

### Example JSON theme file

Add your custom theme settings to the `theme.openapi.theme` object in the Redocly configuration file.

When using Redocly CLI, you can pass one or more theming options to the CLI tool with the `--options` parameter. To make it more practical, you can also save your custom theme as a JSON file and pass it to the CLI tool with the same parameter, like in the following example:

`reference-docs build example-openapi.yaml --options=theme.json`

**Example theme.json file**

```json
{
  "theme": {
    "breakpoints": {
      "small": "10rem",
      "medium": "40rem",
      "large": "85rem"
    },
    "colors": {
      "primary": {
        "main": "rgba(246, 20, 63, 1)",
        "light": "rgba(246, 20, 63, 0.42)"
      },
      "success": {
        "main": "rgba(28, 184, 65, 1)",
        "light": "#81ec9a",
        "dark": "#083312",
        "contrastText": "#000"
      },
      "text": {
        "primary": "rgba(0, 0, 0, 1)",
        "secondary": "#4d4d4d"
      },
      "http": {
        "get": "rgba(0, 200, 219, 1)",
        "post": "rgba(28, 184, 65, 1)",
        "put": "rgba(255, 187, 0, 1)",
        "delete": "rgba(254, 39, 35, 1)"
      }
    },
    "typography": {
      "fontSize": "16px",
      "fontFamily": "Fira Sans, Roboto, sans-serif",
      "optimizeSpeed": true,
      "smoothing": "antialiased",
      "headings": {
        "fontWeight": "bold",
        "lineHeight": "1em"
      },
      "code": {
        "fontWeight": "600",
        "color": "rgba(92, 62, 189, 1)",
        "wrap": true
      },
      "links": {
        "color": "rgba(246, 20, 63, 1)",
        "visited": "rgba(246, 20, 63, 1)",
        "hover": "#fa768f"
      }
    },
    "sidebar": {
      "width": "300px",
      "textColor": "#000000"
    },
    "rightPanel": {
      "backgroundColor": "rgba(55, 53, 71, 1)",
      "textColor": "#ffffff"
    }
  }
}
```
