---
seo:
  title: Use the Redoc CE HTML element
---

# Use Redoc CE in HTML

To render API documentation in an HTML page:

1. Paste the following template into an HTML file.

    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redoc CE</title>
        <!-- needed for adaptive design -->
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!--
        Redoc CE doesn't change outer page styles
        -->
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc spec-url="https://redocly.github.io/redoc/cafe.yaml"></redoc>
        <script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
      </body>
    </html>
    ```

1. Replace the value of `spec-url` with either:
   - a root-relative path to a local description file, for example: `spec-url="/openapi.yaml"`
   - a full URL, for example: `spec-url="https://redocly.github.io/redoc/cafe.yaml"`

   The description can be an OpenAPI, AsyncAPI, or GraphQL file.
   Relative paths are resolved against the site root, not against the HTML page: `spec-url="openapi.yaml"` on the page `/docs/index.html` loads `/openapi.yaml`.

To test the HTML file, serve it and open it in your browser.
The script is an ES module, so the page must be served over HTTP.
To run the API documentation locally, you need to [simulate an HTTP server](./intro.md#local-http-server).

When the description cannot be loaded or parsed, Redoc CE shows a **Failed to load API definition** message in the element.
The message includes the underlying error.

## Render AsyncAPI and GraphQL descriptions

The same element renders AsyncAPI and GraphQL descriptions, and Redoc CE detects the specification type from the file.

```html
<redoc spec-url="https://redocly.github.io/redoc/3.x/cafe-asyncapi.yaml"></redoc>
```

```html
<redoc spec-url="https://redocly.github.io/redoc/3.x/cafe.graphql"></redoc>
```

A GraphQL schema served from an API endpoint works as well.
A URL that does not load as OpenAPI or AsyncAPI is read as a GraphQL schema.
The detection rules and the supported versions are listed in [Supported specifications](../supported-specifications.md).

## Configure Redoc CE

Redoc CE is highly configurable - see the [full list of configuration options](../config.md).

To configure Redoc CE in HTML, add options as attributes of the `<redoc>` element.
Attribute names are the kebab-case form of the option names: `sortRequiredPropsFirst` becomes `sort-required-props-first`.

The following example lists required properties first, groups all schemas under a **Schemas** entry in the sidebar, and hides the download panel:

```html
<redoc
  spec-url="https://redocly.github.io/redoc/cafe.yaml"
  sort-required-props-first="true"
  schema-definitions-tag-name="Schemas"
  hide-download-buttons="true"
></redoc>
```

You can add as many configuration attributes as you need.

### Theme configuration

Redoc CE uses [CSS variables](https://redocly.com/docs/realm/branding/css-variables) under the hood.
To customize your API documentation's appearance, override these variables in a stylesheet on your page.

Redoc CE sets a `light` or `dark` class on the `<html>` element.
It follows the reader's system preference at first, and the choice they make with the color mode switcher at the bottom of the sidebar afterwards.
Use `:root.light` and `:root.dark` to scope overrides to one color mode, and `:root` for values shared by both.

The following example changes the primary color and the sidebar background for each color mode:

```css
/* Shared values, used by both color modes */
:root {
  --color-primary: #2563eb;
  --sidebar-bg-color: #f8fafc;
}

/* Light mode */
:root.light {
  --sidebar-bg-color: #eef2ff;
}

/* Dark mode */
:root.dark {
  --color-primary: #60a5fa;
  --sidebar-bg-color: #1e293b;
}
```

To use this code, either:

- Put the CSS code inside a `<style>` tag in the `<head>` of your page.
- Create a new CSS file and link it on your page: `<link rel="stylesheet" href="redoc-theme.css">`.

The [common CSS variables](https://redocly.com/docs/realm/branding/css-variables/common) and [API docs CSS variables](https://redocly.com/docs/realm/branding/css-variables/api-docs) references list the variables you can override.

## Advanced options

### The `init` function

As an alternative to the HTML attributes, you can also initialize Redoc CE from JavaScript.
Use this method to:

- pass options that are objects or arrays
- render into your own container
- create dynamic content in a page

The standalone bundle is an ES module that exports an `init` function:

```js
import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

init(specOrSpecUrl, options, element);
```

Where:

- `specOrSpecUrl`: a URL or root-relative path to the description file, a parsed description object, a JSON string, or a GraphQL schema in SDL
- `options` (optional): the [configuration options](../config.md), plus the standalone options `router`, `basePath`, and `disableTelemetry`
- `element` (optional): the DOM element Redoc CE renders into.
  Defaults to the first `<redoc>` element on the page.
  When there is neither an argument nor a `<redoc>` element, `init` throws an error.

Attributes on the target element are merged into the options and take precedence over them, so a page can combine both approaches.
When you call `init` yourself, leave the `spec-url` attribute off the element.
Otherwise, the element also initializes itself.

The following example is an HTML page with a `<div>` container and a module script that renders Redoc CE into it.
It shows specification extensions, lists required properties first, and adds a download link to the panel on the overview page:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redoc CE</title>
  </head>
  <body>
    <h1>Redoc CE in action</h1>
    <div id="redoc-container"></div>

    <script type="module">
      import { init } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

      init(
        'https://redocly.github.io/redoc/cafe.yaml',
        {
          showExtensions: true,
          sortRequiredPropsFirst: true,
          downloadUrls: [
            { title: 'Download OpenAPI description', url: 'https://redocly.github.io/redoc/cafe.yaml' },
          ],
        },
        document.getElementById('redoc-container'),
      );
    </script>
  </body>
</html>
```

### The `hydrate` function

The bundle also exports `hydrate`, which attaches Redoc CE to markup that was rendered on a server, instead of replacing it.
Hydration adds interactivity to server-rendered pages, such as the static HTML that Redocly CLI `build-docs` produces.
It takes the same arguments as `init` and returns a promise.
The spec must be the same pre-bundled document the server rendered from.

```js
import { hydrate } from 'https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js';

await hydrate(spec, { router: 'history', basePath: '/docs' });
```

### Self-host dependencies

You can reference the Redoc CE script in two ways.
Use a link to the files hosted on a CDN, or install Redoc CE in your `node_modules` folder.
Self-hosting may be useful when you need to host in a closed environment or have requirements around external dependencies.

The standalone bundle includes React and every other dependency, so a single file is all you need to serve.

{% tabs %}
  {% tab label="Use CDN" %}
    To reference Redoc CE hosted on a CDN:

    - In the `<script>` tag, add an `src` attribute with the URL to the Redoc CE script.

      ```html
      <script type="module" src="https://cdn.redoc.ly/redoc/v3.x/bundle/redoc.standalone.js"></script>
      ```

    The `v3.x` path follows the newest 3.x release.
    To pin an exact version, replace `v3.x` with the version number, in the form `v3.<minor>.<patch>`.
    The `latest` path follows the newest release across major versions.

    The same file is available from jsDelivr, which mirrors the npm package:

      ```html
      <script type="module" src="https://cdn.jsdelivr.net/npm/redoc@3/bundle/redoc.standalone.js"></script>
      ```
  {% /tab %}
  {% tab label="Self-host dependencies" %}
    To host the dependencies yourself:

    1. Install `redoc` using `npm`.

        ```sh
        npm install redoc
        ```

    1. Reference the Redoc CE script with a node modules link.

        ```html
        <script type="module" src="node_modules/redoc/bundle/redoc.standalone.js"></script>
        ```

  {% /tab %}
{% /tabs %}

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Step-by-step instructions for setting up your Redoc CE project
- **[Configure Redoc CE](../config.md)** - Every option you can pass as an attribute or in the `init` options object
- **[Telemetry in Redoc CE](../telemetry.md)** - What Redoc CE collects and how to turn it off
