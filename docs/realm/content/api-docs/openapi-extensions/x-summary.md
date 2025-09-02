# OpenAPI extension: `x-summary`

Use `x-summary` to add a short custom text to describe the response in the API documentation.
Add it to the `response` OpenAPI object.

If specified, `x-summary` is used as the response button text, and the description is rendered under the button.

## Location

Use the `x-summary` extension in the Response object.

## Options

{% table %}

- Option
- Type
- Description

---

- x-summary
- string
- Short summary of the response.

{% /table %}

## Examples

The following example show how to sets `Bad request` summary of the `400` response.

```yaml
openapi: '3.0'
info:
  ...
tags: [...]
components:
  responses:
   '400':
      description: "Bad Request.
      The request could not be understood by the server due to malformed syntax.
      A possible reason might be that the request contains Unicode characters that cannot be processed."
      x-summary: Bad request
      content:
        application/json:
          schema:
            type: array
              items:
                $ref: '#/components/schemas/example'
```

## Resources

- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
