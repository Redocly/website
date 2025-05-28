{% code-walkthrough filesets=[
    {
        files: [
            "_filesets/warp.arazzo.yaml",
            "_filesets/warp.openapi.yaml"
        ],
    }
]
%}

# Learn Arazzo by example

## Boilerplate structure

  Every Arazzo specification requires a few key components to get started.
  These elements form the basic structure that all Arazzo files must follow.

  {% step id="spec" heading="Spec" %}
  The `arazzo` version declaration at the top of the file (e.g. `arazzo: 1.0.1`)
  {% /step %}

  {% step id="info" heading="Info" %}
    Similar to OpenAPI, Arazzo uses `info` to describe the API.
    It also declares which version of Arazzo is used (even though only version `1.0.x` is available at the moment).
  {% /step %}

{% step id="sourceDescriptions" heading="Source Descriptions" %}
  The `sourceDescriptions` section is used to describe the sources of the API.
  It is a list of objects, each containing a `name` and a `url` (path to the OpenAPI file).
  It only supports `openapi` type at the moment (but is expected to support more types such as `asyncapi` in the future).
{% /step %}

{% step id="workflows" heading="Workflows" %}
  The `workflows` section is used to define the workflows of the API.
  It is a list of objects, each containing a `name` and a `description`.
  We'll dive deeper into workflows in the next major section.

  This specific workflow is based on the ["Lost Invention Mission"](https://warp-multi-sidebars.redocly.app/tutorials/lost-invention).
{% /step %}


{% step id="steps" heading="Steps" %}
  The `steps` section is used to define the steps of a specific workflow.
  Each step contains a `name`, a `description`, and a `request` object.
  The `request` object contains the API call to be made.
  We'll dive deeper into steps in the next section.
  This specific workflow is based on the ["Lost Invention Mission"](https://warp-multi-sidebars.redocly.app/tutorials/lost-invention).
{% /step %}

## Workflow structure

An Arazzo can contain multiple workflows.
This example Arazzo contains only a single workflow (with multiple steps).

{% step id="workflows.missionLostInvention" heading="Workflow: Lost Invention" %}
  This workflow is based on the ["Lost Invention Mission"](https://warp-multi-sidebars.redocly.app/tutorials/lost-invention).
{% /step %}

{% step id="workflows.missionLostInvention.inputs" heading="Workflow: Lost Invention - Inputs" %}
  The `inputs` section is used to define the inputs of a specific workflow.
  It is a json schema object describing each input.
  This specific API requires a `token` input.
  We'll pass the token into the Arazzo workflow runner using an input parameter (or environment variable).
{% /step %}

{% step id="workflows.missionLostInvention.parameters" heading="Workflow: Lost Invention - Parameters" %}
  The `parameters` section is used to define the parameters of a specific workflow.
  It is a list of objects, each containing a `name`, an `in` property, and a `value` property.
  The value in this case uses the prefixes the "Bearer " to the input parameter `token` and passes it to the API as part of the `Authorization` header.
{% /step %}

## Steps structure

A workflow can contain multiple steps.
Each step contains a `name`, a `description`, and a reference to an operation in the API (such as an `operationId` or `path`).

{% step id="steps.setAnchorToCurrentTime" heading="Steps" %}
  The `steps` section is used to define the steps of a specific workflow.
  The `stepId` is required and used to uniquely identify the step.
  It's a good practice to give each step a meaningful `description`.
{% /step %}

{% step id="steps.setAnchorToCurrentTime.operationId" heading="Operation ID" %}
  The `operationId` is the operation ID of the API call to be made.
  Arazzo has some flexibility in how it references the operation either by `operationId` or an `operationPath`.
  In this case, we're using the `operationId` to reference the `setAnchor` operation in the `api-reference` API.
  Note that the `operationId` is prefixed with the `sourceDescription.name` (in this case, `api-reference`) which allows Arazzo to disambiguate between operations with the same ID or path in different APIs.
{% /step %}

{% step id="steps.setAnchorToCurrentTime.outputs" heading="Outputs" %}
  The `outputs` section is used to define the outputs of a specific step.
  Output is only defined for passing data to another step.
  It does not describe the full API response.

  In this case, we're using the `anchor_id` output to pass the ID of the anchor to the next step.
  The value is `$response.body#/id` which means that the value is the `id` field in the response body.

  The format of outputs is a map object where each key is the output name and the value follows a convention described in the Arazzo specification as a runtime expression.

  <details>
  <summary> Runtime expression following an ABNF syntax</summary>

  ```abnf {% title="Runtime Expression ABNF" %}
expression = ( "$url" / "$method" / "$statusCode" / "$request." source / "$response." source / "$inputs." name / "$outputs." name / "$steps." name / "$workflows." name / "$sourceDescriptions." name / "$components." name / "$components.parameters." parameter-name)
parameter-name = name ; Reuses 'name' rule for parameter names
source = ( header-reference / query-reference / path-reference / body-reference )
header-reference = "header." token
query-reference = "query." name
path-reference = "path." name
body-reference = "body" ["#" json-pointer ]
json-pointer    = *( "/" reference-token )
reference-token = *( unescaped / escaped )
unescaped       = %x00-2E / %x30-7D / %x7F-10FFFF
    ; %x2F ('/') and %x7E ('~') are excluded from 'unescaped'
escaped         = "~" ( "0" / "1" )
; representing '~' and '/', respectively
name = *( CHAR )
token = 1*tchar
tchar = "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~" / DIGIT / ALPHA
    ```

</details>

{% /step %}



{% step id="steps.avoidParadox.requestBody" heading="Request Body" %}
  The `requestBody` section is used to define the request body of a specific step.
  You can supply a `payload` object to pass data to the API.
  In this case, we're using the `requestBody` to pass the `timeline_id` and `proposed_changes` to the API.
  You can "hardcode" the values or use the outputs from previous steps.
{% /step %}


{% step id="steps.returnToPresent.requestBody" heading="Using outputs from previous steps" %}
  In this exmaple, we're using the output from the `setAnchorToCurrentTime` step to pass the `anchor_id` to the `returnToPresent` step.
{% /step %}


## Success criteria

Success criteria can be optionally defined for each step.

{% step id="steps.avoidParadox.successCriteria" heading="Success Criteria" %}
  The `successCriteria` section is used to define the success criteria of a specific step.
  It is a list of objects, each containing a `condition` and a `context`.
  The `condition` is a boolean expression that describes the success criteria.
  The `context` is the context of the success criteria.
{% /step %}

## What can we do with Arazzo?

Respect is a powerful tool that can be used to test APIs described with Arazzo.

It checks that the API is working as expected by validating the API responses against the success criteria.
Good news is that even if you don't take the time to define success criteria (or your success criteria are not exhaustive), Arazzo still validates the API responses (headers, status code, and body schemas) against the linked OpenAPI source description.

Try it out for yourself by running the workflow in Respect after you download these files into a folder (both the `arazzo.yaml` and `openapi.yaml` files), change into that folder and run the following command (no real token is needed for this example because the server is a mock server):

```bash
npx @redocly/cli@latest respect warp.arazzo.yaml --input token=your-token-here --server api-reference=https://warp-multi-sidebars.redocly.app/_mock/apis/
```

Read more about Respect in [Testing Arazzo Workflows](./testing-arazzo-workflows.md).

{% /code-walkthrough %}

