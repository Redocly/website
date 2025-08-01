# Add custom fonts

Add custom fonts to your projects in the following ways:

- Add a link to the `<head>` HTML element
- Import the font in your CSS file

When deciding which approach to take, consider which of the following factors are most important in your situation:

- **Performance:** Using a link in the tag is more performant because browsers can initiate font downloads sooner.
  In projects with large stylesheets, importing a font can delay rendering.

- **Workflow:** If authors need more control over how the fonts are applied or how they're organized in the stylesheets then using imports might make sense for their project.

## Before you begin

Make sure you have the following before you begin:

- either the custom font file or link to your custom font
- a `@theme` folder with a `styles.css` file
- a `redocly.yaml` file in the root of your project

## Add a link to the `<head>` HTML element

Adding a font link in the `<head>` element allows the font to download in parallel with other resources.
This maintains good page performance because the download doesn't block the page's rendering.

<details>
  <summary>Learn more about the <code>&lt;head&gt;</code> tag</summary>

  The `<head>` tag contains metadata, links to
  scripts and stylesheets, and other information that is
  important for the HTML document's structure, but isn't
  directly displayed on the webpage.
  The `<head>` tag always loads before the `<body>` tag.

  The following is an example `<head>` HTML element that includes some metadata as well as a link to a stylesheet:

   ```html
   <!DOCTYPE html>
   <html>
   <head>
   <title>The Acme Company's API Documentation</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta charset="UTF-8">
   <meta name="description" content="The Acme Company's API documentation">
   <meta name="keywords" content="HTML, CSS, JavaScript">
   <link rel="stylesheet" href="static/styles.css">
   </head>
   <body>
   ```
</details>

To add a custom font link to the `<head>` HTML element of your project:

1. Add the [font file](https://fonts.google.com/specimen/Fredoka) link to your `redocly.yaml` configuration file, as in the following example:
   ```yaml {% title="redocly.yaml" %}
   links:
     - href: https://fonts.gstatic.com
       rel: preconnect
     - href: 'https://fonts.googleapis.com/css2?family=Fredoka:wdth,wght@75..125,300..700&display=swap'
       rel: stylesheet
   ```
2. Update the CSS variables with your new font name, as in the following example:
   ```css {% title="@theme/styles.css" %}
   :root {
    --h1-font-family: 'Fredoka';
    --font-family-base: 'Fredoka';
    }
   ```

Afterward, view your changes locally or in Reunite.

## Import the font in your CSS file

If you need to consolidate multiple font files or want more control over how your font files are loaded through CSS rules, you can import custom fonts in your CSS file.

To import a font in your CSS file:

1. Add your font file(s) to your `@theme` folder.
2. Include a `@font-face` rule in your CSS file, as in the following example:
   ```css {% title="@theme/styles.css" %}
   @font-face {
   font-family: 'Fredoka';
   src: url('./fonts/Fredoka-VariableFont.ttf') format('truetype');
   }
   ```
3. Update the CSS variables with your new font name, as in the following example:
   ```css {% title="@theme/styles.css" %}
   :root {
    --h1-font-family: 'Fredoka';
    --font-family-base: 'Fredoka';
    }
   ```

Afterward, view your change locally or in Reunite.

## Resources

- See excellent styling examples in the [custom styles](customize-styles.md) guide.
- Follow instructions for setting CSS styles by color mode (light/dark) in the [Customize color mode styles](customize-color-modes.md) styling guide.
- See options for adding other links to the `<head>` HTML element of your project pages in the [`links`](../config/links.md) reference documentation.
- Learn more about CSS variables in the [CSS variables reference](./css-variables/index.md).
