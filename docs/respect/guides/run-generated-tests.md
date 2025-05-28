# Generate and run API tests with Respect

Follow this tutorial to get the tool set up and take your first steps using our example API.

## Before you begin

Make sure you have the following before you begin:

1. [Node.js](https://nodejs.org/) LTS version
2. [Curl](https://curl.se/)
3. A copy of the [Demo API description](https://api.redocly.com/registry/bundle/testing_acme/training/v1/openapi.yaml), renamed to `demo.yaml`.
   Download the demo API description with the following command:

   ```shell
   curl https://api.redocly.com/registry/bundle/testing_acme/training/v1/openapi.yaml > demo.yaml
   ```

## Preview the API

To get a sense of the API, preview it by running the following command, and then clicking on the link generated to your localhost.

```shell
npx @redocly/cli preview demo.yaml
```

After you review the docs, you can use control-c in your terminal to stop the preview.

## Generate a starter test description

Respect uses a description format known as [Arazzo](../../../learn/arazzo/what-is-arazzo.md).
You can generate a basic starter set of tests from an OpenAPI file, so each workflow contains one step and reaches one operation from the description.

The following command generates a test description to use with the example API that you saw earlier:

```sh
npx @redocly/cli generate-arazzo demo.yaml
```

You'll find the output in a file named `auto-generated.yaml`. Take a moment to examine the test description and you will notice that each operation from the OpenAPI file now has a workflow entry like the following example:

```yaml
  - workflowId: get-workflow
    steps:
      - stepId: get-step
        operationId: $sourceDescriptions.demo2.GetRoot
```

You can use these starter tests as a basic validation step for an API to check that an expected response with a valid data payload is received, then develop more complex flows too.

## Run the tests

Using the generated test file, the following command checks the live API against the behavior described by OpenAPI:

```sh
npx @redocly/cli respect auto-generated.yaml --verbose
```

The tests complete successfully but if you look closely you may notice that all the requests we sent were unauthenticated.
Unauthenticated requests should receive a `400` response, which they do, and so the tests pass.

The following is a snippet of the output.

```sh
{"type":"http://example.com","title":"Not authenticated. Supported authentication types: imfKey.","status":400,"detail":"string","instance":"string"}
```

The next step is to add authentication information and run the tests again with credentials.

## Add authentication headers

To test the behavior of the API when authentication is supplied, it must be added to the workflow file.
Since it's not good practice to add secrets directly to a file that is stored in source control, this example uses an environment variable.

Open the `auto-generated.yaml` file in your IDE or text editor.
Add the following lines to the file to each workflow (at the same level as `workflowId` and `steps`) to set the authentication header to use, and to describe that the value comes from the `IMFKEY` environment variable:

```yaml
parameters:
  - in: header
    name: IMF-KEY
    value: $inputs.IMFKEY
inputs:
  type: object
  properties:
    env:
      type: object
      properties:
        IMFKEY:
          type: string
          format: password
```

Run the tests again and supply the input value to the CLI, as shown in the following example:

```sh
npx @redocly/cli respect auto-generated.yaml --input IMFKEY=abc
```

You can use this exact command, including the value of the environment variable, because the demo API accepts these credentials.

This time, the API returns responses with `200` status code, indicating that the requests were successful and matched what is described in the OpenAPI file.

## Make it fail and fix it

Respect is a testing tool, so it is useful to see some failing tests.

Open `demo.yaml` and change the `activity.data` property named `type` to be`type: integer` on line 358.
This update makes Respect expect an `integer`, but the demo API continues to return a `string`.

Each workflow can be run independently, so that you can focus on a specific error or operation.
This ability to focus is very useful when you need more context to understand a particular issue, such as the one you just caused, without wanting to run every API test every time.
The following command runs the tests in `--verbose` mode for only that specific failed flow using the `--workflow` parameter:

```sh
npx @redocly/cli respect auto-generated.yaml --verbose \
   --workflow get-users-{id}-workflow
```

The following is a snippet of the test output.

```bash
Failed tests info:

Flow name:  get-users-{id}-workflow

demo.GetUserActivity   get-users-{id}-step

✗ schema check


      Schema is not matched
      Schema path: #/properties/activity/items/properties/data/properties/name/type
      Instance path: /activity/0/data/name
      Error: type must be integer
      Value: "Onboarding Part 1"
```

The test is failing because it checks the response against `demo.yaml`, which you edited to expect an integer.

Undo the change to the `demo.yaml` file on line 358 to make the type a `string` again.
Run the single workflow again to confirm that it is fixed.
All tests should pass.

## Next steps

Remember to add and update tests as your API changes and evolves.
Add Respect to your local development and continuous integration setup so that if something breaks or the API drifts, you "respect" it immediately.

There's also a guide on [test a sequence of API calls](./test-api-sequences.md) for you to try next.
