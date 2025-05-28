---
excludeFromSearch: true
---

# Log in using a JWT

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

You can use a JWT endpoint to seamlessly log users into a portal from your app.

## Prerequisites

1. Configure an [OIDC identity provider](/docs-legacy/settings/identity-providers.md).

   It doesn't have to be a real identity provider but it should implement [`jwks_uri`](https://datatracker.ietf.org/doc/html/rfc8414#section-2). Example minimal OIDC config:

   ```json
   {
     "response_types_supported": [
       "token id_token"
     ],
     "jwks_uri": "https://example.com/.well-known/jwks.json",
     "issuer": "https://example.com/auth"
   }
   ```

1. Enable OIDC auth for the portal

   In [the portal access settings](/docs-legacy/developer-portal/settings/manage-access.md) enable OIDC auth. If your portal is public, then select **Allow login with OIDC**.

## Login flow

Sign a JWT ID token and redirect the user to the following URL:

```html
https://<your-portal-url>/_auth/oidc#id_token=<id-token>
```

Replace `your-portal-url` with the deployment URL of your portal (it can also be a custom domain) and `id-token` with the token generated.

Requirements for the token:
- The `issuer` field **MUST** match the one configured in IdP settings.
- The token **MUST** have both `email` and `sub` claims.
- The `alg` **MUST** be `RS256`.
