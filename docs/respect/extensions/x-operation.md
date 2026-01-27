# x-operation extension

`x-operation` enables you to specify a URL and HTTP method for an operation that is not described in the Arazzo `sourceDescriptions` section.
The primary application of the `x-operation` extension is to facilitate calls to third-party APIs or other endpoints that are needed in a sequence of API calls.

## Location

Use `x-operation` as part of a [Step object](https://spec.openapis.org/arazzo/v1.0.0.html#step-object).

## x-operation Object

{% table %}
* Field Name {% width="25%" %}
* Type {% width="15%" %}
* Description
---
* <a name="url"></a>url
* `string`
* **REQUIRED.** A valid URL including the protocol (such as `http://localhost:4000/my-api` or `https://example.com/api/my-api`) or a [Runtime Expression](https://spec.openapis.org/arazzo/latest.html#runtime-expressions) (e.g., $steps.<STEP_ID>.outputs.<OUTPUT_NAME>) .
---
* <a name="method"></a>method
* `string`
* **REQUIRED.** HTTP operation method. Possible values: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`, `CONNECT`, `TRACE`. You can also use their lowercase equivalents.
{% /table %}


## Example

Make an HTTP request not described in an OpenAPI description as part of a workflow.

```yaml
steps:
  - stepId: get-first-post
    x-operation:
      url: https://jsonplaceholder.typicode.com/posts/1
      method: GET
    successCriteria:
      - condition: $statusCode == 200
```

The `successCriteria` fields work in the same way as other operation types.

---

Use the output from the previous step response to define your request `url`:

```yaml
steps:
  - stepId: file-upload
    operationId: $sourceDescriptions.openapi.FileUpload
    outputs:
      upload_file_url: $response.body#/uploaded_file_url
  - stepId: get-uploaded-file-by-url
    x-operation:
      url: $steps.file-upload.outputs.upload_file_url
      method: get
```

## Resources

- [x-security](./x-security.md) extension lets you apply OpenAPI security schemes to a step request.
- [Respect commands list](../commands/index.md).
- Learn about [Arazzo](../../../learn/arazzo/what-is-arazzo.md).
