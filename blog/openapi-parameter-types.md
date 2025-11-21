---
template: ../@theme/templates/BlogPost
title: OpenAPI parameter types for great API design
description: Great API design makes for great API experience. Pick the parameter type that's going to make everything easier for your user.
seo:
  title: OpenAPI parameter types for great API design
  description: Great API design makes for great API experience. Pick the parameter type that's going to make everything easier for your user.
author: lorna-mitchell
date: "2024-06-06"
categories:
  - api-specifications:openapi
  - api-lifecycle:design
image: Redocly_blog_7.jpg
---
OpenAPI supports four types of parameters: path, query, header, and cookie.
The names sound quite self-explanatory, but are you using each one correctly in your API designs?
This article gives you everything you need to know about each parameter type and when to use it to the best effect in your own APIs.

## Path parameters

The path parameters are probably the first parameters you notice when you work with an API because they're, well, in the path!
This very visible location gives your users some immediate prompts to supply parameters, before they read the documentation.
However, with great power comes great responsibility, and adding parameters here needs some special consideration exactly because they are so visible.

RESTful APIs use path parameters to identify specific resources.
For example, a conference scheduling API might have the following endpoints:

* `/rooms/3f89c1` - The main keynote hall
* `/rooms/44501d` - Breakout track 2
* `/session/6f6289` - Lightning talks slot

To represent a parameter in your OpenAPI description, use `in: path` and mark the field as required.
The parameter name must also match the placeholder in the path entry.
The following example shows a snippet of OpenAPI for an operation that fetches the data for a room:

```yaml
paths:
  '/rooms/{roomId}':
    get:
      operationId: getRooms
      parameters:
        - name: roomId # must match path variable
          in: path
          required: true # path parameters must always be required
          type: string
          example: 4412c5
```

Choose the variable naming style that fits your API standards, but remember if you name the parameter `room-id` then the path must match it: `/rooms/{room-id}`.

Having a lot of parameters in the path can lead to confusing APIs, making it more difficult to introduce backward-compatible API changes in the future.
Our recommendation is to avoid using path parameters as much as possible, for example `/rooms/floor/4/id/123456` is not a good practice since it includes additional information that could be derived from the room identifier alone.
You should also read [our post about subresources](./no-subresources.md) for more tips on API design.

{% admonition type="success" name="When to choose path parameters" %}
Use a path parameter for a required value that is vital to the operation of the API, such as a resource identifier.
{% /admonition %}

## Query parameters

Query parameters are ubiquitous and with good reason; they are a very approachable way to pass values into an API endpoint.
This very flexible approach is designed to accommodate any number of optional parameters and can also support multiple values being passed.

While most APIs use structured data such as JSON format in the body of a request to transfer data, the query parameters are a good way to send additional data.
Good API design will make extensive use of query parameters to send extra information to the server about filtering, sorting, pagination, and so on.
You may even see content negotiation done with this route for some APIs.

Here's a part of the [example Museum API](https://github.com/Redocly/museum-openapi-example) with query parameters for filtering by date and setting pagination:

```yaml
  /special-events:
    get:
      operationId: listSpecialEvents
      parameters:
        - name: startDate
          in: query
          description: Starting date to retrieve future operating hours from. Defaults to today's date.
          schema:
            type: string
            format: date
            example: '2023-02-23'
        - name: endDate
          in: query
          description: End of a date range to retrieve special events for. Defaults to 7 days after `startDate`.
          schema:
            type: string
            format: date
            example: '2023-04-18'
        - name: page
          in: query
          description: Page number to retrieve.
          schema:
            type: integer
            default: 1
            example: 2
        - name: limit
          in: query
          description: Number of days per page.
          schema:
            type: integer
            default: 10
            maximum: 30
            example: 15
```

The following requests are all valid:

- `/special-events` - Fetch all events with default pagination and filtering
- `/special-events?limit=3` - Fetch three events only
- `/special-events?startDate=2024-08-01&limit=5` - Fetch five events after 1st August
- `/special-events?startDate=2024-08-01&endDate=2024-09-01` - Fetch all the events in August (default pagination applies)
- `/special-events?startDate=2024-08-01&endDate=2024-09-01&page=2` - Fetch page 2 of the list of all the events in August

This approach of picking useful defaults and making them optionally alterable is considered good practice in API design.
In RESTful API terminology, the `/special-events` endpoint is a _collection_ and each event is a representation of a _resource_.

{% admonition type="success" name="When to choose query parameters" %}
Use query parameters to modify GET requests to collection endpoints and when you have optional parameters.
Pick sensible default values for your API's use case.
{% /admonition %}

## Cookies in APIs

As a general rule, using cookies in APIs is not recommended.

If you have an existing (perhaps legacy) API that does use them, this is supported in OpenAPI.
The following example shows how to describe cookie parameters in OpenAPI:

```yaml
paths:
  /items:
    get:
      summary: Retrieve a list of items
      parameters:
        - name: SessionId
          in: cookie
          required: false
          schema:
            type: string
          description: Session cookie
```

The example of the session cookie is the most common use of cookies in APIs.
Since browsers handle cookies by default (they accept a provided cookie in a response and add it as a header to any subsequent requests), it's a common way to offer backend APIs for browser clients.
An alternative approach is to use an API key in an alternative header rather than relying on cookies for an API.

## Header parameters

Headers are a key feature of HTTP.
By using HTTP headers, an API can take advantage of the envelope format and deliver metadata alongside the API data.

Common (and excellent) uses of HTTP headers in APIs include:

- content type negotiation
- authentication
- client identification
- tracing/tracking IDs

While content type negotiation is usually left for client and server to handle without per-operation parameters being expressly subscribed, the authentication and authorization fields are more commonly found in the `securitySchemes` section unless they are particular to one endpoint and not aligned with existing standards.

Using headers allows API design to clearly separate the metadata from the data related to the payload.
Good examples could be a trace ID to identify a common thread in a sequence of HTTP requests, a client ID to help identify the logs, or other data such as an account or organization identifier.

{% admonition type="info" name="Headers are case-insensitive" %}
When you describe header parameters, they are always case-insensitive which means that `Content-Type` and `content-type` are equivalent.
{% /admonition %}

HTTP headers are always of type string; it is possible to use a serialized format in a header, but always check if there are existing or standard ways to achieve the same goal.
The following OpenAPI snippet shows an example of header parameters described in OpenAPI:

```yaml
paths:
  /items:
    get:
      summary: Retrieve a list of items
      parameters:
        - name: User-Agent
          in: header
          required: true
          schema:
            type: string
          description: Client identifier for the registered application
        - name: X-Request-ID
          in: header
          required: false
          schema:
            type: string
          description: Unique request identifier for tracking
```

Neither the client identifier nor the request ID have anything to do with the collection of items, so using header parameters for these values makes it clear that they are independent of the data payload.

{% admonition type="success" name="Header parameters for metadata" %}
Use headers for data _about_ a request or response, rather than relating to the data.
It would be less intuitive to use a header to return data related to the resource or collection itself, such as a total pages count.
For identifying clients, requests, or other request/response details, headers are a good option.
{% /admonition %}

## Success in parameter design

When you know the request needs to include data, choosing the right location for parameters can make a big difference to the API experience.
Consider whether the parameter is optional or required, whether it relates to the data being exchanged, and what sort of client will be using the API.
The right selection makes for a robust and long-lived API, and you are now fully qualified to make good choices.

## Next steps

To make your OpenAPI descriptions even better, try the following articles for more advice:

- [Curate better examples for better OpenAPI experience](./openapi-examples.md)
- [Add tags for next-level API descriptions](./add-openapi-tags-for-next-level-api-descriptions.md)
- [Use Markdown in OpenAPI to enrich developer experience](./markdown-in-openapi.md)
