---
seo:
  title: Redoc CE deployment guide
---

# Redoc CE deployment guide

Redoc CE offers multiple ways of rendering your API description.
Choose a method that best suits your needs.

Redoc CE supports the following rendering methods:

- **[Redocly CLI](./cli.md):** build a single HTML file with your documentation from the command line.
- **[HTML element](./html.md):** add a `<redoc>` element and a script tag to any web page.
  Use this method for typical website deployments.
- **[JavaScript `init` function](./html.md#the-init-function):** initialize Redoc CE from your own script.
  Use this method to render into an existing container, or to pass options that are objects or arrays.
- **[React component](./react.md):** render API documentation in a React-based application.
- **[Frontend frameworks](./frameworks.md):** render API documentation in Vue, Angular, Next.js, or any other framework.
- **[Docker image](./docker.md):** serve the documentation from a container, configured with environment variables.

All methods share the same [configuration options](../config.md).
Every method renders OpenAPI, AsyncAPI, and GraphQL descriptions, see [Supported specifications](../supported-specifications.md).

## Before you begin

To work with Redoc CE, make sure you have:

- an API description file
- a utility that simulates an HTTP server

### API description

You need a JSON or YAML file that contains an OpenAPI or AsyncAPI description, or a `.graphql` file that contains a GraphQL schema.
For testing purposes, you can use one of the following sample OpenAPI description files:

- OpenAPI 3.2
  - [Redocly Cafe API](https://redocly.github.io/redoc/cafe.yaml)
- OpenAPI 3.0
  - [Museum Example API](https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml)
  - [Petstore Sample OpenAPI description](https://petstore3.swagger.io/api/v3/openapi.json)
- OpenAPI 2.0
  - [Thingful OpenAPI description](https://raw.githubusercontent.com/thingful/openapi-spec/master/spec/swagger.yaml)
  - [Fitbit Plus OpenAPI description](https://raw.githubusercontent.com/TwineHealth/TwineDeveloperDocs/master/spec/swagger.yaml)
- AsyncAPI
  - [Redocly Cafe events](https://redocly.github.io/redoc/3.x/cafe-asyncapi.yaml)
- GraphQL
  - [Redocly Cafe schema](https://redocly.github.io/redoc/3.x/cafe.graphql)

Swagger 2.0 descriptions are converted to OpenAPI 3 before rendering.

{% admonition type="info" name="OpenAPI specification" %}
For more information on the OpenAPI specification, see [Learning OpenAPI 3](https://redocly.com/docs/resources/learning-openapi/).
{% /admonition %}

### Local HTTP server

The Redoc CE script is an ES module, so browsers only load it from a page served over HTTP.
To view your Redoc CE output locally, you can simulate an HTTP server.

#### Python

To start an HTTP server with [Python](https://www.python.org/downloads/):

{% tabs %}
  {% tab label="Python 3" %}
    1. `cd` into your project directory.
    1. Run the following command:

    ```python
    python3 -m http.server
    ```

  {% /tab %}
  {% tab label="Python 2" %}
    1. `cd` into your project directory.
    1. Run the following command:

    ```python
    python -m SimpleHTTPServer 8000
    ```

  {% /tab %}
{% /tabs %}

The output provides a local URL where the preview can be accessed.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

#### Node.js

To start a local server with [Node.js](https://nodejs.org/en/download/), run the following command in your project directory:

```bash
npx http-server
```

`npx` downloads `http-server` on first use and starts it.
The output provides the local URL where you can access the preview.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

## Resources

- **[Redoc CE quickstart guide](../quickstart.md)** - Build documentation from an API description in one HTML file
- **[Supported specifications](../supported-specifications.md)** - Supported OpenAPI, AsyncAPI, GraphQL, and MCP inputs and the detection rules
- **[Learning OpenAPI 3](https://redocly.com/docs/resources/learning-openapi/)** - The OpenAPI 3.x specification
- **[Configure Redoc CE](../config.md)** - Configuration options for Redoc CE 3.x
