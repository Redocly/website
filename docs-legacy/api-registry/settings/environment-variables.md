---
excludeFromSearch: true
---

# Environment variables

Redocly sets environment variables when running API registry jobs. The API registry runs both the `lint` and `bundle` commands which can use environment variables.

To learn how to set up environment variables for Developer portals, refer to the [portal guide](/docs-legacy/developer-portal/guides/environment-variables.md).

## Built-in environment variables

Two built-in environment variables can control arguments passed to these respective commands for additional runtime control:

| Command  | Environment variable      | Example value                                                 | Exceptions                                               |
| -------- | ------------------------- | ------------------------------------------------------------- | -------------------------------------------------------- |
| `lint`   | `REDOCLY_CLI_LINT_ARGS`   | --skip-rule=no-sibling-refs                                   | Does not support `--format`, `--config`, `--lint-config` |
| `bundle` | `REDOCLY_CLI_BUNDLE_ARGS` | --skip-decorator=decorators/remove-internal-schema-properties | Does not support `--metafile`                            |

## Custom environment variables

Custom plugins can create, read, and modify environment variables.

Pay attention to the following limitations (and differences from environment variables in the developer portals):

- The API registry doesn't support `.env.*` files for defining environment variables. For API versions in the registry, environment variables can only be defined in Workflows settings.

- You can't use environment variables in the Redocly configuration file or add them directly to your API definitions. For API versions, they are supported only in [custom plugins](/docs/cli/custom-plugins).

- When creating your own environment variables, their names must not start with `REDOCLY_`. That prefix is reserved for special internal variables.

### Step 1: Define the variable in Workflows settings

1. In the Workflows app, select your API version from the API registry page.

2. On the API version page, select **Settings**, then **Environment variables**.

3. On the **Environment variables** page, select **Add variable**.

4. In the dialog that opens, define the **name** and the **value** for your environment variable. If you're adding one of the internal variables, make sure its name is correct.

5. Optionally, select the **Secret** checkbox. This encrypts the value of the variable and hides it from the logs. Use this to protect your credentials, private URLs, and similar sensitive data.

6. Select **Create variable** to finish adding a new variable. For the built-in environment variables, this step completes the configuration.

{% admonition type="info" name="Tip" %}
If necessary, you can modify an existing environment variable in Workflows at any point after creating it. Select the _Edit_ icon next to the variable on the **Environment variables** page. In the dialog that opens, change the environment variable name and/or value, then save your changes.
{% /admonition %}

### Step 2: Use the variable in your custom plugin

- Create a custom rule or decorator as a JS file. Place it in the `rules` or `decorators` directory which you have created in the root of your project.

- In your rule or decorator, use the environment variables (name must match the name defined in Step 1).

Common uses for environment variables would be to influence code flow or to set a value used in the rules or decorators.

It is a good practice to check for the environment variables existing before usage.
{% tabs %}
{% tab label="Ncode flow example" %}
```js
if ('EXAMPLE_VARIABLE' in process.env && process.env.EXAMPLE_VARIABLE == 'blog') {
  // This demonstrates code flow based the value of the EXAMPLE_VARIABLE
}
```
{% /tab  %}
{% tab label="value used example" %}
```js
if ('EXAMPLE_VARIABLE' in process.env) {
  // This demonstrates using the value of the variable
  myValue = process.env.EXAMPLE_VARIABLE;
}
```
{% /tab  %}
{% /tabs  %}
Refer to the custom plugins documentation to [learn more about writing custom plugins](/docs/cli/custom-plugins), and review some examples:

- [Change token URL decorator](/docs/cli/guides/change-token-url)
- [Hide APIs decorator](/docs/cli/guides/hide-apis)
- [Replace server URL decorator](/docs/cli/guides/replace-servers-url)
- [Response contains property rule](/docs/cli/guides/response-contains-property)
