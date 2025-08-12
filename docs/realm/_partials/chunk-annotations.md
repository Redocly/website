Chunk annotations ("chunks") are single-line comments you add to code example files to control the highlighting behavior of a code-walkthrough.
Each chunk has an opening and closing annotation, wrapping sections of code.

The exact comment syntax varies between languages, but the chunk syntax remains the same, as in the following examples:

{% tabs %}

  {% tab label="HTML" %}
    ```html {% title="index.html" %}
    <head>
      <!-- @chunk {"steps": ["add-script"]} -->
      <script src="script.js"></script>
      <!-- @chunk-end -->
    </head>
    ```
  {% /tab %}

  {% tab label="JavaScript" %}
    These comment patterns apply to all JavaScript-based files, such as TypeScript and React.

    ```javascript {% title="script.js" %}
    // @chunk {"steps": ["select-dom"]}
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    // @chunk-end
    ```
  {% /tab %}

  {% tab label="CSS" %}

    ```css {% title="styles.css" %}
    /* @chunk {"steps": ["body-defaults"]} */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    /* @chunk-end */
    ```
  {% /tab %}

  {% tab label="Python" %}

    ```python {% title="main.py" %}
    # @chunk {"steps": ["app-setup"]}
    from flask import Flask, request, jsonify
    from flask_cors import CORS

    app = Flask(__name__)
    CORS(app)
    PORT = 5000
    # @chunk-end
    ```
  {% /tab %}

  {% tab label="Java" %}

    ```java {% title="Calculator.java" %}
    // @chunk {"steps": ["calculator-class"]}
    public class CalculatorApplication {

        public static void main(String[] args) {
            SpringApplication.run(CalculatorApplication.class, args);
        }
    }
    // @chunk-end
    ```
  {% /tab %}

{% /tabs %}

### Chunk attributes

Each chunk requires either a [step `id`](../content/markdoc-tags/code-walkthrough/step.md), or a `when` or `unless` condition with a [filter](../content/markdoc-tags/code-walkthrough/index.md#filter-object), [toggle](../content/markdoc-tags/code-walkthrough/toggle.md) or [input id](../content/markdoc-tags/code-walkthrough/input.md).
The code that is wrapped within a set of chunk annotations is highlighted when the corresponding content in the `step` tags is selected or when the `input` or `toggle` tag condition is met in a code walkthrough.

{% admonition type="warning" %}
If you have the same step `id` in two chunks in separate files, selecting the content in the `step` tags for the step `id`, highlights the first file from the list.
{% /admonition %}

{% table %}

- Attribute
- Type
- Description

---

- steps
- array
- A list of step `id`s that activate the chunk's highlighting.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the code snippet wrapped in a chunk can be **revealed** with a filter or toggle.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the code snippet wrapped in a chunk can be **hidden** with a filter or toggle.

{% /table %}

### Nested chunks

You can nest chunks inside each other to highlight a larger section along with smaller subsections inside them.

```html {% title="index.html" %}
<!-- @chunk {"steps": ["hello-world-html", "create-html-file"]} -->
<!DOCTYPE html>
<html lang="en">
  <!-- @chunk {"steps": ["html-head"]} -->
  <head>
    <meta charset="UTF-8">
    <title>Hello World Page</title>
    <!-- @chunk {"steps": ["link-stylesheet"]} -->
    <link rel="stylesheet" href="styles.css">
    <!-- @chunk-end -->
  </head>
  <!-- @chunk-end -->
  <body>
    <p>Hello world.</p>
  </body>
</html>
<!-- @chunk-end -->
```

Using indentation can help organize your chunks and ensure they're all closed.

### Conditional chunks

Similar to the step tag, you can define `when` and `unless` conditions that control the visibility of code snippets wrapped in chunks in the code panel.
Conditions are evaluated against the code walkthrough filters, toggles, and inputs.

The following example includes content that is revealed when "npm" is selected in a "client" filter and different content is displayed when "pip" is selected in the same filter:

{% tabs %}
{% tab label="Markdown file" %}
```markdoc {% title="code-walkthrough.md" process=false %}
{% toggle id="testimonial" label="Add testimonials" when={ "filetype": "React" } %}
{% slot "description" %}
Add testimonials to your landing page.
{% /slot %}

{% step id="step-2b" heading="Add a testimonial" %}
Add a testimonial section to your page using the highlighted code.
{% /step %}
{% /toggle %}
```
{% /tab %}
{% tab label="Code file" %}
```typescript {% title="landing.page.tsx" %}
// @chunk {"steps": ["step-2b"], "unless": {"testimonial": false}}
    <TestimonialsSection>
        <TestimonialQuote>
        "I was able to set up my travel plans in minutes!"
        </TestimonialQuote>
        <p>- Train Travel API user</p>
    </TestimonialsSection>
// @chunk-end
```
{% /tab %}
{% /tabs %}
