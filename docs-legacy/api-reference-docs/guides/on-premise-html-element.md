---
seo:
  title: HTML Element Javascript CDN Usage Redocly API Reference
---

# Use the HTML element (self-hosted)

This page describes how to use the self-hosted **Redocly API reference docs** using the HTML element with the JavaScript snippet hosted on our CDN.

## Prerequisites

- You need to have a [license key](./on-premise.md#on-premise-license-key).
- You need to have an OpenAPI definition and know the relative or absolute path to it. The path would be relative to the HTML page.

## Steps

1. Add any HTML tag to the page that serves as a container for **Redocly API reference docs**.

```html
<div id="redocly_container" />
```

2. Add the `https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js` script to the page.

```html
<script src="https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js"></script>
```

Instead of using the latest version of the script, you can pin it to a specific version. We recommend version pinning for production deployments to prevent potential compatibility issues with the latest version. To pin the script, replace `latest` in the script URL with the exact tag of the version you're targeting. Version tags follow the `vX.Y.Z` format (for example: `v1.4.0`, `v1.5.2`...).

```html
<script src="https://cdn.redoc.ly/reference-docs/v1.5.0/redocly-reference-docs.min.js"></script>
```

3. Host your copy of your OpenAPI files (`apiDefinition`), and be aware of how their path relates to the HTML page.

The path is used like this:

```typescript
RedoclyReferenceDocs.init(
 'path/to/openapi.yaml',
```

4. Call function `init` on the globally exposed `RedoclyReferenceDocs` object with the following signature:

```typescript
RedoclyReferenceDocs.init(
 apiDefinition: string | object,
 options: object = {},
 element: Element,
 callback?: () => void
)
```

The signature includes the following parameters:

- `apiDefinition` – URL to the API definition or the API definition object itself.
- `options` – the options object. For details, see [Configuration](../configuration/functionality.md). This must include your `licenseKey` as shown in the example below.
- `element` – the HTML element of the container. By default, the `<redoc>` element is used.
- `callback` – _(optional)_ function that is called after rendering **Redocly API reference docs** .

## Minimal setup

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redocly API Reference Docs</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />

    <!--
    Redocly doesn't change the outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="redocly_container" />
    <script src="https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js"></script>
    <script>
      RedoclyReferenceDocs.init(
        '<url to the API definition>',
        { licenseKey: '<license-key.here>' },
        document.querySelector('#redocly_container')
      );
    </script>
  </body>
</html>
```

## Example with "Try It" console enabled

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redocly API Reference Docs</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />

    <!--
    Redocly doesn't change the outer page styles
    -->
    <style>
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="redocly_container" />
    <script src="https://cdn.redoc.ly/reference-docs/latest/redocly-reference-docs.min.js"></script>
    <script>
      RedoclyReferenceDocs.init(
        '<url to the API definition>',
        { licenseKey: '<license-key.here>' },
        document.querySelector('#redocly_container')
      );
    </script>
  </body>
</html>
```
