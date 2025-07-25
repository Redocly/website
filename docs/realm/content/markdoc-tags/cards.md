# Card and Cards tags

The `card` and `cards` tags work together to create visually appealing, structured content elements ("cards") in your documentation.

The `card` tag allows you to create an individual card element that contains your markup, while the `cards` tag organizes multiple cards into a responsive grid layout.

## Syntax and usage

Add an opening and closing `cards` tag to wrap the card elements.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% cards %}
  {% /cards %}
  ```
{% /markdoc-example %}

Wrap content in a `card` and configure them using attributes.
A card only works as a child of `cards`.

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% cards %}
    {% card title="First card" icon="images/first-card.svg" %}
      I'm a **card**.
    {% /card %}
    {% card title="Second card" icon="images/second-card.svg" %}
      I'm a card, _too_.
    {% /card %}
    {% card title="Third card" icon="images/third-card.svg" %}
      I'm actually a brochure.
    {% /card %}
  {% /cards %}
  ```
{% /markdoc-example %}

## Attributes - Card

{% table %}

- Attribute
- Type
- Description

---

- title
- string
- **REQUIRED.**
  The title of the card.

---

- to
- string
- URL or path for the card to link to. When set, the entire card behaves as a link.

---

- variant
- string
- Visual style of the card. Can be `filled`, `outlined`, `elevated`, or `ghost`.
  Defaults to `filled`.

---

- image
- string
- Path to an image to display in the card.

---

- imagePosition
- string
- Set position of the image in the card to `start` or `end`.
  Defaults to `start`.

---

- icon
- string
- Path to an icon to display on the card.
  Supports image files or SVGs.

---

- iconVariant
- string
- Style of the icon.
  Can be `filled` or `ghost`.

---

- lineClamp
- string
- Limits the number of lines of text displayed in the card content.
Once exceeded, text cuts off at the first white space and "..." is appended.

---

- layout
- string
- Layout of the card.
  Can be `horizontal` or `vertical`. Defaults to `vertical`.

---

- align
- string
- Alignment of card content.
  Can be `start`, `center`, or `end`.
  Defaults to `start`. Card orientation changes with layout:

  - For horizontal layouts, `start` means left.
  - For vertical layouts, `start` means top.

{% /table %}

## Attributes - Cards

{% table %}

- Attribute
- Type
- Description

---

- columns
- number
- Set the number of columns in the grid.
  Defaults to 3.

---

- `cardMinWidth`
- string
- Minimum width of each card in pixels.
  Cards will shrink to this size before pushing the next card to the following row.
  Defaults to 240.

{% /table %}

## Examples

### Card variants

Use the `variant` attribute to change the appearance of the card with pre-configured styles.

{% cards columns=4 cardMinWidth=180 %}

  {% card title="Filled card" variant="filled" %}
    Uses `filled` variant.
  {% /card %}

  {% card title="Outlined card" variant="outlined" %}
    Uses `outlined` variant.
  {% /card %}

  {% card title="Elevated card" variant="elevated" %}
    Uses `elevated` variant.
  {% /card %}

  {% card title="Ghost card" variant="ghost" %}
    Uses `ghost` variant.
  {% /card %}

{% /cards %}

<details>
  <summary>See card variant example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=4 cardMinWidth=180 %}

      {% card title="Filled card" variant="filled" %}
        Uses `filled` variant.
      {% /card %}

      {% card title="Outlined card" variant="outlined" %}
        Uses `outlined` variant.
      {% /card %}

      {% card title="Elevated card" variant="elevated" %}
        Uses `elevated` variant.
      {% /card %}

      {% card title="Ghost card" variant="ghost" %}
        Uses `ghost` variant.
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

### Cards as links

Set the `to` attribute to configure the entire card as a link.
Each card variant has unique hover styles for cards as links.

{% cards columns=4 cardMinWidth=180 %}

  {% card title="Filled card" to="#cards-as-links" variant="filled" %}
    Hover to see styles.
  {% /card %}

  {% card title="Outlined card" to="#cards-as-links" variant="outlined" %}
    Hover to see styles.
  {% /card %}

  {% card title="Elevated card" to="#cards-as-links" variant="elevated" %}
    Hover to see styles.
  {% /card %}

  {% card title="Ghost card" to="#cards-as-links" variant="ghost" %}
    Hover to see styles.
  {% /card %}

{% /cards %}

<details>
  <summary>See link cards example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=4 cardMinWidth=180 %}

      {% card title="Filled card" to="#cards-as-links" variant="filled" %}
        Hover to see styles.
      {% /card %}

      {% card title="Outlined card" to="#cards-as-links" variant="outlined" %}
        Hover to see styles.
      {% /card %}

      {% card title="Elevated card" to="#cards-as-links" variant="elevated" %}
        Hover to see styles.
      {% /card %}

      {% card title="Ghost card" to="#cards-as-links" variant="ghost" %}
        Hover to see styles.
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

### Icon cards

Use the `icon` attribute to add an icon to a card and choose its styles with `iconVariant`.

{% cards columns=4 cardMinWidth=180 %}

  {% card title="Filled card" icon="./images/cards-markdoc/ghost-icon.svg" to="#cards-as-links" variant="filled" iconVariant="filled" %}
    ...with `filled` icon variant.
  {% /card %}

  {% card title="Outlined card" icon="./images/cards-markdoc/ghost-icon.svg" to="#cards-as-links" variant="outlined" iconVariant="ghost" %}
    ...with `ghost` icon variant.
  {% /card %}

  {% card title="Elevated card" icon="./images/cards-markdoc/ghost-icon.svg" to="#cards-as-links" variant="elevated" iconVariant="filled" %}
    ...with `filled` icon variant.
  {% /card %}

  {% card title="Ghost card" icon="./images/cards-markdoc/ghost-icon.svg" to="#cards-as-links" variant="ghost" iconVariant="ghost" %}
    ...with `ghost` icon variant.
  {% /card %}

{% /cards %}

<details>
  <summary>See icon cards example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=4 cardMinWidth=180 %}

      {% card title="Filled card" icon="images/ghost-icon.svg" to="#cards-as-links" variant="filled" iconVariant="filled" %}
        ...with `filled` icon variant.
      {% /card %}

      {% card title="Outlined card" icon="images/ghost-icon.svg" to="#cards-as-links" variant="outlined" iconVariant="ghost" %}
        ...with `ghost` icon variant.
      {% /card %}

      {% card title="Elevated card" icon="images/ghost-icon.svg" to="#cards-as-links" variant="elevated" iconVariant="filled" %}
        ...with `filled` icon variant.
      {% /card %}

      {% card title="Ghost card" icon="images/ghost-icon.svg" to="#cards-as-links" variant="ghost" iconVariant="ghost" %}
        ...with `ghost` icon variant.
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

#### Icon card positioning

Use the `layout` and `align` attributes to control the positioning of elements in your icon card.

**Horizontal layout icon cards:**

{% cards cardMinWidth=180 %}

  {% card title="Icon card" layout="horizontal" align="start" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
    Layout = `horizontal`

    Align = `start`
  {% /card %}

  {% card title="Icon card" layout="horizontal" align="center" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
    Layout = `horizontal`

    Align = `center`
  {% /card %}

  {% card title="Icon card" layout="horizontal" align="end" variant="outlined" icon="./images/cards-markdoc/ghost-icon.svg" %}
    Layout = `horizontal`

    Align = `end`
  {% /card %}

{% /cards %}

<details>
  <summary>See horizontal icon card example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards cardMinWidth=180 %}

      {% card title="Icon card" layout="horizontal" align="start" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
        Layout = `horizontal`

        Align = `start`
      {% /card %}

      {% card title="Icon card" layout="horizontal" align="center" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
        Layout = `horizontal`

        Align = `center`
      {% /card %}

      {% card title="Icon card" layout="horizontal" align="end" variant="outlined" icon="./images/cards-markdoc/ghost-icon.svg" %}
        Layout = `horizontal`

        Align = `end`
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

**Vertical layout icon cards:**

{% cards cardMinWidth=180 %}

  {% card title="Icon card" layout="vertical" align="start" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
    Layout = `vertical`

    Align = `start`
  {% /card %}

  {% card title="Icon card" layout="vertical" align="center" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
    Layout = `vertical`

    Align = `center`
  {% /card %}

  {% card title="Icon card" layout="vertical" align="end" variant="outlined" icon="./images/cards-markdoc/ghost-icon.svg" %}
    Layout = `vertical`

    Align = `end`
  {% /card %}

{% /cards %}

<details>
  <summary>See vertical icon card example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards cardMinWidth=180 %}

      {% card title="Icon card" layout="vertical" align="start" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
        Layout = `vertical`

        Align = `start`
      {% /card %}

      {% card title="Icon card" layout="vertical" align="center" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
        Layout = `vertical`

        Align = `center`
      {% /card %}

      {% card title="Icon card" layout="vertical" align="end" variant="outlined" icon="./images/cards-markdoc/ghost-icon.svg" %}
        Layout = `vertical`

        Align = `end`
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

### Image cards

Add an image to a card using the `image` attribute.

{% cards columns=4 cardMinWidth=180 %}

  {% card title="Filled card" image="./images/cards-markdoc/card-gradient.jpeg" to="#cards-as-links" variant="filled" %}
    ...with an image!
  {% /card %}

  {% card title="Outlined card" image="./images/cards-markdoc/card-gradient.jpeg" to="#cards-as-links" variant="outlined" %}
    ...with an image!
  {% /card %}

  {% card title="Elevated card" image="./images/cards-markdoc/card-gradient.jpeg" to="#cards-as-links" variant="elevated" %}
    ...with an image!
  {% /card %}

  {% card title="Ghost card" image="./images/cards-markdoc/card-gradient.jpeg" to="#cards-as-links" variant="ghost" %}
    ...with an image!
  {% /card %}

{% /cards %}

<details>
  <summary>See image cards example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=4 cardMinWidth=180 %}

      {% card title="Filled card" image="images/card-gradient.jpeg" to="#cards-as-links" variant="filled" %}
        ...with an image!
      {% /card %}

      {% card title="Outlined card" image="images/card-gradient.jpeg" to="#cards-as-links" variant="outlined" %}
        ...with an image!
      {% /card %}

      {% card title="Elevated card" image="images/card-gradient.jpeg" to="#cards-as-links" variant="elevated" %}
        ...with an image!
      {% /card %}

      {% card title="Ghost card" image="images/card-gradient.jpeg" to="#cards-as-links" variant="ghost" %}
        ...with an image!
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

#### Image card positioning

Use the `layout`, `align`, and `imagePosition` attributes to control the positioning of elements in your image card.

**Vertical layout image cards:**

{% cards cardMinWidth=180 %}

  {% card title="Image card" layout="vertical" align="start" imagePosition="start" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `vertical`

        Align = `start`

        imagePosition = `start`
  {% /card %}

  {% card title="Image card" layout="vertical" align="center" imagePosition="start" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `vertical`

        Align = `center`

        imagePosition = `start`
  {% /card %}

  {% card title="Image card" layout="vertical" align="end" imagePosition="end" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `vertical`

        Align = `end`

        imagePosition = `end`
  {% /card %}

{% /cards %}

<details>
  <summary>See vertical image card example syntax</summary>

  {% markdoc-example %}
    ``` {% process=false %}
    {% cards cardMinWidth=180 %}

      {% card title="Image card" layout="vertical" align="start" imagePosition="start" image="images/card-gradient.jpeg" variant="outlined" %}
            Layout = `vertical`

            Align = `start`

            imagePosition = `start`
      {% /card %}

      {% card title="Image card" layout="vertical" align="center" imagePosition="start" image="images/card-gradient.jpeg" variant="outlined" %}
            Layout = `vertical`

            Align = `center`

            imagePosition = `start`
      {% /card %}

      {% card title="Image card" layout="vertical" align="end" imagePosition="end" image="images/card-gradient.jpeg" variant="outlined" %}
            Layout = `vertical`

            Align = `end`

            imagePosition = `end`
      {% /card %}

    {% /cards %}
    ```
  {% /markdoc-example %}

</details>

**Horizontal layout image cards:**

{% cards cardMinWidth=180 %}

  {% card title="Image card" layout="horizontal" align="start" imagePosition="start" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `horizontal`

        Align = `start`

        imagePosition = `start`
  {% /card %}

  {% card title="Image card" layout="horizontal" align="center" imagePosition="start" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `horizontal`

        Align = `center`

        imagePosition = `start`
  {% /card %}

  {% card title="Image card" layout="horizontal" align="end" imagePosition="end" image="./images/cards-markdoc/card-gradient.jpeg" variant="outlined" %}
        Layout = `horizontal`

        Align = `end`

        imagePosition = `end`
  {% /card %}

{% /cards %}

## Best practices

**Group related information**

Cards are great for organizing and presenting related pieces of information.
Use them to guide users to resources or highlight important features.

**Keep cards concise**

Cards work best when they present information in a concise way.
Avoid overcrowding cards with too many elements.

**Visual consistency**

When using multiple cards, strive for consistent design and content structure.
This consistency will keep your documentation looking cohesive and professional.

**Consider responsiveness**

Consider how your card grid will look on different screen sizes.
Use the `columns` and `cardMinWidth` attributes to create a layout that works well across devices.

## Debug common issues

**Cards won't render**

Check that you've correctly nested the `card` tags inside a parent `cards` tag.

**Images or icons not showing**

Verify that the filepaths are correct and the file exists at that location.
Incorrect paths will show Markdoc errors in your console.

**Inconsistent card sizes**

Using different amounts of content in each card can make the cards in your grid appear to be different sizes.
Consider rephrasing your content or using the `lineClamp` attribute to maintain a consistent height.
