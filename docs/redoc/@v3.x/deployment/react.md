---
seo:
  title: Use the Redoc React component
redirects:
  '/docs/redoc/quickstart/react/':
    to: '/docs/redoc/deployment/react/'
---

# Use Redoc React component

## Before you begin

Install the following dependencies required by Redoc:

- `redoc`
- `react`
- `react-dom`
- `styled-components`

If you have npm installed, you can install these dependencies using the following command:

```bash
npm i redoc@next react react-dom styled-components
```

## Build API documentation

1. Import the `RedocStandalone` component.

    ```js
    import { RedocStandalone } from 'redoc';
    ```

1. Use the component, either:
    - link to your OpenAPI definition with a URL, using the following format:

    ```js
    <RedocStandalone definitionUrl="url/to/your/spec"/>
    ```
    - pass your OpenAPI definition as an object, using the following format:

    ```js
    <RedocStandalone spec={/* spec as an object */}/>
    ```

1. (Optional) You can pass options to the `RedocStandalone` component to alter how it renders.

    For example:

    ```js
    <RedocStandalone
      definitionUrl="https://redocly.github.io/redoc/museum.yaml"
      options={{
        hideLoading: true,
        sanitize: true,
        showExtensions: true,
      }}
    />
    ```

For more information on configuration options, refer to the [Configuration options for openapi](https://redocly.com/docs/realm/config/openapi) section of the documentation.

## Resources

- **[Redoc deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc project
