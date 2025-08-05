# What is Respect?

Respect is Redocly's OpenAPI-aware API testing and monitoring solution that ensures your APIs behave exactly as documented. Unlike traditional API monitoring tools that only check uptime, Respect validates that your API responses match your OpenAPI specifications.

## Key Features

**📋 Contract Testing**
- Validates API responses against OpenAPI schemas
- Ensures backward compatibility
- Catches breaking changes before they reach production

**🔄 Workflow Testing**  
- Tests multi-step API interactions using Arazzo workflows
- Validates complex business processes
- Ensures data flows correctly between API calls

**📊 Continuous Monitoring**
- Monitors APIs in production for drift and regressions
- Alerts when APIs deviate from specifications
- Provides detailed reports on API health

**⚡ Automated Test Generation**
- Generates test cases directly from OpenAPI specifications
- Reduces manual test writing effort
- Keeps tests in sync with API documentation

## How Respect Works

```yaml
# Example Respect workflow
1. Define API Specification:
   - Create OpenAPI specification
   - Document expected responses and schemas

2. Generate Tests:
   - Respect reads your OpenAPI spec
   - Automatically creates test cases
   - Generates workflow tests from Arazzo files

3. Run Tests:
   - Execute tests against your API
   - Validate responses match specifications
   - Report any discrepancies or failures

4. Monitor Production:
   - Continuously validate API behavior
   - Alert on specification drift
   - Track API health over time
```

## Why Choose Respect?

**OpenAPI-First Approach**
- Uses your existing API documentation as the source of truth
- No need to maintain separate test specifications
- Documentation and tests stay in sync automatically

**Developer-Friendly**
- Integrates with existing CI/CD pipelines
- Works with any OpenAPI-compatible specification
- Provides clear, actionable error reports

**Enterprise Ready**
- Scales from single APIs to complex microservice architectures
- Supports team collaboration and governance
- Integrates with monitoring and alerting systems

## Getting Started

Ready to start testing your APIs with Respect? Check out our [Getting Started guide](getting-started.md) to learn how to install and configure Respect for your project.

## Learn More

- [Getting Started with Respect](getting-started.md) - Installation and basic setup
- [API Testing Use Cases](use-cases.md) - Common testing scenarios
- [Testing Best Practices](best-practices.md) - Tips for effective API testing
- [Workflow Testing](workflow-testing.md) - Advanced multi-step testing