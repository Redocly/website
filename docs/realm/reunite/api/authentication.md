# Authentication

Reunite API supports authenticated access using API keys and OAuth 2.0.
Authentication requirements are defined per endpoint in the OpenAPI specification.

## API keys

Use API keys for server-to-server integrations and automation.

### Create an API key

Follow the organization guide in [Manage API keys](../organization/api-keys.md).

### Send an API key

Send your key as a Bearer token:

```http
Authorization: Bearer <api_key>
```

### API key best practices

- store keys in a secure secret manager (never in frontend code)
- rotate keys regularly
- revoke keys that are no longer in use
- scope usage to the minimum set of endpoints and environments

## OAuth 2.0

OAuth 2.0 supports customer-facing use cases where delegated access and client lifecycle management are required.

Use OAuth2 when you need:

- managed client credentials per integration
- token rotation and expiration controls
- cleaner separation between organizations and integrations

When OAuth-protected endpoints return auth errors, responses follow OAuth-style error semantics.

## Create an OAuth 2.0 client

Follow the organization guide in [Manage OAuth2 clients](../organization/oauth2-clients.md).

## Endpoint-level security

Authentication is evaluated per operation:

- some endpoints may allow multiple auth methods
- some endpoints may be restricted to one method
- public endpoints are explicitly documented as unauthenticated

Always check each operation in the OpenAPI reference for the exact requirement.

## Authentication failures

Common authentication and authorization responses:

- `401 Unauthorized`: missing, invalid, or expired credentials
- `403 Forbidden`: credentials are valid but not allowed for the requested action
