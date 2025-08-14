---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `codeSnippet`

Code snippets are small sections of code you can include in your Markdown and OpenAPI documents.
In Markdown code snippets are formatted by wrapping the text in two sets of three backticks, placed at the start and end of the text block.

For example, the following is a code snippet with yaml:

````markdown {% title="codeSnippet with YAML" %}
```yaml
codeSnippet:
  copy:
    hide: true
```
````

Markdown code snippets include a report and copy icon in the top right corner.

In OpenAPI reference documentation, code snippets are generated based on the information in the description.
The following is an example of a request and response code snippet in OpenAPI reference documentation:

![Screenshot of a request and response in OpenAPI reference documentation](./images/openapi-code-snippet.png)

OpenAPI reference documentation code snippets include report, copy, and expand and collapse icons in the top right corner.

You can configure the `codeSnippet` element to hide the copy, expand, and collapse buttons.
You can also configure the report element's tooltip and dialog label text.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "codeSnippet"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- elementFormat
- string
- A value that specifies the style for the control icons. Possible values: `icon`, `text`. Default: `icon`

---

- copy
- [Copy](#copy-object)
- An object with the list of specific settings for a code snippet's copy button.

---

- report
- [Report](#report-object)
- An object with the list of specific settings for a code snippet's report button.

---

- expand
- [Expand](#expand-object)
- An object with the list of specific settings for a code snippet's expand button.

---

- collapse
- [Collapse](#collapse-object)
- An object with the list of specific settings for a code snippet's collapse button.

{% /table %}

### Copy object

Users can use copy button to put code snippet raw content into the clipboard.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the copy button should be hidden.
  Default value: `false`.

---

{% /table %}

### Report object

Users can use the report button to send problem feedback about the code snippet's content.
When users click the report button or text, they are provided a comment feedback form.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the report button should be hidden.
  Default value: `true`.

---

- label
- string
- Label inside the report dialog form. Default value: `What is wrong with the code?`.

---

- tooltipText
- string
- Text of the tooltip of the report button. Default value: `Report a problem`.

{% /table %}

### Expand object

Use the expand button to show all the nested properties inside a JSON object that is included as a sample request or response in an OpenAPI definition.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the expand button should be hidden.
  Default value: `false`.

{% /table %}

### Collapse object

Users can use collapse button to hide all the nested properties inside a JSON object that is included as a sample request or response in an OpenAPI definition.

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the collapse button should be hidden.
  Default value: `false`.

{% /table %}

## Configuration scope

Configure code snippets globally in your `redocly.yaml` file or for individual pages using front matter.

### Global configuration

Configuration added to the `redocly.yaml` file applies to all Markdown and API reference pages:

```yaml
codeSnippet:
  elementFormat: text
  report:
    label: Please tell us what is wrong with this code sample.
    tooltipText: Send feedback about this code sample
```

### Page-level configuration

Configure code snippets for individual pages in the front matter. Front matter configurations take precedence over global settings:

```yaml
---
codeSnippet:
  report:
    label: What is wrong with this code sample?
---
```

## Examples

### Hide or customize icons

Hide the copy button:

```yaml
codeSnippet:
  copy:
    hide: true
```

Display all icons as text instead of icons:

```yaml
codeSnippet:
  elementFormat: text
```

Hide all icons:

```yaml
codeSnippet:
  copy:
    hide: true
  report:
    hide: true
  expand:
    hide: true
  collapse:
    hide: true
```

### Configure report feedback

Enable the report button with custom label and tooltip:

```yaml
codeSnippet:
  report:
    label: Please tell us what is wrong with this code sample.
    tooltipText: Send feedback about this code sample
```

### Hide expand and collapse buttons

Hide the expand and collapse buttons on JSON objects in OpenAPI reference documentation:

```yaml
codeSnippet:
  expand:
    hide: true
  collapse:
    hide: true
```

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

### Tree view

Display file and directory structures using the `treeview` language:

````markdown
```treeview
.
├── guides/                 # Guides
│   ├── guide-1.md
│   └── guide-2.md
├── images/                 # Various shared images
│   ├── favicon.png
│   └── header-image.png
├── tutorials/              # Tutorials
│   ├── tutorial-1.md
│   ├── tutorial-2.md
│   ├── index.md
│   └── sidebars.yaml       # Sidebar specific to the 'tutorials' section
├── static/                 # Static assets copied directly to build output
│   └── robots.txt
├── index.page.tsx          # Custom React component for the landing page
├── package.json            # Node.js project manifest
└── redocly.yaml            # Main Redocly configuration file
```
````

Result:

```treeview
.
├── guides/                 # Guides
│   ├── guide-1.md
│   └── guide-2.md
├── images/                 # Various shared images
│   ├── favicon.png
│   └── header-image.png
├── tutorials/              # Tutorials
│   ├── tutorial-1.md
│   ├── tutorial-2.md
│   ├── index.md
│   └── sidebars.yaml       # Sidebar specific to the 'tutorials' section
├── static/                 # Static assets copied directly to build output
│   └── robots.txt
├── index.page.tsx          # Custom React component for the landing page
├── package.json            # Node.js project manifest
└── redocly.yaml            # Main Redocly configuration file
```

## Customizing labels and tooltips

Translation keys provide customization options for code snippet control texts. For complete details, refer to the [Translation Keys Reference](../content/localization/translation-keys.md).

## Resources

- **[Code-snippet Markdoc tag](../content/markdoc-tags/code-snippet.md)** - Display code snippets loaded from local files with syntax highlighting and interactive features
- **[Feedback configuration](./feedback.md)** - Configure the feedback mechanism that appears on all pages and code snippets for user input collection
- **[Front matter configuration](./front-matter-config.md)** - Configure code snippet behavior and appearance on individual pages using front matter settings
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization
