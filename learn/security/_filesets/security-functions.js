// @chunk {"steps": ["custom-validation"], "when": {"component": "functions"}}
/**
 * Custom Security Validation Functions for Redocly
 * Implements advanced security checks for OWASP API Security Top 10 2023
 */

const SecurityFunctions = {
  // @chunk {"steps": ["custom-validation"]}
  /**
   * Validates that all write operations have properly configured security schemes
   * Implements comprehensive cross-operation security validation
   */
  checkOperationSecurity: (options) => {
    return (root, ctx) => {
      const problems = [];
      const { methods = ['post', 'put', 'patch', 'delete'], nullable = false } = options;
      
      // Walk through all paths and operations
      for (const [pathName, pathItem] of Object.entries(root.paths || {})) {
        for (const method of methods) {
          const operation = pathItem[method];
          if (!operation) continue;
          
          // Check if security is defined and non-empty
          const security = operation.security || pathItem.security || root.security;
          
          if (!security || (Array.isArray(security) && security.length === 0)) {
            problems.push(ctx.createProblem({
              message: `${method.toUpperCase()} operation at ${pathName} lacks security requirements`,
              location: ctx.location.child(['paths', pathName, method]),
            }));
          }
          
          // Validate security scheme references exist
          if (security && Array.isArray(security)) {
            for (const securityRequirement of security) {
              for (const schemeName of Object.keys(securityRequirement)) {
                if (!root.components?.securitySchemes?.[schemeName]) {
                  problems.push(ctx.createProblem({
                    message: `Security scheme '${schemeName}' referenced but not defined in components.securitySchemes`,
                    location: ctx.location.child(['paths', pathName, method, 'security']),
                  }));
                }
              }
            }
          }
        }
      }
      
      return problems;
    };
  },
  // @chunk-end

  // @chunk {"steps": ["custom-validation"]}
  /**
   * Validates OAuth scope configurations for administrative operations
   * Ensures admin operations require appropriate scopes
   */
  validateOAuthScopes: (options) => {
    return (root, ctx) => {
      const problems = [];
      const {
        adminOperations = ['delete', 'post', 'put', 'patch'],
        requiredAdminScopes = ['admin', 'write', 'manage'],
        adminPathPatterns = ['/admin', '/manage', '/config', '/system']
      } = options;
      
      // Check paths that match admin patterns
      for (const [pathName, pathItem] of Object.entries(root.paths || {})) {
        const isAdminPath = adminPathPatterns.some(pattern => pathName.includes(pattern));
        
        if (isAdminPath) {
          for (const method of adminOperations) {
            const operation = pathItem[method];
            if (!operation) continue;
            
            const security = operation.security || pathItem.security || root.security;
            if (!security) continue;
            
            // Check if OAuth security schemes have appropriate scopes
            for (const securityRequirement of security) {
              for (const [schemeName, scopes] of Object.entries(securityRequirement)) {
                const scheme = root.components?.securitySchemes?.[schemeName];
                if (scheme?.type === 'oauth2') {
                  const hasAdminScope = scopes.some(scope =>
                    requiredAdminScopes.some(adminScope => scope.includes(adminScope))
                  );
                  
                  if (!hasAdminScope) {
                    problems.push(ctx.createProblem({
                      message: `Admin operation ${method.toUpperCase()} ${pathName} should require admin scopes (${requiredAdminScopes.join(', ')})`,
                      location: ctx.location.child(['paths', pathName, method, 'security']),
                    }));
                  }
                }
              }
            }
          }
        }
      }
      
      return problems;
    };
  },
  // @chunk-end

  // @chunk {"steps": ["custom-validation"]}
  /**
   * Validates administrative endpoint security isolation
   * Ensures admin endpoints use different security schemes than regular operations
   */
  validateAdminSecurity: (options) => {
    return (root, ctx) => {
      const problems = [];
      const { adminUrlPattern = '/admin' } = options;
      
      const regularSchemes = new Set();
      const adminSchemes = new Set();
      
      // Collect security schemes from different endpoint types
      for (const [pathName, pathItem] of Object.entries(root.paths || {})) {
        const isAdminPath = pathName.includes(adminUrlPattern);
        
        for (const [method, operation] of Object.entries(pathItem)) {
          if (typeof operation !== 'object' || !operation.security) continue;
          
          for (const securityRequirement of operation.security) {
            for (const schemeName of Object.keys(securityRequirement)) {
              if (isAdminPath) {
                adminSchemes.add(schemeName);
              } else {
                regularSchemes.add(schemeName);
              }
            }
          }
        }
      }
      
      // Check for overlap between admin and regular schemes
      const overlap = [...adminSchemes].filter(scheme => regularSchemes.has(scheme));
      if (overlap.length > 0) {
        problems.push(ctx.createProblem({
          message: `Admin endpoints share security schemes with regular endpoints: ${overlap.join(', ')}. Consider using separate schemes for admin operations.`,
          location: ctx.location.child(['paths']),
        }));
      }
      
      return problems;
    };
  },
  // @chunk-end

  // @chunk {"steps": ["custom-validation"]}
  /**
   * Validates rate limiting header consistency across operations
   * Ensures consistent rate limiting implementation
   */
  validateRateLimitConsistency: (options) => {
    return (root, ctx) => {
      const problems = [];
      const { requiredHeaders = ['RateLimit', 'X-RateLimit-Limit'] } = options;
      
      const rateLimitHeaders = new Set();
      const inconsistentOperations = [];
      
      // Collect all rate limiting headers used
      for (const [pathName, pathItem] of Object.entries(root.paths || {})) {
        for (const [method, operation] of Object.entries(pathItem)) {
          if (typeof operation !== 'object' || !operation.responses) continue;
          
          for (const [statusCode, response] of Object.entries(operation.responses)) {
            if (!response.headers) continue;
            
            const operationRateLimitHeaders = Object.keys(response.headers).filter(header =>
              requiredHeaders.some(required => header.toLowerCase().includes(required.toLowerCase()))
            );
            
            if (operationRateLimitHeaders.length > 0) {
              if (rateLimitHeaders.size === 0) {
                // First operation with rate limit headers - set the standard
                operationRateLimitHeaders.forEach(header => rateLimitHeaders.add(header));
              } else {
                // Check consistency with established pattern
                const currentHeaders = new Set(operationRateLimitHeaders);
                const standardHeaders = new Set([...rateLimitHeaders]);
                
                if (currentHeaders.size !== standardHeaders.size || 
                    [...currentHeaders].some(h => !standardHeaders.has(h))) {
                  inconsistentOperations.push(`${method.toUpperCase()} ${pathName}`);
                }
              }
            }
          }
        }
      }
      
      if (inconsistentOperations.length > 0) {
        problems.push(ctx.createProblem({
          message: `Inconsistent rate limiting headers found in: ${inconsistentOperations.join(', ')}. Use consistent header naming across all operations.`,
          location: ctx.location.child(['paths']),
        }));
      }
      
      return problems;
    };
  }
  // @chunk-end
};

// @chunk {"steps": ["custom-validation"]}
// Export functions for Redocly CLI (ES Module syntax)
// Note: In a real implementation, this would be exported as a plugin
// For this demonstration, the export is commented out to avoid loading errors

/*
export default {
  id: 'security',
  assertions: SecurityFunctions
};
*/

// For demonstration purposes - functions are available but not loaded as plugin
export { SecurityFunctions };
// @chunk-end
