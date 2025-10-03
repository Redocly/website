// Custom security validation functions for Redocly
// These implement the advanced security checks from the Spectral OWASP ruleset

export default function securityPlugin() {
  return {
    id: 'security',
    assertions: {
      // Validates that operations have appropriate security based on HTTP method
      checkOperationSecurity: (openapi, options, ctx) => {
        const errors = [];
        const { methods = [], nullable = false } = options;
        const { paths, security: globalSecurity } = openapi;

        if (!paths || typeof paths !== 'object') {
          return errors;
        }

        // Iterate through all operations
        for (const [pathKey, pathItem] of Object.entries(paths)) {
          if (!pathItem || typeof pathItem !== 'object') continue;

          const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
          
          for (const method of httpMethods) {
            const operation = pathItem[method];
            if (!operation || typeof operation !== 'object') continue;

            // Skip if method not in configured methods list
            if (methods.length > 0 && !methods.includes(method)) continue;

            let operationSecurity = operation.security;
            
            // Fall back to global security if operation security not defined
            if (operationSecurity === undefined) {
              operationSecurity = globalSecurity;
            }

            // Check if security is properly defined
            if (!operationSecurity || operationSecurity.length === 0) {
              errors.push({
                message: `${method.toUpperCase()} operation at ${pathKey} has no security scheme defined`,
                location: ctx.baseLocation.child(['paths', pathKey, method, 'security']),
              });
              continue;
            }

            // Validate each security requirement
            if (Array.isArray(operationSecurity)) {
              for (const [idx, securityEntry] of operationSecurity.entries()) {
                if (typeof securityEntry !== 'object') continue;
                
                const securitySchemeIds = Object.keys(securityEntry);
                if (securitySchemeIds.length === 0 && !nullable) {
                  errors.push({
                    message: `${method.toUpperCase()} operation at ${pathKey} has empty security requirement at index ${idx}`,
                    location: ctx.baseLocation.child(['paths', pathKey, method, 'security', idx]),
                  });
                }
              }
            }
          }
        }

        return errors;
      },

      // Ensures admin endpoints use different security schemes than regular endpoints
      validateAdminSecurity: (openapi, options, ctx) => {
        const errors = [];
        const { adminUrlPattern = '/admin' } = options;
        const { paths } = openapi;

        if (!paths || typeof paths !== 'object') {
          return errors;
        }

        const nonAdminSecurityHashes = new Set();
        const adminSecurityEntries = [];

        // First pass: collect all security configurations
        for (const [pathKey, pathItem] of Object.entries(paths)) {
          if (!pathItem || typeof pathItem !== 'object') continue;

          const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
          
          for (const method of httpMethods) {
            const operation = pathItem[method];
            if (!operation || typeof operation !== 'object') continue;

            const operationSecurity = operation.security;
            if (!operationSecurity || !Array.isArray(operationSecurity)) continue;

            // Create hash of security configuration for comparison
            const securityHash = JSON.stringify(operationSecurity);

            if (pathKey.includes(adminUrlPattern)) {
              adminSecurityEntries.push({
                path: pathKey,
                method,
                hash: securityHash,
                location: ctx.baseLocation.child(['paths', pathKey, method, 'security']),
              });
            } else {
              nonAdminSecurityHashes.add(securityHash);
            }
          }
        }

        // Second pass: validate admin endpoints use unique security
        for (const adminEntry of adminSecurityEntries) {
          if (nonAdminSecurityHashes.has(adminEntry.hash)) {
            errors.push({
              message: `Admin endpoint ${adminEntry.path} (${adminEntry.method.toUpperCase()}) uses the same security scheme as non-admin endpoints. Admin operations should have stricter authentication.`,
              location: adminEntry.location,
            });
          }
        }

        return errors;
      },

      // Validates OAuth scopes are appropriate for operation sensitivity
      validateOAuthScopes: (openapi, options, ctx) => {
        const errors = [];
        const { 
          adminOperations = ['delete', 'post', 'put', 'patch'],
          requiredAdminScopes = ['admin', 'write', 'manage'],
          adminPathPatterns = ['/admin', '/manage', '/config']
        } = options;
        
        const { paths, components } = openapi;

        if (!paths || !components?.securitySchemes) {
          return errors;
        }

        // Find OAuth2 security schemes
        const oauthSchemes = Object.entries(components.securitySchemes)
          .filter(([_, scheme]) => scheme.type === 'oauth2')
          .map(([name, _]) => name);

        if (oauthSchemes.length === 0) return errors;

        for (const [pathKey, pathItem] of Object.entries(paths)) {
          if (!pathItem || typeof pathItem !== 'object') continue;

          const isAdminPath = adminPathPatterns.some(pattern => pathKey.includes(pattern));

          for (const method of adminOperations) {
            const operation = pathItem[method];
            if (!operation || typeof operation !== 'object') continue;

            const operationSecurity = operation.security;
            if (!operationSecurity || !Array.isArray(operationSecurity)) continue;

            // Check if this operation uses OAuth and has appropriate scopes
            for (const securityReq of operationSecurity) {
              for (const [schemeName, scopes] of Object.entries(securityReq)) {
                if (oauthSchemes.includes(schemeName)) {
                  const hasAdminScope = requiredAdminScopes.some(scope => 
                    Array.isArray(scopes) && scopes.includes(scope)
                  );

                  if ((isAdminPath || adminOperations.includes(method)) && !hasAdminScope) {
                    errors.push({
                      message: `${method.toUpperCase()} operation at ${pathKey} should require admin scopes (${requiredAdminScopes.join(', ')}) for sensitive operations`,
                      location: ctx.baseLocation.child(['paths', pathKey, method, 'security']),
                    });
                  }
                }
              }
            }
          }
        }

        return errors;
      },

      // Validates rate limiting configuration consistency
      validateRateLimitConsistency: (openapi, options, ctx) => {
        const errors = [];
        const { requiredHeaders = ['RateLimit', 'X-RateLimit-Limit'] } = options;
        const { paths } = openapi;

        if (!paths || typeof paths !== 'object') {
          return errors;
        }

        const rateLimitConfigs = new Map();

        // Collect all rate limiting configurations
        for (const [pathKey, pathItem] of Object.entries(paths)) {
          if (!pathItem || typeof pathItem !== 'object') continue;

          const httpMethods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
          
          for (const method of httpMethods) {
            const operation = pathItem[method];
            if (!operation?.responses) continue;

            for (const [statusCode, response] of Object.entries(operation.responses)) {
              if (!statusCode.match(/^[24]/)) continue; // Only 2xx and 4xx responses

              const headers = response.headers || {};
              const hasRateLimit = requiredHeaders.some(header => headers[header]);
              
              if (hasRateLimit) {
                const config = requiredHeaders
                  .filter(header => headers[header])
                  .map(header => ({ header, schema: headers[header] }));
                
                const configKey = `${pathKey}:${method}`;
                rateLimitConfigs.set(configKey, config);
              }
            }
          }
        }

        // Validate consistency across operations
        const configValues = Array.from(rateLimitConfigs.values());
        if (configValues.length > 1) {
          const firstConfig = JSON.stringify(configValues[0]);
          
          for (const [pathMethod, config] of rateLimitConfigs.entries()) {
            if (JSON.stringify(config) !== firstConfig) {
              const [path, method] = pathMethod.split(':');
              errors.push({
                message: `Rate limiting configuration at ${path} (${method.toUpperCase()}) differs from other operations. Consider using consistent rate limiting headers across your API.`,
                location: ctx.baseLocation.child(['paths', path, method, 'responses']),
              });
            }
          }
        }

        return errors;
      }
    },
  };
}
