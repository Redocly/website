---
rbac:
  corporate-sso: read
---
# x-serverUrl extension

`x-serverUrl` sets the URL to use for API calls.
It can be one of the URLs listed in the OpenAPI description, or another URL such as a sandbox or test platform.

## Location

Use `x-serverUrl` as an extension to an entry in `sourceDescriptions`.

## x-serverUrl Object

{% table %}
* Field Name {% width="25%" %}
* Type {% width="15%" %}
* Description
---
* `x-serverUrl`
* `string`
* Specify the URL to use when making API calls to this API.
  If not provided, the first entry in the `servers` array is used: `$servers.0.url`
{% /table %}

## Example

The following example picks the second entry in the `servers` list:

```yaml
sourceDescriptions:
  - name: museumAPI
    url: https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml
    type: openapi
    x-serverUrl: $servers.1.url
```

You can also specify an absolute URL, as in the following example:

```yaml
sourceDescriptions:
  - name: museumAPI
    url: https://github.com/Redocly/museum-openapi-example/blob/main/openapi.yaml
    type: openapi
    x-serverUrl: https://test-lab1.example.com
```

Respect uses the specified `x-serverUrl` when calling API endpoints for that source description.

## Resources

- [x-operation](./x-operation.md) extension lets you describe one-off API calls.
- [x-security](./x-security.md) extension lets you apply OpenAPI security schemes to a step request.
- [Respect commands list](../commands/index.md).
- Learn about [Arazzo](../../../learn/arazzo/what-is-arazzo.md).

