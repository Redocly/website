---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `codeSnippet`

Code snippets are small sections of code you can include in your Markdown and OpenAPI documents.
In Markdown code snippets are formatted by wrapping the text in two sets of three backticks, placed at the start and end of the text block.

For example, the following is a code snippet with yaml:

````markdown {% title="codeSnippet with YAML" %}
```yaml
codeSnippet:
  copy:
    hide: true
```
````

Markdown code snippets include a report and copy icon in the top right corner.

In OpenAPI reference documentation, code snippets are generated based on the information in the description.
The following is an example of a request and response code snippet in OpenAPI reference documentation:

![Screenshot of a request and response in OpenAPI reference documentation](./images/openapi-code-snippet.png)

OpenAPI reference documentation code snippets include report, copy, and expand and collapse icons in the top right corner.

You can configure the `codeSnippet` element to hide the copy, expand, and collapse buttons.
You can also configure the report element's tooltip and dialog label text.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "codeSnippet"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- elementFormat
- string
- A value that specifies the style for the control icons. Possible values: `icon`, `text`. Default: `icon`

---

- copy
- [Copy](#copy-object)
- An object with the list of specific settings for a code snippet's copy button.

---

- report
- [Report](#report-object)
- An object with the list of specific settings for a code snippet's report button.

---

- expand
- [Expand](#expand-object)
- An object with the list of specific settings for a code snippet's expand button.

---

- collapse
- [Collapse](#collapse-object)
- An object with the list of specific settings for a code snippet's collapse button.

{% /table %}

### Copy object

Users can use copy button to put code snippet raw content into the clipboard.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the copy button should be hidden.
  Default value: `false`.

---

{% /table %}

### Report object

Users can use the report button to send problem feedback about the code snippet's content.
When users click the report button or text, they are provided a comment feedback form.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the report button should be hidden.
  Default value: `true`.

---

- label
- string
- Label inside the report dialog form. Default value: `What is wrong with the code?`.

---

- tooltipText
- string
- Text of the tooltip of the report button. Default value: `Report a problem`.

{% /table %}

### Expand object

Use the expand button to show all the nested properties inside a JSON object that is included as a sample request or response in an OpenAPI definition.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the expand button should be hidden.
  Default value: `false`.

{% /table %}

### Collapse object

Users can use collapse button to hide all the nested properties inside a JSON object that is included as a sample request or response in an OpenAPI definition.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the collapse button should be hidden.
  Default value: `false`.

{% /table %}

## Examples

### Copy button

The following is an example configuration for hiding the copy button:

```yaml
codeSnippet:
  copy:
    hide: true
```

### Report button

The following is an example configuration for enabling the report button with specific settings:

```yaml
codeSnippet:
  report:
    label: Report wrong code
```

### Expand and collapse buttons

The following is an example configuration for hiding the expand and collapse buttons on JSON objects that are included as a sample requests or responses in OpenAPI definitions:

```yaml
codeSnippet:
  expand:
    hide: true
  collapse:
    hide: true
```

## Customizing labels and tooltips

Translation keys provide customization options for code snippet control texts. For complete details, refer to the [Translation Keys Reference](../author/reference/translation-keys.md).

## Resources

- Use the [codeSnippet Markdoc tag](https://redocly.com/docs/learn-markdoc/tags/code-snippet) to display code snippets loaded from local files.
- To configure the feedback mechanism that appears on all pages in your project by default, see the [`feedback`](./feedback.md) reference documentation.
- Follow step-by-step instructions for configuring code snippets in the [Configure code snippets](../author/how-to/configure-code-snippets.md) how-to documentation.
- Learn more about the report feedback mechanism that is included in all code snippets by default, see the [Feedback](../setup/concepts/feedback.md) concept documentation.
- Use [front matter](./front-matter-config.md) to configure code snippets on individual pages.
- Explore other [configuration options](./index.md) for your project.
