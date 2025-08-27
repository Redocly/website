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
- **REQUIRED.** The name of a [Font Awesome](https://fontawesome.com/icons) icon. Can be prefixed with a style: `duotone`, `solid`, `regular` or `brands`.
  Example: `book`, `duotone book`, `brands github`, `./images/config-icon.svg`.

---

- size
- string
- The size of the icon. Accepts any CSS value for size, like `px` or `em`. Defaults to `1em`.

---

- color
- string
- The color of the icon. Accepts any CSS color value.

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

Icons are commonly used in navigation elements to provide visual cues. For more information on using icons in specific components, refer to the following documentation:

- [Navbar configuration](../../config/navbar.md)
- [Sidebar configuration](../../navigation/sidebars.md)
- [Footer configuration](../../config/footer.md)

