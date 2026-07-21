---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Numbered list and numbered-item tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `numbered-list` tag renders a vertical, sequential list of items connected by a rail, providing a structure for step-by-step instructions, timelines, and processes.
Each item can hold rich Markdown content, including code blocks, admonitions, and tables.

If an item starts with a heading, the heading becomes the item headline:
it receives a deep-linkable anchor, appears in the "On this page" table of contents, and users can copy a direct link to the item by clicking its marker.

## Syntax and usage

Add an opening and closing `numbered-list` tag to declare a numbered list.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% numbered-list %}
  {% /numbered-list %}
  ```
{% /markdoc-example %}

Wrap the content of each step within a `numbered-item` tag.
An item only works as a child of a numbered list.
Markers auto-number from 1 in document order.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% numbered-list %}
    {% numbered-item %}
    ### Install the CLI

    Install the Redocly CLI globally.
    {% /numbered-item %}
    {% numbered-item %}
    ### Lint your API description

    Run `redocly lint` and fix any errors.
    {% /numbered-item %}
  {% /numbered-list %}
  ```
{% /markdoc-example %}

## Attributes

### Numbered list

{% table %}

- Attribute
- Type
- Description

---

- type
- enum (`number`, `icon`, or `dot`)
- Sets the marker style.
  Use `number` for auto-numbered steps, `icon` for per-item icons set with the numbered-item `icon` attribute, and `dot` for minimal dots in a compact timeline look.
  **Default:** `number`

---

- size
- enum (`small` or `medium`)
- Sets the size of the markers and the rail.
  Use `small` for compact layouts and `medium` for default spacing.
  Has no effect when `type` is `dot`.
  **Default:** `medium`

{% /table %}

### Numbered item

{% table %}

- Attribute
- Type
- Description

---

- icon
- string
- Sets the marker icon when the list `type` is `icon`.
  Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from other built-in packs, prefix the icon name with: `solid` (for Classic Solid), `duotone` (for Duotone Solid), or `brands` (for Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
  - Relative path to an icon image file.

    **Example:** `./images/config-icon.svg`

{% /table %}

## Examples

### Step-by-step instructions

The default numbered markers suit sequential procedures.
The following example documents a short setup flow where each item headline is deep-linkable and listed in the table of contents:

{% markdoc-example %}
  ````markdoc {% process=false %}
  {% numbered-list %}
    {% numbered-item %}
    ### Install the CLI

    Install the Redocly CLI globally:

    ```bash
    npm i -g @redocly/cli
    ```
    {% /numbered-item %}
    {% numbered-item %}
    ### Configure your project

    Create `redocly.yaml` in the project root and describe your APIs:

    ```yaml
    apis:
      workforce@v1:
        root: ./openapi/workforce.yaml
    ```
    {% /numbered-item %}
    {% numbered-item %}
    ### Preview the docs

    Run `redocly preview` and open the printed local URL.
    {% /numbered-item %}
  {% /numbered-list %}
  ````
{% /markdoc-example %}

### Icon markers

Icon markers replace numbers with a visual cue for each step.
The following example uses icons to illustrate an API onboarding flow:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% numbered-list type="icon" %}
    {% numbered-item icon="key" %}
    ### Get an API key

    Sign in to the dashboard and generate a key on the **API keys** page.
    {% /numbered-item %}
    {% numbered-item icon="terminal" %}
    ### Make your first request

    Call the API with the key in the `Authorization` header.
    {% /numbered-item %}
    {% numbered-item icon="rocket" %}
    ### Ship it

    Deploy to production once the sandbox responses look right.
    {% /numbered-item %}
  {% /numbered-list %}
  ```
{% /markdoc-example %}

### Dot markers

Dot markers render a compact timeline.
The following example shows the lifecycle of a documentation page:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% numbered-list type="dot" %}
    {% numbered-item %}
    ### Draft

    The page exists only on your branch.
    {% /numbered-item %}
    {% numbered-item %}
    ### In review

    Reviewers comment directly on the preview deployment.
    {% /numbered-item %}
    {% numbered-item %}
    ### Published

    Merged to the default branch and live on the production site.
    {% /numbered-item %}
  {% /numbered-list %}
  ```
{% /markdoc-example %}

### Checklist without headlines

An item without a leading heading renders body-only: no headline and no anchor.
The following example uses small markers for a terse checklist:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% numbered-list size="small" %}
    {% numbered-item %}
    Run `redocly lint` locally.
    {% /numbered-item %}
    {% numbered-item %}
    Push and wait for CI to pass.
    {% /numbered-item %}
    {% numbered-item %}
    Request a review from the docs team.
    {% /numbered-item %}
  {% /numbered-list %}
  ```
{% /markdoc-example %}

## Best practices

**Use one list per procedure**

Keep a single numbered list for one task from start to finish.
Splitting a procedure across multiple lists restarts the numbering and breaks the visual flow of the rail.

**Start items with a heading for linkable steps**

A leading heading gives the step an anchor and a table of contents entry, so readers can share a link to an exact step.
Choose a heading level that fits the page hierarchy and keep it consistent across items in the same list.

**Keep item content focused**

Item bodies support rich content such as code blocks, admonitions, tables, and tabs, but each item should describe one action.
Move long background explanations outside the list.

## Resources

- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags
- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to use Markdoc in your documentation
