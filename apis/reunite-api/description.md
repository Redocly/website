Reunite API is a REST API over HTTPS for accessing and managing Reunite resources.

The API supports the following use cases:

- Automation of organization and project workflows
- Integration with internal systems
- Development of customer-facing integrations

Technical characteristics:

- Resource-oriented URLs
- JSON request and response bodies
- Standard HTTP methods and status codes
- **JSON over HTTPS** for payloads
- **Filtering and search** on selected collection endpoints

Endpoint availability depends on subscription plan, organization settings, and product rollout status.
The OpenAPI specification is the authoritative reference.
Organizations for which an endpoint is not enabled should contact support.

## Authentication

The API supports **API keys** and **OAuth 2.0**.
Authentication requirements are defined per operation in the OpenAPI specification.

**Session-based authentication** establishes a session and stores the session identifier in the client browser.

**API keys** are intended for server-to-server integration.
API keys are created as described in [Manage API keys](https://redocly.com/docs/realm/reunite/organization/api-keys).
The key is transmitted as a Bearer token:

```http
Authorization: Bearer <api_key>
```

Keys must meet the following requirements:

- Stored in a secure secret management system (not in client-side application code)
- Rotated on a regular basis
- Revoked when no longer required
- Limited to the minimum set of endpoints and environments necessary for the integration

**OAuth 2.0** supports delegated access and managed client credentials:

- Per-integration credentials
- Token rotation
- Separation between organizations and integrations

Endpoints protected by OAuth return errors that conform to OAuth semantics.
OAuth 2.0 clients are created as described in [Manage OAuth 2.0 clients](https://redocly.com/docs/realm/reunite/organization/oauth2-clients).

Depending on the operation, endpoints may accept the following:

- Multiple authentication methods
- A single authentication method
- No authentication (publicly accessible endpoints are documented accordingly)

Each operation in the reference documentation specifies the applicable requirement.
Typical responses include:

- `401 Unauthorized` (missing, invalid, or expired credentials)
- `403 Forbidden` (credentials are valid but insufficient for the requested action)

## Pagination

List endpoints implement cursor-based pagination.
Each response includes a `page` object and the results in the `data` array.
`items` is a deprecated alias of `data`, kept only until its removal.

Supported query parameters:

- `limit`: values from `1` to `100`, default `10`
- `after` and `before`: cursor navigation
- `sort`: for example `-id` or `id`

The `page` object contains:

- `nextPage`: cursor for the next page, or `null` when there is no next page
- `previousPage`: cursor for the previous page, or `null` when there is no previous page
- `limit`

A typical sequence:

1. Request the first page with `?limit=10`.
2. Read `page.nextPage`.
3. Request subsequent pages with `?limit=10&after=<nextPage>`.
4. Continue until `nextPage` is `null`.

**Filtering** uses the `?filter=` parameter with `field:value` syntax.
Supported forms include:

- Exact match: `firstName:Casey`
- Case-insensitive substring match: `firstName~jo`
- Multiple values: `firstName:Casey,Jordan`, `status:success,pending`
- Numeric or date-time ranges: `amount:1..10`, ISO 8601 date-times
- Relative durations for date-time fields: `30d`, `2w`, `6mo`, `1y`, `all` (units: `s`, `m`, `h`, `d`, `w`, `mo`, `y`)
- Nested fields: `team.user.email:casey.smith@acme-inc.com`
- Negation: `-firstName:Casey`
- Logical operators: `AND`, `OR`

Combine multiple conditions by separating `field:value` pairs with a space.
A space is treated as an implicit `AND`, so `firstName:Casey isAdmin:true` and `firstName:Casey AND isAdmin:true` are equivalent.
Use `OR` to match alternatives.
`AND` binds more tightly than `OR`, so `role:admin OR role:editor isActive:true` is evaluated as `role:admin OR (role:editor AND isActive:true)`.
Grouping with parentheses is not supported.

For a single-valued field, comma-separated values and `OR` are equivalent: `role:admin,editor` matches the same records as `role:admin OR role:editor`.
They are not interchangeable when the field targets a to-many relation, when negation is applied (`-role:admin,editor` matches neither value, whereas `-role:admin OR -role:editor` matches every record), or when matching `null`.

Explicit date-time values use ISO 8601.
Values that contain spaces, commas, or `..` must be enclosed in quotation marks.
`number`, `boolean`, and `null` values do not require quotation marks.

```text
?filter=firstName:Casey
?filter=firstName~jo
?filter=firstName:Casey,Jordan
?filter=amount:1..10
?filter=createdAt:30d
?filter=team.user.email:casey.smith@acme-inc.com
?filter=-firstName:Casey
?filter=firstName:Casey isAdmin:true
?filter=firstName:Casey AND isAdmin:true
?filter=role:admin OR role:editor
?filter=createdAt:2021-02-14T13:30:00.000Z
?filter=description:"The story called \"The Sky and the Sea.\""
?search=casey
```

**Search** uses the `?search=` parameter where the operation supports it.
Behavior is defined per endpoint in the OpenAPI specification.

## Errors

Error responses commonly use the `application/problem+json` media type.
Fields may include:

- `type`
- `title`
- `status`
- `detail`
- `instance` (optional)
- `object` (always `problem`)
- `errors` (optional array)

Frequently returned HTTP status codes:

- `400`: validation failure or malformed input
- `401`: authentication failure
- `403`: authorization failure
- `404`: resource not found
- `409`: conflict with current state
- `429`: rate limit exceeded
- `500`: server error

Additional behavior:

- Certain endpoints may return `402` when access depends on subscription plan or billing state.
- OAuth-related flows may return RFC-style response bodies such as `{"error":"invalid_client"}`.

Troubleshooting:

- Begin with the HTTP status code.
- Review the `detail` and `errors` fields.

Support requests should include:

- The complete response payload
- Sufficient request context to reproduce the issue

## Rate limits

Rate limiting preserves service stability and equitable usage.

Limits are defined in the OpenAPI specification via the `x-rateLimit` extension.
These organization quotas apply to requests authenticated with an **API key** or **OAuth 2.0** access token that resolves to your organization.
Example properties:

- `events` - the number of events allowed within the window
- `window` - the time window in seconds

Enforcement:

- For API keys and OAuth clients, limits apply **per organization**: all credentials for the same organization share a single counter for a given limit.
- Unauthenticated traffic to public endpoints does **not** consume these organization counters; it is limited separately (for example by per-client protections at the edge).
  This avoids anonymous callers exhausting an organization's quota.
- Browser **session** authentication is subject to separate rate-limit rules from the organization `x-rateLimit` quotas above.
- Limits may be defined per endpoint.
- Limits may be overridden per organization or per endpoint.

When a request exceeds the applicable limit, the API returns `429 Too Many Requests` and includes a `Retry-After` header with the number of seconds to wait before the next request.

Requests for increased throughput should be sent to `team@redocly.com` and must include:

- Organization identifier
- Affected endpoints
- Expected request rate
- Business justification
