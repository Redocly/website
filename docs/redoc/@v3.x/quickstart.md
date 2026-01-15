---
seo:
  title: Redoc CE quickstart guide
---

# Redoc CE quickstart guide

To render your OpenAPI description using Redoc CE, use the following HTML code sample and replace the `spec-url` attribute with the URL or local file address to your description file.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redoc CE</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

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
    <!--
    Redoc element with link to your OpenAPI description
    -->
    <redoc spec-url="https://redocly.github.io/redoc/museum.yaml"></redoc>
    <!--
    Link to Redoc script on CDN for rendering standalone element
    -->
    <script type="module" src="https://cdn.redoc.ly/redoc/v3.0.0-rc.0/redoc.standalone.js"></script>
  </body>
</html>
```

{% admonition type="info" name="Redoc CE requires an HTTP server to run locally" %}
To load local OpenAPI descriptions you must run a web server.
This requirement results from the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) and
other security reasons.

See [Local HTTP server](./deployment/intro.md#local-http-server) for detailed installation instructions.
{% /admonition %}

## Resources

- **[Redoc CE deployment guide](./deployment/intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
- **[Configure Redoc CE](./config.md)** - Explore Redoc CE's configuration options
