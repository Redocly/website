# Color mode

Color mode is an interactive feature that allows users to change the visual theme of the documentation to tailor their reading experience. But there's more to color mode than user convenience; it can have implications on health, accessibility, productivity, and more.

## Types of color mode

By clicking the color mode button in the top right of the navbar, users can switch between pre-defined color schemes according to their needs. Every Redocly project includes light and dark mode out-of-the-box. It's also possible to add [new, custom color modes](./customize-color-modes.md#add-new-color-modes) using React code.

### Light mode ![light icon](./images/theme-light.svg)

Light mode displays dark text on a light background. In well-lit environments, the increased contrast between the text and background can reduce glare and make reading more comfortable.

### Dark mode ![dark icon](./images/theme-dark.svg)

Dark mode reverses the traditional "light-background, dark-text" configuration. Instead, it dark mode presents lighter colors against a dark background. It's favored in low-light conditions or by users that find bright screens uncomfortable.

## Color mode implementation

The navbar of your documentation contains an icon representing the color mode, such as light ( ![light icon](./images/theme-light.svg) ) or dark ( ![dark icon](./images/theme-dark.svg) ). When a user switches the color mode, the documentation's CSS dynamically changes to the corresponding color scheme throughout all content. Additionally, the user's color mode is set in their local storage so their preferred color mode is applied when they return to your documentation.

### How color mode works

The color mode feature uses [CSS variables](./css-variables/index.md) and color-mode-specific styling rules, allowing users to instantly transition between color schemes without reloading the page.

#### CSS variables as building blocks

The core theme defines a set of foundational CSS variables for things like colors and fonts. These foundational variables are then used to define more specific CSS variables tailored for individual elements. This approach helps maintain a cohesive look and feel while offering powerful customization.

#### Separate sets of styling rules

Each color mode draws from its own distinct set of styling rules. The documentation switches between them when the user changes the color mode. You can add your own, color-mode-specific styling rules by overriding the CSS variables, which you can learn about using the resources listed below.

## Resources

* [Customize styles](./customize-styles.md) - Customize the styling of your documentation using CSS.
* [Customize color modes](./customize-color-modes.md) - Customize the styling of specific color modes.
* Expand beyond the default light and dark modes by adding a [new, custom color mode](./customize-color-modes.md#add-new-color-modes).
* [CSS variables](./css-variables/index.md) - Explore CSS variables you can use for styling.
