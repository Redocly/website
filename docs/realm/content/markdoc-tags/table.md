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
# Table tag

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `table` tag enables you to create tables using a list-based syntax that allows for injection of rich content, like bulleted lists and code samples.
You can also add tables using HTML syntax, but the `table` tag allows for richer content and is easier to format.

## Syntax and usage

Use the `table` tag to add tables with rich content to your documentation.

Example syntax:

```markdoc {% process=false %}
{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Disables breadcrumb links in the project when set to `true`.
  Default: `false`.

---

- prefixItems
- [[Breadcrumb object](#)]
- A list of breadcrumb links to always be displayed first.

{% /table %}
```

## Attributes

{% table %}

- Option
- Type
- Description

---

- align
- string
- Sets the text alignment to either `center`, `left`, or `right`.
  Default: `left`.

---

- colspan
- number
- Sets the total number of columns the cell spans, including itself, extending to the right.

---

- rowspan
- number
- Sets the total number of rows the cell spans, including itself, extending downward.

---

- width
- string
- Sets the width of the table column.
  Allowed values: percentage or pixels.
  Values without `"%"` are treated as pixels.
  For example: `"40%"`, `"200px"`, `"350"`.

{% /table %}

## Examples

The following examples illustrate using rich text in Markdoc tables:

### Example table with bullets and set column width

{% markdoc-example %}

  ```markdoc {% process=false %}
  {% table %}

  - Type
  - Description {% width="40%" %}
  - Example

  ---

  - Sentiment

  - - Includes a question or statement with a thumbs-up and thumbs-down icon.
    - This is the default feedback form and displays without configuration.
    - Users can express either a positive or negative reaction to the page.

  - {% img
      src="../images/sentiment-01.png"
      alt="Screenshot of the sentiment feedback form"
      withLightbox=true
    /%}

  ---

  - Mood

  - - Includes a question or statement with a smiling-face, neutral-face, and frowning-face icon.
    - Users can express a positive, negative, or neutral review of the page.

  - {% img
      src="../images/mood-01.png"
      alt="Screenshot of the mood feedback form"
      withLightbox=true
    /%}

  ---

  - Rating

  - - Includes a question or statement with five star icons.
    - Users can rate a page from one to five stars.

  - {% img
      src="../images/rating-01.png"
      alt="Screenshot of the rating feedback form"
      withLightbox=true
    /%}

  ---

  - Scale

  - - Includes a question or statement, left-hand side and right-hand side text labels, and buttons for numbers 1 - 10.
    - Users can rate a page from one to ten.

  - {% img
      src="../images/scale-01.png"
      alt="Screnshot of the scale feedback form"
      withLightbox=true
    /%}

  ---

  - Comment

  - - Includes a text label and text input.
    - Users can use the text field to express their thoughts about the page in a free-form way.

  - {% img
      src="../images/comment-01.png"
      alt="Screenshot of the comment feedback form"
      withLightbox=true
    /%}

  {% /table %}
  ```

{% /markdoc-example %}

### Example table with code samples

{% table %}

- Option
- Type
- Description

---

- languages
- [language object]
- **REQUIRED.**
  Array of language objects, one per language.
  The samples are displayed in the order that they are listed.
  Default:

  ```javascript
  [
    { lang: curl },
    { lang: JavaScript },
    { lang: Node.js },
    { lang: Python },
    { lang: Java },
    { lang: C# },
    { lang: PHP },
    { lang: Go },
    { lang: Ruby },
    { lang: R },
    { lang: Payload }
  ]
  ```

---

- skipOptionalParameters
- boolean
- Excludes optional parameters (cookies, headers, query params) from the generated code samples.
  Default: `false`.

{% /table %}

**Example table with code samples syntax:**

{% markdoc-example %}

  ````markdoc {% process=false %}
  {% table %}


  - Option
  - Type
  - Description

  ---

  - languages
  - [language object]
  - **REQUIRED.**
    Array of language objects, one per language.
    The samples are displayed in the order that they are listed.
    Default:

    ```javascript
    [
      { lang: curl },
      { lang: JavaScript },
      { lang: Node.js },
      { lang: Python },
      { lang: Java },
      { lang: C# },
      { lang: PHP },
      { lang: Go },
      { lang: Ruby },
      { lang: R },
      { lang: Payload }
    ]
    ```

  ---

  - skipOptionalParameters
  - boolean
  - Excludes optional parameters (cookies, headers, query params) from the generated code samples.
    Default: `false`.

  {% /table %}

  ````

{% /markdoc-example %}

### Example table without headings

A table without headings works best when the content is self-explanatory, such as a glossary of terms and their definitions.

{% table %}

---

- API key
- A unique token used to authenticate requests to the API.

---

- Webhook
- An HTTP callback that Redocly sends to your server when a specific event occurs.

{% /table %}

**Example table without headings syntax:**

{% markdoc-example %}

```markdoc {% process=false %}
  {% table %}

  ---

  - API key
  - A unique token used to authenticate requests to the API.

  ---

  - Webhook
  - An HTTP callback that Redocly sends to your server when a specific event occurs.

  {% /table %}
```

{% /markdoc-example %}

### Example table with column and row span

{% table %}

- Category
- Parameter
- Type
- Description

---

- Pagination {% rowspan=2 %}
- page
- integer
- The page number to retrieve.
  Default: `1`.

---

- limit
- integer
- The maximum number of items to return per page.
  Default: `20`.

---

- Deprecated parameters {% colspan=4 align="center" %}

---

- Legacy {% rowspan=2 %}
- offset
- integer
- The number of items to skip before starting to collect results.
  Superseded by `page`.

---

- cursor
- string
- An opaque pointer to the next page of results.
  Superseded by `limit`.

{% /table %}

**Example table with column and row span syntax:**

{% markdoc-example %}

  ```markdoc {% process=false %}
  {% table %}

  - Category
  - Parameter
  - Type
  - Description

  ---

  - Pagination {% rowspan=2 %}
  - page
  - integer
  - The page number to retrieve.
    Default: `1`.

  ---

  - limit
  - integer
  - The maximum number of items to return per page.
    Default: `20`.

  ---

  - Deprecated parameters {% colspan=4 align="center" %}

  ---

  - Legacy {% rowspan=2 %}
  - offset
  - integer
  - The number of items to skip before starting to collect results.
    Superseded by `page`.

  ---

  - cursor
  - string
  - An opaque pointer to the next page of results.
    Superseded by `limit`.

  {% /table %}
  ```

{% /markdoc-example %}

## Best practices

Tables are especially useful for displaying complex data in an organized way.

**Do not use tables for layout**

Do not use tables to place elements side-by-side on a page.
Instead, use CSS utility classes like Flexbox.
For an example of how to arrange diagrams horizontally, see [Use CSS utility classes for layout](../../branding/customize-styles.md#use-css-utility-classes-for-layout).

**Use a list if only one column**

If you only have a single column, a list is probably a better way to display the information.

**Include an introductory sentence**

Introduce tables with an explanatory sentence that describes the significance of the table.

## Resources

- **[Customize table styles](../../branding/customize-tables.md)** - Style tables with CSS variables, custom classes, and mode-specific styling for enhanced visual presentation
- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Use Markdoc in your documentation
- **[Markdoc tags](./index.md)** - The full list of supported Markdoc tags
