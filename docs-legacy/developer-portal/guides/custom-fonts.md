---
seo:
  title: Using custom fonts in your Developer portal
excludeFromSearch: true

---

# Add custom fonts to the Developer portal

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

You can use custom fonts in your developer portal to customize its appearance. To add custom fonts to your portal theme settings, you must first define them in a special stylesheet (CSS) file in your portal project.

Custom fonts are supported in the Developer portal regardless of how you're hosting it (on-premise or in Workflows).


## Copy font files to your portal project

1. In the root of your portal project, create a folder called `static`, or if it already exists, navigate to it. This is [a special folder](organizing-files.md#use-the-static-folder-to-add-assets) for organizing various portal assets.

2. In the `static` folder, create a subfolder called `fonts` and place your custom font files into it.


## Define custom fonts in a stylesheet

1. In the `static` folder, create a file called `fonts.css`. You can use a different name for this file, but its extension must be `.css`.

2. In the `fonts.css` file you've created, define one or more custom fonts you want to use in the portal. The following examples show how to define a custom font family with three different file formats:
{% tabs %}
{% tab label="Generic example" %}
```css
@font-face {
  font-family: 'your-font-name', monospace;
  src: url(fonts/your-font.woff2) format('woff2'),
       url(fonts/your-font2.woff) format('woff'),
       url(fonts/your-font3.ttf) format('truetype');
}
```
{% /tab  %}
{% tab label="Fira Mono" %}
```css
@font-face {
  font-family: 'Fira Mono', monospace;
  src: url(fonts/FiraMono-Regular.woff2) format('woff2'),
       url(fonts/FiraMono-Regular.woff) format('woff'),
       url(fonts/FiraMono-Regular.ttf) format('truetype');
}
```
{% /tab  %}
{% /tabs  %}

The contents of the `url()` field must match the location of your font file. Make sure the font file type matches the contents of the `format()` field.

3. Save the changes to the `fonts.css` file.


## Add the stylesheet to portal configuration

1. Open the `siteConfig.yaml` file for your portal project.

2. In the [stylesheets](../configuration/siteconfig/stylesheets.md) section, add the path to the custom font stylesheet you've created.

```yaml
stylesheets:
  - './static/fonts.css'
```

3. Save the changes to the `siteConfig.yaml` file.


## Use custom fonts in the portal theme

After you have copied the font files to your portal project and set up the font stylesheet, you can use custom fonts in the `theme.ts` file.

When specifying the font name in the `theme.ts` file, make sure it matches the `your-font-name` from the `fonts.css` file.

The following example shows how to use a custom font in the `typography` section of the portal theme:
{% tabs %}
{% tab label="Generic example" %}
```jsx
typography: {
  fontSize: '16px',
  lineHeight: '1.5em',
  fontWeightRegular: '400',
  fontWeightBold: '600',
  fontWeightLight: '300',
  fontFamily: '"your-font-name", monospace',
  headings: {
    fontFamily: '"your-font-name", monospace',
    fontWeight: '600',
  },
```
{% /tab  %}
{% tab label="Fira Mono" %}
```jsx
typography: {
  fontSize: '16px',
  lineHeight: '1.5em',
  fontWeightRegular: '400',
  fontWeightBold: '600',
  fontWeightLight: '300',
  fontFamily: '"Fira Mono", monospace',
  headings: {
    fontFamily: '"Fira Mono", monospace',
    fontWeight: '600',
  },
```
{% /tab  %}
{% /tabs  %}

Note that you must rebuild the portal for your changes to apply.

