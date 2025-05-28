---
excludeFromSearch: true
---

# Environment variable files

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

Environment variables are set from the local shell (or CI shell) or can be provided from a file.

Environment files take precedence over shell environment variables during developer portal builds.

The benefits of using a file is keeping them centrally organized in source control.
The drawback is you should not keep any secrets in the file (or in source control).
Environment variable files are only usable with developer portals (not with the API registry).

Your environment files _must_:

- be in the root of your project repository
- start with `.env.`
- end with the environment's name (eg. `production` or `development`)

Example environment file names:

- `.env.production`
- `.env.development`
- `.env.austin`

Example environment file contents:
{% tabs %}
{% tab label=".env.development" %}
```shell
MY_ENV_VAR=yes
PRIMARY_COLOR=orange
WELCOME_MESSAGE=Welcome
```
{% /tab  %}
{% tab label=".env.production" %}
```shell
MY_ENV_VAR=yes
PRIMARY_COLOR=blue
WELCOME_MESSAGE=Welcome
```
{% /tab  %}
{% /tabs  %}
{% admonition type="danger" name="Warning" %}
Never store credentials or any kind of sensitive data in your environment files.
{% /admonition %}


By default, Redocly will use `.env.development` for your local development server, and `.env.production` in our production build.

To determine which environment file is used, set the environment variable named `REDOCLY_ACTIVE_ENV` to the value of the environment.

The `REDOCLY_ACTIVE_ENV` should be set by shell (for on-premise or local development) or [in Workflows](../settings/environment-variables.md).

Setting environment variables in your shell is operating system-specific (check your corresponding operating system documentation for setting environment variables).

Given this environment variable setting (`REDOCLY_ACTIVE_ENV=production-example`), Redocly would look for the `.env.production-example` in your project root.

{% admonition type="warning" name="Important" %}
Restart your development server if you change your environment variables.
{% /admonition %}

All variables in the file are automatically allowed to be used in the client-side developer portal app.
