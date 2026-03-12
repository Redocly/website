# JSON Example tag

The `json-example` tag renders JSON examples directly in your documentation, showing users sample data structures.
The tag can display a literal value, reference existing examples from OpenAPI descriptions, or generate examples from JSON schemas.

## Syntax and usage

To use the tag, pass either a `value` or `schema` attribute.
Use `value` for literal JSON data or references to existing examples.
Use `schema` to generate an example from a JSON schema definition.

With inline value:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% json-example
    value={
      "name": "John Doe",
      "email": "john@example.com"
    }
  /%}
  ```
{% /markdoc-example %}

With inline schema:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% json-example
    schema={
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" }
      }
    }
  /%}
  ```
{% /markdoc-example %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- value
- JSON object or array
- A literal JSON value or a `$ref` to an existing example.
  Takes precedence over `schema` if both are provided.

---

- schema
- JSON schema object
- A JSON schema definition or a `$ref` to an existing schema.
  Used to generate an example value.
  Only used if `value` is not provided.

---

- mode
- string
- Controls property filtering when using `schema`.
  Use `read` to exclude `writeOnly` properties (for response examples).
  Use `write` to exclude `readOnly` properties (for request examples).

{% /table %}

## Examples

### Inline value

Display a literal JSON value directly in your documentation:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    value={
      "id": 1,
      "name": "Museum Tour",
      "price": 25.00,
      "available": true
    }
  /%}
  ```
{% /markdoc-example %}

### Referenced value

Reference an existing example from an OpenAPI description using `$ref`:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    value={
      "$ref": "../../openapi-files/redocly-museum.yaml#/components/examples/CreateSpecialEventRequestExample/value"
    }
  /%}
  ```
{% /markdoc-example %}

### Referenced JSON file

Reference any JSON file directly using `$ref`:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    value={
      "$ref": "../../openapi-files/json-example.json"
    }
  /%}
  ```
{% /markdoc-example %}

### With JSON pointer

Use a JSON pointer to display a specific part of a referenced JSON file:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    value={
      "$ref": "../../openapi-files/json-example.json#/value"
    }
  /%}
  ```
{% /markdoc-example %}

### Inline schema

Generate an example from an inline JSON schema definition:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    schema={
      "type": "object",
      "properties": {
        "eventId": { "type": "string", "format": "uuid" },
        "name": { "type": "string", "example": "Mermaid Treasure Hunt" },
        "dates": {
          "type": "array",
          "items": { "type": "string", "format": "date" }
        },
        "price": { "type": "number", "minimum": 0 }
      }
    }
  /%}
  ```
{% /markdoc-example %}

### Referenced schema

Generate an example from a schema defined in an OpenAPI description:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    schema={
      "$ref": "../../openapi-files/redocly-museum.yaml#/components/schemas/MuseumDailyHours"
    }
  /%}
  ```
{% /markdoc-example %}

### With read mode

Generate a response example that excludes `writeOnly` properties (like passwords):

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    schema={
      "type": "object",
      "properties": {
        "id": { "type": "integer", "readOnly": true },
        "username": { "type": "string" },
        "password": { "type": "string", "writeOnly": true }
      }
    }
    mode="read"
  /%}
  ```
{% /markdoc-example %}

### With write mode

Generate a request example that excludes `readOnly` properties (like auto-generated IDs):

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    schema={
      "type": "object",
      "properties": {
        "id": { "type": "integer", "readOnly": true },
        "username": { "type": "string" },
        "password": { "type": "string", "writeOnly": true }
      }
    }
    mode="write"
  /%}
  ```
{% /markdoc-example %}

### Array examples

Display or generate array examples:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-example
    schema={
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "integer" },
          "name": { "type": "string" }
        }
      },
      "minItems": 2
    }
  /%}
  ```
{% /markdoc-example %}

## Best practices

**Use `value` for exact examples**

When you need to display a specific, curated example (like in tutorials or guides), use the `value` attribute.
This gives you full control over the displayed content.

**Use `schema` for generated examples**

When you want examples that stay in sync with your API schema definitions, use the `schema` attribute with a `$ref`.
This ensures your documentation examples always match your API structure.

**Use mode for request/response context**

Use `mode="write"` when showing request body examples to hide server-generated fields like IDs.
Use `mode="read"` when showing response examples to hide sensitive input fields like passwords.

**Prefer references over inline definitions**

When your examples or schemas are already defined in an OpenAPI description, use `$ref` to reference them.
This keeps your documentation in sync with your API definition and reduces duplication.

## Debug common issues

**Example not rendering**

If you're using `schema`, ensure the schema includes enough information to generate an example.
The schema must include `properties`, `items`, `allOf`/`anyOf`/`oneOf`, or value keywords like `example`, `enum`, `const`, or `default`.

**Empty object or array displayed**

Schemas like `{ "type": "object" }` without `properties` or `{ "type": "array" }` without `items` produce empty results.
Add property or item definitions to generate meaningful examples.

**UI or console shows "Can't resolve $ref" error**

The tag cannot access the reference that was passed in an attribute.
Verify that the referenced example or schema exists and check the `$ref` value.
The `$ref` value must include the filepath and pointer as a single string with a proper format (e.g., `file.yaml#/path/to/item`).

**Both value and schema provided**

If both `value` and `schema` are provided, `value` takes precedence and `schema` is ignored.
Remove one of the attributes to avoid confusion.

**Primitive schema provided**

Schemas with primitive types like `{ "type": "string" }` or `{ "type": "integer" }` are not supported.
The tag is designed for object and array examples.
Wrap primitive values in an object or use `value` instead.