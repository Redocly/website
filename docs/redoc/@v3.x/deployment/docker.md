---
seo:
  title: Use the Redoc Docker image
---

# How to use the Redoc Docker image

Redoc is available as a pre-built Docker image in [Docker Hub](https://hub.docker.com/r/redocly/redoc/).

If you have [Docker](https://docs.docker.com/get-docker/) installed, pull the image with the following command:

```docker
docker pull redocly/redoc
```

Then run the image with the following command:

```docker
docker run -p 8080:80 redocly/redoc
```

The preview starts on port 8080, based on the port used in the command, and can be accessed at `http://localhost:8080`.
To exit the preview, use `control+C`.

A version of the Redocly Museum API is displayed by default.
You can update this URL using the environment variable `SPEC_URL`.

For example:

```bash
docker run -p 8080:80 -e SPEC_URL=https://api.example.com/openapi.json redocly/redoc
```

To run some local file you should provide volumes into docker container, where `$(pwd)/museum.yaml` is some local machine path where is your OpenAPI file located, and `/usr/share/nginx/html/museum.yaml` - volumes in docker.
Then you can provide a file path in `SPEC_URL`:

```bash
docker run -it --rm -p 8080:80 \
  -v $(pwd)/museum.yaml:/usr/share/nginx/html/museum.yaml \
  -e SPEC_URL=museum.yaml redocly/redoc
```
{% admonition type="info" name="" %}
The `$(pwd)` is the path where you run docker, in the example above you run docker from the folder where your OpenAPI file (`museum.yaml`) located.
{% /admonition %}

## Create a Dockerfile

You can also create a Dockerfile with some predefined environment variables. Check out
a sample [Dockerfile](https://github.com/Redocly/redoc/blob/main/config/docker/Dockerfile)
in our code repo.
