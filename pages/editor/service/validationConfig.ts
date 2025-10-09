/**
 * OpenAPI validation configuration
 * Used by the language server for linting and validation
 */
export const validationConfig = {
  extends: ['minimal'],
  rules: {
    // Core structural validation
    'spec': 'error',
    'no-unresolved-refs': 'error',
    'operation-2xx-response': 'error',
    'path-parameters-defined': 'error',
    'operation-operationId-unique': 'error',
    'no-enum-type-mismatch': 'error',
    'path-declaration-must-exist': 'error',
    'operation-parameters-unique': 'error',
    'no-path-trailing-slash': 'error',
    'path-not-include-query': 'error',
    
    // Best practices
    'operation-tag-defined': 'warn',
    'tag-description': 'warn',
    'operation-operationId': 'warn',
    'operation-summary': 'warn',
    'info-contact': 'warn',
    'operation-description': 'warn',
  },
};

