---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
description: Select a geographical location to host your project.
---
# `residency`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
Choose where your application resides when you set it up, then use this configuration setting for local tools to know where to connect to.

This option is needed if your projects have residency outside our main US-based location.
For example, if you choose another geographical location such as Europe or self-host.

{% admonition type="warning" name="Legacy products" %}
Older Redocly products such as Workflows used the setting `region` with the value `eu` or `us`.
For new products, the `residency` configuration setting is used.
{% /admonition %}


## Options

{% table %}

- Option
- Type
- Description

---

- residency
- string
- URL to the platform where your application resides, e.g. `https://app.cloud.eu.redocly.com` for EU-region deployments.
  The default value is the main hosting platform at `https://app.cloud.redocly.com`.

{% /table %}

## Examples

### Use the access object (recommended)

The recommended way to configure `residency` is within the `access` object:

```yaml {% title="redocly.yaml" %}
access:
  residency: https://app.cloud.eu.redocly.com
```

### Root-level configuration (deprecated)

{% admonition type="warning" %}
**Deprecated:** Root-level `residency` is still supported for backward compatibility but will show deprecation warnings when used alongside the `access` object. Please migrate to the `access` object format.
{% /admonition %}

```yaml {% title="redocly.yaml" %}
residency: https://app.cloud.eu.redocly.com
```

## Resources

- **[Access configuration](./access.md)** - Group authentication and access settings together using the `access` object
- **[Remote content](../reunite/project/remote-content/index.md)** - Use remote content in your projects for flexible data residency and content management strategies
- **[Develop locally](../get-started/start-local-dev.md)** - Set up local development environments while maintaining cloud deployment capabilities for data residency compliance
