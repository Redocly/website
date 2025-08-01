# Environment variables

You can define environment variables and use them in `redocly.yaml`, and Markdown and React pages in the project.
By default, environment variables are not available in the browser.
To access environment variables in React or Markdown pages, you have to prefix them with `PUBLIC_`.

Define environment variables using one of the following two ways:

- Use the shell (in other words, in your local environment, CI)
- Create `.env` file in the root of the project

Example `.env` file can look like this:

```text
PUBLIC_CUSTOM_VARIABLE=Hello
PUBLIC_IS_PRODUCTION=true
PUBLIC_BUILD_NUMBER=50
```

Using the `REDOCLY_ENV` variable, you can set up different environments and use separate `.env` files like `.env.production`, `.env.development`, and `.env.preview` based on your needs.

When hosting your project at Redocly, we will automatically set the proper `REDOCLY_ENV` variable.

- for production builds, the `REDOCLY_ENV` variable will be set to `"production"`.
- for previews, the `REDOCLY_ENV` variable will be set to `"preview"`.

{% admonition type="warning" %}
Do not use environment variables with sensitive information like passwords or API keys on the pages because all users of the project can see them.
{% /admonition %}

## `redocly.yaml`

To use environment variables in `redocly.yaml`, use the curly brace syntax `{{ process.env.<env_var_name> }}`.

For example:

```yaml {% title="redocly.yaml" %}
logo:
  srcSet: '{{ process.env.LIGHT_LOGO_PATH }} light, {{ process.env.DARK_LOGO_PATH }} dark'
  altText: Redocly logo
  link: '/'
navbar:
  items:
    - page: index.md
      label: '{{ process.env.HOME_LABEL }}'
    - page: config/index.md
      label: Config
```

{% admonition type="warning" %}
Environment variables in `redocly.yaml` only support string values.
{% /admonition %}

## React

To use environment variables in your React code, refer to them using the following syntax: `process.env.<env_var_name>`

The following is an example of using an environment variable in a Typescript file:

```typescript
import * as React from 'react';


export default function () {

  const buildNumber: number = parseInt(process.env.PUBLIC_BUILD_NUMBER || '')

  return (
    <div>
        <h1>My custom variable value is {process.env.PUBLIC_CUSTOM_VARIABLE}</h1>
        <h2>Is this running in production? - {process.env.PUBLIC_IS_PRODUCTION}</h2>
        <h3>Is build number high? - {buildNumber > 40 ? 'Yes' : 'No'}</h3>
    </div>
  );
```

{% admonition type="info" %}
Environment variables always have `String` type. `PUBLIC_IS_PRODUCTION` and `PUBLIC_BUILD_NUMBER` from example above will become `"true"` and `"50"` when used in React components. To get them in desired type, you'll have to do manual conversion.
{% /admonition %}

## Default environment variables

The following environment variables are available by default:

- `PUBLIC_REDOCLY_BRANCH_NAME`: The name of the branch that the project is built from.

## Markdown

In Markdown files, access environment variables using [Markdoc variables syntax](https://markdoc.dev/docs/variables) under `env` namespace:

{% markdoc-example %}

```markdoc {% process=false %}
# My custom variable is {% $env.PUBLIC_CUSTOM_VARIABLE %}
```

{% /markdoc-example %}
