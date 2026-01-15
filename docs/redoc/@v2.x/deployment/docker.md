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

## Change the OpenAPI description URL

By default, Redoc CE starts with a demo Swagger Petstore OpenAPI description file located at http://petstore.swagger.io/v2/swagger.json.

To change the description URL:

- Pass the URL to your description in the `SPEC_URL` environment variable.

For example:

```bash
docker run -p 8080:80 -e SPEC_URL=https://api.example.com/openapi.json redocly/redoc
```

## Create a Dockerfile

You can also create a Dockerfile with predefined environment variables.
Check out a sample [Dockerfile](https://github.com/Redocly/redoc/blob/main/config/docker/Dockerfile) in our code repo.

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
