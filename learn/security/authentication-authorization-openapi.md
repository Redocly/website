---
title: Authentication and Authorization with OpenAPI
description: Implement secure access control using OpenAPI security schemes and modern authentication patterns.
seo:
  title: Authentication and Authorization with OpenAPI
  description: Implement secure access control using OpenAPI security schemes and modern authentication patterns.
---

# Authentication and authorization with OpenAPI

---

## Key takeaways

Authentication and authorization form the foundation of API access control. While often used interchangeably, these concepts serve distinct purposes: authentication verifies *who* the user is, while authorization determines *what* they can do. Modern APIs require both layers to prevent unauthorized access and enforce business rules.

In this guide, we'll explore how to use OpenAPI 3.1 security schemes to define robust access control patterns that integrate seamlessly with automated governance and modern authentication providers.

**We'll cover how to:**
- [Define authentication methods (JWT, OAuth2, API Keys, mTLS)](#authentication-methods) in OpenAPI specifications
- [Implement advanced authorization patterns](#advanced-authorization-patterns) with granular permissions
- [Enforce security requirements through automated governance](#automated-governance-for-access-control)
- [Configure API gateways from OpenAPI security definitions](#api-gateway-integration)
- [Monitor and troubleshoot authentication and authorization failures](#authentication-and-authorization-monitoring)

---

## Quick start guide

Ready to implement authentication and authorization? Start here:

1. **Choose your authentication method:** Review [Authentication Methods](#authentication-methods) and select JWT Bearer, OAuth2, API Keys, or mTLS based on your needs
2. **Set up governance:** Implement [automated governance rules](#automated-governance-for-access-control) to prevent accidentally public endpoints
3. **Configure your gateway:** Use [API gateway integration](#api-gateway-integration) to automatically enforce your OpenAPI security definitions  
4. **Add monitoring:** Set up [authentication and authorization monitoring](#authentication-and-authorization-monitoring) to track security violations
5. **Plan for issues:** Review [troubleshooting common issues](#troubleshooting-common-issues) and implement [best practices](#best-practices-summary)

**Next Steps:** Now that you have authentication and authorization in place, explore the complete [API Security by Design guide](/learn/security) to learn about other essential security domains like TLS encryption, input validation, and rate limiting.

---

## Understanding authentication vs authorization

The distinction between authentication and authorization is fundamental to API security design. Understanding this difference helps you implement the right controls at the right layers.

### The two-phase security process

```mermaid
sequenceDiagram
    participant U as User
    participant A as API Gateway
    participant Auth as Auth Service
    participant API as API Endpoint
    
    Note over U,API: Authentication Phase
    U->>A: 1. Request with credentials
    A->>Auth: 2. Verify identity
    Auth->>A: 3. Identity confirmed + token
    A->>U: 4. Return access token
    
    Note over U,API: Authorization Phase  
    U->>A: 5. API request + token
    A->>A: 6. Validate token
    A->>A: 7. Check permissions/scopes
    
    alt Authorized
        A->>API: 8. Forward request
        API->>A: 9. Response
        A->>U: 10. Return response
    else Unauthorized
        A->>U: 11. 403 Forbidden
    end
```

*Sequence diagram showing the two-phase process: authentication verifies who the user is, while authorization determines what they can do. Both phases are essential for secure API access control.*

**Authentication (Who are you?):**
- Verifies the identity of the caller
- Typically involves credentials like passwords, API keys, or certificates
- Results in a token or session that proves identity
- Usually happens once per session or token lifetime

**Authorization (What can you do?):**
- Determines what resources and operations the authenticated user can access
- Based on permissions, roles, scopes, or policies
- Evaluated for each request to protected resources
- Can be fine-grained (specific endpoints) or coarse-grained (broad permissions)

### Common authentication patterns

**[API Keys](#authentication-methods):**
- Simple, stateless authentication
- Often used for service-to-service communication
- Limited authorization capabilities (typically binary: access or no access)

**[JWT Bearer Tokens](#authentication-methods):**
- Self-contained tokens with embedded claims
- Support fine-grained authorization through scopes and claims
- Stateless validation (no database lookup required)
- Industry standard for modern APIs

**[OAuth2 with PKCE](#authentication-methods):**
- Delegated authorization framework
- Supports multiple grant types and client types
- Built-in scope-based authorization
- Recommended for user-facing applications

## Defining security schemes in OpenAPI

OpenAPI 3.1 provides a robust framework for defining access control through two primary constructs:

1. **`components.securitySchemes`**: Defines *how* clients can authenticate (JWT Bearer, OAuth2, API Keys)
2. **`security`**: Specifies *that* an endpoint is secured and by which mechanism(s)

## Authentication methods

Choose the authentication method that best fits your use case:

{% tabs %}
  {% tab label="JWT Bearer Token" %}

### JWT bearer token authentication

JWT (JSON Web Token) Bearer authentication is the most common pattern for modern APIs. The token contains encoded claims about the user and can be validated without database lookups.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer           # [!code highlight] Standard Bearer token scheme
      bearerFormat: JWT        # [!code highlight] Specify JWT format
      description: "Enter JWT with 'Bearer ' prefix"

# Apply globally to all operations  # [!code highlight]
security:
  - bearerAuth: []            # [!code highlight] Require authentication for all endpoints
```

**What this configuration does:**

- **`type: http`** - Uses standard HTTP authentication (as opposed to API keys or OAuth2 flows)
- **`scheme: bearer`** - Specifies Bearer token authentication, where tokens are sent in the `Authorization: Bearer <token>` header
- **`bearerFormat: JWT`** - Documents that tokens must be valid JWTs (helps with API documentation and client generation)
- **`security: - bearerAuth: []`** - Applies this authentication requirement to all endpoints globally (individual endpoints can override this)

This approach ensures every API request includes a valid JWT token, preventing anonymous access to protected resources.

**JWT Token Structure:**
```javascript {% title="JWT Token Anatomy - 3 Parts Separated by Dots" %}
// PART 1: HEADER - Defines how the token is secured  // [!code highlight]
{
  "alg": "RS256",    // CRITICAL: Use RS256, not HS256 (prevents key confusion attacks)
  "typ": "JWT",      // Token type declaration (required for JWT processing)
  "kid": "key-123"   // Key ID helps API find correct public key for verification
}

// PART 2: PAYLOAD - Contains user identity and permissions (NEVER put secrets here!)  // [!code highlight]
{
  // Standard Claims (RFC 7519) - These provide security guarantees
  "sub": "user123",                           // Subject: Who this token represents
  "iss": "https://auth.example.com",          // Issuer: MUST be HTTPS URL you trust
  "aud": ["api.example.com", "admin.example.com"],  // Audience: APIs that accept this token
  "exp": 1640995200,                          // Expiration: REQUIRED - limits blast radius if stolen
  "nbf": 1640991600,                          // Not Before: Token invalid before this time
  "iat": 1640991600,                          // Issued At: When token was created
  "jti": "unique-token-id",                   // JWT ID: Unique identifier (helps with revocation)
  
  // Custom Claims - Your application-specific data
  "scopes": ["users:read", "orders:write"],   // Permissions: What user can do
  "role": "customer",                         // Role-based access control
  "email": "user@example.com",               // PII: Consider privacy implications
  "premium": true                            // Feature flags or user attributes
}

// PART 3: SIGNATURE - Cryptographic proof token wasn't tampered with  // [!code highlight]
RSASHA256(
  base64UrlEncode(header) + "." +             // Header and payload concatenated
  base64UrlEncode(payload),
  private_key                                 // NEVER expose this key - stay with auth server only!
)

// Security Notes:  // [!code highlight]
// 1. JWT is NOT encrypted - anyone can read header/payload (use JWE if needed)  // [!code highlight]
// 2. Signature prevents tampering but doesn't hide content  // [!code highlight]
// 3. Short expiration times (15-60 minutes) limit security exposure  // [!code highlight]
// 4. Always validate iss, aud, exp claims before trusting token  // [!code highlight]
```

**Understanding each JWT component:**

**Header:**
- **`"alg": "RS256"`** - Specifies RSA SHA-256 signature algorithm, which uses public/private key pairs for security. This prevents token tampering since only the authorization server has the private key to sign tokens.
- **`"typ": "JWT"`** - Declares this is a JWT token (helps parsers know how to handle it)

**Payload (Claims):**
- **`"sub": "user123"`** - Subject claim identifies the user this token represents. Your API uses this to know *who* is making the request.
- **`"iss": "https://auth.example.com"`** - Issuer claim identifies which authorization server created this token. Your API should validate this matches your trusted auth server.
- **`"aud": "api.example.com"`** - Audience claim specifies which API this token is intended for. Prevents token reuse across different services.
- **`"exp": 1640995200"`** - Expiration timestamp (Unix time). Tokens automatically become invalid after this time, limiting damage if compromised.
- **`"iat": 1640991600"`** - Issued at timestamp. Helps with token lifecycle tracking and debugging.
- **`"scopes": ["users:read", "orders:write"]`** - Custom claim listing what permissions this user has. Your authorization logic checks these scopes.

**Signature:**
- Created by signing the encoded header and payload with the authorization server's private key
- Your API validates signatures using the corresponding public key
- If signature verification fails, the token is invalid (likely tampered with or forged)

{% /tab %}
{% tab label="OAuth2 with Scopes" %}

### OAuth2 with scope-based authorization

OAuth2 provides the most flexible authorization framework, supporting fine-grained permissions through scopes and multiple authentication flows.

```yaml {% title="openapi.yaml - OAuth2 with Security Best Practices" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      # CRITICAL: Always use Authorization Code + PKCE for security
      description: "OAuth2 Authorization Code Flow with PKCE - prevents CSRF and injection attacks"
      flows:
        authorizationCode:
          # STEP 1: Authorization URL - where users consent to permissions
          authorizationUrl: https://auth.example.com/authorize  # [!code highlight] HTTPS REQUIRED - never use HTTP
          
          # STEP 2: Token endpoint - where your app exchanges codes for tokens  
          tokenUrl: https://auth.example.com/token              # [!code highlight] HTTPS REQUIRED - never use HTTP
          
          # STEP 3: Define permission scopes using principle of least privilege
          scopes:
            # User-level permissions (granular access control)
            'users:read': "View user profile information"         # [!code focus] Read-only access
            'users:write': "Modify user profile data"           # [!code warning] Write access - more sensitive
            'users:delete': "Delete user accounts"              # [!code error] High-privilege operation
            
            # Resource-specific permissions
            'orders:read': "View order history and details"      # [!code focus] Customer data access
            'orders:write': "Create and modify orders"          # [!code warning] Financial operations
            'orders:refund': "Process order refunds"           # [!code error] High-value operations
            
            # Administrative permissions (highest privilege)
            'admin:users': "Full user management access"        # [!code error] Admin-only scope
            'admin:system': "System configuration access"       # [!code error] Infrastructure access

paths:
  /users/{userId}:
    get:
      summary: "Get user profile"
      # STEP 4: Require specific permissions for each operation
      security:
        - oauth2Auth: ['users:read']  # [!code highlight] Minimal required scope
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid                # [!code focus] Use UUIDs to prevent enumeration attacks
      responses:
        '200':
          description: "User profile data"
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':                        # [!code error] No valid token provided
          description: "Authentication required - token missing or invalid"
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnauthorizedError'
        '403':                        # [!code error] Valid token but insufficient permissions  
          description: "Insufficient permissions - requires users:read scope"
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ForbiddenError'
    
    patch:
      summary: "Update user profile"
      security:
        - oauth2Auth: ['users:write']  # [!code warning] Higher privilege required
      # STEP 5: Document security requirements clearly
      description: |
        Updates user profile information. Requires 'users:write' scope.
        
        **Security Notes:**
        - Users can only modify their own profiles unless they have admin:users scope
        - Sensitive fields like email changes may require additional verification
        - All changes are logged for audit purposes
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfileUpdate'
      responses:
        '200':
          description: "Profile updated successfully"
        '401':                        # [!code error] Authentication failure
          description: "Authentication required"
        '403':                        # [!code error] Authorization failure
          description: "Insufficient permissions - requires users:write scope"
        '422':                        # [!code warning] Validation errors
          description: "Invalid input data"

# STEP 6: Define common error schemas for consistent security responses
components:
  schemas:
    UnauthorizedError:
      type: object
      properties:
        error:
          type: string
          example: "Authentication required"
        message:
          type: string  
          example: "Please provide a valid Bearer token"
          
    ForbiddenError:
      type: object
      properties:
        error:
          type: string
          example: "Insufficient permissions"
        required_scopes:               # [!code focus] Help developers understand what's needed
          type: array
          items:
            type: string
          example: ["users:write"]
```

**Breaking down this OAuth2 configuration:**

**Security Scheme Definition:**
- **`type: oauth2`** - Declares this uses the OAuth2 standard for authorization
- **`authorizationCode`** flow - The most secure OAuth2 flow for web applications, involves redirecting users to the authorization server
- **`authorizationUrl`** - Where users go to grant permissions (must use HTTPS for security)
- **`tokenUrl`** - Where your app exchanges authorization codes for access tokens (must use HTTPS)

**Scope-Based Permissions:**
- **`'users:read'`** - Allows reading user profile data but not modifying it
- **`'users:write'`** - Allows updating user profiles (typically granted to users for their own profiles)  
- **`'orders:read'` & `'orders:write'`** - Separate permissions for order management
- **`'admin:users'`** - Administrative permission that overrides user-level restrictions

**Endpoint-Level Authorization:**
- **`security: - oauth2Auth: ['users:read']`** - This endpoint requires a valid OAuth2 token with the `users:read` scope
- **Different endpoints require different scopes** - GET operations typically need `read` scopes, while PATCH/POST/DELETE need `write` scopes
- **Response codes `401` vs `403`**:
  - `401` = No valid token provided (authentication problem)
  - `403` = Valid token but insufficient permissions (authorization problem)

This pattern allows fine-grained control: a user might have permission to read profiles but not edit them, while administrators have broader access.

{% /tab %}
{% tab label="API Key" %}

### API key authentication

For service-to-service communication and simpler use cases, API keys provide straightforward authentication.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    apiKeyAuth:
      type: apiKey
      in: header                # [!code highlight] Header-based API key (preferred)
      name: X-API-Key           # [!code highlight] Custom header name
      description: "API key for service authentication"

paths:
  /internal/health:
    get:
      summary: "Internal health check"
      security:
        - apiKeyAuth: []        # [!code highlight] Require API key authentication
      responses:
        '200':
          description: "Service health status"
        '401':
          description: "Invalid or missing API key"
```

**API Key configuration explained:**

- **`type: apiKey`** - Declares this uses simple API key authentication (as opposed to OAuth2 or JWT)
- **`in: header`** - API key is sent in HTTP headers (more secure than query parameters, which get logged)
- **`name: X-API-Key`** - Specifies the exact header name clients must use: `X-API-Key: your-secret-key-here`
- **`security: - apiKeyAuth: []`** - Requires a valid API key for this endpoint

**When to use API keys:**
- **Service-to-service communication** - When your API calls another internal service
- **Simple integrations** - Third-party services that don't need complex user permissions
- **Internal tools** - Admin dashboards or monitoring systems

**Security considerations:**
- API keys identify the *application*, not the *user* (unlike JWT tokens)
- Keys should be long, random strings (at least 32 characters)
- Store keys securely and rotate them regularly
- Never include API keys in client-side code or URLs

{% /tab %}
{% tab label="Mutual TLS (mTLS)" %}

### Mutual TLS (mTLS) for service authentication

For high-security environments and service-to-service communication, [mutual TLS](api-tls-encryption-https-best-practices#mutual-tls-mtls-two-way-authentication) provides cryptographic identity verification.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    mtlsAuth:
      type: mutualTLS              # [!code highlight] Cryptographic client authentication
      description: "Client certificate authentication"

paths:
  /internal/payments:
    post:
      security:
        - mtlsAuth: []             # [!code highlight] Requires valid client certificate
      summary: "Process payment (internal service only)"
      responses:
        '200':
          description: "Payment processed"
        '401':                     # [!code highlight] Certificate validation failure
          description: "Invalid client certificate"
```

**mTLS configuration explained:**

- **`type: mutualTLS`** - Requires both server and client to present valid certificates
- **Cryptographic authentication** - More secure than API keys since certificates are harder to forge
- **Best for internal services** - High-security service-to-service communication
- **Zero-trust architecture** - No implicit trust based on network location

{% /tab %}
{% /tabs %}

## Automated governance for access control

One of the most common API vulnerabilities is the accidentally public endpoint—an operation that should require authentication but doesn't have security requirements defined. Automated governance prevents this by enforcing security rules during development.

### Security governance rules

**Mandatory Authentication on Write Operations:**
```yaml {% title="governance-rules.yaml" %}
rules:
  require-auth-on-mutations:
    description: "All write operations must have security requirements"
    severity: error
    given: "$.paths[*][*]"
    when:
      function: enumerated
      functionOptions:
        values: ["post", "put", "patch", "delete"]
    then:
      field: "security"
      function: truthy
```

**Validate Security Scheme Definitions:**
```yaml {% title="governance-rules.yaml" %}
rules:
  security-schemes-defined:
    description: "All security references must have corresponding definitions"
    severity: error
    given: "$.paths[*][*].security[*]"
    then:
      function: defined-security-scheme
```

When these rules run in your CI/CD pipeline, any endpoint without proper security definitions causes the build to fail, preventing accidentally public endpoints from reaching production.

### Implementation example

**Before Governance (Vulnerable):**
```yaml
paths:
  /users/{userId}:
    delete:
      summary: "Delete user account"
      # Missing security requirement - accidentally public!
      responses:
        '204':
          description: "User deleted"
```

**After Governance (Secure):**
```yaml
paths:
  /users/{userId}:
    delete:
      summary: "Delete user account"
      security:
        - oauth2Auth: ['admin:users']  # Required by governance rules
      responses:
        '204':
          description: "User deleted"
        '401':
          description: "Authentication required"
        '403':
          description: "Insufficient permissions"
```

**Next steps:** Once you've implemented automated governance, consider setting up [comprehensive monitoring](#authentication-and-authorization-monitoring) to track security violations and [troubleshooting processes](#troubleshooting-common-issues) to handle authentication failures effectively.

## Security definitions as configuration

Defining security schemes in OpenAPI extends beyond documentation—it establishes configuration-as-code that drives consistency across your entire API ecosystem:

### API gateway integration

Modern API gateways can import OpenAPI specifications and automatically configure authentication and authorization based on your security definitions.

**Kong Gateway Configuration:**
```yaml {% title="kong.yaml" %}
# Generated from OpenAPI securitySchemes
plugins:
- name: jwt
  config:
    key_claim_name: iss
    secret_is_base64: false
    claims_to_verify:
      - exp
      - iat
    run_on_preflight: false

# Generated from OAuth2 scopes
- name: openapi-validator
  config:
    validate_request_body: true
    validate_response_body: false
    api_spec: "/path/to/openapi.yaml"
```

**AWS API Gateway Integration:**
```yaml {% title="serverless.yml" %}
functions:
  getUserProfile:
    handler: users.getProfile
    events:
      - http:
          path: users/{userId}
          method: get
          # Generated from OpenAPI security requirements
          authorizer:
            name: jwtAuthorizer
            scopes:
              - users:read
```

### Code generation

OpenAPI security schemes enable automated generation of authentication handling in client SDKs and server stubs.

**Generated Client SDK (TypeScript):**
```typescript
// Auto-generated from OpenAPI security schemes
class APIClient {
  private bearerToken?: string;
  
  setBearerToken(token: string) {
    this.bearerToken = token;
  }
  
  async getUserProfile(userId: string): Promise<UserProfile> {
    const headers: Record<string, string> = {};
    
    // Auto-added based on security requirements
    if (this.bearerToken) {
      headers['Authorization'] = `Bearer ${this.bearerToken}`;
    }
    
    const response = await fetch(`/users/${userId}`, { headers });
    
    if (response.status === 401) {
      throw new AuthenticationError('Bearer token required');
    }
    
    if (response.status === 403) {
      throw new AuthorizationError('Insufficient permissions');
    }
    
    return response.json();
  }
}
```

**Development workflow:** Generated client SDKs like the one above help catch authentication issues early. When problems occur in production, use [monitoring](#authentication-and-authorization-monitoring) and [troubleshooting](#troubleshooting-common-issues) to diagnose and resolve issues quickly.

## Advanced authorization patterns

Choose the authorization pattern that fits your application's complexity:

{% tabs %}
  {% tab label="Role-Based Access Control (RBAC)" %}

### Role-based access control (RBAC)

While OpenAPI doesn't have built-in RBAC support, you can model roles through scopes or custom extensions.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize  # [!code highlight] HTTPS required
          tokenUrl: https://auth.example.com/token              # [!code highlight] HTTPS required
          scopes:
            # Role-based scopes                                  # [!code highlight]
            'role:admin': "Administrative access to all resources"        # [!code highlight] Admin role
            'role:manager': "Management access within assigned teams"     # [!code highlight] Manager role
            'role:user': "Standard user access to own resources"          # [!code highlight] User role
            
            # Resource-based scopes                              # [!code highlight]
            'users:read': "Read user profiles"
            'users:write': "Modify user profiles"
            'orders:read': "View orders"
            'orders:write': "Create and modify orders"

paths:
  /admin/users:
    get:
      summary: "List all users (admin only)"
      security:
        - oauth2Auth: ['role:admin']  # [!code highlight] Admin-only endpoint
      responses:
        '200':
          description: "List of all users"
        '403':                        # [!code highlight] Authorization failure
          description: "Admin access required"
  
  /users/me:
    get:
      summary: "Get own profile"
      security:
        - oauth2Auth: ['role:user', 'users:read']  # [!code highlight] Multiple scope requirement
      responses:
        '200':
          description: "User's own profile"
```

{% /tab %}
{% tab label="Context-Dependent Authorization" %}

### Context-dependent authorization

Some authorization decisions depend on request context, such as resource ownership or dynamic policies.

```yaml {% title="openapi.yaml" %}
paths:
  /users/{userId}/orders:
    get:
      summary: "Get user's orders"
      security:
        - oauth2Auth: ['orders:read']  # [!code highlight] Base permission required
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string            # [!code highlight] User ID parameter
      responses:
        '200':
          description: "User's order history"
        '403':                      # [!code highlight] Resource ownership check
          description: "Can only access own orders unless admin"
      # Custom extension for context-dependent rules  # [!code highlight]
      x-authorization-context:
        resource-owner-check: true  # [!code highlight] Check resource ownership
        admin-override: true        # [!code highlight] Admin can bypass ownership
```

{% /tab %}
{% tab label="Fine-Grained Permissions" %}

### Fine-grained permissions

For complex applications, you might need very specific permissions that combine multiple factors.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize  # [!code highlight] HTTPS required
          tokenUrl: https://auth.example.com/token              # [!code highlight] HTTPS required
          scopes:
            # Operation + Resource + Condition                  # [!code highlight] Fine-grained permissions
            'orders:read:own': "Read own orders"               # [!code highlight] Own resources only
            'orders:read:team': "Read team orders"             # [!code highlight] Team scope
            'orders:read:all': "Read all orders"               # [!code highlight] Global read access
            'orders:write:own': "Modify own orders"            # [!code highlight] Own resources only
            'orders:write:team': "Modify team orders"          # [!code highlight] Team write access
            'orders:cancel:all': "Cancel any order"            # [!code highlight] Admin-level permission

paths:
  /orders/{orderId}:
    patch:
      summary: "Update order"
      security:
        - oauth2Auth: ['orders:write:own', 'orders:write:team']  # [!code highlight] Multiple scope options
      responses:
        '200':
          description: "Order updated"
        '403':                        # [!code highlight] Authorization failure
          description: "Insufficient permissions to update order"
```

{% /tab %}
{% /tabs %}

**Implementation tip:** Complex authorization patterns require robust [monitoring and troubleshooting](#troubleshooting-common-issues). The patterns above should be complemented with comprehensive logging and [best practices](#best-practices-summary) for production deployment.

## Authentication and authorization monitoring

Choose your monitoring approach based on your technology stack:

{% tabs %}
  {% tab label="Authentication Monitoring (JS)" %}

### Token validation metrics

Monitor authentication success and failure patterns to detect potential attacks and system issues.

```javascript
// Express.js middleware for auth monitoring
const authMetrics = {
  successful_auths: 0,
  failed_auths: 0,
  expired_tokens: 0,
  invalid_signatures: 0
};

app.use('/api', (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');  // [!code highlight] Extract Bearer token
  
  if (!token) {
    authMetrics.failed_auths++;                     // [!code highlight] Track failed attempts
    return res.status(401).json({ error: 'Bearer token required' });
  }
  
  try {
    const decoded = jwt.verify(token, publicKey, {  // [!code highlight] Verify with public key
      algorithms: ['RS256'],                        // [!code highlight] Only allow RS256 algorithm
      audience: 'api.example.com',                  // [!code highlight] Verify intended audience
      issuer: 'https://auth.example.com'            // [!code highlight] Verify trusted issuer
    });
    
    // Check token expiration                       // [!code highlight]
    if (decoded.exp < Date.now() / 1000) {
      authMetrics.expired_tokens++;                 // [!code highlight] Track expired tokens
      return res.status(401).json({ error: 'Token expired' });
    }
    
    authMetrics.successful_auths++;                 // [!code highlight] Track successful auths
    req.user = decoded;                             // [!code highlight] Attach user to request
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      authMetrics.invalid_signatures++;             // [!code error] Track signature failures
    } else {
      authMetrics.failed_auths++;                   // [!code error] Track other failures
    }
    
    return res.status(401).json({ error: 'Invalid token' });
  }
});
```

**How this authentication monitoring works:**

**Token Extraction:**
- **`req.headers.authorization?.replace('Bearer ', '')`** - Safely extracts the JWT token from the `Authorization: Bearer <token>` header
- The `?` optional chaining prevents errors if the header is missing

**Token Validation Process:**
1. **`jwt.verify(token, publicKey, {...})`** - Uses the public key to verify the token signature wasn't tampered with
2. **`algorithms: ['RS256']`** - Only accepts RSA SHA-256 signatures (prevents algorithm confusion attacks)
3. **`audience` & `issuer` validation** - Ensures the token is intended for your API and came from your trusted auth server
4. **Expiration check** - Even if signature is valid, reject tokens past their expiration time

**Security Metrics Collection:**
- **`successful_auths`** - Count of valid authentications (helps with usage analytics)
- **`failed_auths`** - Missing or invalid tokens (spikes might indicate attacks)
- **`expired_tokens`** - Tokens past expiration (helps tune token lifetimes)
- **`invalid_signatures`** - Tampered or forged tokens (critical security indicator)

**What to watch for:**
- **High `invalid_signatures`** - Possible token forgery attempts
- **Many `expired_tokens`** - Token lifetimes might be too short, causing poor user experience
- **Sudden spikes in `failed_auths`** - Potential brute force or credential stuffing attacks

{% /tab %}
{% tab label="Authorization Monitoring (JavaScript)" %}

### Authorization failure analysis

Track authorization failures to identify potential privilege escalation attempts or misconfigured permissions.

```javascript
// Express.js middleware for authorization monitoring
class AuthorizationMonitor {
    constructor() {
        this.permissionDenials = new Map();    // [!code highlight] Track denied requests
        this.scopeViolations = new Map();      // [!code highlight] Track scope failures
    }
    
    checkScopes(requiredScopes, userScopes, endpoint) {
        const requiredSet = new Set(requiredScopes);
        const userSet = new Set(userScopes);
        const missingScopes = [...requiredSet].filter(scope => !userSet.has(scope));  // [!code highlight] Compare scopes
        
        if (missingScopes.length > 0) {
            // Initialize counters if endpoint is new
            if (!this.scopeViolations.has(endpoint)) {
                this.scopeViolations.set(endpoint, 0);
            }
            
            this.scopeViolations.set(endpoint, this.scopeViolations.get(endpoint) + 1);  // [!code error] Track security violation
            
            console.warn(`Scope violation at ${endpoint}`, {  // [!code error] Log security event
                requiredScopes,
                userScopes,
                missingScopes,
                userId: 'unknown' // Would typically come from req.user
            });
            
            return false;                               // [!code error] Deny access
        }
        
        return true;                                    // [!code highlight] Allow access
    }
    
    getViolationReport() {
        return {
            permissionDenials: Object.fromEntries(this.permissionDenials),
            scopeViolations: Object.fromEntries(this.scopeViolations)  // [!code highlight] Security metrics
        };
    }
}

// Express.js middleware usage example
const authMonitor = new AuthorizationMonitor();

function requireScopes(requiredScopes) {
    return (req, res, next) => {
        const userScopes = req.user?.scopes || [];
        const endpoint = req.route.path;
        
        if (authMonitor.checkScopes(requiredScopes, userScopes, endpoint)) {
            next();  // User has required scopes
        } else {
            res.status(403).json({
                error: 'Insufficient permissions',
                required_scopes: requiredScopes
            });
        }
    };
}
```

**How this authorization monitoring works:**

**Scope-Based Authorization:**
- **`[...requiredSet].filter(scope => !userSet.has(scope))`** - Uses array filter to find missing permissions (e.g., endpoint needs `['orders:write']` but user only has `['orders:read']`)
- **`missingScopes`** - If this array has length > 0, the user lacks required permissions

**Security Tracking:**
- **`permissionDenials`** - Counts authorization failures per endpoint (helps identify which resources are most targeted)
- **`scopeViolations`** - Tracks specific permission mismatches (helps identify privilege escalation attempts)
- **`new Map()`** - Provides efficient key-value storage for endpoint counters

**Structured Logging:**
- **`console.warn()`** - Records security events with structured data for analysis
- **Object context** - Includes metadata like:
  - Which scopes were required vs. provided
  - Which specific permissions were missing
  - User ID for tracking repeat offenders
  - Endpoint being accessed

**Security Analysis:**
- **High violation counts on specific endpoints** - May indicate targeted attacks
- **Users repeatedly failing scope checks** - Possible compromised accounts or privilege escalation attempts  
- **Missing scopes patterns** - Could reveal permission misconfiguration (e.g., users consistently missing `read` permissions might indicate overly restrictive defaults)

This monitoring helps distinguish between legitimate access denials (user simply doesn't have permission) and suspicious activity (repeated attempts to access unauthorized resources).

{% /tab %}
{% /tabs %}

### Security event logging

Implement comprehensive logging for security events to support incident response and compliance requirements.

```yaml {% title="logging-config.yaml" %}
# Structured logging for security events
security_events:
  authentication_success:
    level: INFO
    fields: [user_id, client_ip, user_agent, timestamp]
  
  authentication_failure:
    level: WARN
    fields: [client_ip, user_agent, failure_reason, timestamp]
  
  authorization_failure:
    level: WARN
    fields: [user_id, endpoint, required_scopes, user_scopes, timestamp]
  
  token_expiration:
    level: INFO
    fields: [user_id, token_issued_at, token_expired_at, timestamp]
```

**Security operations:** When monitoring detects issues, use the structured logs above with the [troubleshooting guide below](#troubleshooting-common-issues) to quickly diagnose and resolve authentication and authorization problems.

## Troubleshooting common issues

### Authentication problems

{% tabs %}
{% tab label="Missing or Invalid Bearer Token" %}

**Error occurs when:** Client sends request without Bearer token or provides malformed token.

```bash {% title="Testing Unauthenticated Access" %}
# Test unauthenticated access (should fail with 401)
curl -i https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# Content-Type: application/json
# {"error": "Bearer token required"}
```

**Common causes:**
- Client forgot to include `Authorization` header
- Malformed header format (missing "Bearer " prefix)
- Empty or null token value
- Token contains invalid characters

**How to fix:**
- Ensure clients include the header: `Authorization: Bearer <your-jwt-token>`
- Validate token format before sending requests
- Check your authentication middleware configuration

{% /tab %}
{% tab label="Invalid Token Signature" %}

**Error occurs when:** JWT token's signature doesn't match expected signature, indicating tampering or wrong issuer.

```bash {% title="Testing Invalid Token Signature" %}
# Test with invalid token (should fail with 401)
curl -H "Authorization: Bearer invalid_token" \
     https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# {"error": "Invalid token signature"}
```

**Common causes:**
- Token was manually modified or corrupted
- Wrong signing key used to verify the token
- Token was issued by a different authorization server
- Key rotation issues (old key used to verify new token)

**How to fix:**
- Verify your JWT signing key configuration
- Check key rotation procedures
- Ensure tokens are only issued by trusted authorization servers
- Never modify JWT tokens after they're created

{% /tab %}
{% tab label="Expired Token" %}

**Error occurs when:** JWT token has passed its expiration time (`exp` claim), which is a security best practice.

```bash {% title="Testing Expired Token" %}
# Test with expired token
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
     https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# {"error": "Token expired"}
```

**Common causes:**
- Token has passed its `exp` (expiration) time
- Client cached an old token without refreshing
- Token lifetime is too short for your use case
- Time synchronization issues between servers

**How to fix:**
- Implement token refresh logic in your clients
- Use refresh tokens to obtain new access tokens
- Adjust token lifetime based on security vs. usability needs
- Ensure server clocks are synchronized (use NTP)
- Clear expired tokens from client storage

{% /tab %}
{% /tabs %}

### Authorization problems

{% tabs %}
{% tab label="Insufficient Scopes" %}

**Problem:** User has valid token but lacks required permissions/scopes for the operation.

```bash {% title="Testing Scope Enforcement" %}
# Test scope enforcement (readonly token trying to write)
curl -H "Authorization: Bearer readonly_token" \
     -X POST \
     -H "Content-Type: application/json" \
     -d '{"name": "test"}' \
     https://api.example.com/users

# Expected response:
# HTTP/1.1 403 Forbidden
# {"error": "Insufficient permissions", "required_scopes": ["users:write"]}
```

**Common causes:**
- Token has read-only scopes but endpoint requires write access
- User role doesn't include necessary permissions
- Scope names don't match between token and OpenAPI spec
- Token was issued for different resource/service

**How to fix:**
- Check required scopes in your OpenAPI security definitions
- Verify user has been granted appropriate permissions
- Ensure scope names are consistent across auth server and API
- Request tokens with broader scopes if user is authorized

{% /tab %}
{% tab label="Missing Security Requirements" %}

**Problem:** OpenAPI specification doesn't specify security requirements for sensitive endpoints.

```yaml {% title="Common OpenAPI Security Bug" %}
# Common issue: forgetting security on sensitive endpoints
paths:
  /admin/users:
    delete:
      summary: "Delete all users"
      # BUG: Missing security requirement!  # [!code error]
      # security:
      #   - oauth2Auth: ['admin:users']
      responses:
        '204':
          description: "All users deleted"
```

**Common causes:**
- Developer forgot to add `security:` property to endpoint
- Copy-pasted endpoint from public API without adding security
- Global security was removed but individual endpoints not updated
- New endpoints added without security review

**How to fix:**
- Add explicit security requirements to all protected endpoints
- Use linting rules to catch missing security definitions
- Implement code review processes for new endpoints
- Consider setting global security as default with explicit overrides

{% /tab %}
{% tab label="Configuration Mismatches" %}

**Problem:** API gateway configuration doesn't match OpenAPI security specifications.

```bash {% title="Testing Gateway Configuration Sync" %}
# Verify gateway is enforcing the same rules as OpenAPI spec
curl -H "Authorization: Bearer user_token" \
     -X DELETE \
     https://api.example.com/admin/users

# If this succeeds when it should fail, gateway config is out of sync
```

**Common causes:**
- Gateway config was updated manually but not synced with OpenAPI
- Deployment pipeline doesn't update gateway from OpenAPI spec
- Multiple versions of API spec with different security requirements
- Gateway caching old configuration after spec changes

**How to fix:**
- Automate gateway configuration from OpenAPI specifications
- Implement configuration drift detection between spec and gateway
- Use infrastructure-as-code to manage gateway settings
- Test security enforcement as part of deployment pipeline
- Clear gateway cache after specification updates

{% /tab %}
{% /tabs %}

### Debugging checklist

1. **Verify token format and claims:**
   ```bash
   # Decode JWT to inspect claims (don't use in production)
   echo "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." | base64 -d
   ```

2. **Check security scheme definitions:**
   ```yaml
   # Ensure all referenced security schemes are defined
   components:
     securitySchemes:
       oauth2Auth:  # Must match security references
         type: oauth2
         # ... configuration
   ```

3. **Validate scope requirements:**
   ```yaml
   # Ensure required scopes exist in security scheme
   security:
     - oauth2Auth: ['users:write']  # Must be defined in scopes
   ```

4. **Test authentication flow:**
   ```bash
   # Full OAuth2 flow test
   # 1. Get authorization code
   open "https://auth.example.com/authorize?response_type=code&client_id=..."
   
   # 2. Exchange code for token
   curl -X POST https://auth.example.com/token \
        -d "grant_type=authorization_code&code=..."
   
   # 3. Use token for API access
   curl -H "Authorization: Bearer access_token" \
        https://api.example.com/users/me
   ```

## Best practices summary

### Security scheme design
- Use JWT Bearer tokens for stateless authentication
- Implement OAuth2 with PKCE for user-facing applications
- Define granular scopes that map to business operations
- Use mTLS for high-trust service-to-service communication

### Governance and automation
- Require security definitions on all write operations
- Validate that all security references have corresponding definitions
- Fail builds when security requirements are missing
- Generate gateway configurations from OpenAPI security schemes

### Monitoring and observability
- Track authentication success/failure rates
- Monitor authorization violations by endpoint
- Log security events with sufficient context for incident response
- Set up alerts for unusual authentication patterns

### Implementation
- Generate client SDKs with built-in authentication handling
- Use OpenAPI security schemes to configure API gateways
- Implement proper error responses (401 vs 403)
- Test authentication and authorization scenarios in CI/CD

## Frequently asked questions

### What's the difference between authentication and authorization?
Authentication verifies *who* the user is (like checking an ID card), while authorization determines *what* they can do (like checking permissions). Authentication happens first and provides identity, while authorization uses that identity to make access decisions for each request.

### Should I use JWT or OAuth2 for my API?
JWT is a token format, while OAuth2 is an authorization framework. They work together: OAuth2 defines how to obtain tokens, and JWT defines the token format. Use OAuth2 with JWT tokens for user-facing applications, and consider simpler JWT Bearer authentication for service-to-service communication. See [Authentication Methods](#authentication-methods) for detailed implementation examples.

### How do I implement fine-grained permissions with OpenAPI?
Use OAuth2 scopes to define specific permissions like `users:read`, `orders:write`, or `admin:users`. You can also model roles through scopes (e.g., `role:admin`) or use [advanced authorization patterns](#advanced-authorization-patterns) for complex authorization logic that depends on request context.

### What happens if I forget to add security requirements to an endpoint?
The endpoint becomes accidentally public, which is one of the most common API vulnerabilities. [Automated governance rules](#automated-governance-for-access-control) can prevent this by failing builds when write operations (POST, PUT, PATCH, DELETE) don't have security requirements defined.

### How do I handle authorization that depends on resource ownership?
OpenAPI security schemes handle authentication and basic authorization (scopes/roles), but context-dependent authorization (like "users can only access their own resources") typically requires custom logic in your application. See [Advanced Authorization Patterns](#advanced-authorization-patterns) for examples of documenting these requirements using custom extensions like `x-authorization-context`.

## Resources

### Standards and Specifications
- [OpenAPI Security Schemes](https://spec.openapis.org/oas/v3.1.0#security-scheme-object) - Official specification for defining authentication and authorization
- [JWT RFC 7519](https://tools.ietf.org/html/rfc7519) - JSON Web Token standard for secure information transmission
- [OAuth2 RFC 6749](https://tools.ietf.org/html/rfc6749) - Authorization framework for delegated access
- [OAuth2 PKCE RFC 7636](https://tools.ietf.org/html/rfc7636) - Proof Key for Code Exchange extension for public clients

### Implementation Tools
- [Auth0](https://auth0.com/) - Managed authentication and authorization platform with OpenAPI integration
- [Keycloak](https://www.keycloak.org/) - Open-source identity and access management with OAuth2/JWT support  
- [Kong](https://konghq.com/) - API gateway with native OpenAPI security scheme support
- [AWS API Gateway](https://aws.amazon.com/api-gateway/) - Managed API gateway with built-in authentication and authorization

### Security Best Practices
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) - Including API1:2023 (Broken Object Level Authorization) and API2:2023 (Broken Authentication)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/800-63-3/) - Comprehensive guidance on authentication and identity verification
- [OAuth2 Security Best Practices](https://tools.ietf.org/html/draft-ietf-oauth-security-topics) - Latest security recommendations for OAuth2 implementations

### Related Security Topics
- [API TLS Encryption and HTTPS Best Practices](api-tls-encryption-https-best-practices) - Secure data in transit with mTLS
- [API Input Validation and Injection Prevention](api-input-validation-injection-prevention) - Protect APIs from malicious data
- [API Rate Limiting and Abuse Prevention](api-rate-limiting-abuse-prevention) - Prevent brute force attacks on auth endpoints
- [API Security by Design: Complete Guide](/learn/security) - Overview of all API security domains