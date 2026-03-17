# Introduction

Reunite API gives you programmatic access to Reunite resources.
Use it to automate workflows, integrate with internal systems, and build customer-facing integrations.

API uses predictable resource-oriented URLs, standard HTTP status codes, and JSON request and response bodies.

## Base URL

Use the server URL shown in the OpenAPI specification for your environment.
For production, this is:

```text
https://app.cloud.redocly.com/api
```

## Who this API is for

You can use Reunite API to:

- manage organization-level resources
- access project and deployment data
- automate operational tasks in your toolchain
- build internal or customer integrations

Selected endpoints are available to customers.
The OpenAPI specification is the source of truth for current availability.

## API style and conventions

- **JSON over HTTPS** for request and response payloads.
- **Authentication required** for protected endpoints (API key or OAuth 2.0, depending on endpoint support).
- **Cursor-based pagination** on list endpoints.
- **Filtering and search** supported on selected collection endpoints.
- **Standardized errors** returned as `application/problem+json`.

## Availability and compatibility

Endpoint availability and access model can vary by plan, organization settings, and rollout status.
If an endpoint is not enabled for your organization, contact support for guidance.
