# OpenAPI code sample tag

The `openapi-code-sample` tag renders sample code snippets directly in your documentation, showing users how to interact with API operations defined in your OpenAPI description.

## Syntax and usage

To use the tag, pass the filepath of your OpenAPI description using the `descriptionFile` attribute and a reference to the specific operation using either `operationId` or `pointer`.
You can also use additional attributes to configure the code sample element rendered in the document.

With `operationId`:

{% markdoc-example %}
  ```markdoc {% process=false title="hello" %}
  {% openapi-code-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="getMuseumHours"
  /%}
  ```
{% /markdoc-example %}

With `pointer`:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% openapi-code-sample
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
  Slashes used on endpoints must be encoded with ~1 -- for example, `/paths/~1some-endpoint/post`.

---

- exampleKey
- string
- Key specifying which example to use.
  Must match the key used for an operation's example in the OpenAPI description.

---

- language
- string
- Limits the code sample to a specific language.
  Works with the following values (case sensitive): Payload, curl, C#, Node.js, JavaScript, Python, R, Ruby, PHP, Go, Java.

---

- parameters
- object
- Custom parameters to use for the OpenAPI operation code sample.
  Accepts values for `header` and `query`.

---

- requestBody
- object
- Defines an inline request body to use.
  Replaces any request body in the code sample.

---

- environment
- string
- Limits the environment picker in the code sample to a specific server defined in the OpenAPI description.

---

- environments
- object
- Provide environment variables that resolve to your code sample.
  Variables are based on your OpenAPI description's `securitySchemes`.
  See [environment variables](#environment-variables).

{% /table %}

### Environment variables

The environment variables available in the code sample correspond with your security schemes.
The name of the security scheme must be used in the variable. Here's a list of available variables:

- Basic auth = `SchemeName_username` and `SchemeName_password`
- JWT token or OAuth token = `SchemeName_token`
- OAuth credentials = `SchemeName_client_id` and `SchemeName_client_secret`
- API key auth does not have a suffix, so the variable is `SchemeName`

By prefilling security credentials for logged in users, you can provide code samples that are fully ready to execute.

For example:

{% markdoc-example %}
  ``` {% process=false %}
  {% openapi-code-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="createSpecialEvent"
    environment="https://api.fake-museum-example.com/v1"
    environments={
      "https://api.fake-museum-example.com/v1": {
        "MuseumOAuth_token": $user-props.token,
      }
    }
  /%}
  ```
{% /markdoc-example %}

## Examples

### Basic usage

By default, the tag renders a code sample in multiple languages for a specific API operation, as in the following example:

{% markdoc-example %}
  ``` {% process=false %}
  {% openapi-code-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="createSpecialEvent"
  /%}
  ```
{% /markdoc-example %}

{% openapi-code-sample
  descriptionFile="../../../openapi-files/redocly-museum.yaml"
  operationId="createSpecialEvent"
/%}

### With single language

You can restrict the code sample to a specific language using the `language` attribute.
The following example limits the code sample to JavaScript:

{% markdoc-example %}
  ``` {% process=false %}
  {% openapi-code-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="createSpecialEvent"
    language="JavaScript"
  /%}
  ```
{% /markdoc-example %}

{% openapi-code-sample
  descriptionFile="../../../openapi-files/redocly-museum.yaml"
  operationId="createSpecialEvent"
  language="JavaScript"
/%}

### With pre-defined values

You can use various attributes to provide values that resolve to the rendered element.
The following example includes pre-defined parameters and environment variables.

{% markdoc-example %}
  ``` {% process=false %}
  {% openapi-code-sample
    descriptionFile="../../../openapi-files/redocly-museum.yaml"
    operationId="deleteSpecialEvent"
    language="curl"
    parameters={
      path: {
        eventId: "dad4bce8-f5cb-4078-a211-995864315e39"
      }
    }
    environment="https://api.fake-museum-example.com/v1"
    environments={
      "https://api.fake-museum-example.com/v1": {
        "MuseumPlaceholderAuth_username": "custom-username",
        "MuseumPlaceholderAuth_password": "custom-password"
      }
    }
  /%}
  ```
{% /markdoc-example %}

{% openapi-code-sample
  descriptionFile="../../../openapi-files/redocly-museum.yaml"
  operationId="deleteSpecialEvent"
  language="curl"
  parameters={
    path: {
      eventId: "dad4bce8-f5cb-4078-a211-995864315e39"
    }
  }
  environment="https://api.fake-museum-example.com/v1"
  environments={
    "https://api.fake-museum-example.com/v1": {
      "MuseumPlaceholderAuth_username": "custom-username",
      "MuseumPlaceholderAuth_password": "custom-password"
    }
  }
/%}

## Best practices

**Customize for flexibility**

The various attributes give you a lot of flexibility to customize the code sample, allowing you to meet a more diverse range of API scenarios.
You can use them to tailor the code samples to the specific needs of your users.

**Document code samples**

Pair code samples with comprehensive documentation. Explain the purpose of each sample, the expected behavior, and any modifications that users might need to make.
This way you can help your users to successfully build with your API.
