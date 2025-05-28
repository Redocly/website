# Use cases for Respect

[Redocly Respect](./index.md) is an API contract testing system based on OpenAPI Arazzo.
Respect sends API requests to an API server and validates that the response matches the expectations described in the OpenAPI description and in the Arazzo file.

This page describes common Respect use cases and provides related resources that can be used to create Respect configurations and workflows.

## API testing

Test that API responses match expectations and avoid API drift, where the described API doesn't meet the server implementation.

Detect problems as early as possible by shifting left to the dev environment and CICD.
Receive clear information when a problem is detected so that your team can quickly understand and correct the problem.

### Test on the local development platform

Use Respect to run some or all of your test flows on your local development platform as you work.
Design-first workflows that already have the OpenAPI description in place are a perfect fit for this approach, but code-first workflows also get the benefits at this early local development stage.

### Test in CI for each pull request

Run tests automatically in a CI/CD environment to verify all flows function as expected.
The automation ensures that this step adds value on every CI build, and that any unexpected problems or regressions are identified quickly, while the code is still being reviewed.
Prevent problems from reaching production.

### Run regular smoke tests

Run tests periodically against production or pre-production environments.
Detect any problems or drift of the API away from its OpenAPI description by running smoke tests at regular intervals or after releases.

### Test 3rd-party APIs

More and more software relies on 3rd party APIs.
Verify that the APIs you depend on behave as you expect, and get notified if something changes or breaks.
Using Respect to check the functionality you use in other APIs helps to identify problems, and means you can upgrade more quickly and confidently if a new API version is released.

## Additional features

### Describe complex API sequences

Describing how a sequence of API requests work together to accomplish a use case makes much more relevant and integrated testing.
Respect uses the OpenAPI Arazzo format, and supports chaining requests by using response values in subsequent requests.

### Latency monitoring

Use Respect to monitor the response times of your real API calls, and notify you of unexpected variations.

### Detect data leaks

Check for changes in payload sizes or properties and values that could indicate unexpected or undesirable activity.
