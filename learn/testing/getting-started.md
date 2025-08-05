# Getting Started with Respect

This guide walks you through setting up Respect for API testing, from installation to running your first tests. By the end, you'll have a working API testing setup that validates your APIs against their OpenAPI specifications.

## Prerequisites

Before getting started, ensure you have:

- **Node.js** (version 16 or higher)
- **An OpenAPI specification** for your API
- **A running API server** (local or remote)
- **Basic familiarity with command line tools**

## Installation

Install the Redocly CLI which includes Respect:

```bash
# Install globally
npm install -g @redocly/cli

# Or use npx for one-time usage
npx @redocly/cli --version
```

Verify the installation:

```bash
redocly --version
```

## Project Setup

### 1. Initialize Your Project

Create a new directory for your API tests:

```bash
mkdir my-api-tests
cd my-api-tests
```

### 2. Add Your OpenAPI Specification

Place your OpenAPI specification file in the project directory:

```bash
# Example: copy your OpenAPI spec
cp path/to/your/openapi.yaml ./openapi.yaml
```

### 3. Generate Initial Tests

Generate test cases from your OpenAPI specification:

```bash
# Generate tests automatically
redocly respect generate openapi.yaml

# This creates:
# - respect.config.yaml (configuration file)
# - tests/ directory with generated test cases
```

## Configuration

Edit the generated `respect.config.yaml` to customize your testing setup:

```yaml
# respect.config.yaml
apiSpec: openapi.yaml
baseUrl: https://api.example.com
tests:
  outputDir: tests
  includes:
    - "**/*.test.yaml"
monitoring:
  enabled: true
  interval: 5m
```

### Key Configuration Options

- **`apiSpec`** - Path to your OpenAPI specification
- **`baseUrl`** - Base URL of your API server
- **`tests.outputDir`** - Directory for generated test files
- **`monitoring.enabled`** - Enable continuous monitoring
- **`monitoring.interval`** - How often to run monitoring tests

## Running Your First Tests

### Basic Test Execution

Run all generated tests:

```bash
redocly respect run
```

Run specific test files:

```bash
redocly respect run tests/users.test.yaml
```

### Understanding Test Output

Respect provides detailed output for each test:

```bash
✅ GET /users - Status Code: 200 ✓
✅ GET /users - Response Schema: ✓
✅ GET /users - Content Type: application/json ✓

❌ POST /users - Status Code: Expected 201, got 400 ✗
   Request: {"name": "John", "email": "invalid-email"}
   Response: {"error": "Invalid email format"}
   
✅ Tests passed: 3
❌ Tests failed: 1
```

## Common Use Cases

### 1. Local Development Testing

Test your API during development:

```bash
# Set local API URL
export API_BASE_URL=http://localhost:3000

# Run tests against local server
redocly respect run --base-url $API_BASE_URL
```

### 2. CI/CD Integration

Add Respect to your CI/CD pipeline:

```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install Redocly CLI
        run: npm install -g @redocly/cli
      - name: Run API Tests
        run: redocly respect run
```

### 3. Production Monitoring

Set up continuous monitoring:

```bash
# Enable monitoring mode
redocly respect monitor --interval 5m
```

## Next Steps

Now that you have Respect running, explore these advanced features:

- **[API Testing Use Cases](use-cases.md)** - Learn common testing scenarios
- **[Testing Best Practices](best-practices.md)** - Tips for effective testing
- **[Workflow Testing](workflow-testing.md)** - Test complex multi-step workflows

## Troubleshooting

### Common Issues

**❌ "OpenAPI specification not found"**
```bash
# Ensure your OpenAPI file exists and path is correct
ls -la openapi.yaml
redocly lint openapi.yaml
```

**❌ "Connection refused"**
```bash
# Check that your API server is running
curl http://localhost:3000/health
```

**❌ "Schema validation failed"**
```bash
# Check your OpenAPI spec for schema errors
redocly lint openapi.yaml --format=json
```

Need more help? Check out the [Respect documentation](/docs/respect) or join our community for support.