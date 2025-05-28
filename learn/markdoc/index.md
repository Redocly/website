---
seo:
  title: Markdoc Overview for Technical Writers
  description: Transform your technical writing with Markdoc, a Markdown extension that uses custom tags to give writers more flexibility and control over their content.
---

# Markdoc Overview for Technical Writers

[Markdoc](https://markdoc.dev/) is a powerful, Markdown-based authoring framework designed to empower technical writers to build better documentation. Markdoc unlocks tools that give writers much deeper control over the content while minimizing the added complexity.

Markdoc is an _extension_ of Markdown, which means it builds on familiar writing patterns while adding support for "custom tag syntax". An example:

{% admonition type="info" %}
This element was **added with a Markdoc tag**. Pretty neat!
{% /admonition %}

{% markdoc-example %}

```{% process=false %}
{% admonition type="info" %}
  This element was **added with a Markdoc tag**. Pretty neat!
{% /admonition %}
```

{% /markdoc-example %}

Tag syntax provides the core mechanism that Markdoc uses to enhance the capabilities of Markdown.

## Build your own writing tools

Adopting Markdoc is like buying a new tool box that includes a set of starter tools. The tools are useful, but, over time, you add new tools to the tool box that are more specialized or help you work better.

If Markdoc is a tool box, then the starter tools inside are:

- Markdown elements - headers, links, lists, etc.
- Markdoc tags - "built-in" tags include table, partial, and if/else

Markdoc is more than a tool; it's a **system for extending Markdown**. By defining custom tags, developers can create new, specialized tools and put them in the shared tool box your writers are using. Markdoc empowers documentation teams to build their own set of _custom writing tools tailored to their unique needs_.

## Markdown with tag syntax

Markdoc provides enhanced features through a custom tag syntax. Authors write with Markdown, but can reach for Markdoc tags when they need to add a more complex element or extend a Markdown element.

Features provided by Markdoc's tag syntax:

{% table %}

- Feature
- Summary

---

- Tags
- Tags are elements authors use to extend Markdown. Built-in tags are native to Markdoc while custom tags are built with React components.

---

- Attributes
- Attributes pass data to a Markdoc tag. They give authors control over the behavior and appearance of a tag. Custom tags can use attributes to define how an author interacts with a tag.

---

- Variables
- Variables are values that resolve at runtime. Variables give authors the ability to dynamically customize the page content.

---

- Functions
- Functions are used to transform variables or content at runtime. Built-in functions are native to Markdoc, but you can also add custom functions. They're quite useful for adding [conditional logic to content](#dynamic-content-control).

{% /table %}

### Code in content

Under the hood, authors using Markdoc tags are combining code and content. But that doesn't mean they need to be a developer! Markdoc was intentionally designed to abstract that complexity _away from authors_.

Custom Markdoc tags are _pre-built_ React components. Developers add new tags by creating the component and defining a tag schema. Authors use the tag as a writing element, but never have to see or touch the underlying implementation. The result is that **authors get the functionality of mixing code and content without the added complexity**.

## Built-in Markdoc features

In addition to the extensibility and customization that Markdoc makes possible, the native, out-of-the-box Markdoc features still add valuable new capabilities to Markdown.

### Reusable documentation

Markdoc makes it possible to use [partials](https://markdoc.dev/docs/partials) in your Markdown.

Partials allow you to reuse sections of content across different pages or sections in your documentation. In larger documentation projects, this feature can create _a lot_ of value. Some benefits:

- **Single source of truth** - Maintain a single version of shared content, reducing inconsistencies and maintenance effort through better single sourcing.
- **Faster, more reliable changes** - Change shared information in one place and it's automatically reflected in all instances the partial is used.

#### Partial tag example

You're managing the documentation for an enterprise-scale company offering multiple API products. All products have the same process that developers need to follow to generate an API key. You need to include those exact same steps at the start of _every_ tutorial. Instead of copy/pasting across hundreds of documents, you could use a partial for single sourcing.

To use the `{% partial /%}` tag:

1. Create a new Markdown file: _/docs/\_snippets/generate-api-key.md_.
2. Write and save the steps to generate an API key in the file.
3. Add the partial tag to each guide where you want the content shared.

Example of a partial:
{% markdoc-example %}

```{% process=false %}
# Cool API product guide

Here's some _great_ info. Ready to build?

{% partial file="../_snippets/partial-example.md" /%}
```

{% /markdoc-example %}

### Dynamic content control

Markdoc ships with built-in tags for conditional logic, `{% if %}` and `{% else /%}`. When used with Markdoc's [built-in functions](https://markdoc.dev/docs/functions), these tags can control how content is displayed. Authors can add logic that personalizes content or restricts access based on a pre-defined criteria.

#### If Else tag example

You're writing a guide for an API product that is only available to paying customers at a certain subscription level. You want other customers and prospects to be able to discover the page, but you want to show them different content. Certain customers should see the technical content and others should see a message to upgrade.

To use `{% if %}` and `{% else /%}` tags:

1. Create a custom function to pull claims from a user's JWT.
2. Use Markdoc's conditional tags to call the function and conditionally display the content.

{% markdoc-example %}

```{% process=false %}
{% if getUserClaims($userToken, "premium") %}
  Amazing technical instructions about a closed product! This content might contain **Markdown** or **Markdoc Tags**.
  {% partial file="../_snippets/partial-example.md" /%}
{% else /%}
  You need to upgrade to use this product. Contact sales.
{% /if %}
```

{% /markdoc-example %}

### Tables designed for humans

Tired of building tables in Markdown? There's a better way. Markdoc exposes table syntax that looks, feels, and functions _better_. The first time I created a table with Markdoc, it was like riding in a car after only traveling by horse-drawn carriage my whole life. Markdoc tables use a syntax that looks quite similar to Markdown lists. They also support rich text.

{% admonition type="info" %}
Markdoc supports Markdown table syntax.
{% /admonition %}

#### Table tag example

The example below shows a Markdoc table with different formats inside it. The third row demonstrates how to add content when you need to use multiple lines.

{% split-view %}
{% left-view title="Syntax" %}

    {% markdoc-example %}

        ```{% process=false %}
          {% table %}
            * First Heading
            * Second Heading
            ---
            * Cell **content**.
            * _More_ cell content.
            ---
            *
              Multi-line
              content is much
              easier!
            *
              Even Markdoc tags!
              {% admonition type="info" %}
                Neat!
              {% /admonition %}
          {% /table %}
         ```

    {% /markdoc-example %}

{% /left-view %}
{% right-view title="Output" %}

    {% table %}
      * First Heading
      * Second Heading
      ---
      * Cell **content**.
      * _More_ cell content.
      ---
      *
        Multi-line
        content is much
        easier!
      *
        A Markdoc tag:
        Even Markdoc tags!
        {% admonition type="info" %}
          Neat!
        {% /admonition %}
    {% /table %}

{% /right-view %}
{% /split-view %}

## Better technical writing with Markdoc

Markdoc is an important innovation for technical writers. It empowers documentation teams to extend Markdown by designing and building writing tools that meet their unique needs. Markdoc makes powerful new features accessible to technical writers while minimizing complexity, successfully bridging the gap between content and code in a way that _feels good to write with_.

We think Markdoc is more than just an alternative to traditional Markdown; it's a significant leap forward, empowering writers with more flexibility and freedom. As you continue your Markdoc journey, consider the possibilities it holds for your own documentation. What writing tools would have an outsized impact _your_ technical writing?
