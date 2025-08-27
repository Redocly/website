# Dynamic imports

The `dynamic` utility from `@redocly/theme` allows to load React components on demand. It supports both server-side rendering and client-only rendering modes, with customizable loading states.

## Overview

The `dynamic` function uses `React.lazy()` and `React.Suspense` with additional features for Redocly applications, automatically handling various export patterns and providing flexible SSR configuration options.

Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed. It shortens the critical rendering path, which translates into reduced page load times. For more information about lazy loading strategies, see the [Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading).

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
- Enable server-side rendering. Default: `true`

---

- `loading`
- `React.ComponentType<Record<string, unknown>>`
- Custom loading component to display while the dynamic component loads. Default: `null`

{% /table %}

## Examples

### Basic usage

```tsx
import { dynamic } from '@redocly/theme';

const MyComponent = dynamic(() => import('./MyComponent'));

function App() {
  return <MyComponent />;
}
```

### With loading component

```tsx
import { dynamic } from '@redocly/theme';

const DynamicComponent = dynamic(() => import('../components/MyComponent'), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DynamicComponent />;
}
```

### With named exports

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

### Package imports

```tsx
import { dynamic } from '@redocly/theme';

const PackageComponent = dynamic(() => import('some-package').then(mod => mod.default));
```
