# Replay OpenAPI Tag [{% markdoc-tag-badge badgeType="Redocly" /%}](./tag-library#redocly-tag-badge)

The `replay-openapi` tag renders the Replay console, which allows users to send API calls to a mock server or live endpoints. Requires an OpenAPI description.

Use the tag to improve user comprehension by helping them make their first API call or guiding them through a complex sequence of calls. The `replay-openapi` tag provides the API interactivity built into the API documentation and exposes it as an inline tool to supplement your writing.

## Syntax and usage

Pass a filepath to an OpenAPI description using the `descriptionFile` attribute. Include either an `operationId` or `pointer` to reference a specific operation. The other attributes are optional, but can be used to modify the experience for your end-users.

Using `operationId`:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% replay-openapi
    descriptionFile="../../../demo/openapi/museum-api.yaml"
    operationId="getMuseumHours"
  /%}
  ```
{% /markdoc-example %}

Using `pointer`:

{% markdoc-example %}
  ``` {% process=false %}
  {% replay-openapi
    descriptionFile="../../openapi/museum-api.yaml"
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

- `descriptionFile`
- String
- **REQUIRED.** A path to an OpenAPI description.

---

- `operationId`
- String
- ID of the operation inside the OpenAPI description. Required if `pointer` is not specified.

---

- `pointer`
- String
- Pointer to an operation inside the OpenAPI description. Required if `operationId` is not specified. Slashes used on endpoints must be encoded with ~1 -- i.e. `/paths/~1some-endpoint/post`.

---

- `exampleKey`
- String
- Key specifying which example to use. Must match the key used for an operation's example in the OpenAPI description.

---

- `parameters`
- Object
- Custom parameters to use for the OpenAPI operation. Accepts values for `header` and `query`.

---

- `requestBody`
- Object
- Defines an inline request body to use. Replaces any request body in the example.

---

- `mimeType`
- String
- Mime type to use in the Replay console.

---

- `environment`
- String
- Limit the environment picker in the Replay console to a specific environment.

---

- `environments`
- Object
- Predefined environment variables that resolve to the Replay console.

{% /table %}

## Examples

### Basic usage

The Redocly OpenAPI tag can render example payloads defined in the OpenAPI description, as in the following example:

{% markdoc-example %}
  ``` {% process=false %}
  {% replay-openapi
    descriptionFile="../../../demo/openapi/museum-api.yaml"
    operationId="buyMuseumTickets"
    exampleKey="event_entry"
  /%}
  ```
{% /markdoc-example %}

{% replay-openapi
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="buyMuseumTickets"
  exampleKey="event_entry"
/%}

### With custom parameters

You can pre-fill parameter values in your query and request header, as in the following example:

{% markdoc-example %}
  ``` {% process=false %}
  {% replay-openapi
    descriptionFile="../../../demo/openapi/museum-api.yaml"
    operationId="listSpecialEvents"
    parameters={
      query: {
        limit: 10
      },
      header: {
        exampleKey: "exampleValue"
      }
    }
  /%}
  ```
{% /markdoc-example %}

{% replay-openapi
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="listSpecialEvents"
  parameters={
    query: {
      limit: 10
    },
    header: {
      exampleKey: "exampleValue"
    }
  }
/%}

### With custom requestBody

The `requestBody` attribute allows you to define example payloads directly in the tag, as in the following example:

{% markdoc-example %}
  ``` {% process=false %}
  {% replay-openapi
    descriptionFile="../../../demo/openapi/museum-api.yaml"
    operationId="createSpecialEvent"
    requestBody={
      name: "Find the museum curator's hat",
      location: "Somewhere in the museum... we hope.",
      eventDescription: "The curator misplaced his hat. Please help us find it!",
      dates: ["2024-05-07T00:00:00.000Z"],
      price: 0,
    }
  /%}
  ```
{% /markdoc-example %}

{% replay-openapi
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="createSpecialEvent"
  requestBody={
    name: "Find the museum curator's hat",
    location: "Somewhere in the museum... we hope.",
    eventDescription: "The curator misplaced his hat. Please help us find it!",
    dates: ["2024-05-07"],
    price: 0,
  }
/%}

### With pre-defined environment variables

You can use environment variables to add values that resolve to the example payload, as in the following example:

{% markdoc-example %}
  ``` {% process=false %}
  {% replay-openapi
    descriptionFile="../../../demo/openapi/museum-api.yaml"
    operationId="updateSpecialEvent"
    environment="Mock server"
    environments={
      "Mock server": {
        "MuseumPlaceholderAuth_username": "custom-username",
        "MuseumPlaceholderAuth_password": "custom-password",
        "eventId": "dad4bce8-f5cb-4078-a211-995864315e39"
      }
    }
    requestBody={
      location: "Atlantica",
    }
  /%}
  ```
{% /markdoc-example %}

{% replay-openapi
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="updateSpecialEvent"
  environment="Mock server"
  environments={
    "Mock server": {
      "MuseumPlaceholderAuth_username": "custom-username",
      "MuseumPlaceholderAuth_password": "custom-password",
      "eventId": "dad4bce8-f5cb-4078-a211-995864315e39"
    }
  }
  requestBody={
    location: "Atlantica",
  }
/%}

## Best practices

**Provide clear instructions**

Offer clear, concise instructions on how you want users to interact with and navigate the Replay console. This will help improve user satisfaction by reducing confusion and friction.

**Pre-configure requests**

Use the attributes to pre-configure the requests in your Replay console. This streamlines their interactions with your API and encourages users to explore.

**Educate users**

Embrace the Replay console as an educational resource that can empower your users. Giving users deeper knowledge about your API's functionality and usage helps foster their confidence.
