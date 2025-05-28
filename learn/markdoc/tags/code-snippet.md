---
seo:
  title: Code Snippet Markdoc Tag
  description: Display code snippets in your documentation by loading them from local files using the code snippets tag.
---

# Code Snippet Tag [{% markdoc-tag-badge badgeType="Redocly" /%}](./tag-library#redocly-tag-badge)

The code snippet tag displays code examples in your documentation that are loaded from local files.

## Syntax and usage

Code snippet is a self-closing tag, which means it has no child elements. Use attributes to pass the path to the local file and configure how the snippet is displayed.

Example element:

{% code-snippet
  file="./code-examples/museum-config.yaml"
  language="yaml"
  from=1
  to=10
  title="museum-redocly.yaml"
/%}

Example syntax:

{% markdoc-example %}
  ```{% process=false %}
  {% code-snippet
    file="./code-examples/museum-config.yaml"
    language="yaml"
    from=1
    to=10
    title="museum-redocly.yaml"
  /%}
  ```
{% /markdoc-example %}

## Attributes

{% table %}

- Option
- Type
- Description

---

- `file`
- String
- The absolute or relative path to the file with the code snippet.

---

- `from`
- Number | String
- Use to specify the **starting point** of your code snippet and _include_ it in the rendered element. Works with either a line number or a specific string contained in the starting line. Cannot be used with `after`.

---

- `to`
- Number | String
- Use to specify the **ending point** of your code snippet and _include_ it in the rendered element. Works with either a line number or a specific string contained in the starting line. Cannot be used with `before`.

---

- `after`
- Number | String
- Similar to `from` but _excludes the starting point_ from the rendered element. Cannot be used with `from`.

---

- `before`
- Number | String
- Similar to `to` but _excludes the ending point_ from the rendered element. Cannot be used with `to`.

---

- `prefix`
- String
- Use to add explanatory information at the start of the code snippet. Prepend with `//` to style as a comment. We recommend including a new line (`\n`) at the end of the prefix.

---

- `language`
- String
- Sets the syntax highlighting rules for the code sample used. Syntax highlighting is available for all languages listed on the [supported languages page](https://prismjs.com/#supported-languages).

---

- `title`
- String
- Set the text displayed in the grey header at the top of the code snippet. Commonly used for filenames.

---

- `wrap`
- Boolean
- Wraps long lines in the code snippet to avoid or reduce horizontal scroll. Default value is `false`.

{% /table %}

## Examples

### Line numbers as selectors

Example element:

{% code-snippet
  file="./code-examples/museum-config.yaml"
  language="yaml"
  from=11
  to=16
  title="museum-redocly.yaml"
  prefix="// Please reserve navbar entries for important use cases \n"
/%}

Example syntax:

{% markdoc-example %}
  ```{% process=false %}
  {% code-snippet
    file="./code-examples/museum-config.yaml"
    language="yaml"
    from=11
    to=16
    title="museum-redocly.yaml"
    prefix="// Please reserve navbar entries for important use cases \n"
  /%}
  ```
{% /markdoc-example %}

### Strings as selectors

Example element:

{% code-snippet
  file="./code-examples/museum-config.yaml"
  language="yaml"
  from="footer"
  to="redirects"
  title="museum-redocly.yaml"
/%}

Example syntax:

{% markdoc-example %}
  ```{% process=false %}
  {% code-snippet
    file="./code-examples/museum-config.yaml"
    language="yaml"
    from="footer"
    to="redirects"
    title="museum-redocly.yaml"
  /%}
  ```
{% /markdoc-example %}

### Compare selection attributes

Using the `to` / `from` selectors **includes** the starting or ending point in the rendered example while the `after` / `before` selectors **excludes** them.

The examples below use the same source file with different selection attributes.

**To / from example syntax**

{% markdoc-example %}
  ```{% process=false %}
  {% code-snippet
    file="./code-examples/useTabs.ts"
    from=12
    to=14
  /%}
  ```
{% /markdoc-example %}

**To / from example element**

{% code-snippet
  file="./code-examples/useTabs.ts"
  from=12
  to=14
/%}

**After / before example syntax**

{% code-snippet
  file="./code-examples/useTabs.ts"
  after=12
  before=14
/%}

**After / before example element**

{% markdoc-example %}
  ```{% process=false %}
  {% code-snippet
    file="./code-examples/useTabs.ts"
    after=12
    before=14
  /%}
  ```
{% /markdoc-example %}

## Best practices

**Minimize complexity**

Avoid unnecessary details or context. Simplified code snippets are easier for your readers to understand and apply.

**Centralize example files**

Store your example code in a central directory to make them easier to manage, update, and reference from code snippet tags.
