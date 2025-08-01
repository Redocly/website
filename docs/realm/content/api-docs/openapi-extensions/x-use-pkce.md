# OpenAPI extension: `x-usePkce`

The `x-usePkce` allows you to enable [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) for the Oauth2 or OpenID Connect authorization code flow in the Replay.

When specified, the Replay sends both `code_challenge` and `code_verifier` to the authorization and token endpoints.

## Location

Use the `x-usePkce` extension in the `authorizationCode` `flow` object

## Options

{% table %}

- Option
- Type
- Description

---

- x-usePkce
- boolean
- Enables PKCE to enhance security by preventing interception of authorization codes during the OAuth2 or OpenID Connect flow.

{% /table %}

## Examples

The following configuration enables the PKCE for the operation:

```yaml
openapi: '3.0.0'
info:
  ...
tags: [...]
components:
  securitySchemes:
    oauth2_auth:
      type: "oauth2"
      flows:
        authorizationCode:
          x-usePkce: true
          authorizationUrl: "https://example.com/authorize"
          tokenUrl: "https://example.com/token"
```

## Resources

- This specification defines the use of a Proof Key for Code Exchange (PKCE): [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
