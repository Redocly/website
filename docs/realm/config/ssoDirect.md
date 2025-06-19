---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise+
excludeFromSearch: true
---

# `ssoDirect`

Control identity and access with the `ssoDirect` configuration option. Allows more customization than [sso](./sso.md).

{% admonition type="warning" name="Enterprise+" %}
Available with Enterprise+.
[Contact us](https://redocly.com/contact-us) to upgrade or learn more.
{% /admonition %}

## Options

{% table %}

- Option
- Type
- Description

---

- ssoDirect
- Map of Identity provider objects [IDP objects](#idp-object)
- Map of IDPs which can be [OIDC object](#oidc-object), or [SAML2 object](#saml2-object)

{% /table %}

### IDP object

An IDP object can be one of the following types:

- OpenID Connect (OIDC) object (see [OIDC object](#oidc-object))
- Security Assertion Markup Language (SAML) object (see [SAML2 object](#saml2-object))

{% table %}

- Option
- Type
- Description

---

- type
- string
- Possible values: `OIDC`, `SAML2`.

---

- title
- string
- Optional title that can be used on the login page when multiple IDPs are configured.

---

- _additionalProperties_
- any
- Depends on the type value. See [OIDC object](#oidc-object) and [SAML2 object](#saml2-object) for details.

{% /table %}

### OIDC object

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Specifies the type of identity provider.
  Possible value: `OIDC`.

---

- configurationUrl
- string
- **REQUIRED if `configuration` property is missing.**
  OpenID configuration URL for your identity provider.
  This is typically in the format `https://{identity-provider-hostname}/.well-known/openid-configuration`.
  Select the appropriate scopes to set your user attributes during authentication to authorize access.
  Mutually exclusive with `configuration`.

---

- configuration
- [OIDC Metadata object](#oidc-metadata-object)
- **REQUIRED if `configurationUrl` property is missing.**
  OpenID configuration. You can copy-paste the content of the configuration endpoint to `configuration` property if your OpenID configuration URL is protected by some header-based authorization.
  Mutually exclusive with `configurationUrl`.

---

- clientId
- string
- **REQUIRED.**
  Unique ID to identify Redocly with your IdP authorization server.

---

- clientSecret
- string
- **REQUIRED if `pkce` is `false`**
  Secret password that only Redocly and your IdP authorization server know.
  Keep secrets out of a repository and use environment variable references like this example: `{{process.env.MAIN_CLIENT_SECRET | "test-secret" }}`.

---

- pkce
- boolean
- Use [PKCE](https://oauth.net/2/pkce/) for the authorization code flow. If `true`, the `clientSecret` is not required.
  Deafult value: `false`.

---

- scopes
- [string]
- **REQUIRED.**
  List of scopes.
  Scopes are used during authentication to authorize access to a person's details, like name and picture.
  The scopes must include `openid` and `email`.

---

- teamsClaimName
- string
- Claim name to use for role-based access control.
  Default value: https://redocly.com/sso/teams

---

- teamsClaimMap
- object
- Map of team claim values to team names. to team names. Useful when the IdP team attribute values are not the same as the team names.
  Default value: {}

---

- defaultTeams
- [string]
- List of teams to assign to all users by default for this identity provider.
  Default value: []

---

- tokenExpirationTime
- integer
- Overrides the time until the token expires in seconds.
  If not provided, the token expiration is used from the identity provider.

---

- authorizationRequestCustomParams
- string
- Parameters added to the authorization URL.

---

- tokenRequestCustomParams
- string
- Parameters added to the token URL.

---

- audience
- [string]
- An array of allowed OIDC audience values. Will be matched against `aud` claim in OIDC ID token. If not specified or is an empty array, all of the audiences are allowed.

{% /table %}

### OIDC metadata object

The OIDC metadata object as documented in [OIDC specification](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).

### SAML2 object

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Specifies the type of identity provider.
  Possible value: `SAML2`.

---

- issuerId
- string
- **REQUIRED.**
  Unique identifier of the identity provider.

---

- entityId
- string
- Unique identifier of the project SP.
  Default value when hosting on Redocly: `https://api.redocly.com/sso/project/<project-name>`

---

- ssoUrl
- string
- **REQUIRED.**
  URL to redirect users to log in.

---

- x509PublicCert
- string
- **REQUIRED.**
  Public certificate in x.509 format for the identity provider.

---

- teamsAttributeName
- string
- Attribute name to use for role-based access control.
  Default value: https://redocly.com/sso/teams

---

- teamsAttributeMap
- object
- Map of team attribute values to team names. Useful when the IdP team attribute values are not the same as the team names.
  Default value: {}

---

- defaultTeams
- [string]
- List of teams to assign to all users by default for this identity provider.
  Default value: []

{% /table %}

## Examples

### `OIDC` example

In your OIDC identity provider settings, set the appropriate URL for "Allowed Callback URLs":

{% table %}

- Environment
- Allowed callback URL

---

- Local development
- `http://localhost:4000/_auth/oidc`

---

- Preview
- `https://previewauth--{YOUR_PROJECT_NAME}.redocly.app/_auth/oidc`

---

- Production
- `https://{YOUR_CUSTOM_DOMAIN}/_auth/oidc`

{% /table %}

Replace `{YOUR_PROJECT_NAME}` and `{YOUR_CUSTOM_DOMAIN}` with actual values.

The following is an example configuration.

```yaml
ssoDirect:
  main:
    type: OIDC
    # well-known URL from your IdP
    configurationUrl: https://accounts.google.com/.well-known/openid-configuration
    # Client or application ID
    clientId: sO3vEhnjmjYci16Z2cRJUMO64NDEy0mD
    # Client secret
    clientSecret: '{{process.env.MAIN_CLIENT_SECRET | "test-secret"}}'
    # Name of the claim with teams array received from IdP in ID token
    teamsClaimName: https://redocly.com/sso/teams
    # List of scopes. By default only openid scope is used
    scopes:
      - openid
      - email
      - name
```

### SAML2 example

```yaml
ssoDirect:
  demoSaml:
    type: SAML2
    ssoUrl: https://dev-7ybkoxrd.us.auth0.com/samlp/cAByzjnpSdYvgcKmAr6nZPvPvpe4Oa4N
    issuerId: urn:dev-7ybkoxrd.us.auth0.com
    x509PublicCert: MIIDDTCCAfWgAwIBAgIJL/BU7qYCB8DYMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi03eWJrb3hyZC51cy5hdXRoMC5jb20wHhcNMjIwODEwMDg1MTA1WhcNMzYwNDE4MDg1MTA1WjAkMSIwIAYDVQQDExlkZXYtN3lia294cmQudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3Tr7a4BVupU/VrR8dxBkRMQkRTfysTPazTn2zJAPpWs/cdj6+/be99d1rQfUAXTSTUNf7P/AQ3dZ1GN1VQxi54qELaXOtzPHrNHLTJb+jotqUAesAI2nPno/hrOx4OeLIFzVucYpE3CYAui8YVedUS/QUITgVoP2+PIy5gXrfXg6Ap8QFNH6IdHqpond2ebTFL8KGZLjn8t7+FwEzrWDeUtSMJdauiQzLum5XfYT5+FaLnrOGfZgJINnrUfx9867ITo2Tq9j6ydr5z/gI9RM1S9pkuxO0SDbbbIWkS1hY6H/pL0y7TZB5edysVWXu0m9CMQMIMnI6HIkQoV6m3hV2wIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTBd6jzJ05JwBk4TfCEPkBjT/iVwTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAKLBX+twRxbFw5kSNfM5I0dljkZN2X5ypzApkTbDs1Ios5vY1WmdnqugtyA9BAKAq+EW4fg1HpuI+80hMMQ+Tkm2dDcepGwSjyHFouTarvDeOdgk5WHbKTceeItuFCZutHpzlPFjxgrrNszGzfbG6ttw2nWCBkJmftWLFYyuAH/hjcgQ2sq/j0+5p57jxYsoVL5pyDjubHcWxHw+4hM/xAAsq6ONVA57wesvYPUFZJ1CejKljZ1K5Md+EnjJQWcCBD8nRY4OTVxl1pa0UyCLSKGVR0F2LhPvb6HUf2syeJxXXtVWlzHTlzGDZQiHF3DDZrgu2mNdFwBiU1e1nM1hnQw=
    teamsAttributeName: http://schemas.auth0.com/https://redocly.com/sso/teams
```

## Related options

* [rbac](../config/rbac.md) reference

## Resources

- [Role-based access control (RBAC)](../setup/concepts/rbac.md) concept
