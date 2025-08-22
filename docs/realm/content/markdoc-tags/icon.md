# Icon tag

The `icon` tag renders a [Font Awesome](https://fontawesome.com/icons) icon.
Icons can be used inline with text to provide additional visual context.

## Attributes

{% table %}

- Attribute
- Type
- Description

---

- name
- string
- **REQUIRED.** A [Font Awesome](https://fontawesome.com/icons) icon name.
    Realm has the following icon packs built in: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.
    The icons automatically adjust their colors when users change the color mode.

    To add an icon from the Classic Regular pack, you can provide the icon name only or prefix the name with `regular`.
    To add an icon from other built-in packs, prefix the icon name with: `solid` (for Classic Solid), `duotone` (for Duotone Solid), or `brands` (for Classic Brands).

    **Examples:** `book`, `duotone book`, `brands github`

    Using other prefixes, including the `fa-` prefix, causes the icon to not render.

---

- size
- string
- The size of the icon.
  Accepts any CSS value for size, like `px` or `em`.
  Defaults to `1em`.

---

- color
- string
- The color of the icon.
  Accepts any CSS color value.

{% /table %}

## Examples

### Basic usage

To display a simple book icon:

````markdoc {% process=false %}
Here is a book icon: {% icon name="book" /%}
````

**Result:**

Here is a book icon: {% icon name="book" /%}

### Sized and colored icon

To display a larger, colored icon:

````markdoc {% process=false %}
A bigger, blue book icon: {% icon name="book" size="2em" color="blue" /%}
````

**Result:**

A bigger, blue book icon: {% icon name="book" size="2em" color="blue" /%}

### Different icon styles

You can specify a style for the icon, like `solid` or `brands`.

````markdoc {% process=false %}
A solid check-circle: {% icon name="solid check-circle" color="green" /%}

A GitHub brand icon: {% icon name="brands github" /%}
````

**Result:**

A solid check-circle: {% icon name="solid check-circle" color="green" /%}

A GitHub brand icon: {% icon name="brands github" /%}

## Usage with other components

Icons are commonly used in navigation elements to provide visual cues.
For more information on using icons in specific components, refer to the following documentation:

- [Navbar configuration](../../config/navbar.md)
- [Sidebar configuration](../../navigation/sidebars.md)
- [Footer configuration](../../config/footer.md)

