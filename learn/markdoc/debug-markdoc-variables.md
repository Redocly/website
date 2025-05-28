# Debug Markdoc Variables

Markdoc variables allow you to customize your content at runtime. However, when things don't render, it can be a little tricky to diagnose the problem.

This guide shows you how to use Markdoc's built-in `{% debug %}` tag to gain visibility into the variables resolving at runtime.

## Render the resolved value

The documentation you're maintaining includes version-specific notes in a page's front matter. As the product evolves, new version notes are added to a page's front matter when changes in that version impact a specific feature.

```yaml
---
versionNotes:
  "1.2.8": "This version removed the default lightbox behavior from images."
---
```

You're trying to add the version notes into your Markdown document as a Markdown variable. However, the following snippet doesn't seem to work:

{% markdoc-example %}
  ```markdoc

  **Important version notes:** - {% $frontmatter.versionNotes.1.2.8 %}

  ```
{% /markdoc-example %}

To understand why the version notes aren't displaying as expected, you could render the content and structure of the variable using the debug tag, as in the following example:

{% markdoc-example %}
  ```markdoc
  {% debug($frontmatter.versionNotes) %}
  ```
{% /markdoc-example %}

The rendered output reveals that you're trying to reference a nested property with incorrect syntax. This information helps you correct the variable by adding square brackets and quotes, as in the following example:

{% markdoc-example %}
  ```markdoc
  **Important version notes:** - {% $frontmatter.versionNotes["1.2.8"] %}
  ```
{% /markdoc-example %}

## Resources

* [Markdoc Docs](https://markdoc.dev/) - Learn more about Markdoc from the official documentation.
* [Markdoc Overview](./index.md) - Read our Markdoc overview for technical writers.
* [Evaluating Markdoc](./evaluating-markdoc.md) - Evaluate whether adopting Markdoc is the right move for your documentation team.