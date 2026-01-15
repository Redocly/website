---
seo:
  title: Redoc CE quickstart guide
---

# Redoc CE quickstart guide

To render your OpenAPI description using Redoc CE, use the following HTML code sample and replace the `spec-url` attribute with the URL or local file address to your description.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Redoc CE</title>
    <!-- needed for adaptive design -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700"
      rel="stylesheet"
    />

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
    Redoc CE element with link to your OpenAPI description
    -->
    <redoc spec-url="http://petstore.swagger.io/v2/swagger.json"></redoc>
    <!--
    Link to Redoc CE JavaScript on CDN for rendering standalone element
    -->
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
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
