This article covers the following key topics:

- Practical applications of Arazzo:
  - Automating repetitive API actions.
  - Covering APIs with integration tests for CI/CD routines.
  - Keeping API documentation synchronized with actual API behavior.
  - Sharing described workflows with team members.
- Using the open-source tool [@redocly/cli](https://www.npmjs.com/package/@redocly/cli), an early Arazzo adopter, to execute workflows.

## Respect practical example series [01]

### The Problem

Many QA engineers test APIs using the same language in which the APIs are implemented. This approach can require significant effort to maintain, especially in complex systems with multiple products written in different languages.

Another common challenge relates to team collaboration when working with multiple APIs. Documentation often becomes outdated quickly when developers apply changes to APIs but forget to synchronize the documentation. A systematic way to track these discrepancies is needed.

### Prerequisites

To follow the examples in this article, the following setup is required:

- Familiarity with [Arazzo](./what-is-arazzo.md).
- A described API. The examples use a modified version of the Redocly Cafe API.
  <b>IMPORTANT: the API are going to contain some discrepancies added with the demonstration purposes.</b>

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
    post:
      tags:
        - Products
      summary: Create menu item
      description: Create a new menu item.
      operationId: createMenuItem
      security:
        - OAuth2:
            - menu:write
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: '#/components/schemas/MenuItem'
      responses:
        '201':
          description: Menu item created successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MenuItem'
              examples:
                MenuItemResponse:
                  value:
                    id: prd_01khr487f7qm7p44xn427m43vb
                    object: menuItem
                    name: coffee
                    price: 4000
                    category: beverage
                    createdAt: '2026-02-18T10:20:38.228Z'
                    updatedAt: '2026-02-18T10:20:38.228Z'
                    volume: 600
                    containsCaffeine: false
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '409':
          $ref: '#/components/responses/Conflict'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /menu/{menuItemId}:
    parameters:
      - $ref: '#/components/parameters/MenuItemId'
    delete:
      tags:
        - Products
      summary: Delete a menu item
      description: Delete an existing menu item.
      operationId: deleteMenuItem
      security:
        - OAuth2:
            - menu:write
      responses:
        '204':
          description: Menu item deleted successfully.
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /oauth2/register:
    post:
      tags:
        - Authorization
      summary: Create OAuth2 client
      description: |
        Register a new OAuth2 client for dynamic client registration.  This endpoint implements the Dynamic Client Registration Protocol (RFC 7591), using camelCase field names instead of the RFC's snake_case convention (e.g., `redirectUris` instead of `redirect_uris`, `grantTypes` instead of `grant_types`). The `name` field is required. Other fields are optional. If not provided:
        - `redirectUris` defaults to an empty array. Note: When using the `authorization_code` grant type, 
          `redirectUris` must be provided (per RFC 7591 Section 2).
        - `scopes` defaults to all available scopes (menu:read, menu:write) - `grantTypes` defaults to both supported grant types (authorization_code, client_credentials)
        Returns the registered client information per RFC 7591, including:
        - `clientId` and `clientSecret` (must be stored securely) - `clientIdIssuedAt` and `clientSecretExpiresAt` timestamps - All registered client metadata (name, redirectUris, scopes, grantTypes)
      operationId: registerOAuth2Client
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterClientObject'
      responses:
        '201':
          description: OAuth2 client registered successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OAuth2Client'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'
components:
  securitySchemes:
    OAuth2:
      type: oauth2
      description: OAuth2 authorization for API access.
      flows:
        authorizationCode:
          authorizationUrl: https://cafe.redocly.com/v1/oauth2/authorize
          tokenUrl: https://cafe.redocly.com/v1/oauth2/token
          scopes:
            menu:read: Read access to menu items and images
            menu:write: Write access to menu items (create, delete)
        clientCredentials:
          tokenUrl: https://cafe.redocly.com/v1/oauth2/token
          scopes:
            menu:read: Read access to menu items and images
            menu:write: Write access to menu items (create, delete)
    ApiKey:
      type: apiKey
      name: X-API-Key
      in: header
      description: API key for internal operations.
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
    MenuItemId:
      name: menuItemId
      in: path
      description: ID of the menu item to retrieve.
      required: true
      schema:
        type: string
        pattern: ^prd_[0-9abcdefghjkmnpqrstvwxyz]{26}$
      example: prd_01h1s5z6vf2mm1mz3hevnn9va7
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
    RegisterClientObject:
      type: object
      properties:
        name:
          type: string
          description: Client name.
        redirectUris:
          type: array
          items:
            type: string
            format: uri
          description: List of redirect URIs (optional, defaults to empty array).
        scopes:
          type: array
          items:
            type: string
            enum:
              - menu:read
              - menu:write
          description: List of scopes.
        grantTypes:
          type: array
          items:
            type: string
            enum:
              - authorization_code
              - client_credentials
          description: List of grant types.
      required:
        - name
    OAuth2Client:
      type: object
      description: OAuth2 client registration response. Per RFC 7591, includes the client identifier, secret, timestamps, and all registered client metadata.
      properties:
        clientId:
          type: string
          description: Client identifier issued by the authorization server.
        clientSecret:
          type: string
          description: Client secret issued by the authorization server.
        clientIdIssuedAt:
          type: integer
          format: int64
          description: Time when the client_id is issued, represented as seconds since epoch (RFC7591).
        clientSecretExpiresAt:
          type: integer
          format: int64
          description: Time at which the client_secret expires, represented as seconds since epoch. 0 indicates the secret does not expire (RFC 7591).
        name:
          type: string
          description: Client name (registered metadata).
        redirectUris:
          type: array
          items:
            type: string
            format: uri
          description: List of redirect URIs (registered metadata).
        registrationClientUri:
          type: string
          format: uri
          description: URL of the client configuration endpoint for managing this client registration (RFC 7592).
        registrationAccessToken:
          type: string
          description: Access token to be used at the client configuration endpoint for managing this client registration (RFC 7592).
        scopes:
          type: array
          items:
            type: string
            enum:
              - menu:read
              - menu:write
          description: List of scopes (registered metadata).
        grantTypes:
          type: array
          items:
            type: string
            enum:
              - authorization_code
              - client_credentials
          description: List of grant types (registered metadata).
      required:
        - clientId
        - clientSecret
        - clientIdIssuedAt
        - clientSecretExpiresAt
        - registrationClientUri
        - registrationAccessToken
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
    Unauthorized:
      description: Unauthorized - authorization required.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
    Forbidden:
      description: Forbidden - insufficient permissions.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
    Conflict:
      description: Conflict - entity already exists.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
    NotFound:
      description: Resource not found.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
```

### Create Arazzo description

There are three approaches to creating an Arazzo description:
- Read the [Arazzo specification](https://spec.openapis.org/arazzo/latest.html) and write it from scratch for full control.
- Use the `npx @redocly/cli@latest generate-arazzo docs-data.yaml` CLI command as a starting point to understand the Arazzo structure and see how to describe all operations.
- Use AI assistance to generate the Arazzo specification, ensuring to lint the output to catch any errors.

Regardless of the approach chosen, validate the Arazzo file using Redocly CLI:
```bash
  npx @redocly/cli@latest lint redocly-cafe-api.arazzo.yaml
```

```bash
No configurations were provided -- using built in recommended configuration by default.

validating redocly-cafe-api.arazzo.yaml...
redocly-cafe-api.arazzo.yaml: validated in 6ms

Woohoo! Your API description is valid. 🎉
```

Lets review a simple example of how to get Menu Items list in workflow.

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
        successCriteria:
          - condition: $statusCode == 200
```

Key components:

- SourceDescriptions define the connection to the OpenAPI description:

``` yaml
sourceDescriptions:
  - name: redocly-cafe-api
    type: openapi
    url: redocly-cafe-api.yaml
```

- Each Step has an operationId that creates the connection to the OpenAPI specification:
```yaml
operationId: $sourceDescriptions.redocly-cafe-api.listMenuItems
```
This step resolves the `listMenuItems` operation from the `redocly-cafe-api` sourceDescription, which connects to the `redocly-cafe-api.yaml` file:

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
This connection also enables verification of the expected response type.

- Steps can include a successCriteria section to define expectations:
```yaml
successCriteria:
  - condition: $statusCode == 200
```

### Execute the workflow using Redocly CLI

[@redocly/cli](https://www.npmjs.com/package/@redocly/cli) is an open-source tool that supports Arazzo specification execution with the `respect` command.

```bash
npx @redocly/cli@latest respect redocly-cafe-api.arazzo.yaml
```

The execution results display as follows:

```bash
  Running workflow redocly-cafe-api.arazzo.yaml / menu-items-workflow 
 
  ✗ GET /menu - step get-products 

    Request URL: http://localhost:4096/menu
    Request Headers:
      accept: application/json, application/problem+json 
 

    Response status code: 200
    Response time: 15 ms
    Response Headers:
      access-control-allow-credentials: true
      connection: keep-alive
      content-length: 1649
      content-type: application/json; charset=utf-8
      date: Tue, 28 Apr 2026 15:12:05 GMT
      etag: W/"671-VFaxfVSvRFB274psLk0mHIYHcm8"
      keep-alive: timeout=5
      vary: Origin
      x-powered-by: Express
    Response Size: 1649 bytes
    Response Body:
      {
        "object": "list",
        "page": {
          "startCursor": "ixCALWlkOnByZF8wMWtxYTk5cTZleWtxODQxbTI3YTZjcTc0awM",
          "endCursor": "GyEA-I3EOBbyKDypNUwL3FzQwalnEnyDIHl0FAOkY1YWgCtJfQ",
          "hasNextPage": false,
          "hasPrevPage": false,
          "limit": 10,
          "total": 7
        },
        "items": [
          {
            "id": "prd_01kqa99q6eykq841m27a6cq74k",
            "name": "7720e2da-7cff-4404-95b6-5a1a6b31cdf5",
            "price": 4000,
            "category": "dessert",
            "createdAt": "2026-04-28T14:53:38.895Z",
            "updatedAt": "2026-04-28T14:53:38.895Z",
            "object": "menuItem",
            "calories": 8000
          },
          {
            "id": "prd_01kqa996htvqb6hp67502yhtp9",
            "name": "421d29d9-e5cd-44cf-988e-fbf1e9a0011e",
            "price": 4000,
            "category": "dessert",
            "createdAt": "2026-04-28T14:53:21.851Z",
            "updatedAt": "2026-04-28T14:53:21.851Z",
            "object": "menuItem",
            "calories": 8000
          },
          {
            "id": "prd_0000000000seedtrams0000000",
            "name": "tiramisu",
            "price": 13000,
            "category": "dessert",
            "createdAt": "2026-04-28T13:32:01.000Z",
            "updatedAt": "2026-04-28T13:32:07.060Z",
            "object": "menuItem"
          },
          {
            "id": "prd_0000000000seedteabv0000000",
            "name": "tea",
            "price": 6000,
            "category": "beverage",
            "createdAt": "2026-04-28T13:32:01.000Z",
            "updatedAt": "2026-04-28T13:32:06.656Z",
            "object": "menuItem"
          },
          {
            "id": "prd_0000000000seedchesc0000000",
            "name": "cheesecake",
            "price": 12000,
            "category": "dessert",
            "createdAt": "2026-04-28T13:32:01.000Z",
            "updatedAt": "2026-04-28T13:32:06.249Z",
            "object": "menuItem"
          },
          {
            "id": "prd_0000000000seedcffee0000000",
            "name": "coffee",
            "price": 5000,
            "category": "beverage",
            "createdAt": "2026-04-28T13:32:01.000Z",
            "updatedAt": "2026-04-28T13:32:05.837Z",
            "object": "menuItem"
          },
          {
            "id": "prd_0000000000seedccrem0000000",
            "name": "ice-cream",
            "price": 10000,
            "category": "dessert",
            "createdAt": "2026-04-28T13:32:01.000Z",
            "updatedAt": "2026-04-28T13:32:05.403Z",
            "object": "menuItem"
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
      >  4 |     "startCursor": "ixCALWlkOnByZF8wMWtxYTk5cTZleWtxODQxbTI3YTZjcTc0awM",
          | ^^^^^^^^^^^^^^^^^^^
      >  5 |     "endCursor": "GyEA-I3EOBbyKDypNUwL3FzQwalnEnyDIHl0FAOkY1YWgCtJfQ",
          | ^^^^^^^^^^^^^^^^^^^
      >  6 |     "hasNextPage": false,
          | ^^^^^^^^^^^^^^^^^^^
      >  7 |     "hasPrevPage": false,
          | ^^^^^^^^^^^^^^^^^^^
      >  8 |     "limit": 10,
          | ^^^^^^^^^^^^^^^^^^^
      >  9 |     "total": 7
          | ^^^^^^^^^^^^^^^^^^^
      > 10 |   },
          | ^^^^^^^^^^^^^^^^^^^
      > 11 |   "items": [
          | ^^^^^^^^^^^^^^^^^^^
      > 12 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 13 |       "id": "prd_01kqa99q6eykq841m27a6cq74k",
          | ^^^^^^^^^^^^^^^^^^^
      > 14 |       "name": "7720e2da-7cff-4404-95b6-5a1a6b31cdf5",
          | ^^^^^^^^^^^^^^^^^^^
      > 15 |       "price": 4000,
          | ^^^^^^^^^^^^^^^^^^^
      > 16 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 17 |       "createdAt": "2026-04-28T14:53:38.895Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 18 |       "updatedAt": "2026-04-28T14:53:38.895Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 19 |       "object": "menuItem",
          | ^^^^^^^^^^^^^^^^^^^
      > 20 |       "calories": 8000
          | ^^^^^^^^^^^^^^^^^^^
      > 21 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 22 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 23 |       "id": "prd_01kqa996htvqb6hp67502yhtp9",
          | ^^^^^^^^^^^^^^^^^^^
      > 24 |       "name": "421d29d9-e5cd-44cf-988e-fbf1e9a0011e",
          | ^^^^^^^^^^^^^^^^^^^
      > 25 |       "price": 4000,
          | ^^^^^^^^^^^^^^^^^^^
      > 26 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 27 |       "createdAt": "2026-04-28T14:53:21.851Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 28 |       "updatedAt": "2026-04-28T14:53:21.851Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 29 |       "object": "menuItem",
          | ^^^^^^^^^^^^^^^^^^^
      > 30 |       "calories": 8000
          | ^^^^^^^^^^^^^^^^^^^
      > 31 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 32 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 33 |       "id": "prd_0000000000seedtrams0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 34 |       "name": "tiramisu",
          | ^^^^^^^^^^^^^^^^^^^
      > 35 |       "price": 13000,
          | ^^^^^^^^^^^^^^^^^^^
      > 36 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 37 |       "createdAt": "2026-04-28T13:32:01.000Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 38 |       "updatedAt": "2026-04-28T13:32:07.060Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 39 |       "object": "menuItem"
          | ^^^^^^^^^^^^^^^^^^^
      > 40 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 41 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 42 |       "id": "prd_0000000000seedteabv0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 43 |       "name": "tea",
          | ^^^^^^^^^^^^^^^^^^^
      > 44 |       "price": 6000,
          | ^^^^^^^^^^^^^^^^^^^
      > 45 |       "category": "beverage",
          | ^^^^^^^^^^^^^^^^^^^
      > 46 |       "createdAt": "2026-04-28T13:32:01.000Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 47 |       "updatedAt": "2026-04-28T13:32:06.656Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 48 |       "object": "menuItem"
          | ^^^^^^^^^^^^^^^^^^^
      > 49 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 50 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 51 |       "id": "prd_0000000000seedchesc0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 52 |       "name": "cheesecake",
          | ^^^^^^^^^^^^^^^^^^^
      > 53 |       "price": 12000,
          | ^^^^^^^^^^^^^^^^^^^
      > 54 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 55 |       "createdAt": "2026-04-28T13:32:01.000Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 56 |       "updatedAt": "2026-04-28T13:32:06.249Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 57 |       "object": "menuItem"
          | ^^^^^^^^^^^^^^^^^^^
      > 58 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 59 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 60 |       "id": "prd_0000000000seedcffee0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 61 |       "name": "coffee",
          | ^^^^^^^^^^^^^^^^^^^
      > 62 |       "price": 5000,
          | ^^^^^^^^^^^^^^^^^^^
      > 63 |       "category": "beverage",
          | ^^^^^^^^^^^^^^^^^^^
      > 64 |       "createdAt": "2026-04-28T13:32:01.000Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 65 |       "updatedAt": "2026-04-28T13:32:05.837Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 66 |       "object": "menuItem"
          | ^^^^^^^^^^^^^^^^^^^
      > 67 |     },
          | ^^^^^^^^^^^^^^^^^^^
      > 68 |     {
          | ^^^^^^^^^^^^^^^^^^^
      > 69 |       "id": "prd_0000000000seedccrem0000000",
          | ^^^^^^^^^^^^^^^^^^^
      > 70 |       "name": "ice-cream",
          | ^^^^^^^^^^^^^^^^^^^
      > 71 |       "price": 10000,
          | ^^^^^^^^^^^^^^^^^^^
      > 72 |       "category": "dessert",
          | ^^^^^^^^^^^^^^^^^^^
      > 73 |       "createdAt": "2026-04-28T13:32:01.000Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 74 |       "updatedAt": "2026-04-28T13:32:05.403Z",
          | ^^^^^^^^^^^^^^^^^^^
      > 75 |       "object": "menuItem"
          | ^^^^^^^^^^^^^^^^^^^
      > 76 |     }
          | ^^^^^^^^^^^^^^^^^^^
      > 77 |   ]
          | ^^^^^^^^^^^^^^^^^^^
      > 78 | }
          | ^^ 👈🏽  type must be array
      
       
  Summary for redocly-cafe-api.arazzo.yaml
  
  Workflows: 1 failed, 1 total
  Steps: 1 failed, 1 total
  Checks: 3 passed, 1 failed, 4 total
  Time: 55ms 
 
 
┌──────────────────────────────────────────────────────────────────────┬────────────┬─────────┬─────────┬──────────┐
│ Filename                                                             │ Workflows  │ Passed  │ Failed  │ Warnings │
├──────────────────────────────────────────────────────────────────────┼────────────┼─────────┼─────────┼──────────┤
│ x redocly-cafe-api.arazzo.yaml                                       │ 1          │ 0       │ 1       │ -        │
└──────────────────────────────────────────────────────────────────────┴────────────┴─────────┴─────────┴──────────┘
 
 Tests exited with error 
```

Besides the `success criteria check` condition defined in the Arazzo file,

```yaml
successCriteria:
  - condition: $statusCode == 200
```
three additional checks were performed automatically.

Since this step connects to an OpenAPI description, [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) automatically verifies that the API returns the documented response with the expected content-type and status.

As mentioned earlier, a discrepancy was added to our API description and now we can see that something is wrong, lets try to fix it.

The output now shows a failed check with a message:

 `| ^^ 👈🏽  type must be array`

We can now notice that API response have paginated object, but OAS description expecting an array (this descrepency was added intentinaly).
Lets update MenuItemList schema to match API response:

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


Execute workflow one more time and see that all steps check are passing now.

```bash
npx @redocly/cli@latest respect redocly-cafe-api.arazzo.yaml
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

### Summary

Arazzo is a powerful standard that enables declarative description of API workflows with various practical applications.
As tooling development progresses, Arazzo can help maintain API test coverage, keep documentation synchronized, and improve team collaboration in complex projects.