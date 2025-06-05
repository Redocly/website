---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `colorMode`

Color mode controls the color mode in the project.

The default theme (`@redocly/theme`) includes two color modes: light mode and dark mode.
Color modes can be set to a default value, or with the user's operating system preference.

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "colorMode"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the color mode selector is hidden. Default `false`.

---

- ignoreDetection
- boolean
- Specifies if the system color mode detection is ignored. Default `false`.

---

- modes
- [string]
- List of possible color mode values. Default to `light` and `dark`.

{% /table %}

### Priority

The color mode is selected for a user based on the following priority from top (highest priority) to bottom (lowest priority):

- If a user sets a `mode` it is stored in `localStorage`.
  If the mode is in `localStorage` it's selected.
- If a user visits and `ignoreDetection` is not `true`, the value is detected from the user's operating system (when possible).
- The first mode in the `modes` list applies.

## Examples

### `hide` example

The following example hides the color mode toggle.

```yaml
colorMode:
  hide: true
```

### `ignoreDetection` example

Color mode operating system detection is on by default.
The following example ignores the user's operating system color mode.

```yaml
colorMode:
  ignoreDetection: true
```

### `modes` list example

Specify the list of available `colorMode` options in the `modes` list.
You must add a mode to reference it in the modes list.
Learn how to add a mode by reading the [Custom color modes](../extend/how-to/add-color-mode.md) guide.

```yaml
colorMode:
  ignoreDetection: true
  modes:
    - 'dark-contrast'
    - 'dark'
    - 'light'
```

The first `mode` from the `modes` list applies by default if `ignoreDetection` is `true`.

## Resources

- [Custom color modes](../extend/how-to/add-color-mode.md)
- Use [front matter](./front-matter-config.md) to show or hide the color mode switcher on individual pages.