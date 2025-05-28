# Add color-mode-specific images

If you're working in React, you can add an image with multiple, color-mode-specific versions that automatically changes with the color mode. This capability is only supported in React code.

## Before you begin

Make sure you have the following before you begin:

- A Redocly Realm project running locally or in the Reunite web editor.
- Two versions (light and dark) of an image stored locally.

## Prepare project for feature

To get your project ready for testing color-mode-specific images:

1. From the root of your project, create a new directory and React page. For example, `color-mode-images/index.page.tsx`.

2. Add your image files (at least two) to the directory you just created. Here's an example file structure:
    ```treeview
    your-awesome-project/
    ├── color-mode-images/
    │   ├── index.tsx
    │   ├── sun.png
    │   └── moon.png
    ├── redocly.yaml
    └── sidebars.yaml
    ```

3. Update the React page to render the images you added, as in the following example:
    ```javascript
    import * as React from 'react';

    import sunImg from './sun.png';
    import moonImg from './moon.png';

    export default function() {
      return (
        <>
          <h1>Color mode image testing</h1>
          <img src={sunImg} />
          <img src={moonImg} />
        </>
      )
    }
    ```

If you can load the page and images successfully, then you're ready to move on.

## Add dynamic image element

This feature works by providing an image element with a list image paths and conditions using the `srcSet` property.

To add an image that switches with color mode:

1. At the top of your React file, import the `Image` component from the core Redocly theme, as in the following example:
    ```javascript
    import * as React from 'react';
    import { Image } from '@redocly/theme/components/Image/Image';
    // ...
    ```

2. Create a single, comma-separated string that contains the images and the color mode it corresponds with. It should follow this pattern: `<image> <color-mode>, <image> <color-mode>`.

3. Pass the list of images and color-modes to the `Image` component using the `srcSet` property, as in the following completed example:
    ```javascript
    import * as React from 'react';
    import { Image } from '@redocly/theme/components/Image/Image';

    import sunImg from './sun.png';
    import moonImg from './moon.png';

    export default function() {
      return (
        <>
          <h1>Color mode image testing</h1>
          <Image srcSet={`${sunImg} light, ${moonImg} dark`} />
        </>
      )
    }
    ```

In this example, the image changes when users toggle between color modes. You can see the working implementation below. Try changing the color mode.

{% color-mode-image-example /%}

## Resources

* Expand beyond the default light and dark modes by adding a [new, custom color mode](./add-color-mode.md).
* [Theme static assets](./theme-static-assets.md) - Ensure you're referencing static assets from the theme correctly.
* [Customize color modes](../../style/how-to/customize-color-modes.md) - Customize the styling of specific color modes.
