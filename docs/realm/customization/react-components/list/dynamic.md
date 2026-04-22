---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Dynamic imports

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `dynamic` utility from `@redocly/theme` load React components on demand.
This utility supports both server-side rendering (SSR) and client-only rendering modes, with customizable loading states.

## Lazy loading with the `dynamic` function

The `dynamic` function uses `React.lazy()` and `React.Suspense` with additional features for Redocly applications, automatically handling various export patterns and providing flexible SSR configuration options.

Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed.
It shortens the critical rendering path, which translates into reduced page load times.
For more information about lazy loading strategies, see the guide to [Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading).

## Properties

{% table %}

- Prop {% width="30%" %}
- Type
- Description

---

- `factory`
- `() => Promise<T | Record<string, unknown>>`
- **REQUIRED.** A function that returns a promise resolving to a React component or module containing a component.

---

- `ssr`
- `boolean`
- Enable server-side rendering.
  Default: `true`

---

- `loading`
- `React.ComponentType<Record<string, unknown>>`
- Custom loading component to display while the dynamic component loads.
  Default: `null`

{% /table %}

## Examples

The following are the examples of how you can use the `dynamic` React component in your project.

### Add `dynamic` function to a page

```tsx
import { dynamic } from '@redocly/theme';

const MyComponent = dynamic(() => import('./MyComponent'));

function App() {
  return <MyComponent />;
}
```

### Load components

```tsx
import { dynamic } from '@redocly/theme';

const DynamicComponent = dynamic(() => import('../components/MyComponent'), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DynamicComponent />;
}
```

### Load heavy components

```tsx
import { dynamic } from '@redocly/theme';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading component...</div>,
  ssr: false,
});

function App() {
  return (
    <div>
      <h1>Application</h1>
      <HeavyComponent />
    </div>
  );
}
```

### Load named exports

```tsx
// components/MyComponent.js
export function MyComponent() {
  return <p>Hello!</p>;
}

// pages/index.js
import { dynamic } from '@redocly/theme';

const DynamicComponent = dynamic(() =>
  import('../components/MyComponent').then((mod) => mod.MyComponent)
);
```

### Load components without server-side rendering

To dynamically load a component on the client side, use the `ssr` option to disable server-rendering.
This is useful for components that rely on browser APIs like `window`.

```tsx
import { dynamic } from '@redocly/theme';

const ClientOnlyComponent = dynamic(() => import('../components/ClientComponent'), {
  ssr: false,
});
```

### Import packages

```tsx
import { dynamic } from '@redocly/theme';

const PackageComponent = dynamic(() => import('some-package').then(mod => mod.default));
```

## Resources

- **[List of customizable components](./index.md)** - Browse all available built-in React components that you can customize and extend in your projects
