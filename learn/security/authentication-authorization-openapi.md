# Authentication and Authorization with OpenAPI

_Implement secure access control using OpenAPI security schemes and modern authentication patterns._

---

## Key Takeaways

Authentication and authorization form the foundation of API access control. While often used interchangeably, these concepts serve distinct purposes: authentication verifies *who* the user is, while authorization determines *what* they can do. Modern APIs require both layers to prevent unauthorized access and enforce business rules.

In this guide, we'll explore how to use OpenAPI 3.1 security schemes to define robust access control patterns that integrate seamlessly with [automated governance](api-design-first-security-governance.md) and modern authentication providers.

**We'll cover how to:**
- Define JWT Bearer token authentication in OpenAPI specifications
- Implement OAuth2 with granular scope-based authorization
- Enforce security requirements through [automated governance](api-design-first-security-governance.md)
- Configure API gateways from OpenAPI security definitions
- Monitor and troubleshoot authentication and authorization failures

---

## Understanding Authentication vs Authorization

The distinction between authentication and authorization is fundamental to API security design. Understanding this difference helps you implement the right controls at the right layers.

### The Two-Phase Security Process

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

### Common Authentication Patterns

**API Keys:**
- Simple, stateless authentication
- Often used for service-to-service communication
- Limited authorization capabilities (typically binary: access or no access)

**JWT Bearer Tokens:**
- Self-contained tokens with embedded claims
- Support fine-grained authorization through scopes and claims
- Stateless validation (no database lookup required)
- Industry standard for modern APIs

**OAuth2 with PKCE:**
- Delegated authorization framework
- Supports multiple grant types and client types
- Built-in scope-based authorization
- Recommended for user-facing applications

## Defining Security Schemes in OpenAPI

OpenAPI 3.1 provides a robust framework for defining access control through two primary constructs:

1. **`components.securitySchemes`**: Defines *how* clients can authenticate (JWT Bearer, OAuth2, API Keys)
2. **`security`**: Specifies *that* an endpoint is secured and by which mechanism(s)

### JWT Bearer Token Authentication

JWT (JSON Web Token) Bearer authentication is the most common pattern for modern APIs. The token contains encoded claims about the user and can be validated without database lookups.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: "Enter JWT with 'Bearer ' prefix"

# Apply globally to all operations
security:
  - bearerAuth: []
```

**JWT Token Structure:**
```javascript
// Header
{
  "alg": "RS256",
  "typ": "JWT"
}

// Payload (Claims)
{
  "sub": "user123",
  "iss": "https://auth.example.com",
  "aud": "api.example.com",
  "exp": 1640995200,
  "iat": 1640991600,
  "scopes": ["users:read", "orders:write"]
}

// Signature (RS256)
RSASHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  private_key
)
```

### OAuth2 with Scope-Based Authorization

OAuth2 provides the most flexible authorization framework, supporting fine-grained permissions through scopes and multiple authentication flows.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      description: "OAuth2 Authorization Code Flow with PKCE"
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize
          tokenUrl: https://auth.example.com/token
          scopes:
            'users:read': "Read access to user profiles"
            'users:write': "Modify user profiles"
            'orders:read': "View order history"
            'orders:write': "Create and modify orders"
            'admin:users': "Full user management access"

paths:
  /users/{userId}:
    get:
      summary: "Get user profile"
      security:
        - oauth2Auth: ['users:read']  # Requires read access
      responses:
        '200':
          description: "User profile data"
        '401':
          description: "Authentication required"
        '403':
          description: "Insufficient permissions"
    
    patch:
      summary: "Update user profile"
      security:
        - oauth2Auth: ['users:write']  # Requires write access
      responses:
        '200':
          description: "Profile updated successfully"
        '401':
          description: "Authentication required"
        '403':
          description: "Insufficient permissions"
```

### API Key Authentication

For service-to-service communication and simpler use cases, API keys provide straightforward authentication.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    apiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: "API key for service authentication"

paths:
  /internal/health:
    get:
      summary: "Internal health check"
      security:
        - apiKeyAuth: []
      responses:
        '200':
          description: "Service health status"
```

### Mutual TLS (mTLS) for Service Authentication

For high-security environments and service-to-service communication, [mutual TLS](api-tls-encryption-https-best-practices.md#mutual-tls-mtls-two-way-authentication) provides cryptographic identity verification.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    mtlsAuth:
      type: mutualTLS
      description: "Client certificate authentication"

paths:
  /internal/payments:
    post:
      security:
        - mtlsAuth: []
      summary: "Process payment (internal service only)"
      responses:
        '200':
          description: "Payment processed"
        '401':
          description: "Invalid client certificate"
```

## Automated Governance for Access Control

One of the most common API vulnerabilities is the accidentally public endpoint—an operation that should require authentication but doesn't have security requirements defined. [Automated governance](api-design-first-security-governance.md) prevents this by enforcing security rules during development.

### Security Governance Rules

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

### Implementation Example

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

## Security Definitions as Configuration

Defining security schemes in OpenAPI extends beyond documentation—it establishes configuration-as-code that drives consistency across your entire API ecosystem:

### API Gateway Integration

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

### Code Generation

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

## Advanced Authorization Patterns

### Role-Based Access Control (RBAC)

While OpenAPI doesn't have built-in RBAC support, you can model roles through scopes or custom extensions.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize
          tokenUrl: https://auth.example.com/token
          scopes:
            # Role-based scopes
            'role:admin': "Administrative access to all resources"
            'role:manager': "Management access within assigned teams"
            'role:user': "Standard user access to own resources"
            
            # Resource-based scopes
            'users:read': "Read user profiles"
            'users:write': "Modify user profiles"
            'orders:read': "View orders"
            'orders:write': "Create and modify orders"

paths:
  /admin/users:
    get:
      summary: "List all users (admin only)"
      security:
        - oauth2Auth: ['role:admin']
      responses:
        '200':
          description: "List of all users"
  
  /users/me:
    get:
      summary: "Get own profile"
      security:
        - oauth2Auth: ['role:user', 'users:read']
      responses:
        '200':
          description: "User's own profile"
```

### Context-Dependent Authorization

Some authorization decisions depend on request context, such as resource ownership or dynamic policies.

```yaml {% title="openapi.yaml" %}
paths:
  /users/{userId}/orders:
    get:
      summary: "Get user's orders"
      security:
        - oauth2Auth: ['orders:read']
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: "User's order history"
        '403':
          description: "Can only access own orders unless admin"
      # Custom extension for context-dependent rules
      x-authorization-context:
        resource-owner-check: true
        admin-override: true
```

### Fine-Grained Permissions

For complex applications, you might need very specific permissions that combine multiple factors.

```yaml {% title="openapi.yaml" %}
components:
  securitySchemes:
    oauth2Auth:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize
          tokenUrl: https://auth.example.com/token
          scopes:
            # Operation + Resource + Condition
            'orders:read:own': "Read own orders"
            'orders:read:team': "Read team orders"  
            'orders:read:all': "Read all orders"
            'orders:write:own': "Modify own orders"
            'orders:write:team': "Modify team orders"
            'orders:cancel:all': "Cancel any order"

paths:
  /orders/{orderId}:
    patch:
      summary: "Update order"
      security:
        - oauth2Auth: ['orders:write:own', 'orders:write:team']
      responses:
        '200':
          description: "Order updated"
```

## Authentication and Authorization Monitoring

### Token Validation Metrics

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
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    authMetrics.failed_auths++;
    return res.status(401).json({ error: 'Bearer token required' });
  }
  
  try {
    const decoded = jwt.verify(token, publicKey, { 
      algorithms: ['RS256'],
      audience: 'api.example.com',
      issuer: 'https://auth.example.com'
    });
    
    // Check token expiration
    if (decoded.exp < Date.now() / 1000) {
      authMetrics.expired_tokens++;
      return res.status(401).json({ error: 'Token expired' });
    }
    
    authMetrics.successful_auths++;
    req.user = decoded;
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      authMetrics.invalid_signatures++;
    } else {
      authMetrics.failed_auths++;
    }
    
    return res.status(401).json({ error: 'Invalid token' });
  }
});
```

### Authorization Failure Analysis

Track authorization failures to identify potential privilege escalation attempts or misconfigured permissions.

```python
# Python middleware for authorization monitoring
import logging
from collections import defaultdict

class AuthorizationMonitor:
    def __init__(self):
        self.permission_denials = defaultdict(int)
        self.scope_violations = defaultdict(int)
    
    def check_scopes(self, required_scopes, user_scopes, endpoint):
        missing_scopes = set(required_scopes) - set(user_scopes)
        
        if missing_scopes:
            self.scope_violations[endpoint] += 1
            logging.warning(f"Scope violation at {endpoint}", extra={
                'required_scopes': required_scopes,
                'user_scopes': user_scopes,
                'missing_scopes': list(missing_scopes),
                'user_id': getattr(g, 'user_id', 'unknown')
            })
            return False
        
        return True
    
    def get_violation_report(self):
        return {
            'permission_denials': dict(self.permission_denials),
            'scope_violations': dict(self.scope_violations)
        }
```

### Security Event Logging

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

## Troubleshooting Common Issues

### Authentication Problems

**Missing or Invalid Bearer Token:**
```bash
# Test unauthenticated access (should fail with 401)
curl -i https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# Content-Type: application/json
# {"error": "Bearer token required"}
```

**Invalid Token Signature:**
```bash
# Test with invalid token (should fail with 401)
curl -H "Authorization: Bearer invalid_token" \
     https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# {"error": "Invalid token signature"}
```

**Expired Token:**
```bash
# Test with expired token
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9..." \
     https://api.example.com/users/me

# Expected response:
# HTTP/1.1 401 Unauthorized
# {"error": "Token expired"}
```

### Authorization Problems

**Insufficient Scopes:**
```bash
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

**Missing Security Requirements:**
```yaml
# Common issue: forgetting security on sensitive endpoints
paths:
  /admin/users:
    delete:
      summary: "Delete all users"
      # BUG: Missing security requirement!
      # security:
      #   - oauth2Auth: ['admin:users']
      responses:
        '204':
          description: "All users deleted"
```

### Configuration Mismatches

**Gateway Config Doesn't Match OpenAPI:**
```bash
# Verify gateway is enforcing the same rules as OpenAPI spec
curl -H "Authorization: Bearer user_token" \
     -X DELETE \
     https://api.example.com/admin/users

# If this succeeds, gateway config is out of sync with OpenAPI
```

### Debugging Checklist

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

## Best Practices Summary

### Security Scheme Design
- Use JWT Bearer tokens for stateless authentication
- Implement OAuth2 with PKCE for user-facing applications
- Define granular scopes that map to business operations
- Use mTLS for high-trust service-to-service communication

### Governance and Automation
- Require security definitions on all write operations
- Validate that all security references have corresponding definitions
- Fail builds when security requirements are missing
- Generate gateway configurations from OpenAPI security schemes

### Monitoring and Observability
- Track authentication success/failure rates
- Monitor authorization violations by endpoint
- Log security events with sufficient context for incident response
- Set up alerts for unusual authentication patterns

### Implementation
- Generate client SDKs with built-in authentication handling
- Use OpenAPI security schemes to configure API gateways
- Implement proper error responses (401 vs 403)
- Test authentication and authorization scenarios in CI/CD

## Frequently Asked Questions

### What's the difference between authentication and authorization?
Authentication verifies *who* the user is (like checking an ID card), while authorization determines *what* they can do (like checking permissions). Authentication happens first and provides identity, while authorization uses that identity to make access decisions for each request.

### Should I use JWT or OAuth2 for my API?
JWT is a token format, while OAuth2 is an authorization framework. They work together: OAuth2 defines how to obtain tokens, and JWT defines the token format. Use OAuth2 with JWT tokens for user-facing applications, and consider simpler JWT Bearer authentication for service-to-service communication.

### How do I implement fine-grained permissions with OpenAPI?
Use OAuth2 scopes to define specific permissions like `users:read`, `orders:write`, or `admin:users`. You can also model roles through scopes (e.g., `role:admin`) or use custom extensions for complex authorization logic that depends on request context.

### What happens if I forget to add security requirements to an endpoint?
The endpoint becomes accidentally public, which is one of the most common API vulnerabilities. Automated governance rules can prevent this by failing builds when write operations (POST, PUT, PATCH, DELETE) don't have security requirements defined.

### How do I handle authorization that depends on resource ownership?
OpenAPI security schemes handle authentication and basic authorization (scopes/roles), but context-dependent authorization (like "users can only access their own resources") typically requires custom logic in your application. Document these requirements using custom extensions like `x-authorization-context`.

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
- [API TLS Encryption and HTTPS Best Practices](api-tls-encryption-https-best-practices.md) - Secure data in transit with mTLS
- [API Input Validation and Injection Prevention](api-input-validation-injection-prevention.md) - Protect APIs from malicious data
- [API Rate Limiting and Abuse Prevention](api-rate-limiting-abuse-prevention.md) - Prevent brute force attacks on auth endpoints
- [API Design-First Security Governance and Automation](api-design-first-security-governance.md) - Automate auth requirement validation
- [API Security by Design: Complete Guide](index.md) - Overview of all API security domains

---

**Next Steps:** Now that you have authentication and authorization in place, learn about [API Design-First Security Governance and Automation](api-design-first-security-governance.md) to automate the validation of security requirements across your entire API ecosystem.
