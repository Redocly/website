# Partial tag

The `partial` tag enables you to reuse content across your documentation, bringing the concept of single-source publishing to your technical writing.

## Syntax and usage

Use the `partial` tag to render content pulled from a file in the `_partials` folder.
The `file` attribute is used to pass a pointer to the source file.

**Example syntax:**

{% markdoc-example %}
  ```markdown {% process=false title="/docs/setup.md" %}
  ## Setup steps

  {% partial file="/_partials/tutorial-first-steps.md" /%}
  ```
{% /markdoc-example %}

### Use partials in Redocly

{% admonition type="info" %}
  The information in this section applies specifically to using partials in a _Redocly project_.
{% /admonition %}

#### Use partial folders

In Redocly, content is only exposed for reuse when a file is stored in a _designated partials folder_.

By default, add partials by moving files into a `_partials` folder in the root of your project.

**Configure custom folder names**

To use a different name for your reused content, add the following configuration to your `redocly.yaml` file:

```yaml
markdown:
  partialsFolders:
    - snippets
    - shared-content
```

You can add multiple folder names if you have multiple folders for storing partials.
After adding the `partialsFolders` configuration, the default `_partials` folder name will no longer work unless explicitly included in the configuration.

**Folder requirements**

- Partial files don't need special front matter or naming conventions
- If you have images in partials, add an `images` folder to the partials folder
- Content must be placed in a designated partials folder to be reusable

#### The raw-partial tag

The `raw-partial` tag serves a similar purpose to the `partial` tag but with an important difference in processing order.

While the standard `partial` tag renders the partial content after processing the main document, the `raw-partial` tag includes the partial content first, before any other processing occurs.

Use like `{% raw-partial file="..."}`.

##### When to use raw-partial

Use the `raw-partial` tag in these scenarios:

- When using reference-style Markdown links in your partial content
- When composing parts of a table (such as adding rows)
- When the partial needs to be processed as part of the main document's context

The `raw-partial` tag allows the included content to be treated as if it were written directly in the main document, making it suitable for cases where the processing order matters.

#### Limitations of partials

**Reference links**

Don't use [reference-style Markdown links](https://www.markdownguide.org/basic-syntax/#reference-style-links) inside the partial because they resolve incorrectly upon page load.
For links inside a partial, absolute links are the best approach.

## Attributes

{% table %}

- Option {% width="15%" %}
- Type
- Description

---

- file
- string
- The relative or absolute path to the source file used as a partial.
  Must be stored in a [partials folder](#use-partial-folders).

---

- variables
- object
- Key value pairs that can be accessed from inside the partial.
  Useful for conditional rendering and dynamic content.

{% /table %}

## Examples

### Add a shared content section

This example demonstrates using partials to add a Learning Resources section across different guides or tutorials.

**Example partial content:**

```text {% title="/_partials/redocly-cli-resources.md" %}
The following resources help you learn more about the Redocly CLI:

- [Redocly CLI commands](/docs/cli/commands/index.md) - Learn the commands built into the CLI.
- [Configure API linting](/docs/cli/guides/configure-rules.md) - Learn how to tailor the Redocly CLI linting for your own needs.
- [Redocly CLI cookbook](https://github.com/Redocly/redocly-cli-cookbook) - Bite-sized example CLI customizations to inspire your own.
```

**Example partial syntax:**

{% markdoc-example %}
  ```markdown {% title="docs/cli/install.md" process=false %}
  {% partial file="/_partials/redocly-cli-resources.md" /%}
  ```
{% /markdoc-example %}

### Pass variables to partials

This example demonstrates passing values to a partial using the `variables` attribute:

**Example partial content:**

{% markdoc-example %}
```markdown {% title="/_partials/fav-food.md" process=false %}
{% $person %}'s favorite food is {% $favFood %}.
```
{% /markdoc-example %}

**Example partial syntax:**

{% markdoc-example %}
  ```markdown {% title="docs/about.md" process=false %}
  {% partial
    file="/_partials/favorite-food.md"
    variables={
      person: "Taylor",
      favFood: "Katsu curry"
    }
  /%}
  ```
{% /markdoc-example %}

**Rendered output:**

Taylor's favorite food is Katsu curry.

## Best practices

Partials are especially useful for repeatable content where you want to maintain a central source of truth.
Partials add value by improving writer productivity, ensuring information consistency, or reducing maintenance costs.

**Create descriptive filenames**

Give your partial a descriptive filename to help authors understand what content to expect.

**Make partials composable**

All partials _render as a whole_, meaning all content inside the source file renders.
Content should be self-contained enough to be used throughout other documents without additional context.

**Use code-snippet for code partials**

If a partial contains only code, consider using the [code snippet tag](./code-snippet.md) instead.
The code snippet tag allows you to insert specific parts of a code sample, providing more flexibility.

**Use absolute links over relative**

Use absolute links in your partials to ensure they resolve correctly everywhere the content is reused.

**Nest with caution**

Partials can be nested, but this can create confusion for authors.
If using nesting, create a folder structure that keeps organization clear.
