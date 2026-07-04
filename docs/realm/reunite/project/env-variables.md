---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Environment variables

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

You can define environment variables and use them in `redocly.yaml`, and Markdown and React pages in the project.
Environment variables are used during both build and run time for the project.
By default, environment variables are not available in the browser.
To access environment variables in React or Markdown pages, you have to prefix them with `PUBLIC_`.

## Define environment variables

Define environment variables using one of the following ways:

- Create `.env` file in the root of the project
- Use the shell (in other words, in your local environment, CI)
- Add them individually on the **Settings** page for the project

### .env files

Example `.env` file can look like this:

```text
PUBLIC_CUSTOM_VARIABLE=Hello
PUBLIC_IS_PRODUCTION=true
PUBLIC_BUILD_NUMBER=50
```

Using the `REDOCLY_ENV` variable, you can set up different environments and use separate `.env` files like `.env.production`, `.env.development`, and `.env.preview` based on your needs.

You can also create branch-specific `.env` files using the format `.env.branch.<branch-name>`.
For example, `.env.branch.feature-new-look` would be loaded when working on the `feature-new-look` branch.
For branches containing `/` (e.g., `feature/my-branch`), replace `/` with `-` in the filename (e.g., `.env.branch.feature-my-branch`).
In local development, the branch name is automatically detected from git.
On Redocly, it uses the `PUBLIC_REDOCLY_BRANCH_NAME` environment variable.

The loading order is: `.env` -> `.env.branch.<branch-name>` -> `.env.<environment>`.
Environment-specific files (like `.env.development`) take precedence over branch-specific files.

When hosting your project at Redocly, we will automatically set the proper `REDOCLY_ENV` variable:

- For production builds, the `REDOCLY_ENV` variable will be set to `"production"`
- For previews, the `REDOCLY_ENV` variable will be set to `"preview"`

{% admonition type="warning" %}
When the same variable is defined both in Reunite (in the project **Settings** > **Environment variables** section) and in your base `.env` file, the value from Reunite is used.
Environment-specific `.env` files (such as `.env.production`, `.env.preview`, `.env.development`) and branch-specific `.env.branch.<branch-name>` files still take precedence over both.
{% /admonition %}

### Settings page

You can also add environment variables individually through the Redocly interface:

1. In your project's workspace, select **Settings** > **Environment variables**.
1. Select **Add environment variable**.
1. Enter the Environment variable name and value.
1. If the variable is a secret, select the secret checkbox to store it in an encrypted format and exclude it from the logs.

## Usage

{% admonition type="warning" %}
Do not use environment variables with sensitive information like passwords or API keys on the pages because all users of the project can see them.
{% /admonition %}

### API functions

To use environment variables in [API functions](../../customization/api-functions/api-functions-reference.md):

- In Reunite, add variables to your project's **Settings** > **Environment variables**  before using `process.env.VAR_NAME` in API function code.
- If you're working locally, you can reference variables from your project's `.env` files in API functions.

### `redocly.yaml`

{% admonition type="warning" %}
Environment variables in `redocly.yaml` only support string values.
{% /admonition %}

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

You can also provide a default value that is used when the environment variable is not set.
Add the default after a `|` or `||` separator and wrap it in single or double quotes.

For example:

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: '{{ process.env.HOME_LABEL || "Home" }}'
    - page: config/index.md
      label: "{{ process.env.CONFIG_LABEL | 'Config' }}"
```

{% admonition type="warning" %}
The default value is applied only when the environment variable is not set.
If the variable is set to an empty string, the empty string is used.
When a default value is applied, the variable is not reported as unset.
Avoid using default values for any security-related variables that are required in production.
{% /admonition %}

### React

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
Environment variables always have `String` type.
`PUBLIC_IS_PRODUCTION` and `PUBLIC_BUILD_NUMBER` from example above will become `"true"` and `"50"` when used in React components.
To get them in desired type, you'll have to do manual conversion.
{% /admonition %}

### Markdown

In Markdown files, access environment variables using [Markdoc variables syntax](https://markdoc.dev/docs/variables) under `env` namespace:

{% markdoc-example %}

```markdoc {% process=false %}
# My custom variable is {% $env.PUBLIC_CUSTOM_VARIABLE %}
```

{% /markdoc-example %}

#### Environment variables in links

You can use environment variables to create dynamic links in your Markdown files.
Use the Markdoc variable syntax within the standard Markdown link brackets.

{% markdoc-example %}

```markdoc {% process=false %}
Check out the [latest version](/docs/v{% $env.PUBLIC_VERSION %}/).
```

{% /markdoc-example %}

{% admonition type="info" name="Evaluation order in links" %}
Environment variables are substituted before the Markdown link is rendered.
If you encounter issues where the link does not render as expected, ensure that the variable contains the intended string and that the resulting URL is valid.

For more control over attribute evaluation, you can use Markdoc tag syntax with variables as attributes if supported by the tag:
```markdoc {% process=false %}
[Go to Documentation]({% $env.PUBLIC_DOCS_URL %})
```
{% /admonition %}

## Default environment variables

The following environment variables are available by default:

- `PUBLIC_REDOCLY_BRANCH_NAME`: The name of the branch that the project is built from
  Useful for configuring [branch-specific settings](../../config/env.md) in `redocly.yaml`.

## Manage environment variables

You can manage environment variables through the **Settings** page in your project.

### Change an environment variable

1. Once logged in to Redocly, select the project.
1. Select **Settings** > **Environment variables**.
1. Hover over the environment variable you want to update.
1. Select the edit icon next to the variable you want to change.
1. In the **Edit environment variable** dialog that opens, make changes to your variable value select to make the variable secret.
1. Select **Save**.

### Remove an environment variable

1. Once logged in to Redocly, select the project.
1. Select **Settings** > **Environment variables**.
1. Select the delete icon next to the variable you want to remove.
   The variable is removed from the list immediately.

## Restrictions

When defining custom names, avoid commonly reserved environment variables, such as `HOME` and `PATH`, and those related to the Node environment such as `NODE_ENV`.

The `PUBLIC_` prefix is shared with the client side, and should not be used for any secrets.

The `REDOCLY_` prefix is reserved for future use by Redocly.

## Resources

- **[Markdoc variables syntax](https://markdoc.dev/docs/variables)** - Learn the syntax for using environment variables within Markdown content and templates
- **[Manage projects](./manage-projects.md)** - Explore other project configuration options and settings available in Reunite