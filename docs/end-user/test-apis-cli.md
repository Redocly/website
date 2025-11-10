# Test APIs using CLI

Use the cURL app in a command-line interface (CLI) tool of your choice to make calls to APIs in your project.

You can send requests to servers listed on API documentation page, or to Redocly mock server.

## Use cURL to call an API operation

To send an API request using cURL:

1. Go to the API documentation page for the operation you want to call.
1. Copy the curl command from the code samples.
1. (Optional) To change the server, scroll to the **Servers** section of the API documentation page, click the **Copy** icon next to a server URL, and paste the value into your command.
1. Update the values in the curl command as needed.

  For example:

  ```curl {% title="cURL command to call Update special event operation" %}
  curl -i -X PATCH \
      -u : \
      'https://redocly.com/_mock/docs/openapi/museum-api/special-events/dad4bce8-f5cb-4078-a211-995864315e39' \
      -H 'Content-Type: application/json' \
      -d '{
          "location": "Under the sea."
      }'
  ```
1. Run the curl command in a CLI tool.

The CLI tool outputs a response from the server.

```bash cURL mock server response
HTTP/2 200
access-control-allow-credentials: true
access-control-allow-headers: *
access-control-allow-methods: *
access-control-allow-origin: *
alt-svc: h3=":443"; ma=2592000
content-type: application/json
date: Thu, 11 Jul 2024 17:24:24 GMT
server: Caddy
strict-transport-security: max-age=31536000;
x-content-type-options: nosniff
x-frame-options: deny
x-xss-protection: 1;mode=block;

{"eventId":"dad4bce8-f5cb-4078-a211-995864315e39","name":"Mermaid Treasure Identification and Analysis","location":"Under the sea.","eventDescription":"Join us as we review and classify a rare collection of 20 thingamabobs, gadgets, gizmos, whoosits, and whatsits, kindly donated by Ariel.","dates":["2023-09-05","2023-09-08"],"price":15}%
```

## Return a specific response example

Force the Redocly mock server to respond with a specific example from the API description using the `x-redocly-response-body-example` header to pass the example's name.

The following example forces a response for a `general_entry` ticket from the Museum API's mock server:

```curl
curl -i -X POST \
    -u : \
    https://redocly.com/_mock/docs/openapi/museum-api/tickets \
    -H 'x-redocly-response-body-example: general_entry' \
    -H 'Content-Type: application/json' \
    -d '{
        "ticketType": "event",
        "eventId": "dad4bce8-f5cb-4078-a211-995864315e39",
        "ticketDate": "2023-09-05",
        "email": "dave@example.com"
    }'
```

The following example forces a response for an `event_entry` ticket from the Museum API's mock server:

```curl
curl -i -X POST \
    -u : \
    https://redocly.com/_mock/docs/openapi/museum-api/tickets \
    -H 'x-redocly-response-body-example: event_entry' \
    -H 'Content-Type: application/json' \
    -d '{
        "ticketType": "general",
        "ticketDate": "2023-09-07",
        "email": "dave@example.com"
    }'
```

{% admonition type="info" %}
If you call the Redocly mock server and no match is found for the named example passed in the header, the mock server, depending on its configuration, does one of the following:

- throws an error
- returns another example for that operation
{% /admonition %}

## Resources

- [Interact with API documentation](./interact-with-api.md)
- [Test APIs using Replay](./test-apis-replay.md)
- [Use a classic catalog](./use-classic-catalog.md)
- Explore other ways you can interact with the [user interface](./index.md)
