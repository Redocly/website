# Code walkthrough tag

Use code walkthroughs to interactively explain complex code examples to your users.
Code walkthroughs combine steps with explanatory text and interactive code highlighting on downloadable code samples.
As users select different steps, the corresponding code from the code samples highlights, drawing their focus where you want it.

Code walkthroughs are presented on the page as two distinct panels.
The left panel displays the steps and explanations that guide users.
The right panel includes downloadable code files that correspond to the steps displayed on the left panel.

## Optional UI elements

Code walkthroughs include the following optional UI elements:

- **Filter:** If a filter is defined, the left panel displays a filter bar to allow users to filter the content.
- **Input:** An Input provides a text field for users to customize text in the code samples.
- **Toggle:** A toggle is a UI element on the left side panel that allows users to reveal additional content.
- **Description slot:** The description slot defines content that renders below the toggle regardless of the toggle state.
- **Preview slot:** If a Preview slot is defined, the right panel displays a preview accessible by the accordion above the right code panel.

The following screenshot shows a code walkthrough with filters, an input, a toggle with a description slot, and a preview slot:

{% img alt="Screenshot of an example code walkthrough explaining Redocly's config file with callouts for filters and preview slots" src="../images/code-walkthrough-panels.png" withLightbox=true /%}

## Markdoc tags

Code walkthroughs are created using the following Markdoc tags:

- [**Code Walkthrough:**](#syntax-and-usage) This tag is the main tag that encompasses the other tags creating the code walkthrough interface.
- [**Step:**](./step.md) This tag organizes individual steps of your walkthrough enabling you to bind them to `chunks` in code snippets, highlighting those sections in the code as the users selects the steps.
- [**Toggle:**](./toggle.md) This tag adds toggles allowing users to control the visibility of the displayed content and code snippets.
- [**Input:**](./input.md) This tag adds input fields to the code walkthrough allowing users to customize code samples to meet their use case.

Additionally, use [conditions](#conditions-object) to selectively display parts of a code walkthrough based on context, and [chunk annotations](#chunk-annotations) to control the highlighting behavior of code snippets.

## Syntax and usage

Add an opening and closing `code-walkthrough` tag to wrap the other tags and create the two pane code walkthrough.
The code walkthrough tag requires a `filesets` attribute that specifies which code files to display on the right side panel.

{% markdoc-example %}

```markdoc {% title="Code Walkthrough Example" process=false %}
{% code-walkthrough
  filesets=[
    {
      "files": ["./node-project/request.js"],
      "downloadAssociatedFiles": ["./node-project/package.json"],
      "when": {
        "server": "Node"
      }
    }
  ]
  filters={
    "server": {
      "label": "Server",
      "items": [{"value": "Node"}, {"value": "Python"}]
    },
    "client": {
      "label": "Client",
      "items": [{"value": "Next.js"}, {"value": "React"}]
    }
  }
%}
  # Code Walkthrough Title
  Add steps and explanations here to guide users through the code.
  {% step id="step-1" heading="Step 1" %}
    Add step content here.
  {% /step %}
{% /code-walkthrough %}
```
{% /markdoc-example %}

To highlight sections of code in the sample code files in the right side panel when users select text in the left side panel, wrap content in the left side panel in a `step` tag with corresponding id attributes used in the code sample chunk annotations, as in the following example:

{% tabs %}
{% tab label="Markdown file" %}
{% markdoc-example %}
```markdoc {% process=false %}
{% code-walkthrough %}
{% step id="add-text" heading="Add text to HTML file" %}
Add text to your HTML file.
{% /step %}
{% /code-walkthrough %}
```
{% /markdoc-example %}
{% /tab %}
{% tab label="Code file" %}
```html
<!-- @chunk {"steps": ["add-text"]} -->
<p>Hello, world!</p>
<!-- @chunk-end -->
```
{% /tab %}
{% /tabs %}

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- filesets
- [[Filesets object](#filesets-object)]
- **REQUIRED.** A list of filesets used in the code walkthrough.
  Each `filesets` entry must have a list of `files`.

---

- filters
- Map[string, [Filter object](#filter-object)]
- A map of category IDs to filter configurations
  Each filter configuration contains an object with an `items` list of objects that have a `value` property.
  Used to organize and conditionally display content.
  Example:
  {% markdoc-example %}
  ```markdoc {% process=false %}
  {% code-walkthrough 
    filesets=[
      {
        "files": ["./code-walkthrough/index.md"],
        "downloadAssociatedFiles": ["./node-project/package.json"],
        }
    ]
    filters={
      "platform": {  
        "label": "Platform",
        "items": [
            { "value": "ios" },
            { "value": "android" }
        ]
      },
      "language": {
        "label": "Language",
        "items": [
            { "value": "swift" },
            { "value": "kotlin" }
        ]
      }
    }
  %}
  {% /code-walkthrough %}
  ```
  {% /markdoc-example %}
  You can then reference these filters in `when` and `unless` conditions in a `step` tag or [chunk annotations](#chunk-annotations), as in the following example:
  ```markdoc {% process=false %}
  {% step id="step-1" when={ "platform": "ios", "language": "swift" } %}
  iOS-specific Swift code
  {% /step %}
  ```
{% /table %}

## Filesets object

Configure a filesets object to include files in your code walkthrough.

{% table %}

- Attribute
- Type
- Description

---

- files
- [string]
- **REQUIRED.** A list of file paths to include in the walkthrough.

---

- downloadAssociatedFiles
- [string]
- A list of file paths for files users can download but aren't part of the code walkthrough.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the files from the `filesets` are visible.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the files from the `filesets` **are not** visible.

{% /table %}

### Filesets example

{% markdoc-example %}
```markdoc {% title="Filesets example" process=false %}
{% code-walkthrough
  filesets=[
      {
        "files": ["./code-walkthrough/index.md"],
        "downloadAssociatedFiles": ["./node-project/package.json"],
        }
    ]
%}
{% /code-walkthrough %}
```
{% /markdoc-example %}

## Filter object

Configure a filter object to organize content and provide users a UI element for displaying selected parts of the code-walkthrough.

{% table %}

- Attribute
- Type
- Description

---

- label
- string
- The label displayed for the filter.

---

- items
- [[Value object]](#value-object)
- A reserved list of objects, each consisting of a `"value"` key and its value.
  This list renders as the items users can select to filter the walkthrough content.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the the filter is visible.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the filter **is not** visible.

{% /table %}

### Filter example

{% markdoc-example %}
```markdoc {% title="Filter example" process=false %}
{% code-walkthrough
  filesets=[
      {
        "files": ["./node-project/request.js"],
        "downloadAssociatedFiles": ["./node-project/package.json"],
        "when": {
          "server": "Node"
        }
      }
    ],
    filters={
      "platform": {                    // filter ID
        "items": [
          { "value": "ios"},
          { "value": "android"}
        ]
      },
      "language": {                    // Another filter ID
        "items": [
          { "value": "swift", "when": { "platform": "ios" }},
          { "value": "kotlin"}
        ]
      }
    }
%}
...
{% /code-walkthrough %}
```
{% /markdoc-example %}

## Value object

A reserved list of objects, each consisting of a `"value"` key and its value.
This list renders as the items users can select to filter the walkthrough content.


{% table %}

- Attribute
- Type
- Description

---

- value
- string
- **REQUIRED.** Value of the item.

---

- when
- [Conditions object](#conditions-object)
- Conditions for when the item is visible.

---

- unless
- [Conditions object](#conditions-object)
- Conditions for when the item is not visible.


{% /table %}

## Conditions object

{% partial file="../../../_partials/conditions-object.md" /%}

## Preview slot

Use the Preview slot to add media or other markup to the code walkthrough.
The content you reference in the Preview slot renders in the right pane, together with code snippets.

You can use this optional element to show users an image "preview" of what they build in the course of the walkthrough.

### Slot "preview" examples

```markdoc {% process=false title="Preview slot syntax with a Markdoc image" %}
{% code-walkthrough %}
  {% slot "preview" %}
    {% img src="./images/ticket.jpg" alt="Sample museum ticket" width="300" height="200" %}
  {% /slot %}
{% /code-walkthrough %}
```

```markdoc {% process=false title="Preview slot syntax with an HTML image" %}
{% code-walkthrough %}
  {% slot "preview" %}
    <img src="images/ticket.jpg" alt="Sample museum ticket" width="300" height="200".
  {% /slot %}
{% /code-walkthrough %}
```

```markdoc {% process=false title="Preview slot syntax with a webpage in an iframe tag" %}
{% code-walkthrough %}
  {% slot "preview" %}
    <iframe src="/museum/tour/index.html" width="100%" height="300" style="border:1px solid black;">
    </iframe>
  {% /slot %}
{% /code-walkthrough %}
```

## Chunk annotations

{% partial file="../../../_partials/chunk-annotations.md" /%}

## Resources

- **[Create code walkthrough](./create-code-walkthrough.md)** - Learn to use the custom code-walkthrough Markdoc tag to create interactive code guides with step-by-step explanations
- **[Toggle tag](./toggle.md)** - Add interactive toggle functionality to your code walkthrough content, allowing users to explore different configurations and scenarios
