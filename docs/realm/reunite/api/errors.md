# Errors

Reunite API uses conventional HTTP status codes and returns structured error payloads.
Most error responses use `application/problem+json`.

## Error format

Standard error payloads follow a problem-details structure:

- `type`: URI-like identifier for the problem type
- `title`: short summary of the error
- `status`: HTTP status code
- `detail`: human-readable explanation for this occurrence
- `instance`: optional identifier for the specific occurrence
- `object`: always `problem`
- `errors`: optional array with additional details

## Common HTTP status codes

- `400 Bad Request` - request validation failed or input is malformed
- `401 Unauthorized` - missing, invalid, or expired credentials
- `403 Forbidden` - authenticated but not allowed to perform the action
- `404 Not Found` - requested resource does not exist
- `409 Conflict` - request conflicts with existing state (for example duplicate resources)
- `429 Too Many Requests` - rate limit exceeded
- `500 Internal Server Error` - unexpected server-side failure

Some endpoints can also return:

- `402 Payment Required` - access depends on plan or billing state

## OAuth 2.0 error responses

OAuth 2.0 flows may return RFC-style OAuth errors, such as:

```json
{
  "error": "invalid_client"
}
```

## Debug errors

- Use the HTTP status code first to identify category (auth, validation, conflict, server).
- Inspect `detail` and `errors` fields for actionable fixes.
- If an issue persists, include full response payload and request context when contacting support.
