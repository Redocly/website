---
excludeFromSearch: true
---

# `auth`


{% admonition type="warning" name="Attention" %}
Applies only to on-premise portal deployments.
{% /admonition %}


## Usage

The `auth` section is primarily used with the [RBAC feature](../rbac.md) to define identity providers and their configuration.

Add it to the top level of the `siteConfig.yaml` file and configure supported options inside it.


{% admonition type="info" name="Related options" %}
The `requestLogin` option is related to portal login and authentication. When using a custom login component in the portal, setting this to `true` redirects all pages to the portal login page if the user is not already logged in.

- To modify all pages in the portal, add it to the top level of the `siteConfig.yaml` file.
- To override the site-wide configuration, add it to the front matter of specific MD(X) and `.page.yaml` pages.
{% /admonition %}


## Options

| Option  | Description |
| ------------- | ------------- |
| `accessForbiddenBehavior`  | Defines how the developer portal should behave when a user doesn't have permissions to access specific content. Can be set to `403` or `404`. The default value is `404`. |
| `allowLoginWith`  | Must match one of the identifiers specified in the `idps` group. Currently supported only if `globalAuthRequirement` is set to `public`. |
| `claimsPreprocessor`  | Specifies the path to an optional claims preprocessor. |
| `globalAuthRequirement`  | Controls the auth requirement for accessing the site content. Can be set to `public` or to one of the identifiers from the `idps` group. |
| `idps`  | Defines one or more identity providers. For each identity provider in the `idps` group, you must assign an identifier (for example, `main`) and specify the type. Depending on the type, additional settings may be required, such as scopes, client ID, and configuration URL. |


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
auth:
  claimsPreprocessor: claimProc.js
  idps:
    main:
      type: oidc
      loginWith: OIDC
      configurationUrl: https://redoc-ly.auth0.com/.well-known/openid-configuration
      clientId: abcdefghij12345
      scopes:
        - openid
        - name
        - family_name
        - email
        - email_verified
        - identities
        - picture
        - phone
        - nickname
        - profile
        - given_name
        - created_at
        - address
        - offline_address
        - roles
        - scope
  globalAuthRequirement: public
  allowLoginWith: main
  accessForbiddenBehavior: 404
```
