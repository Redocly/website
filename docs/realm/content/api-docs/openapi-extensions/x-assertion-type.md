# OpenAPI extension: `x-assertionType`

The assertion type specifies the token format used in OAuth flows. Use `x-assertionType` to define the assertion type for the operation’s security scheme, which currently only supports `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

The token (such as a JWT) is used instead of a client secret for client authentication in OAuth 2.0. This client assertion is useful when storing a client secret securely is challenging or when stronger security mechanisms, like signed JWTs, are preferred. The client assertion, in this case, serves as proof of the client’s identity, replacing the need for a client secret.

## Location

Use the `x-assertionType` extension in an OAuth Flows Object declaration for the OAuth Client Credentials flow.

## Options

{% table %}

- Option
- Type
- Description

---

- x-assertionType
- string
- Assertion type for the operation security scheme. Possible values: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`, `urn:ietf:params:oauth:client-assertion-type:saml2-bearer`. Redocly tooling only supports the JWT bearer assertion type.

{% /table %}

## Examples

The following configuration specifies the OAuth Flow assertion type for the operation:

```yaml
securitySchemes:
  oauth2ClientCredentials:
    type: oauth2
    flows:
      clientCredentials:
        tokenUrl: 'https://authserver.example/token'
        x-assertionType: urn:ietf:params:oauth:client-assertion-type:jwt-bearer
        scopes:
          'read:members': read organization members
```

## Resources

- This specification defines the use of a JSON Web Token (JWT) Bearer Token as a means for requesting an OAuth 2.0: [RFC 7523](https://tools.ietf.org/html/rfc7523).
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
