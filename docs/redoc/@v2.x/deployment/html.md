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
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">

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
      <redoc spec-url='http://petstore.swagger.io/v2/swagger.json'></redoc>
      <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
    </body>
  </html>
  ```

1. Replace the value of `spec-url` with either:
   - a relative path to a local OpenAPI description file, for example: `spec-url=my-api.yaml`
   - a full URL, for example: `http://petstore.swagger.io/v2/swagger.json`
  If you use a relative path, Redoc CE requires an HTTP server to run API documentation locally.

To test the HTML file, open it in your browser.
If you use a relative path, to run the API documentation locally, you need to [simulate an HTTP server](./intro.md#local-http-server).

## Configure Redoc CE

Redoc CE is highly configurable - see the [full list of configuration options](../config.md).

To configure Redoc CE in HTML:

- Add the property names to the HTML tag.

  The following example makes all the required properties display at the top of the list:

  ```html
      <redoc spec-url='http://petstore.swagger.io/v2/swagger.json' required-props-first=true></redoc>
  ```

You can add as many Redoc CE configuration properties as you need.

### Theme configuration

The `theme` configuration setting represents many nested options.
You can supply these options as a JSON string to the `theme` attribute.

For example, to change the sidebar color:

```html
    <redoc spec-url='http://petstore.swagger.io/v2/swagger.json'
       required-props-first=true
       theme='{
         "sidebar": {
           "backgroundColor": "lightblue"
         }
       }'
    ></redoc>
```

Check out the [list of options for theme configuration](../config.md#theme-settings) and create the configuration that suits your API needs.

## Advanced options

### The Redoc CE object

As an alternative to the HTML tag, you can also initialise Redoc CE in a web page using the Redoc CE object and invoking it from JavaScript.
Use this method to create dynamic content in a page.
It is also a way to attach the Redoc CE element to an existing container.

The Redoc CE object offers an `init` function:

```js
Redoc.init(specOrSpecUrl, options, element, callback)
```

Where:

- `specOrSpecUrl`: either a JSON object with the OpenAPI description, or a file name or URL to the
  description in JSON or YAML format
- `options`: Redoc CE [configuration options](../config.md)
- `element`: DOM element Redoc CE is inserted into
- `callback`(optional): callback to be called after Redoc CE has been fully rendered, also called on errors with `error` as the first argument

To use the Redoc object:

- Call `Redoc.init()` from the JavaScript on a web page to add the element to a named container.

The following example is an HTML page with a `<div>` tag, and the script to add the Redoc object to it.
This example also sets the configuration for `expandResponses` so all 200 and 400 status responses are displayed with their details visible when the page loads.

```html
<!DOCTYPE html>
<html>
  <head />
  <body>
    <H1>Redoc CE in action</H1>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
    <div id="redoc-container"></div>

    <script>
      Redoc.init('http://petstore.swagger.io/v2/swagger.json', {
        "expandResponses": "200,400"
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
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
    ```

  {% /tab %}

  {% tab label="Self-host dependencies" %}

    To host the dependencies yourself:

    1. Install `redoc` using `npm` or `yarn`.

    ```sh
    npm install redoc
    ```

    1. Reference the Redoc CE script with a node modules link.

    ```html
    <script src="node_modules/redoc/bundles/redoc.standalone.js"> </script>
    ```

  {% /tab %}
{% /tabs %}

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
