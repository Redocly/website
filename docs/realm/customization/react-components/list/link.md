---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Link

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Customize the `link` component to influence the styling and behavior of links in your project.

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
- Specifies where to open the linked document.
  Defaults to `_self`.

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

- `download`
- `boolean`
- If `true`, the browser will treat the destination as a download.

---

- `reloadDocument`
- `boolean`
- If `true`, the browser will use document navigation instead of client-side routing.

---

- `preventScrollReset`
- `boolean`
- If `true`, prevents the window from scrolling to the top when the link is clicked.

---

- `relative`
- enum (`route` | `path`)
- Defines whether the path is relative to the route hierarchy or the path.

---

- `viewTransition`
- `boolean`
- If `true`, enables a View Transition for this navigation.

---

- `state`
- `any`
- Persistent state data to be stored in history state.

---

- `replace`
- `boolean`
- If `true`, replaces the current entry in the history stack instead of adding a new one.

---

- `[key: string]`
- `unknown`
- Allows passing additional arbitrary props.

{% /table %}

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects
