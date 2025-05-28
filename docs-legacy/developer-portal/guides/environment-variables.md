---
seo:
  title: How to use environment variables in your developer portal
excludeFromSearch: true

---

# Environment variables

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Define environment variables to customize behavior or content in your developer portal projects.
You create environment variables in two ways:

- Use the shell (in your local environment, CI, or in our hosted [Workflows settings](../settings/environment-variables.md))
- Use [`.env.*` files](./environment-files.md)

{% admonition type="info" name="Precedence" %}
The `.env.*` files take precedence over shell-defined environment variables.
{% /admonition %}

See this environment compatibility table.
Workflows sets the shell environment variables in the hosted build environment.

| Environment                   | Shell (local or CI) | Workflows | .env files |
| ----------------------------- | :-----------------: | :-------: | :--------: |
| Development                   |         ✅          |    ❌     |     ✅     |
| Production (Workflows hosted) |         ❌          |    ✅     |     ✅     |
| Previews (Workflows hosted)   |         ❌          |    ✅     |     ✅     |
| On-premise                    |         ✅          |    ❌     |     ✅     |

You can use built-in environment variables to control portal behavior:

1. Define the [built-in environment variable](./environment-variables-built-in.md) and corresponding value in your shell or in [Workflows settings](../settings/environment-variables.md).

Or, use custom environment variables in portals by following these steps:

1. Define the variable.
2. Allow the variable to be used (required for shell and Workflows variables).
3. Verify pre-requisites.
4. Insert the variable name as a placeholder where you want it to apply during the build.
5. Build the portal.

## Step 1: Define the variable

{% admonition type="info" name="Important" %}
The `.env.*` files take precedence over shell or Workflows variables.

For example, if `MY_ENV_VAR` has value `yes` in the shell execution environment, but a value of `no` in the `.env.production` file, the value of `MY_ENV_VAR` would be `no` (in the production environment).
{% /admonition %}

1. Create one or more [environment files](./environment-files.md).
1. Set [variables in Workflows settings](../settings/environment-variables.md) (or in your shell for local or on-premise builds).

## Step 2: Allow the variable client-side

Shell and Workflows environment variables are not available client-side unless explicitly allowed by listing them in the [envVariablesAllowedClientSide](../configuration/siteconfig/env-variables.md) section of the `siteConfig.yaml` file.
The `.env.*` file variables are automatically allowed and do not need to be listed in the `siteConfig.yaml` file.

Use cases include using the variable inside:

- Markdown files
- MDX files
- YAML files
- TypeScript/JavaScript files
{% tabs %}
{% tab label="Allowed in environment file" %}
```shell
MY_VARIABLE=Hello
CUSTOM_PATH=/docs/helpdesk
```
{% /tab  %}
{% tab label="Allowed in siteConfig file" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
envVariablesAllowedClientSide:
  - MY_VARIABLE
  - CUSTOM_PATH
```
{% /tab  %}
{% /tabs  %}

{% admonition type="warning" name="Important" %}
Secrets should never be allowed client-side (or stored in files in source control).
{% /admonition %}

## Step 3: Check prerequisites

Before using the environment variable in your portal files, follow the prerequisites checklist to prevent issues:

- [ ] Created files for every environment (eg `.env.development` and `.env.production`).
- [ ] No secrets are in the files.
- [ ] Added any shell environment variables for production builds explicitly to Redocly Workflows on the **Portal > Settings > Environment variables** page (or to your on-premise build tool).
- [ ] Defined allowed shell or Workflows variables within the `siteConfig.yaml`.
- [ ] Avoided reserved environment variables including `HOME` and Node-related variables.

## Step 4: Use the variable

Environment variables can be used in the following file types:

- Markdown and MDX
- YAML, including portal configuration files
- JavaScript and TypeScript, including the `theme.ts` file

### Usage in Markdown and YAML files

In Markdown and YAML files, insert an environment variable with notation like this `{{process.env.MY_ENV_VAR}}`.
It must have double curly braces and be prefixed with `process.env.`.
{% tabs %}
{% tab label="Markdown example" %}
```md
This is a Markdown file.

Here is an example. My name is `{{process.env.MY_ENV_NAME}}`.
```
{% /tab  %}
{% tab label="siteConfig example" %}
```yaml
meta:
  title: { { process.env.MY_TITLE } }
  description: My example developer portal
logo: ./images/logo.png
```
{% /tab  %}
{% /tabs  %}

### Usage in JavaScript, TypeScript and MDX files

MDX files are special because they can contain both JSX and Markdown inside a single file.

In JSX sections of the file, use curly braces. This is a special syntax that instructs the JSX parser to interpret the contents between braces as JavaScript instead of a string (see `{process.env.WELCOME_MESSAGE}` in the example).

In Markdown sections of the file, the syntax requires double curly braces (see `{{process.env.WELCOME_MESSAGE}}` in the example).

In both cases, the environment variable name must be prefixed with `process.env.`.

```jsx
<Jumbotron>
  <NavBar location={props.location} standalone={false} />
  <H1>Heading In Here Big Text {process.env.WELCOME_MESSAGE}</H1>
  <H2>Description in here with some more text</H2>
  <Flex p={20} justifyContent="center">
    <Button inversed large to="/test.txt">
      Get Redocly
    </Button>
    <Button inversed transparent large to="/markdown">
      Get Started
    </Button>
  </Flex>
</Jumbotron>

<!-- plain markdown section -->
# Regular Markdown content example {{process.env.WELCOME_MESSAGE}}

More Markdown text.
<!-- end plain markdown section -->

<Box>
  More JSX content
</Box>
```

In JavaScript and TypeScript files, the syntax doesn't require braces, but the variable name must be prefixed with `process.env.`

The following example shows how to insert an environment variable in the `theme.ts` file:

```ts
export const theme = {
  // ...
  colors: {
    primary: {
      main: process.env.REDOCLY_MAIN_COLOR,
      // ...
    },
  },
  // ...
};
```

## Step 5: Build the portal

After you have defined your environment variables and modified all files where you want to apply them, make sure your changes are pushed to Workflows.
The app applies your environment variables during the next build.

For on-premise portals, you must run the build manually.

For local development, restart your development server.
