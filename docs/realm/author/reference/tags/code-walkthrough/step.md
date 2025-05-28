# Step tag

Use the `step` tag to define and organize the individual procedures of a walkthrough.
A code walkthrough primarily consists of a series of steps with their corresponding code snippets that may be further refined into [chunks](./index.md#chunk-annotations).

## Attributes

{% table %}

-  Attribute
-  Type
-  Description

---

-  id
-  string
-  **REQUIRED.** Unique identifier for the code step. Controls the highlighting behavior in a chunk's `steps` field.

---

-  heading
-  string
-  The header of the code step.

---

-  when
-  [Conditions object](#conditions-object)
-  Conditions for when the step is visible.

---

-  unless
-  [Conditions object](#conditions-object)
-  Conditions for when the step **is not** be visible.

{% /table %}

## Conditions object

{% partial file="../../../../_partials/conditions-object.md" /%}

## Chunk annotations

{% partial file="../../../../_partials/chunk-annotations.md" /%}

## Examples

The following examples demonstrate the `step` tag configurations only.
Other content and configuration is abstracted out.
Line breaks have been added for readability.

### Basic steps

```markdoc {% process=false title="Step tag syntax" %}
{% code-walkthrough ... %}

  ## Create HTML Structure

  {% step id="create-html" heading="Create HTML File" %}
    Set up your basic HTML structure in `index.html` with a display and buttons.
  {% /step %}

  ## Add Calculator Display

  {% step id="add-display" heading="Add Calculator Display" %}
    In `index.html`, add a `<div>` for the calculator display.
  {% /step %}

  {% step id="add-css" heading="Add CSS Styles" %}
    Apply styles in `styles.css` to make your calculator look clean and functional.
  {% /step %}

{% /code-walkthrough %}
```

### Conditional steps

```markdoc {% process=false title="When attribute syntax" %}
{% code-walkthrough ... %}
  {% step
    id="create-html"
    heading="Create index.html"
    when={ "client": ["HTML"] } // add toggle, input
  %}
    Create `index.html` file with a display and buttons.
  {% /step %}

  {% step
    id="create-react"
    heading="Create App.js"
    when={ "client": "React" }
  %}
    Create `App.js` file with display logic and buttons.
  {% /step %}
{% /code-walkthrough %}
```

```markdoc {% process=false title="Unless attribute syntax" %}
{% code-walkthrough ... %}
  {% step
    id="test-client"
    heading="Test Client Calculations"
    unless={ "server": ["Spring (Java)", "Python"] }
  %}
    Test calculator in client application by entering calculations and verifying output.
  {% /step %}

  {% step
    id="test-server"
    heading="Test Server Calculations"
    unless={ "client": "React" }
  %}
    Test the **server-side** calculations by sending requests and verifying responses.
  {% /step %}
{% /code-walkthrough %}
```

## Resources

- Learn how to use Markdoc to create interactive code guides in [Create code walkthrough](./create-code-walkthrough.md) how-to documentation.
- Control the highlighting behavior of code examples with [chunk annotations](./index.md#chunk-annotations).
