# Respect Practical Example Series: OAuth2 Authorization with Arazzo

This article shows how to use Respect, powered by Arazzo workflows, for OAuth2 authorization.
You will learn how to define reusable workflows in separate files, pass values between workflows, and use those values to authorize API requests.

You will cover the following topics:

- Practical applications of Arazzo:
  - Creating reusable workflows with exposed outputs.
  - Authorizing API requests with OAuth2.
  - Using `x-security` Respect extension with a protected API operation.

## The problem

In the [previous article](./api-contract-testing-01.md), you learned how to execute a simple API contract test with [Redocly Respect](https://redocly.com/respect-cli).
Now, let us move to a more realistic workflow: calling protected API endpoints.

Real APIs are rarely open to public access.
They usually require an authentication or authorization flow before clients can read or change protected resources.
To test those endpoints with Respect, the workflow must first obtain credentials or an access token, then use that authorization data in later steps.

Respect supports this use case with the [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension), which lets a workflow provide security values for protected operations.

## Prerequisites

- Familiarity with the [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension).
- An API described with OpenAPI. The examples use a modified version of the Redocly Cafe API.

The example uses an OpenAPI description with public operations, protected menu operations, OAuth2 security schemes, and a dynamic client registration endpoint.
The most important parts for this article are `/oauth2/register`, `/oauth2/token`, the protected `POST /menu` operation, and the `OAuth2` security scheme.

<details>
<summary>OpenAPI description used in this example</summary>

```yaml
openapi: 3.1.0
info:
  title: Redocly Cafe
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
      operationId: listMenuItems
      security: []
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
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '500':
          $ref: '#/components/responses/InternalServerError'
  /menu/{menuItemId}:
    parameters:
      - $ref: '#/components/parameters/MenuItemId'
    delete:
      tags:
        - Products
      summary: Delete a menu item
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
      flows:
        authorizationCode:
          authorizationUrl: https://cafe.cloud.redocly.com/oauth2/authorize
          tokenUrl: https://cafe.cloud.redocly.com/oauth2/token
          scopes:
            menu:read: Read access to menu items and images
            menu:write: Write access to menu items (create, delete)
        clientCredentials:
          tokenUrl: https://cafe.cloud.redocly.com/oauth2/token
          scopes:
            menu:read: Read access to menu items and images
            menu:write: Write access to menu items (create, delete)
    ApiKey:
      type: apiKey
      name: X-API-Key
      in: header
  parameters:
    MenuItemId:
      name: menuItemId
      in: path
      required: true
      schema:
        type: string
        pattern: ^prd_[0-9abcdefghjkmnpqrstvwxyz]{26}$
  schemas:
    Page:
      type: object
      properties:
        endCursor:
          type:
            - string
            - 'null'
        startCursor:
          type:
            - string
            - 'null'
        hasNextPage:
          type: boolean
        hasPrevPage:
          type: boolean
        limit:
          type: integer
          minimum: 1
          maximum: 100
          default: 10
        total:
          type: integer
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
          type: string
          format: date-time
          readOnly: true
        updatedAt:
          type: string
          format: date-time
          readOnly: true
        id:
          type: string
          readOnly: true
          pattern: ^prd_[0-9abcdefghjkmnpqrstvwxyz]{26}$
        object:
          type: string
          const: menuItem
          readOnly: true
        name:
          type: string
          minLength: 1
          maxLength: 50
        price:
          type: integer
          minimum: 0
        photo:
          writeOnly: true
          type:
            - string
            - 'null'
          format: binary
        photoUrl:
          readOnly: true
          type: string
          format: uri
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
              type: string
              const: beverage
            volume:
              type: number
              exclusiveMinimum: 0
            containsCaffeine:
              type: boolean
          required:
            - category
            - volume
            - containsCaffeine
        - $ref: '#/components/schemas/MenuBaseItem'
    Dessert:
      allOf:
        - type: object
          properties:
            category:
              type: string
              const: dessert
            calories:
              type: number
              exclusiveMinimum: 0
          required:
            - category
            - calories
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
      type: object
      properties:
        object:
          type: string
          const: list
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
          default: about:blank
        title:
          type: string
        status:
          type: integer
          format: int32
          minimum: 100
          exclusiveMaximum: 600
        instance:
          type: string
          format: uri-reference
        details:
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
        redirectUris:
          type: array
          items:
            type: string
            format: uri
        scopes:
          type: array
          items:
            type: string
            enum:
              - menu:read
              - menu:write
        grantTypes:
          type: array
          items:
            type: string
            enum:
              - authorization_code
              - client_credentials
      required:
        - name
    OAuth2Client:
      type: object
      properties:
        clientId:
          type: string
        clientSecret:
          type: string
        clientIdIssuedAt:
          type: integer
          format: int64
        clientSecretExpiresAt:
          type: integer
          format: int64
        name:
          type: string
        redirectUris:
          type: array
          items:
            type: string
            format: uri
        registrationClientUri:
          type: string
          format: uri
        registrationAccessToken:
          type: string
        scopes:
          type: array
          items:
            type: string
            enum:
              - menu:read
              - menu:write
        grantTypes:
          type: array
          items:
            type: string
            enum:
              - authorization_code
              - client_credentials
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
    NotFound:
      description: Resource not found.
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Error'
```

</details>

## Retrieve an access token for OAuth2

The Redocly Cafe API can register a new OAuth2 client with dynamic client registration.
This flow follows the [Dynamic Client Registration Protocol (RFC 7591)](https://datatracker.ietf.org/doc/html/rfc7591).

Because client registration is useful in more than one workflow, describe it in a separate Arazzo file and reuse it later.
This keeps the authorization details separate from the workflow that tests the protected menu operation.

### Register OAuth2 client

The API description used in this article extends the previous example with a `/oauth2/register` endpoint.

`redocly-cafe-api.yaml`

```yaml
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
```

Create a `register-oauth2-client.arazzo.yaml` file to register an OAuth2 client.

`register-oauth2-client.arazzo.yaml`

```yaml
arazzo: 1.0.1
info:
  title: Redocly Cafe API - Register OAuth2 Client
  version: 1.0.0
  description: This is the API for the Redocly Cafe OAuth2 client registration.
sourceDescriptions:
  - name: redocly-cafe-api
    type: openapi
    url: redocly-cafe-api.yaml

workflows:
  - workflowId: register-oauth2-client-workflow
    summary: Register a new OAuth2 client
    description: This workflow registers a new OAuth2 client.
    steps:
      - stepId: register-oauth2-client
        operationId: $sourceDescriptions.redocly-cafe-api.registerOAuth2Client
        description: This step registers a new OAuth2 client.
        requestBody:
          payload:
            name: code
            redirectUris:
              - https://cafe.cloud.redocly.com/callback
            scopes:
              - 'menu:read'
              - 'menu:write'
            grantTypes:
              - 'client_credentials'
        successCriteria:
          - condition: $statusCode == 201
          - condition: $response.body#/clientId != null
          - condition: $response.body#/clientSecret != null
        outputs:
          clientId: $response.body#/clientId
          clientSecret: $response.body#/clientSecret
    outputs:
      clientId: $steps.register-oauth2-client.outputs.clientId
      clientSecret: $steps.register-oauth2-client.outputs.clientSecret
```

The step is connected to the OpenAPI description through `operationId`.

```yaml
operationId: $sourceDescriptions.redocly-cafe-api.registerOAuth2Client
```

Because this is a POST request, the workflow defines a `requestBody`.

```yaml
requestBody:
  payload:
    name: code
    redirectUris:
      - https://cafe.cloud.redocly.com/callback
    scopes:
      - 'menu:read'
      - 'menu:write'
    grantTypes:
      - 'client_credentials'
```

The step defines outputs for values that later steps or workflows need.

```yaml
outputs:
  clientId: $response.body#/clientId
  clientSecret: $response.body#/clientSecret
```

Because these values must be available outside this workflow, the complete workflow also exposes the step outputs as workflow outputs. That allows another Arazzo workflow to call this workflow and read the values by name.

Execute the file with Redocly CLI to inspect the API response and confirm which values are mapped to workflow outputs:

```bash
npx @redocly/cli@latest respect register-oauth2-client.arazzo.yaml --verbose
```

### Get access token to authorize your future requests

Next, create another Arazzo file called `authorization.arazzo.yaml`.

This workflow gets an access token in two steps:

- First, it reuses the `register-oauth2-client` workflow to retrieve a `clientId` and `clientSecret`.
- Then it calls the token endpoint and exposes the returned access token as a workflow output.

To reuse the client registration workflow, add the reusable workflow as another `sourceDescription`.

```yaml
- name: register-oauth2
  type: arazzo
  url: register-oauth2-client.arazzo.yaml
```
Then execute that workflow from a step by referencing `workflowId: $sourceDescriptions.register-oauth2.workflows.register-oauth2-client-workflow`.

The second step, `authorize-with-code`, calls the `/oauth2/token` endpoint with a predefined `/callback`.
In a production application, the callback is usually implemented by the client application. In this example, the Redocly Cafe API provides the callback endpoint for demonstration purposes.

This step also uses the [`x-operation` extension](https://redocly.com/docs/respect/extensions/x-operation) to make a request to a URL that is not described as an operation in the OpenAPI description.

`authorization.arazzo.yaml`

```yaml
arazzo: 1.0.1
info:
  title: Redocly Cafe API - Authorization
  version: 1.0.0
  description: This is the API for the Redocly Cafe OAuth2 client registration.
sourceDescriptions:
  - name: redocly-cafe-api
    type: openapi
    url: redocly-cafe-api.yaml
  - name: register-oauth2
    type: arazzo
    url: register-oauth2-client.arazzo.yaml

workflows:
  - workflowId: authorize-with-code
    summary: Authorize a new OAuth2 client
    steps:
      - stepId: register-oauth2-client
        description: This step registers a new OAuth2 client.
        workflowId: $sourceDescriptions.register-oauth2.workflows.register-oauth2-client-workflow
        successCriteria:
          - condition: $statusCode == 201
          - condition: $response.body#/clientId != null
        outputs:
          clientId: $outputs.clientId
          clientSecret: $outputs.clientSecret
      - stepId: authorize-with-code
        x-operation:
          method: POST
          url: https://cafe.cloud.redocly.com/oauth2/token
        parameters:
          - in: header
            name: content-type
            value: application/x-www-form-urlencoded
        requestBody:
          payload:
            grant_type: authorization_code
            redirect_uri: https://cafe.cloud.redocly.com/callback
            client_id: $steps.register-oauth2-client.outputs.clientId
            client_secret: $steps.register-oauth2-client.outputs.clientSecret
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/access_token != null
        outputs:
          access_token: $response.body#/access_token
    outputs:
      access_token_with_code: $steps.authorize-with-code.outputs.access_token
      client_id: $steps.register-oauth2-client.outputs.clientId
```

Execute this file:

```bash
npx @redocly/cli@latest respect authorization.arazzo.yaml --verbose
```

Inspect the response body of the last step. It should contain the `access_token` that the final workflow will use:

Key result from the command output:

```bash
    Response Body:
      {
        "access_token": "********",
        "token_type": "Bearer",
        "expires_in": 3600,
        "scope": "menu:read menu:write"
      } 
 
    ✓ success criteria check - $statusCode == 200
    ✓ success criteria check - $response.body#/access_token != null
```


### Make a POST request to the secured endpoint

Now we can combine the previous workflows and call a protected endpoint that creates a menu item.
The final workflow has three steps: `authorize`, `create-menu-item`, and `verify-menu-item`.

The authorization workflow returns values that the final workflow passes to the [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension).
Respect then uses those values to authorize the protected API request.

The important handoff is:

- The `authorize` step calls the reusable authorization workflow.
- The `create-menu-item` step reads `access_token` and `client_id` from the `authorize` step outputs.
- The `x-security` extension automatically constructs appropriate authorization headers, queries, or cookies based on your parameters for the protected `createMenuItem` operation.

```yaml
x-security:
  - schemeName: OAuth2
    values:
      accessToken: $steps.authorize.outputs.access_token
      clientId: $steps.authorize.outputs.client_id
```

The final workflow looks like this:

`redocly-cafe-api.arazzo.yaml`

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
  - name: authorization
    type: arazzo
    url: authorization.arazzo.yaml

workflows:
  - workflowId: menu-items-workflow
    summary: Menu Items Workflow
    steps:
      - stepId: authorize
        workflowId: $sourceDescriptions.authorization.workflows.authorize-with-code
        outputs:
          access_token: $outputs.access_token_with_code
          client_id: $outputs.client_id
      - stepId: create-menu-item
        operationId: $sourceDescriptions.redocly-cafe-api.createMenuItem
        description: This step creates a new menu item.
        x-security:
          - schemeName: OAuth2
            values:
              accessToken: $steps.authorize.outputs.access_token
              clientId: $steps.authorize.outputs.client_id
        requestBody:
          contentType: multipart/form-data
          payload:
            name: $faker.string.uuid()
            description: The dessert from Italy
            price: 4000
            calories: 8000
            category: 'dessert'
            photoTextDescription: 'this is a tiramisu'
        successCriteria:
          - condition: $statusCode == 201
          - condition: $response.body#/id != null
        outputs:
          menuItemId: $response.body#/id
          name: $response.body#/name
      - stepId: verify-menu-item
        operationId: $sourceDescriptions.redocly-cafe-api.listMenuItems
        description: This to verify created menu item
        parameters:
          - in: query
            name: filter
            value: 'name:{$steps.create-menu-item.outputs.name}'
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/items/0/name == $steps.create-menu-item.outputs.name
```


Run the workflow to confirm that the authorization step, the protected POST request, and the verification step all pass.

```bash
npx @redocly/cli@latest respect redocly-cafe-api.arazzo.yaml --verbose
```

## Summary

Respect extensions make it possible to describe authorized API requests as part of an Arazzo workflow.

By splitting the process into smaller workflows with outputs, you can reuse authentication and authorization steps across multiple API contract tests. This keeps complex workflows easier to maintain while still testing realistic protected API behavior.