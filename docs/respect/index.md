# Respect your API and detect problems early

Respect is the go-to tool for making sure your APIs match their OpenAPI descriptions.
It checks your API responses match what the OpenAPI description says, and reports any mismatches.
It also supports [OpenAPI Arazzo format](../../learn/arazzo/what-is-arazzo.md) so it supports complex, linked API workflows.

Respect sends API requests to your live API server, and validates that the response matches the expectations.
Quick to set up and easy to use, Respect lets you catch discrepancies early — on your own machine or in CI/CD pipelines.
It's all about giving developers peace of mind, ensuring your APIs are dependable, and keeping surprises to a minimum.
Welcome to a smoother API testing journey with Respect!

## Use cases

- API testing
- API flows
- API security
- API monitoring

Read about the [use cases](./use-cases.md).

## Benefits

The key benefits of Respect:

- Increases clarity and readability of tests.
- Autogenerates tests from OpenAPI to get started quickly, and supports Arazzo format.
- Maintain a positive reputation in your ecosystem (nobody likes when a 3rd party API change breaks their own software).
- Efficient because it links API requests to corresponding OpenAPI descriptions automatically.
- Shift left to catch problems fast before they are costly. Run on developer laptops and CI/CD.

You **MUST** have a working API server running to run the tests because it sends real HTTP requests.

## How does Respect work?

Respect sends an API request to a path with a given HTTP method.
Respect finds the corresponding API with matching path and HTTP method from the linked OpenAPI description.
Respect compares the response code and body to the expectations as defined in the linked OpenAPI description.
Additionally, more expectations can be described in Respect.

## Why Respect?

Many API publishers are producing OpenAPI descriptions for their APIs today.
They rarely confirm their accuracy.
This happens even when API descriptions are generated from code.
Support of the [Arazzo Specification](https://github.com/OAI/Arazzo-Specification) gives you the flexible way to describe your API workflows,
that can be applied for testing or automation purposes.
Start by [learning Arazzo](../../learn/arazzo/what-is-arazzo.md).

## Write test descriptions

Describe tests in a YAML file in OpenAPI Arazzo format.
A test description can be linked to an OpenAPI file.

{% if includes($rbac.teams, "corporate-sso") %}

### Supported extensions

Respect supports two extensions to make it easier to run tests:

- [x-operation](./extensions/x-operation.md) for a freeform API call outside the described API endpoints.
- [x-security](./extensions/x-security.md) extension lets you apply OpenAPI security schemes to a step request.

{% /if %}

### Features currently unsupported

- No support for XPath.

