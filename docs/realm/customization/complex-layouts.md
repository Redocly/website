---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Build complex layouts with Markdoc

Redocly Realm allows you to create advanced, "SDK-style" or three-pane layouts by combining various Markdoc components.
While the API reference automatically uses a three-pane layout (navigation, content, and samples), you can achieve similar visual compositions in your custom documentation pages.

This guide demonstrates how to combine components like `code-walkthrough`, `tabs`, `cards`, and `code-group` to create rich, interactive documentation.

## Create a two-pane code walkthrough

The `code-walkthrough` component is the most effective way to create a side-by-side layout where prose on the left explains code snippets on the right.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% code-walkthrough
     filesets=[
       {
         "files": ["../../hello-world.js"]
       }
     ]
  %}

  {% step id="step1" %}
  ### Step 1: Initialize
  Start by importing the necessary modules and initializing your application.
  {% /step %}

  {% step id="step2" %}
  ### Step 2: Define the handler
  Create a function to handle incoming requests.
  {% /step %}

  {% /code-walkthrough %}
  ```
{% /markdoc-example %}

## Organize content with tabs

Use tabs to group related content, such as code examples in different languages or alternative configuration options.

{% markdoc-example %}
  ````markdoc {% process=false %}
  {% tabs %}
    {% tab label="cURL" %}
    ```bash
    curl -X GET https://api.example.com/v1/data
    ```
    {% /tab %}
    {% tab label="JavaScript" %}
    ```javascript
    fetch('https://api.example.com/v1/data')
      .then(response => response.json())
      .then(data => console.log(data));
    ```
    {% /tab %}
  {% /tabs %}
  ````
{% /markdoc-example %}

## Use cards for navigation and highlights

Cards are ideal for creating grid-based layouts that serve as entry points to different sections of your documentation.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% cards columns=2 %}
    {% card title="Authentication" icon="lock" to="https://example.com/auth" %}
    Learn how to secure your API requests.
    {% /card %}
    {% card title="Pagination" icon="list" to="https://example.com/pagination" %}
    Handle large datasets with our pagination API.
    {% /card %}
  {% /cards %}
  ```
{% /markdoc-example %}

## SDK-style layouts

To achieve a full "SDK-style" feel in your guides:

1. **Top-level organization:** Use `Tabs` at the top of the page for high-level categories.
2. **Side-by-side content:** Use `code-walkthrough` for detailed, step-by-step instructions.
3. **Information callouts:** Use `Admonitions` to highlight important tips or warnings within your steps.
4. **Interactive examples:** Use `openapi-code-sample` inside your content to provide live-like API interaction examples.

### Example composition

The following example combines these elements into a single cohesive layout.

{% markdoc-example %}
  ````markdoc {% process=false %}
  # Advanced SDK Guide

  {% tabs %}
    {% tab label="Quickstart" %}
    {% cards columns=3 %}
      {% card title="Node.js" icon="brands node-js" /%}
      {% card title="Python" icon="brands python" /%}
      {% card title="Go" icon="brands golang" /%}
    {% /cards %}
    {% /tab %}
    {% tab label="Full Reference" %}
    Refer to the [API reference](../../@api/index.md) for details.
    {% /tab %}
  {% /tabs %}

  ---

  {% code-walkthrough
     filesets=[
       {
         "files": ["../../hello-world.js"]
       }
     ]
  %}

  {% step id="init" %}
  ## Initialization
  First, set up your credentials.

  {% admonition type="info" %}
  Keep your API key secure and never commit it to version control.
  {% /admonition %}
  {% /step %}

  {% /code-walkthrough %}
  ````
{% /markdoc-example %}

## Resources

- **[Markdoc tags library](../content/markdoc-tags/index.md)** - See all available components
- **[Create code walkthroughs](../content/markdoc-tags/code-walkthrough/index.md)** - Detailed guide on using the code-walkthrough component
- **[Custom page templates](./custom-page-templates.md)** - Learn how to build entirely custom page structures
