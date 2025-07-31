---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# MCP Server Authentication

The Catalog MCP server supports authenticated requests, ensuring that AI assistants can access only the APIs and operations permitted by the authenticated user's permissions. If authentication is not provided, all requests are processed as an anonymous user.

## Authentication workflow

The following steps describe how an AI agent authenticates with the MCP server to act on behalf of a user.

### Step 1: Initiate authentication

To start the authentication process, the AI agent calls the `auth_initiate_login` tool. The response contains a verification URL and a user code. The agent should present these to the user, instructing them to open the URL in their browser and enter the provided code to authorize access.

Example of response:
```json
{
  "sessionId": "sessionId",
  "userCode": "000000",
  "verificationUrl": "https://auth.cloud.redocly.com/device-login?userCode=000000",
  "expiresIn": 900,
  "message": "Please visit https://auth.cloud.redocly.com/device-login?userCode=000000 and enter code: 000000"
}
```

### Step 2: Check authentication status

After the user completes authentication in their browser, the AI agent will verify the session status by calling the `auth_check_status` tool. This confirms whether authentication was successful and the session is active.

### Step 3: Make authenticated API requests

When authentication is confirmed, AI Agent will use the returned `sessionId` to make authenticated requests to the MCP APIs. All actions and data access will be performed according to the authenticated user's permissions.

## Additional resources

- Learn how to [configure project roles and permissions](../../../access/roles.md).
- Understand [role-based access control](../../access/rbac.md).
- Review the full `mcp` [configuration reference](../../../config/mcp.md).
