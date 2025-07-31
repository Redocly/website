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

MCP Server uses authentication to secure API access. This guide explains how to authenticate and use the MCP server securely and display APIs based on your permissions.

## Authentication flow

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

### Step 2: Authentication

AI Agent will provide you an information about the url and the code. You will need to open that link in the browser and log in using your account.

### Step 3: Check authentication status

After you've completed the authentication, AI Agent may check the status to confirm that the session is active using `auth_check_status` tool.

### Step 4: Make an authenticated API call

Once the authentication is successful, AI Agent will use the `sessionId` to make authenticated requests to the MCP APIs and retrieve information based on your permissions.

## Additional resources

- Learn how to [configure project roles and permissions](../../../access/roles.md).
- Understand [Role-based access control](../../../access/rbac.md).
- Review full `mcp` [configuration reference](../../../config/mcp.md).
