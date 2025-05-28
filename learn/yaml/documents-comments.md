---
seo:
  title: Documents and comments
---
# Lesson 2: Documents and comments

YAML files have a `.yaml` or `.yml` file extension.
YAML may exist within other files including Markdown (`.md`) files.

## Document types

The course uses bare documents for most examples because most of the documents encountered in day-to-day work are bare documents.

- A bare document excludes three dashes `---` which indicates the start of the explicit YAML document.
- A bare document also excludes three dots `...` which indicates the end of the explicit YAML document.
- Front matter in Markdown starts with three dashes `---` and ends with three dashes `---` at the top of the file.

{% admonition type="warning" name="Avoid explicit documents" %}
Explicit documents may confuse your family, friends, and colleagues.
Avoid them when possible.
{% /admonition %}

```yaml Bare YAML document
weather: sunny
```

```yaml Markdown front matter
---
weather: sunny
---
# My Heading

And my body paragraph text.
```
```yaml Explicit YAML document
---
weather: sunny
...
```

## Comments

A comment in YAML starts with an octothorpe `#` symbol.
The rest of that line is a comment.

This is a comment in front matter of a Markdown file.

```yaml
---
# This is a comment
title: This is our YAML.
---
This is the Markdown content.
```

This is the same YAML in a bare document:

```yaml
# This is a comment
title: This is our YAML.
```

Comments can start mid-line too.

```yaml
seo:
  title: This is our YAML. # This is a comment
```

If you want to use the literal `#` character you may need to escape it.

You can do that with quotes.

```yaml
title: "This is our YAML. # This is not a comment"
```

You'll learn more about how to do that in [Lesson 4: Scalars](./scalars.md).

There's no equivalent to comments in JSON.
Comments are a human-friendly feature of YAML.
