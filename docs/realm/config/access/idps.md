---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
description: Restrict project login to specific identity providers (IdPs) selected by unique ID.
---
# `idps`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Restrict project login to specific identity providers (IdPs) selected by unique ID.
Configure which individual identity providers (IdPs) — by their unique ID — are available at project login.
`idps` selects identity providers by the unique ID and is mutually exclusive with [`sso`](./sso.md).
When `idps` is configured, you can only use the listed identity providers to log in to the project.
To also offer the standard Redocly login (email/password and Social Login providers), add `redocly` to the list.

Use `idps` when:

- You have multiple identity providers in the same category (for example, two `GUEST` IdPs) and you want a project to surface only one of them.
- You want to expose a specific IdP without enabling the entire category.

Each identity provider's unique ID is displayed next to its name on the Reunite organization **Settings** > **SSO and login** page and can be edited there.

## Options

{% table %}

- Option
- Type
- Description

---

- idps
- string | [string]
- List of identity provider unique IDs from Reunite.
  Each entry must be in kebab-case (lowercase letters, numbers, hyphens).
  The `redocly` special value enables the standard Redocly login (email/password and Social Login providers).
  Values: `corporate` and `guest` are reserved and cause validation errors.
  Identity providers not listed in `idps` are hidden at project login and cannot be used to authenticate.

{% /table %}

## Examples

### Target a single IdP by unique ID

```yaml {% title="redocly.yaml" %}
access:
  idps:
    - acme-corp-saml
```

Only the IdP with unique ID `acme-corp-saml` is offered.
Other IdPs (including ones in `CORPORATE` or `GUEST` categories) are hidden, and the standard Redocly login is not available.

### Combine a specific IdP with Redocly login

```yaml {% title="redocly.yaml" %}
access:
  idps:
    - acme-corp-saml
    - redocly
```

The IdP with unique ID `acme-corp-saml` is offered together with the standard Redocly login (email/password and Social Login providers).

## Resources

- **[SSO configuration](./sso.md)** - Filter identity providers by category (`REDOCLY`, `CORPORATE`, `GUEST`)
- **[Access configuration](./index.md)** - Group authentication and access settings together
- **[Add an identity provider](../../reunite/organization/sso/add-idp.md)** - Add, configure, and assign unique IDs to identity providers
