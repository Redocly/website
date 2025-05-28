---
seo:
  title: Markdoc Tag Library
  description: Explore the Markdoc Tag Library to discover exciting new writing tools that help you build better technical documentation.
---

# Markdoc Tag Library

This page contains a comprehensive list of Markdoc tags with links to deeper resources where you can see how to use them. Some tags are built into Markdoc while others are Redocly-specific. We use badges to indicate a tag's availability:

{% table %}

- Badge
- Meaning

---

- {% markdoc-tag-badge badgeType="Redocly" .anchor-link-in-table /%} {% id="redocly-tag-badge" %}
- Tags built into Redocly products and available for customers to use in their projects.

---

- {% markdoc-tag-badge badgeType="Built-in" .anchor-link-in-table /%} {% id="built-in-tag-badge" %}
- Tags built into Markdoc's core that are available to _all_ Markdoc users.

{% /table %}

---

## Admonition {% markdoc-tag-badge badgeType="Redocly" /%}

Use the Admonition tag to highlight important information. Choose from multiple pre-defined types like info, warning, and success.

Additional information and syntax: [Admonition tag](./admonition.md)

**Example admonition element:**

{% admonition type="info" name="Read this thing!" %}
This tag is useful for drawing attention.
{% /admonition %}

---

## Cards {% markdoc-tag-badge badgeType="Redocly" /%}

Use cards to help users navigate your documentation by grouping information and links in a pre-built UI card.
Choose from several pre-defined styles and formats.

Additional information and syntax: [Cards tag](./cards.md)

**Example cards element:**

{% cards columns=2 cardMinWidth=200 %}
  {% card title="Card title" icon="./images/cards-markdoc/ghost-icon.svg" variant="elevated" align="center" %}
    Add content _inside the card_.
  {% /card %}
  {% card title="Card title" icon="./images/cards-markdoc/ghost-icon.svg" variant="elevated" align="center" %}
    {% admonition type="info" %}
      Use links, Markdown, even other **Markdoc tags**.
    {% /admonition %}
  {% /card %}
{% /cards %}

---

## Code Snippet {% markdoc-tag-badge badgeType="Redocly" /%}

Use the Code Snippet tag to render a code sample from an external file in a configurable code block element.

Additional information and syntax: [Code Snippet tag](./code-snippet.md)

**Example code snippet element:**

{% code-snippet
  file="../sidebars.yaml"
  language="yaml"
  from="Tag Library"
  to=426
  title="museum-redocly.yaml"
/%}

---

## Inline SVG {% markdoc-tag-badge badgeType="Redocly" /%}

Use the inline SVG tag to render an SVG element inline with your writing.

Additional information and syntax: [Inline SVG tag](./inline-svg.md)

**Example inline SVG element:**

This tag is so cool it's scary {% inline-svg file="./images/cards-markdoc/ghost-icon.svg" .smaller-inline-svg /%}.

---

## JSON Schema {% markdoc-tag-badge badgeType="Redocly" /%}

Use the JSON Schema tag to render an existing or inline schema in a configurable, readable layout.

Additional information and syntax: [JSON Schema tag](./json-schema.md)

**Example JSON schema element:**

{% json-schema
  schema={
    "$ref": "../../../demo/openapi/museum-api.yaml#/components/schemas/UpdateSpecialEventRequest"
  }
/%}

---

## OpenAPI Code Sample {% markdoc-tag-badge badgeType="Redocly" /%}

Use the OpenAPI Code sample tag to render a code sample for an API operation from an OpenAPI description.

Additional information and syntax: [OpenAPI Code Sample tag](./openapi-code-sample.md)

{% openapi-code-sample
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="deleteSpecialEvent"
  language="curl"
  parameters={
    path: {
      eventId: "dad4bce8-f5cb-4078-a211-995864315e39"
    }
  }
  environment="https://api.fake-museum-example.com/v1"
  environments={
    "https://api.fake-museum-example.com/v1": {
      "MuseumPlaceholderAuth_username": "custom-username",
      "MuseumPlaceholderAuth_password": "custom-password"
    }
  }
/%}

---

## Partial {% markdoc-tag-badge badgeType="Built-in" /%}

Use the Partial tag to render the content from another file.

Additional information and syntax: [Partial tag](./partial.md)

**Example partial element:**

{% group-elements %}
  {% partial file="/docs-legacy/_snippets/partial-example-tag-library.md" /%}
{% /group-elements %}

---

## Replay OpenAPI {% markdoc-tag-badge badgeType="Redocly" /%}

Allow users to send live calls to your API using the Replay OpenAPI tag.

Additional information and syntax: [Replay OpenAPI tag](replay-openapi.md)

**Example element:**

{% replay-openapi
  descriptionFile="../../../demo/openapi/museum-api.yaml"
  operationId="createSpecialEvent"
/%}

---

## Table {% markdoc-tag-badge badgeType="Built-in" /%}

Use the Table tag to create tables using a list-based syntax that allows for easy injection of rich content, like bulleted lists and code samples.

Additional information and syntax: [Table tag](./table.md)

**Example table element:**

{% table %}
* Heading 1
* Heading 2
---
* Row 1 Cell 1
* Row 1 Cell 2
---
* Row 2 Cell 1
* Row 2 cell 2
{% /table %}

---

## Tabs {% markdoc-tag-badge badgeType="Redocly" /%}

Use the tabs tag to organize content into a series of tabs that users can switch between.

Additional information and syntax: [Tabs tag](./tabs.md)

{% tabs %}
  {% tab label="Fruits" %}
    - Tomato (it's both!)
    - Blueberry
    - Kiwi
    - Banana
  {% /tab %}
  {% tab label="Vegetables" %}
    - Tomato (it's both!)
    - Broccoli
    - Spinach
    - Asparagus
  {% /tab %}
{% /tabs %}
