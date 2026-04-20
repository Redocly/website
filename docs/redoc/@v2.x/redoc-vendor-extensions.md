# Redoc CE vendor extensions

You can use the following [vendor extensions](https://redocly.com/docs/openapi-visual-reference/specification-extensions/) with Redoc CE.

## Swagger Object

Extends the OpenAPI root [OpenAPI Object](https://redocly.com/docs/openapi-visual-reference/openapi)

### x-servers

Backported from OpenAPI 3.0 [`servers`](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.0.md#server-object).
Currently doesn't support templates.

### x-tagGroups

{% table %}

- Field Name
- Type
- Description

---

- x-tagGroups
- [[Tag Group Object](#tag-group-object)]
- A list of tag groups

{% /table %}

#### Use x-tagGroups with Redoc CE

`x-tagGroups` is used to group tags in the side menu.
Before you use `x-tagGroups`, make sure you **add all tags to a group**, since a tag that is not in a group, **is not displayed** at all!

<a name="tagGroupObject"></a>

#### Tag Group Object

Information about tags group

##### Fixed fields

{% table %}

- Field Name
- Type
- Description

---

- name
- string
- The group name

---

- tags
- [string]
- List of tags to include in this group

{% /table %}

#### x-tagGroups example

```json {% title="JSON" %}
{
  "x-tagGroups": [
    {
      "name": "User Management",
      "tags": ["Users", "API keys", "Admin"]
    },
    {
      "name": "Statistics",
      "tags": ["Main Stats", "Secondary Stats"]
    }
  ]
}
```

yaml

```yaml
x-tagGroups:
  - name: User Management
    tags:
      - Users
      - API keys
      - Admin
  - name: Statistics
    tags:
      - Main Stats
      - Secondary Stats
```

## Info Object

Extends the OpenAPI [Info Object](https://redocly.com/docs/openapi-visual-reference/info/)

### x-logo

{% table %}

- Field Name
- Type
- Description

---

- x-logo
- [Logo Object](#logo-object)
- The configuration for the logo that appears on the API's documentation pages.

{% /table %}

#### Use x-logo with Redoc CE

`x-logo` is used to specify API logo.
The corresponding image is displayed just above the side-menu.

<a name="logoObject"></a>

#### Logo Object

The information about API logo

#### Fixed fields

{% table %}

- Field Name
- Type
- Description

---

- url
- string
- The URL pointing to the logo image that appears on the API's documentation pages.
  MUST be in the format of a URL.
  To make the API description file usable from any location, use a an absolute URL.

---

- backgroundColor
- string
- Background color for the image. MUST be an RGB color in [hexadecimal format](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet)

---

- altText
- string
- Text to use for the logo's `alt` tag.
  Defaults to 'logo' if nothing is provided.

---

- href
- string
- The URL pointing to the contact page.
  Default to 'info.contact.url' field of the OAS.

{% /table %}

#### x-logo example

```json {% title="JSON" %}
{
  "info": {
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "x-logo": {
      "url": "https://redocly.github.io/redoc/petstore-logo.png",
      "backgroundColor": "#FFFFFF",
      "altText": "Petstore logo"
    }
  }
}
```

```yaml {% title="YAML" %}
info:
  version: "1.0.0"
  title: "Swagger Petstore"
  x-logo:
    url: "https://redocly.github.io/redoc/petstore-logo.png"
    backgroundColor: "#FFFFFF"
    altText: "Petstore logo"
```

## Tag Object

Extends the OpenAPI [Tag Object](https://redocly.com/docs/openapi-visual-reference/tags/)

### x-traitTag

{% table %}

- Field Name
- Type
- Description

---

- x-traitTag
- boolean
- In Swagger two operations can have multiple tags.
  This property distinguishes between tags that are used to group operations (default) from tags that are used to mark operation with certain trait (`true` value)

{% /table %}

#### Use x-traitTag with Redoc CE

Tags that have `x-traitTag` set to `true` are listed in the side-menu but don't have any subitems (operations).
It also renders the `description` tag.
This is useful for handling out common things like Pagination, Rate-Limits, etc.

#### x-traitTag example

```json {% title="JSON" %}
{
    "name": "Pagination",
    "description": "Pagination description (can use markdown syntax)",
    "x-traitTag": true
}
```

```yaml {% title="YAML" %}
name: Pagination
description: Pagination description (can use markdown syntax)
x-traitTag: true
```

### x-displayName

{% table %}

- Field Name
- Type
- Description

---

- x-displayName
- string
- Defines the text that is used for this tag in the menu and in section headings

{% /table %}

## Operation Object vendor extensions

Extends the OpenAPI [Operation Object](https://redocly.com/docs/openapi-visual-reference/operation/)

### x-codeSamples

{% table %}
- Field Name
- Type
- Description
---
- x-codeSamples
- \[[Code Sample Object](#code-sample-object)]
- A list of code samples associated with operation
{% /table %}

#### Use x-codeSamples with Redoc CE

`x-codeSamples` are rendered on the right panel in Redoc CE.

<a name="codeSampleObject"></a>

### Code Sample Object

Operation code sample

#### Fixed fields

{% table %}

- Field Name
- Type
- Description

---

- lang
- string
- Code sample language.
  Value should be one of the following [list](https://github.com/github/linguist/blob/master/lib/linguist/popular.yml)

---

- label
- string?
- Code sample label, for example `Node` or `Python2.7`, _optional_, `lang` is used by default

---

- source
- string
- Code sample source code

{% /table %}


#### Code Sample Object example

```json {% title="JSON" %}
{
  "lang": "JavaScript",
  "source": "console.log('Hello World');"
}
```

```yaml {% title="YAML" %}
lang: JavaScript
source: console.log('Hello World');
```

### x-badges

{% table %}

- Field Name
- Type
- Description

---

- x-badges
- [[Badge Object](https://redocly.com/docs/realm/author/reference/openapi-extensions/x-badges#badge-object)]
- A list of badges associated with the operation

{% /table %}

## Parameter Object

Extends the OpenAPI [Parameter Object](https://redocly.com/docs/openapi-visual-reference/parameter/)

### x-examples

{% table %}

- Field Name
- Type
- Description

---

- x-examples
- [Example Object](https://redocly.com/docs/openapi-visual-reference/example/)
- Object that contains examples for the request. Applies when `in` is `body` and mime-type is `application/json`

{% /table %}

#### Use x-examples with Redoc CE

`x-examples` are rendered in the JSON tab on the right panel in Redoc CE.

## Response Object vendor extensions

Extends the OpenAPI [Response Object](https://redocly.com/docs/openapi-visual-reference/response/).

### x-summary

{% table %}

- Field Name
- Type
- Description

---

- x-summary
- string
- a short summary of the response

{% /table %}

#### Use x-summary with Redoc CE

If specified, you can use `x-summary` as the response button text, with description rendered under the button.

## Schema Object

Extends the OpenAPI [Schema Object](https://redocly.com/docs/openapi-visual-reference/schemas/)

### x-nullable

{% table %}

- Field Name
- Type
- Description

---

- x-nullable
- boolean
- marks schema as a nullable

{% /table %}

#### Use x-nullable with Redoc CE

Schemas marked as `x-nullable` are marked in Redoc CE with the label Nullable.

### x-additionalPropertiesName

{% admonition type="warning" %}
`x-additionalPropertiesName` is a Redoc CE-specific vendor extension, and is not supported by other tools.
{% /admonition %}

Extends the `additionalProperties` property of the schema object.

{% table %}

- Field Name
- Type
- Description

---

- x-additionalPropertiesName
- string
- descriptive name of additional properties keys

{% /table %}

#### Use x-additionalPropertiesName with Redoc CE

Redoc CE uses this extension to display a more descriptive property name in objects with `additionalProperties` when viewing the property list with an `object`.

#### x-additionalPropertiesName example

```yaml
Player:
  required:
  - name

  properties:
    name:
      type: string

  additionalProperties:
    x-additionalPropertiesName: attribute-name
    type: string
```

### x-explicitMappingOnly

{% admonition type="warning" %}
`x-explicitMappingOnly` is a Redoc CE-specific vendor extension, and is not supported by other tools.
{% /admonition %}

Extends the `discriminator` property of the schema object.

{% table %}

- Field Name
- Type
- Description

---

- x-explicitMappingOnly
- boolean
- limit the discriminator selectpicker to the explicit mappings only

{% /table %}

#### Use x-explicitMappingOnly with Redoc CE

Redoc CE uses this extension to filter the `discriminator` mappings shown in the selectpicker.
When set to `true`, the selectpicker lists only the explicitly defined mappings.
When `false`, the default behavior is kept, in other words, explicit and implicit mappings are shown.

#### x-explicitMappingOnly example


```yaml
Pet:
  type: object
  required:
    - name
    - photoUrls
  discriminator:
    propertyName: petType
    x-explicitMappingOnly: true
    mapping:
      cat: "#/components/schemas/Cat"
      bee: "#/components/schemas/HoneyBee"
```

Shows in the selectpicker only the items `cat` and `bee`, even though the `Dog` class inherits from the `Pet` class.

### x-enumDescriptions

{% table %}

- Field Name
- Type
- Description

---

- x-enumDescriptions
- [[Enum Description Object](https://redocly.com/docs/realm/author/reference/openapi-extensions/x-enum-descriptions#enum-description-object)]
- A list of the enum values and descriptions to include in the documentation.

{% /table %}

#### Use x-enumDescriptions with Redoc CE

The enum (short for "enumeration") fields in OpenAPI allow you to restrict the value of a field to a list of allowed values.
These values need to be short and machine-readable, but that can make them harder for humans to parse and work with.

Add `x-enumDescriptions` to your OpenAPI description to show a helpful table of enum options and an explanation of what each one means.
This field supports Markdown.

#### x-enumDescriptions example

The following example shows a schema with two short-named options, and the `x-enumDescriptions` entry to list all enum entries and give additional context for each:

```yaml
components:
  schemas:
    TicketType:
      description: Type of ticket being purchased.
      Use `general` for regular museum entry and `event` for tickets to special events.
      type: string
      enum:
        - event
        - general
      x-enumDescriptions:
        event: Event Tickets _(timed entry)_
        general: General Admission
      example: event
```

## Resources

- **[Configure Redoc CE](./config.md)** - Explore Redoc CE's configuration options
