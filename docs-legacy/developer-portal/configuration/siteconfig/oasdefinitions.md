---
excludeFromSearch: true
---

# `oasDefinitions`

## Usage

To [integrate your Reference docs](../../guides/reference-docs-integration.md) into the developer portal, link to the API definition root documents or [API registry snapshot URLs](../../../api-registry/guides/snapshots.md) from the `oasDefinitions` section.

Add the `oasDefinitions` section to the top level of the `siteConfig.yaml` file.

## Options

Declare the API definitions in the following format:

  `definitionId: target`

The `definitionId` is an alias for the API definition. Use any custom name of your choice. We recommend names that are easy to remember and identify. The names are case-sensitive.

Provide the `target` in any of the following ways:

- A path to the API definition root file in the developer portal project (`acme: ./openapi/acme.yaml`)

- A Redocly API [registry snapshot URL](../../../api-registry/guides/snapshots.md) (`example-api: https://api.redoc.ly/registry/testing_acme/bundle/example-api/1.0/main/openapi.yaml`)

- An external URL hosting the API definition (`external: https://example.com/acme.yaml`)

### Using $ref to declare API definitions

You can declare your API definitions in a separate file, then link to it in the `oasDefinitions` section using `$ref`. The definitions in the linked file must follow the same `definitionId: target` format.

For example, if linking to the `acme.yaml` file:

`$ref: ./openapi/acme.yaml`

the contents of the file can be:

```yaml
example: ./openapi/test.yaml
registry: https://api.redoc.ly/registry/testing_acme/bundle/example-api/1.0/main/openapi.yaml
external: https://example.com/acme.yaml
```

## Examples
{% tabs %}
{% tab label="In siteConfig" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
oasDefinitions:
  example: ./openapi/test.yaml
  external: https://example.com/acme.yaml
  registry: https://api.redoc.ly/registry/testing_acme/bundle/example-api/1.0/main/openapi.yaml
```
{% /tab  %}
{% tab label="In referenced file" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
oasDefinitions:
  $ref: ./openapi/acme.yaml
```
{% /tab  %}
{% /tabs  %}
