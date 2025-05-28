# x-meta

{% admonition type="info" name="Important" %}
This specification extension is supported only in Reference docs integrated in Developer portal `1.1.0-beta.32` and newer.

It requires that `pagination: item` is configured in the Reference docs `.page.yaml` file.
{% /admonition %}

## Usage

Use `x-meta` to control meta tags in the HTML `<head>` element for each Reference docs page in the Developer portal. Add it to the `operation` OpenAPI object.

Before adding `x-meta` to your API definition, you must set `pagination: item` in the `.page.yaml` configuration file. This ensures that every operation is rendered on its own page and can apply the tags you specified in `x-meta`.

Starting with version `1.1.0-beta.69` of the Portal, an extra object called `seo` must be added and all field names must be defined in it instead of directly under `x-meta`. The *Examples* section distinguishes between the *Old* and *New* approach.


| Field Name  | Type  | Description  |
| :---------- | :------: | :----------- |
| description | string   | Sets the contents of the `<meta name="description">` tag for the operation page. |
| image       | string   | Sets the rich metadata image that is used when sharing the direct link to the operation page. |
| keywords    | string   | Sets the contents of the `<meta name="keywords">` tag for the operation page. Provide the keywords as a comma-separated list, e.g. `keywords: documentation, api, openapi`. |
| title       | string   | Sets the default contents of the `<title>` tag for the operation page. This title is used in search engine results pages, and when sharing the link to the operation page on social media. |


## Examples

{% tabs %}
{% tab label="Old x-meta" %}
```yaml
openapi: '3.0'
info: ...
tags: [...]
paths:
  /example:
    get:
      summary: Example summary
      description: Example description
      operationId: examplePath
      responses: [...]
      parameters: [...]
      x-meta:
        - title: 'Custom page title'
          description: 'Detailed page description'
          keywords: documentation, operation, example
          image: 'https://example.com/image.png'
```
{% /tab  %}
{% tab label="New x-meta with seo" %}
```yaml
openapi: '3.0'
info:
  ...
tags: [...]
paths:
  /example:
    get:
      summary: Example summary
      description: Example description
      operationId: examplePath
      responses: [...]
      parameters: [...]
      x-meta:
        seo:
          title: "Custom page title"
          description: "Detailed page description"
          keywords: documentation, operation, example
          image: 'https://example.com/image.png'
```
{% /tab  %}
{% /tabs  %}
