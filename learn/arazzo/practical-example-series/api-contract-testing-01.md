This article shows how to use Respect, powered by Arazzo workflows, for API contract testing. You will learn how to describe an API workflow, execute it with Redocly CLI, and use the results to find mismatches between an OpenAPI description and the real API behavior.

You will cover the following topics:

- Practical applications of Arazzo:
  - Automating repetitive API workflows.
  - Adding API contract tests to CI/CD routines.
  - Keeping API documentation synchronized with actual API behavior.
  - Sharing described workflows across teams.
- Using the open-source [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) `respect` command to execute Arazzo workflows.

# Respect Practical Example Series [01]

## API Contract Testing with Respect

### The problem

Many teams test APIs by writing test code in the same language as the API implementation. This can work well for a single service, but it becomes harder to maintain in systems with multiple products, repositories, and programming languages.

Another common challenge is keeping API documentation aligned with actual API behavior. Developers may update an endpoint but forget to update its OpenAPI description, or the documentation may change without the implementation following it. Over time, these small differences make it harder for QA engineers, developers, and technical writers to trust the API contract.

Respect helps address this problem by executing Arazzo workflows against a running API and validating the responses against the connected OpenAPI description. This makes API contract testing more declarative and easier to share across teams.

### Prerequisites

To follow the examples in this article, you need:

- Familiarity with [Arazzo](./what-is-arazzo.md).
- An API described with OpenAPI. The examples use a modified version of the Redocly Cafe API.
  <b>IMPORTANT: the API description intentionally contains discrepancies for demonstration purposes.</b>

```yaml
openapi: 3.1.0
info:
  title: Redocly Cafe
  description: |
    Demo API for cafe operators (not customers) to manage menus.
    Create API credentials and try it yourself in a realistic OpenAPI workflow.
  version: 1.0.0
  contact:
    email: team@redocly.com
    url: https://redocly.com/contact-us/
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
  termsOfService: https://redocly.com/subscription-agreement
servers:
  - url: https://cafe.cloud.redocly.com
    description: Live server.
tags:
  - name: Authorization
    description: Create a client to demo the API.
  - name: Products
    description: Operations related to products.
paths:
  /menu:
    get:
      tags:
        - Products
      summary: List all menu items
      description: Retrieve a collection of menu items with optional filtering and pagination.
      operationId: listMenuItems
      security: []
      parameters:
        - $ref: '#/components/parameters/After'
        - $ref: '#/components/parameters/Before'
        - $ref: '#/components/parameters/Sort'
        - $ref: '#/components/parameters/Filter'
        - $ref: '#/components/parameters/Search'
        - $ref: '#/components/parameters/Limit'
      responses:
        '200':
          description: Successful operation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MenuItemList'
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  parameters:
    After:
      name: after
      in: query
      required: false
      description: Use the `endCursor` as a value for the `after` parameter to get the next page.
      schema:
        type: string
      example: a25fgaksjf23la==
    Before:
      name: before
      in: query
      required: false
      description: |
        Use the `startCursor` as a value for the `before` parameter to get the next page.
      schema:
        type: string
      example: bfg23aksjf23zb1==
    Sort:
      name: sort
      description: |-
        To sort by id in descending menuItem use `-id`.
        To sort by id in ascending menuItem use `id`.
      in: query
      required: false
      schema:
        type: string
      example: '-name'
    Filter:
      name: filter
      description: |-
        Filters the collection items using space-separated `field:value` pairs.

        **Format:** `field1:value1 field2:value2`

        **Supported operators:**
        - `field:value` - Exact match
        - `field:value1,value2` - Match any of the comma-separated values (OR)
        - Time ranges: Use `30d` (30 days), `7d` (7 days), `1h` (1 hour), etc.

        **Examples:**
        - `status:placed` - Filter by single status.
        - `status:placed,completed` - Filter by multiple statuses.
        - `status:placed createdAt:7d` - Combine multiple filters.
      in: query
      required: false
      schema:
        type: string
      example: menuItemId:prd_01h1s5z6vf2mm1mz3hevnn9va7
    Search:
      name: search
      in: query
      description: |-
        Performs a case-insensitive text search across relevant fields in the collection.

        **Fields searched depend on the endpoint:**
        - **Menu items:** `name`, `photoTextDescription`

        Returns items where any of the searchable fields contain the search term as a substring.
      required: false
      schema:
        type: string
      example: coffee
    Limit:
      name: limit
      description: |
        Use to return a number of results per page.
        If there is more data, use in combination with `after` to page through the data.
      in: query
      required: false
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 10
      example: 10
  schemas:
    Page:
      type: object
      properties:
        endCursor:
          type:
            - string
            - 'null'
          description: |-
            Use with the `after` query parameter to load the next page of data.
            When `null`, there is no data.
            The cursor is opaque and internal structure is subject to change.
        startCursor:
          type:
            - string
            - 'null'
          description: |-
            Use with the `before` query parameter to load the previous page of data.
            When `null`, there is no data.
            The cursor is opaque and internal structure is subject to change.
        hasNextPage:
          type: boolean
          description: Indicates if there is a next page with items.
        hasPrevPage:
          type: boolean
          description: Indicates if there is a previous page with items.
        limit:
          type: integer
          minimum: 1
          maximum: 100
          default: 10
          description: Value showing how many items are in the page limit.
        total:
          type: integer
          description: Count of items across all pages.
          minimum: 0
      required:
        - endCursor
        - startCursor
        - hasNextPage
        - hasPrevPage
        - limit
        - total
    MenuBaseItem:
      type: object
      properties:
        createdAt:
          description: Created date.
          type: string
          format: date-time
          readOnly: true
        updatedAt:
          description: Updated date.
          type: string
          format: date-time
          readOnly: true
        id:
          description: Menu item ID. Unique identifier prefixed with `prd_`.
          type: string
          readOnly: true
          pattern: ^prd_[0-9abcdefghjkmnpqrstvwxyz]{26}$
          example: prd_01h1s5z6vf2mm1mz3hevnn9va7
        object:
          description: Entity name.
          type: string
          const: menuItem
          readOnly: true
        name:
          description: Menu item name.
          type: string
          minLength: 1
          maxLength: 50
        price:
          description: Price in cents.
          type: integer
          minimum: 0
        photo:
          writeOnly: true
          type:
            - string
            - 'null'
          format: binary
          description: Photo of the menu item. Must be a PNG image and less than 1MB.
        photoUrl:
          readOnly: true
          type: string
          format: uri
          description: Photo URL of the menu item.
        photoTextDescription:
          type:
            - string
            - 'null'
      required:
        - id
        - name
        - price
        - createdAt
        - updatedAt
        - object
    Beverage:
      allOf:
        - type: object
          properties:
            category:
              description: Menu item category.
              type: string
              const: beverage
            volume:
              type: number
              description: Size of the beverage in milliliters.
              exclusiveMinimum: 0
            containsCaffeine:
              type: boolean
              description: Indicates if the beverage contains caffeine.
        - $ref: '#/components/schemas/MenuBaseItem'
    Dessert:
      allOf:
        - type: object
          properties:
            category:
              description: Menu item category.
              type: string
              const: dessert
            calories:
              type: number
              exclusiveMinimum: 0
              description: Amount of calories.
        - $ref: '#/components/schemas/MenuBaseItem'
    MenuItem:
      discriminator:
        propertyName: category
        mapping:
          beverage: '#/components/schemas/Beverage'
          dessert: '#/components/schemas/Dessert'
      oneOf:
        - $ref: '#/components/schemas/Beverage'
        - $ref: '#/components/schemas/Dessert'
      required:
        - category
    MenuItemList:
      type: array
      items:
        type: object
        properties:
          object:
            type: string
            const: list
            description: Entity name.
          page:
            $ref: '#/components/schemas/Page'
          items:
            type: array
            items:
              $ref: '#/components/schemas/MenuItem'
        required:
          - object
          - page
          - items
    Error:
      type: object
      properties:
        type:
          type: string
          format: uri-reference
          description: URI reference that identifies the problem type.
          default: about:blank
        title:
          type: string
          description: Short summary of the problem type.
        status:
          type: integer
          format: int32
          description: |
            HTTP status code generated by the origin server for this occurrence of the problem.
          minimum: 100
          exclusiveMaximum: 600
        instance:
          type: string
          format: uri-reference
          description: |
            URI reference that identifies the specific occurrence of the problem, e.g. by adding a fragment identifier or sub-path to the problem type.
            May be used to locate the root of this problem in the source code.
          example: /some/uri-reference#specific-occurrence-context
        details:
          description: Additional error details.
          type: object
          additionalProperties: true
      required:
        - type
        - title
        - status
  responses:
    BadRequest:
      description: Bad request - invalid input parameters.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
    InternalServerError:
      description: Internal server error.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
```

### Create an Arazzo description

There are several ways to create an Arazzo description:

- Read the [Arazzo specification](https://spec.openapis.org/arazzo/latest.html) and write the file from scratch for full control.
- Use the `npx @redocly/cli@latest generate-arazzo docs-data.yaml` command as a starting point. This helps you understand the Arazzo structure and see how operations can be described.
- Use AI assistance to draft the Arazzo description, then lint the output to catch structural or syntax errors.

Whichever approach you choose, validate the Arazzo file with Redocly CLI:
```bash
  npx @redocly/cli@latest lint redocly-cafe-api.arazzo.yaml
```

```bash
No configurations were provided -- using built in recommended configuration by default.

validating redocly-cafe-api.arazzo.yaml...
redocly-cafe-api.arazzo.yaml: validated in 6ms

Woohoo! Your API description is valid. 🎉
```

The following simple workflow retrieves the menu items list.

```yaml
arazzo: 1.0.1
info:
  title: Redocly Cafe API - Products
  version: 1.0.0
  description: This is the API for the Redocly Cafe Products.
sourceDescriptions:
  - name: redocly-cafe-api
    type: openapi
    url: redocly-cafe-api.yaml

workflows:
  - workflowId: menu-items-workflow
    summary: Menu Items Workflow
    steps:
      - stepId: get-products
        operationId: $sourceDescriptions.redocly-cafe-api.listMenuItems
        description: This step gets all products.
        parameters:
          - in: query
            name: limit
            value: 1
        successCriteria:
          - condition: $statusCode == 200
```

Key components:

- `sourceDescriptions` define the connection to the OpenAPI description.

``` yaml
sourceDescriptions:
  - name: redocly-cafe-api
    type: openapi
    url: redocly-cafe-api.yaml
```

- Each step uses an `operationId` to connect the workflow step to an operation in the OpenAPI description.
```yaml
operationId: $sourceDescriptions.redocly-cafe-api.listMenuItems
```
This step resolves the `listMenuItems` operation from the `redocly-cafe-api` source description, which points to the `redocly-cafe-api.yaml` file.

```yaml
/menu:
    get:
      tags:
        - Products
      summary: List all menu items
      description: Retrieve a collection of menu items with optional filtering and pagination.
      operationId: listMenuItems
      security: []
      parameters:
        - $ref: '#/components/parameters/After'
        - $ref: '#/components/parameters/Before'
        - $ref: '#/components/parameters/Sort'
        - $ref: '#/components/parameters/Filter'
        - $ref: '#/components/parameters/Search'
        - $ref: '#/components/parameters/Limit'
      responses:
        '200':
          description: Successful operation.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MenuItemList'
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalServerError'
```
This connection is important because Respect can use the OpenAPI description to verify the response status, content type, and schema.

- Steps can pass parameters to the operation. In this example, the `limit` query parameter restricts the response to one menu item.

```yaml
  parameters:
    - in: query
      name: limit
      value: 1
```

- Steps can also include a `successCriteria` section to define workflow-specific expectations.
```yaml
successCriteria:
  - condition: $statusCode == 200
```

### Execute the workflow using Redocly CLI

[@redocly/cli](https://www.npmjs.com/package/@redocly/cli) is an open-source tool that can execute Arazzo descriptions with the `respect` command.

```bash
npx @redocly/cli@latest respect redocly-cafe-api.arazzo.yaml
```

The execution result looks like this:

```bash
    Running workflow redocly-cafe-api-se-01.arazzo.yaml / menu-items-workflow 
 
  ✗ GET /menu - step get-products 

    Request URL: http://localhost:4096/menu?limit=1
    Request Headers:
      accept: application/json, application/problem+json 
 

    Response status code: 200
    Response time: 17 ms
    Response Headers:
      access-control-allow-credentials: true
      connection: keep-alive
      content-length: 435
      content-type: application/json; charset=utf-8
      date: Wed, 29 Apr 2026 12:00:44 GMT
      etag: W/"1b3-id35eE7Zv3L2+3iA/a3QCfYtLb0"
      keep-alive: timeout=5
      vary: Origin
      x-powered-by: Express
    Response Size: 435 bytes
    Response Body:
      {
        "object": "list",
        "page": {
          "startCursor": "ixCALWlkOnByZF8wMDAwMDAwMDAwc2VlZHRyYW1zMDAwMDAwMAM",
          "endCursor": "ixCALWlkOnByZF8wMDAwMDAwMDAwc2VlZHRyYW1zMDAwMDAwMAM",
          "hasNextPage": true,
          "hasPrevPage": false,
          "limit": 1,
          "total": 5
        },
        "items": [
          {
            "id": "prd_0000000000seedtrams0000000",
            "name": "tiramisu",
            "price": 13000,
            "category": "dessert",
            "createdAt": "2026-04-29T10:00:50.610Z",
            "updatedAt": "2026-04-29T10:00:50.610Z",
            "object": "menuItem",
            "calories": 450
          }
        ]
      } 
 
    ✓ success criteria check - $statusCode == 200
    ✓ status code check - $statusCode in [200, 400, 500]
    ✓ content-type check
    ✗ schema check
 

  Failed tests info:

  Workflow name: menu-items-workflow
 
    stepId - get-products 
    ✗ schema check 
      
      TYPE must be array
      
      >  1 | {
          | ^
      >  2 |   "object": "list",
          | ^^^^^^^^^^^^^^^^^^^
      >  3 |   "page": {
          | ^^^^^^^^^^^^^^^^^^^
      >  4 |     "startCursor": "ixCALWlkOnByZF8wMDAwMDAwMDAwc2VlZHRyYW1zMDAwMDAwMAM",
          | ^^^^^^^^^^^^^^^^^^^
      >  5 |     "endCursor": "ixCALWlkOnByZF8wMDAwMDAwMDAwc2VlZHRyYW1zMDAwMDAwMAM",
          | ^^^^^^^^^^^^^^^^^^^
      >  6 |     "hasNextPage": true,
          | ^^^^^^^^^^^^^^^^^^^
      >  7 |     "hasPrevPage": false,
          | ^^^^^^^^^^^^^^^^^^^
      >  8 |     "limit": 1,
          | ^^^^^^^^^^^^^^^^^^^
      >  9 |     "total": 5
          | ^^^^^^^^^^^^^^^^^^^
      > 10 |   },
          | ^^^^^^^^^^^^^^^^^^^
      > 11 |   "items": [
          | ^^^^^^^^^^^^^^^^^^^
      > 12 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 13 |       "id": "prd_0000000000seedtrams0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 14 |       "name": "tiramisu",
          | ^^^^^^^^^^^^^^^^^^^
      > 15 |       "price": 13000,
          | ^^^^^^^^^^^^^^^^^^^
      > 16 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 17 |       "createdAt": "2026-04-29T10:00:50.610Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 18 |       "updatedAt": "2026-04-29T10:00:50.610Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 19 |       "object": "menuItem",
          | ^^^^^^^^^^^^^^^^^^^
      > 20 |       "calories": 450
          | ^^^^^^^^^^^^^^^^^^^
      > 21 |     }
          | ^^^^^^^^^^^^^^^^^^^
      > 22 |   ]
          | ^^^^^^^^^^^^^^^^^^^
      > 23 | }
          | ^^ 👈🏽  type must be array
      
       
  Summary for redocly-cafe-api-se-01.arazzo.yaml
  
  Workflows: 1 failed, 1 total
  Steps: 1 failed, 1 total
  Checks: 3 passed, 1 failed, 4 total
  Time: 58ms 
 
 
┌────────────────────────────────────────────────────────────────────────────┬────────────┬─────────┬─────────┬──────────┐
│ Filename                                                                   │ Workflows  │ Passed  │ Failed  │ Warnings │
├────────────────────────────────────────────────────────────────────────────┼────────────┼─────────┼─────────┼──────────┤
│ x redocly-cafe-api-se-01.arazzo.yaml                                       │ 1          │ 0       │ 1       │ -        │
└────────────────────────────────────────────────────────────────────────────┴────────────┴─────────┴─────────┴──────────┘
 
 Tests exited with error 
```

In addition to the `success criteria check` defined in the Arazzo file,

```yaml
successCriteria:
  - condition: $statusCode == 200
```
Respect performed three additional checks automatically.

Because the workflow step is connected to an OpenAPI description, [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) verifies that the API returns a documented status code, the expected content type, and a response body that matches the documented schema.

As mentioned earlier, the API description includes an intentional discrepancy. The Respect output makes that mismatch visible.

The failed schema check includes this message:

 `| ^^ 👈🏽  type must be array`

The API response is a paginated object, but the OpenAPI description expects an array. This is the intentional discrepancy in the example.

To fix it, update the `MenuItemList` schema so it matches the actual API response:

```yaml
    MenuItemList:
      type: object
      properties:
        object:
          type: string
          const: list
          description: Entity name.
        page:
          $ref: '#/components/schemas/Page'
        items:
          type: array
          items:
            $ref: '#/components/schemas/MenuItem'
      required:
        - object
        - page
        - items
```


Run the workflow again to confirm that all checks now pass.

```bash
npx @redocly/cli@latest respect redocly-cafe-api.arazzo.yaml
```

This demonstrates the core value of contract testing with Respect: when the API and its OpenAPI description drift apart, the workflow highlights the mismatch immediately.

### Practical applications

After you create and verify an Arazzo workflow locally, you can use it in several ways:

- Include the workflow in a CI/CD pipeline to keep API documentation synchronized with actual API behavior:

```bash
# Spawn your API instance
npm install @redocly/cli@latest -g
redocly respect products.arazzo.yaml --verbose
```

- Automate routine API workflows for development and QA tasks.
- Describe important application flows with Arazzo and share them with team members. Non-technical users can also use visualization tools like Replay to understand the workflows.

### Summary

Arazzo provides a standard way to describe API workflows declaratively. Respect uses those workflows to run API contract tests against real API behavior.

With this approach, teams can maintain API test coverage, detect documentation drift earlier, and share executable API workflows across engineering, QA, and documentation teams.