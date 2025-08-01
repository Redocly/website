# Customize color modes

You can use CSS styling and configuration changes to customize the color modes in your project. When users switch between color modes, the documentation's appearance dynamically changes to the corresponding color mode.

## Before you begin

Make sure you have the following before you begin:

- A Realm project with at least a few Markdown pages.
- At least beginner-level CSS knowledge.

## Configure color mode styles

The styling rules in this section are added to your project's `@theme/styles.css` file. Create that file if you don't have one already.

### Override CSS variables

A good approach to customizing color mode styling is to override the [CSS variables](./css-variables/index.md) used throughout your project.

Add color mode customization to your project's `@theme/styles.css` file using CSS variables. The following example shows a complete color mode configuration:

```css {% title="@theme/styles.css" %}
/* Default color variables (used as fallbacks) */
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --link-text-color: #1668dc;
  --sidebar-background-color: #f8fafc;
  --sidebar-active-background-color: #e2e8f0;
  --text-color: #1f2937;
  --bg-overlay: #f2f2f2;
}

/* Light mode specific styling */
:root.light {
  --sidebar-background-color: #ffffff;
  --sidebar-active-background-color: var(--color-purple-2);
  --text-color: #374151;
  --navbar-background-color: #ffffff;
}

/* Dark mode specific styling */
:root.dark {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --link-text-color: #60a5fa;
  --sidebar-background-color: #1e293b;
  --sidebar-active-background-color: #334155;
  --text-color: #f1f5f9;
  --bg-overlay: #374151;
  --navbar-background-color: #0f172a;
}
```

In this example, the colors and backgrounds change when users switch between light and dark modes, creating a cohesive experience across both modes.

#### CSS variable composition

Element-specific CSS variables are often built upon another set of [core CSS variables](./color-mode.md#css-variables-as-building-blocks). Consider the level of granularity you need before adding CSS variable overrides.

Let's use the example from the section above to illustrate the point. The example added the following styling rules:

- The `:root` selector set the `--bg-overlay` variable.
- The `:root.dark` selector set the `--sidebar-active-background-color` variable.

The `--bg-overlay` serves as a building block for more than 30 other CSS variables! So, while the example *did* successfully change the sidebar's active item background, it no longer matches any other elements built with `--bg-overlay`.

Generally speaking, we recommend overriding the foundational CSS variables when possible to maintain a more cohesive design. Then you can override an element-specific CSS variable only when needed.

### Annotate Markdown elements

Adding annotations to your Markdown elements can be used to add selectors, making them a good solution for adding color-mode-specific styling to elements that are otherwise difficult to select.

To use annotation to apply styling for different color modes:

1. Use Markdoc tag syntax to add an annotation in your Markdown, as in the following example:

    {% markdoc-example %}
      ```markdown {% process=false %}
      # Example page

      Some content

      - List item {% class="awesome-list-entry" %}
      - List item 2
      ```
    {% /markdoc-example %}

2. In your `@theme/styles.css` file, use the selector you added to define light and dark mode styling for the element, as in the following example:

    ```css
    :root.light .awesome-list-entry {
      color: blue;
    }

    :root.dark .awesome-list-entry {
      color: red;
    }
    ```

In the example above, the first entry in the list changes between blue and red text color when the user changes the color mode. Annotations can be used to add classes or ids.

## Set color mode logo

You can configure your documentation to use a different logo for each color mode.

To set the logo per color mode:

1. Add two versions of a logo to an `images` folder in the root of your project.

2. Create a single, comma-separated string that contains the logo's filepath and color mode name it corresponds with. It should follow this pattern: `<logo-path> <color-mode-name>, <logo-path> <color-mode-name>` and contain an entry for each color mode.

3. In your project's `redocly.yaml` file, use the `srcSet` property on the `logo` object to pass the list of logos, as in the following example:

    ```yaml
    logo:
      srcSet: "./images/your-light-logo.svg light, ./images/your-dark-logo.svg dark"
      altText: Your amazing logo
      link: "https://example.com"
    ```

In the example above, the logo in the documentation navbar changes when the user switches between color modes.

## Add new color modes

You can add custom color modes beyond the default light and dark modes. This creates new options in the color mode switcher and requires component ejection.

### Before you begin

Make sure you have:
- A Redocly project set up and running locally
- Moderate comfort with React and CSS
- Familiarity with [component ejection](../customization/eject-components/index.md)

### Eject ColorModeIcon component

[Eject](../customization/eject-components/eject-components-using-cli.md) the `ColorModeIcon` component to add custom icons:

```bash
npx @redocly/cli eject component 'ColorModeSwitcher/ColorModeIcon.tsx'
```

### Add new color mode icon

Add an icon for the new color mode by creating a switch case in the ejected file:

```javascript {% title="@theme/components/ColorModeSwitcher/ColorModeIcon.tsx" %}
function Icon({ mode, className }: ColorModeIconProps) {
  switch (mode) {
    case 'high-contrast':
      return (
        <svg className={className} version="1.1" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <path d="m62 108v12c0 1.1055 0.89453 2 2 2s2-0.89453 2-2v-12c0-1.1055-0.89453-2-2-2s-2 0.89453-2 2zm43.012-5.8164-8.4844-8.4844c-0.78125-0.78516-2.0469-0.78516-2.8281 0-0.78516 0.78125-0.78516 2.0469 0 2.8281l8.4844 8.4844c0.78125 0.78125 2.0469 0.78125 2.8281 0s0.78125-2.0469 0-2.8281zm-73.539-8.4844-8.4844 8.4844c-0.78125 0.78125-0.78125 2.0469 0 2.8281s2.0469 0.78125 2.8281 0l8.4844-8.4844c0.78516-0.78125 0.78516-2.0469 0-2.8281-0.78125-0.78516-2.0469-0.78516-2.8281 0zm32.527 8.3008c20.973 0 38-17.027 38-38s-17.027-38-38-38-38 17.027-38 38 17.027 38 38 38zm-2-71.945v67.887c-17.836-1.0391-32-15.852-32-33.945s14.164-32.902 32-33.945z" fill-rule="evenodd"/>
        </svg>
      );
    case 'dark':
      return <SunIcon data-testid="dark" />;
    case 'light':
      return <MoonIcon data-testid="light" />;
    default:
      return <SunIcon data-testid="default" />;
  }
}
```

**Important**: Pass the `className` prop through to the `<svg>` element for proper styling.

### Define custom color mode styles

Add styling rules for your new color mode in `@theme/styles.css`. The class name must match the color mode name:

```css {% title="@theme/styles.css" %}
:root.high-contrast {
  /* High contrast color scheme */
  --color-primary: #000000;
  --text-color: #000000;
  --bg-color: #ffffff;
  --navbar-bg-color: #ffffff;
  --sidebar-background-color: #ffffff;
  --border-color: #000000;
  --link-text-color: #000000;
}
```

### Add to configuration

Add the new color mode to your project configuration:

```yaml {% title="redocly.yaml" %}
colorMode: 
  modes: 
    - 'high-contrast'
    - 'light'
    - 'dark'
```

The first mode in the list is the default. See the [colorMode configuration](../config/color-mode.md) for all available options.

### Test your new color mode

1. Run `npx @redocly/cli preview` to start your local preview
2. Click the color mode switcher to toggle between modes
3. Verify the new icon appears and styles are applied correctly
4. Refine the styles in `@theme/styles.css` as needed

## Resources

* [Custom styles](./customize-styles.md) - Customize the styling of your documentation using CSS.
* [CSS variables](./css-variables/index.md) - Explore CSS variables you can use for styling.
* [Branding overview](./index.md) - Learn about all branding and customization options.
* [Component ejection](../customization/eject-components/index.md) - Learn how to eject and customize components.
* [Color mode configuration](../config/color-mode.md) - Configuration options for color modes.