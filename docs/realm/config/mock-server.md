---
products:
  - Redoc
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `mockServer`

Configure the mock server in your Redocly-powered API documentation using `mockServer`. The mock server allows users to:

- Send requests to the Operations in your API description from Replay, cURL, or any other API client.
- Receive a sample response using information from the API description and input data.

By default, the mock server is enabled for each [API description](https://redocly.com/docs/resources/learning-openapi) in your project.
The path is configured as `/_mock/<path-to-description>/`.
For example, `/_mock/openapi/redocly-museum/`.

## Options

{% table %}

- Option
- Type
- Description

---

- off
- boolean
- Turn off ("disable") the mock server.
  Defaults to `false`.

---

- strictExamples
- boolean
-
  If `true`, example responses are returned unmodified, exactly how they're described in the API description.

  If `false`, the mock server substitutes fields in the response payload with values provided in the request.

  Defaults to `false`.

---

- errorIfForcedExampleNotFound
- boolean
-
  Controls the response behavior of the mock server when a [forced example](../content/api-docs/configure-mock-server.md#understand-strict-examples) is not found.

  If `true`, the mock server returns an error.
  If `false`, the mock server falls back to any other example defined for that operation.

  Defaults to `false`.

---

- position
- string
-
  Controls the position of the mock server in the servers dropdown in Redocly Replay.

  Possible values:`first`, `last`, `replace`, `off`.

  Defaults to `first`.

---

- description
- string
- Set the description of the mock server in the servers dropdown in Redocly Replay.
  Defaults to `Mock Server`.

{% /table %}

## Examples

This example configures the mock server in the following ways:

- Example response payloads don't substitute values from the request
- Only the mock server is available on Replay's server list
- The mock server is labeled as "Development server"

```yaml
mockServer:
  strictExamples: true
  position: 'replace'
  description: 'Development Server'
```

## Resources

- **[Configure the mock server](../content/api-docs/configure-mock-server.md)** - Learn to modify mock server behavior and appearance for enhanced API testing and development
- **[Replay API explorer](../content/api-docs/replay.md)** - Discover the interactive API explorer used to call the mock server and test API endpoints
- **[Add OpenAPI descriptions](../content/api-docs/add-openapi-docs.md)** - Add OpenAPI descriptions to enable mock server functionality on the corresponding API reference documentation
