---
seo:
  title: Partial Markdoc Tag
  description: Use the partial tag to reuse content throughout your documentation. Includes examples and information for using partials in a Redocly project.
---

# Partial Tag [{% markdoc-tag-badge badgeType="Built-in" /%}](./tag-library#redocly-tag-badge)

The partial tag enables you to reuse content across your documentation, bringing the concept of [single-source publishing](https://en.wikipedia.org/wiki/Single-source_publishing) to your technical writing.

## Syntax and usage

Use the partial tag to render content pulled from a file in the `_partials` folder. The `file` attribute is used to pass a pointer to the source file.

Example syntax:

{% markdoc-example %}
  ```markdown {% process=false title="/docs/setup.md" %}
  ## Setup steps

  {% partial file="/_partials/tutorial-first-steps.md" /%}
  ```
{% /markdoc-example %}

### Partials in Redocly

{% admonition type="info" %}
  The information in this section applies specifically to using partials in a _Redocly project_.
{% /admonition %}

#### Use partial folders

In Redocly, content is only exposed for reuse when a file is stored in a _designated partials folder_.

By default, you can add partials by moving files into a `_partials` folder in the root of your project. To add custom folders for partials, you'll need to register them using the `partialFolders` property in the `markdown` section of your Redocly configuration file.

#### Limitations of partials

**Reference links**

You can't use [reference-style Markdown links](https://www.markdownguide.org/basic-syntax/#reference-style-links) inside the partial because they resolve incorrectly upon page load. If you're using links inside a partial, then absolute links are the best approach.

## Attributes

{% table %}

- Option
- Type
- Description

---

- `file`
- String
- The relative or absolute path to the source file used as a partial. Must be stored in a [partials folder](#partials-in-redocly).

---

- `variables`
- Object
- Key value pairs that can be accessed from inside the partial. Useful for conditional rendering and dynamic content.

{% /table %}

## Examples

### General partial example

The following example shows how to use partials to add a Learning Resources section that can be shared across different guides or tutorials.

**Example partial content:**

```markdown {% title="/_partials/redocly-cli-resources.md "%}
#### Redocly CLI Learning Resources

The following resources will help you learn more about the Redocly CLI:

* [Redocly CLI commands](/docs/cli/commands) - Learn the commands built into the CLI.
* [Configure API linting](/docs/cli/guides/configure-rules) - Learn how to tailor the Redocly CLI linting for your own needs.
* [Redocly CLI cookbook](https://github.com/Redocly/redocly-cli-cookbook) - Bite-sized example CLI customizations to inspire your own.
```

**Example partial syntax:**

{% markdoc-example %}
  ```markdown {% process=false %}
  {% partial file="/_partials/redocly-cli-resources.md" /%}
  ```
{% /markdoc-example %}

**Example partial elements:**

{% group-elements %}
  {% partial file="/docs-legacy/_snippets/partial-example-redocly-cli-resources.md" /%}
{% /group-elements %}

### Partial with variables

The following example shows how to use `variables` to pass values to a partial:

**Example partial content:**

{% markdoc-example %}
  ```markdown {% process=false %}
  {% $person %}'s favorite food is {% $favFood %}.
  ```
{% /markdoc-example %}

**Example partial syntax:**

{% markdoc-example %}
  ```markdown {% process=false %}
  {% partial
    file="/_partials/favorite-food.md"
    variables={
      person: "Taylor",
      favFood: "Katsu curry"
    }
  /%}
  ```
{% /markdoc-example %}

**Example partial elements:**

{% group-elements %}
  {% partial
    file="/docs-legacy/_snippets/partial-example-fav-food.md"
    variables={
      person: "Taylor",
      favFood: "Katsu curry"
    }
  /%}
{% /group-elements %}

## Best practices

Partials are especially useful for repeatable content where you want to maintain a central source of truth. Partials add value by improving writer productivity, ensuring information consistency, or reducing maintenance costs.

**Descriptive filenames**

Giving your partial a descriptive filename helps the author using it understand what to find there.

**Make partials composable**

All partials _render as a whole_, meaning all content inside the source file renders. You want content to be self-contained enough that it can be used throughout other documents without additional context needed.

**Use code-snippet for code partials**

If a partial contains only code, then the [code snippet tag](./code-snippet.md) may be a better choice. The code snippet tag allows you to insert specific parts of a code sample, which provides more flexibility.

**Favor absolute links over relative**

Using absolute links in your partials will ensure that they resolve correctly everywhere that the content is reused.

**Nest with caution**

Partials can be nested, but that can make confusing for authors to work with. If you use nesting, create a folder structure that helps keep things organized.
