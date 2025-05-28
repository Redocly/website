# Introduction to OpenAPI

We recommend a [multi-file format](./multi-file-definitions.md) for OpenAPI definitions.
OpenAPI allows for either a JSON or YAML format.
We recommend using the [YAML format](openapi-decisions.md), and use it in our examples.

Learn the [YAML essentials](/learn/yaml/index.md) before learning OpenAPI.

Then, continue on to see the [OpenAPI visual reference](/learn/openapi/openapi-visual-reference/index.md) which explores the entire specification showing snippets of the spec, samples, visual renders, and the corresponding types used in Redocly CLI.

## Root document (aka entrypoint)

The entrypoint, typically named `openapi.yaml` has the entire skeleton of the OpenAPI definition. It is known as the root document.

It has certain required properties:

* openapi
* info
* paths

And some optional properties:

* externalDocs
* servers
* components
* tags
* security

Here is a sample truncated `openapi.yaml` file.
```yaml
openapi: 3.1.0
info:
  version: 1.0.0
  title: Example.com
  termsOfService: 'https://example.com/terms/'
  contact:
    email: contact@example.com
    url: 'http://example.com/contact'
  license:
    name: Apache 2.0
    url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
  x-logo:
    url: 'https://apis.guru/openapi-template/logo.png'
  description: >
    # Your description here
externalDocs:
  description: Find out how to create a GitHub repo for your OpenAPI definition.
  url: 'https://github.com/Rebilly/generator-openapi-repo'
tags:
  - name: Echo
    description: Example echo operations
  - name: User
    description: Operations about user
servers:
  - url: 'http://example.com/api/v1'
  - url: 'https://example.com/api/v1'
paths:
    # paths here
components:
  securitySchemes:
    # security schemes here
security:
  - SecretAPIKey: []
  - JWT: []
```

Almost all of the complexity and effort will go into the `components` and `paths` descriptions.

We recommend keeping the `components` within the root document at a minimum, and only defining the security schemes used.

We recommend describing the paths and schema into other files.  The paths will reference the schema [using $refs](ref-guide.md).

## Paths

The `paths` in the root document should point to separate path files.

```yaml
paths:
  '/users/{username}':
    $ref: 'paths/users@{username}.yaml'
  /echo:
    $ref: paths/echo.yaml
```

> Path templating refers to the usage of curly braces ({}) to mark a section of a URL path as replaceable using path parameters.

Keep in mind, the path parameter must use the same name used within the curly braces within the subsequent path definition.

We add using `@` to represent a `/` within a filename. On the otherhand, you may wish to make a sub-folder. We discuss the pros and cons of this approach within the paths' `README.md` file. For our examples, we'll use this `@` approach and keep all of our files in the root-level of the `paths` folder.

### Path file example

Our root document references this (and other) path files. The file is named like the endpoint.
It contains a paths object.

At the top-level of the paths object:
* parameters (applies to all http methods if defined here)
* servers (if you wish to override the servers defined in the root document)
* summary
* description
* get
* put
* post
* delete
* options
* head
* patch
* trace

The get, put, post, delete, options, head, patch and trace refer to the http method used, and they are properties that all accept the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#operationObject).

```yaml
parameters:
  - name: pretty_print
    in: query
    description: Pretty print response
    schema:
      type: boolean
get:
  tags:
    - User
  summary: Get user by user name
  description: |
    Some description of the operation.
    You can use `markdown` here.
  operationId: getUserByName
  parameters:
    - name: username
      in: path
      description: The name that needs to be fetched
      required: true
      schema:
        type: string
    - name: with_email
      in: query
      description: Filter users without email
      schema:
        type: boolean
  security:
    - main_auth:
        - 'read:users'
    - api_key: []
  responses:
    '200':
      description: Success
      content:
        application/json:
          schema:
            $ref: ../components/schemas/User.yaml
          example:
            username: user1
            email: user@example.com
    '403':
      description: Forbidden
    '404':
      description: User not found
put:
  tags:
    - User
  summary: Updated user
  description: This can only be done by the logged in user.
  operationId: updateUser
  parameters:
    - name: username
      in: path
      description: The name that needs to be updated
      required: true
      schema:
        type: string
  security:
    - main_auth:
        - 'write:users'
  responses:
    '200':
      description: OK
    '400':
      description: Invalid user supplied
    '404':
      description: User not found
  requestBody:
    content:
      application/json:
        schema:
          $ref: ../components/schemas/User.yaml
      application/xml:
        schema:
          $ref: ../components/schemas/User.yaml
    description: Updated user object
    required: true

```

This demonstrates that the bulk of the paths file is related to the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#operationObject).

#### Operation object

* tags
* summary
* description
* externalDocs
* operationId
* parameters
* requestBody
* responses
* callbacks
* deprecated
* security
* servers

The parameters, requestBody, and response content schema can [use $refs](ref-guide.md). Using $refs will allow us to create reusable parameters and schema objects. We may also create reusable headers objects too. We find those to be the most profitable objects for re-use:

* schema
* parameters
* headers

We will be adding guides to writing schema soon.

## Exercises for learning

1. Read the [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md).
1. Read examples of OpenAPI definitions. (Many companies publish their OpenAPI definitions.)
1. Write schema to describe APIs by looking at only a request/response or docs (but not the OpenAPI definitions).
1. Read our [Accelerated Learning of OpenAPI](/blog/accelerated-learning-openapi.md) guide.
