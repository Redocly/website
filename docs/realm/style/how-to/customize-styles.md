# Customize styles

You can apply [custom styling](../concepts/styling.md) to change the appearance of your project.
For example, things like typography, colors, and spacing.

The core theme is built using [CSS variables](../reference/css-variables/index.md).
You can override those variables to add custom styling while benefiting from the theme's existing structure.

## Before you begin

Make sure you have the following before you begin:

- A new Realm, Reef, or Revel project updated to the latest version

## Create a theme stylesheet

You need a `@theme/styles.css` file to customize the styling of your project.

To add a `@theme/styles.css` file to your project:

1. Add a folder named `@theme` to the root of your project.
1. Create a `styles.css` file inside the `@theme` folder.

Your project structure should look similar to the following example file tree:

```treeview {% title="Example file structure with styles.css file" %}
your-awesome-project/
├── @theme/
│   └── styles.css
├── other-content.md
├── redocly.yaml
└── sidebars.yaml
```

## Add CSS selectors

Inside the `@theme/styles.css` file, add two selectors:`:root` and `:root.dark`.
These selectors keep styling changes scoped to light and dark mode, respectively.

```css {% title="@theme/styles.css" %}
:root {
   /* light mode styling */
}

:root.dark {
   /* dark mode styling */
}
```

For a more detailed look at color modes, please review the [Customize Color Modes](./customize-color-modes.md) guide.

## Override CSS variables

Add custom styling to your project by overriding CSS variables.

To override CSS variables:

1. Run your Redocly project in development mode.
1. Copy the following snippet into your `@theme/styles.css` file and save:

      ```css {% title="@theme/styles.css" %}
      :root {
      --navbar-bg-color: #E7BE9E;
      --h1-text-color: blue;
      }

      :root.dark {
         --navbar-bg-color: #BDC3EE;
         --h1-text-color: red;
      }
      ```
1. The styling changes should be visible.
   Toggle between color modes to check the difference.

Generally speaking, these are the steps you'll follow when styling your project:

1. Choose the elements you want to style.
1. [Identify the CSS variables](../concepts/styling.md#css-variables-in-realm) for those elements.
1. Override those variables with custom styling.

## Apply custom classes or IDs

You can apply custom CSS classes or IDs included in your `styles.css` file to many Markdown or Markdoc block level elements such as table cells, list items, quotes, and headers using Markdoc annotation syntax.

To apply a custom class to a Markdown element:

1. Add the custom class to your `styles.css` file, as in the following example:

   ```css {% title="styles.css" %}
   .highlight, p:has(.highlight) {
     background-color: yellow;
     color: red;
    }
   ```
1. Add the annotation syntax to the element in the Markdown document, as in the following example:

    {% markdoc-example %}

    ```markdown {% title="lists.md" process=false %}

      Introduction to unordered list:

      - unordered list item 1
      - unordered list item 2 {% class="highlight" %}
      - unordered list item 3

      Introduction to ordered list: {% class="highlight" %}

      1. ordered list item 1
      1. ordered list item 2
      1. ordered list item 3
    ```
    {% /markdoc-example %}

    Rendered output:

      Introduction to unordered list:

      - unordered list item 1
      - unordered list item 2 {% class="highlight" %}
      - unordered list item 3

      Introduction to ordered list: {% class="highlight" %}

      1. ordered list item 1
      2. ordered list item 2
      3. ordered list item 3


You may need to restart the Webview or commit your changes to your branch to see the updates.

## Examples

Use the examples in this section as starter themes to quickly add styling to your project.

{% admonition type="info" %}
   Have a request for a styling example? Please use the feedback form at the bottom of the page and tell us.
{% /admonition %}

### Example theme - "Full corporate"

The "Full corporate" styling uses a business font, has teal accents, and is very deliberate about spacing.

```css {% title="@theme/styles.css" %}
:root {
  --teal-primary-1: #62D7A6;
  --teal-primary-2: #9BB0A5;
  --dark-green-primary-1: #384B42;
  --dark-green-primary-2: #005A23;
  --font-family-base: Times New Roman;

  --md-container-max-width: 860px;
  --md-container-padding-vertical: 18px;
  --md-container-padding-horizontal: 5px;
  --md-paragraph-margin-vertical: 6px;
  --h1-margin-top: 12px;
  --h2-margin-top: 8px;

  --menu-item-bg-color-active: var(--teal-primary-1);
  --toc-item-border-color-active: var(--teal-primary-1);
  --breadcrumbs-text-color-active: var(--teal-primary-1);

  --navbar-bg-color: var(--teal-primary-2);
  
  --search-trigger-color: var(--dark-green-primary-1);

  --link-color-primary: var(--teal-primary-1);
  --link-color-visited: var(--dark-green-primary-2);

}

:root.dark {
  --teal-primary-dark: #CDFBE4;
  --text-color-dark: #22232B;

  --navbar-text-color: #364133;

  --menu-item-color-active: var(--text-color-dark);
  --menu-item-text-color: var(--teal-primary-dark);
}
```

The following screenshots show the styling rules applied:

{% tabs %}
  {% tab label="Light mode"%}
   ![Screenshot of Redocly project with the full corporate styling example applied in light mode.](../images/full-corporate-light.jpeg)
  {% /tab %}
  {% tab label="Dark mode"%}
   ![Screenshot of Redocly project with the full corporate styling example applied in dark mode.](../images/full-corporate-dark.jpeg)
  {% /tab %}
{% /tabs %}

### Example theme - "Trendy startup"

The styling for the "Trendy startup" example combines shocking pink and teeny tiny font sizes. Note the increased specificity used to style `.menu-item-type-separator` in dark mode. This approach can be used for styling elements that may not have a CSS variable defined yet.

```css {% title="@theme/styles.css" %}
:root {
  --font-size-base: 12px;
  --font-size-sm: 10px;
  --font-size-lg: 14px;
  --font-size-xl: 20px;

  --pink-primary-1: #F15483;
  --pink-primary-2: #FAAEBD;
  --pink-primary-3: #FFE3ED;
  --purple-primary: #905B9F;

  --h1-text-color: var(--pink-primary-1);
  --heading-text-color: var(--pink-primary-2);
  
  --search-trigger-bg-color: var(--pink-primary-3);
  --sidebar-bg-color: var(--pink-primary-3);

  --toc-item-text-color-active: var(--purple-primary);
  --breadcrumbs-text-color-active: var(--purple-primary);
}

:root.dark {
  --purple-primary-dark: #BD9BF4;

  --menu-item-text-color: #22232B;
  
  --toc-item-text-color-active: var(--purple-primary-dark);
  --breadcrumbs-text-color-active: var(--purple-primary-dark);
}

:root.dark .menu-item-type-separator {
  --menu-item-text-color: #22232B;
}
```

The following screenshots show the styling rules applied:

{% tabs %}
  {% tab label="Light mode"%}
   ![Screenshot of Redocly project with the trendy startup styling example applied in light mode.](../images/trendy-startup-light.jpeg)
  {% /tab %}
  {% tab label="Dark mode"%}
   ![Screenshot of Redocly project with the trendy startup styling example applied in dark mode.](../images/trendy-startup-dark.jpeg)
  {% /tab %}
{% /tabs %}

### Example theme - Personal wellness

The "Personal wellness" example uses styling that emphasizes pastel colors and lots of space between elements.
Note that the only spacing change in the following example is for `--spacing-unit`, but space between elements is increased throughout the theme.

```css {% title="@theme/styles.css" %}
:root {
  --pastel-green: #d2e7d6;
  --pastel-green-secondary: #00A84E;
  --pastel-blue: #94B5E3;
  --pastel-purple: #B9C3FC;
  --pastel-active: #FFDF82;
  --text-color-dark-green: #3B4A3F;

  --navbar-bg-color: var(--pastel-green);  
  --navbar-item-bg-color-hover: var(--pastel-active);
  --navbar-item-bg-color-active: var(--pastel-active);
  --navbar-border-color: var(--pastel-purple);
  --search-trigger-border-color: var(--pastel-purple);
  --search-input-placeholder-color: var(--pastel-purple);

  --sidebar-bg-color: var(--pastel-blue);
  --menu-item-bg-color-hover: var(--pastel-active);
  --menu-item-bg-color-active: var(--pastel-active);

  --toc-bg-color: var(--pastel-blue);
  --toc-border-color: var(--pastel-purple);
  
  --text-color-secondary: var(--text-color-dark-green);
  --link-color-primary: var(--pastel-green-secondary);
  --link-color-visited: var(--pastel-purple);

  --spacing-unit: 6px;
}

:root.dark {
  --pastel-green-dark: #728576;
  --pastel-green-secondary: #00A84E;
  --pastel-blue-dark: #2F4858;
  --pastel-purple: #B9C3FC;
  --pastel-active-dark: #386C5F;
  --text-color-light-grey: #ECFEEF;

  --navbar-bg-color: var(--pastel-green-dark);
  --navbar-item-text-color-active: var(--pastel-green-dark);
  --navbar-item-text-color-hover: var(--pastel-green-dark);
  --navbar-item-bg-color-hover: var(--pastel-green);
  --navbar-item-bg-color-active: var(--pastel-green);

  --sidebar-bg-color: var(--pastel-blue-dark);
  --menu-item-color-active: var(--pastel-green-dark);
  --menu-item-color-hover: var(--pastel-green-dark);
  --menu-item-bg-color-active: var(--pastel-green);
  --menu-item-bg-color-hover: var(--pastel-green);
  --toc-bg-color: var(--pastel-blue-dark);

  --text-color-secondary: var(--text-color-light-grey);
}
```

The following screenshots show the styling rules applied:

{% tabs %}
  {% tab label="Light mode"%}
   ![Screenshot of Redocly project with the personal wellness styling example applied in light mode.](../images/personal-wellness-light.jpeg)
  {% /tab %}
  {% tab label="Dark mode"%}
   ![Screenshot of Redocly project with the personal wellness styling example applied in dark mode.](../images/personal-wellness-dark.jpeg)
  {% /tab %}
{% /tabs %}

## Related how-tos

- [Customize color modes](./customize-color-modes.md) - Learn to style your project for color modes that your users switch between (light and dark)

## Resources

- [Concepts - Custom styling](../concepts/styling.md) - The fundamentals of customization and styling in Realm.
- [Concepts - Color mode](../concepts/color-mode.md) - Learn more about the color mode feature.
- [CSS variables](../reference/css-variables/index.md) - Explore CSS variables you can use for styling.