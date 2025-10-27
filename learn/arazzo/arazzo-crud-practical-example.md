To bring more value for the readers, here are a few key takeaways one can get by reading this article:

- Learn about possible practical applications:
  - Automate repetitive actions you perform with the APIs.
  - Cover your API with integration tests and use it in your CI/CD routines.
  - Keeping your API documentation always in sync with the real API behavior.
  - Share described workflows with other people.
- All heavy lifting will be done with the help of open source tool - [@redocly/cli](https://www.npmjs.com/package/@redocly/cli), the early Arazzo adopter. You can try it and see if it works for you.

## Writing REST API integration tests with Arazzo

### The Problem

During talks with my fellow QA engineers, I asked them how they usually test APIs, maybe there is some new thing I missed.
That was not a random question, I was actually using in-house tool for testing our own APIs, very similar to future Arazzo standard.

To my surprise, most integration tests they did were written on the same language as the actual APIs implemented. That can take a lot of effort to keep everything up and running when you have complex systems with a fusion of different products.

Another problem relates to team collaboration when working with multiple APIs. Documentation gets out of sync surprisingly fast, as majority of developers apply changes to API but forget to synchronize documentation. Wish there were a way to track this discrepancy...

### Prerequisites

Lets dive deeper and learn by doing.
As always you will need to have some pre-setup if you want to follow next steps:

- If you haven't already read, get yourself familiar with the [Arazzo](./what-is-arazzo.md).
- Need to have described API. Maybe it is still not a popular practice in a smaller projects, but I would advise you to try and you will appreciate the benefits it brings. I will use some simplified version of the [public API](https://fakestoreapi.com/docs) I found on the internet.

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

For the pure demonstration purpose we are going to simulate the API. In your daily usage it can be some API test instance or real production API.

Create `db.json` file, that will be our storage and define our empty `products` structure:
```json
  {
    "products": []
  }
```

Spin out the json-server:

```bash
  npx json-server --watch db.json --port 3000
```

Json-server will constantly populate this file with some data, if you find that something is not working, please try to reset the
content in `db.json` file.

### Create Arazzo description

As practical advice I can see like three ways you can go to make an Arazzo description:
- Read the [Arazzo specification](https://spec.openapis.org/arazzo/latest.html) and write it from scratch. This is my favorite way as you have full control.
- Use `redocly generate-arazzo docs-data.yaml` cli command. This is a good starting point that can give you the overview of Arazzo structure and shows how to describe all operations in docs. You can delete those you don't need or use generated file as a reference point.
- Use AI help and ask to create Arazzo specification. This sometimes leads to hallucinations so make sure you lint the outcome.

I wrote one by hand, but regardless of your choice you can always check if it is correct by linting it with Redocly/CLI:
```bash
  npx @redocly/cli@latest lint products.arazzo.yaml
```

```bash
No configurations were provided -- using built in recommended configuration by default.

validating products.arazzo.yaml...
products.arazzo.yaml: validated in 6ms

Woohoo! Your API description is valid. 🎉
```

Here is an example of simple CRUD workflow.

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

This is an example of a common CRUD operation that can be found in any REST API.
Key parts:

- SourceDescriptions is the place where we describe the connection to OpenAPI description:

``` yaml
sourceDescriptions:
  - name: docs-data
    type: openapi
    url: docs-data.yaml
```

- Each Step have operationId, this is the exact place where the bond with the OpenAPI made.
```yaml
operationId: $sourceDescriptions.docs-data.addProduct
```
What it says is that this step will resolve the `addProduct` operation from the `docs-data` sourceDescription, that in fact a connection to this file `docs-data.yaml`:

```yaml
post:
  summary: Add a new product
  description: Create a new product.
  operationId: addProduct
  tags:
    - Products
```
This also gives the power to verify expected response type.

- Step can have outputs, that can be used in other steps when referenced
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

- Step can have successCriteria section, where you describe your expectation.
```yaml
successCriteria:
  - condition: $statusCode == 200
```

### Execute the workflow using Redocly/CLI

[@redocly/cli](https://www.npmjs.com/package/@redocly/cli) is an open-source product that among others support Arazzo specs execution with `respect` command.

```bash
npx @redocly/cli@latest respect products.arazzo.yaml --server docs-data=http://localhost:3000
```

We are going to use `server` override here to use our own target endpoint, you can read more about command options [here](https://redocly.com/docs/cli/commands/respect).
After running this command you can see the result of execution:

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

As you already have seen in previous example - all checks were successful. Lets pick up one particular step and analyze what is going on.
Here is a `get-updated-product` step execution result:

```bash
  ✓ GET /products/{id} - step get-updated-product 
    ✓ success criteria check - $statusCode == 200
    ✓ success criteria check - $response.body#/category == 'physics'
    ✓ status code check - $statusCode in [200, 400]
    ✓ content-type check
    ✓ schema check
```

You can see that beside the two `success criteria check` that we defined in Arazzo file, the 3 more checks were performed.

```yaml
successCriteria:
  - condition: $statusCode == 200
  - condition: $response.body#/category == 'physics'
```

Knowing the fact that this step is connected to OpenAPI description, with the help of [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) we can for free check, that API return documented response, with expected content-type and status.

Lets simulate some discrepancy, imagine a new `license` property were added by fellow developers in API, but they forgot to update the OpenAPI description.
Update your `db.json` file to be:

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

By default json-server will return the first item with the "test-id", and it will be modified now.
Execute your workflow with the respect command and see the output:

```bash
npx @redocly/cli@latest respect products.arazzo.yaml --verbose --server docs-data=http://localhost:3000/
```
You should see now the failed check:

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

This gives you the understanding that something is wrong. So it can be an API issue, or not updated documentation, in case change to API was made on purpose.
What are the next steps? Fix API code or update the documentation.
Imagine the change is expected and we now have new license property in Product. In this case we should go to our API document and add `license` property to the schema.

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

Thats how easy you can detect the unexpected API changes.

### Practical Applications

So you have this Arazzo workflow you described on your local machine and now can verify API is in sync.
Were can you go from here:

- One of the option is to include this into your CI/CD pipeline. This way you can make sure your API docs are in sync with the actual API.

```bash
# Spawn your API instance
npm install @redocly/cli@latest -g
redocly respect products.arazzo.yaml --verbose
```

- Set up any other routine automation you need in your daily work.
- You can describe the desired application flow with Arazzo and share this file with a fellow teammates. Non-technical users can use other tools to get some visual representation. Like Replay

<!-- TODO: add link to Relay -->

### Summary

Arazzo is a powerful new standard that gives you a way to declaratively describe different API workflows with a variety of practical applications.
As tooling development progresses you can use Arazzo to keep your API covered with tests, documentation in sync and improves teams collaboration in complex projects.