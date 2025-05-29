# Theme static assets

Static assets play an important role in your documentation theme. This guide shows you how to use static assets in a theme when you add the files directly or they come from a Markdoc tag.

## Before you begin

Make sure you have the following before you begin:

- Check for `@theme` folder. Add one if missing
- `@redocly/realm` installed in project
- Familiarity with CSS and React

## Use theme assets in CSS

Using static assets, such as images, fonts, or other stylesheets, can enhance your theme's visual appeal and user experience.

To use theme assets in CSS:

1. Add the files to your project's `@theme` folder.

2. Load the assets in the `@theme/styles.css` file using the `url()` function.

3. Use the asset by overriding a CSS variable or adding it to a styling rule.

The following example uses static assets to change a theme's font and define a class with a full-width image:  

```css {% title="@theme/styles.css" %}
@import url('other-custom-styles.css');

@font-face {
  font-family: 'CustomFont', sans-serif;
  src: url('../fonts/CustomFont.woff2') format('woff2'),
    url('../fonts/CustomFont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.hero {
  background-image: url('../images/hero-image.jpg');
  background-size: cover; 
  background-position: center; 
  height: 400px;
}

:root {
  --font-family-base: 'CustomFont', sans-serif;
}
```

## Use theme assets in React

You can import static assets into your React files (`.tsx`) and use them in components.
This is a great way to add custom icons or images.

The following example shows a React component using an imported static file:

```javascript {% title="@theme/components/ContactUsCard.tsx" %}
import React from 'react';
import phoneIcon from '../images/phoneIcon.png';

export function ContactUsCard({ phoneNumber }){
  return (
    <div className="contact-card">
      <img src={phoneIcon} alt="Phone icon" />
      <h3>Contact us</h3>
      <p>Call during business hours: {phoneNumber}</p>
    </div>
  )
}
```

The phone icon will render everywhere the `ContactUsCard` component is used.

The following example shows a React page that renders the `ContactUsCard` and an image:

```javascript {% title="About.page.tsx" %}
import React from 'react';
import { ContactUsCard } from './components/ContactUsCard';
import teamPhoto from './images/TeamPhoto-2024.png';

export function AboutPage() {
  return (
    <>
      <h1>About our company</h1>
      <p>Check out our awesome photo!</p>
      <img src={teamPhoto} alt="Team photo from 2024" width="250" />
      <ContactUsCard phoneNumber="+1 (123) 456-7890" />
    </p>
  );
}
```

## Use assets from authors

When you build [Markdoc tags](https://redocly.com/docs/learn-markdoc), you can create components that use static assets provided by the author, such as images.
This can unlock powerful capabilities for authors, such as the following examples:

- Modify the styling or behavior of an image, for example, adding a caption, border, or lightbox behavior.
- Pass an image to render as part of a more complex component, such as a product card with a screenshot, price, and description.

### Static assets as children

If a Markdown image is wrapped in a Markdoc tag, then the tag's component receives the image as a node on the `children` prop.
This behavior is useful for adding styling or wrapper elements around the entire image.

The following example shows a tag wrapping an image to add a border:

{% markdoc-example %}

  ```markdown {% process=false %}
  Here's _markdown_ content with a screenshot:

  {% image-border %}
    ![Picture of cat with glasses](../images/cat-with-glasses.jpg)
  {% /image-border %}
  ```

{% /markdoc-example %}

### Static assets as attributes

If an author passes an asset's filepath as an [attribute](https://redocly.com/docs/learn-markdoc/write-with-markdoc#attributes-control-tags) on the Markdoc tag, the component receives the string as a prop.
This behavior allows for more advanced styling or when the image is part of a more complex element.

Allow authors to pass a _relative path_ to a static asset by setting the attribute's `resolver` to `link` in the [Markdoc tag schema](../tutorials/build-markdoc-tags.md).

The following example shows a schema that accepts an image attribute from authors:

```javascript {% title="tag-schema.ts" %}
import type { Schema } from '@markdoc/markdoc';

export const customTag: Schema = {
  schema: {
    render: 'YourComponent',
    attributes: {
      image: {
        type: String,
        resolver: 'link',
      },
    }
  },
  tagName: 'custom-tag',
};
```

Setting the `resolver` property in the tag schema allows authors to provide a _relative path_ to a static asset as an attribute while the underlying component receives a _resolved path_ to the file.

The following example shows a Markdoc tag that accepts an `image` attribute:

{% markdoc-example %}

  ```markdown {% process=false %}
  ---
  seo:
    title: Awesome guide
  ---

  Here's _markdown_ content with a screenshot:

  {% ui-card-tag title="See our products" image="../images/product-img.png" /%}
  ```

{% /markdoc-example %}

## Resources

- Add [custom styling](../../style/concepts/styling.md) to your documentation using CSS.
- Explore the [default theme settings](./default-theme-settings.md) to see how projects are configured.
- [Build a Markdoc tag](../tutorials/build-markdoc-tags.md) to create custom authoring tools.
