# OpenAPI response sample tag

The `openapi-response-sample` tag renders response examples directly in your documentation, showing users the expected responses from API operations defined in your OpenAPI description.

## Syntax and usage

To use the tag, pass the filepath of your OpenAPI description using the `descriptionFile` attribute and a reference to the specific operation using either `operationId` or `pointer`.
You can also use additional attributes to configure the response example element rendered in the document.

With `operationId`:

{% markdoc-example %}
  ```markdoc {% process=false title="hello" %}
  {% openapi-response-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="getMuseumHours"
  /%}
  ```
{% /markdoc-example %}

With `pointer`:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% openapi-response-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    pointer="/paths/~1museum-hours/get"
  /%}
  ```
{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- descriptionFile
- string
- **REQUIRED.**
  A path to an OpenAPI description.

---

- operationId
- string
- ID of the operation inside the OpenAPI description.
  Required if `pointer` is not specified.

---

- pointer
- string
- Pointer to an operation inside the OpenAPI description.
  Required if `operationId` is not specified.
  Slashes used on endpoints must be encoded with `~1`, for example, `/paths/~1some-endpoint/post`.

---

- exampleKey
- string
- Key specifying which example to use.
  Must match the key used for an operation's example in the OpenAPI description.

{% /table %}

## Best practices

**Customize for flexibility**

The various attributes give you a lot of flexibility to customize the response example, allowing you to meet a more diverse range of API scenarios.
You can use them to tailor the response examples to the specific needs of your users.

**Document response examples**

Pair response examples with comprehensive documentation.
Explain the purpose of each example, the expected behavior, and any modifications that users might need to make.
This way you can help your users to successfully build with your API.
