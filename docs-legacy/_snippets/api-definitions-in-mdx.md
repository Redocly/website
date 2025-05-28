When you have declared your API definitions, you can use their `definitionId` with React components to display API reference docs in MDX pages. Pointers allow you to target and display specific parts of the API documentation.

The following components work with API reference docs:

They are supported by default in the portal. You can also develop your own components.

To display API reference docs in an `.md` file:

1. Import the React component, such as `OpenApiResponse`:

```jsx
import { OpenApiResponse } from '@redocly/developer-portal/ui';
```

2. Use it as follows:

**With code samples panel**

```html
<OpenApiResponse definitionId="acme" pointer="#/components/responses/CoyoteResponse" />
```

**Without code samples panel**

```html
<OpenApiResponse definitionId="acme" pointer="#/components/responses/CoyoteResponse" hideSamples={true} />
```
