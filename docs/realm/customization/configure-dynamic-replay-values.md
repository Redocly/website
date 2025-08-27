# Configure dynamic Replay values

You can dynamically configure request values for Replay by ejecting and customizing the `useConfigureReplay.ts` file.
This lets you fetch configuration from external APIs at runtime, updating based on the current operation.
The `useConfigureReplay` hook runs when the Replay is opened, ensuring you always get the latest configuration.

## Before you begin

Make sure you have the following:
- a `redocly.yaml` file located in the root directory of your project
- a basic understanding of TypeScript and React hooks
- OpenAPI description files with examples
- an external API endpoint to fetch configuration from

## Eject useConfigureReplay.ts

To customize dynamic Replay values, first eject the configuration file:

```bash
npx @redocly/cli eject component ext/useConfigureReplay.ts
```

This command creates a local copy of `useConfigureReplay.ts` in your project's `@theme` folder.

## Implement dynamic configuration

The `useConfigureReplay.ts` file exports a `useConfigureReplay` hook that fetches request values dynamically.
The hook receives a context parameter with operation details and returns request values that can be used for Replay.

Here's an example of how to implement dynamic Replay configuration:

```typescript
import { useEffect, useState } from 'react';

import type {
  ConfigureRequestValues,
  ConfigureServerRequestValues,
} from '@redocly/theme/ext/configure';

import { UserClaims, OpenAPIServer } from '@redocly/theme/core/types';

type ContextProps = {
  operation: {
    name: string;
    path: string;
    operationId: string;
    href: string;
    method: string;
  };
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

    const config = await response.json();
    
    return {
      security: {
        token: {
          access_token: config.accessToken,
        }
      }
    };
  } catch (error) {
    console.warn('Failed to fetch Replay configuration:', error);
    return null;
  }
}

export function useConfigureReplay(context: ContextProps, isOpened: boolean) {
  const [config, setConfig] = useState<
    ConfigureRequestValues | ConfigureServerRequestValues | null
  >();

  useEffect(() => {
    if (isOpened) {
      getReplayConfiguration(context)
        .then(setConfig)
        .catch((error) => {
          console.warn(
            'Failed to configure Replay for operation:',
            context.operation.operationId,
            error,
          );
        });
    }
  }, [isOpened]);

  return config;
}
```

## Use cases for dynamic Replay configuration

Dynamic Replay configuration is useful for:

- **Token management**: Fetching fresh access tokens from your authentication service
- **User-specific data**: Including user context in requests
- **Environment-specific values**: Retrieving configuration based on the current environment
- **External service integration**: Fetching configuration from third-party services

## Context parameter

The context parameter includes:

- `userClaims`: Information about the authenticated user and their original IdP tokens
  - `email`: User email
  - `name`: User name
  - `federatedAccessToken`: Access token of the original identity provider
  - `federatedIdToken`: ID token of the original identity provider
- `operation`: Details about the current API operation
  - `name`: Operation name
  - `path`: API path
  - `operationId`: Operation ID
  - `href`: Operation URL
  - `method`: HTTP method
- `servers`: Server information from the OpenAPI description

## Return types

The `useConfigureReplay` hook can return:

- `ConfigureRequestValues`: For setting global request values that apply to all servers
- `ConfigureServerRequestValues`: For setting different request values per server URL
- `null`: When configuration cannot be fetched or an error occurs

## Resources

- **[Configure request values](./configure-request-values.md)** - Set static request values for headers, parameters, and security details in your OpenAPI descriptions
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components for advanced request value handling and UI modifications