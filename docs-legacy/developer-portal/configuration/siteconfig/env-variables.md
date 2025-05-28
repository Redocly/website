---
excludeFromSearch: true
---

# `envVariablesAllowedClientSide`

## Usage

This option defines a list of shell environment variables that are allowed to be embedded into the client-side code.

Environment variables can be defined in either:
- Shell (your local shell, your CI shell, or our hosted Workflows build shell)
- [`.env` files](../../guides/environment-files.md)

{% admonition type="info" %}
All `.env.*` file environment variables are automatically allowed on the client-side code. This configuration option is not applicable to those.
{% /admonition %}

Add it to the top level of the `siteConfig.yaml` file.

Read more about [using environment variables](../../guides/environment-variables.md) in the developer portal.

## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
envVariablesAllowedClientSide:
  - MY_VARIABLE
  - CUSTOM_PATH
```
