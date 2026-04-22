# OpenAPI extension: `x-badges`

Use the `x-badges` option to add badges to channels, operations, and schema fields as indicators in API documentation.

The badges are displayed in API reference documentation in the following locations:

**Operations:**
- the title of an operation in the header of the page
- the operation item when it displays in a navigation list

**Parameters:** next to the parameter name in the parameters list and in the parameter details.

**Schema properties:** next to the property name in request/response body schemas and in the property details.

Each object can have multiple badges, and the displayed color is also configurable.

## Location

Add an array of `x-badges` to any of the following:
- Operation object (under `paths.<path>.<method>`)
- Parameter object (operation parameters or `components/parameters`)
- Schema object (including properties under `schema.properties` in components or inline)

## Options

{% table %}

- Option
- Type
- Description

---

- x-badges
- [ [Badge Object](#badge-object) ]
- A list of badges.

{% /table %}

### Badge Object

{% table %}

- Option
- Type
- Description

---

- name
- string
- **REQUIRED**.
  The text that displays in the badge.

---

- color
- string
- The color of the badge.
  Supports predefined color names for consistent styling or direct color values for custom backgrounds.

  **Supported color names:**
  `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`, `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`.

  **Supported status colors:**
  `success`, `processing`, `error`, `warning`, `default`, `approved`, `declined`, `pending`, `active`, `draft`, `deprecated`, `product`.

  Defaults to `grey`.
---

- position
- string
- The position of the badge relative to the label text.
  Possible values: `before`, `after`.
  Defaults to `after`.

{% /table %}

## Examples

The following example sets a `Beta` badge on the `Get special event` operation:

```yaml {% title="museum.yaml" %}
openapi: 3.1.0
...
paths:
  /special-events/{eventId}:
    get:
      summary: Get special event
      description: Get details about a special event.
      operationId: getSpecialEvent
      tags:
        - Events
      parameters:
        - $ref: '#/components/parameters/EventId'
      x-badges:
        - name: 'Beta'
          position: before
      responses:
        '200':
          description: Success.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SpecialEventResponse'
              examples:
                default_example:
                  $ref: '#/components/examples/GetSpecialEventResponseExample'
```

{% img
  src="../../images/x-badges.png"
  alt="Image of sample OpenAPI definition with badges displayed"
  withLightbox=true
/%}

### Parameter with badges

You can add `x-badges` to a parameter (inline or in `components/parameters`):

```yaml
components:
  parameters:
    ExperimentalFlag:
      name: experimentalFlag
      in: query
      schema:
        type: boolean
      x-badges:
        - name: 'Experimental'
          position: after
        - name: 'Beta'
          position: before
          color: blue
```

### Schema property with badges

You can add `x-badges` to any schema object, including properties within a schema:

```yaml
components:
  schemas:
    OrderResponse:
      type: object
      properties:
        quantityFilled:
          type: integer
          description: Filled quantity (experimental).
          x-badges:
            - name: 'Experimental'
        status:
          type: string
          x-badges:
            - name: 'New'
              position: before
              color: green
```

## Resources

- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
