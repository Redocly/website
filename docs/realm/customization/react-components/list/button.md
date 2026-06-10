---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Button

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the `button` component to influence its variant, size, and states.


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

## Styling and contrast

Due to a known inheritance issue, the `contrastText` property defined in your theme configuration may not be automatically applied to the button text color.

### Workaround

To ensure the `contrastText` color is applied, add `!important` to the color value in your theme configuration:

```yaml
theme:
  colors:
    primary:
      main: '#ff0000'
      contrastText: '#ffffff!important'
```

Alternatively, you can use custom CSS to target specific buttons using their attributes. For example, to target a button with a `data-cy="try-it"` attribute:

```css
button[data-cy="try-it"] {
  color: white;
}
```

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects
