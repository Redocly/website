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
# Card and Cards tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `card` and `cards` tags work together to create visually appealing, structured content elements ("cards") in your documentation.

The `card` tag allows you to create an individual card element that contains your markup.
The `cards` tag organizes multiple cards into a responsive grid layout.

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
- URL or path for the card to link to.
  When set, the entire card behaves as a link.

---

- linkIcon
- string
- Icon displayed at the end of the card title.
  Can be `chevron` or `arrow`.
  The icon displays only on a cards that also have the `to` attribute.
  Without this attribute, the title has no icon.

---

- cta
- string
- Call-to-action text displayed under the card content, followed by a chevron icon.
  The text displays only on cards that also have the `to` attribute.
  Clicking anywhere on the card opens that link.
  The text and the icon change color on mouse hover.

---

- badge
- string
- Text of a badge that displays in the card title, after the link icon.

---

- badgeColor
- string
- Color of the badge.
  Supports predefined color names for consistent styling.

  **Supported color names:**
  `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`, `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`.

  To use a color of your own, see [Custom colors](#custom-colors).
  Default: `grey`.

---

- badgeIcon
- string
- Icon to display inside the badge.
- Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from other built-in packs, prefix the icon name with: `solid` (for Classic Solid), `duotone` (for Duotone Solid), or `brands` (for Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
    - Relative path to an icon image file.

      **Example:** `./images/config-icon.svg`

---

- variant
- string
- Visual style of the card.
  Can be `filled`, `outlined`, `elevated`, or `ghost`.
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
- Either:
  - A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from another built-in pack, prefix the icon name with `solid` (Classic Solid), `duotone` (Duotone Solid), or `brands` (Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.
  - Relative path to an icon image file.

    **Example:** `./images/config-icon.svg`

---

- iconVariant
- string
- Style of the icon.
  Can be `ghost` or `filled`:
  - `ghost` displays the icon as is
  - `filled` adds a padded outline with rounded corners to the icon

  Defaults to `ghost`.

---

- iconColor
- string
- Color of the icon.
  Supports predefined color names for consistent styling.

  **Supported color names:**
  `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`, `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`.

  To use a color of your own, see [Custom colors](#custom-colors).

---

- lineClamp
- string
- Limits the number of lines of text displayed in the card content.
Once exceeded, text cuts off at the first white space and "..." is appended.

---

- layout
- string
- Layout of the card.
  Can be `horizontal` or `vertical`.
  Defaults to `vertical`.

---

- align
- string
- Alignment of card content.
  Can be `start`, `center`, or `end`.
  Defaults to `start`.
  Card orientation changes with layout:

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

### Link icons

Set the `linkIcon` attribute on a link card to add an icon at the end of the card title.
The icon needs the `to` attribute, and a card without `to` ignores it.

{% cards columns=2 cardMinWidth=180 %}

  {% card title="Chevron" to="#link-icons" linkIcon="chevron" %}
    Uses the `chevron` icon. 
  {% /card %}

  {% card title="Arrow" to="#link-icons" linkIcon="arrow" %}
    Uses the `arrow` icon.
  {% /card %}

{% /cards %}

<details>
  <summary>See link icon example syntax</summary>

    {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=2 cardMinWidth=180 %}
    
          {% card title="Chevron" to="#link-icons" linkIcon="chevron" %}
            Uses the `chevron` icon.
          {% /card %}
    
          {% card title="Arrow" to="#link-icons" linkIcon="arrow" %}
            Uses the `arrow` icon.
          {% /card %}
    
        {% /cards %}
        ```
    {% /markdoc-example %}

</details>

### Cards with a call to action

Use the `cta` attribute to add call-to-action text under the card content.
A chevron icon follows the text, and both change color when a reader hovers over the card.
The call to action needs the `to` attribute, so that a click anywhere on the card opens that link.
The `align` attribute positions the call to action together with the rest of the card content.

{% cards columns=2 cardMinWidth=180 %}

  {% card title="Quickstart" to="#cards-with-a-call-to-action" cta="Start building" %}
    Publish your first project in five minutes.
  {% /card %}

  {% card title="API reference" to="#cards-with-a-call-to-action" cta="Browse the endpoints" variant="outlined" %}
    Every endpoint, parameter, and response schema.
  {% /card %}

{% /cards %}

<details>
  <summary>See call to action example syntax</summary>

    {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=2 cardMinWidth=180 %}
    
          {% card title="Quickstart" to="#cards-with-a-call-to-action" cta="Start building" %}
            Publish your first project in five minutes.
          {% /card %}
    
          {% card title="API reference" to="#cards-with-a-call-to-action" cta="Browse the endpoints" variant="outlined" %}
            Every endpoint, parameter, and response schema.
          {% /card %}
    
        {% /cards %}
        ```
    {% /markdoc-example %}

</details>

### Cards with a badge

Use the `badge` attribute to label a card.
The badge displays in the card title, after the link icon.
`badgeColor` picks a color from the badge palette, and `badgeIcon` puts an icon inside the badge.

{% cards columns=3 cardMinWidth=200 %}

  {% card title="Webhooks" badge="Beta" badgeColor="blue" %}
    A color name.
  {% /card %}

  {% card title="Legacy tokens" badge="Deprecated" badgeColor="carrot" badgeIcon="triangle-exclamation" %}
    A color name and an icon.
  {% /card %}

  {% card title="Scorecards" badge="New" badgeColor="green" %}
    A color name.
  {% /card %}

{% /cards %}

<details>
  <summary>See badge example syntax</summary>

    {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=3 cardMinWidth=200 %}
    
          {% card title="Webhooks" badge="Beta" badgeColor="blue" %}
            A color name.
          {% /card %}
    
          {% card title="Legacy tokens" badge="Deprecated" badgeColor="carrot" badgeIcon="triangle-exclamation" %}
            A color name and an icon.
          {% /card %}
    
          {% card title="Scorecards" badge="New" badgeColor="green" %}
            A color name.
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

#### Icon colors

Use the `iconColor` attribute to color the icon with a name from the palette.

{% cards columns=4 cardMinWidth=180 %}

  {% card title="Red icon" icon="./images/cards-markdoc/ghost-icon.svg" iconColor="red" variant="outlined" %}
    Uses `iconColor="red"`.
  {% /card %}

  {% card title="Sky icon" icon="./images/cards-markdoc/ghost-icon.svg" iconColor="sky" variant="outlined" %}
    Uses `iconColor="sky"`.
  {% /card %}

  {% card title="Grass icon" icon="./images/cards-markdoc/ghost-icon.svg" iconColor="grass" variant="outlined" %}
    Uses `iconColor="grass"`.
  {% /card %}

  {% card title="Theme icon" icon="./images/cards-markdoc/ghost-icon.svg" variant="outlined" %}
    No `iconColor`, so the icon keeps the theme color.
  {% /card %}

{% /cards %}

An icon from a file takes the color only where the file sets no color of its own.
An icon that hardcodes a `fill` keeps the colors of the file.

<details>
  <summary>See icon color example syntax</summary>

    {% markdoc-example %}
    ``` {% process=false %}
    {% cards columns=4 cardMinWidth=180 %}
    
          {% card title="Red icon" icon="images/ghost-icon.svg" iconColor="red" variant="outlined" %}
            Uses `iconColor="red"`.
          {% /card %}
    
          {% card title="Sky icon" icon="images/ghost-icon.svg" iconColor="sky" variant="outlined" %}
            Uses `iconColor="sky"`.
          {% /card %}
    
          {% card title="Grass icon" icon="images/ghost-icon.svg" iconColor="grass" variant="outlined" %}
            Uses `iconColor="grass"`.
          {% /card %}
    
          {% card title="Theme icon" icon="images/ghost-icon.svg" variant="outlined" %}
            No `iconColor`, so the icon keeps the theme color.
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

### Custom colors

The palette covers the built-in names.
To use a color of your own, name it and define it in your [theme stylesheet](../../branding/customize-styles.md), then use that name in both attributes.

Define a `.tag-{name}` class for the badge, and a `.card-icon-color-{name}` class for the icon:

```css {% title="@theme/styles.css" %}
.tag-mycolor {
  --tag-bg-color: #DCE8FF;
  --tag-color: #1A3A6B;
}

.card-icon-color-mycolor {
  --card-icon-color: #1A3A6B;
}
```

The badge takes a pair of colors, because it needs a background and a text color that stays readable on it.
The icon takes one color.

Use the name the same way as a built-in one:

{% markdoc-example %}
  ```markdoc {% process=false %}
  {% card title="Webhooks" icon="images/ghost-icon.svg" iconColor="mycolor" badge="Beta" badgeColor="mycolor" %}
    Uses a custom color.
  {% /card %}
  ```
{% /markdoc-example %}

To set different colors for dark mode, define the same classes again under `:root.dark`.

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

## Resources

- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to use Markdoc in your documentation
- **[Markdoc tags](./index.md)** - See the full list of supported Markdoc tags

