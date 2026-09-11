---
seo:
  title: Use the Redoc CE Docker image
---

# Use Redoc CE Docker image

Redoc CE is available as a pre-built Docker image in [Docker Hub](https://hub.docker.com/r/redocly/redoc/).
The image serves the standalone HTML page with nginx and takes its configuration from environment variables.

## Before you begin

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed.

## Build API documentation

1. Pull the image with the following command:

    ```bash
    docker pull redocly/redoc
    ```

1. Run the image:

    ```bash
    docker run -p 8080:80 redocly/redoc
    ```

The preview starts on port 8080, based on the port used in the command.
You can access the preview at `http://localhost:8080`.

To exit the preview, press <kbd>control</kbd>+<kbd>C</kbd>.

## Change the API description file

A version of the Redocly Museum API is displayed by default.

You can change the description file used in the project: either a local file, or a URL.
The description can be an OpenAPI, AsyncAPI, or GraphQL file, see [Supported specifications](../supported-specifications.md).

### URL

To change the URL of the description file:

- Pass the URL to your description in the `SPEC_URL` environment variable.

For example:

```bash
docker run -p 8080:80 -e SPEC_URL=https://api.example.com/openapi.json redocly/redoc
```

The same variable serves an AsyncAPI document or a GraphQL schema:

```bash
docker run -p 8080:80 -e SPEC_URL=https://redocly.github.io/redoc/3.x/cafe-asyncapi.yaml redocly/redoc
```

### Local file

To run a local file:

1. Mount the file into the nginx web root, `/usr/share/nginx/html`, where:
    - `$(pwd)/cafe.yaml` is the path to the description file on your machine
    - `/usr/share/nginx/html/cafe.yaml` is the path inside the container

1. Set `SPEC_URL` to the file path relative to the web root:

    ```bash
    docker run -it --rm -p 8080:80 \
      -v $(pwd)/cafe.yaml:/usr/share/nginx/html/cafe.yaml \
      -e SPEC_URL=cafe.yaml redocly/redoc
    ```

`$(pwd)` is the directory where you run Docker.
In the example above, Docker runs from the folder that contains `cafe.yaml`.

To serve several files, mount a folder instead: `-v $(pwd)/specs/:/usr/share/nginx/html/specs/` together with `-e SPEC_URL=specs/openapi.yaml`.

## Configure the container

{% table %}

- Variable
- Description

---

- SPEC_URL
- URL or path of the API description.
  Default: `https://cdn.redocly.com/redoc/museum-api.yaml`.

---

- REDOC_OPTIONS
- [Configuration options](../config.md) written as `<redoc>` attributes, for example `layout="stacked" disable-telemetry="true"`.
  The value is inserted into the `<redoc>` element as written.

---

- PAGE_TITLE
- Title of the HTML page.
  Default: `ReDoc`.

---

- PAGE_FAVICON
- URL of the page favicon.
  Default: `favicon.png`, an icon shipped with the image.

---

- BASE_PATH
- Path prefix to serve the documentation under, without slashes.
  For example, `docs` serves the page at `/docs`.
  Not set by default.

---

- PORT
- Port nginx listens on inside the container.
  Default: `80`.

---

- HOST
- nginx `server_name`.
  Default: `localhost`.

{% /table %}

### Pass configuration options

Pass any [configuration option](../config.md) in `REDOC_OPTIONS`, using the same kebab-case attributes as the [HTML element](./html.md#configure-redoc-ce):

```bash
docker run -p 8080:80 \
  -e SPEC_URL=https://api.example.com/openapi.json \
  -e REDOC_OPTIONS='layout="stacked" sort-required-props-first="true" disable-telemetry="true"' \
  redocly/redoc
```

### Serve under a path prefix

Set `BASE_PATH` to serve the documentation from a sub-path, for example behind a reverse proxy.
The bundle, favicon, and stylesheet are then served under the prefix, and requests outside the prefix return `404`.
A local description file must be referenced with the prefix as well:

```bash
docker run -p 8080:8080 \
  -e PORT=8080 \
  -e BASE_PATH=docs \
  -v $(pwd)/cafe.yaml:/usr/share/nginx/html/cafe.yaml \
  -e SPEC_URL=/docs/cafe.yaml \
  redocly/redoc
```

The documentation is available at `http://localhost:8080/docs`.
Deep links use hash routing by default, so the prefix needs no extra nginx configuration.

## Create a Dockerfile

You can also build your own image, for example to bake in environment variables or to ship a description file inside the image.
Check out the [Dockerfile](https://github.com/Redocly/redoc/blob/main/config/docker/Dockerfile) in the Redoc CE repository, in the `config/docker` folder.

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Step-by-step instructions for setting up your Redoc CE project
- **[Use Redoc CE in HTML](./html.md)** - The attribute rules that apply to `REDOC_OPTIONS`
- **[Configure Redoc CE](../config.md)** - Every option you can pass in `REDOC_OPTIONS`
