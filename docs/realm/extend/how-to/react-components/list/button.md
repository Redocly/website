# Button

## Import

```tsx
import { Button } from '@redocly/theme/components/Button/Button';
```

## Properties

{% table %}

- Prop {% width="30%" %}
- Type
- Description

---

- `children`
- `React.ReactNode`
- Content displayed inside the button.

---

- `disabled`
- `boolean`
- Disables the button if `true`.

---

- `blinking`
- `boolean`
- Adds a blinking effect (useful for drawing attention).

---

- `fullWidth`
- `boolean`
- Makes the button stretch to 100% of its container's width.

---

- `variant`
- enum (`primary` | `secondary` | `outlined` | `text` | `link` | `ghost` | `string`)
- Defines the button's visual style.

---

- `tone`
- enum (`default` | `danger`)
- Indicates the tone, e.g., for warnings or critical actions.

---

- `size`
- enum (`small` | `medium` | `large` | `string`)
- Controls the button size.

---

- `extraClass`
- `string`
- Adds extra custom CSS classes.

---

- `to`
- `string`
- If provided, renders the button as a link to the specified URL.

---

- `icon`
- `JSX.Element`
- Adds an icon to the button.

---

- `iconPosition`
- enum (`left` | `right`)
- Sets the icon position relative to the text.

---

- `title`
- `string`
- Sets the title (tooltip text) of the button.

---

- `tabIndex`
- `number`
- Controls the button's focus order.

---

- `onClick`
- `(e?: React.MouseEvent<HTMLElement>) => void`
- Function to call when the button is clicked.

---

- `type`
- enum (`button` | `submit` | `reset`)
- Specifies the button type (HTML form behavior).

{% /table %}

## Resources

- For a list of all components you can customize, see [List of customizable components](./index.md).