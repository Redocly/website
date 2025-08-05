# Workflow Testing with Arazzo

Workflow testing goes beyond testing individual API endpoints to validate complete business processes that span multiple API calls. Using Arazzo specifications, you can define and test complex multi-step workflows with Respect.

## What is Workflow Testing?

**Traditional API Testing:**
- Tests individual endpoints in isolation
- Validates request/response pairs
- Limited to single API operations

**Workflow Testing:**
- Tests complete business processes
- Validates data flow between operations
- Ensures end-to-end functionality works

### Real-World Example

Consider an e-commerce checkout process:

```yaml
# Traditional approach - test each step separately
1. POST /cart/items        ✓ Item added
2. GET /cart               ✓ Cart retrieved  
3. POST /orders            ✓ Order created
4. POST /payments          ✓ Payment processed
5. GET /orders/{id}        ✓ Order confirmed

# But does the COMPLETE workflow work? 🤔
```

**Workflow testing** validates that these steps work together as a cohesive business process.

---

## Arazzo Fundamentals

[Arazzo](https://spec.arazzo.io/) is an open standard for describing API workflows. It extends OpenAPI by defining sequences of API calls and data dependencies.

### Basic Arazzo Structure

```yaml
# checkout-workflow.arazzo.yaml
arazzo: 1.0.0
info:
  title: E-commerce Checkout Workflow
  version: 1.0.0

sourceDescriptions:
  - name: ecommerce-api
    url: openapi.yaml

workflows:
  - workflowId: complete_checkout
    description: Complete checkout process from cart to order
    steps:
      - stepId: add_to_cart
        description: Add item to shopping cart
        operationPath: $sourceDescriptions.ecommerce-api.url#/paths/~1cart~1items/post
        parameters:
          - name: product_id
            in: requestBody
            value: "12345"
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          cart_id: $response.body.cart_id

      - stepId: create_order
        description: Create order from cart
        operationPath: $sourceDescriptions.ecommerce-api.url#/paths/~1orders/post
        dependsOn: add_to_cart
        parameters:
          - name: cart_id
            in: requestBody
            value: $steps.add_to_cart.outputs.cart_id
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          order_id: $response.body.order_id
          total_amount: $response.body.total

      - stepId: process_payment
        description: Process payment for order
        operationPath: $sourceDescriptions.ecommerce-api.url#/paths/~1payments/post
        dependsOn: create_order
        parameters:
          - name: order_id
            in: requestBody
            value: $steps.create_order.outputs.order_id
          - name: amount
            in: requestBody
            value: $steps.create_order.outputs.total_amount
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body.status == 'completed'
```

---

## Running Workflow Tests

### Execute with Respect

```bash
# Run a specific workflow
npx @redocly/cli respect checkout-workflow.arazzo.yaml

# Run with input parameters
npx @redocly/cli respect checkout-workflow.arazzo.yaml \
  --input product_id=12345 \
  --input user_id=67890

# Run in verbose mode for detailed output
npx @redocly/cli respect checkout-workflow.arazzo.yaml --verbose
```

### Understanding Output

```bash
🚀 Starting workflow: complete_checkout

✅ Step 1: add_to_cart
   POST /cart/items → 201 Created
   Output: cart_id = "cart_abc123"

✅ Step 2: create_order  
   POST /orders → 201 Created
   Input: cart_id = "cart_abc123"
   Output: order_id = "order_xyz789", total_amount = 29.99

✅ Step 3: process_payment
   POST /payments → 200 OK
   Input: order_id = "order_xyz789", amount = 29.99
   Payment status: completed

🎉 Workflow completed successfully!
   Total steps: 3
   Duration: 1.2s
```

---

## Advanced Workflow Patterns

### Conditional Logic

```yaml
# workflow with conditional steps
steps:
  - stepId: check_inventory
    operationPath: $sourceDescriptions.api.url#/paths/~1inventory~1{product_id}/get
    parameters:
      - name: product_id
        in: path
        value: $inputs.product_id
    outputs:
      in_stock: $response.body.available
      quantity: $response.body.quantity

  - stepId: create_order
    condition: $steps.check_inventory.outputs.in_stock == true
    operationPath: $sourceDescriptions.api.url#/paths/~1orders/post
    
  - stepId: handle_backorder
    condition: $steps.check_inventory.outputs.in_stock == false
    operationPath: $sourceDescriptions.api.url#/paths/~1backorders/post
```

### Error Handling

```yaml
steps:
  - stepId: process_payment
    operationPath: $sourceDescriptions.api.url#/paths/~1payments/post
    successCriteria:
      - condition: $statusCode == 200
      - condition: $response.body.status == 'completed'
    onFailure:
      - stepId: send_failure_notification
        operationPath: $sourceDescriptions.api.url#/paths/~1notifications/post
        parameters:
          - name: type
            in: requestBody
            value: "payment_failed"
```

### Parallel Execution

```yaml
steps:
  - stepId: create_order
    # ... order creation logic
    
  # These steps run in parallel after order creation
  - stepId: send_confirmation_email
    dependsOn: create_order
    operationPath: $sourceDescriptions.api.url#/paths/~1emails/post
    
  - stepId: update_inventory
    dependsOn: create_order  
    operationPath: $sourceDescriptions.api.url#/paths/~1inventory/put
    
  - stepId: log_analytics
    dependsOn: create_order
    operationPath: $sourceDescriptions.api.url#/paths/~1analytics/post
```

---

## Common Workflow Testing Scenarios

### 1. User Registration Flow

```yaml
workflows:
  - workflowId: user_onboarding
    steps:
      - stepId: create_account
        operationPath: '#/paths/~1users/post'
        outputs:
          user_id: $response.body.id
          
      - stepId: send_verification_email
        dependsOn: create_account
        operationPath: '#/paths/~1emails~1verification/post'
        parameters:
          - name: user_id
            value: $steps.create_account.outputs.user_id
            
      - stepId: create_user_profile
        dependsOn: create_account
        operationPath: '#/paths/~1profiles/post'
        parameters:
          - name: user_id
            value: $steps.create_account.outputs.user_id
```

### 2. Order Processing

```yaml
workflows:
  - workflowId: order_fulfillment
    steps:
      - stepId: validate_order
        operationPath: '#/paths/~1orders~1{order_id}~1validate/post'
        
      - stepId: reserve_inventory
        dependsOn: validate_order
        operationPath: '#/paths/~1inventory~1reserve/post'
        
      - stepId: calculate_shipping
        dependsOn: reserve_inventory
        operationPath: '#/paths/~1shipping~1calculate/post'
        
      - stepId: generate_invoice
        dependsOn: [reserve_inventory, calculate_shipping]
        operationPath: '#/paths/~1invoices/post'
```

### 3. Data Migration

```yaml
workflows:
  - workflowId: migrate_user_data
    steps:
      - stepId: export_legacy_data
        operationPath: '#/paths/~1legacy~1users~1export/post'
        outputs:
          export_id: $response.body.export_id
          
      - stepId: transform_data
        dependsOn: export_legacy_data
        operationPath: '#/paths/~1transform/post'
        parameters:
          - name: export_id
            value: $steps.export_legacy_data.outputs.export_id
            
      - stepId: import_to_new_system
        dependsOn: transform_data
        operationPath: '#/paths/~1users~1import/post'
        
      - stepId: verify_migration
        dependsOn: import_to_new_system
        operationPath: '#/paths/~1migration~1verify/post'
```

---

## Testing Strategies

### 1. Smoke Testing

Quick validation that critical workflows work:

```bash
# Run essential workflows after deployment
npx @redocly/cli respect user-registration.arazzo.yaml
npx @redocly/cli respect checkout-process.arazzo.yaml
npx @redocly/cli respect payment-processing.arazzo.yaml
```

### 2. Regression Testing

Ensure workflows continue working after changes:

```yaml
# CI/CD pipeline
regression_tests:
  - user_onboarding.arazzo.yaml
  - order_processing.arazzo.yaml
  - data_sync.arazzo.yaml
  - admin_workflows.arazzo.yaml
```

### 3. Performance Testing

Test workflow performance under load:

```bash
# Run workflow with multiple concurrent users
npx @redocly/cli respect checkout-workflow.arazzo.yaml \
  --concurrent-users 10 \
  --duration 5m
```

---

## Best Practices

### ✅ Design for Testability

**Make workflows deterministic:**
```yaml
# Use consistent test data
inputs:
  product_id: "test-product-123"
  user_id: "test-user-456"
  
# Set up clean test state
setup:
  - clear_test_data
  - seed_test_products
```

### ✅ Handle Async Operations

**Wait for completion:**
```yaml
steps:
  - stepId: start_processing
    operationPath: '#/paths/~1process/post'
    outputs:
      job_id: $response.body.job_id
      
  - stepId: wait_for_completion
    operationPath: '#/paths/~1jobs~1{job_id}/get'
    parameters:
      - name: job_id
        value: $steps.start_processing.outputs.job_id
    successCriteria:
      - condition: $response.body.status == 'completed'
    retryPolicy:
      maxAttempts: 10
      interval: 2s
```

### ✅ Test Error Scenarios

**Include failure cases:**
```yaml
workflows:
  - workflowId: payment_failure_handling
    steps:
      - stepId: attempt_payment
        operationPath: '#/paths/~1payments/post'
        parameters:
          - name: card_number
            value: "4000000000000002"  # Test card that fails
        successCriteria:
          - condition: $statusCode == 400
          
      - stepId: handle_failure
        dependsOn: attempt_payment
        operationPath: '#/paths/~1orders~1{order_id}~1cancel/post'
```

---

## Integration with CI/CD

### Automated Workflow Testing

```yaml
# .github/workflows/api-tests.yml
name: API Workflow Tests

on: [push, pull_request]

jobs:
  workflow-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup test environment
        run: |
          docker-compose up -d
          ./scripts/wait-for-services.sh
          
      - name: Run workflow tests
        run: |
          npx @redocly/cli respect workflows/*.arazzo.yaml
          
      - name: Cleanup
        if: always()
        run: docker-compose down
```

---

## Next Steps

Ready to implement workflow testing? Here's your action plan:

1. **Start Simple:** Begin with a basic 2-3 step workflow
2. **Identify Critical Paths:** Focus on your most important business processes
3. **Build Incrementally:** Add complexity as you gain experience
4. **Monitor and Maintain:** Keep workflows updated as your API evolves

### Related Resources

- **[Getting Started Guide](getting-started.md)** - Basic Respect setup
- **[API Testing Use Cases](use-cases.md)** - More testing scenarios  
- **[Testing Best Practices](best-practices.md)** - General testing guidance
- **[Arazzo Specification](https://spec.arazzo.io/)** - Official Arazzo docs

Workflow testing transforms how you validate API integrations - from isolated endpoint testing to comprehensive business process validation.