---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---

# Identity tokens

By default, the [AI assistant web component](./ai-assistant-web-component.md) answers as an anonymous visitor.
It uses only the content a signed-out reader can open.

An identity token lifts that limit.
Your backend mints a short-lived JWT that names the signed-in user's [RBAC teams](../access/rbac.md).
The widget sends the token with every question, and Redocly verifies it against a JWKS you publish.
The assistant then answers from the content those teams can read.

Redocly verifies tokens with the standard JWT and JWKS formats, so any backend that can sign a JWT works.
You don't need an identity provider, and your users never sign in to Redocly.

## How verification works

{% numbered-list %}
  {% numbered-item %}
  A user signs in to your application.
  {% /numbered-item %}
  {% numbered-item %}
  Your backend mints a JWT that carries the user's team names and a short expiration.
  {% /numbered-item %}
  {% numbered-item %}
  Your page hands the token to the widget through `setConfig()`.
  {% /numbered-item %}
  {% numbered-item %}
  The widget sends the token in the `x-redocly-ai-assistant-identity` header with every request.
  {% /numbered-item %}
  {% numbered-item %}
  Redocly verifies the signature against your JWKS, then checks the audience and the expiration.
  {% /numbered-item %}
  {% numbered-item %}
  Redocly maps the teams claim to RBAC teams.
  {% /numbered-item %}
  {% numbered-item %}
  The assistant answers from the content those teams can read.
  It reports the outcome in the `x-redocly-ai-assistant-identity-status` response header.
  {% /numbered-item %}
{% /numbered-list %}

Verification never blocks an answer.
A missing, invalid, or expired token drops the visitor to anonymous access.
The assistant then answers from public content.
See [Verification outcomes](#verification-outcomes).

## Before you begin

Make sure you have:

- the [AI assistant web component](./ai-assistant-web-component.md) embedded and answering questions
- [RBAC](../access/rbac.md) configured for the project, with the team names you plan to send
- the maintainer or admin role for the project
- a signing key pair, and a place to serve the matching public key over HTTPS

## Configure the project

{% numbered-list %}
  {% numbered-item %}
  In your project's workspace, select **Settings > AI assistant**.
  {% /numbered-item %}
  {% numbered-item %}
  Enable **Identity verification**.
  {% /numbered-item %}
  {% numbered-item %}
  Enter the **JWKS URL** and the **Audience**.
  {% /numbered-item %}
  {% numbered-item %}
  (Optional) In **Teams claim**, enter the claim that carries the team names.
  Default: `teams`.
  {% /numbered-item %}
  {% numbered-item %}
  Select **Save**.
  {% /numbered-item %}
{% /numbered-list %}

{% table %}

- Setting {% width="20%" %}
- Description

---

- JWKS URL
- **REQUIRED.**
  HTTPS URL of the JSON Web Key Set that verifies your tokens.
  Must be publicly reachable: Redocly rejects URLs that resolve to private or internal addresses.
  Maximum 2048 characters.

---

- Audience
- **REQUIRED.**
  Expected `aud` claim, matched exactly.
  Use a value dedicated to this integration, so no other token signed by the same keys works here.
  Maximum 255 characters.

---

- Teams claim
- Claim that carries the visitor's team names.
  Default: `teams`.
  Maximum 128 characters.

{% /table %}

The assistant starts accepting tokens as soon as you save.
Until then, the assistant treats a request that carries a token as anonymous, and the status header reports `invalid`.

## Publish the JWKS

Serve your public keys as a JSON Web Key Set at the URL you configured.
A static `jwks.json` file on your own domain is enough.

```json {% title="jwks.json" %}
{
  "keys": [
    {
      "kty": "EC",
      "crv": "P-256",
      "x": "f83OJ3D2xF1Bg8vub9tLe1gHMzV76e8Tus9uPHvRVEU",
      "y": "x_FEzRu9m36HLN_tue659LNpXW6pCyStikYjKIWI5a0",
      "kid": "assistant-2026-09",
      "alg": "ES256",
      "use": "sig"
    }
  ]
}
```

Give every key a `kid`, and set the same `kid` in the header of the tokens it signs.
Verification then resolves the right key while your JWKS carries both.

Redocly caches the document for up to 10 minutes, and gives each fetch 3 seconds to complete.
To rotate a key without downtime:

{% numbered-list %}
  {% numbered-item %}
  Add the new key to the JWKS, and keep the old one.
  {% /numbered-item %}
  {% numbered-item %}
  Wait out the cache and the lifetime of the tokens already issued.
  {% /numbered-item %}
  {% numbered-item %}
  Sign new tokens with the new key.
  {% /numbered-item %}
  {% numbered-item %}
  Remove the old key.
  {% /numbered-item %}
{% /numbered-list %}

## Mint a token

Sign each token with RS256, ES256, or EdDSA.
Redocly rejects every other algorithm, including HS256 and `none`.

{% table %}

- Claim {% width="15%" %}
- Type {% width="15%" %}
- Description

---

- aud
- string
- **REQUIRED.**
  Must match the **Audience** setting exactly.
  A token with a different or missing `aud` fails verification.

---

- exp
- number
- Expiration, as a Unix timestamp in seconds.
  Redocly allows 5 seconds of clock skew.
  A token without `exp` stays valid until you retire its signing key, so always set one.

---

- teams
- [string]
- Team names the user belongs to, at most 50 entries of at most 100 characters each.
  Rename the claim with the **Teams claim** setting.
  See [How teams reach RBAC](#how-teams-reach-rbac).

{% /table %}

Redocly ignores every other claim, including `iss` and `sub`.
The audience is what binds a token to your project, so keep it unique to this integration.

This example mints a 5-minute token for a signed-in user, using the [jose](https://www.npmjs.com/package/jose) library:

```js
import { readFile } from 'node:fs/promises';
import { importPKCS8, SignJWT } from 'jose';

const privateKey = await importPKCS8(await readFile('./identity-key.pem', 'utf8'), 'ES256');

export function mintIdentityToken(user) {
  return new SignJWT({ teams: user.teams })
    .setProtectedHeader({ alg: 'ES256', kid: 'assistant-2026-09' })
    .setSubject(user.id)
    .setAudience('redocly-ai-assistant')
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(privateKey);
}
```

Expose the result on an endpoint of your own that only signed-in users can call.
Keep the private key on the server: a key that reaches the browser lets anyone mint a token for any team.

## Send the token from your page

The token is a JavaScript-only option, because secrets don't belong in markup.
There is no matching HTML attribute.

Set `getIdentityToken` to a function that returns the current token.
The widget calls it before each request, so the next question picks up a fresh token when the old one expires:

```js
window.RedoclyAssistant.setConfig({
  getIdentityToken: async () => {
    const response = await fetch('/api/assistant-identity-token', { credentials: 'include' });
    const { token } = await response.json();
    return token;
  },
});
```

Cache the token in your own code.
Mint a new one only when the old one is close to expiration.
If the function throws or returns an empty value, the request goes out with no token.
The answer then covers public content only.

Set `identityToken` instead when you already hold a token and refresh it yourself:

```js
window.RedoclyAssistant.setConfig({ identityToken: token });
```

Both options accept a later `setConfig()` call, and `getIdentityToken` wins when you pass both.

## Refresh an expired token

The widget emits `redocly-assistant:identity-expired` when a page that supplied a token gets back `invalid` or `expired`.
Use it as a backstop: mint a fresh token, and pass it back with `setConfig()`.

```js
window.addEventListener('redocly-assistant:identity-expired', async (event) => {
  console.warn('Assistant identity rejected:', event.detail.status);

  const response = await fetch('/api/assistant-identity-token', { credentials: 'include' });
  const { token } = await response.json();
  window.RedoclyAssistant.setConfig({ identityToken: token });
});
```

The event never fires for anonymous visitors, because they have nothing to refresh.
The answer to the question that triggered it still arrives, scoped to public content.

## Verification outcomes

Every answer carries an `x-redocly-ai-assistant-identity-status` response header.
The widget reads it to decide whether to emit `redocly-assistant:identity-expired`, and you can read it in your browser's network panel to debug a setup.

{% table %}

- Status {% width="15%" %}
- Meaning
- Answer scope

---

- ok
- Redocly verified the token.
- The content the token's teams can read.

---

- absent
- The request carried no token, or a Redocly session identified the visitor instead.
- Public content, or the content the session's teams can read.

---

- invalid
- Verification failed; see the causes below.
- Public content.

---

- expired
- The token is past its `exp`.
- Public content.

{% /table %}

A request reports `invalid` when any of the following is true:

- the signature doesn't match a key in your JWKS
- the `aud` claim is missing, or differs from the **Audience** setting
- the algorithm is anything other than RS256, ES256, or EdDSA
- the teams claim is present but isn't an array of strings, or exceeds 50 entries or 100 characters per name
- Redocly can't fetch the JWKS URL, or it resolves to a private or internal address
- the project has no identity verification saved

Redocly logs every rejection with the reason, the organization ID, and the project ID.
Contact [support](mailto:team@redocly.com) with the time of a failed request if the status alone doesn't explain it.

## How teams reach RBAC

A verified token grants the teams from its claim, plus the built-in `authenticated` and `anonymous` teams.
Those teams then go through the project's [RBAC configuration](../config/access/rbac.md) like any other visitor's teams.

{% admonition type="warning" name="Team names arrive lowercased" %}
Redocly lowercases every name in the claim, and RBAC matches team names exactly.
A token that carries `Partners` matches an RBAC entry named `partners`, and no entry named `Partners`.
Use lowercase team names in `redocly.yaml` for every team you send in a token.
{% /admonition %}

A few more rules apply to the claim:

- A token that verifies but carries no teams claim still counts as authenticated, with no extra teams.
- Redocly drops Reunite's reserved names from the claim, so a token can't grant `authenticated`, `anonymous`, `viewer`, `billing`, `member`, `owner`, or any `redocly.*` team.
- Duplicate names collapse into one.

A visitor who already has a Redocly session is a separate case, for example on a project behind [project SSO](../reunite/organization/sso/configure-sso.md).
That session decides the teams, and Redocly ignores the token.
The status header then reports `absent`.

The `rbac.features.aiSearch` option still governs who can use the assistant at all.
If you restrict it, include the teams you send in tokens, or Redocly refuses their questions before it searches any content.

## Resources

- **[AI assistant web component](./ai-assistant-web-component.md)** - Embed the assistant on any web page
- **[Reference](./reference.md)** - Every attribute, method, and event
- **[RBAC concepts](../access/rbac.md)** - How teams and roles decide what a visitor can read
- **[`rbac` configuration](../config/access/rbac.md)** - Assign roles to teams for content and for the `aiSearch` feature
- **[Teams](../reunite/organization/teams.md)** - Create the teams your token claims name
- **[AI governance FAQ](../faq/ai-governance.md)** - Answers for security and compliance reviews
