# Input tag

Use the `input` element to create an input field in the walkthrough.
The input value can be used in the code examples using double curly brace placeholders, such as `{{buttons-color}}`.
You can put this special comment anywhere in the code example.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- id
- string
- **REQUIRED.** Unique identifier for the input. Must be unique among all toggles, inputs, and filters. Used to reference the input value in code examples.

---

- label
- string
- The label displayed for the input.

---

- placeholder
- string
- The type of input field.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the input is visible.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the input **is not** be visible.
---

- value
- string
- The default value for the input.

{% /table %}

## Conditions object

{% partial file="../../../../_partials/conditions-object.md" /%}

## Chunk annotations

{% partial file="../../../../_partials/chunk-annotations.md" /%}

## Examples

In the following example, an input field with the id `your-site-name` is created.
The input’s value replaces the placeholder tag `{{your-site-name}}` wherever it appears in the code file.

{% tabs %}
{% tab label="Markdown file" %}
```Markdoc {% process=false title="Input syntax" %}
## Add a landing page
{% step id="step-1a" heading="Step 1" when={ "filetype": "Markdoc" } %}
Add a your site name to the hero section of your `index.page.tsx` file that describes your project.
{% input id="your-site-name" placeholder="Your site name" label="Your site name" /%} # [!code highlight]
{% /step %}
```
{% /tab %}
{% tab label="Code sample file" %}
```tsx {% title="_filesets/index.page.tsx" %}
export default function() {
  return (
    <>
      <HeroSection>
      // @chunk {"steps": ["step-1b"]}
        <h1>{{your-site-name}}</h1> // [!code highlight]
      // @chunk-end
        <p>The product isn't real, but the landing page is</p>
        <Button>Get Started</Button>
      </HeroSection>
```
{% /tab %}
{% /tabs %}

## Resources

- Learn how to use Markdoc to create interactive code guides in [Create code walkthrough](./create-code-walkthrough.md) how-to documentation.
- Control the highlighting behavior of code examples with [chunk annotations](./index.md#chunk-annotations).
