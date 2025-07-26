# Add new color mode

Adding a new, custom [color mode](../branding/color-mode.md) creates a new option in the color mode switcher in the navbar.
Users switch between color modes to tailor their reading experience with pre-defined styles.

This guide explains how to add a new color mode to your Redocly project, including adding a custom icon to the color mode switcher.

## Before you begin

Make sure you have the following before you begin:

- A Redocly project set up and running locally.
- Moderate comfort with React and CSS.
- Familiar with [concept of color modes](../branding/color-mode.md).

## Eject `ColorModeIcon` component

Ejecting the component allows you to make modifications that are visible to the end-user, such as adding a color mode.

[Eject](./eject-components/eject-components-using-cli.md) the `ColorModeIcon` component from the default Redocly theme using the following command:

```bash
npx @redocly/cli eject component 'ColorModeSwitcher/ColorModeIcon.tsx'
```

## Add new color mode icon

Add an icon for the new color mode using the following steps:

1. Create a switch case for the new color mode in the ejected file, as in the following example:

    ```javascript {% title="@theme/components/ColorModeSwitcher/ColorModeIcon.tsx" %}
    // ... other code
    function Icon({ mode, className }: ColorModeIconProps) {
      switch (mode) {
        case 'high-contrast':
          // New icon goes here
        case 'dark':
          return <SunIcon data-testid="dark" />;
        // ... additional switch cases
      }
    }
    ```

2. Return the new color mode's icon as an `<svg>` element from the new switch case.
Use the following steps to get the HTML code for the icon:

    - Move the icon's `.svg` file into your Redocly project.
    - Open the file in your code editor.
    - Copy the `<svg>` HTML element.
    - **Important**: Pass the `className` prop through to the `<svg>` element.

The following example adds an icon for a new color mode called `high-contrast`:

```javascript {% title="@theme/components/ColorModeSwitcher/ColorModeIcon.tsx" %}
// ...
function Icon({ mode, className }: ColorModeIconProps) {
  switch (mode) {
    case 'high-contrast':
      return (
        <svg className={className} version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="m62 108v12c0 1.1055 0.89453 2 2 2s2-0.89453 2-2v-12c0-1.1055-0.89453-2-2-2s-2 0.89453-2 2zm43.012-5.8164-8.4844-8.4844c-0.78125-0.78516-2.0469-0.78516-2.8281 0-0.78516 0.78125-0.78516 2.0469 0 2.8281l8.4844 8.4844c0.78125 0.78125 2.0469 0.78125 2.8281 0s0.78125-2.0469 0-2.8281zm-73.539-8.4844-8.4844 8.4844c-0.78125 0.78125-0.78125 2.0469 0 2.8281s2.0469 0.78125 2.8281 0l8.4844-8.4844c0.78516-0.78125 0.78516-2.0469 0-2.8281-0.78125-0.78516-2.0469-0.78516-2.8281 0zm32.527 8.3008c20.973 0 38-17.027 38-38s-17.027-38-38-38-38 17.027-38 38 17.027 38 38 38zm-2-71.945v67.887c-17.836-1.0391-32-15.852-32-33.945s14.164-32.902 32-33.945zm58 31.945h-12c-1.1055 0-2 0.89453-2 2s0.89453 2 2 2h12c1.1055 0 2-0.89453 2-2s-0.89453-2-2-2zm-100 0h-12c-1.1055 0-2 0.89453-2 2s0.89453 2 2 2h12c1.1055 0 2-0.89453 2-2s-0.89453-2-2-2zm82.184-39.012-8.4844 8.4844c-0.78516 0.78125-0.78516 2.0469 0 2.8281 0.78125 0.78516 2.0469 0.78516 2.8281 0l8.4844-8.4844c0.78125-0.78125 0.78125-2.0469 0-2.8281s-2.0469-0.78125-2.8281 0zm-67.883 8.4844-8.4844-8.4844c-0.78125-0.78125-2.0469-0.78125-2.8281 0s-0.78125 2.0469 0 2.8281l8.4844 8.4844c0.78125 0.78516 2.0469 0.78516 2.8281 0 0.78516-0.78125 0.78516-2.0469 0-2.8281zm27.699-23.473v12c0 1.1055 0.89453 2 2 2s2-0.89453 2-2v-12c0-1.1055-0.89453-2-2-2s-2 0.89453-2 2z" fill-rule="evenodd"/>
        </svg>
      );
    case 'dark':
      return <SunIcon data-testid="dark" />;
    // ...
  }
}
```

## Define color mode styles

Define the styling rules for your color mode in the `@theme/styles.css` file using the `:root.className` selector.

{% admonition type="info" %}
  The `className` must match the color mode's name used for the switch case in the `ColorModeIcon` component.
{% /admonition %}

During initial setup, using placeholder styles can help with testing, as in the following example:

```{% title="@theme/styles.css" %}
:root.high-contrast {
  --md-content-text-color: red;
  --bg-color: lightgreen;
}
```

## Add color mode to configuration

Add the new color mode to your project configuration, as in the following example:

```yaml {% title="redocly.yaml" %}
colorMode: 
  modes: 
    - 'high-contrast'
    - 'light'
    - 'dark'
```

The [colorMode option](../config/color-mode.md) controls which options are shown to users in the color mode switcher.

## Test new color mode

Test the new color mode in your local preview to verify that it works as expected.

- Use the `npx @redocly/cli preview` command to start your local preview.
- Click the color mode switcher to toggle between color modes.
- Verify that the new color mode icon is visible.
- Verify the new color mode styles are applied correctly.
- In `@theme/styles.css`, replace placeholder styles with new color mode styles.

{% admonition type="success" %}
  Congratulations. You added a new color mode to your Redocly project!
{% /admonition %}

## Resources

- Learn the foundational concepts of [color mode](../branding/color-mode.md).
- Use CSS to [customize color mode styles](../branding/customize-color-modes.md).
- [Add color-mode-specific images](./color-mode-images.md) to add image elements that change with color mode.
