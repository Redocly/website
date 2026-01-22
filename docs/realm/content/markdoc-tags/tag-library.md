# Markdoc tag library

This page contains a comprehensive list of Markdoc tags with links to deeper resources where you can see how to use them.

## Admonition

Use the Admonition tag to highlight important information.
Choose from multiple pre-defined types like info, warning, and success.

Additional information and syntax: [Admonition tag](./admonition.md)

**Example admonition element:**

{% admonition type="info" name="Read this thing!" %}
This tag is useful for drawing attention.
{% /admonition %}

---

## Card and cards

Use the Cards tag to help users navigate your documentation by grouping information and links in a pre-built UI card.
Choose from several pre-defined styles and formats.

Additional information and syntax: [Card and cards tag](./cards.md)

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

## Code snippet

Use the Code Snippet tag to render a code sample from an external file in a configurable code block element.

Additional information and syntax: [Code Snippet tag](./code-snippet.md)

**Example code snippet element:**

{% code-snippet
  file="./code-examples/museum-config.yaml"
  language="yaml"
  from=1
  to=10
  title="museum-redocly.yaml"
/%}

---

## Code walkthrough

Use code walkthroughs to interactively explain complex code examples to your users.
Code walkthroughs combine steps with explanatory text and downloadable code samples with interactive highlighting.
As users select different steps, the corresponding code from the code samples highlights, drawing their focus where you want it.

Additional information and syntax: [Code walkthrough tag](./code-walkthrough/index.md)

**Example code walkthrough element:**

{% img withLightbox=true alt="A screenshot of the project using a single file and the smallest required configuration" src="./images/minimal-codewalkthrough.png" /%}

---

## Image tag

Use the Image tag to embed images into your content with various customization options.

Additional information and syntax: [Image tag](./img.md)

**Example image element:**

{% img
  alt="Basic example image"
  srcSet="./images/img-markdoc/image-example-light.png light, ./images/img-markdoc/image-example-dark.png dark"
/%}

---

## Inline SVG

Use the inline SVG tag to render an SVG element inline with your writing.

Additional information and syntax: [Inline SVG tag](./inline-svg.md)

**Example inline SVG element:**

{% inline-svg file="./images/cards-markdoc/ghost-icon.svg" .smaller-inline-svg /%}.

---

## Login button

Use the Login button tag to render a login button that links to the login URL.
The button is only visible to unauthenticated users and automatically hides when a user is logged in.

Additional information and syntax: [Login button tag](./login-button.md)

**Example usage with RBAC:**

````markdoc {% process=false %}
{% if includes($rbac.teams, "anonymous") %}
{% admonition type="info" name="Log in" %}
Some content is available only for authenticated users. Log in to get full access to our documentation.

{% login-button /%}

{% /admonition %}
{% /if %}
````

---

## JSON Schema

Use the JSON Schema tag to render an existing or inline schema in a configurable, readable layout.

Additional information and syntax: [JSON Schema tag](./json-schema.md)

**Example JSON schema element:**

{% json-schema
  schema={
    "$ref": "../../openapi-files/redocly-museum.yaml#/components/schemas/UpdateSpecialEventRequest"
  }
/%}

---

## Markdoc example

Use the Markdoc example tag to display Markdoc syntax simultaneously with the rendered output, separated by introductory text that can be removed or customized.

Additional information and syntax: [Markdoc example tag](./markdoc-example.md)

**Example Markdoc example element:**

{% markdoc-example renderDemo=true %}
```markdown {% title="about.md" %}
{% admonition type="warning" name="Important" %}
  This is an important message about this product.
{% /admonition %}
```
{% /markdoc-example %}

---

## OpenAPI code sample

Use the OpenAPI code sample tag to render a code sample for an API operation from an OpenAPI description.

Additional information and syntax: [OpenAPI code sample tag](./openapi-code-sample.md)

{% openapi-code-sample
  descriptionFile="../../openapi-files/redocly-museum.yaml"
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

## Partial

Use the Partial tag to render the content from another file.

Additional information and syntax: [Partial tag](./partial.md)

---

## Replay OpenAPI

Use the Replay OpenAPI tag to allow users to send live calls to your API.

Additional information and syntax: [Replay OpenAPI tag](replay-openapi.md)

**Example Replay OpenAPI element:**

{% replay-openapi
  descriptionFile="../../openapi-files/redocly-museum.yaml"
  operationId="createSpecialEvent"
/%}

---

## Table

Use the Table tag to create tables using a list-based syntax that allows for easy injection of rich content, like bulleted lists and code samples.

Additional information and syntax: [Table tag](./table.md)

**Example table element:**

{% table %}
- Heading 1
- Heading 2
---
- Row 1 Cell 1
- Row 1 Cell 2
---
- Row 2 Cell 1
- Row 2 cell 2
{% /table %}

---

## Tabs

Use the tabs tag to organize content into a series of tabs that users can switch between.

Additional information and syntax: [Tabs tag](./tabs.md)

**Example tabs tag element:**

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
