---
seo:
  title: Developer portal theme customization
excludeFromSearch: true

---

# Developer portal theme customization

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

To personalize your developer portal with custom fonts, colors, spacing and styles, modify the `theme.ts` file. The file defines a JSON configuration variable named `theme`. The values you define in this file override the default portal theme. If your portal has any integrated Reference docs pages, your custom theme applies to those pages as well.

Expand the schema below to show all available theming options. Notice the use of [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) to calculate certain values, like the section horizontal and vertical spacing.

The `additionalProperties` objects in the schema indicate that you can expand the existing theming options by implementing your own options when developing custom components.


{% admonition type="info" name="Tip" %}
All color values in the `theme.ts` file can be provided in any of the common color formats (hexadecimal value, RGB, HSL, human-friendly color names).
{% /admonition %}

{% json-schema
  schema={ "$ref": "./developer-portal-theme-schema.yaml"}
   options={
    schemaExpansionLevel: 3,
  }
/%}


## Example theme.ts file


```ts
import { lighten, readableColor, desaturate, darken, transparentize } from 'polished';
import { theme as userTheme } from 'Content/theme';

export const defaultTheme = {
  spacing: {
    unit: 5,
    sectionHorizontal: ({ spacing }) => spacing.unit * 8,
    sectionVertical: ({ spacing }) => spacing.unit * 8,
  },
  breakpoints: {
    xs: 0,
    small: '550px',
    medium: '900px',
    large: '1200px',
  },
  colors: {
    tonalOffset: 0.2,
    primary: {
      main: '#4b1fb8',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.primary.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.primary.main),
      contrastText: ({ colors }) => readableColor(colors.primary.main),
    },
    success: {
      main: '#00aa13',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.success.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.success.main),
      contrastText: ({ colors }) => readableColor(colors.success.main),
    },
    error: {
      main: '#e53935',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.error.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.error.main),
      contrastText: ({ colors }) => readableColor(colors.error.main),
    },
    warning: {
      main: '#d4ad03',
      light: ({ colors }) => lighten(colors.tonalOffset, colors.warning.main),
      dark: ({ colors }) => darken(colors.tonalOffset, colors.warning.main),
      contrastText: '#ffffff',
    },
    text: {
      primary: '#424242',
      secondary: '#4e566d',
    },
    responses: {
      success: {
        color: ({ colors }) => colors.success.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.success.main),
      },
      error: {
        color: ({ colors }) => colors.error.main,
        backgroundColor: ({ colors }) => transparentize(0.9, colors.error.main),
      },
      redirect: {
        color: '#ffa500',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.redirect.color),
      },
      info: {
        color: '#87ceeb',
        backgroundColor: ({ colors }) => transparentize(0.9, colors.responses.info.color),
      },
    },
    http: {
      get: '#6bbd5b',
      post: '#248fb2',
      put: '#9b708b',
      options: '#d3ca12',
      patch: '#e09d43',
      delete: '#e27a7a',
      basic: '#999',
      link: '#31bbb6',
      head: '#c167e4',
    },
    navbar: {
      main: ({ colors }) => colors.primary.main,
      contrastText: ({ colors }) =>
        ((userTheme as any).colors &&
          (userTheme as any).colors.navbar &&
          (userTheme as any).colors.navbar.main &&
          readableColor(colors.navbar.main)) ||
        colors.primary.contrastText,
    },
    footer: {
      main: ({ colors }) => colors.primary.main,
      contrastText: ({ colors }) =>
        ((userTheme as any).colors &&
          (userTheme as any).colors.footer &&
          (userTheme as any).colors.footer.main &&
          readableColor(colors.footer.main)) ||
        colors.primary.contrastText,
    },
  },

  sidebar: {
    backgroundColor: '#fafafa',
    width: '260px',
  },
  tocPanel: {
    width: '240px',
  },

  typography: {
    fontSize: '14px',
    lineHeight: '1.5em',
    fontWeightRegular: '400',
    fontWeightBold: '600',
    fontWeightLight: '300',
    fontFamily: 'Roboto, sans-serif',
    headings: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '600',
    },
    heading1: {
      fontSize: '1.85714em',
      fontWeight: '600',
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      color: ({ colors }) => colors.primary.main,
      capitalize: true,
    },
    heading2: {
      fontSize: '1.57143em',
      fontWeight: '600',
      color: ({ colors }) => colors.text.primary,
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    heading3: {
      fontSize: '1.27em',
      fontWeight: '600',
      color: ({ colors }) => colors.text.primary,
      fontFamily: ({ typography }) => typography.headings.fontFamily,
      lineHeight: ({ typography }) => typography.lineHeight,
      capitalize: false,
    },
    rightPanelHeading: {},
    code: {
      fontSize: '14px',
      fontFamily: 'Courier, monospace',
      fontWeight: ({ typography }) => typography.fontWeightRegular,
      color: '#e53935',
      backgroundColor: 'rgba(38, 50, 56, 0.04)',
      wrap: false,
    },
    links: {
      color: ({ colors }) => colors.primary.main,
      visited: ({ typography }) => typography.links.color,
      hover: ({ typography }) => lighten(0.2, typography.links.color),
    },
  },
  rightPanel: {
    backgroundColor: '#263238',
    width: '40%',
    textColor: '#ffffff',
  },
  codeSample: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
  },
  schema: {
    nestedBackground: '#fafafa',
    linesColor: theme =>
      lighten(
        theme.colors.tonalOffset,
        desaturate(theme.colors.tonalOffset, theme.colors.primary.main),
      ),
    defaultDetailsWidth: '75%',
    typeNameColor: theme => theme.colors.text.secondary,
    typeTitleColor: theme => theme.schema.typeNameColor,
    requireLabelColor: theme => theme.colors.error.main,
    labelsTextSize: '0.9em',
    nestingSpacing: '1em',
    arrow: {
      size: '1.1em',
      color: theme => theme.colors.text.secondary,
    },
  },
  codeBlock: {
    backgroundColor: ({ rightPanel }) => darken(0.1, rightPanel.backgroundColor),
    tokens: {},
  },
};
```
