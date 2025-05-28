# OpenAPI extension: `x-webhooks`

Webhooks were added to the OpenAPI specification in version 3.1.
The `x-webhooks` extension means you can add webhooks to your older OpenAPI version 3.0 or 2.0 descriptions.

For APIs that include webhooks, developer experience is improved by including them in the main API reference documentation.

{% admonition type="info" name="OpenAPI 3.0 and older only" %}
For OpenAPI 3.1 and later, use the built-in `webhooks` section.
The `x-webhooks` structure is identical, to make your upgrade path easier.
{% /admonition %}

## Location

The `x-webhooks` extension is used at the top level of an OpenAPI description.

## Options

{% table %}

- Option
- Type
- Description

---

- x-webhooks
- [ [Path Item Object](https://spec.openapis.org/oas/v3.0.3.html#path-item-object) ]
- A list of standard Path Item objects as described in the OpenAPI specification.

{% /table %}

## Examples

The following example shows a snippet of an OpenAPI 3.0 description with a webhook.

```yaml
openapi: 3.0.3
x-webhooks:
  publishNewEvent:
    post:
      summary: New special event added
      description: Publish details of a new or updated event.
      operationId: publishNewEvent
      tags:
        - Events
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SpecialEvent"
                type: object
                properties:
                  eventId:
                    $ref: '#/components/schemas/EventId'
                  name:
                    $ref: '#/components/schemas/EventName'
                  location:
                    $ref: '#/components/schemas/EventLocation'
                  eventDescription:
                    $ref: '#/components/schemas/EventDescription'
                  dates:
                    $ref: '#/components/schemas/EventDates'
                  price:
                    $ref: '#/components/schemas/EventPrice'
                required:
                  - name
                  - location
                  - eventDescription
                  - dates
                  - price
            examples:
              default_example:
                summary: New special event
                value:
                  eventId: 6744a0da-4121-49cd-8479-f8cc20526495
                  name: Time Traveler Tea Party
                  location: Temporal Tearoom
                  eventDescription: Sip tea with important historical figures.
                  dates:
                    - '2024-11-18'
                    - '2024-11-25'
                    - '2024-12-02'
                  price: 60
      responses:
        "202":
          description: Data accepted.

```

The webhook is included alongside the other Operations with the same tag in the Redoc API reference documentation.

## Resources

- Read [more about webhooks](https://redocly.com/blog/document-webhooks-with-openapi) on the Redocly blog.
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).

