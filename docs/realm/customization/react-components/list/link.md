# Link

## Import

```tsx
import { Link } from '@redocly/theme/components/Link/Link';
```

## Properties

{% table %}

- Prop
- Type {% width="30%" %}
- Description

---

- `to`
- `string`
- **REQUIRED** URL or path to navigate to.

---

- `target`
- enum (`_self` | `_blank`)
- Specifies where to open the linked document. Defaults to `_self`.

---

- `external`
- `boolean`
- If `true`, indicates that the link points to an external resource.

---

- `className`
- `string`
- Custom CSS class name(s) for styling.

---

- `style`
- `React.CSSProperties`
- Inline styles applied to the link.

---

- `innerRef`
- `React.Ref<HTMLAnchorElement>`
- Ref forwarded to the `<a>` element, useful for accessing DOM directly.

---

- `languageInsensitive`
- `boolean`
- If `true`, disables automatic language prefixing for localized routes.

---

- `onClick`
- `() => void`
- Function to call when the link is clicked.

---

- `[key: string]`
- `unknown`
- Allows passing additional arbitrary props.

{% /table %}

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects