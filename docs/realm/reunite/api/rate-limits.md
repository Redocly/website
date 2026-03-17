# Rate limits

Reunite API applies rate limits to protect service stability and ensure fair usage across organizations.

Rate limit configuration is defined in the OpenAPI specification and is the source of truth.

## OpenAPI source of truth

Rate limiting is declared with an `x-rate-limit` extension:

```yaml
x-rate-limit:
  enabled: true
  events: 1000
  window: 1m
```

## How limits are applied

- Limits are enforced per **organization**.
- All API keys and OAuth clients for the same organization share the same counter bucket.
- Endpoint-level limits are defined in OpenAPI.
- Limits can be overridden per organization and per endpoint.

## What happens when a limit is exceeded

When a request exceeds its configured rate limit, the API returns:

- HTTP `429 Too Many Requests`

The response includes retry guidance headers:

- `Retry-After`: seconds to wait before retrying
- `X-RateLimit-Limit`: max allowed events in the current window
- `X-RateLimit-Remaining`: remaining events in the current window
- `X-RateLimit-Reset`: seconds until the counter window resets

## Implementation details

Reunite rate limiting is enforced at the gateway layer using [Caddy rate limit module](https://github.com/mholt/caddy-ratelimit).

## Request higher limits

If your integration needs higher throughput, contact support with:

- organization identifier
- endpoint(s) involved
- expected request rate and traffic profile
- business reason for the increase

For limit increase requests, contact `team@redocly.com`.
