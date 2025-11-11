---
seo:
  title: Use the Redoc React component
redirects:
  '/docs/redoc/quickstart/react/':
    to: '/docs/redoc/deployment/react/'
---

# How to use the Redoc React component

## Before you start

Install the following dependencies required by Redoc:

- `redoc`
- `react`
- `react-dom`
- `styled-components`

If you have npm installed, you can install these dependencies using the following command:

```js
npm i redoc@next react react-dom styled-components
```

## Step 1 - Import the `RedocStandalone` component

```js
import { RedocStandalone } from 'redoc';
```

## Step 2 - Use the component

You can either link to your OpenAPI definition with a URL, using the following format:

```js
<RedocStandalone definitionUrl="url/to/your/spec"/>
```

Or you can pass your OpenAPI definition as an object, using the following format:

```js
<RedocStandalone spec={/* spec as an object */}/>
```

## Optional - Pass options

Options can be passed into the `RedocStandalone` component to alter how it renders.

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
Options that are available for Redoc CE are annotated with: "**Supported in Redoc CE.**".

<!-- TODO: Need to verify and uncomment if it works -->
<!-- ## Optional - Specify `onLoaded` callback

You can also specify the `onLoaded` callback, which is called each time Redoc
is fully rendered or when an error occurs (with an error as the first argument).

```js
<RedocStandalone
  definitionUrl="https://redocly.github.io/redoc/museum.yaml"
  onLoaded={(error) => {
    if (!error) {
      console.log('Yay!');
    }
  }}
/>
``` -->
