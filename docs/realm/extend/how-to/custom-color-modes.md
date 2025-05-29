---
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---
# Custom color modes

## Default icons for color mode

| Icon                                         | Mode    |
| -------------------------------------------- | ------- |
| ![light icon](../images/theme-light.svg)     | `Light` |
| ![dark icon](../images/theme-dark.svg)       | `Dark`  |
| ![color mode icon](../images/color-mode.svg) | `Any`   |

## Eject component from default theme ([eject guide](./eject-components))

```

> npx @redocly/cli eject component components/ColorModeSwitcher/ColorModeIcon.tsx -d playground --theme @redocly/theme

```

## Add new icon

Add new icon in the created `@theme/components/ColorModeSwitcher/ColorModeIcon.tsx` file.

```

...
case 'high-contrast': //the naming must be the same as the custom color mode
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="a"><path d="M0 0h96v96H0z"/></clipPath></defs><g clipPath="url(#a)"><path d="M48 15.762a9.479 9.479 0 0 0-.276-.286A25.568 25.568 0 1 0 11.5 51.57c.1.1.2.2.316.3h0L48 88l36.224-36.093-.041-.041c.112-.092.214-.194.316-.3a25.568 25.568 0 1 0-36.223-36.094c-.092.096-.184.188-.276.29Z" fill="none" stroke="var(--navbar-text-color)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/></g></svg>
  );
...
```

## Add a color mode

There are default color modes in the `@redocly/theme`.
To add a specific mode or modify an existing mode see the [styles guide](../../style/how-to/customize-styles.md).

To change default styles, or colors override the appropriate css variable inside `:root` pseudo-class with appropriate `className`.

The following example of overrides the `dark` mode by creating or modifying the `@theme/styles.css` file.

```css
:root.dark {
  --color-primary-base: green;
}
```

To add a custom color `mode` named `dark-contrast` create new class and override appropriate css variables in the `@theme/styles.css` file.

```css
:root.dark-contrast {
  --color-primary-base: yellow;
}
```

The corresponding theme config adds `dark-contrast` to the list of modes.

```yaml
colorMode:
  modes:
    - 'dark-contrast'
    - 'dark'
    - 'light'
```

## Resources

- [Color mode reference](../../config/color-mode.md) - Color mode configuration options.
- [Add color-mode-specific images](./color-mode-images.md) - Add image elements that dynamically change with the color mode.
* [Customize color modes](../../style/how-to/customize-color-modes.md) - Customize the styling of specific color modes.
