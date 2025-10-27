This article covers the following key topics:

- Practical applications of Arazzo:
  - Automating repetitive API actions.
  - Covering APIs with integration tests for CI/CD routines.
  - Keeping API documentation synchronized with actual API behavior.
  - Sharing described workflows with team members.
- Using the open-source tool [@redocly/cli](https://www.npmjs.com/package/@redocly/cli), an early Arazzo adopter, to execute workflows.

## Writing REST API integration tests with Arazzo

### The Problem

Many QA engineers test APIs using the same language in which the APIs are implemented. This approach can require significant effort to maintain, especially in complex systems with multiple products written in different languages.

Another common challenge relates to team collaboration when working with multiple APIs. Documentation often becomes outdated quickly when developers apply changes to APIs but forget to synchronize the documentation. A systematic way to track these discrepancies is needed.

### Prerequisites

To follow the examples in this article, the following setup is required:

- Familiarity with [Arazzo](./what-is-arazzo.md).
- A described API. The examples use a simplified version of a [public API](https://fakestoreapi.com/docs).

```yaml
openapi: 3.1.0
info:
  title: FakeStoreAPI
  description: A free fake API for testing and prototyping e-commerce applications.
  version: v2.1.11
  contact:
    email: support@fakestoreapi.com
    url: https://fakestoreapi.com/docs
  x-logo:
    url: "/icons/logo.png"
    href: "/"
security: []
tags:
- name: Products
  x-displayName: "\U0001F6D2 Products"
servers:
  - url: https://fakestoreapi.com
paths:
  "/products":
    get:
      summary: Get all products
      description: Retrieve a list of all available products.
      operationId: getAllProducts
      tags:
        - Products
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  "$ref": "#/components/schemas/Product"
        '400':
          description: Bad request
    post:
      summary: Add a new product
      description: Create a new product.
      operationId: addProduct
      tags:
        - Products
      requestBody:
        required: true
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/Product"
      responses:
        '201':
          description: Product created successfully
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Product"
        '400':
          description: Bad request
  "/products/{id}":
    get:
      summary: Get a single product
      description: Retrieve details of a specific product by ID.
      operationId: getProductById
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Product"
        '400':
          description: Bad request
      examples:
        - name: Product example
          value:
            id: 21
            title: Product 1
            price: 100
            description: Product 1 description
            category: Category 1
            image: http://example.com
    put:
      summary: Update a product
      description: Update an existing product by ID.
      operationId: updateProduct
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              "$ref": "#/components/schemas/Product"
      responses:
        '200':
          description: Product updated successfully
          content:
            application/json:
              schema:
                "$ref": "#/components/schemas/Product"
        '400':
          description: Bad request
    delete:
      summary: Delete a product
      description: Delete a specific product by ID.
      operationId: deleteProduct
      tags:
        - Products
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Product deleted successfully
        '400':
          description: Bad request
components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        price:
          type: number
          format: float
        description:
          type: string
        category:
          type: string
        image:
          type: string
          format: uri
```

### Create simple local Json-server to simulate real API

For demonstration purposes, this example simulates an API. In production use cases, this could be an API test instance or production API endpoint.

Create a `db.json` file to serve as storage and define an empty `products` structure:
```json
  {
    "products": []
  }
```

Start the json-server:

```bash
  npx json-server --watch db.json --port 3000
```

Note: The json-server will continuously populate this file with data. If issues arise, reset the content in the `db.json` file.

### Create Arazzo description

There are three approaches to creating an Arazzo description:
- Read the [Arazzo specification](https://spec.openapis.org/arazzo/latest.html) and write it from scratch for full control.
- Use the `npx @redocly/cli@latest generate-arazzo docs-data.yaml` CLI command as a starting point to understand the Arazzo structure and see how to describe all operations.
- Use AI assistance to generate the Arazzo specification, ensuring to lint the output to catch any errors.

Regardless of the approach chosen, validate the Arazzo file using Redocly CLI:
```bash
  npx @redocly/cli@latest lint products.arazzo.yaml
```

```bash
No configurations were provided -- using built in recommended configuration by default.

validating products.arazzo.yaml...
products.arazzo.yaml: validated in 6ms

Woohoo! Your API description is valid. 🎉
```

Here is an example of a simple CRUD workflow.

```yaml
arazzo: 1.0.1
info:
  title: FakeStoreAPI
  version: v2.1.11
sourceDescriptions:
  - name: docs-data
    type: openapi
    url: docs-data.yaml
workflows:
  - workflowId: products-crud
    steps:
      - stepId: post-products-step
        operationId: $sourceDescriptions.docs-data.addProduct
        requestBody:
          payload:
            id: test-id
            price: 100
            title: Surely You're Joking, Mr. Feynman!
            description: Book
            category: mathematics
            image: http://example.com
        outputs:
          product-id: $response.body#/id
        successCriteria:
          - condition: $statusCode == 201
      - stepId: get-product
        operationId: $sourceDescriptions.docs-data.getProductById
        parameters:
          - name: id
            in: path
            value: $steps.post-products-step.outputs.product-id
        successCriteria:
          - condition: $statusCode == 200
      - stepId: put-products-{id}-step
        operationId: $sourceDescriptions.docs-data.updateProduct
        parameters:
          - name: id
            in: path
            value: $steps.post-products-step.outputs.product-id
        requestBody:
          payload:
            id: 21
            price: 100
            title: Surely You're Joking, Mr. Feynman!
            description: Book
            category: physics
            image: http://example.com
        successCriteria:
          - condition: $statusCode == 200
      - stepId: get-updated-product
        operationId: $sourceDescriptions.docs-data.getProductById
        parameters:
          - name: id
            in: path
            value: $steps.post-products-step.outputs.product-id
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/category == 'physics'
      - stepId: delete-products-{id}-step
        operationId: $sourceDescriptions.docs-data.deleteProduct
        parameters:
          - name: id
            in: path
            value: $steps.post-products-step.outputs.product-id
        successCriteria:
          - condition: $statusCode == 200

```

This example demonstrates a common CRUD operation found in REST APIs.
Key components:

- SourceDescriptions define the connection to the OpenAPI description:

``` yaml
sourceDescriptions:
  - name: docs-data
    type: openapi
    url: docs-data.yaml
```

- Each Step has an operationId that creates the connection to the OpenAPI specification:
```yaml
operationId: $sourceDescriptions.docs-data.addProduct
```
This step resolves the `addProduct` operation from the `docs-data` sourceDescription, which connects to the `docs-data.yaml` file:

```yaml
post:
  summary: Add a new product
  description: Create a new product.
  operationId: addProduct
  tags:
    - Products
```
This connection also enables verification of the expected response type.

- Steps can have outputs that can be referenced in subsequent steps:
```yaml
outputs:
  product-id: $response.body#/id
```

```yaml
parameters:
  - name: id
    in: path
    value: $steps.post-products-step.outputs.product-id
```

- Steps can include a successCriteria section to define expectations:
```yaml
successCriteria:
  - condition: $statusCode == 200
```

### Execute the workflow using Redocly CLI

[@redocly/cli](https://www.npmjs.com/package/@redocly/cli) is an open-source tool that supports Arazzo specification execution with the `respect` command.

```bash
npx @redocly/cli@latest respect products.arazzo.yaml --server docs-data=http://localhost:3000
```

The `server` override targets a custom endpoint. Additional command options are available in the [documentation](https://redocly.com/docs/cli/commands/respect).
The execution results display as follows:

```bash
  Running workflow products.arazzo.yaml / products-crud 
 
  ✓ POST /products - step post-products-step 
    ✓ success criteria check - $statusCode == 201
    ✓ status code check - $statusCode in [201, 400]
    ✓ content-type check
    ✓ schema check
 
  ✓ GET /products/{id} - step get-product 
    ✓ success criteria check - $statusCode == 200
    ✓ status code check - $statusCode in [200, 400]
    ✓ content-type check
    ✓ schema check
 
  ✓ PUT /products/{id} - step put-products-{id}-step 
    ✓ success criteria check - $statusCode == 200
    ✓ status code check - $statusCode in [200, 400]
    ✓ content-type check
    ✓ schema check
 
  ✓ GET /products/{id} - step get-updated-product 
    ✓ success criteria check - $statusCode == 200
    ✓ success criteria check - $response.body#/category == 'physics'
    ✓ status code check - $statusCode in [200, 400]
    ✓ content-type check
    ✓ schema check
 
  ✓ DELETE /products/{id} - step delete-products-{id}-step 
    ✓ success criteria check - $statusCode == 200
    ✓ status code check - $statusCode in [200, 400]
 
 
  Summary for products.arazzo.yaml
  
  Workflows: 1 passed, 1 total
  Steps: 5 passed, 5 total
  Checks: 19 passed, 19 total
  Time: 71ms 
 
 
┌──────────────────────────────────────────────────────────────┬────────────┬─────────┬─────────┬──────────┐
│ Filename                                                     │ Workflows  │ Passed  │ Failed  │ Warnings │
├──────────────────────────────────────────────────────────────┼────────────┼─────────┼─────────┼──────────┤
│ ✓ products.arazzo.yaml                                       │ 1          │ 1       │ -       │ -        │
└──────────────────────────────────────────────────────────────┴────────────┴─────────┴─────────┴──────────┘
```

### What if something goes out of hand

The previous example showed all checks passing successfully. Analyzing a particular step reveals the verification process.
Here is the `get-updated-product` step execution result:

```bash
  ✓ GET /products/{id} - step get-updated-product 
    ✓ success criteria check - $statusCode == 200
    ✓ success criteria check - $response.body#/category == 'physics'
    ✓ status code check - $statusCode in [200, 400]
    ✓ content-type check
    ✓ schema check
```

Besides the two `success criteria check` conditions defined in the Arazzo file, three additional checks were performed automatically.

```yaml
successCriteria:
  - condition: $statusCode == 200
  - condition: $response.body#/category == 'physics'
```

Since this step connects to an OpenAPI description, [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) automatically verifies that the API returns the documented response with the expected content-type and status.

To simulate a discrepancy, consider a scenario where a new `license` property is added to the API but the OpenAPI description is not updated.
Update the `db.json` file to include:

```json
{
  "products": [
    {
      "id": "test-id",
      "price": 100,
      "title": "Surely You're Joking, Mr. Feynman!",
      "description": "Book",
      "category": "mathematics",
      "image": "http://example.com",
      "license": "MIT"
    }
  ]
}
```

By default, json-server will return the first item with "test-id", which now includes the modification.
Execute the workflow with the respect command:

```bash
npx @redocly/cli@latest respect products.arazzo.yaml --verbose --server docs-data=http://localhost:3000/
```

The output now shows a failed check:

```
    stepId - get-product 
    ✗ schema check 
      
      UNEVALUATEDPROPERTIES must NOT have unevaluated properties: "license".
      
      > 1 | {
         | ^
      > 2 |   "id": "test-id",
         | ^^^^^^^^^^^^^^^^^^
      > 3 |   "price": 100,
         | ^^^^^^^^^^^^^^^^^^
      > 4 |   "title": "Surely You're Joking, Mr. Feynman!",
         | ^^^^^^^^^^^^^^^^^^
      > 5 |   "description": "Book",
         | ^^^^^^^^^^^^^^^^^^
      > 6 |   "category": "mathematics",
         | ^^^^^^^^^^^^^^^^^^
      > 7 |   "image": "http://example.com",
         | ^^^^^^^^^^^^^^^^^^
      > 8 |   "license": "MIT"
         | ^^^^^^^^^^^^^^^^^^
      > 9 | }
         | ^^ 👈🏽  unevaluatedProperties must NOT have unevaluated properties: "license".
```

This indicates a mismatch between the API and documentation. The next steps are to either fix the API code or update the documentation if the change was intentional.

If the change is expected and the new license property should be part of the Product schema, update the API documentation to add the `license` property:

```yaml
components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
...
        license:
          type: string
```

This demonstrates how easily unexpected API changes can be detected.

### Practical Applications

Once an Arazzo workflow has been created and verified locally, several paths forward are available:

- Include the workflow in a CI/CD pipeline to ensure API documentation stays in sync with the actual API:

```bash
# Spawn your API instance
npm install @redocly/cli@latest -g
redocly respect products.arazzo.yaml --verbose
```

- Set up routine automation for daily development tasks.
- Describe desired application flows with Arazzo and share files with team members. Non-technical users can use visualization tools like Replay to understand the workflows.

<!-- TODO: add link to Relay -->

### Summary

Arazzo is a powerful standard that enables declarative description of API workflows with various practical applications.
As tooling development progresses, Arazzo can help maintain API test coverage, keep documentation synchronized, and improve team collaboration in complex projects.