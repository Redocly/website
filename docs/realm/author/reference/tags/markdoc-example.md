# Markdoc example tag

The `markdoc-example` tag enables you to display Markdoc syntax simultaneously with the rendered output, separated by introductory text that can be removed or customized.

## Syntax and usage

Use the `markdoc-example` tag to document how to use Markdoc tags in Markdown files.

**Example syntax:**

{% markdoc-example %}
  ````markdown {% title="about.md" process=false %}
  {% markdoc-example renderDemo=true %}
    ```markdown {% title="about.md" %}
    {% admonition type="warning" name="Important" %}
      This is an important message about this product.
    {% /admonition %}
    ```
  {% /markdoc-example %}
  ````
{% /markdoc-example %}

**Example element:**

{% markdoc-example renderDemo=true %}
```markdown {% title="about.md" %}
{% admonition type="warning" name="Important" %}
  This is an important message about this product.
{% /admonition %}
```
{% /markdoc-example %}

## Attributes

{% table %}

- Option
- Type
- Description

---

- renderDemo
- boolean
- Specifies if the introductory text, "Code:" and "Result:", and rendered output is included with Markdoc syntax.
  Default: `false`

---

- withLabels
- boolean
- Specifies if the introductory text, "Code:" and "Result:", is included before the Markdoc syntax and rendered output.

---

- codeLabel
- string
- Custom introductory text that displays before the Markdoc syntax.
  Default: "Code:"

---

- resultLabel
- string
- Custom introductory text that displays before the rendered output.
  Default: "Result:"

{% /table %}

## Examples

### Markdoc example with custom text

**Example syntax:**

{% markdoc-example %}
  ````markdown {% title="about.md" process=false %}
  {% markdoc-example renderDemo=true codeLabel="Syntax:" resultLabel="Rendered example:" %}
    ```markdown {% title="about.md" %}
    {% admonition type="warning" name="Important" %}
      This is an important message about this product.
    {% /admonition %}
    ```
  {% /markdoc-example %}
  ````
{% /markdoc-example %}

**Example element:**

{% markdoc-example renderDemo=true codeLabel="Syntax:" resultLabel="Rendered example:" %}
```markdown {% title="about.md" %}
{% admonition type="warning" name="Important" %}
  This is an important message about this product.
{% /admonition %}
```
{% /markdoc-example %}

## Best practices

If you are writing your own Markdoc tags, you need a good way to share the syntax or no one will be able to use them.

**Contextual introduction**
Always include a brief explanation before the syntax example explaining the purpose and how any attributes you included may affect the output.
This information can help users to understand how to modify the example to fit their own needs.

**Avoid unnecessary complexity**
Keep your examples simple, with minor variations so users don't get too overwhelmed with the different ways to modify a Markdoc tag.

**Link to detailed reference documentation**
Includes links to detailed reference documentation so users can see all of the different options you are not including in your examples that they may want to use.
