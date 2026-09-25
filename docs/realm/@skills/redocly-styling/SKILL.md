---
name: redocly-styling
description: >-
  Use when changing the look of a Redocly documentation project (Realm, Revel, Reef, or Redoc):
  colors, fonts, spacing, CSS variables, @theme/styles.css, dark mode and custom color modes,
  images per color mode, the logo and favicon, table styles, styles per product or locale,
  CSS classes on Markdown blocks, ejecting or overriding theme components (navbar, footer,
  404 page, RootLayout), wrapping built-in React components, React pages (.page.tsx),
  custom page templates, layout, theme static assets, or npm libraries in React code.
  Not for page content (use redocly-authoring), built-in Markdoc tags (use redocly-markdoc-tags),
  or other redocly.yaml settings (use redocly-configuration).
---

# Redocly styling and theme customization

Reference for the styles, color modes, and React components of Redocly documentation projects.

If a detail is not in this file, fetch the `Full reference` link of the section. Do not guess option names.

## The @theme folder

Put all theme customization in the `@theme` folder in the project root.

```treeview
your-project/
├── @theme/
│   ├── styles.css                 # Global styles, loads automatically
│   ├── fonts/, images/            # Static assets for CSS and React code
│   ├── components/                # Ejected or overridden components
│   │   └── Footer/Footer.tsx
│   ├── layouts/RootLayout.tsx     # Ejected root layout
│   ├── Templates/BlogPost.tsx     # Custom page templates
│   └── markdoc/                   # Custom Markdoc tags
│       ├── schema.ts
│       └── components.tsx
├── about.page.tsx                 # React page, served at /about
└── redocly.yaml
```

Select the smallest tool that does the change:

| Goal | Use |
|------|-----|
| Colors, fonts, spacing, sizes | CSS variables in `@theme/styles.css` |
| Logo, favicon, color mode switcher | `logo` and `colorMode` in `redocly.yaml` |
| Text and labels of UI components | `translations.yaml` |
| Styles for one Markdown block | A class annotation and a CSS rule |
| Structure or behavior of a theme component | Eject or wrap the component |
| A fully custom page | A React page (`*.page.tsx`) |
| A layout for a group of Markdown pages | A custom page template |

- The folder is `@theme` and the file is `styles.css`. `@themes/` becomes a version folder without an error.
- There is no color or font key in `redocly.yaml`. Use CSS variables.
- For custom Markdoc tags, load the `redocly-markdoc-tags` skill, if it is installed (or fetch https://redocly.com/docs/realm/customization/build-markdoc-tags.md).

Full reference: https://redocly.com/docs/realm/customization.md

## Styles and CSS variables

Override the CSS variables of the core theme in `@theme/styles.css`.
The file loads automatically. Do not add it to `links`.

```css {% title="@theme/styles.css" %}
:root {
  --color-primary-base: #2563eb;
  --font-family-base: 'Inter', system-ui, sans-serif;
  --navbar-bg-color: #ffffff;
  --sidebar-bg-color: #f8fafc;
}

:root.dark {
  --color-primary-base: #60a5fa;
  --navbar-bg-color: #0f172a;
  --sidebar-bg-color: #1e293b;
}
```

- Light mode is `:root`. Dark mode is `:root.dark`.
- The variables are nested. A base variable, such as `--bg-color`, feeds many component variables.
  Override a base variable for a theme-wide change. Override a component variable for one element.
- To change a variable for one area only, set it in the scope of a class, for example `.blog-display { --text-color-secondary: black; }`.
- Find a variable with the browser developer tools or in the reference. Do not invent names. Some guide examples use names that are not in the reference, such as `--color-primary` and `--sidebar-background-color`.

Most used variables:

| Group | Variables |
|-------|-----------|
| Primary color | `--color-primary-base`, `--color-primary-hover`, `--color-primary-active`, `--color-primary-bg`, `--color-primary-text` |
| Status colors | `--color-info-base`, `--color-success-base`, `--color-warning-base`, `--color-error-base` |
| Palette | `--color-warm-grey-1` … `-11`, `--color-blueberry-1` … `-11`, and other colors |
| Text | `--text-color-primary`, `--text-color-secondary`, `--text-color-description` |
| Fonts | `--font-family-base`, `--font-family-monospaced`, `--font-size-base`, `--line-height-base` |
| Headings | `--heading-font-family`, `--heading-text-color`, `--h1-font-family`, `--h1-font-size`, `--h2-font-size` |
| Background and borders | `--bg-color`, `--bg-color-raised`, `--border-color-primary`, `--border-radius` |
| Spacing | `--spacing-unit` (all `--spacing-*` values derive from it), `--container-width` |
| Navbar | `--navbar-bg-color`, `--navbar-text-color`, `--navbar-height`, `--navbar-border-color` |
| Sidebar | `--sidebar-bg-color`, `--sidebar-width`, `--menu-item-bg-color-active` |
| Table of contents | `--toc-width`, `--toc-item-text-color-active` |
| Footer | `--footer-bg-color`, `--footer-text-color` |
| Content | `--md-content-max-width`, `--md-content-text-color`, `--code-block-bg-color` |
| Links | `--link-color-primary`, `--link-color-visited`, `--link-decoration`, `--link-decoration-hover` |
| Logo | `--logo-height`, `--logo-max-width` |

- To remove the link underline, set `--link-decoration: none` and `--link-decoration-visited: none`. Add `--link-decoration-hover: none` to remove it on hover too.

- With `products`, the `<html>` element gets a `product-<name>` class in kebab-case. "Example One" gives `:root.product-example-one`, and `:root.dark.product-example-one` in dark mode.
- A product named "Ads" gets the class `product-ads_`. Ad blockers hide `product-ad`, `product-ads`, and `product-inlist-ad`.
- To style one locale, select the `lang` attribute with the locale `code` from `l10n.locales`, for example `:root[lang="es-ES"] { ... }`.
  See https://redocly.com/docs/realm/content/localization/customize-styles-for-locale.md.

- To style one Markdown block, add a class with an annotation, such as `- Item {% class="highlight" %}` or `Intro text {% .highlight %}`, and define `.highlight` in `styles.css`.
  Annotations work on block elements: paragraphs, list items, headings, quotes, and table cells. They can also set an `id`.
- For a layout, such as two diagrams side by side, wrap the blocks in `<div class="side-by-side">` and define the class with `display: flex`.

Full reference: https://redocly.com/docs/realm/branding/customize-styles.md

Variable lists: https://redocly.com/docs/realm/branding/css-variables/common.md, https://redocly.com/docs/realm/branding/css-variables/component.md, https://redocly.com/docs/realm/branding/css-variables/api-docs.md

## Fonts

Load a web font with `links` in `redocly.yaml`, then set the font variables.

```yaml {% title="redocly.yaml" %}
links:
  - href: 'https://fonts.googleapis.com/css2?family=Fredoka:wdth,wght@75..125,300..700&display=swap'
    rel: stylesheet
```

```css {% title="@theme/styles.css" %}
/* Only for a local font file in @theme/fonts/ */
@font-face {
  font-family: 'Fredoka';
  src: url('./fonts/Fredoka-VariableFont.ttf') format('truetype');
}

:root {
  --font-family-base: 'Fredoka';
  --h1-font-family: 'Fredoka';
}
```

- `links` is faster. The browser downloads the font in parallel with other resources.
- `@font-face` and `@import` in CSS give more control, but can delay rendering in large stylesheets.
- A `links` item needs `href`. Other fields map to `<link>` attributes, such as `rel`, `crossorigin`, and `media`.

Full reference: https://redocly.com/docs/realm/branding/customize-fonts.md

## Color modes

Configure the color mode switcher with `colorMode` in `redocly.yaml`.

```yaml {% title="redocly.yaml" %}
colorMode:
  ignoreDetection: true
  modes: [high-contrast, light, dark]
```

| Option | Default | Description |
|--------|---------|-------------|
| `hide` | `false` | Hide the switcher. Also in the front matter. |
| `ignoreDetection` | `false` | Ignore the color mode of the operating system. |
| `modes` | `[light, dark]` | Available modes. The first one applies when there is no other preference. |

The site selects the mode in this order: the mode that the user selected (stored in `localStorage`), the operating system mode (unless `ignoreDetection: true`), and then the first item of `modes`.

To add a custom color mode:

1. Eject the icon: `npx @redocly/cli eject component 'ColorModeSwitcher/ColorModeIcon.tsx'`.
2. Add a `case` for the new mode name in the `Icon` switch. Pass `className` to the `<svg>` element.
3. Add styles for the class with the same name, for example `:root.high-contrast { ... }`.
4. Add the name to `colorMode.modes`.

- In React code, `const { activeColorMode, switchColorMode, isSwitcherHidden } = useColorSwitcher();` (from `@redocly/theme`) reads and changes the mode.
  `switchColorMode()` without an argument goes to the next mode. `switchColorMode('dark')` sets that mode. The hook ignores a mode that is not configured.
- For an image per color mode in React code, import the images and use the `Image` component: ``<Image srcSet={`${sunImg} light, ${moonImg} dark`} />``.

Full reference: https://redocly.com/docs/realm/branding/customize-color-modes.md

## Logo and favicon

Set the navbar logo and the favicon with `logo` in `redocly.yaml`.

```yaml {% title="redocly.yaml" %}
logo:
  srcSet: './images/logo-light.svg light, ./images/logo-dark.svg dark'
  altText: Example
  link: 'https://example.com'
  favicon: ./images/favicon.svg
```

| Option | Description |
|--------|-------------|
| `image` | URL, path to a PNG or SVG, or a Base64 data URL. Mutually exclusive with `srcSet`. |
| `srcSet` | One logo for each color mode: `'<path> <mode>, <path> <mode>'`. Mutually exclusive with `image`. |
| `altText` | Alt text of the logo. |
| `link` | Target of the logo link. |
| `favicon` | URL or path to the favicon (PNG or SVG). |

- Change the logo size with `--logo-height`, `--logo-width`, and `--logo-max-width`.

Full reference: https://redocly.com/docs/realm/config/logo.md

## Tables

Style all tables with the `--md-table-*` variables. Style one table with a class or a `data-label` selector.

```css {% title="@theme/styles.css" %}
:root {
  --md-table-cell-padding: 8px;
  --md-table-border-color: black;
  --md-table-header-bg-color: #ededf2;
}

:root th[data-label="Favorite vegetable"] { width: 80%; }
:root .striped-table-rows tr:nth-child(even) { background-color: lightskyblue; }
```

- Each header cell gets a `data-label` attribute with its text. Tables with the same header share the styles.
- Add the `.md` class next to a custom class: `{% table .striped-table-rows .md %}`. Otherwise the table loses the default theme styles.
- To style a row, annotate its first cell, for example `{% .highclick %}`, and select `tr:has(.highclick) > *`.

Full reference: https://redocly.com/docs/realm/branding/customize-tables.md

## Theme static assets

Put images, fonts, and extra stylesheets in `@theme`. Reference them with `url()` in CSS, or import them in React code.

```tsx {% title="@theme/components/ContactUsCard.tsx" %}
import phoneIcon from '../images/phoneIcon.png';

export const ContactUsCard = () => <img src={phoneIcon} alt="Phone icon" />;
```

- Load another stylesheet from `styles.css` with `@import url('other-custom-styles.css');`.
- In a Markdoc tag schema, set `resolver: 'link'` on an attribute to let authors pass a relative path to an image. The component gets the resolved path.

Full reference: https://redocly.com/docs/realm/customization/theme-static-assets.md

## Eject components

Ejecting copies the source of a theme component into `@theme`. Change its styles, structure, or behavior there.

```bash
npx @redocly/cli eject component 'Footer/**'                    # Prompt to select files in Footer
npx @redocly/cli eject component 'Filter/Filter.tsx'            # Eject one file
npx @redocly/cli eject component 'Filter/Filter.tsx' --force    # Overwrite an ejected file
npx @redocly/cli eject component 'layouts/RootLayout.tsx'       # Eject the root layout
```

- `-d <dir>` (`--project-dir`) ejects into `<dir>/@theme/`.
- Find the component name in the `data-component-name` attribute in the browser developer tools.
- In Reunite, eject from **Editor** > **Theme components**.
- The ejected file overrides the core one only at the same path in `@theme`, with the same file name and function name.
- Components go to `@theme/components/`. `RootLayout` goes to `@theme/layouts/`.
- You maintain an ejected component.
  To update it, rename the folder as a backup, eject again, and apply your changes again.
- Delete the ejected file to use the core component again.
- Before you eject, try CSS variables, `redocly.yaml`, or `translations.yaml`.
- To add a React provider, eject `RootLayout`. In it, import the original as `OriginalRootLayout` from `@redocly/theme/layouts/RootLayout`, and render `<MyProvider><OriginalRootLayout {...props} /></MyProvider>`.

Full reference: https://redocly.com/docs/realm/customization/eject-components/eject-components-using-cli.md

## Wrap theme components

To change a component everywhere without a full eject, put a wrapper that renders the original at the path of the original import.

```tsx {% title="@theme/components/Admonition/Admonition.tsx" %}
import { Admonition as Original } from '@redocly/theme/components/Admonition/Admonition';

export const Admonition = (props) => <Original {...props} className="my-admonition" />;
```

- The file path in `@theme` must match the import path after `@redocly/theme/`.
- The wrapper applies to all pages and all components that use the original.

Full reference: https://redocly.com/docs/realm/customization/react-components/wrap-components.md

## React pages

A file with the `.page.tsx` suffix is a page. Routing is file-based: `changelog.page.tsx` is `/changelog`.

```tsx {% title="example.page.tsx" %}
import React from 'react';
import styled from 'styled-components';
import { Admonition } from '@redocly/theme/components/Admonition/Admonition';

export const frontmatter = { seo: { title: 'Example' }, navbar: { hide: true } };

const Wrapper = styled.div`padding: 40px;`;

export default function () {
  return (
    <Wrapper>
      <Admonition type="warning">Test</Admonition>
    </Wrapper>
  );
}
```

- Set the front matter with `export const frontmatter`, for example `seo`, `rbac`, `navbar`, or `footer`.
- A `.tsx` file without the `.page` suffix is not a page. Use it for components that pages import.
- An IDE `Cannot find module` error for `react` or `styled-components` is not a build error. The modules resolve in `npx @redocly/cli preview`. To remove the error, install `@redocly/realm` or `@redocly/revel` locally.

Built-in components that a React page can import:

| Component | Import |
|-----------|--------|
| `Admonition` | `@redocly/theme/components/Admonition/Admonition` |
| `Button` | `@redocly/theme/components/Button/Button` |
| `Link` | `@redocly/theme/components/Link/Link` |
| `Tag` | `@redocly/theme/components/Tag/Tag` |
| `Image` | `@redocly/theme/components/Image/Image` |
| Redocly icons | `@redocly/theme/icons/<IconName>/<IconName>` |
| Font Awesome icons (`CDNIcon`) | `@redocly/theme/icons/CDNIcon/CDNIcon` |
| `dynamic` (lazy loading), `useColorSwitcher` | `@redocly/theme` |

- `dynamic(() => import('./Heavy'), { ssr: false })` loads a component only in the browser. `ssr` is `true` by default.

- For the props of each component, get https://redocly.com/docs/realm/customization/react-components/list.md.

Full reference: https://redocly.com/docs/realm/customization/create-react-page.md

## Page templates

A page template is a React component that renders Markdown pages with a custom layout.
Put it in `@theme/Templates/`.

```tsx {% title="@theme/Templates/BlogPost.tsx" %}
import React from 'react';
import { Markdown } from '@redocly/theme/components/Markdown/Markdown';

export default function BlogPost({ pageProps, children }) {
  return (
    <div>
      <p>By {pageProps.frontmatter.author?.name}</p>
      <Markdown>{children}</Markdown>
    </div>
  );
}
```

Apply the template to one page with `template` in its front matter, for example `template: '../@theme/Templates/BlogPost'` (relative to the page).
Or apply it to many pages with `markdown.template` in `redocly.yaml`:

```yaml {% title="redocly.yaml" %}
markdown:
  template:
    'blog/**': './@theme/Templates/BlogPost'
    'blog/drafts': './@theme/Templates/Draft'
    'demos/new-api.md': './@theme/Templates/SimpleApi'
```

- A key is a file path, a folder path (all Markdown files in it and its subfolders), or a glob. The most specific matching key applies.
- The template gets all front matter fields in `pageProps.frontmatter`. Use custom fields, such as `author` or `date`, to pass data.

Full reference: https://redocly.com/docs/realm/customization/custom-page-templates.md

## npm libraries

Install a React library, then import it in React code.

```tsx
// npm install react-icons
import { FaHeart } from 'react-icons/fa';

export const MyComponent = () => <FaHeart color="red" size={24} />;
```

- In Reunite, add the library to `dependencies` in `package.json`.
- For a private registry, use `.npmrc` or `bunfig.toml` in the project root. Put credentials in environment variables, such as `NPM_TOKEN`. Do not commit them.
  In Reunite, the names of these variables must start with `NPM_`.
- To use a library in Markdown, register a Markdoc tag that renders it.

Full reference: https://redocly.com/docs/realm/customization/import-npm-library.md

## Common mistakes

| Mistake | Correct approach |
|---------|------------------|
| `colors:` or `fonts:` in `redocly.yaml` | CSS variables in `@theme/styles.css`. Load fonts with `links` |
| `@themes/styles.css` or `@theme/style.css` | `@theme/styles.css` |
| An invented variable, such as `--color-primary` or `--sidebar-background-color` | A name from the reference, such as `--color-primary-base` or `--sidebar-bg-color` |
| `:dark` as the dark mode selector | `:root.dark` |
| `logo.image` and `logo.srcSet` together | One of them. `srcSet` for one logo per color mode |
| A new mode in `colorMode.modes` without styles or an icon | Add `:root.<mode>` styles and a `case` in the ejected `ColorModeIcon.tsx` |
| An ejected file at a different path or with a renamed function | Keep the path, file name, and function name of the original |
| A full eject to add a class or a provider | Wrap the original component |
| `{% table .my-class %}` loses the theme styles | `{% table .my-class .md %}` |
| A React page named `about.tsx` | `about.page.tsx` |
| YAML front matter in a `.page.tsx` file | `export const frontmatter = { ... }` |
| Registry tokens in `.npmrc` in Git | Environment variables, such as `${NPM_TOKEN}` |
