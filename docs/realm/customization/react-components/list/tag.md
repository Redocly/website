# Tag

## Import

```tsx
import { Tag } from '@redocly/theme/components/Tag/Tag';
```

## Properties

{% table %}

- Prop {% width="20%" %}
- Type {% width="30%" %}
- Description

---

- `children`
- `React.ReactNode`
- Content to display inside the tag.

---

- `color`
- `StatusColor` \| `Color` \| `string`
- Color scheme or custom color value. Accepts predefined color values or any valid CSS color string.

  **Predefined Color values:**
  - `'red'`, `'green'`, `'blue'`, `'grey'`, `'turquoise'`, `'magenta'`, `'purple'`, `'carrot'`, `'raspberry'`, `'orange'`, `'grass'`, `'persian-green'`, `'sky'`, `'blueberry'`

  **StatusColor values:**
  - **Default status:** `'success'`, `'processing'`, `'error'`, `'warning'`, `'default'`
  - **Action status:** `'approved'`, `'declined'`, `'pending'`
  - **Subject status:** `'active'`, `'draft'`, `'deprecated'`, `'product'`
  - **HTTP methods:** `'get'`, `'post'`, `'put'`, `'delete'`, `'option'`, `'patch'`, `'head'`, `'hook'`, `'link'`
  - **Action colors:** `'receive'`, `'send'`
  - **Channel:** `'channel'`
  - **HTTP status:** `'http-deprecated'`

---

- `variant`
- enum (`'outline'` \| `'filled'`)
- Visual style variant.
  Defaults to `'filled'`.

---

- `size`
- `string`
- Size variant for the tag. Available values: `'small'`, `'medium'`, `'large'`.
  Defaults to standard size. See [CSS variables documentation](../../../branding/css-variables/component.md#tags) for theming details.

---

- `closable`
- `boolean`
- Whether to show a close button.
  Defaults to `false`.

---

- `active`
- `boolean`
- Whether the tag is in active state.
  Defaults to `false`.

---

- `borderless`
- `boolean`
- Whether to hide the border.
  Defaults to `false`.

---

- `withStatusDot`
- `boolean`
- Whether to show a status dot.
  Defaults to `false`.

---

- `statusDotColor`
- `string`
- Color of the status dot.
  Defaults to `'var(--tag-status-dot-color-default)'`.

---

- `icon`
- `React.ReactNode`
- Icon to display alongside or instead of text content.

---

- `maxLength`
- `number`
- Maximum character length before truncation. Text longer than this value will be truncated with ellipsis.

---

- `textTransform`
- enum (`'uppercase'` \| `'lowercase'` \| `'capitalize'` \| `'none'`)
- Text transformation style.

---

- `onClick`
- `(event: React.MouseEvent) => void`
- Click event handler for interactive tags.

---

- `onKeyDown`
- `(event: React.KeyboardEvent) => void`
- Keyboard event handler for accessibility.

---

- `onClose`
- `(event: React.MouseEvent) => void`
- Close button click handler. Required when `closable` is `true`.

---

- `selectable`
- `boolean`
- Makes selectable (interactive).
  Enables hover and focus styles for better user interaction.
  Defaults to `false`.

---

- `tabIndex`
- `number`
- Tab order for keyboard navigation.

---

- `className`
- `string`
- Additional CSS classes to apply to the tag.

---

- `style`
- `React.CSSProperties`
- Inline styles to apply to the tag.

{% /table %}

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects
