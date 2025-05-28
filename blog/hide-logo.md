---
template: '../@theme/templates/BlogPost'
title: How to hide the x-logo
description: Answering real questions about how to use OpenAPI to design and describe APIs.
seo:
  title: How to hide the x-logo
  description: Answering real questions about how to use OpenAPI to design and describe APIs.
author: adam-altman
date: 2022-05-11
categories:
  - openapi
  - api-design
image: refdocs.png
---

# Hiding the logo in the API docs

## Question

> To remove the `x-logo` image from the `openapi.yaml`, do I need to hack the HTML or can I just remove the reference in the OpenAPI document?

## Context
Redocly supports a [specification extension `x-logo`](../docs-legacy/api-reference-docs/specification-extensions/x-logo.md) that is added to the `info` object.

```yaml YAML
openapi: '3.0.3'
info:
  version: '1.0.0'
  title: 'Redocly Example API'
  x-logo:
    url: 'https://redocly.github.io/redoc/example-logo.png'
    backgroundColor: '#FFFFFF'
    altText: 'Example logo'
paths: {}
```

When the `x-logo` is present, Redocly will render the logo in the top left corner of the OpenAPI docs.

## Answer

There are at least three ways to accomplish this task.

The two easiest ways are:
- Remove `x-logo` from the OpenAPI file.
- Use the `hideLogo` feature toggle.

### Remove `x-logo` from the OpenAPI description

Given this initial API, remove the `x-logo` object.

```yaml YAML
openapi: '3.0.3'
info:
  version: '1.0.0'
  title: 'Redocly Example API'
  x-logo:
    url: 'https://redocly.github.io/redoc/example-logo.png'
    backgroundColor: '#FFFFFF'
    altText: 'Example logo'
paths: {}
```

After removing the object and rebuilding your docs, the logo will not be visible in the corner.

```yaml YAML
openapi: '3.0.3'
info:
  version: '1.0.0'
  title: 'Redocly Example API'
paths: {}
```

### Use the `hideLogo` feature toggle

Sometimes you can't edit the OpenAPI file.
Don't worry.
Redocly has a feature toggle for that.

The feature toggle can be set in the Redocly configuration file.

This is an excerpt from the configuration file that demonstrates hiding the logo.

```yaml
openapi.features:
  hideLogo: true
```

Now that you've seen how it works, try it with your APIs.

Let me know how it goes.
