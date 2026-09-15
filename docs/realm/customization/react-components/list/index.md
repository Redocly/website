---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# List of customizable components

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The following is the list of React components you can customize to influence the look and behavior of your project.

## Admonition

The Admonition component creates banners to highlight important information on your documentation pages.
It supports multiple types (info, warning, success, danger) and can include headers and custom content.
Perfect for displaying alerts, important notes, or special callouts.

For more information, see [admonition component reference](./admonition.md).

## Button

The Button component is a versatile interactive element that supports multiple variants, sizes, and states.
It can be used for actions, navigation, and form submissions with features like:

- multiple visual styles (primary, secondary, outlined, text, link, ghost)
- different sizes (small, medium, large)
- support for icons with customizable positioning
- various states (disabled, blinking)
- tone variations (default, danger) for different contexts

For more information, see [button component reference](./button.md).

## Link

The Link component provides consistent navigation functionality throughout your application.
It offers:

- internal and external link handling
- customizable styling and behavior
- target control (`_self`, `_blank`)
- language-sensitive routing support
- accessibility features
- event handling capabilities

For more information, see [link component reference](./link.md).

## Redocly Icons

Redocly's built-in SVG icons can be used in your React components.
The component supports:

- standard SVG properties and accessibility features
- customizable size and color properties
- `className` property for additional styling

For more information, see [Redocly icons component reference](./icons.md).

## Font Awesome Icons

The Font Awesome Icons component provides access to the complete FontAwesome icon library within your React components.
It supports:

- regular, solid, duotone, and brands FontAwesome icon styles
- customizable size and color properties
- CDN-based icon loading for optimal performance
- automatic color mode adaptation
- standard SVG properties and accessibility features

For more information, see [Font Awesome icons component reference](./fontawesome-icons.md).

## Tag

The Tag component is a versatile UI element designed to display labels, categories, status indicators, and other short pieces of information.
It offers:

- multiple color schemes including semantic colors (success, error, warning), HTTP method colors, and custom colors
- visual variants (filled and outline styles)
- interactive features with optional close buttons and click handlers
- status indicators with built-in status dots
- text truncation with customizable maximum length
- icon support for enhanced visual communication
- full accessibility support with keyboard navigation
- extensive CSS variable customization for theming

For more information, see [tag component reference](./tag.md).

## Dynamic import utility

The `dynamic` utility from `@redocly/theme` allows to load React components on demand.
It supports both server-side rendering and client-only rendering modes, with customizable loading states.

For more information, see [dynamic import utility reference](./dynamic.md).

## Resources

- **[Customize theme components](../wrap-components.md)** - Learn to wrap and customize built-in components to create reusable, branded versions for your project
- **[Components usage tutorial](../use-in-react-page.md)** - Learn to use your customized components in React pages with practical examples and implementation patterns
