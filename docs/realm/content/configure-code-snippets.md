# Configure code snippets

You can configure code snippets to change the copy and report icons to text, as well as to customize the label and tooltip text of the report icon.
To configure code snippets, you add options under the `codeSnippet` option.

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` file in the root of your project

## Configure globally

Configuration for the `codeSnippet` option added to the `redocly.yaml` file updates all Markdown and API reference pages globally.

## Configure by page

You can configure the `codeSnippet` option for individual Markdown pages in the front matter.
Front matter configurations take precedence, but if an option's setting is not configured in the front matter but is configured in the `redocly.yaml` file, it applies.

The following is an example `codeSnippet` configuration in the front matter of a Markdown page:

```yaml
---
report:
  label: What is wrong with this code sample?
---
```

The example configuration updates the text that displays when users hover over the report icon to, "Report a problem with code sample."
After selecting the report icon, following the question, "What is wrong with this code sample?", users can then enter a free-form response into a text field.

## Configure code snippet icons

You can configure the code snippet icons to be hidden or to display as text instead of the default icons.

To hide the code snippet icons, use the following configuration:

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

{% admonition type="info" %}
Expand and collapse buttons only appear on JSON request or response examples in OpenAPI files.
{% /admonition %}

To display the code snippet icons as text, use the following configuration:

```yaml
codeSnippet:
  elementFormat: text
```

## Configure report options

All code snippets include a report icon users can select to send feedback about the code snippet.
You can customize the label or the tooltip text for the report button on code snippets.

To customize the label or the tooltip text for the report button:

1. Add the `report` object, under the `codeSnippet` object.
   ```yaml
   codeSnippet:
     report:
   ```
2. Add the `label` option with the value of the statement or question you want displayed above the text box in the comment form modal:
   ```yaml
   codeSnippet:
     report:
       label: Please tell us what is wrong with this code sample.
   ```
3. Add the `tooltipText` option with the value of the text you want displayed when users hover over the report icon or text.

   ```yaml
   codeSnippet:
     report:
       label: Please tell us what is wrong with this code sample.
   ```

   The example configuration updates the text that displays when users hover over the report icon to, "Send feedback about this code sample."
   After selecting the report icon, following the statement, "Please tell us what is wrong with this code sample," users can then enter a free-form response into a text field.

{% admonition type="info" name="View the feedback form responses" %}
The data collected from this feedback form is displayed by project on the **Feedback reports** page.
See [View and export feedback data](../reunite/project/view-export-data.md) for more information.
{% /admonition %}

## Add file name

You can add a file name to code snippets to display in the gray header of the code snippet.

To add a file name to a code snippet, add the following Markdoc tag to your code snippet, directly after the code language:

{% markdoc-example %}

````markdown {% process=false %}
```js {% title="scripts.js" %}
function test() {
  console.log('Hello World!');
}
```
````

{% /markdoc-example %}

The example is a code snippet of JavaScript code with the file name, "scripts.js" added and would display as follows:

```js {% title="scripts.js" %}
function test() {
  console.log('Hello World!');
}
```

## Insert code from a file

To add all of or a section of the code from a file in your repository, use the [`code-snippet` Markdoc tag](https://redocly.com/docs/learn-markdoc/tags/code-snippet/).
You can either use line numbers or actual text from the file to indicate where the code snippet should begin and end.
You can also include the file name with the `title` attribute and add syntax highlighting when you add the `language` attribute.

The following example Markdoc syntax pulls content from a `hello-world.js` file and includes the entire file:

```markdoc {% title="Example with number from and to" process=false %}
{% code-snippet file="../hello-world.js" language="js" title="hello-world.js" /%}
```

The following code snippet is how the example Markdoc syntax is rendered:

{% code-snippet file="../hello-world.js" language="js" title="hello-world.js" /%}

The following example Markdoc syntax pulls content from a `hello-world.js` file and includes code between line 2 and "//end":

```markdoc {% title="Example with string from and before" process=false %}
{% code-snippet file="../hello-world.js" from=2 before="//end" language="js" /%}
```

The following code snippet is how the example Markdoc syntax is rendered:

{% code-snippet file="../hello-world.js" from=2 before="//end" language="js" title="hello-world.js" /%}

## Add prefix

To add a prefix at the beginning of a code snippet pulled from a file in your repository, use the `prefix` attribute of the [`code-snippet` Markdoc tag](https://redocly.com/docs/learn-markdoc/tags/code-snippet/).

The following example Markdoc syntax pulls lines 2 to 4 from a `hello-world.js` file and includes a comment, "Example prefix comment" and includes a newline:

```markdoc {% title="Example with prefix comment" process=false %}
{% code-snippet 
   prefix="// Example prefix comment\n" 
   file="../hello-world.js" 
   language="js" 
   from=2 
   to=4 
   title="hello-world.js" /%}
```

The following code snippet is how the example Markdoc syntax is rendered:

{% code-snippet
   prefix="// Example prefix comment\n"
   file="../hello-world.js"
   language="js"
   from=2
   to=4
   title="hello-world.js"
/%}

## Highlight lines

You can highlight specific lines or symbols in a code snippet. For example, to indicate a change or to draw attention to a specific part of the code.

Use `[!code highlight]` inside the snippets code comment to highlight a line. The following example highlights line 2 in a code snippet:

````markdoc {% process=false %}
```js
function test() {
  console.log('Hello World!'); // [!code highlight] // [!code highlight]
}
```
````

You can also highlight multiple consecutive lines with a single comment:

````markdoc {% process=false %}
```js 
// [!code highlight:3] // [!code highlight:3]
function test() { 
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

To highlight multiple lines that are not consecutive, add the following Markdoc tag to your code snippet, directly after the code language:

````markdoc {% process=false %}
```js {% highlight="{1,3-4}" %}
function test() {  // [!code highlight]
  const hello = 'Hello';
  const world = 'World';  // [!code highlight]
  console.log(hello + " " + world);  // [!code highlight]
}
```
````

There is an ability to highlight a word or symbol in any subsequent code. Use `[!code word:Hello]` to highlight the word `Hello` in a code snippet:

````markdoc {% process=false %}
```js
// [!code word:Hello] // [!code word:Hello]
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);  // prints "Hello World"
}
```
````

To highlight a word or symbol using regex, add the following Markdoc tag to your code snippet, directly after the code language:

````markdoc {% process=false %}
```js {% highlight="/Hello/" %}
// [!code word:Hello]
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world);  // prints "Hello World"
}
```
````

You can focus on a specific line or symbol in a code snippet by using the `[!code focus]` tag. The following example focuses on line 2 in a code snippet:

````markdoc {% process=false %}
```js
function test() {
  const hello = 'Hello'; // [!code focus] // [!code focus]
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

To focus multiple lines with a single comment:

````markdoc {% process=false %}
```js
function test() {
  const hello = 'Hello'; // [!code focus:2] // [!code focus:2]
  const world = 'World';
  console.log(hello + " " + world);
}
```
````

Use `// [!code error]` and `// [!code warning]` to mark a line with an error and warning levels:


````markdoc {% process=false %}
```js
function test() {
  console.log('No errors or warnings');
  console.error('Error'); // [!code error] // [!code error]
  console.warn('Warning'); // [!code warning] // [!code warning]
}
```
````

You can highlight lines as added or removed. To do that, use `// [!code ++]` and `// [!code --]` to mark added and removed lines:

````markdoc {% process=false %}
```js
function test() {
  const hello = 'Hello';
  const world = 'World';
  console.log(hello + " " + world); // [!code --] // [!code --]
  console.log(`${hello} ${world}`); // [!code ++] // [!code ++]
}
```
````

## Tree view

To display a tree view of a code snippet, use the `treeview` language.

````markdoc {% title="Tree view example" process=false %}
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

**Result:**

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
