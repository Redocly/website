# API Testing Best Practices

This guide covers proven strategies and techniques for effective API testing with Respect. Following these best practices will help you build robust, maintainable test suites that catch issues early and provide reliable feedback.

## 1. Test Design Principles

### Start with Your OpenAPI Specification

**✅ Do:** Use your OpenAPI spec as the single source of truth
```yaml
# Always test against your documented API contract
openapi: 3.0.0
info:
  title: User API
paths:
  /users:
    post:
      responses:
        201:
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
```

**❌ Don't:** Write tests that contradict your API documentation
```yaml
# Bad: Testing for 200 when spec says 201
- test: Create user
  expect_status: 200  # Conflicts with OpenAPI spec!
```

### Test Both Happy and Sad Paths

**✅ Comprehensive test coverage:**
```yaml
test_scenarios:
  happy_path:
    - "Create user with valid data"
    - "Retrieve existing user"
    - "Update user successfully"
    
  error_conditions:
    - "Create user with invalid email"
    - "Access non-existent user (404)"
    - "Unauthorized access (401)"
    - "Malformed request body (400)"
```

### Use Realistic Test Data

**✅ Good test data:**
```json
{
  "name": "Alice Johnson",
  "email": "alice.johnson@example.com",
  "age": 29,
  "preferences": {
    "newsletter": true,
    "notifications": false
  }
}
```

**❌ Poor test data:**
```json
{
  "name": "test",
  "email": "test@test.com",
  "age": 1
}
```

---

## 2. Test Organization

### Structure Your Tests Logically

```
tests/
├── contracts/          # Schema validation tests
│   ├── users.test.yaml
│   └── orders.test.yaml
├── workflows/          # Multi-step business processes
│   ├── user-registration.arazzo.yaml
│   └── checkout-flow.arazzo.yaml
├── performance/        # Load and performance tests
│   └── stress-tests.yaml
└── security/          # Security-focused tests
    └── auth-tests.yaml
```

### Group Related Tests

**✅ Logical grouping:**
```yaml
# users.test.yaml
description: "User management API tests"
tests:
  user_creation:
    - create_user_success
    - create_user_validation_errors
    - create_user_duplicate_email
    
  user_retrieval:
    - get_user_by_id
    - get_user_not_found
    - get_users_list_pagination
```

### Use Descriptive Test Names

**✅ Clear, descriptive names:**
```yaml
tests:
  - name: "POST /users returns 201 with valid user data"
  - name: "GET /users/{id} returns 404 for non-existent user"
  - name: "PUT /users/{id} validates email format"
```

**❌ Vague names:**
```yaml
tests:
  - name: "test1"
  - name: "user_test"
  - name: "check_api"
```

---

## 3. Data Management

### Use Test Data Factories

**✅ Reusable data generators:**
```yaml
# data-factories.yaml
factories:
  valid_user:
    name: "{{faker.name.firstName}} {{faker.name.lastName}}"
    email: "{{faker.internet.email}}"
    age: "{{faker.number.int(18, 65)}}"
    
  invalid_user:
    name: ""
    email: "invalid-email"
    age: -1
```

### Manage Test Environment State

**✅ Clean test environment:**
```yaml
setup:
  - clean_database
  - seed_reference_data
  - create_test_users

teardown:
  - cleanup_test_data
  - reset_database_state
```

### Use Environment-Specific Configuration

```yaml
# respect.config.yaml
environments:
  development:
    base_url: http://localhost:3000
    database: test_db
    
  staging:
    base_url: https://staging-api.example.com
    database: staging_db
    
  production:
    base_url: https://api.example.com
    monitoring_only: true  # Don't modify data
```

---

## 4. Error Handling and Validation

### Test All Error Conditions

**✅ Comprehensive error testing:**
```yaml
error_scenarios:
  validation_errors:
    - missing_required_fields
    - invalid_data_types
    - constraint_violations
    
  authentication_errors:
    - missing_credentials
    - invalid_tokens
    - expired_sessions
    
  business_logic_errors:
    - insufficient_permissions
    - resource_conflicts
    - rate_limiting
```

### Validate Error Response Format

```yaml
error_response_validation:
  required_fields:
    - error_code
    - error_message
    - timestamp
    - request_id
    
  schema:
    type: object
    properties:
      error_code:
        type: string
        pattern: "^[A-Z_]+$"
      error_message:
        type: string
        minLength: 1
```

---

## 5. Performance Considerations

### Set Appropriate Timeouts

```yaml
# Performance thresholds
timeouts:
  connection: 5s
  response: 30s
  workflow: 300s

thresholds:
  response_time_p95: 1000ms
  response_time_p99: 2000ms
  error_rate: 0.1%
```

### Test Under Load

```yaml
load_testing:
  scenarios:
    normal_load:
      users: 10
      duration: 5m
      
    peak_load:
      users: 50
      duration: 2m
      
    stress_test:
      users: 100
      duration: 1m
```

---

## 6. CI/CD Integration

### Run Tests at Multiple Stages

```yaml
# CI/CD pipeline stages
stages:
  pre_commit:
    - contract_tests
    - unit_tests
    
  pull_request:
    - full_test_suite
    - performance_regression_tests
    
  deployment:
    - smoke_tests
    - workflow_tests
    
  post_deployment:
    - monitoring_tests
    - end_to_end_tests
```

### Fail Fast Strategy

**✅ Quick feedback:**
```yaml
test_execution:
  fail_fast: true
  parallel: true
  timeout: 30m
  
test_order:
  1. schema_validation     # Fast, catches basic issues
  2. contract_tests        # Medium speed, validates API contract
  3. workflow_tests        # Slower, tests complex scenarios
  4. performance_tests     # Slowest, run last
```

---

## 7. Monitoring and Alerting

### Set Up Continuous Monitoring

```yaml
monitoring:
  production:
    frequency: 5m
    endpoints:
      - /health
      - /api/users
      - /api/orders
    alerts:
      - slack_channel: "#api-alerts"
      - email: "team@example.com"
      
  critical_workflows:
    frequency: 15m
    workflows:
      - user_registration
      - payment_processing
```

### Track Key Metrics

```yaml
metrics:
  reliability:
    - success_rate
    - error_rate
    - availability
    
  performance:
    - response_time_p50
    - response_time_p95
    - throughput
    
  business:
    - conversion_rate
    - user_satisfaction
    - revenue_impact
```

---

## 8. Common Pitfalls to Avoid

### ❌ Don't Test Implementation Details

**Bad:**
```yaml
- test: "Database query returns correct SQL"
- test: "Internal cache is updated"
```

**Good:**
```yaml
- test: "API returns user data within SLA"
- test: "Repeated requests are fast (caching working)"
```

### ❌ Don't Make Tests Dependent on Each Other

**Bad:**
```yaml
tests:
  - create_user          # Creates user ID 123
  - update_user_123      # Depends on previous test
  - delete_user_123      # Depends on both previous tests
```

**Good:**
```yaml
tests:
  - create_user:
      setup: create_test_user
      teardown: cleanup_test_user
      
  - update_user:
      setup: create_test_user
      teardown: cleanup_test_user
```

### ❌ Don't Ignore Flaky Tests

**Signs of flaky tests:**
- Tests pass locally but fail in CI
- Tests fail intermittently without code changes
- Tests depend on timing or external services

**Solutions:**
- Add proper waits and retries
- Use test data isolation
- Mock external dependencies
- Investigate and fix root causes

---

## Next Steps

Now that you understand API testing best practices, explore these advanced topics:

- **[Workflow Testing](workflow-testing.md)** - Test complex multi-step scenarios
- **[Getting Started Guide](getting-started.md)** - Set up your first tests
- **[API Testing Use Cases](use-cases.md)** - Common testing scenarios

Remember: Good API tests are fast, reliable, and provide clear feedback. Start simple and gradually add complexity as your testing needs grow.