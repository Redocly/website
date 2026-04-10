# Configure Replay with dynamic API data

You can dynamically configure request values for Replay by ejecting and customizing the `use-configure-replay.ts` file.
This lets you fetch configuration from external APIs at runtime, updating based on the current operation.
The `useConfigureReplay` hook fetches fresh configuration when the Replay is opened or when the 'Reset request' button is clicked, ensuring you always get the latest configuration.

## Before you begin

Make sure you have the following:

- a `redocly.yaml` file located in the root directory of your project
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

## Use cases for dynamic Replay configuration

Dynamic Replay configuration is useful for:

- **Token management**: fetching fresh access tokens from your authentication service
- **User-specific data**: including user context in requests
- **Environment-specific values**: retrieving configuration based on the current environment
- **Server variable configuration**: dynamically setting server variables for URLs
- **External service integration**: fetching configuration from third-party services

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
  - `ConfigureRequestValues`: set global request values that apply to all servers
  - `ConfigureServerRequestValues`: set different request values per server URL
  - `null`: when configuration cannot be fetched or an error occurs
- `refresh`: a function to manually refresh the configuration when called

## Resources

- **[Configure request values](./configure-request-values.md)** - Set static request values for headers, parameters, and security details in your OpenAPI descriptions
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components for advanced request value handling and UI modifications