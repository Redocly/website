# JSON Schema tag

The `json-schema` tag renders schemas inside a pre-styled element optimized for readability and layout.
The tag can reference existing schemas, like OpenAPI descriptions or external files, but also accepts inline schemas.

## Syntax and usage

To use the tag, pass the reference to your schema using the `schema` attribute.
Render an existing schema from inside an OpenAPI description or other external file using `$ref`.
To reference a specific part of the schema, pass a string that contains both the filepath and pointer.
Optionally, modify how the schema renders using the [`options` attribute](#options-object).

### Render existing schemas

Render an existing schema from inside an OpenAPI description or other external file using `$ref`, as in the following example:

{% markdoc-example renderDemo=true %}
  ```markdoc
  {% json-schema
  schema={
    "$ref": "../../../openapi-files/redocly-museum.yaml#/components/schemas/GetMuseumHoursResponse"
  }
  /%}
  ```
{% /markdoc-example %}

### Render schemas defined inline

Define a schema directly inside the `schema` attribute (aka "inline"), as in the following example:

{% markdoc-example renderDemo=true %}

```markdoc
{% json-schema
  schema={
    "type": "object",
    "title": "Oatmeal",
    "properties": {
      "weight": {
        "type": "number",
        "description": "Weight in grams."
      }
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

- schema
- JSON schema object
- **REQUIRED.**
  A reference to or an inline JSON schema to render.
  The schema can be defined inline or pulled from another file using `$ref`.
  Only local files are supported.

---

- options
- [Options object](#options-object)
- Options for modifying how the JSON schema is displayed.

{% /table %}

### Options object

The `options` attribute is used to modify the behavior and appearance of the rendered schema, as in the following example:

{% markdoc-example renderDemo=true %}
```markdoc
{% json-schema
  schema={
    "$ref": "../../../openapi-files/redocly-museum.yaml#/components/schemas/GetMuseumHoursResponse"
  }
  options={
    "hideSchemaTitles": true
  }
/%}
```
{% /markdoc-example %}

The following options work with the JSON schema tag:

{% table %}

- Option
- Type
- Description

---

- hideSchemaPattern
- boolean
- If `true`, the pattern is not shown in the schema.

---

- hideSchemaTitles
- boolean
- If `true`, hides the schema title next to the type.

---

- maxDisplayedEnumValues
- number
- Displays a specified number of enum values and hides remaining values behind an expandable element.
  All values are displayed by default.

---

- requiredPropsFirst
- boolean
- If `true`, shows required properties in schemas first, ordered in the same order as in required array.

{% /table %}

## Examples

### From an OpenAPI description

The example below uses a reference to a JSON schema that is already defined within an OpenAPI description.

**Example json-schema syntax:** (OpenAPI description)

{% markdoc-example renderDemo=true %}

```markdoc
{% json-schema
  schema={
    "$ref": "../../../openapi-files/redocly-museum.yaml#/components/schemas/GetMuseumHoursResponse"
  }
/%}
```
{% /markdoc-example %}

### Inline schema

The following example uses an "inline" schema, where the JSON schema is defined directly on the `schema` attribute as part of the tag:

**Example json-schema syntax:** (inline schema)

{% markdoc-example renderDemo=true %}

  ```markdoc
  {% json-schema
    schema={
      "title": "Artifact",
      "type": "object",
      "properties": {
        "artifactId": {
          "type": "string",
          "description": "Unique artifact identifier."
        },
        "name": {
          "type": "string",
          "description": "Name of the artifact."
        },
        "yearCreated": {
          "type": "integer",
          "description": "Approximate year the artifact comes from.",
        }
      }
    }
  /%}
  ```

{% /markdoc-example %}

## Best practices

**Validate schemas before use**

Validating your schema ensures it adheres to standards and is compatible with the JSON schema tag.
For OpenAPI descriptions, Redocly recommends validating with the [Redocly CLI](https://redocly.com/docs/cli/).

**Keep schemas organized**

Organized schemas are easier to find and manage, which improves maintainability and reduces errors (especially on larger teams).

- For OpenAPI descriptions, use descriptive schema names and structure.
- For external schema files, use a clear directory structure and file names.

## Debug common issues

**Changes to schema not reflected in UI**

If you're running the development server locally, you'll need to restart the project after making changes to a schema in an OpenAPI description or external file.

**Schema not rendering**

This issue can be caused by problems in the schema format.
The JSON schema tag is designed to display a schema, but doesn't validate.
Validate your schema to ensure the format is correct.

**UI or console shows "Can't resolve $ref" error**

The tag cannot access the reference that was passed in an attribute.
Verify that the pre-defined schema exists and then check the `$ref` value.
The `ref` value must include the filepath and pointer as a single string.
