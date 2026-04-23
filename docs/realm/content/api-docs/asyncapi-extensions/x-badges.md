---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# AsyncAPI extension: `x-badges`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `x-badges` option to add badges to channels, operations, and schema fields as indicators in API documentation.

The badges are displayed in API reference documentation in the following locations:

**Channels and operations:**
- the title of a channel or an operation in the header of the page
- the channel or operation item when it displays in a navigation list

**Schema fields:** next to the property name in message payload and headers schemas, and in the property details.

Each object can have multiple badges, and the displayed color is also configurable.

## Location

Add an array of `x-badges` to any of the following:
- Channel object
- Operation object
- Schema object (message payload or headers, and properties within schemas in `components/schemas` or inline)

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

The following example sets a `Beta` badge on the `User Ratings Topic` channel:

```yaml {% title="asyncapi.yaml" %}
asyncapi: 3.0.0
...
channels:
  ratings:
    address: ratings-{ratingDirection}
    title: User Ratings Topic
    summary: Event stream of driver and passenger ratings
    description: Topic for collecting and processing user experience ratings submitted by drivers and passengers.
    servers:
      - $ref: '#/servers/production'
    x-badges:
      - name: 'Beta'
        position: before
    messages:
      driverRating:
        $ref: '#/components/messages/driverRating'
```
{% img
  src="./images/asyncapi-x-badges.png"
  alt="Image of sample AsyncAPI definition with badges displayed"
  withLightbox=true
/%}

### Schema property with badges

You can add `x-badges` to any schema object, including properties within message payload or headers schemas:

```yaml
components:
  schemas:
    OrderEvent:
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

When the schema is used as a message payload or headers, the badges appear next to each property name in the documentation.

## Resources

- **[Supported AsyncAPI extensions](./index.md)** - Complete list of all AsyncAPI extensions supported by Redocly for enhanced API documentation
