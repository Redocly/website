---
seo:
  title: Use the Redoc CE React component
redirects:
  '/docs/redoc/quickstart/react/':
    to: '/docs/redoc/deployment/react/'
---

# Use Redoc CE React component

## Before you begin

Install the following dependencies required by Redoc CE if you do not already have them installed:

- `react`
- `react-dom`
- `mobx`
- `styled-components`
- `core-js`

If you have npm installed, you can install these dependencies using the following command:

```bash
npm i react react-dom mobx styled-components core-js
```

## Build API documentation

1. Import the `RedocStandalone` component.

```js
import { RedocStandalone } from 'redoc';
```

1. Use the component, either:
    - link to your OpenAPI definition with a URL, using the following format:

    ```js
    <RedocStandalone specUrl="url/to/your/spec"/>
    ```

    - pass your OpenAPI definition as an object, using the following format:

    ```js
    <RedocStandalone spec={/* spec as an object */}/>
    ```

1. (Optional) You can pass options to the `RedocStandalone` component to alter how it renders.

    For example:

    ```js
    <RedocStandalone
      specUrl="http://petstore.swagger.io/v2/swagger.json"
      options={{
        nativeScrollbars: true,
        theme: { colors: { primary: { main: '#dd5522' } } },
      }}
    />
    ```

For more information on configuration options, refer to the [Configuration options for Reference docs](https://redocly.com/docs/api-reference-docs/configuration/functionality/) section of the documentation.

## Optional - Specify `onLoaded` callback

You can also specify the `onLoaded` callback, which is called each time Redoc CE is fully rendered or when an error occurs (with an error as the first argument).

```js
<RedocStandalone
  specUrl="http://petstore.swagger.io/v2/swagger.json"
  onLoaded={(error) => {
    if (!error) {
      console.log('Yay!');
    }
  }}
/>
```

## Resources

- **[Redoc CE deployment guide](./intro.md)** - Follow step-by-step instructions for setting up your Redoc CE project
