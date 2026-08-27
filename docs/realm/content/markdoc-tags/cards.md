---
products:
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
variantProperties:
  groups:
    - name: content
      label: Change content
      enabled: true
#  content:
#    required: false
#    location: end
  attributes:
    variant:
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    title:
      hidden: true
      type: string
      required: true
      default: Variant card
      description: The title of the card.
linkProperties:
  groups:
    - name: link
      label: Show link
      enabled: true
#  content:
#    required: false
#    location: end
  separators:
    - location: cta
#    - location: variant
  attributes:
    to:
      type: string
      default: "#cards-as-links"
      description: URL or path for the card to link to. The whole card becomes a link.
    linkIcon:
      type: string
      default: arrow
      enum: [chevron, arrow, ""]
      description: Icon at the end of the title. Needs the to attribute.
    cta:
      type: string
      default: Start building
      description: Call-to-action text under the content. Needs the to attribute.
    variant:
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    title:
      hidden: true
      type: string
      required: true
      default: Quickstart
      description: The title of the card.
badgeProperties:
  groups:
    - name: badge
      label: Show badge
      enabled: true
#  content:
#    required: false
#    location: end
#  separators:
#    - location: badgeColor
  attributes:
    badge:
      type: string
      default: Beta
      description: Text of a badge that displays after the link icon.
#      group: badge
    badgeIcon:
      type: string
      description: Icon inside the badge. A Font Awesome name, or a path to an icon file.
      default: rocket
    #      group: badge
    badgeColor:
      type: color
      default: blue
      enum: [red, green, blue, grey, turquoise, magenta, purple, carrot, raspberry, orange, grass, persian-green, sky, blueberry]
      description: Color of the badge. Defaults to grey.
#      group: badge
    variant:
      hidden: true
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    title:
      hidden: true
      type: string
      required: true
      default: Webhooks
      description: The title of the card.
iconProperties:
  groups:
    - name: icon
      label: Show icon
      enabled: true
#  content:
#    required: false
#    location: end
#  separators:
#    - location: iconColor
  attributes:
    icon:
      type: string
      default: duotone book
      description: A Font Awesome name, such as book or duotone book, or a path to an icon file.
#      group: icon
    iconVariant:
      type: string
      default: ghost
      enum: [ghost, filled]
      description: Style of the icon. The filled variant adds a padded outline with rounded corners.
#      group: icon
    iconColor:
      type: color
      enum: [red, green, blue, grey, turquoise, magenta, purple, carrot, raspberry, orange, grass, persian-green, sky, blueberry]
      description: Color of the icon. Without it, the icon keeps the theme color.
#      group: icon
    variant:
      hidden: true
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    title:
      hidden: true
      type: string
      required: true
      default: Icon card
      description: The title of the card.
layoutProperties:
#  content:
#    required: false
#    location: end
#  separators:
#    - location: lineClamp
  attributes:
      layout:
        type: string
        default: vertical
        enum: [horizontal, vertical]
        description: Layout of the card.
      align:
        type: string
        default: start
        enum: [start, center, end]
        description: Alignment of the card content.
      lineClamp:
        type: number
        default: 3
        description: Limits the number of lines of content before the text is cut.
      icon:
        hidden: true
        type: string
        default: heart
        description: An icon makes the effect of the layout easier to see.
      variant:
        hidden: true
        type: string
        default: elevated
        enum: [filled, outlined, elevated, ghost]
        description: Visual style of the card.
      title:
        hidden: true
        type: string
        required: true
        default: Icon card
        description: The title of the card.
imageProperties:
#  content:
#    required: false
#    location: end
#  separators:
#    - location: align
  attributes:
    imagePosition:
      type: string
      default: start
      enum: [start, end]
      description: Position of the image in the card.
      group: image
    layout:
      type: string
      default: vertical
      enum: [horizontal, vertical]
      description: Layout of the card.
    align:
      type: string
      default: start
      enum: [start, center, end]
      description: Alignment of the card content.
    image:
      type: string
      default: https://redocly.com/assets/card-gradient.2ab0e831d9790df6711b087a0b876fb82f4a3450a0797a64972c736a8d8f0c05.804422cf.jpeg
      description: Path or URL of an image to display in the card.
      group: image
    variant:
      hidden: true
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    title:
      hidden: true
      type: string
      required: true
      default: Image card
      description: The title of the card.
customizeProperties:
  groups:
    - name: link
      label: Show link
      enabled: false
    - name: badge
      label: Show badge
      enabled: false
    - name: image
      label: Show image
      enabled: false
    - name: icon
      label: Show icon
      enabled: false
  content:
    description: Body of the card. Accepts Markdown and Markdoc tags.
    location: title
  attributes:
    title:
      type: string
      required: true
      default: Your card
      description: The title of the card.
    variant:
      type: string
      default: elevated
      enum: [filled, outlined, elevated, ghost]
      description: Visual style of the card.
    layout:
      type: string
      default: vertical
      enum: [horizontal, vertical]
      description: Layout of the card.
    align:
      type: string
      default: start
      enum: [start, center, end]
      description: Alignment of the card content.
    lineClamp:
      type: number
      default: 3
      description: Limits the number of lines of text displayed in the card content.
    to:
      type: string
      default: "#customize-tags"
      description: URL or path for the card to link to. The whole card becomes a link.
      group: link
    linkIcon:
      type: string
      default: chevron
      enum: [chevron, arrow]
      description: Icon displayed at the end of the card title.
      group: link
    cta:
      type: string
      default: Start building
      description: Call-to-action text under the card content.
      group: link
    badge:
      type: string
      default: New
      description: Text of a badge that displays in the card title, after the link icon.
      group: badge
    badgeColor:
      type: color
      default: blue
      enum: [red, green, blue, grey, turquoise, magenta, purple, carrot, raspberry, orange, grass, persian-green, sky, blueberry]
      description: Color of the badge. Defaults to grey.
      group: badge
    badgeIcon:
      type: string
      default: rocket
      description: Icon inside the badge. A Font Awesome name, or a relative path to an icon file.
      group: badge
    image:
      type: string
      default: https://redocly.com/assets/card-gradient.2ab0e831d9790df6711b087a0b876fb82f4a3450a0797a64972c736a8d8f0c05.804422cf.jpeg
      description: Path or URL of an image to display in the card.
      group: image
    imagePosition:
      type: string
      default: start
      enum: [start, end]
      description: Position of the image in the card.
      group: image
    icon:
      type: string
      default: duotone book
      description: A Font Awesome name, such as book or duotone book, or a relative path to an icon file.
      group: icon
    iconVariant:
      type: string
      default: filled
      enum: [ghost, filled]
      description: Style of the icon. The filled variant adds a padded outline with rounded corners.
      group: icon
    iconColor:
      type: color
      enum: [red, green, blue, grey, turquoise, magenta, purple, carrot, raspberry, orange, grass, persian-green, sky, blueberry]
      description: Color of the icon. Without it, the icon keeps the theme color.
      group: icon
---
# Card and Cards tags

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

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
- **REQUIRED.** The title of the card.

---

- variant
- string
- Visual style of the card: `filled`, `outlined`, `elevated`, or `ghost`.
  Defaults to `filled`.

---

- to
- string
- URL or path for the card to link to.
  When set, the entire card behaves as a link.

---

- linkIcon
- string
- Icon displayed at the end of the card title: `chevron` or `arrow`.
  Displays only on cards that also set `to`.

---

- cta
- string
- Call-to-action text displayed under the card content, followed by a chevron icon.
  Displays only on cards that also set `to`.

---

- badge
- string
- Text of a badge that displays in the card title, after the link icon.

---

- badgeColor
- string
- Color of the badge.
  One of `red`, `green`, `blue`, `grey`, `turquoise`, `magenta`, `purple`, `carrot`,
  `raspberry`, `orange`, `grass`, `persian-green`, `sky`, `blueberry`, or a custom name.
  Defaults to `grey`.

---

- badgeIcon
- string
- Icon to display inside the badge.
  A Font Awesome name or a relative path to an icon file.

---

- image
- string
- Path to an image to display in the card.

---

- imagePosition
- string
- Position of the image in the card: `start` or `end`.
  Defaults to `start`.

---

- icon
- string
- A Font Awesome name, or a relative path to an icon file.
  Prefix the name with `solid`, `duotone`, or `brands` to pick a pack.
  The Classic Regular pack needs no prefix.
  Other prefixes, including `fa-`, stop the icon from rendering.

---

- iconVariant
- string
- Style of the icon: `ghost` displays the icon as is, and `filled` adds a padded
  outline with rounded corners.
  Defaults to `ghost`.

---

- iconColor
- string
- Color of the icon.
  Takes the same names as `badgeColor`.

---

- lineClamp
- number
- Limits the number of lines of text displayed in the card content.
  Once exceeded, text cuts off at the first white space and "..." is appended.

---

- layout
- string
- Layout of the card: `horizontal`, or `vertical`.
  Defaults to `vertical`.

---

- align
- string
- Alignment of card content: `start`, `center`, or `end`.
  Defaults to `start`.
  For horizontal layouts `start` means left, and for vertical layouts it means top.

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

{% demo tag="card" properties=$frontmatter.variantProperties %}
Pick a variant to compare the styles.
{% /demo %}

### Cards as links

Set `to` to turn the whole card into a link.
`linkIcon` adds an icon after the title, and `cta` adds call-to-action text under the content; both need `to`.

Each card variant has unique hover styles for cards as links.

{% demo tag="card" properties=$frontmatter.linkProperties %}
Publish your first project in five minutes.
{% /demo %}

## Cards with a badge

The `badge` labels a card, `badgeColor` picks a color from the palette, and `badgeIcon` puts an
icon inside the badge.
The color picker offers the built-in names, and each swatch takes its color from the palette.

{% demo tag="card" properties=$frontmatter.badgeProperties %}
Turn the badge off to see the card without it.
{% /demo %}

### Icon cards

Use the `icon` attribute to add an icon to a card, choose its styles with `iconVariant` and a color with `iconColor`.

{% demo tag="card" properties=$frontmatter.iconProperties %}
Try `solid rocket` or `brands github` in the icon field.
{% /demo %}

#### Icon card positioning

Use the `layout` and `align` attributes to control the positioning of elements in your icon card.
`lineClamp` keeps cards in a grid the same height when their content differs in length.

{% demo tag="card" properties=$frontmatter.layoutProperties %}
Cards work best when they present information in a concise way, so keep the body short and let the title carry the meaning.
{% /demo %}

### Image cards

Add an image to a card using the `image` attribute.

Use the `layout`, `align`, and `imagePosition` attributes to control the positioning of elements in your image card.

{% demo tag="card" properties=$frontmatter.imageProperties %}
Change `layout`, `align` and `imagePosition` to see how the image affects the card.
{% /demo %}

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

## Customize `card`

Every attribute of `card` in one place.
Turn on the parts you need, shape the card, then select **Show code** and copy the snippet
into your project.

{% demo tag="card" properties=$frontmatter.customizeProperties %}
Shape this card with the form, then copy the snippet into your project.
{% /demo %}

## Resources

- **[Markdoc overview for technical writers](https://redocly.com/learn/markdoc)** - Learn how to use Markdoc in your documentation
