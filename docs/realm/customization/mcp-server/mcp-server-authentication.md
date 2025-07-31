---
products:
  - Realm
  - Reef
plans:
  - Pro
  - Enterprise
  - Enterprise+
---

# MCP Server authentication

MCP Server uses OAuth2 authentication to secure API access. This guide explains how to authenticate and use the MCP server securely and display APIs based on your permissions.

## OAuth2

Process for authenticating with the MCP server and making an authenticated API call.

### Step 1: Initiate authentication

Firstly, initiate the authentication process using `auth_initiate_login` tool. This provides a URL and a code for you to complete the login in your browser. 

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

After you've completed the authentication in your browser, you check the status to confirm that the session is active using `auth_check_status` tool.

### Step 3: Make an authenticated API call

Once the authentication is successful, you can use the sessionId to make authenticated requests to the MCP APIs. And retrieve information based on your permissions. 

## Resources

- Configure [project roles and permissions](../../access/roles.md).
- [Role-based access control](../../access/rbac.md).
- View full configuration details in the `mcp` [configuration reference](../../config/mcp.md).