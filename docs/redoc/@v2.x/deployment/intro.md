---
seo:
  title: Redoc CE deployment guide
---

# Redoc CE deployment guide

Redoc CE offers multiple ways of rendering your OpenAPI description.
Choose a method that best suits your needs.

Redoc CE supports the following rendering methods:

- **[Live demo](https://redocly.github.io/redoc/):**
  The live demo offers a fast way to see how your OpenAPI renders with Redoc CE.
  A version of the Redocly Museum API is displayed by default.
  To test it with your own OpenAPI description, enter the URL for your description and select **Try it**.
- **[HTML element](./html.md):**
  Using the HTML element works well for typical website deployments.
- **[React component](./react.md):**
  Using the React component is an option for users with a React-based application.
- **[Docker image](./docker.md):**
  Using the Docker image works in a container-based deployment.
- **[Redocly CLI](./cli.md):**
  Using the Redocly CLI is an option for users who prefer to use a command-line interface.

## Before you begin

To work with Redoc CE, make sure you have:

- an OpenAPI description file
- a utility that simulates an HTTP server

### OpenAPI description

You need an OpenAPI description.
For testing purposes, you can use one of the following sample OpenAPI descriptions:

- OpenAPI 3.0
  - [Museum Example API](https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml)
  - [Petstore Sample OpenAPI description](https://petstore3.swagger.io/api/v3/openapi.json)
- OpenAPI 2.0
  - [Thingful OpenAPI description](https://raw.githubusercontent.com/thingful/openapi-spec/master/spec/swagger.yaml)
  - [Fitbit Plus OpenAPI description](https://raw.githubusercontent.com/TwineHealth/TwineDeveloperDocs/master/spec/swagger.yaml)

### Local HTTP server

To view your Redoc CE output locally, you can simulate an HTTP server.

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

The output provides the local URL where you can access the preview.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

#### Node.js

To install `http-server` with [Node.js](https://nodejs.org/en/download/):

1. In your CLI, in your project directory, run the the following command:

```bash
npx http-server
```

1. After the installation completes, run:

```bash
http-server
```

The output provides the local URL where you can access the preview.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

## Resources

- **[Redoc CE quickstart guide](../quickstart.md)** - Start working with Redoc CE
- **[Configure Redoc CE](../config.md)** - Explore Redoc CE's configuration options
- **[Learning OpenAPI 3](https://redocly.com/docs/resources/learning-openapi/)** - Learn the OpenAPI 3.x specification
