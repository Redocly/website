# What is Respect?

Respect the discrepancies between OpenAPI descriptions and actual API responses.

The key benefits of Respect:

- Increases clarity and readability of tests.
- Autogenerates tests from OpenAPI to get started quickly.
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

The key goal of Respect is to make APIs easier to consume and to detect any regressions (or breaking changes) in an API.
