# Branding and customization

Redocly provides multiple approaches to customize your documentation's appearance and functionality. Choose the approach that best fits your technical requirements and team capabilities.

## Easy customization (configuration-based)

Customize your project's appearance using configuration options in your `redocly.yaml` file. No CSS knowledge required.

### Logo and branding
- **Logo configuration** - Set logos for different color modes using the [`logo`](../config/logo.md) configuration
- **Favicon** - Configure your site's favicon and browser tab appearance

### Colors and themes  
- **Color modes** - Enable light/dark mode switching using [`colorMode`](../config/color-mode.md) configuration
- **Basic color customization** - Set brand colors using CSS variables

### Typography
- **Font selection** - Choose from built-in font families using configuration options
- **Font loading** - Configure web fonts and font display settings

**When to use:** Perfect for basic branding needs, quick setup, or when you don't have CSS expertise on your team.

## Intermediate customization (CSS-based)

Customize your project's appearance using CSS variables and custom stylesheets. Requires basic to intermediate CSS knowledge.

### Custom styling
- **CSS variables** - Override [CSS variables](./css-variables/index.md) to customize colors, spacing, typography, and component appearance
- **Custom stylesheets** - Add custom CSS rules in your `@theme/styles.css` file using the [custom styling guide](./styling.md)
- **Color mode styling** - Create custom styling for light and dark modes

### Component styling
- **Typography customization** - [Customize fonts](./customize-fonts.md) with web fonts, custom font stacks, and advanced typography
- **Color mode customization** - [Customize color modes](./customize-color-modes.md) with custom color schemes and mode-specific styling  
- **Table styling** - [Customize table appearance](./customize-tables.md) with custom borders, colors, and layouts

**When to use:** When you need more control over appearance than configuration allows, want to match specific brand guidelines, or need custom styling for specific components.

### Complete styling setup example

Set up custom styling for your project:

```treeview
your-project/
├── @theme/
│   └── styles.css
├── static/
│   └── fonts/
│       ├── brand-font-regular.woff2
│       └── brand-font-bold.woff2
├── redocly.yaml
└── ...
```

Configure basic branding in `redocly.yaml`:

```yaml {% title="redocly.yaml" %}
logo:
  image: ./images/logo.svg
  altText: Your Brand
  link: https://yourbrand.com
  srcSet: "./images/logo-light.svg light, ./images/logo-dark.svg dark"
```

Add custom styling in `@theme/styles.css`:

```css {% title="@theme/styles.css" %}
/* Custom brand colors */
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --sidebar-background-color: #f8fafc;
  --navbar-background-color: #ffffff;
}

:root.dark {
  --color-primary: #60a5fa;
  --color-primary-hover: #3b82f6;
  --sidebar-background-color: #1e293b;
  --navbar-background-color: #0f172a;
}

/* Custom fonts */
@font-face {
  font-family: 'BrandFont';
  src: url('../static/fonts/brand-font-regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

:root {
  --font-family-headings: 'BrandFont', system-ui, sans-serif;
}
```

## Advanced/Technical customization

For complex customization needs that go beyond CSS styling. Requires React and/or advanced web development knowledge.

### Component customization
- **Component ejection** - [Eject and customize components](../customization/eject-components/index.md) like navbar, footer, search, or 404 pages for extensive brand customization

### Custom functionality
- **React pages** - [Create React pages](../customization/create-react-page.md) for complex layouts, interactive content, or custom landing pages
- **Custom page templates** - [Create custom page templates](../customization/custom-page-templates.md) for specific page layouts like blog posts or specialized content types
- **Markdoc tags** - [Build custom Markdoc tags](../customization/build-markdoc-tags.md) to add custom functionality and interactive components to your content
- **Custom components** - Develop entirely custom React components for specialized use cases

### Common technical customization scenarios

**Extensive navbar branding**
Eject the navbar component to add custom logo animations, additional navigation elements, or complex brand-specific layouts.

**Custom footer with brand elements**  
Eject the footer component to include custom brand messaging, additional links, social media integration, or newsletter signups.

**Interactive landing pages**
Create React pages for marketing-focused landing pages with custom layouts, animations, or interactive elements.

**Custom content components**
Build Markdoc tags for interactive elements like product demos, calculators, or brand-specific content blocks.

**When to use:** When you need functionality that can't be achieved with CSS alone, require custom interactive elements, or need to integrate with external brand systems.

## Getting started

1. **Start with easy customization** - Configure your logo, colors, and basic branding through `redocly.yaml`
2. **Add intermediate customization** - Use CSS variables and custom styles for more precise brand control  
3. **Consider technical approaches** - Only when you need functionality beyond what CSS can provide

Choose the approach that best fits your technical requirements and team capabilities. You can always start simple and add more advanced customization as your needs grow.

## Resources

- [CSS variables reference](./css-variables/index.md) - Complete dictionary of available CSS variables for styling
- [Configuration reference](../config/index.md) - All available configuration options for easy customization
- [Component ejection guide](../customization/eject-components/index.md) - Technical guide to ejecting and customizing components