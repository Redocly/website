# Code snippet tag

The `code-snippet` tag displays code examples in your documentation that are loaded from local files.

## Syntax and usage

The `code-snippet` tag is a self-closing tag, which means it has no child elements.
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

### Add file names to code snippets

Add a file name to display in the code snippet header using the `title` attribute:

````markdoc {% process=false %}
```js {% title="scripts.js" %}
function test() {
  console.log('Hello World!');
}
```
````

Result:

```js {% title="scripts.js" %}
function test() {
  console.log('Hello World!');
}
```

### Highlight lines and text

Highlight a specific line using `[!code highlight]`:

````markdoc {% process=false %}
```js
function test() {
  console.log('Hello World!'); // [!code highlight] [!code highlight]
}
```
````

Result:

```js
function test() {
  console.log('Hello World!'); // [!code highlight]
}
```

Highlight multiple consecutive lines:

````markdoc {% process=false %}
```js 
// [!code highlight:3] [!code highlight:3]
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

Result:

```js
// [!code highlight:3]
function test() { 
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);
}
```

Highlight non-consecutive lines using the `highlight` attribute:

````markdoc {% process=false %}
```js {% highlight="{1,3-4}" %}
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

Result:

```js {% highlight="{1,3-4}" %}
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);
}
```

Highlight specific words or symbols:

````markdoc {% process=false %}
```js
// [!code word:Hello] [!code word:Hello]
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);  // prints "Hello World"
}
```
````

Result:

```js
// [!code word:Hello]
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);  // prints "Hello World"
}
```

Focus on specific lines by dimming others with a code comment:

````markdoc {% process=false %}
```js
function test() {
  const hello = 'Hello'; // [!code focus] [!code focus]
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

Or with a Markdoc tag and a pattern.

````markdoc {% process=false %}
```js {% highlight="/Hello/" %}
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);  // prints "Hello World"
}
```
````

Result:

```js
function test() {
  const hello = 'Hello'; // [!code focus]
  const world = 'World';
  console.log(hello + " " + world);
}
```

Mark lines with error and warning levels:

````markdoc {% process=false %}
```js
function test() {
  console.log('No errors or warnings');
  console.error('Error'); // [!code error] [!code error]
  console.warn('Warning'); // [!code warning] [!code warning]
}
```
````

Result:

```js
function test() {
  console.log('No errors or warnings');
  console.error('Error'); // [!code error]
  console.warn('Warning'); // [!code warning]
}
```

Show added and removed lines:

````markdoc {% process=false %}
```js
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world); // [!code --] [!code --]
  console.log(`${hello} ${world}`); // [!code ++] [!code ++]
}
```
````

Result:

```js
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world); // [!code --]
  console.log(`${hello} ${world}`); // [!code ++]
}
```

## Best practices

**Minimize complexity**

Avoid unnecessary details or context.
Simplified code snippets are easier for your readers to understand and apply.

**Centralize example files**

Store your example code in a central directory to make them easier to manage, update, and reference from code snippet tags.

## Resources

- **[Code snippet configuration](../../config/code-snippet.md)** - Complete reference for customizing code snippet appearance, icons, and behavior across your documentation
- **[Global and page-level configuration](../../config/code-snippet.md#configuration-scope)** - Apply consistent code snippet styling and settings throughout your project
