---
products:
  - Redoc
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Configure Replay with dynamic API data

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

You can dynamically configure request values for Replay by ejecting and customizing the `use-configure-replay.ts` file.
This lets you fetch configuration from external APIs at runtime, updating based on the current operation.
The `useConfigureReplay` hook fetches fresh configuration when the Replay is opened or when the 'Reset request' button is clicked, ensuring you always get the latest configuration.

## Before you begin

Make sure you have the following:

- a basic understanding of TypeScript and React hooks
- OpenAPI description files with examples
- an external API endpoint to fetch configuration from

## Eject use-configure-replay.ts

To customize dynamic Replay values, first eject the configuration file:

```bash
npx @redocly/cli eject component ext/use-configure-replay.ts
```

This command creates a local copy of `use-configure-replay.ts` in your project's `@theme` folder.

## Implement dynamic configuration

The `use-configure-replay.ts` file exports a `useConfigureReplay` hook that fetches request values dynamically.
The hook receives a context parameter with operation details and returns an object containing the configuration and a refresh function that can be used to manually reload the configuration.

Here are examples of how to implement dynamic Replay configuration:

{% tabs %}
{% tab label="Global request values" %}
```typescript {% title="use-configure-replay.ts" %}
import { useEffect, useState, useCallback } from 'react';

import type {
  ConfigureRequestValues,
  ConfigureServerRequestValues,
} from '@redocly/theme/ext/configure';
import type { UserClaims, OpenAPIServer, OpenAPIInfo } from '@redocly/theme/core/types';

type ContextProps = {
  operation: {
    name: string;
    path: string;
    operationId: string;
    href: string;
    method: string;
  };
  info: OpenAPIInfo;
  servers: OpenAPIServer[];
  userClaims: UserClaims;
};

async function getReplayConfiguration(
  context: ContextProps,
): Promise<ConfigureRequestValues | ConfigureServerRequestValues | null> {
  try {
    const response = await fetch(`/api/replay-config/${context.operation.operationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { token } = await response.json();
  
    // Return global request values that apply to all servers
    return {
      security: {
        default: {
          token: {
            access_token: token
          }
        }
      }
    };
  } catch (error) {
    console.warn('Failed to fetch replay configuration:', error);
    throw error;
  }
}

export function useConfigureReplay(context: ContextProps, isOpened: boolean) {
  const [config, setConfig] = useState<
    ConfigureRequestValues | ConfigureServerRequestValues | null
  >();

  const refresh = useCallback(async () => {
    try {
      const result = await getReplayConfiguration(context);
      setConfig(result);
    } catch (error) {
      console.warn(
        'Failed to configure replay for operation:',
        context.operation.operationId,
        error,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpened) {
      refresh();
    }
  }, [isOpened, refresh]);

  return { config, refresh };
}
```
{% /tab %}

{% tab label="Server-specific request values" %}
```typescript {% title="use-configure-replay.ts" %}
import { useEffect, useState, useCallback } from 'react';

import type {
  ConfigureRequestValues,
  ConfigureServerRequestValues,
} from '@redocly/theme/ext/configure';
import type { UserClaims, OpenAPIServer, OpenAPIInfo } from '@redocly/theme/core/types';

type ContextProps = {
  operation: {
    name: string;
    path: string;
    operationId: string;
    href: string;
    method: string;
  };
  info: OpenAPIInfo;
  servers: OpenAPIServer[];
  userClaims: UserClaims;
};

async function getReplayConfiguration(
  context: ContextProps,
): Promise<ConfigureRequestValues | ConfigureServerRequestValues | null> {
  try {
    const response = await fetch(`/api/replay-config/${context.operation.operationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { token, host } = await response.json();
  
    // Return server-specific request values
    return {
      'https://{api_host}/v1.1': {
        security: {
          default: {
            token: {
              access_token: token
            }
          }
        },
        serverVariables: {
          api_host: host
        }
      }
    };
  } catch (error) {
    console.warn('Failed to fetch replay configuration:', error);
    throw error;
  }
}

export function useConfigureReplay(context: ContextProps, isOpened: boolean) {
  const [config, setConfig] = useState<
    ConfigureRequestValues | ConfigureServerRequestValues | null
  >();

  const refresh = useCallback(async () => {
    try {
      const result = await getReplayConfiguration(context);
      setConfig(result);
    } catch (error) {
      console.warn(
        'Failed to configure replay for operation:',
        context.operation.operationId,
        error,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpened) {
      refresh();
    }
  }, [isOpened, refresh]);

  return { config, refresh };
}
```
{% /tab %}
{% /tabs %}

## Configure security credentials

Here's an example showing how to fetch security credentials from an API and apply them to different security schemes in your OpenAPI description:

```yaml {% title="openapi.yaml" %}
openapi: 3.0.0
info:
  title: Museum API
  version: 1.0.0
components:
  securitySchemes:
    MuseumPlaceholderAuth:
      type: http
      scheme: basic
    BearerAuth:
      type: http
      scheme: bearer
```

```typescript {% title="use-configure-replay.ts" %}
import { useEffect, useState, useCallback } from 'react';

import type {
  ConfigureRequestValues,
  ConfigureServerRequestValues,
} from '@redocly/theme/ext/configure';
import type { UserClaims, OpenAPIServer, OpenAPIInfo } from '@redocly/theme/core/types';

type ContextProps = {
  operation: {
    name: string;
    path: string;
    operationId: string;
    href: string;
    method: string;
  };
  info: OpenAPIInfo;
  servers: OpenAPIServer[];
  userClaims: UserClaims;
};

async function getReplayConfiguration(
  context: ContextProps,
): Promise<ConfigureRequestValues | ConfigureServerRequestValues | null> {
  try {
    const response = await fetch(`/api/replay-config/${context.operation.operationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { token, username, password } = await response.json();
  
    return {
      security: {
        default: {
          token: {
            access_token: token
          }
        },
        MuseumPlaceholderAuth: {
          username,
          password
        }
      }
    };
  } catch (error) {
    console.warn('Failed to fetch replay configuration:', error);
    throw error;
  }
}

export function useConfigureReplay(context: ContextProps, isOpened: boolean) {
  const [config, setConfig] = useState<
    ConfigureRequestValues | ConfigureServerRequestValues | null
  >();

  const refresh = useCallback(async () => {
    try {
      const result = await getReplayConfiguration(context);
      setConfig(result);
    } catch (error) {
      console.warn(
        'Failed to configure replay for operation:',
        context.operation.operationId,
        error,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpened) {
      refresh();
    }
  }, [isOpened, refresh]);

  return { config, refresh };
}
```

In this example:
- `BearerAuth` uses the Bearer token from `default`
- `MuseumPlaceholderAuth` uses the specific Basic Auth credentials

## Share values across operations with `envVariables`

`envVariables` lets users enter a value once and have Replay reuse it in every operation that needs it — even when the same value is a header on one endpoint and a path parameter on another.
Each entry in `envVariables` is matched by name against every input the current operation exposes (path, query, header, cookie, and security inputs), so you don't need any per-operation configuration.

For example:

```typescript
return {
  envVariables: {
    'X-Tenant-Id': 'acme',
    'billerId': '42',
  },
};
```

With a single config like this, the same `billerId` entry can apply to a path parameter in one operation and a header in another, while `X-Tenant-Id` is picked up wherever it appears.
Entries the current operation doesn't declare are silently ignored.

### Example: shared variables form backed by `localStorage`

A common pattern is to collect these values from the user in a [React page](./create-react-page.md), persist them in `localStorage`, and read them back in `useConfigureReplay`.

{% admonition type="warning" name="Avoid persisting secrets" %}
`localStorage` persists indefinitely and is readable by any script on the page, so it's vulnerable to XSS.
For sensitive credentials, prefer `sessionStorage`, which is cleared when the session ends.
{% /admonition %}

```tsx {% title="api-variables.page.tsx" %}
import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'replay_shared_variables';

function readVariables() {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

export default function ApiVariablesPage() {
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    setVariables(readVariables());
  }, []);

  const updateVariable = (name: string, value: string) => {
    const next = { ...variables, [name]: value };
    setVariables(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div style={{ padding: 40, maxWidth: 480 }}>
      <h1>API variables</h1>
      <p>Enter these values once. They are reused by every operation in the catalog.</p>

      <label>X-Tenant-Id
        <input
          value={variables['X-Tenant-Id'] ?? ''}
          onChange={(e) => updateVariable('X-Tenant-Id', e.target.value)}
        />
      </label>
      <label>Biller ID
        <input
          value={variables.billerId ?? ''}
          onChange={(e) => updateVariable('billerId', e.target.value)}
        />
      </label>
    </div>
  );
}
```

Then, in the ejected `use-configure-replay.ts`, swap the body of `getReplayConfiguration` to read from `localStorage` and return the values as `envVariables`:

```typescript {% title="use-configure-replay.ts (excerpt)" %}
const STORAGE_KEY = 'replay_shared_variables';

async function getReplayConfiguration(
  context: ContextProps,
): Promise<ConfigureRequestValues | ConfigureServerRequestValues | null> {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);

  return { envVariables: raw ? JSON.parse(raw) : {} };
}
```

The rest of the hook (state, `refresh`, `useEffect`) stays exactly as in the [examples above](#implement-dynamic-configuration).

## Override behavior

A few things worth knowing:

- An **empty string** is treated as "clear this value" — useful when a value in your app gets reset and you want Replay to forget the old one too. Omit the key entirely if you want the persisted value to stay.
- A field-specific entry (such as `security.default.token.access_token` or `headers['X-Tenant-Id']`) wins over a same-named entry in `envVariables`.

## Empty input hints (`inputHints`)

When an input is defined but has no value (for example `${inputs.bearerAuth_token}` in Try it), Replay shows a tooltip.
Use `inputHints` in the object returned from `getReplayConfiguration` to customize that message for each input name.

You can add titles, descriptions, and optional action buttons to empty-input tooltips.

Input names match environment variable names generated from your OpenAPI security schemes (for example `bearerAuth_token` for a scheme id `bearerAuth`).
Use the `"default"` key as a fallback when no input-specific hint exists.

### Root-level and server-level hints

`inputHints` can be set at the root level (a shared default that applies to every server) and/or nested under a server entry when you return `ConfigureServerRequestValues`.
Unlike the other request values (`headers`, `security`, `envVariables`, and so on), where a server-keyed entry replaces the root value for that server, `inputHints` from both levels are combined — the server level takes priority and the root level fills in the rest.
Resolution for a given input follows this precedence:

1. The server-level hint for the active server (by input name, then its `"default"`).
2. The root-level hint (by input name, then its `"default"`).
3. Replay's standard "undefined input" message when neither level resolves a hint.

This lets you keep a shared set of root-level hints and override individual inputs per server.

```typescript {% title="use-configure-replay.ts (excerpt)" %}
return {
  // Root-level hints apply to every server.
  inputHints: {
    bearerAuth_token: { title: 'Sign in to auto-fill', text: 'Added automatically after sign-in.' },
    default: { title: 'Missing input value', text: 'Set a value in the environment.' },
  },
  // Server-level values, with an optional per-server hint override.
  'https://api.example.com/v2': {
    security: { default: { token: { access_token: '' } } },
    inputHints: {
      bearerAuth_token: { title: 'Production token', text: 'Use your production credentials.' },
    },
  },
};
```

### `actions` behavior

{% table %}
- `actions`
- Tooltip footer
---
- omitted or `undefined`
- Custom title and text, then the default **Set value** button
---
- `[]`
- Custom title and text only (no buttons)
---
- `[{ label, action }, ...]`
- Custom title and text, then your buttons (`action` runs on click)
{% /table %}

`action` must be a function returned from `getReplayConfiguration` in your theme (not from a JSON API response).

### Example for unauthenticated users

```typescript {% title="use-configure-replay.ts (excerpt)" %}
if (!context.userClaims?.email) {
  return {
    inputHints: {
      bearerAuth_token: {
        title: 'Sign in to auto-fill',
        text: 'This authorization token is added automatically after you sign in.',
        actions: [
          {
            label: 'Sign in',
            action: () => {
              window.location.assign('/login');
            },
          },
        ],
      },
    },
    security: {
      default: {
        token: {
          access_token: '',
        },
      },
    },
  };
}
```

When the user is signed in, return `security` / `envVariables` with real values and omit `inputHints`.

## Use cases for dynamic Replay configuration

Dynamic Replay configuration is useful for:

- **Token management**: fetching fresh access tokens from your authentication service
- **User-specific data**: including user context in requests
- **Environment-specific values**: retrieving configuration based on the current environment
- **Server variable configuration**: dynamically setting server variables for URLs
- **External service integration**: fetching configuration from third-party services
- **Empty input messaging**: explaining why credentials are empty and linking to sign-in or docs via `inputHints`

## Context parameter

The context parameter includes:

- `userClaims`: information about the authenticated user and their original IdP tokens
  - `email`: user email
  - `name`: user name
  - `federatedAccessToken`: access token of the original identity provider.
    Requires `REDOCLY_OAUTH_USE_INTROSPECT` to be set to `true` in the environment variables.
  - `federatedIdToken`: ID token of the original identity provider.
    Requires `REDOCLY_OAUTH_USE_INTROSPECT` to be set to `true` in the environment variables.
- `operation`: details about the current API operation
  - `name`: operation name
  - `path`: API path
  - `operationId`: operation ID
  - `href`: operation URL
  - `method`: HTTP method
- `info`: OpenAPI info object
- `servers`: server information from the OpenAPI description

## Return types

The `useConfigureReplay` hook returns an object with:

- `config`: the request values configuration, which can be:
  - `ConfigureRequestValues`: set global request values that apply to all servers (including optional `inputHints`)
  - `ConfigureServerRequestValues`: set different request values per server URL (each server entry may include `inputHints`)
  - `null`: when configuration cannot be fetched or an error occurs
- `refresh`: a function to manually refresh the configuration when called

## Resources

- **[Configure request values](./configure-request-values.md)** - Set static request values for headers, parameters, and security details in your OpenAPI descriptions
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components for advanced request value handling and UI modifications
- **[Customization](./index.md)** - Discover customizable components and customization options for your project
