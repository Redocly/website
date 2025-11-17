---
seo:
  title: Redoc deployment guide
---

# Redoc deployment guide

Redoc offers multiple ways of rendering your OpenAPI description.
Choose a method that best suits your needs.

Redoc supports the following rendering methods:

- **[Live demo](https://redocly.github.io/redoc/):** enables to see how your OpenAPI renders with Redoc.
  A version of the Redocly Museum API is displayed by default.
  To test it with your own OpenAPI description, enter the URL for your description and select **Try it**.
- **[HTML element](./html.md):** use this method to render API documentation for typical website deployments.
- **[Redocly CLI](https://redocly.com/docs/cli):**
  Use the Redocly CLI [`build-docs`](https://redocly.com/docs/cli) to generate an HTML page with your docs on your local machine.
- **[React component](./react.md):**
  Use the React component to render API documentation in a React-based application.
- **[Docker image](./docker.md):**
  Use the Docker image when you work in a container-based deployment.

## Before you begin

To work with Redoc, make sure you have:

- an OpenAPI description file
- a utility that simulates an HTTP server

### OpenAPI description

You need a JSON or YAML file that contains an OpenAPI description.
For testing purposes, you can use one of the following sample OpenAPI description files:

- OpenAPI 3.0
  - [Museum Example API](https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml)
  - [Petstore Sample OpenAPI description](https://petstore3.swagger.io/api/v3/openapi.json)
- OpenAPI 2.0
  - [Thingful OpenAPI description](https://raw.githubusercontent.com/thingful/openapi-spec/master/spec/swagger.yaml)
  - [Fitbit Plus OpenAPI description](https://raw.githubusercontent.com/TwineHealth/TwineDeveloperDocs/master/spec/swagger.yaml)

{% admonition type="info" name="OpenAPI specification" %}
For more information on the OpenAPI specification, see [Learning OpenAPI 3](https://redocly.com/docs/resources/learning-openapi/).
{% /admonition %}

### Local HTTP server

To view your Redoc output locally, you can simulate an HTTP server.

#### Python

To install an HTTP server with [Python](https://www.python.org/downloads/):

{% cards %}
  {% card title="Python 3" %}
      1. `cd` into your project directory.
      2.  run the following command:

      ```python
      python3 -m http.server
      ```

  {% /card %}
  {% card title="Python 2" %}
    1. `cd` into your project directory.
    2.  run the following command:

    ```python
    python -m SimpleHTTPServer 8000
    ```

  {% /card %}
{% /cards %}

The output provides a local URL where the preview can be accessed.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

#### Node.js

To install `http-server` with [Node.js](https://nodejs.org/en/download/):

1. In your CLI, run the the following command:

```bash
npm install -g http-server
```

1. `cd` into your project directory and run:

```node
http-server
```

The output provides the local URL where you can access the preview.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

## Resources

- **[Redoc quickstart guide](../quickstart.md)** - Start working with Redoc