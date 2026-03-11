---
template: ../@theme/templates/BlogPost
title: "OpenAPI 3.2 is here: what's new and how Redocly supports it"
description: A practical overview of OpenAPI 3.2 features (streaming APIs, hierarchical tags, the QUERY method) and how to start using them with Redocly today.
seo:
  title: "OpenAPI 3.2 is here: what's new and how Redocly supports it"
  description: A practical overview of OpenAPI 3.2 features (streaming APIs, hierarchical tags, the QUERY method) and how to start using them with Redocly today.
author: adam-altman
publishedDate: "2026-03-11"
categories:
  - api-specifications:openapi
  - redocly:redocly-cli
  - redocly:product-updates
image: Redocly_blog_6.jpg
---

OpenAPI 3.2 was released in September 2025 as a follow-up to [3.1](https://spec.openapis.org/oas/v3.1.0.html). This release adds support for streaming APIs, hierarchical tags, new HTTP methods, and updated security flows.

It's also a fully backward-compatible release. Nothing breaks. You can update the version number and start using new features at your own pace. Here's a look at what's new and how Redocly supports it.

## Hierarchical tags

Tags in OpenAPI can now be organized into hierarchies. This is especially useful for larger APIs where grouping operations into categories makes navigation easier. Redocly users may recognize the `x-tagGroups` extension that we introduced for this purpose. OpenAPI 3.2 brings a native version of this idea directly into the spec.

The [Tag Object](https://spec.openapis.org/oas/v3.2.0.html#tag-object) now has three new fields:

- **`parent`** — reference another tag to create a hierarchy.
- **`summary`** — a short display label. Works the same way as the `x-displayName` extension in Redocly.
- **`kind`** — classify tags by purpose, backed by a [community registry](https://spec.openapis.org/registry/tag-kind/index.html).

```yaml
tags:
  - name: information
    summary: About the museum
    description: Information about the museum
    kind: nav

  - name: museum-hours
    summary: Museum hours
    description: Opening hours and schedule
    parent: information
    kind: nav
```

## Streaming support

OpenAPI 3.2 adds built-in support for streaming media types:

- `text/event-stream`
- `application/jsonl`
- `application/json-seq`
- `multipart/mixed`

Along with these media types, there's a new `itemSchema` field that describes the shape of each individual item in the stream.

```yaml
paths:
  /events:
    get:
      responses:
        '200':
          content:
            text/event-stream:
              itemSchema:
                type: object
                properties:
                  event:
                    type: string
                  data:
                    type: string
                  timestamp:
                    type: string
                    format: date-time
```

## QUERY method and additional HTTP methods

OpenAPI 3.2 adds support for the QUERY method. QUERY is idempotent, safe, and accepts a request body, making it a good fit for complex search operations where you need to send structured criteria.

```yaml
paths:
  /search:
    query:
      operationId: searchProducts
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SearchCriteria'
      responses:
        '200':
          description: Search results
```

There's also a new `additionalOperations` field for APIs that use HTTP methods beyond the standard set.

## Updated security features

OpenAPI 3.2 adds support for [OAuth 2.0 Device Authorization Flow](https://datatracker.ietf.org/doc/html/rfc8628) through the new `deviceAuthorization` field in the OAuth Flows Object.

The release also introduces `oauth2MetadataUrl` for pointing to [OAuth 2.0 server metadata](https://datatracker.ietf.org/doc/html/rfc8414), and the ability to mark security schemes as `deprecated`.

## New example fields: dataValue and serializedValue

OpenAPI 3.2 introduces two new fields for examples: `dataValue` and `serializedValue`. These let you show both the structured data and the serialized representation of an example, which is especially helpful for cookies, headers, and other parameters with encoding rules.

```yaml
examples:
  UserPrefs:
    description: Cookie with encoded values
    dataValue:
      theme: "dark,mode"
      notifications: true
    serializedValue: "theme=dark%2Cmode; notifications=true"
```

`dataValue` is the structured data that developers work with in code. `serializedValue` is how it looks when transmitted over HTTP. Having both in the same place makes API documentation easier to understand.

## Other changes worth knowing about

A few more additions round out the release:

- **`queryString`** — a new parameter location that lets you describe the entire query string as a single schema, rather than individual parameters.
- **XML `nodeType`** — explicit mapping of schemas to XML elements, attributes, text, or CDATA nodes.
- **`defaultMapping` on discriminators** — define a fallback schema when the discriminator property is missing or doesn't match any mapping.

## Get started with OpenAPI 3.2 in Redocly

Redocly fully supports OpenAPI 3.2 — linting, rendering, code samples, and all the features described in this post. To upgrade, change `openapi: 3.1.0` to `openapi: 3.2.0` in your description and start adopting new features as you need them. Since 3.2 is backward-compatible, nothing breaks.

Useful links:

- [OpenAPI 3.2 specification](https://spec.openapis.org/oas/v3.2.0.html)
- [Migration guide from 3.1 to 3.2](https://learn.openapis.org/upgrading/v3.1-to-v3.2.html)
- [Redocly changelog](https://redocly.com/docs/realm/changelog)
