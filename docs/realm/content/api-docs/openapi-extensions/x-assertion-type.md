# OpenAPI extension: `x-assertionType`

The assertion type specifies the token format used in OAuth flows.
Use `x-assertionType` to define the assertion type for the operation’s security scheme, which currently only supports `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.

The token (such as a JWT) is used instead of a client secret for client authentication in OAuth 2.0.
This client assertion is useful when storing a client secret securely is challenging or when stronger security mechanisms, like signed JWTs, are preferred.
The client assertion, in this case, serves as proof of the client’s identity, replacing the need for a client secret.

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
- Assertion type for the operation security scheme.
  Possible values: `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`, `urn:ietf:params:oauth:client-assertion-type:saml2-bearer`.
  Redocly tooling only supports the JWT bearer assertion type.

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

- **[RFC 7523 - JWT Bearer Token](https://tools.ietf.org/html/rfc7523)** - Official specification defining the use of JSON Web Token Bearer Token for OAuth 2.0 client authentication
- **[Show extensions configuration](../../../config/openapi/show-extensions.md)** - Control which extensions are included in your API reference documentation for optimal presentation
- **[OpenAPI configuration settings](../../../config/openapi/index.md)** - Complete reference for all available OpenAPI configuration options and customization settings
- **[Supported OpenAPI extensions](./index.md)** - Complete list of all OpenAPI extensions supported by Redocly for enhanced API documentation
