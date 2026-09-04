---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Customize the Replay auth gate

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

The `ReplayGate` component wraps the entire Replay UI and controls whether users can reach it.
By ejecting and replacing it, you can require users to authenticate before Replay opens.
Examples include completing an OAuth 2.0 flow, entering an API key, or signing in with your own identity provider.

When a user authenticates, call `setEnvironmentValues` to set the token as an environment variable.
Replay picks up the value automatically and prefills it in every operation that declares a matching security scheme.

## Before you begin

Make sure you have the following:

- a basic understanding of TypeScript and React hooks
- an OpenAPI description file with at least one security scheme defined
- credentials for the identity provider you want to integrate (client ID, authorization endpoint, and so on)

## Eject ReplayGate

To customize the auth gate, first eject the component:

```bash
npx @redocly/cli eject component 'ReplayGate/ReplayGate.tsx'
```

This command creates a local copy of `ReplayGate.tsx` in your project's `@theme/components/ReplayGate/` folder.

## Props reference

{% table %}
- Prop
- Type
- Description
---
- `setEnvironmentValues`
- `(envName: string, values: Record<string, string | { value: string, isSecret?: boolean }>) => void`
- **REQUIRED.**
  Injects key-value pairs into the named environment.
  Call this after a successful auth to set the token.
  A plain string sets the value; pass `{ value, isSecret }` to also control whether Replay masks it.
  If no environment has this name, Replay creates a new environment.
---
- `setSelectedEnvironment`
- `(envName: string) => void`
- **REQUIRED.**
  Switches Replay's active environment.
  Use this when you want to automatically select the environment that received the token.
---
- `selectedEnvironment`
- string
- The name of the currently active environment, passed down from Replay settings.
  Use as the target for `setEnvironmentValues` when no specific environment name is hardcoded.
---
- `apiId`
- string
- The current OpenAPI description's id, when your project defines one.
  Use it to vary behavior per API in a multi-API catalog.
  For example, scope a stored token's key so different APIs don't share (or overwrite) each other's credentials.
  You can also use a different auth mechanism entirely for APIs that need one.
---
- `children`
- `React.ReactNode`
- **REQUIRED.**
  The Replay UI.
  Render this when authentication succeeds.
  You can also mount it hidden while auth is in progress to allow Replay's store to initialize in the background.
{% /table %}

## How environment values work

Replay generates one environment per API server defined in your OpenAPI description.
The environment name is the server's `name`, `description`, or URL — whichever is set first.

Each environment has a set of inputs derived from the operation's security schemes.
The input names follow the pattern `{schemeId}{suffix}`.
`schemeId` is the security scheme identifier from your OpenAPI description, and the suffix depends on the scheme type:

{% table %}
- Scheme type
- Suffix
- Example input name
---
- `http` (bearer / JWT)
- `_token`
- `bearerAuth_token`
---
- `oauth2`
- `_token`
- `myOAuth_token`
---
- `apiKey`
- *(none)*
- `apiKey`
---
- `http` (basic, digest) — username
- `_username`
- `basicAuth_username`
---
- `http` (basic, digest) — password
- `_password`
- `basicAuth_password`
{% /table %}

Pass the input name as the key when calling `setEnvironmentValues`:

```tsx
setEnvironmentValues(selectedEnvironment, { bearerAuth_token: token });
```

Replay resolves this value at request time and injects it into the `Authorization` header automatically.

## Create an environment

Create new environments when your gate issues credentials that don't belong to any environment declared in your OpenAPI description.
For example, a per-user sandbox obtained at sign-in.
Replay creates that environment instead of ignoring the call.

To create a new environment:

1. Call `setEnvironmentValues` with a name that doesn't match any environment in your OpenAPI description.
1. Creating an environment doesn't select it.
   Call `setSelectedEnvironment` to make it active:

   ```tsx
   setEnvironmentValues('Authorized', { bearerAuth_token: { value: token, isSecret: true } });
   setSelectedEnvironment('Authorized');
   ```

The new environment takes its server from the environment selected by the page.
Requests reach the same host the page targets.
The first server in your OpenAPI description is the fallback.

Only the names your gate passes to `setEnvironmentValues` create environments.
Environment values from the project configuration can't do that, so a name that doesn't match an existing environment is silently dropped.

Environments created this way are exempt from the `allowedEnvironments` setting, because the gate requested them explicitly.
Users can't rename or delete these environments from the environments panel, as your gate recreates them on the next page load.

In projects that set `allowedEnvironments`, values users type into created environments are not restored on page reload.
Your gate re-injects its own values.
The credentials it manages are unaffected.

## Custom input names and masking

A key passed to `setEnvironmentValues` does not have to match a name generated from the OpenAPI description.
If the key matches an existing input (a security scheme, path parameter, or dynamic value), Replay overwrites that input's value.
If it doesn't match anything, Replay creates a new input with that name in the target environment.
This behavior is useful for injecting values your OpenAPI description doesn't model as security, such as an internal tracing header.

By default, a value is not masked in the Replay UI.
A plain string keeps an existing input's current masking, and a newly created input starts out unmasked.
Pass an object instead of a string to control this explicitly:

```tsx
// Plain string: sets the value, keeps whatever masking the input already had
// (or unmasked, if this creates a new input).
setEnvironmentValues(selectedEnvironment, { bearerAuth_token: token });

// { value, isSecret }: also sets whether Replay masks the value.
setEnvironmentValues(selectedEnvironment, {
  bearerAuth_token: { value: token, isSecret: true },
});
```

## Default behavior

The default `ReplayGate` passes `children` through without any auth check — all users can access Replay immediately.
If that is acceptable for your use case, you do not need to eject this component.

```tsx {% title="@theme/components/ReplayGate/ReplayGate.tsx (no-op)" %}
import React from 'react';
import type { ReplayGateProps } from '@redocly/theme/components/ReplayGate/ReplayGate';

export function ReplayGate({ children }: ReplayGateProps) {
  return <>{children}</>;
}
```

## Example: OAuth 2.0 popup flow

The following example implements a full OAuth 2.0 authorization code flow using a popup window.
It validates any stored token on mount and opens the authorization URL automatically if the token is missing or expired.
After a successful sign-in, it injects the token into Replay's active environment.

While that initial check runs, it shows a loading spinner instead of the sign-in button.
Without a distinct loading state, returning users with a valid token would see a flash.
The sign-in button would show for however long the validation request takes.

Replace the constants at the top (`CLIENT_ID`, `OAUTH_BASE_URL`, `REDIRECT_URI`, and `TOKEN_INPUT_NAME`) with values from your own identity provider.

{% admonition type="warning" name="localStorage and security" %}
This example stores the access token in `localStorage` so users stay signed in across page reloads.
`localStorage` persists indefinitely and is readable by any script on the page, making it vulnerable to XSS.
For sensitive tokens, prefer `sessionStorage`, which is cleared when the browser session ends.
{% /admonition %}

{% tabs %}
{% tab label="ReplayGate.tsx" %}
```tsx {% title="@theme/components/ReplayGate/ReplayGate.tsx" %}
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { ReplayGateProps } from '@redocly/theme/components/ReplayGate/ReplayGate';

// Replace with your OAuth 2.0 provider's details.
const CLIENT_ID        = 'YOUR_CLIENT_ID';
const OAUTH_BASE_URL   = 'https://auth.example.com/oauth2';
const USERINFO_URL     = 'https://auth.example.com/oidc/userinfo';
const REDIRECT_URI     = 'https://your-portal.example.com/api/login';
const STORAGE_KEY      = 'replay_access_token';
// Input name: OpenAPI security scheme id + suffix.
// For a scheme id 'bearerAuth' with type http/bearer, the suffix is '_token'.
const TOKEN_INPUT_NAME = 'bearerAuth_token';
// Used when the page selects no environment. Replay creates an environment for an unknown name.
const FALLBACK_ENV_NAME = 'Authorized';

// Pre-check: avoids a network call for clearly-expired JWTs.
function isJwtExpired(token: string): boolean {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(b64)) as { exp?: number };
    return typeof exp === 'number' && exp * 1000 <= Date.now();
  } catch {
    return false;
  }
}

// Validates the token against the OIDC UserInfo endpoint.
// Returns false if expired, revoked, or the network request fails.
async function isTokenValid(token: string): Promise<boolean> {
  if (isJwtExpired(token)) return false;
  try {
    const res = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--text-color-secondary, #888);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const OverlayWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: flex-end;
  z-index: var(--z-index-overlay);
`;

const Panel = styled.div`
  width: 440px;
  height: 100%;
  background: var(--bg-color, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 36px;
  gap: 20px;
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.14);
  animation: ${slideIn} 0.3s ease-out;
`;

// Always mounted at the same tree position across 'checking'/'authorizing'/'ready' so
// React never unmounts+remounts `children` — only its display toggles. Not rendered at
// all during 'gate'.
const ChildrenWrapper = styled.div<{ $hidden: boolean }>`
  display: ${({ $hidden }) => ($hidden ? 'none' : 'contents')};
`;

type Phase = 'checking' | 'gate' | 'authorizing' | 'ready';

export function ReplayGate({
  setEnvironmentValues,
  setSelectedEnvironment,
  selectedEnvironment,
  apiId,
  children,
}: ReplayGateProps) {
  // Starts at 'checking', not 'gate' — otherwise the sign-in button flashes on
  // screen for returning users while the stored token is still being validated.
  const [phase, setPhase] = useState<Phase>('checking');
  const [authUrl, setAuthUrl] = useState('');
  const popupRef = useRef<Window | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  // Scope the stored token per API so different APIs in the same catalog don't
  // share (or overwrite) each other's credentials.
  const storageKey = apiId ? `${STORAGE_KEY}_${apiId}` : STORAGE_KEY;

  const startAuth = useCallback(() => {
    const state = crypto.randomUUID();
    const url =
      `${OAUTH_BASE_URL}/auth` +
      `?client_id=${encodeURIComponent(CLIENT_ID)}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code&scope=openid+email+offline&state=${state}`;

    setAuthUrl(url);
    popupRef.current = window.open(url, '_blank');
    setPhase('authorizing');

    channelRef.current?.close();
    const channel = new BroadcastChannel('replay-auth');
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent) => {
      if (event.data?.type !== 'REPLAY_AUTH_DONE' || event.data.state !== state) return;
      channel.close();
      channelRef.current = null;
      popupRef.current?.close();
      popupRef.current = null;

      const token: string = event.data.access_token;
      localStorage.setItem(storageKey, token);

      // When the page selects no environment, name one anyway: Replay creates it on demand.
      const targetEnvironment = selectedEnvironment || FALLBACK_ENV_NAME;

      setEnvironmentValues(targetEnvironment, {
        [TOKEN_INPUT_NAME]: { value: token, isSecret: true },
      });
      setSelectedEnvironment(targetEnvironment);
      setPhase('ready');
    };
  }, [setEnvironmentValues, setSelectedEnvironment, selectedEnvironment, storageKey]);

  // On mount: restore a valid stored token, or start auth automatically.
  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem(storageKey);
      if (stored && (await isTokenValid(stored))) {
        // When the page selects no environment, name one anyway: Replay creates it on demand.
        const targetEnvironment = selectedEnvironment || FALLBACK_ENV_NAME;

        setEnvironmentValues(targetEnvironment, {
          [TOKEN_INPUT_NAME]: { value: stored, isSecret: true },
        });
        setSelectedEnvironment(targetEnvironment);
        setPhase('ready');
      } else {
        localStorage.removeItem(storageKey);
        setPhase('gate');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => { channelRef.current?.close(); };
  }, []);

  return (
    <>
      {phase !== 'gate' && (
        <ChildrenWrapper $hidden={phase !== 'ready'}>{children}</ChildrenWrapper>
      )}

      {phase !== 'ready' && (
        <OverlayWrapper>
          <Panel>
            {phase === 'checking' && <Spinner />}

            {phase === 'gate' && (
              <>
                <h2>Sign in to try it</h2>
                <p>Sign in to send live API requests.</p>
                <button onClick={startAuth}>Sign in</button>
              </>
            )}
            {phase === 'authorizing' && (
              <>
                <h2>Complete sign-in</h2>
                <p>A sign-in window has opened. Complete sign-in to continue.</p>
                <button
                  onClick={() => {
                    if (popupRef.current && !popupRef.current.closed) {
                      popupRef.current.focus();
                    } else {
                      popupRef.current = window.open(authUrl, 'auth-popup', 'width=520,height=680');
                    }
                  }}
                >
                  Re-open sign-in window
                </button>
              </>
            )}
          </Panel>
        </OverlayWrapper>
      )}
    </>
  );
}
```
{% /tab %}

{% tab label="Callback page" %}
The popup redirects to your redirect URI after the user signs in.
An [API function](./api-functions/api-functions-reference.md) exchanges the authorization code for an access token.
It then returns an HTML page that delivers the token back to the opener via `BroadcastChannel` and closes the popup.

The filename's `.get` suffix maps this file to `GET /api/login`, matching the `REDIRECT_URI` used above.

```ts {% title="@api/login.get.ts" %}
const CLIENT_ID    = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'https://your-portal.example.com/api/login';
const TOKEN_URL    = 'https://auth.example.com/oauth2/token';

export default async function (request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientSecret) {
    return htmlResponse(!clientSecret ? 'Not configured' : 'Missing code', null, null);
  }

  try {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: clientSecret,
      }),
    });

    if (!res.ok) return htmlResponse('Token exchange failed', null, null);
    const { access_token } = await res.json() as { access_token: string };
    return htmlResponse(null, access_token, state);
  } catch (err) {
    return htmlResponse(String(err), null, null);
  }
}

// Delivers the token back to the popup's opener, then closes the popup.
function htmlResponse(error: string | null, accessToken: string | null, state: string | null) {
  const script = error
    ? `document.getElementById('msg').textContent = ${JSON.stringify('Sign-in failed: ' + error)};`
    : `var channel = new BroadcastChannel('replay-auth');
       channel.postMessage({ type: 'REPLAY_AUTH_DONE', access_token: ${JSON.stringify(accessToken)}, state: ${JSON.stringify(state)} });
       channel.close();
       window.close();`;

  const html = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><title>Completing sign-in…</title></head>
  <body style="font-family:sans-serif;padding:32px">
    <p id="msg">Completing sign-in, this window will close…</p>
    <script>${script}</script>
  </body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
```

{% admonition type="warning" name="Keep your client secret out of source control" %}
The `OAUTH_CLIENT_SECRET` environment variable must never be committed to your repository.
Set it in your deployment environment or a local `.env` file that is excluded by `.gitignore`.
{% /admonition %}
{% /tab %}
{% /tabs %}

### How the popup flow works

1. `ReplayGate` opens the authorization URL in a popup window.
1. The user signs in and the identity provider redirects the popup to your `REDIRECT_URI`.
1. The `@api/login.get.ts` function exchanges the authorization code for an access token and returns an HTML page.
1. That page posts the token to the opener via `BroadcastChannel` and closes the popup.
1. `ReplayGate` receives the token, calls `setEnvironmentValues` and `setSelectedEnvironment`, and renders `children`.

{% admonition type="warning" name="Always call setSelectedEnvironment" %}
Replay's active environment does not switch on its own.
Without a `setSelectedEnvironment` call, the token lands in the target environment's inputs, but Replay keeps using whichever environment was already active.
The token never appears to take effect.
{% /admonition %}

## Eject ReplayTopBarActions

`ReplayTopBarActions` renders custom UI in Replay's top bar, next to the environment switcher.
The default implementation renders nothing.
Eject it to add a sign-out button, a multi-account switcher, or an account indicator.

```bash
npx @redocly/cli eject component 'ReplayTopBarActions/ReplayTopBarActions.tsx'
```

### Props reference

{% table %}
- Prop
- Type
- Description
---
- `environments`
- `ReadonlyArray<{ name: string }>`
- The list of available environments from the API servers in your OpenAPI description.
---
- `activeEnvironment`
- string
- The name of the currently active environment.
---
- `setEnvironmentValues`
- `(envName: string, values: Record<string, string | { value: string, isSecret?: boolean }>) => void`
- Injects key-value pairs into the named environment.
  Call with an empty string to clear a value on sign-out.
  A plain string sets the value; pass `{ value, isSecret }` to also control whether Replay masks it.
  Unlike the `ReplayGate` prop of the same name, this one only updates environments that already exist; it does not create them.
  See [Custom input names and masking](#custom-input-names-and-masking).
---
- `setSelectedEnvironment`
- `(envName: string) => void`
- Switches Replay's active environment.
---
- `apiId`
- string
- The current OpenAPI description's id, when your project defines one.
  Pass the same value your `ReplayGate` uses so sign-out clears the same scoped storage key.
{% /table %}

### Example: sign-out button

```tsx {% title="@theme/components/ReplayTopBarActions/ReplayTopBarActions.tsx" %}
import React from 'react';
import type { ReplayTopBarActionsProps } from '@redocly/theme/components/ReplayTopBarActions/ReplayTopBarActions';

const STORAGE_KEY     = 'replay_access_token';
const TOKEN_INPUT_NAME = 'bearerAuth_token';

export function ReplayTopBarActions({
  environments,
  setEnvironmentValues,
  apiId,
}: ReplayTopBarActionsProps) {
  const handleSignOut = () => {
    localStorage.removeItem(apiId ? `${STORAGE_KEY}_${apiId}` : STORAGE_KEY);
    for (const env of environments) {
      setEnvironmentValues(env.name, { [TOKEN_INPUT_NAME]: '' });
    }
    window.location.reload();
  };

  return (
    <button onClick={handleSignOut} style={{ padding: '6px 12px' }}>
      Sign out
    </button>
  );
}
```

Passing an empty string (`''`) for a token input clears the value in Replay's environment store — the same as a user manually deleting the field.

## Use cases

Ejecting `ReplayGate` and `ReplayTopBarActions` is useful for:

- **SSO enforcement**: require users to sign in with your company's identity provider before using Replay
- **Token pre-fill**: silently inject a stored token so users don't need to paste credentials manually
- **Multi-environment auth**: select different environments or token scopes based on the signed-in user's role
- **Session management**: add a sign-out button or session expiration indicator inside Replay

## Resources

- **[Configure Replay with dynamic API data](./configure-dynamic-replay-values.md)** - Fetch tokens and other request values dynamically using the `useConfigureReplay` hook
- **[Configure request values](./configure-request-values.md)** - Set static request values for headers, parameters, and security details in your OpenAPI descriptions
- **[API functions reference](./api-functions/api-functions-reference.md)** - Function signature, routing, context helpers, and access control
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components
- **[Customization](./index.md)** - Discover all customization options for your project
