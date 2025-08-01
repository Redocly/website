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

To customize color modes using CSS variables:

1. In your project's `@theme/styles.css` file, add three separate selectors to encapsulate each color mode's styling rules:

    ```css
    :root {
      /* Default styling goes here */
    }

    :root.light {
      /* Light mode styling goes here */
    }

    :root.dark {
      /* Dark mode styling goes here */
    }
    ```

2. Set a couple of default styling rules using CSS variables, as in the following example:

    ```css
    :root {
      --link-text-color: #1668dc;
      --bg-overlay: #f2f2f2;
    }

    :root.light {
      /* Light mode styling goes here */
    }

    :root.dark {
      /* Dark mode styling goes here */
    }
    ```

3. Override one of the rules in each color mode, as in the following example:

    ```css
    :root {
      --link-text-color: #1668dc;
      --bg-overlay: #f2f2f2;
    }

    :root.light {
      --sidebar-active-background-color: var(--color-purple-2);
    }

    :root.dark {
      --link-text-color: orange;
    }
    ```

In the example above, the link text color and the sidebar background for the active item change when the user switches between color modes.

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

## Resources

* [Customize styles](./customize-styles.md) - Customize the styling of your documentation using CSS.
* [CSS variables](./css-variables/index.md) - Explore CSS variables you can use for styling.
* [Concepts: Color mode](./color-mode.md) - Learn more about the color mode feature.
* Expand beyond the default light and dark modes by adding a [new, custom color mode](../customization/add-color-mode.md).