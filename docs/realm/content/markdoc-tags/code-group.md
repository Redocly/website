# Code group tag

The `code-group` tag renders a set of code snippets in a tabbed view, allowing users to easily switch between different examples.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- mode
- string
- The mode of the code group.
  Can be `tabs` or `dropdown`.
  Defaults to `tabs`.

{% /table %}

## Syntax and usage

To create a code group, use the `code-group` tag and nest code blocks or `code-snippet` tags within it.
Each code block or `code-snippet` represents a tab in the group.

Example syntax:

````markdoc {% process=false %}
{% code-group %}
  ```js {% title="index.js" %}
  import { foo } from "./foo.js";
  console.log("Hello, JavaScript!"); // comment
  ```
  ```js {% title="foo.js" %}
  export const foo = "foo";
  ```
{% /code-group %}
````

**Result:**

{% code-group %}
  ```js {% title="index.js" %}
  import { foo } from "./foo.js";
  console.log("Hello, JavaScript!"); // comment
  ```
  ```js {% title="foo.js" %}
  export const foo = "foo";
  ```
{% /code-group %}



## Tab naming

The name of each tab is determined by the attributes of the code block or `code-snippet` tag in the following order of precedence:

1. the `title` attribute of the code block or `code-snippet` tag
2. the `file` attribute of the `code-snippet` tag
3. the `lang` attribute of the `code-snippet` tag or language from the code block is converted to a human-readable name (e.g., `js` becomes `JavaScript`).

If none of these attributes are provided, the tabs will be named "Tab 1", "Tab 2", and so on.

If the `mode` attribute is set to `dropdown`, the name of the tab is determined by the language of the code block or `code-snippet` tag.

## Examples

### Tabs

````markdoc {% process=false %}
{% code-group %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  ```python {% title="main.py" %}
  print("Hello, Python!"); # comment
  ```
{% /code-group %}
````

**Result:**

{% code-group %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  ```python {% title="main.py" %}
  print("Hello, Python!"); # comment
  ```
{% /code-group %}

### Dropdown mode

````markdoc {% process=false %}
{% code-group mode="dropdown" %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  ```python {% title="main.py" %}
  print("Hello, Python!"); # comment
  ```
{% /code-group %}
````

**Result:**

{% code-group mode="dropdown" %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  ```python {% title="main.py" %}
  print("Hello, Python!"); # comment
  ```
{% /code-group %}


### Mix code blocks and `code-snippet` tags

You can mix code blocks and `code-snippet` tags in the same `code-group`.

Example element:

````markdoc {% process=false %}
{% code-group %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  {% code-snippet file="./code-examples/museum-config.yaml"
    language="yaml" from=1 to=10 title="museum-redocly.yaml"
  /%}
{% /code-group %}
````

**Result:**

{% code-group %}
  ```js {% title="index.js" %}
  console.log("Hello, JavaScript!"); // comment
  ```
  {% code-snippet file="./code-examples/museum-config.yaml"
    language="yaml" from=1 to=10 title="museum-redocly.yaml"
  /%}
{% /code-group %}