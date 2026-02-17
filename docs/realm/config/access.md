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
description: Configure authentication and access-related settings in a single object.
---
# `access`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
The `access` object groups authentication and access-related configuration options together for better organization and maintainability.

{% admonition type="info" %}
**New format:** The `access` object is the recommended way to configure authentication and access settings.
Root-level properties (`requiresLogin`, `residency`, `sso`, `rbac`) are still supported for backward compatibility but will show deprecation warnings when used alongside the `access` object.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- access
- object
- Container object for access-related configuration properties.

  **Properties:**
  - `requiresLogin` (boolean) - Makes all content private for non-authenticated users.
    Available on **Pro, Enterprise, Enterprise+**.
    See [RequiresLogin configuration](./requires-login.md).
  - `logoutReturnUrl` (string) - URL where users are redirected after logout (new feature).
    Available on **Pro, Enterprise, Enterprise+**.
  - `residency` (string) - Geographical location URL for hosting your project.
    Available on **Enterprise+**.
    See [Residency configuration](./residency.md).
  - `sso` (string | [string]) - List of identity provider types from Reunite.
    Available on **Enterprise, Enterprise+**.
    See [SSO configuration](./sso.md).
  - `rbac` (object) - Role-based access control configuration.
    Available on **Enterprise, Enterprise+**.
    See [RBAC configuration](./rbac.md).

{% /table %}

## Examples

### Basic access configuration

The following example configures authentication requirements and logout redirect:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
  logoutReturnUrl: https://example.com
  sso:
    - CORPORATE
    - REDOCLY
```

### Configure logout redirect

The following example shows how to redirect users to your main website after logout:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
  logoutReturnUrl: https://yourcompany.com
```

### Configure residency

The following example sets EU residency:

```yaml {% title="redocly.yaml" %}
access:
  residency: https://app.cloud.eu.redocly.com
  requiresLogin: true
```

### Configure RBAC

The following example shows how to configure role-based access control within the access object:

```yaml {% title="redocly.yaml" %}
access:
  rbac:
    content:
      '**':
        authenticated: read
```

### Complete access configuration

The following example shows all access-related options:

```yaml {% title="redocly.yaml" %}
access:
  requiresLogin: true
  logoutReturnUrl: https://yourcompany.com
  residency: https://app.cloud.eu.redocly.com
  sso:
    - CORPORATE
    - GUEST
  rbac:
    content:
      '**':
        authenticated: read
```

## Migration from root-level properties

If you're currently using root-level properties, you can migrate to the `access` object format:

**Old format (deprecated):**
```yaml
requiresLogin: true
residency: https://app.cloud.eu.redocly.com
sso:
  - CORPORATE
rbac:
  content:
    '**':
      authenticated: read
```

**New format (recommended):**
```yaml
access:
  requiresLogin: true
  residency: https://app.cloud.eu.redocly.com
  sso:
    - CORPORATE
  rbac:
    content:
      '**':
        authenticated: read
```

{% admonition type="info" %}
**Note:** `logoutReturnUrl` is a new feature and is only available in the `access` object format.
It was not previously available as a root-level property.
{% /admonition %}

{% admonition type="warning" %}
**Important:** Do not define the same property both at root level and in the `access` object.
If both are defined, the configuration will throw an error.
Use only the `access` object format for new configurations.
{% /admonition %}

## Resources

- **[RequiresLogin configuration](./requires-login.md)** - Detailed information about requiring login for your project
- **[SSO configuration](./sso.md)** - Complete guide for configuring single sign-on
- **[Residency configuration](./residency.md)** - Information about geographical hosting locations
- **[RBAC configuration](./rbac.md)** - Alternative access control using role-based permissions

