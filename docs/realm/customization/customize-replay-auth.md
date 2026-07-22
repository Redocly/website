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

The `ReplayAuth` component wraps the entire Replay UI and controls whether users can reach it.
By ejecting and replacing it, you can require users to authenticate before Replay opens — for example, completing an OAuth 2.0 flow, entering an API key, or signing in with your own identity provider.

When a user authenticates, call `setEnvironmentValues` to set the token as an environment variable.
Replay picks up the value automatically and prefills it in every operation that declares a matching security scheme.

## Before you begin

Make sure you have the following:

- a basic understanding of TypeScript and React hooks
- an OpenAPI description file with at least one security scheme defined
- credentials for the identity provider you want to integrate (client ID, authorization endpoint, and so on)

## Eject ReplayAuth

To customize the auth gate, first eject the component:

```bash
npx @redocly/cli eject component 'ReplayAuth/ReplayAuth.tsx'
```

This command creates a local copy of `ReplayAuth.tsx` in your project's `@theme/components/ReplayAuth/` folder.

## Props reference

{% table %}
- Prop
- Type
- Required
- Description
---
- `setEnvironmentValues`
- `(envName: string, values: Record<string, string>) => void`
- Yes
- Injects key-value pairs into the named environment. Call this after a successful auth to set the token.
---
- `setSelectedEnvironment`
- `(envName: string) => void`
- Yes
- Switches Replay's active environment. Use this when you want to automatically select the environment that received the token.
---
- `selectedEnvironment`
- `string`
- No
- The name of the currently active environment, passed down from Replay settings. Use as the target for `setEnvironmentValues` when no specific environment name is hardcoded.
---
- `children`
- `React.ReactNode`
- Yes
- The Replay UI. Render this when authentication succeeds. You can also mount it hidden while auth is in progress to allow Replay's store to initialize in the background.
{% /table %}

## How environment values work

Replay generates one environment per API server defined in your OpenAPI description.
The environment name is the server's `name`, `description`, or URL — whichever is set first.

Each environment has a set of inputs derived from the operation's security schemes.
The input names follow the pattern `{schemeId}{suffix}`, where `schemeId` is the security scheme identifier from your OpenAPI description and the suffix depends on the scheme type:

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

## Default behavior

The default `ReplayAuth` passes `children` through without any auth check — all users can access Replay immediately.
If that is acceptable for your use case, you do not need to eject this component.

```tsx {% title="@theme/components/ReplayAuth/ReplayAuth.tsx (no-op)" %}
import React from 'react';
import type { ReplayAuthProps } from '@redocly/theme/components/ReplayAuth/ReplayAuth';

export function ReplayAuth({ children }: ReplayAuthProps) {
  return <>{children}</>;
}
```

## Example: OAuth 2.0 popup flow

The following example implements a full OAuth 2.0 authorization code flow using a popup window.
It validates any stored token on mount, opens the authorization URL automatically if the token is missing or expired, and injects the token into Replay's active environment after a successful sign-in.

Replace the constants at the top (`CLIENT_ID`, `OAUTH_BASE_URL`, `REDIRECT_URI`, and `TOKEN_INPUT_NAME`) with values from your own identity provider.

{% admonition type="warning" name="localStorage and security" %}
This example stores the access token in `localStorage` so users stay signed in across page reloads.
`localStorage` persists indefinitely and is readable by any script on the page, making it vulnerable to XSS.
For sensitive tokens, prefer `sessionStorage`, which is cleared when the browser session ends.
{% /admonition %}

{% tabs %}
{% tab label="ReplayAuth.tsx" %}
```tsx {% title="@theme/components/ReplayAuth/ReplayAuth.tsx" %}
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import type { ReplayAuthProps } from '@redocly/theme/components/ReplayAuth/ReplayAuth';

// Replace with your OAuth 2.0 provider's details.
const CLIENT_ID        = 'YOUR_CLIENT_ID';
const OAUTH_BASE_URL   = 'https://auth.example.com/oauth2';
const USERINFO_URL     = 'https://auth.example.com/oidc/userinfo';
const REDIRECT_URI     = 'https://your-portal.example.com/api/login';
const STORAGE_KEY      = 'replay_access_token';
// Input name: OpenAPI security scheme id + suffix.
// For a scheme id 'bearerAuth' with type http/bearer, the suffix is '_token'.
const TOKEN_INPUT_NAME = 'bearerAuth_token';

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

const HiddenWrapper = styled.div`
  display: none;
`;

type Phase = 'gate' | 'authorizing' | 'ready';

export function ReplayAuth({
  setEnvironmentValues,
  selectedEnvironment,
  children,
}: ReplayAuthProps) {
  const [phase, setPhase] = useState<Phase>('gate');
  const [authUrl, setAuthUrl] = useState('');
  const popupRef = useRef<Window | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

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
      localStorage.setItem(STORAGE_KEY, token);
      if (selectedEnvironment) {
        setEnvironmentValues(selectedEnvironment, { [TOKEN_INPUT_NAME]: token });
      }
      setPhase('ready');
    };
  }, [setEnvironmentValues, selectedEnvironment]);

  // On mount: restore a valid stored token, or start auth automatically.
  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (await isTokenValid(stored))) {
        if (selectedEnvironment) {
          setEnvironmentValues(selectedEnvironment, { [TOKEN_INPUT_NAME]: stored });
        }
        setPhase('ready');
      } else {
        localStorage.removeItem(STORAGE_KEY);
        // Phase stays at 'gate' — user clicks "Sign in" to start auth.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => { channelRef.current?.close(); };
  }, []);

  if (phase === 'ready') return <>{children}</>;

  return (
    <>
      {phase === 'authorizing' && <HiddenWrapper>{children}</HiddenWrapper>}

      <OverlayWrapper>
        <Panel>
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
    </>
  );
}
```
{% /tab %}

{% tab label="Callback page" %}
The popup redirects to your redirect URI after the user signs in.
A server-side handler exchanges the authorization code for an access token, then a client-side page delivers the token back to the opener via `BroadcastChannel` and closes the popup.

```ts {% title="@portal/api/login.props.ts" %}
const CLIENT_ID    = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'https://your-portal.example.com/api/login';
const TOKEN_URL    = 'https://auth.example.com/oauth2/token';

export default async function (_staticData: unknown, _request: unknown, context: { query: Record<string, string> }) {
  const { code, state } = context.query;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientSecret) {
    return { access_token: null, state, error: !clientSecret ? 'Not configured' : 'Missing code' };
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

    if (!res.ok) return { access_token: null, state, error: 'Token exchange failed' };
    const { access_token } = await res.json() as { access_token: string };
    return { access_token, state, error: null };
  } catch {
    return { access_token: null, state, error: 'Network error' };
  }
}
```

```tsx {% title="@portal/api/login.page.tsx" %}
import { useEffect, useRef } from 'react';

export const frontmatter = { seo: { title: 'Completing sign-in…' } };

type Props = { access_token: string | null; state: string | null; error: string | null };

export default function LoginCallbackPage({ access_token, state, error }: Props) {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    if (access_token) {
      const channel = new BroadcastChannel('replay-auth');
      channel.postMessage({ type: 'REPLAY_AUTH_DONE', access_token, state });
      channel.close();
      window.close();
    }
  }, [access_token, state]);

  return (
    <p style={{ fontFamily: 'sans-serif', padding: 32 }}>
      {error ? `Sign-in failed: ${error}` : 'Completing sign-in, this window will close…'}
    </p>
  );
}
```

{% admonition type="warning" name="Keep your client secret out of source control" %}
The `OAUTH_CLIENT_SECRET` environment variable must never be committed to your repository.
Set it in your deployment environment or a local `.env` file that is excluded by `.gitignore`.
{% /admonition %}
{% /tab %}
{% /tabs %}

### How the popup flow works

1. `ReplayAuth` opens the authorization URL in a popup window.
2. The user signs in and the identity provider redirects the popup to your `REDIRECT_URI`.
3. A server-side page props function exchanges the authorization code for an access token.
4. The client-side callback page posts the token to the opener via `BroadcastChannel` and closes the popup.
5. `ReplayAuth` receives the token, calls `setEnvironmentValues`, and renders `children`.

## Eject ReplaySessionManager

`ReplaySessionManager` controls the session or environment switcher UI inside Replay.
The default implementation renders nothing — eject it to add a sign-out button, a multi-account switcher, or an account indicator.

```bash
npx @redocly/cli eject component 'ReplaySessionManager/ReplaySessionManager.tsx'
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
- `string`
- The name of the currently active environment.
---
- `setEnvironmentValues`
- `(envName: string, values: Record<string, string>) => void`
- Injects key-value pairs into the named environment. Call with an empty string to clear a value on sign-out.
---
- `setSelectedEnvironment`
- `(envName: string) => void`
- Switches Replay's active environment.
{% /table %}

### Example: sign-out button

```tsx {% title="@theme/components/ReplaySessionManager/ReplaySessionManager.tsx" %}
import React from 'react';
import type { ReplaySessionManagerProps } from '@redocly/theme/components/ReplaySessionManager/ReplaySessionManager';

const STORAGE_KEY     = 'replay_access_token';
const TOKEN_INPUT_NAME = 'bearerAuth_token';

export function ReplaySessionManager({
  environments,
  setEnvironmentValues,
}: ReplaySessionManagerProps) {
  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEY);
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

Ejecting `ReplayAuth` and `ReplaySessionManager` is useful for:

- **SSO enforcement**: require users to sign in with your company's identity provider before using Replay
- **Token pre-fill**: silently inject a stored token so users don't need to paste credentials manually
- **Multi-environment auth**: select different environments or token scopes based on the signed-in user's role
- **Session management**: add a sign-out button or session expiration indicator inside Replay

## Resources

- **[Configure Replay with dynamic API data](./configure-dynamic-replay-values.md)** - Fetch tokens and other request values dynamically using the `useConfigureReplay` hook
- **[Configure request values](./configure-request-values.md)** - Set static request values for headers, parameters, and security details in your OpenAPI descriptions
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components
- **[Customization](./index.md)** - Discover all customization options for your project
