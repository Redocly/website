# Dynamic imports

Utility functions for lazy loading React components.

## Dynamic imports

The `dynamic` utility from `@redocly/theme` creates React components that load their dependencies on demand.
It supports both server-side rendering and client-only rendering modes, with customizable loading states.

## Overview

The `dynamic` function wraps React.lazy() with additional features for Redocly applications, automatically handling various export patterns and providing flexible SSR configuration options.
It creates wrapper components that handle dynamic imports with configurable loading states.

## Syntax and usage

To use the `dynamic` utility, pass a factory function that returns a promise resolving to a React component:

```tsx
import { dynamic } from '@redocly/theme';

const DynamicComponent = dynamic(() => import('../components/MyComponent'), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return <DynamicComponent />;
}
```

## API reference

### `dynamic(factory, options?)`

Creates a dynamically loaded React component.

{% table %}
- Parameter
- Type
- Description
---
- factory
- `() => Promise<T | Record<string, unknown>>`
- **REQUIRED.** A function that returns a promise resolving to a React component or module containing a component.
---
- options
- `DynamicOptions`
- Optional configuration for the dynamic component.
{% /table %}

### `DynamicOptions`

{% table %}
- Option
- Type
- Description
---
- ssr
- `boolean`
- Enable server-side rendering. Default: `false`
---
- loading
- `React.ComponentType<Record<string, unknown>>`
- Custom loading component to display while the dynamic component loads. Default: `null`
{% /table %}

## Examples

### Basic dynamic import

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

To dynamically import a named export, return it from the Promise returned by import():

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

### With no SSR

To dynamically load a component on the client side, use the `ssr` option to disable server-rendering.
This is useful for components that rely on browser APIs like `window`.

```tsx
import { dynamic } from '@redocly/theme';

const ClientOnlyComponent = dynamic(() => import('../components/ClientComponent'), {
  ssr: false,
});
```

### With external libraries

This example shows how to dynamically load components that depend on external libraries:

```tsx
import { dynamic } from '@redocly/theme';

const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Charts often need browser APIs
});

const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => <div>Loading map...</div>,
  ssr: false, // Maps need browser APIs
});

function App() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ChartComponent />
      <MapComponent />
    </div>
  );
}
```

The components `ChartComponent` and `MapComponent` can internally use external libraries like Chart.js or Leaflet, which are loaded only when the components are rendered.

## Import patterns

The dynamic utility automatically handles various import patterns:

```tsx
// Default exports
const Component1 = dynamic(() => import('./Component1'));
const Component2 = dynamic(() => import('./Component2').then(mod => mod.default));

// Named exports
const NamedComponent = dynamic(() => import('./NamedComponent').then(mod => mod.NamedExport));

// Package imports
const PackageComponent = dynamic(() => import('some-package').then(mod => mod.default));
```

## Advanced examples

### Heavy component loading

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
