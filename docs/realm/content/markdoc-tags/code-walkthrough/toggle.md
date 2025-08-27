# Toggle tag

The `toggle` tag makes walkthrough content interactive, allowing users to toggle features or configurations to explore different scenarios.
It wraps content and steps inside the walkthrough and adds a toggle to the UI used to display or hide the content within.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- id
- string
- **REQUIRED.** Unique identifier for the toggle. Must be unique among all toggles, inputs, and filters. Used for controlling the visibility of child elements.

---

- label
- string
- **REQUIRED.** The header displayed for the toggle.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the toggle is visible.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the toggle **is not** be visible.

{% /table %}

## Conditions object

{% partial file="../../../_partials/conditions-object.md" /%}

## Description slot

The toggle content is hidden when the toggle is collapsed.
Use the description slot to define content that renders below the toggle regardless of the toggle state, such as more information about a feature.

```markdoc {% process=false title="Toggle description slot" %}
{% toggle id="toggle-id" label="Toggle example" %}
  {% slot "description" %}
    Explanation and context about the toggle.
  {% /slot %}

  Optional internal content or nested steps.
{% /toggle %}
```

{% img withLightbox=true alt="Example of a toggle rendered on a project page" src="../images/codewalkthrough-toggle.png" /%}

## Chunk annotations

{% partial file="../../../_partials/chunk-annotations.md" /%}

## Examples

{% tabs %}
{% tab label="Markdown file" %}
```markdoc {% process=false title="Toggle syntax" %}
{% code-walkthrough ... %}
  {% toggle id="error-logs" label="Add logging" %}
    {% slot "description" %}
      This is a description in a Markdoc slot!
      Enable logs to display errors and debug potential bugs and issues.
    {% /slot %}

    {% step id="error-logs" heading="Add Error Logs" %}
      Add exception and error logs
    {% /step %}
  {% /toggle %}
{% /code-walkthrough %}
```
{% /tab %}
{% tab label="Code sample file" %}
```javascript {% title="script.js" %}
// @chunk {"when": {"error-logs": true}}
const config = {
    logErrors: true
};
// @chunk-end
```
{% /tab %}
{% /tabs %}

## Resources

- Learn how to use Markdoc to create interactive code guides in [Create code walkthrough](./create-code-walkthrough.md) how-to documentation.
- Control the highlighting behavior of code examples with [chunk annotations](./index.md#chunk-annotations).
