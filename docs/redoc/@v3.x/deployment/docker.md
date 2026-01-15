---
seo:
  title: Use the Redoc CE Docker image
---

# Use Redoc CE Docker image

Redoc CE is available as a pre-built Docker image in [Docker Hub](https://hub.docker.com/r/redocly/redoc/).

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

## Change the OpenAPI description file

A version of the Redocly Museum API is displayed by default.

You can change the description file used in the project, either a local file, or an URL.

### URL

To change the URL of the desctiption file:

- Pass the URL to your description in the `SPEC_URL` environment variable.

For example:

```bash
docker run -p 8080:80 -e SPEC_URL=https://api.example.com/openapi.json redocly/redoc
```

### Local file

To run a local file:

1. Provide volumes into the Docker container, where:
    - `$(pwd)/museum.yaml` is a local machine path to the OpenAPI description file
    - `/usr/share/nginx/html/museum.yaml` is the volume in Docker

2. Provide a file path in `SPEC_URL`:

```bash
docker run -it --rm -p 8080:80 \
  -v $(pwd)/museum.yaml:/usr/share/nginx/html/museum.yaml \
  -e SPEC_URL=museum.yaml redocly/redoc
```

The `$(pwd)` is the path where you run Docker.
In this example above Docker runs from the folder the OpenAPI file (`museum.yaml`) located.


## Create a Dockerfile

You can also create a Dockerfile with some predefined environment variables.
Check out a sample [Dockerfile](https://github.com/Redocly/redoc/blob/main/config/docker/Dockerfile) in our code repo.

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
