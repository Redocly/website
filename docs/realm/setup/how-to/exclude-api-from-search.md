# Exclude API from search

You can exclude APIs from the search results but still keep them in your project.
This is useful if you have APIs that are not ready for public consumption.

## Before you begin

Make sure you have the following before you begin:

- a `redocly.yaml` configuration file

## Exclude an API

You can exclude a specific API from the search results by setting the `excludeFromSearch` option to `true`
under the `openapi` key in the `redocly.yaml` file:

```yaml
apis:
  museum@default:
    root: 'openapi/redocly-museum.yaml'
    openapi:
      excludeFromSearch: true
```

## Exclude all APIs

Setting the `excludeFromSearch` option to `true` under the `openapi` key in the
`redocly.yaml` file excludes all APIs from the search results:

```yaml
openapi:
  excludeFromSearch: true
```
