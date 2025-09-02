# Configure request values

You can programmatically configure request values for your OpenAPI descriptions by ejecting and modifying the `configure.ts` file.
This feature enables you to set default values for headers, query parameters, path parameters, cookies, and security details that merge with existing examples in your OpenAPI description.

## Before you begin

Make sure you have the following:
- a `redocly.yaml` file located in the root directory of your project
- a basic understanding of TypeScript
- OpenAPI description files with examples

## Eject configure.ts

To customize request values, first eject the configuration file:

```bash
npx @redocly/cli eject component ext/configure.ts
```

This command creates a local copy of `configure.ts` in your project's `@theme` folder.

## Configure request values

The `configure.ts` file exports a `configure` function that receives a context parameter and returns request values.
The context parameter provides information about the current operation, user, and servers from the OpenAPI description, which you can use to dynamically configure request values.

### Return types

The `configure` function returns an object with a `requestValues` property that can be one of two types:

- `ConfigureRequestValues`: For setting global request values that apply to all servers
- `ConfigureServerRequestValues`: For setting different request values per server URL

```typescript
// Global request values (apply to all servers)
return {
  requestValues: {
    headers: { /* headers */ },
    body: { /* body */ },
    // ...other properties
  }
};

// Server-specific request values
return {
  requestValues: {
    'https://api.example.com/v1': {
      headers: { /* headers for this server */ },
      // ...other properties
    },
    'https://dev-api.example.com/v1': {
      headers: { /* headers for this server */ },
      // ...other properties
    }
  }
};
```

### Context Parameter

The context parameter includes:

- `userClaims`: Information about the authenticated user and their original IdP tokens (optional)
  - `email`: User email
  - `name`: User name
  - `federatedAccessToken`: Access token of the original identity provider.
    Requires `REDOCLY_OAUTH_USE_INTROSPECT` to be set to `true` in the environment variables.
  - `federatedIdToken`: ID token of the original identity provider.
    Requires `REDOCLY_OAUTH_USE_INTROSPECT` to be set to `true` in the environment variables.
- `info`: OpenAPI info object
- `operation`: Details about the current API operation
  - `name`: Operation name
  - `path`: API path
  - `operationId`: Operation ID (optional)
  - `href`: Operation URL (optional)
  - `method`: HTTP method
- `servers`: Server information from the OpenAPI description

Here's an example showing how to use context to configure request values:

```typescript {% title="configure.ts" %}
export function configure(context: {
  userClaims?: UserClaims;
  info: {
    title: string;
    description: string;
    // ... other OpenAPI info properties
  };
  operation: {
    name: string;
    path: string;
    operationId?: string;
    href?: string;
    method: string;
  };
  servers: OpenAPIServer[];
}) {
  const requestValues: ConfigureRequestValues = {
    headers: {
      'API-Key': userClaims.federatedAccessToken,
      // Use operation details to set custom headers
      'Operation-ID': context.operation.operationId || '',
      'Request-Method': context.operation.method,
    },
    query: {
      // Set different limits based on the operation
      limit: context.operation.path.includes('users') ? '20' : '10',
      offset: '0'
    },
    // Use authenticated user information if available
    body: context.userClaims ? {
      userId: context.userClaims.name,
      email: context.userClaims.email
    } : {
      name: 'John Doe',
      email: 'john@example.com'
    }
  };

  return { requestValues };
}
```

You can use the context to:
- Set different values based on the operation being called
- Include user-specific information in requests
- Customize security tokens based on the endpoint
- Apply different configurations for different HTTP methods
- Use server information to set environment-specific values

## Merge values

When you configure request values, they merge with existing examples in your OpenAPI description, rather than replacing them entirely.
Here's how merging works:

### Parameters

For headers, query parameters, path parameters, and cookies, configured values update the `example` field of matching parameters.
The parameter must already exist in your OpenAPI description.

### Request body

For request bodies, the configured values merge with existing example values:

- If the existing example is an object, properties are merged recursively.
- If the existing example is an array or primitive, it's replaced with the configured value.
- New properties are not added, only existing properties can be updated.

### Security

Security values update the corresponding security scheme configurations:

- OAuth2: updates access token
- Basic Auth: updates username and password
- API Key: updates the token value

{% admonition type="info" %}
The merging behavior ensures that configured values work within the constraints of your OpenAPI description while allowing dynamic updates.
{% /admonition %}

## Example with merging

Consider this OpenAPI example:

```yaml {% title="openapi.yaml" %}
paths:
  /users:
    post:
      requestBody:
        content:
          application/json:
            example:
              name: "Alice Smith"
              email: "alice@example.com"
              settings:
                notifications: true
                theme: "light"
```

If you configure these request values:

```typescript {% title="configure.ts" %}
export function configure() {
  return {
    requestValues: {
      body: {
        name: "Bob Wilson",
        settings: {
          notifications: false
        }
      }
    }
  };
}
```

The resulting merged example would be:

```json {% title="openapi-example.json" %}
{
  "name": "Bob Wilson",
  "email": "alice@example.com",
  "settings": {
    "notifications": false,
    "theme": "light"
  }
}
```

## Configure server-specific request values

You can configure different request values for different servers defined in your OpenAPI description.
This allows you to set server-specific configurations (for development, staging, production, etc.) based on server URLs.

The `configure.ts` file supports returning server-specific request values using the `ConfigureServerRequestValues` type, which maps server URLs to specific configurations.

Here's an example of how to configure server-specific request values:

```typescript {% title="configure.ts" %}
import { UserClaims, OpenAPIServer } from '@redocly/theme';

export function configure(context: {
  userClaims?: UserClaims;
  operation: {
    name: string;
    path: string;
    operationId?: string;
    href?: string;
    method: string;
  };
  servers: OpenAPIServer[];
}) {
  // Define server-specific configurations
  const devRequestValues = {
    body: {
      name: 'Development Product'
    },
    security: {
      username: 'dev_user',
      password: 'DevPassword123'
    }
  };

  const prodRequestValues = {
    body: {
      name: 'Production Product'
    },
    security: {
      username: 'prod_user',
      password: 'ProdPassword456'
    }
  };

  const defaultRequestValues = {
    body: {
      name: 'Default Product'
    },
    security: {
      username: 'default_user',
      password: 'DefaultPassword789'
    }
  };

  const serverRequestValues = {};
  
  // Map configurations to specific server URLs
  for (const server of context.servers) {
    if (server.url === 'https://dev-api.example.com/v1') {
      serverRequestValues[server.url] = devRequestValues;
    } else if (server.url === 'https://api.example.com/v1') {
      serverRequestValues[server.url] = prodRequestValues;
    } else {
      serverRequestValues[server.url] = defaultRequestValues;
    }
  }

  return {
    requestValues: serverRequestValues
  };
}
```

This approach allows you to:
- Define different configurations for different environments
- Map server URLs to specific configuration sets
- Dynamically select the appropriate configuration based on the server context
- Customize headers, security, parameters, and other values per environment

When using server-specific request values, the appropriate configuration will be applied based on the selected server in the API reference or API explorer.

## Configure environment variables for code samples

You can use the `envVariables` field to provide values for environment variables used in custom code samples that are included in your OpenAPI description with the `x-codeSamples` extension.

When you define environment variables in your request values, they will replace placeholders in code samples that follow the format `{{VARIABLE_NAME}}`.

Here's an example of how to configure environment variables:

```typescript {% title="configure.ts" %}
export function configure() {
  return {
    requestValues: {
      // Other request values
      headers: {
        'API-Key': 'your-api-key'
      },
      // Environment variables for code samples
      envVariables: {
        API_KEY: 'your-api-key',
        API_ENDPOINT: 'https://api.example.com/v1',
        ACCESS_TOKEN: 'your-access-token'
      }
    }
  };
}
```

With this configuration, any occurrence of `{{API_KEY}}`, `{{API_ENDPOINT}}`, or `{{ACCESS_TOKEN}}` in your custom code samples will be replaced with the corresponding values.

You can also configure server-specific environment variables:

```typescript {% title="configure.ts" %}
export function configure(context) {
  const serverRequestValues = {};
  
  for (const server of context.servers) {
    if (server.url === 'https://dev-api.example.com/v1') {
      serverRequestValues[server.url] = {
        envVariables: {
          API_KEY: 'dev-api-key',
          API_ENDPOINT: server.url,
          DEBUG: 'true'
        }
      };
    } else if (server.url === 'https://api.example.com/v1') {
      serverRequestValues[server.url] = {
        envVariables: {
          API_KEY: 'prod-api-key',
          API_ENDPOINT: server.url,
          DEBUG: 'false'
        }
      };
    }
  }
  
  return {
    requestValues: serverRequestValues
  };
}
```

This allows you to provide different environment variable values based on the selected server, making your code samples more relevant to each environment.

## Resources

- **[x-codeSamples extension](../content/api-docs/openapi-extensions/x-code-samples.md)** - Add custom code samples to your OpenAPI description that work with configured request values for enhanced API documentation
- **[Component ejection guide](./eject-components/index.md)** - Learn to eject and customize built-in components for advanced request value handling and UI modifications
