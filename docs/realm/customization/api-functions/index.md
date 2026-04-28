---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# API functions

With Realm you can create API functions to add dynamic and interactive content.

Define API endpoints by creating files in the `@api` directory.
These endpoints can interact with other APIs, implement custom authentication, or connect to databases.

## Common use cases

Use API functions to:

- Integrate with external APIs: fetch data from services like GitHub using secret tokens stored in environment variables.
  For example, retrieve pull requests, issues, or repository statistics to display within a Markdoc tag or generate dynamic documentation content.
- Add custom authentication: inject your app's own API credential system into the project.
- Integrate a payment gateway: securely process payments by integrating with external payment services, keeping API keys and sensitive data server-side.
- Interact with databases: connect to databases like PostgreSQL or MongoDB to fetch, update, and serve data within your project.
- Cache data with built-in storage: use [KV storage](./kv-storage.md) to store, retrieve, and manage data without external database setup.

## Resources

- [API functions reference](./api-functions-reference.md) for API functions helper methods and properties.
- [KV storage](./kv-storage.md) for built-in key-value database operations.
- [Render weather data in a Markdoc tag](./create-api-functions.md) - Build an API function and a custom Markdoc tag that displays live weather data.
