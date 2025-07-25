# Test a sequence of API calls with Respect

Use Respect to make a series of API calls to a demo API, and use the response from the first call as an input for the second.

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

After you review the docs, press <kbd>`Control`</kbd> + <kbd>`C`</kbd>` in your terminal to stop the preview.

## Sequence requests together

Let's create a flow [based on the starter guide](./run-generated-tests.md) that sequences the following two requests together:

- create a quiz
- get scores for that quiz

To complete these steps, we'll need to use a response value from the first "create a quiz" request in the second "get scores for that quiz" request to get the scores.
Here's the Arazzo file to achieve the steps, put the following content into `sequence.arazzo.yaml`:

```yaml {% title="sequence.arazzo.yaml" %}
arazzo: 1.0.1
info:
  title: Learning API Demo
  version: v1
sourceDescriptions:
  - name: demo
    type: openapi
    url: demo.yaml
workflows:
  - workflowId: sequence-demo
    steps:
      - stepId: createQuiz
        operationId: PostQuiz
        outputs:
          quizId: $response.body#/id
      - stepId: getScores
        operationId: GetScores
        parameters:
          - in: header
            name: quiz
            value: $steps.createQuiz.outputs.quizId
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

Run the new sequence in verbose mode with the following command:

```sh
npx @redocly/cli respect sequence.arazzo.yaml --input IMFKEY=abc --verbose
```

Reading through the output, observe that:

1. The first request is a `POST` to create a quiz; it returns status `201`.
1. The response body includes an `id` field.
1. The value of the `id` field from the first step is used as a parameter in the second step.

Being able to use response data in later steps is what makes the testing sequence very flexible and powerful.
You can test create and update workflows using this approach, where some data (such as the `id` in this example) isn't known in advance.

## Next steps

Start testing your own APIs, or other APIs that you depend on, using Respect.

**Remember that Respect sends real API requests**, so consider using a local development or staging version of an API for some types of testing.
Use Respect to make sure that the real API has not drifted from the expected behavior described in its OpenAPI file.
You can also override the server URL from the `sourceDescriptions` object with the `--server` option.
