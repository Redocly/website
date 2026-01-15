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
      <redoc spec-url='https://redocly.github.io/redoc/museum.yaml'></redoc>
      <script type="module" src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"> </script>
    </body>
  </html>
  ```

1. Replace the value of `spec-url` with either:
   - a relative path to a local OpenAPI description file, for example: `spec-url=my-api.yaml`
   - a full URL, for example: `http://petstore.swagger.io/v2/swagger.json`

To test the HTML file, open it in your browser.
If you use a relative path, to run the API documentation locally, you need to [simulate an HTTP server](./intro.md#local-http-server).

## Configure Redoc CE

Redoc CE is highly configurable - see the [full list of configuration options](https://redocly.com/docs/realm/config/openapi).

To configure Redoc CE in HTML:

- Add the property names to the HTML tag.

  The following example makes all the required properties display at the top of the list:

  ```html
      <redoc spec-url='http://petstore.swagger.io/v2/swagger.json' required-props-first=true></redoc>
  ```

You can add as many Redoc CE configuration properties as you need.

### Theme configuration

Redoc CE uses [CSS variables](https://redocly.com/docs/realm/branding/css-variables) under the hood.
To customize your API documentation's appearance, override these variables.

The following example transforms Redoc CE default styling to be like the previous versions of Redoc CE:

```css {% title="old-styling.css" %}
:root {
  /* COLORS: */

  --color-warm-grey-9: #263238;
  --color-warm-grey-11: #11171a;

  --right-panel-bg-color: var(--color-warm-grey-9);
  --right-panel-fg-color: var(--color-warm-grey-11);
  --right-panel-text-color-primary: var(--color-warm-grey-1);
  --right-panel-text-color-secondary: var(--color-warm-grey-3);

  /* GENERAL: */

  --layout-three-panel-large-max-width: none;
}

:root.dark {
  --right-panel-bg-color: #263238;
  --right-panel-fg-color: #11171a;
  --right-panel-text-color-primary: #ededf2;
  --right-panel-text-color-secondary: #dcdde5;
}

:root .redoc-wrap {
  --layout-three-panel-large-max-width: none;
}

:root [data-section-id] {
  position: relative;
}

:root .api-content.three-panel-layout > [data-section-id]::before,
:root .api-content.three-panel-layout > *:first-child::before {
  display: none;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: -1px;
  width: var(--panel-samples-width);
  background: var(--right-panel-bg-color);
  z-index: 0;
}

:root .api-content.three-panel-layout > [data-section-id]:not(:last-of-type):after,
:root .api-content.three-panel-layout > *:first-child:not(:last-of-type):after {
  display: none;
  border-bottom: 1px solid color-mix(in srgb, var(--color-black) 10%, transparent);
}

:root .api-content > div:not([data-section-id]):first-child > div:last-child {
  background-color: var(--right-panel-bg-color);
  margin: 0;
}

/* PANELS: */

:root .panel-container-request-samples,
:root .panel-container-response-samples {
  background-color: var(--right-panel-bg-color);
}

:root .panel-language-list,
:root .panel-overview,
:root .panel-download,
:root .panel-servers-list,
:root .panel-request-samples,
:root .panel-response-samples,
:root .panel-messages-samples,
:root .panel-callback-samples {
  --layer-color: var(--right-panel-fg-color);
  --panel-samples-heading-bg-color: var(--layer-color);
  --panel-samples-body-bg-color: var(--layer-color);
  --code-block-bg-color: var(--layer-color);
  --code-block-text-color: var(--right-panel-text-color-primary);
  --panel-samples-border: 0;
  --code-block-tokens-string-color: var(--color-green-3);
  --code-block-tokens-constant-color: var(--right-panel-text-color-primary);
  --code-block-padding: var(--spacing-xs) 10px var(--spacing-xs) 20px;
  --panel-samples-dropdown-bg-color: color-mix(
    in srgb,
    var(--right-panel-bg-color) 40%,
    transparent
  );
  --panel-samples-dropdown-color: var(--right-panel-text-color-primary);
  --panel-samples-text-color: var(--right-panel-text-color-primary);
  --panel-samples-heading-text-color: var(--right-panel-text-color-primary);
  --panel-body-text-color: var(--right-panel-text-color-primary) !important;
  --panel-border-radius: 0;
  --panel-samples-dropdown-border: transparent;
  --text-color-secondary: var(--right-panel-text-color-secondary);
  --text-color-primary: var(--right-panel-text-color-primary);

  --tag-content-padding: 3px 10px;
  --tab-bg-color-filled: var(--right-panel-bg-color);
}

:root .panel-language-list .token.property,
:root .panel-overview .token.property,
:root .panel-download .token.property,
:root .panel-servers-list .token.property,
:root .panel-request-samples .token.property,
:root .panel-response-samples .token.property,
:root .panel-messages-samples .token.property,
:root .panel-callback-samples .token.property {
  color: var(--right-panel-text-color-primary);
}

:root .panel-language-list [data-testid='panel-body'] *:not(button) > div,
:root .panel-language-list [data-testid='panel-body'] *:not(button) > span,
:root .panel-overview [data-testid='panel-body'] *:not(button) > div,
:root .panel-overview [data-testid='panel-body'] *:not(button) > span,
:root .panel-download [data-testid='panel-body'] *:not(button) > div,
:root .panel-download [data-testid='panel-body'] *:not(button) > span,
:root .panel-servers-list [data-testid='panel-body'] *:not(button) > div,
:root .panel-servers-list [data-testid='panel-body'] *:not(button) > span,
:root .panel-request-samples [data-testid='panel-body'] *:not(button) > div,
:root .panel-request-samples [data-testid='panel-body'] *:not(button) > span,
:root .panel-response-samples [data-testid='panel-body'] *:not(button) > div,
:root .panel-response-samples [data-testid='panel-body'] *:not(button) > span,
:root .panel-messages-samples [data-testid='panel-body'] *:not(button) > div,
:root .panel-messages-samples [data-testid='panel-body'] *:not(button) > span,
:root .panel-callback-samples [data-testid='panel-body'] *:not(button) > div,
:root .panel-callback-samples [data-testid='panel-body'] *:not(button) > span {
  border: none;
}

:root .panel-language-list .button,
:root .panel-language-list button,
:root .panel-overview .button,
:root .panel-overview button,
:root .panel-download .button,
:root .panel-download button,
:root .panel-servers-list .button,
:root .panel-servers-list button,
:root .panel-request-samples .button,
:root .panel-request-samples button,
:root .panel-response-samples .button,
:root .panel-response-samples button,
:root .panel-messages-samples .button,
:root .panel-messages-samples button,
:root .panel-callback-samples .button,
:root .panel-callback-samples button {
  --button-color: var(--right-panel-text-color-primary);
  --button-color-hover: var(--right-panel-text-color-primary);
  --button-color-active: var(--right-panel-text-color-primary);
  --button-bg-color-hover: var(--right-panel-bg-color);
  --button-bg-color-active: var(--right-panel-bg-color);
  --button-bg-color-disabled: transparent;
  --button-border-color: transparent;
  --button-border-color-disabled: transparent;
  --button-bg-color-danger-hover: var(--button-bg-color-secondary-danger);
  --button-bg-color-danger-pressed: var(--button-bg-color-secondary-danger-hover);
  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
  --button-border-radius: 0;
  --button-gap: var(--spacing-xs);
}

:root .panel-language-list .button > span,
:root .panel-language-list button > span,
:root .panel-overview .button > span,
:root .panel-overview button > span,
:root .panel-download .button > span,
:root .panel-download button > span,
:root .panel-servers-list .button > span,
:root .panel-servers-list button > span,
:root .panel-request-samples .button > span,
:root .panel-request-samples button > span,
:root .panel-response-samples .button > span,
:root .panel-response-samples button > span,
:root .panel-messages-samples .button > span,
:root .panel-messages-samples button > span,
:root .panel-callback-samples .button > span,
:root .panel-callback-samples button > span {
  background-color: transparent;
}

/* OPERATIONS LIST: */

:root [data-testid='operation-navigation-list'] {
  --text-color-primary: var(--right-panel-text-color-primary);
  --panel-samples-text-color: var(--right-panel-text-color-primary);
  --button-border-radius: 0;
  --tag-content-padding: var(--spacing-xxs) var(--spacing-xs);
  background-color: var(--right-panel-bg-color);
}

:root [data-testid='operation-navigation-list'] > button {
  --bg-color: var(--right-panel-fg-color);
  --button-border-width: 0;
  --button-border-color-hover: var(--right-panel-fg-color);
  --button-border-color-active: var(--right-panel-fg-color);
  --button-border-radius: 0;
  --button-color: var(--right-panel-text-color-primary);
  --button-color-hover: var(--right-panel-text-color-primary);
  --button-color-active: var(--right-panel-text-color-primary);
  --text-color-primary: var(--right-panel-text-color-primary);
}

:root [data-testid='operation-navigation-list'] > button > span {
  align-items: center;
  gap: var(--spacing-xs);
}

/* SCHEMAS: */

:root .api-content.stacked-layout {
  --grid-schema-column-gap: 4px;
  --grid-schema-property-padding-left: 200px;
}

:root .api-content.stacked-layout [data-section-id] .property:not(.token) > *:first-child {
  display: grid !important;
  grid-template-columns: 200px repeat(auto-fit, minmax(0, max-content));
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-column-gap: var(--grid-schema-column-gap);
  align-items: start;
}

:root .api-content.stacked-layout [data-section-id] .property:not(.token) > *:not(div:first-child) {
  padding-left: calc(
    var(--grid-schema-property-padding-left) + var(--grid-schema-column-gap)
  ) !important;
}

/* TAGS: */

:root {
  --http-tag-padding: 0 var(--spacing-xs);
}

:root .tag-post,
:root .tag-get,
:root .tag-put,
:root .tag-patch,
:root .tag-delete,
:root .tag-head,
:root .tag-options,
:root .tag-deprecated,
:root .tag-http {
  --tag-color: var(--text-color-inverse) !important;
  --http-tag-font-weight: 200;
  --tag-border-radius: 0;
  justify-content: center;
  font-weight: var(--http-tag-font-weight);
}

:root .tag-post {
  background-color: var(--tag-operation-color-post);
}

:root .tag-get {
  background-color: var(--tag-operation-color-get);
}

:root .tag-put {
  background: var(--tag-operation-color-put);
}

:root .tag-patch {
  background: var(--tag-operation-color-patch);
}

:root .tag-delete {
  background: var(--tag-operation-color-delete);
}

:root .tag-head {
  background: var(--tag-operation-color-head);
}

:root .tag-options {
  background: var(--tag-operation-color-options);
}

:root .tag-deprecated {
  background: var(--tag-operation-color-deprecated);
}

/* SIDEBAR: */

:root .menu-content {
  background: var(--color-warm-grey-1);
}

:root [data-testid='menu-item-label'] .tag-http {
  --http-tag-width: 30px;
  --http-tag-height: 15px;
  --http-tag-font-size: calc(var(--font-size-base) / 2);
  --http-tag-font-weight: var(--font-weight-regular);
  order: -1;
  margin-right: var(--spacing-xs);
  margin-top: 4px;
}

:root [data-testid='menu-item-label'] .tag-http > * {
  line-height: initial;
}

/* RESPONSIVENESS: */

@media screen and (max-width: 1279px) {
  :root .api-content.stacked-layout [data-section-id] .property:not(.token) > *:first-child {
    display: flex !important;
    align-items: center;
  }

  :root
    .api-content.stacked-layout
    [data-section-id]
    .property:not(.token)
    > *:not(div:first-child) {
    padding-left: 0 !important;
  }
}

@media screen and (min-width: 1280px) {
  :root .api-content.three-panel-layout > [data-section-id]::before,
  :root .api-content.three-panel-layout > [data-section-id]:not(:last-of-type):after,
  :root .api-content.three-panel-layout > *:first-child::before,
  :root .api-content.three-panel-layout > *:first-child:not(:last-of-type):after {
    display: block;
  }

  :root .api-content.three-panel-layout > div:not([data-section-id]):first-child > div:last-child {
    background-color: transparent;
    margin: var(--spacing-base) 0;
  }

  :root .api-content.three-panel-layout [data-section-id]:not(:first-of-type) > div > button {
    width: calc(100% - var(--panel-samples-width) - 2 * var(--button-margin-md));
    z-index: 10;
    position: relative;
  }

  :root .api-content.three-panel-layout .panel-container-request-samples,
  :root .api-content.three-panel-layout .panel-container-response-samples {
    background-color: transparent;
  }

  :root .api-content.three-panel-layout [data-testid='operation-navigation-list'] {
    background-color: transparent;
  }

  :root .api-content.stacked-layout > div:not([data-section-id]):first-child > div:last-child {
    padding-top: var(--panel-gap-vertical);
    padding-bottom: var(--panel-gap-vertical);
  }

  :root .api-content.stacked-layout .panel-container-request-samples,
  :root .api-content.stacked-layout .panel-container-response-samples {
    padding-top: var(--panel-gap-vertical);
    padding-bottom: var(--panel-gap-vertical);
  }

  :root .api-content.stacked-layout [data-testid='operation-navigation-list'] {
    padding-top: var(--panel-gap-vertical);
    padding-bottom: var(--panel-gap-vertical);
  }
}
```

To use this code, either:

- Put the CSS code inside the `<style>` tag.
- Create a new CSS file and link it on your page: `<link rel="stylesheet" href="old-styling.css">`.

### Color modes

Redoc CE has two color modes - light and dark.
You can use CSS styling to customize these color modes.
When users switch between color modes, the documentation's appearance dynamically changes to the corresponding color mode.
You can customize color mode styling, by overriding the [CSS variables](https://redocly.com/docs/realm/branding/css-variables) in your docs.

To override CSS variables, either:

- Put the CSS code inside the `<style>` tag.
- Create a new CSS file and link it on your page: `<link rel="stylesheet" href="old-styling.css">`.

The following example shows a complete color mode configuration:

```css
/* Default color variables (used as fallbacks) */
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --link-text-color: #1668dc;
  --sidebar-background-color: #f8fafc;
  --sidebar-active-background-color: #e2e8f0;
  --text-color: #1f2937;
  --bg-overlay: #f2f2f2;
}

/* Light mode specific styling */
:root.light {
  --sidebar-background-color: #ffffff;
  --sidebar-active-background-color: var(--color-purple-2);
  --text-color: #374151;
}

/* Dark mode specific styling */
:root.dark {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --link-text-color: #60a5fa;
  --sidebar-background-color: #1e293b;
  --sidebar-active-background-color: #334155;
  --text-color: #f1f5f9;
  --bg-overlay: #374151;
}
```
In this example, the colors and backgrounds change when users switch between light and dark modes, creating a cohesive experience across both modes.

## Advanced options

### The Redoc object

As an alternative to the HTML tag, you can also initialize Redoc CE in a web page using the Redoc object and invoking it from JavaScript.
Use this method to create dynamic content in a page.
It is also a way to attach the Redoc element to an existing container.

The Redoc object offers an `init` function:

```js
Redoc.init(specOrSpecUrl, options, element, callback)
```

Where:

- `specOrSpecUrl`: either a JSON object with the OpenAPI description, or a file name or URL to the
  description in JSON or YAML format
- `options`: OpenAPI [configuration options](https://redocly.com/docs/realm/config/openapi)
- `element`: DOM element Redoc is inserted into
- `callback`(optional): callback to be called after Redoc has been fully rendered, also called on errors with `error` as the first argument

To use the Redoc object:

- Call `Redoc.init()` from the JavaScript on a web page to add the element to a named container.

The following example is an HTML page with a `<div>` tag, and the script to add the Redoc object to it.
This example also sets the configuration for `showExtensions` so it displays all specification extensions.

```html
<!DOCTYPE html>
<html>
  <head />
  <body>
    <H1>Redoc CE in action</H1>
    <script src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"> </script>
    <div id="redoc-container"></div>

    <script>
      Redoc.init('https://redocly.github.io/redoc/museum.yaml', {
        "showExtensions": true
      }, document.getElementById('redoc-container'))
    </script>
  </body>
</html>
```

### Self-host dependencies

You can reference the Redoc CE script, either using a link to the files hosted on a CDN or installing Redoc CE in your `node-modules` folder.
Self-hosting may be useful when you need to host in a closed environment or have requirements around external dependencies.

{% tabs %}
  {% tab label="Use CDN" %}

    To reference Redoc CE hosted on a CDN:

    - In the `<script>` tag, add an `src` attribute with the URL to the Redoc CE script.

      ```html
      <script src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"> </script>
      ```

  {% /tab %}

  {% tab label="Self-host dependencies" %}

    To host the dependencies yourself:

    1. Install `redoc` using `npm` or `yarn`.

      ```sh
      npm install redoc@next
      ```

    1. Reference the Redoc CE script with a node modules link.

      ```html
      <script src="node_modules/redoc/bundles/redoc.standalone.js"> </script>
      ```

  {% /tab %}
{% /tabs %}

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
