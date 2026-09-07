- icon
- string or [srcSet](#icon-object)
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
  - A [srcSet](#icon-object) object.
    When configured, the icon changes when the user switches between color modes.

    **Example:**
    ```yaml
    icon:
      srcSet: "./images/config-icon.svg light, ./images/config-icon-dark.svg dark"
    ```
