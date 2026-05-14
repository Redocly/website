{% code-walkthrough
  filesets=[
    {
      "files": [
        "../_filesets/practical-example-series/oauth2/redocly-cafe-api.arazzo.yaml",
        "../_filesets/practical-example-series/oauth2/authorization.arazzo.yaml",
        "../_filesets/practical-example-series/oauth2/register-oauth2-client.arazzo.yaml",
        "../_filesets/practical-example-series/oauth2/redocly-cafe-api.yaml"
      ]
    }
  ]
%}

# Respect Practical Example Series: OAuth2 Authorization with Arazzo

This article shows how to use Respect, powered by Arazzo workflows, to test API endpoints that require OAuth2 authorization.
You will learn how to define reusable workflows in separate files, pass values between workflows, and use those values to authorize API requests.

You will cover the following topics:

Practical applications of Arazzo:

- Creating reusable workflows with exposed outputs.
- Authorizing API requests with OAuth2.
- Using the `x-security` Respect extension with a protected API operation.

## The problem

In the [previous article](./api-contract-testing-01.md), you learned how to execute a simple API contract test with [Redocly Respect](https://redocly.com/respect-cli).
Now, let us move to a more realistic workflow: calling protected API endpoints.

Real APIs are rarely open to public access.
They usually require an authentication or authorization flow before clients can read or change protected resources.
To test those endpoints with Respect, the workflow must first obtain credentials or an access token, then use that authorization data in later steps.

Respect supports this use case with the [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension), which lets a workflow provide security values for protected operations.

## Prerequisites

- Familiarity with the [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension).
- An API described with OpenAPI. The examples use a modified version of the Redocly Cafe API description.

## Explore the OpenAPI description

Open `redocly-cafe-api.yaml` in the right panel.
The walkthrough focuses on three pieces: the protected `POST /menu` operation, the OAuth2 security scheme, and the dynamic client registration endpoint.

{% step id="openapi-create-menu" heading="Protected POST /menu operation" %}
`POST /menu` creates a menu item.
The operation declares `OAuth2` with the `menu:write` scope under `security`, which means callers must present a valid OAuth2 access token with that scope.

The plain `GET /menu` operation, by contrast, leaves `security` empty and is publicly accessible.
{% /step %}

{% step id="openapi-oauth-register" heading="POST /oauth2/register" %}
The API supports dynamic client registration through `POST /oauth2/register`.
This endpoint is itself unauthenticated (`security: []`) and returns a new `clientId` and `clientSecret` that we can use to obtain an access token.

This flow follows the [Dynamic Client Registration Protocol (RFC 7591)](https://datatracker.ietf.org/doc/html/rfc7591).
{% /step %}

{% step id="openapi-oauth2-scheme" heading="OAuth2 security scheme" %}
The `OAuth2` security scheme defines two flows: `authorizationCode` and `clientCredentials`.
Both publish a `tokenUrl` and the `menu:read` and `menu:write` scopes.

This walkthrough uses these endpoints (and scopes) to obtain an access token and call the protected `POST /menu` operation.
{% /step %}

## Step 1. Register an OAuth2 client

Because client registration is useful in more than one workflow, describe it in its own Arazzo file and reuse it later.
Keeping the authorization details in a dedicated workflow keeps the protected-operation tests focused on the operation under test.

Switch to `register-oauth2-client.arazzo.yaml` in the right panel.

{% step id="register-source" heading="Reference the OpenAPI description" %}
The workflow declares a single OpenAPI source.
Operations in that source are accessible through `$sourceDescriptions.redocly-cafe-api.<operationId>`.
{% /step %}

{% step id="register-workflow" heading="Define the registration workflow" %}
The file declares one workflow, `register-oauth2-client-workflow`, that registers a new client and exposes its credentials as workflow-level outputs.
{% /step %}

{% step id="register-step" heading="A single registration step" %}
The workflow has just one step, `register-oauth2-client`, which calls the registration operation.
{% /step %}

{% step id="register-step-operation" heading="Connect the step to the operation" %}
The step targets the `registerOAuth2Client` operation from the connected OpenAPI source.
Because the step is connected to a documented operation, Respect can automatically validate the response status, content type, and body schema.
{% /step %}

{% step id="register-request-body" heading="Supply the request body" %}
Because this is a `POST` request, the step provides a `requestBody.payload` with the client metadata.
Here we request only the `client_credentials` grant type and ask for both menu scopes.
{% /step %}

{% step id="register-success-criteria" heading="Assert the response shape" %}
The step asserts a `201` status code and the presence of `clientId` and `clientSecret` in the response body.
{% /step %}

{% step id="register-step-outputs" heading="Capture step outputs" %}
The step extracts `clientId` and `clientSecret` from the response body and stores them as step outputs.
Other steps in the same workflow can reference them through `$steps.register-oauth2-client.outputs.<name>`.
{% /step %}

{% step id="register-workflow-outputs" heading="Expose workflow outputs" %}
To make these values available to **other** Arazzo files that reuse this workflow, the same values are also exposed as workflow-level `outputs`.
That promotion is the bridge between a reusable workflow and the workflows that consume it.
{% /step %}

Execute the file with Redocly CLI to inspect the API response and confirm which values are mapped to workflow outputs:

```bash
npx @redocly/cli@latest respect register-oauth2-client.arazzo.yaml --verbose
```

## Step 2. Get an access token

Switch to `authorization.arazzo.yaml` in the right panel.
This workflow exchanges the registered client for an access token in two steps:

1. Reuse `register-oauth2-client-workflow` to get a `clientId` and `clientSecret`.
2. Call the token endpoint and expose the returned access token as a workflow output.

{% step id="auth-sources" heading="Multiple source descriptions" %}
This file declares two sources: the OpenAPI description (`redocly-cafe-api`) and the previous Arazzo file (`register-oauth2`).

Arazzo source descriptions are not limited to OpenAPI - another Arazzo document is a valid source too.
{% /step %}

{% step id="auth-source-arazzo" heading="Reusable Arazzo source" %}
Adding the registration file as a source with `type: arazzo` is what enables reuse.
A step can now reference the registration workflow by id, just like operations reference OpenAPI `operationId`s.
{% /step %}

{% step id="auth-step-reuse" heading="Call the reusable workflow" %}
The first step uses `workflowId` (not `operationId`) to call the registration workflow from the other Arazzo file.

Its `outputs` mirror the workflow-level outputs we exposed earlier (`clientId`, `clientSecret`), which makes them available locally as `$steps.register-oauth2-client.outputs.*`.
{% /step %}

{% step id="auth-step-token" heading="Call the token endpoint" %}
The second step, `authorize-with-client_credentials`, calls `/oauth2/token` using the credentials returned by the previous step.

In a production application, the `/callback` URL is usually implemented by the client application.
In this example, the Redocly Cafe API provides the callback endpoint for demonstration purposes.
{% /step %}

{% step id="auth-x-operation" heading="x-operation extension" %}
`/oauth2/token` is not described as an `operationId` in the OpenAPI file, so the step uses the [`x-operation` Respect extension](https://redocly.com/docs/respect/extensions/x-operation) to declare the request URL and method inline.

Use `x-operation` whenever you need to call a URL that is not part of the OpenAPI description.
{% /step %}

{% step id="auth-token-request-body" heading="Token request body" %}
The token request body follows the OAuth2 spec: `grant_type`, `client_id`, and `client_secret`.
The credentials are read from the previous step's outputs using `$steps.register-oauth2-client.outputs.*`.
{% /step %}

{% step id="auth-token-output" heading="Capture the access token" %}
The step extracts `access_token` from the response body so the next workflow can use it to authorize protected requests.
{% /step %}

{% step id="auth-workflow-outputs" heading="Expose the authorization outputs" %}
Just like the registration workflow, the authorization workflow exposes its outputs at the workflow level so any consumer Arazzo file can read `access_token_with_code` and `client_id`.
{% /step %}

Execute this file:

```bash
npx @redocly/cli@latest respect authorization.arazzo.yaml --verbose
```

Inspect the response body of the last step. It should contain the `access_token` that the final workflow will use:

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

## Step 3. Call the protected endpoint

Switch to `redocly-cafe-api.arazzo.yaml` in the right panel.
This is the workflow you run in CI: it authorizes, creates a menu item, and then verifies the creation.

The important handoff is:

- The `authorize` step calls the reusable authorization workflow.
- The `create-menu-item` step reads `access_token` and `client_id` from the `authorize` step outputs.
- The `x-security` extension automatically constructs the appropriate authorization headers, query parameters, or cookies for the protected `createMenuItem` operation.

{% step id="final-sources" heading="Combine the OpenAPI and authorization sources" %}
The final file references two sources: the OpenAPI description for the operations under test, and the authorization Arazzo file for the access token.
{% /step %}

{% step id="final-step-authorize" heading="Reuse the authorization workflow" %}
The first step calls `authorize-with-client_credentials` from the authorization file and stores the access token and client id locally.

This is exactly the same reuse pattern used inside `authorization.arazzo.yaml`, but now applied one level higher.
{% /step %}

{% step id="final-step-create" heading="Create a menu item" %}
The `create-menu-item` step calls the protected `createMenuItem` operation.
It uses `$faker.string.uuid()` to generate a unique `name` so the test is repeatable.
{% /step %}

{% step id="final-x-security" heading="Provide credentials with x-security" %}
The [`x-security` extension](https://redocly.com/docs/respect/extensions/x-security#x-security-extension) tells Respect which security scheme to satisfy and how.

Here the workflow passes the `accessToken` and `clientId` it received from the `authorize` step.
Respect reads the security scheme from the OpenAPI description and adds the right headers automatically - you do not need to construct `Authorization: Bearer ...` yourself.
{% /step %}

{% step id="final-create-operation" heading="The protected operation" %}
This is the operation the step targets back in `redocly-cafe-api.yaml`.
Note the `security` block listing `OAuth2` with the `menu:write` scope - that is exactly what the `x-security` block satisfies.
{% /step %}

{% step id="final-create-body" heading="Send a multipart/form-data body" %}
`createMenuItem` accepts `multipart/form-data`, so the step declares `contentType` explicitly and supplies the form fields as `payload`.
{% /step %}

{% step id="final-step-verify" heading="Verify the menu item" %}
The final step lists menu items and asserts that the item created in the previous step exists.
This uses outputs from `create-menu-item` directly in a request parameter and in a success criterion.
{% /step %}

Run the workflow to confirm that the authorization step, the protected POST request, and the verification step all pass:

```bash
npx @redocly/cli respect redocly-cafe-api.arazzo.yaml --verbose
```

## Summary

Respect extensions make it possible to describe authorized API requests as part of an Arazzo workflow.

By splitting the process into smaller workflows with outputs, you can reuse authentication and authorization steps across multiple API contract tests.
This keeps complex workflows easier to maintain while still testing realistic protected API behavior.

{% /code-walkthrough %}
