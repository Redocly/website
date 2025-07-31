# Code snippet tag

The `code snippet` tag displays code examples in your documentation that are loaded from local files.

## Syntax and usage

The `code snippet` tag is a self-closing tag, which means it has no child elements.
Use attributes to pass the path to the local file and configure how the snippet is displayed.

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

- file
- string
- The absolute or relative path to the file with the code snippet.

---

- from
- number | string
- Use to specify the **starting point** of your code snippet and _include_ it in the rendered element.
  Works with either a line number or a specific string contained in the starting line.
  Cannot be used with `after`.

---

- to
- number | string
- Use to specify the **ending point** of your code snippet and _include_ it in the rendered element.
  Works with either a line number or a specific string contained in the starting line.
  Cannot be used with `before`.

---

- after
- number | string
- Similar to `from` but _excludes the starting point_ from the rendered element.
  Cannot be used with `from`.

---

- before
- number | string
- Similar to `to` but _excludes the ending point_ from the rendered element.
  Cannot be used with `to`.

---

- prefix
- string
- Use to add explanatory information at the start of the code snippet.
  Prepend with `//` to style as a comment.
  We recommend including a new line (`\n`) at the end of the prefix.

---

- language
- string
- Sets the syntax highlighting rules for the code sample used.
  Syntax highlighting is available for all languages listed on the [supported languages page](https://prismjs.com/#supported-languages).

---

- title
- string
- Set the text displayed in the gray header at the top of the code snippet.
- Commonly used for filenames.

---

- `wrap`
- boolean
- Wraps long lines in the code snippet to avoid or reduce horizontal scroll.
  Default value is `false`.

{% /table %}

## Examples

### Use line numbers as selectors

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

### Use strings as selectors

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

Avoid unnecessary details or context.
Simplified code snippets are easier for your readers to understand and apply.

**Centralize example files**

Store your example code in a central directory to make them easier to manage, update, and reference from code snippet tags.

## Related configuration

- Configure code snippet appearance, icons, and behavior using the [`codeSnippet`](../../config/code-snippet.md) configuration option.
- Learn how to [highlight lines, add file names, and use advanced features](../../config/code-snippet.md#examples) in code snippets.
- Set up [global and page-level configuration](../../config/code-snippet.md#configuration-scope) for consistent code snippet styling.
