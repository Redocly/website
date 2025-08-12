---
excludeFromSearch: true
seo:
  title: Try-it console configuration
---

# Configure the _Try it_ console

## Security requirements

The API console supports only the security schemes that are [supported by OpenAPI 3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#security-scheme-object).<br>
If you want to support an additional security scheme, [contact us](mailto:contact@redoc.ly) for assistance.

<div class="info">
  <strong> Important </strong>
  <div>Make sure you have correctly documented security in your API definition.</div>
</div>

In case of any issues or questions, [contact us](mailto:contact@redoc.ly).

## Set up the plugin path

If your `console.redocly-reference-docs.min.js` file is not located in the same folder as `redocly-reference-docs.min.js`,
then you have to configure location using the `setPublicPath` method of `Redocly Reference Docs`:

```js
RedoclyReferenceDocs.setPublicPath('https://example.com/path/to/folder/');
```

## Disable _Try it_ panel

To disable the _Try it_ panel, set `hideTryItPanel` option to `true`:

```html
<script>
  RedoclyReferenceDocs.init(
    '<url to the api definition>',
    {
      licenseKey: '<license-key.here>',
      hideTryItPanel: true,
    },
    document.querySelector('#redocly_container'),
  );
</script>
```

To disable the _Try it_ panel for a single operation only, use the `x-hideTryItPanel` specification extension. Set it to `true` on the operation level in your OpenAPI definition:

```yaml
openapi: '3.0'
info: ...
tags: [...]
paths:
  /example:
    get:
      summary: Example summary
      description: Example description
      operationId: examplePath
      responses: [...]
      parameters: [...]
      x-hideTryItPanel: true
```
