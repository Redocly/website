---
seo:
  title: Use the Redoc CE React component
redirects:
  '/docs/redoc/quickstart/react/':
    to: '/docs/redoc/deployment/react/'
---

# Use Redoc CE React component

## Before you begin

Redoc CE is published as the `redoc` package and renders with the React of your application.
It declares the following peer dependencies:

- `react` and `react-dom` 19.2.7 or later
- `styled-components` 6
- `@redocly/config`, which npm installs on its own

Install the package together with its peer dependencies:

```bash
npm install redoc react react-dom styled-components
```

The package ships as an ES module and requires Node.js 22 or later for your build tooling.

## Build API documentation

1. Import the `RedocStandalone` component.

    ```js
    import { RedocStandalone } from 'redoc';
    ```

1. Use the component, either:
    - link to your description with a URL:

      ```jsx
      <RedocStandalone specUrl="https://redocly.github.io/redoc/cafe.yaml" />
      ```

    - pass your description as an object:

      ```jsx
      <RedocStandalone spec={definitionObject} />
      ```

    - pass a GraphQL schema as an SDL string:

      ```jsx
      <RedocStandalone spec={schemaSdl} />
      ```

    `specUrl` accepts AsyncAPI documents and GraphQL schema files as well, see [Supported specifications](../supported-specifications.md).

1. (Optional) Pass [configuration options](../config.md) in the `options` prop to alter how it renders.

    For example:

    ```jsx
    <RedocStandalone
      specUrl="https://redocly.github.io/redoc/cafe.yaml"
      options={{
        sortRequiredPropsFirst: true,
        schemaDefinitionsTagName: 'Schemas',
        hideDownloadButtons: true,
      }}
    />
    ```

`RedocStandalone` loads and bundles the description, converts Swagger 2.0 documents to OpenAPI 3, and renders the documentation with the sidebar and search.
While the description loads, it displays a spinner, unless you set `hideLoading: true` in `options` or pass your own placeholder as children.
When loading fails, it renders a **Failed to load API definition** message with the underlying error.

## Props

{% table %}

- Prop
- Type
- Description

---

- specUrl
- string
- URL or root-relative path of the OpenAPI, AsyncAPI, or GraphQL description.
  Ignored when `spec` is provided.

---

- spec
- object | string
- Parsed description object, a JSON string of the description, or a GraphQL schema in SDL.

---

- options
- [Options object](../config.md)
- Configuration options.

---

- basePath
- string
- Path the documentation is mounted at, used to build route URLs.
  Default: `/`.

---

- logo
- object
- Sidebar logo as `{ url, href, altText, backgroundColor }`.
  Defaults to the `x-logo` extension in the `info` object of the description.

---

- onLoaded
- function
- Called once the description is rendered, or with an `Error` as the first argument when loading fails.

---

- children
- ReactNode
- Rendered while the description loads, instead of the default spinner.

{% /table %}

## Routing

Redoc CE builds deep links with React Router.
When `RedocStandalone` renders outside a React Router context, it creates a browser router, so routes are path-based: with `basePath="/docs"`, an operation page is `/docs/products/listmenuitems`.
Your server must return the application for every path under `basePath`.

When your application already provides a router, Redoc CE reuses it.
Wrap the component in a `HashRouter` to get hash-based URLs like the standalone HTML element.

## Optional - Specify `onLoaded` callback

You can also specify the `onLoaded` callback.
It is called once when Redoc CE has rendered the description, or with an error as the first argument when loading fails.

```jsx
<RedocStandalone
  specUrl="https://redocly.github.io/redoc/cafe.yaml"
  onLoaded={(error) => {
    if (!error) {
      console.log('Yay!');
    }
  }}
/>
```

## Optional - Show a placeholder while loading

Pass children to render your own content until the description is ready.
Redoc CE replaces the children with the documentation once loading completes.

```jsx
<RedocStandalone specUrl="https://redocly.github.io/redoc/cafe.yaml">
  <p>Loading the API description…</p>
</RedocStandalone>
```

## Optional - Disable telemetry

Redoc CE sends anonymous [usage telemetry](../telemetry.md) by default.
To turn it off, set `disableTelemetry` in the `options` prop, like any other option:

```jsx
<RedocStandalone
  specUrl="https://redocly.github.io/redoc/cafe.yaml"
  options={{ disableTelemetry: true }}
/>
```

## Advanced - Low-level API

The package also exports the building blocks behind `RedocStandalone`.
Use them when your application needs to prepare the documentation model itself, for example to render it on a server:

- `prepareApiDocs({ specUrl, spec, options, basePath })` loads and bundles the description and resolves to `{ items, store, options, specType, document }`.
- `Redoc` renders a prepared model: `<Redoc items={items} store={store} options={options} basePath={basePath} markdownAdapter={adapter} />`.
  It renders the content without the sidebar and search, and needs a `markdownAdapter` to turn description ASTs into React nodes.
  The package does not export a Markdown adapter, so descriptions render only through an adapter you provide.
- `convertSwagger2OpenAPI(document)` converts a Swagger 2.0 document to OpenAPI 3.
- `ServerStyleSheet` is re-exported from `styled-components`.
  Server rendering collects styles from the same instance the components use.

```jsx
import { useEffect, useState } from 'react';
import { Redoc, prepareApiDocs } from 'redoc';

function PreparedDocs() {
  const [prepared, setPrepared] = useState(null);

  useEffect(() => {
    prepareApiDocs({ specUrl: '/openapi.yaml', basePath: '/docs' }).then(setPrepared);
  }, []);

  if (!prepared) return <p>Preparing…</p>;

  return (
    <Redoc
      items={prepared.items}
      store={prepared.store}
      options={prepared.options}
      basePath="/docs"
      markdownAdapter={myMarkdownAdapter}
    />
  );
}
```

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Step-by-step instructions for setting up your Redoc CE project
- **[Configure Redoc CE](../config.md)** - Every option you can pass in the `options` prop
- **[Telemetry in Redoc CE](../telemetry.md)** - What Redoc CE collects and how to turn it off
