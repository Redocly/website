# OpenAPI extension: `x-codeSamples`


Code samples are snippets of code shown alongside API operations in reference documentation, giving users a quick way to start to interact with an API from their own code.
The `x-codeSamples` addition to OpenAPI allows you to add or override any existing code samples for a particular language or endpoint.

Use the `x-codeSamples` option to make code samples part of the API description, or to replace the generated examples with code that is specific to your use case, such as using a custom library or SDK.

{% admonition type="info" name="Language options" %}
Control the list of language options by adjusting the [openapi.code-samples](../../../config/openapi/code-samples.md) configuration setting.
{% /admonition %}

{% admonition type="info" name="Environment variables" %}
Use environment variable placeholders like `{{VARIABLE_NAME}}` in code samples. Configure their values in the `envVariables` field of your request values configuration. [Learn more about environment variables](../../../extend/how-to/configure-request-values.md#configure-environment-variables-for-code-samples).
{% /admonition %}

## Location

`x-codeSamples` can be added to Operation objects.

## Options

{% table %}

* Field Name
* Type
* Description

---

* x-codeSamples
* [ [Code Sample Object](#code-sample-object) ]
* A list of code samples associated with an operation.

{% /table %}


### Code Sample Object

{% table %}

* Field Name
* Type
* Description

---

* lang
* string
* **REQUIRED** Code sample language. Can be one of the [automatically supported languages](../../../config/openapi/code-samples.md#language-object) or any other language identifier of your choice (for custom code samples).

---

* source
* string
* **REQUIRED** Code sample source code, or a `$ref` to the file containing the code sample.

{% /table %}

## Examples

The following partial OpenAPI snippet shows adding code samples to replace the generated samples for the `getMuseumHours` operation.
One adds the source to the OpenAPI file, the other references a file containing the code sample.

```yaml

...
paths:
  /museum-hours:
    get:
      summary: Get museum hours
      description: Get upcoming museum operating hours.
      operationId: getMuseumHours
      x-codeSamples:
        - lang: PHP
          source: |
            <?php
              $url = "https://example.com/museum";
              $response = file_get_contents($url);
              $data = json_decode($response);
        - lang: Python
          source:
            $ref: "code_samples/python.py"
      tags:
        - Operations
```

## Resources

- Control the list of language options by adjusting the [openapi.code-samples](../../../config/openapi/code-samples.md) configuration setting.
- Control which extensions are included in your API reference documentation with the [showExtensions configuration setting](../../../config/openapi/show-extensions.md).
- See all [openapi configuration settings](../../../config/openapi/index.md).
- See a full [list of supported OpenAPI extensions](./index.md).
- Learn how to [configure environment variables](../../../extend/how-to/configure-request-values.md) that can be used in your code samples.

