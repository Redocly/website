{% code-walkthrough
  filesets=[
    {
      "files": [
        "../_filesets/practical-example-series/contract-testing/redocly-cafe-api.arazzo.yaml",
        "../_filesets/practical-example-series/contract-testing/redocly-cafe-api.yaml"
      ]
    }
  ]
%}

# Respect Practical Example Series: API Contract Testing with Respect

This article shows how to use Respect, powered by Arazzo workflows, for API contract testing.
You will learn how to describe an API workflow, execute it with Redocly CLI, and use the results to find mismatches between an OpenAPI description and the real API behavior.

You will cover the following topics:

Practical applications of Arazzo:

- Automating repetitive API workflows.
- Adding API contract tests to CI/CD routines.
- Keeping API documentation synchronized with actual API behavior.
- Sharing described workflows across teams.
- Using the open-source [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) `respect` command to execute Arazzo workflows, inspect contract test results, and fix mismatches between the OpenAPI description and the actual API response.

## The problem

Many teams test APIs by writing test code in the same language as the API implementation.
This can work well for a single service, but it becomes harder to maintain in systems with multiple products, repositories, and programming languages.

Another common challenge is keeping API documentation aligned with actual API behavior.
Developers may update an endpoint but forget to update its OpenAPI description, or the documentation may change without the implementation following it.
Over time, these small differences make it harder for QA engineers, developers, and technical writers to trust the API contract.

Respect helps address this problem by executing Arazzo workflows against a running API and validating the responses against the connected OpenAPI description.
This makes API contract testing more declarative and easier to share across teams.

## Prerequisites

To follow the examples in this article, you need:

- Basic familiarity with [Arazzo](../what-is-arazzo.md).
- An API described with OpenAPI. The examples use a modified version of the Redocly Cafe API description.

> **Important:** The API description used here intentionally contains a discrepancy for demonstration purposes.

## Explore the OpenAPI description

Open `redocly-cafe-api.yaml` in the right panel to follow along.
The two important pieces for this walkthrough are the `GET /menu` operation and the `MenuItemList` response schema it references.

{% step id="openapi-list-menu-items" heading="GET /menu operation" %}
The `GET /menu` operation returns a paginated list of menu items.
The `200` response points to the `MenuItemList` schema, which is where the intentional discrepancy lives.
{% /step %}

{% step id="openapi-broken-schema" heading="MenuItemList (broken)" %}
The schema declares the response as an **array**, but the real API returns a **paginated object** with `object`, `page`, and `items` fields.
Later in this walkthrough, Respect will compare this contract with the real API response and surface the mismatch.
{% /step %}

## Create an Arazzo description

There are several ways to create an Arazzo description:

- Read the [Arazzo specification](https://spec.openapis.org/arazzo/latest.html) and write the file from scratch for full control.
- Use the `npx @redocly/cli generate-arazzo openapi.yaml` command as a starting point.
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

Now switch to `redocly-cafe-api.arazzo.yaml` in the right panel and walk through it section by section.

{% step id="arazzo-version" heading="Declare the Arazzo version" %}
Every Arazzo file begins with a version declaration.
The latest stable version is `1.0.1`.
{% /step %}

{% step id="arazzo-info" heading="Describe the workflow document" %}
Similar to OpenAPI, the `info` object provides a `title`, `version`, and optional `description` that summarize what the workflow file is about.
{% /step %}

{% step id="arazzo-source-descriptions" heading="Connect an OpenAPI source" %}
`sourceDescriptions` defines the connection to one or more OpenAPI files.

The example references the local `redocly-cafe-api.yaml` and gives it the name `redocly-cafe-api`.
This name is used later to refer to operations from that description.
{% /step %}

{% step id="arazzo-workflows" heading="Define a workflow" %}
A single Arazzo file can declare multiple `workflows`.
Each workflow has a unique `workflowId` and a `summary`.
This example defines `menu-items-workflow`, which retrieves the menu items list.
{% /step %}

{% step id="arazzo-steps" heading="Add steps" %}
Each workflow is composed of one or more `steps`.
A step is the smallest unit of execution: typically a single API call against an operation from the connected source description.
{% /step %}

{% step id="arazzo-operation-id" heading="Reference an operation" %}
The step uses `operationId` to connect to an operation in the OpenAPI description, using the pattern:

```text
$sourceDescriptions.<source-name>.<operationId>
```

In this example, the step resolves to the `listMenuItems` operation from the `redocly-cafe-api` source.
{% /step %}

{% step id="arazzo-step-operation" heading="The resolved operation" %}
This is the operation the step resolves to in `redocly-cafe-api.yaml`.

Because the step is connected to an OpenAPI operation, Respect knows the documented status codes, content types, and response schema for the request and can automatically validate them.
{% /step %}

{% step id="arazzo-parameters" heading="Pass parameters" %}
Steps can pass parameters to the operation.
Here, the `limit` query parameter restricts the response to a single menu item, which keeps the example output small and easy to read.
{% /step %}

{% step id="arazzo-success-criteria" heading="Define success criteria" %}
Steps can include a `successCriteria` block to define workflow-specific expectations.

This example asserts that the API responds with a `200` status code.
Respect also runs additional automatic checks based on the connected OpenAPI description (see the next section).
{% /step %}

## Execute the workflow with Redocly CLI

[@redocly/cli](https://www.npmjs.com/package/@redocly/cli) is an open-source tool that can execute Arazzo descriptions with the `respect` command:

```bash
npx @redocly/cli respect redocly-cafe-api.arazzo.yaml
```

The workflow targets the server defined in the OpenAPI description, so you do not need to provide one via the command line.

The full output is useful for debugging, but the most important lines are the checks near the end of the step:

- The success criteria check passes because the API returns status code `200`.
- The status code and content type checks pass because the response matches the documented response metadata.
- The schema check **fails** because the response body shape does not match the documented schema.

<details>
<summary>Respect execution output</summary>

```bash
    Running workflow redocly-cafe-api.arazzo.yaml / menu-items-workflow 
 
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

  Summary for redocly-cafe-api.arazzo.yaml
  
  Workflows: 1 failed, 1 total
  Steps: 1 failed, 1 total
  Checks: 3 passed, 1 failed, 4 total
  Time: 58ms 
```

</details>

In addition to the success criterion declared in the Arazzo file, Respect performed three additional checks automatically:

- `status code check`
- `content-type check`
- `schema check`

Because the workflow step is connected to an OpenAPI description, [@redocly/cli](https://www.npmjs.com/package/@redocly/cli) verifies that the API returns a documented status code, the expected content type, and a response body that matches the documented schema.

## Understand the schema failure

Switch back to `redocly-cafe-api.yaml` in the right panel.
The failed schema check reports the following message:

```text
| ^^ 👈🏽  type must be array
```

{% step id="schema-failure" heading="Spot the mismatch" %}
The OpenAPI description declares `MenuItemList` as an **array**, but the actual API response is a paginated **object** with `object`, `page`, and `items` properties.
This is the intentional discrepancy in the example.

Respect made this drift visible immediately, without anyone having to read both the OpenAPI description and the API output side-by-side.
{% /step %}

## Fix the schema

In `redocly-cafe-api.yaml`, change `MenuItemList` from an `array` to an `object` with `object`, `page`, and `items` properties so the schema matches the response the API actually returns:

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

Re-run the workflow to confirm that all checks now pass:

```bash
npx @redocly/cli respect redocly-cafe-api.arazzo.yaml
```

After the schema is updated, the response body matches the documented contract.
This demonstrates the core value of contract testing with Respect: when the API and its OpenAPI description drift apart, the workflow highlights the mismatch immediately.

## Practical applications

After you create and verify an Arazzo workflow locally, you can use it in several ways:

- Include the workflow in a CI/CD pipeline to keep API documentation synchronized with actual API behavior:

  ```bash
  # Spawn your API instance
  npm install @redocly/cli@latest -g
  redocly respect products.arazzo.yaml --verbose
  ```

- Automate routine API workflows for development and QA tasks.
- Describe important application flows with Arazzo and share them with team members. Non-technical users can also use visualization tools like Replay to understand the workflows.

## Summary

Arazzo provides a standard way to describe API workflows declaratively.
Respect uses those workflows to run API contract tests against real API behavior.

With this approach, teams can maintain API test coverage, detect documentation drift earlier, and share executable API workflows across engineering, QA, and documentation teams.

{% /code-walkthrough %}
