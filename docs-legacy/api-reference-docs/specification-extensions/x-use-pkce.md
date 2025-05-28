# x-usePkce

{% admonition type="warning" name="Compatibility warning" %}
This specification extension is supported only in Reference docs, but not in Redoc Community Edition.
{% /admonition %}

## Usage

Use `x-usePkce` to enable [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) for the Oauth2 authorization code flow in the _Try it_ console.

Add it directly to the `authorizationCode` `flow` object.

When specified, the _Try it_ console sends both `code_challenge` and `code_verifier` to the authorization and token endpoints.

Note that the console must be enabled in the Reference docs configuration for these values to be visible.

| Field Name |       Type        | Description                 |
| :--------- | :---------------: | :-------------------------- |
| x-usePkce  | boolean OR object | Enables PKCE in the console |

## Examples
{% tabs %}
{% tab label="yaml 1" %}
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
          scopes: {
            api: "Grants complete read/write access to the API"
```
{% /tab  %}
{% tab label="yaml 2" %}
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
          x-usePkce:
            disableManualConfiguration: true
            hideClientSecretInput: false
          authorizationUrl: "https://example.com/authorize"
          tokenUrl: "https://example.com/token"
          scopes: {
            api: "Grants complete read/write access to the API"
```
{% /tab  %}
{% /tabs %}
