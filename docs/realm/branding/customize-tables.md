# Customize tables

Styling tables in your technical documentation improves readability and aesthetics. This guide shows you how to customize Markdown and Markdoc tables using CSS.

Redocly supports tables written in both Markdown and Markdoc syntax.

## Before you begin

You'll need:
- Basic [CSS knowledge](./styling.md)
- A Realm, Reef, or Revel project with a `@theme/styles.css` file

## Table styling basics

In Redocly projects, you can create global styles for all tables or style individual tables. Most table styling requires custom CSS.

- Define global table styles with [CSS variables](./styling.md#css-variable-concepts) in global [scopes](./styling.md#scope-and-inheritance).
- Create individual table styles using CSS [selectors](./styling.md#selectors).

CSS variables handle many table styling needs. For more advanced styling, use CSS selectors to target specific table elements.

### HTML table structure

Markdown and Markdoc tables convert to HTML when displayed. Understanding HTML table structure helps you write more precise CSS selectors for targeted styling.

<details>
  <summary>See HTML table syntax</summary>

  ```html {% title="Example HTML table" %}
    <table>
      <thead>
        <tr>
          <th>Heading 1</th>
          <th>Heading 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
        <tr>
          <td>Cell 4</td>
          <td>Cell 5</td>
        </tr>
      </tbody>
    </table>
  ```
</details>

## Add global table styles

Apply consistent styling across all tables by:

1. Ensuring your `@theme/styles.css` file has a `:root` selector.
    - Add `:root.dark` if using color modes.

2. Setting [table CSS variables](./css-variables/component.md#markdown) in your root selectors.

3. (Optional) Using HTML table selectors for elements not covered by CSS variables.

This example adds global table styles with color mode variants:

    ```{% title="@theme/styles.css" %}
    :root {
      --md-table-cell-padding: 8px;
      --md-table-border-color: black;
      --md-table-header-bg-color: #EDEDF2;

      & table {
        border-collapse: collapse;
      }
    }
    :root.dark {
      --md-table-border-color: white;
      --md-table-header-bg-color: #3B3D44;
    }
    ```

## Style Markdown tables

Target specific tables and elements with CSS selectors based on table headers. Tables with matching headers will share styling.

### Use the data-label

Each header value automatically becomes a `data-label` attribute on `th` tags when rendered. Use this attribute to style specific columns or tables.

This example sets the width and background color of the "Favorite veggie" column:

```css {% title="@theme/styles.css" %}
:root th[data-label="Favorite vegetable"] {
  width: 80%;
  background-color: lightyellow;
}
```

| Person | Favorite vegetable |
|-------|-----|
| Taylor | Brussel sprouts |
| Annabelle | Asparagus |
| Oliver | Bell peppers |
| Daisy | Carrots |

### Combine CSS selectors

Create more advanced styles by combining `data-label` with other CSS selectors:

```css {% title="@theme/styles.css" %}
:root table:has(th[data-label="Favorite animal"]) {
  --md-table-border-color: black;
  --md-table-header-bg-color: gold;

  & tr:nth-child(even) {
    background-color: cornsilk;
  }
}

:root.dark table:has(th[data-label="Favorite animal"]) {
  --md-table-border-color: white;
  --md-table-header-bg-color: indigo;

  & tr:nth-child(even) {
    background-color: mediumpurple;
  }
}
```

| Person | Favorite animal |
|-------|-----|
| Oliver | Penguins |
| Daisy | Rabbits |
| Taylor | Snow leopard |
| Annabelle | Ostrich |

## Style Markdoc tables

Control Markdoc table appearance with attributes or custom classes. Attributes provide quick layout control while classes offer complete styling flexibility.

### Use built-in attributes

Shape your table layout with three built-in attributes - no CSS required:
- `width` - Controls column width
- `align` - Sets text alignment
- `colspan` - Spans cells across columns

Example of a table customized with attributes:

{% markdoc-example %}
  ```none {% process=false %}
  {% table %}
    * Person
    * Favorite food {% width="80%" %}
  ---
    * Pizza {% colspan=2 align="center" %}
  ---
    * Annabelle
    * Bacon
  ---
    * Oliver
    * Popsicle
  ---
    * Daisy {% align="right" %}
    * Dog treats
  {% /table %}
  ```
{% /markdoc-example %}

{% table %}

- Person
- Favorite food {% width="80%" %}

---

- Pizza {% colspan=2 align="center" %}

---

- Annabelle
- Bacon

---

- Oliver
- Popsicle

---

- Daisy {% align="right" %}
- Dog treats

{% /table %}

### Create custom classes

For advanced styling, create CSS classes and add them to your Markdoc table tag:

```css {% title="@theme/styles.css" %}
:root .striped-table-rows {
  --md-table-border-color: black;
  --md-table-header-bg-color: royalblue;

  & tr:nth-child(even) {
    background-color: lightskyblue;
  }
}

:root.dark .striped-table-rows {
  --md-table-border-color: white;
  --md-table-header-bg-color: darkgreen;

  & tr:nth-child(even) {
    background-color: mediumseagreen;
  }
}
```

{% markdoc-example %}
  ```markdown {% process=false %}
  {% table .striped-table-rows .md %}
    * Person
    * Favorite activity
  ---
    * Taylor
    * Snowboarding
  ---
    * Annabelle
    * Roblox
  ---
    * Oliver
    * Swings
  ---
    * Daisy
    * Dog park
  {% /table %}
  ```
{% /markdoc-example %}

{% admonition type="warning" name="Warn" %}
  Include the `.md` class on the tag to inherit default theme styling.
{% /admonition %}


{% table .striped-table-rows .md %}

- Person
- Favorite activity
---

- Taylor
- Snowboarding

---

- Annabelle
- Roblox

---

- Oliver
- Swings

---

- Daisy
- Dog park

{% /table %}

### Style specific rows

Highlight important information by styling specific rows in your tables. Add a CSS class directly to a row in your Markdoc table, then target that class in your CSS.

```css {% title="@theme/styles.css" %}
/* Style all cells in rows containing the class */
:root tr:has(.highclick) > * {
  background-color: yellow;
  --md-table-cell-text-color: black;
}

:root tr:has(.medclick) > * {
  background-color: lightyellow;
  --md-table-cell-text-color: black;
}

:root.dark tr:has(.highclick) > * {
  background-color: gold;
  --md-table-cell-text-color: black;
}

:root.dark tr:has(.medclick) > * {
  background-color: khaki;
  --md-table-cell-text-color: black;
}
```

Here's how to apply these classes to specific rows:

{% markdoc-example %}
  ```markdown {% process=false %}
  {% table .md %}
    * Task
    * Clicks required
    * Notes
  ---
    * Change your logo {% .highclick %}
    * 10
    * Only found details on Getting started page
  ---
    * Change the color of a heading
    * 2
    *
  ---
    * Revert changes {% .medclick %}
    * 8
    * Could be highlighted more in the sidebar
  ---
    * Add admonition
    * 3
    *
  {% /table %}
  ```
{% /markdoc-example %}

{% table .md %}
* Task
* Clicks required
* Notes
---
* Change your logo {% .highclick %}
* 10
* Only found details on Getting started page
---
* Change the color of a heading
* 2
*
---
* Revert changes {% .medclick %}
* 8
* Could be highlighted more in the sidebar
---
* Add admonition
* 3
*
{% /table %}

This example shows how to highlight high-click tasks in yellow and medium-click tasks in light yellow, with appropriate dark mode alternatives.

## Resources

- [Customize styles](./customize-styles.md) - Learn to customize the styles of your Redocly projects.
- [Customize color modes](./customize-color-modes.md) - Add unique styling for each color mode.
- [Styling](./styling.md) - Learn how styling works in Realm.
- [Color mode](./color-mode.md) - Learn how color modes work in Realm.
- [CSS variables dictionary](./css-variables/index.md) - See a list of available CSS variables.
