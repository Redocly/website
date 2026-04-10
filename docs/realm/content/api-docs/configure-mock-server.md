# Configure mock server

The mock server allows users to send calls to your API operations and see sample responses without the need for backend services.
The mock server is enabled by serving Replay from your API documentation (or a preview) and can be configured to change the experience users have interacting with it.

The mock server is [configured](../../config/mock-server.md) using the `mockServer` option in the Redocly config file.

## Control response behaviors

Use the mock server configuration options to control the response behaviors for your end users, as in the following example:

```yaml {% title="redocly.yaml" %}
mockServer:
  errorIfForcedExampleNotFound: true
  strictExamples: true
```

This example changes the mock server behavior in two ways:

- Instead of returning another example, requests with [specific examples](https://redocly.com/docs/end-user/test-apis-cli#return-a-specific-response-example) return an error.
- Requests to the mock server return examples exactly as they're defined in the OpenAPI description.

### Understand strict examples

The `strictExamples` property controls whether request values are used in the response and can change how "interactive" the mock server feels.
To better understand the behavior, consider the following example:

- A user sends a request to the Museum API's [Update special event](https://redocly.com/demo/openapi/museum-api/events/updatespecialevent) operation.
Their request body updates the event location, `"location": "Community pool"`.

- With `strictExamples` enabled (default), the location is updated in the mock server's response:
    ```json
    {
      "eventId": "dad4bce8-f5cb-4078-a211-995864315e39",
      "name": "Mermaid Treasure Identification and Analysis",
      "location": "Community pool.",
      "eventDescription": "Join us as we review and classify a rare collection of 20 thingamabobs, gadgets, gizmos, whoosits, and whatsits, kindly donated by Ariel.",
      "dates": [
        "2023-09-05",
        "2023-09-08"
      ],
      "price": 15
    }
    ```
- With `strictExamples` _disabled_, the request value is ignored and the response contains only the pre-defined example:
    ```json
    {
      "eventId": "dad4bce8-f5cb-4078-a211-995864315e39",
      "name": "Mermaid Treasure Identification and Analysis",
      "location": "On the beach.",
      "eventDescription": "Join us as we review and classify a rare collection of 20 thingamabobs, gadgets, gizmos, whoosits, and whatsits, kindly donated by Ariel.",
      "dates": [
        "2023-09-05",
        "2023-09-08"
      ],
      "price": 15
    }
    ```

## Disable the mock server

The mock server is enabled by default, but can be disabled using the `off` property, as in the following example:

```yaml {% title="redocly.yaml" %}
mockServer:
  off: true
```

## Hide the mock server

The following example leaves the mock server enabled, but hides it from the environments list:

```yaml {% title="redocly.yaml" %}
mockServer:
  position: 'off'
```

A hidden mock server will still send sample responses to API calls sent using cURL or API clients.

## Change server list

You can modify the location and name of the mock server in the environments dropdown of Replay, as in the following example:

```yaml {% title="redocly.yaml" %}
mockServer:
  position: 'first'
  description: 'Amazing mock server'
```

This example changes what a user sees when they click the environments dropdown in Replay.
The `position` property controls _where_ the mock server is located on the list and `description` controls how it's labeled.

## Resources

- **[Replay API explorer](https://redocly.com/docs/end-user/test-apis-replay)** - Learn about the interactive API testing features and capabilities used in API reference documentation
- **[Add OpenAPI reference docs](./add-openapi-docs.md)** - Set up API documentation in your project
- **[API catalog configuration](../../config/catalog-classic.md)** - Configure catalogs to organize multiple API descriptions with better user experience and navigation
- **[Mock server configuration reference](../../config/mock-server.md)** - Complete configuration options and parameters for mock server setup and customization
