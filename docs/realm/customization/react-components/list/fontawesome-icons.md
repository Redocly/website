# Font Awesome Icons

The Font Awesome Icons component provides access to the complete Font Awesome icon library within your React components.
It uses CDN-based loading for optimal performance and supports all Font Awesome icon styles.

## Import

```tsx
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';
```

## Properties

{% table %}

- Property
- Type
- Description

---

- name
- string
- **REQUIRED.** The FontAwesome icon name.
Supports all Font Awesome icons from the built-in packs: Classic Regular, Classic Solid, Duotone Solid, and Classic Brands.

---

- type
- string
- The style of the icon.
  Possible values: `regular`, `solid`, `duotone`, `brands`.
  Default: `regular`

---

- pack
- string
- The icon pack to use.
  Possible values: `font-awesome`, `code`.
  Default: `font-awesome`

---

- mode
- string
- The rendering mode.
  Possible values: `mask`, `background`.
  Default: `mask`

---

- size
- string
- The size of the icon.
  Accepts any CSS value for size, like `px` or `em`.
  Default: `1em`

---

- color
- string
- The color of the icon.
  Accepts any CSS color value.
  Default: `currentColor`

---

- className
- string
- Optional CSS class name for additional styling.

---

- [Standard SVG properties](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute)
- React.SVGProps
- All standard SVG properties are supported.

{% /table %}

## Basic usage

Display a simple Font Awesome icon:

```tsx
import React from 'react';
import { CDNIcon } from '@redocly/theme/icons/CDNIcon/CDNIcon';

export function MyComponent() {
  return (
    <div>
      <CDNIcon name="book" />
    </div>
  );
}
```

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects
- **[Built-in icon components](./icons.md)** - Use Redocly's built-in SVG icon system for consistent design
- **[FontAwesome Icons website](https://fontawesome.com/icons)** - Browse the complete Font Awesome icon library
