---
template: '../@theme/templates/BlogPost'
title: How to hide the download button
description: Answering real questions about how to use OpenAPI to design and describe APIs.
seo:
  title: How to hide the download button
  description: Answering real questions about how to use OpenAPI to design and describe APIs.
author: adam-altman
date: 2022-08-10
categories:
  - openapi
  - api-design
image: refdocs.png
---

# Hiding the download button in the API docs

## Question

> We wanted to remove the below feature (Download OpenAPI) button. Can it be removed?
>
> ![download button](./images/download-button.png)

## Context

Redocly displays a download button with a link to the OpenAPI definition in YAML or JSON format.

The OpenAPI definition can be used for multiple purposes:
- API gateway (or proxy)
- Internal or consumer API docs
- Generation of SDKs or clients
- Validating the payloads programmatically

## Answer

It's important to be clear on the reasons you want to hide it. Redocly is rendering the OpenAPI definition, so **hiding the download button does not protect your information in any way**.
Depending on Redocly product, the user may still be able to download the OpenAPI definition without the convenience of a link. For example, with the HTML element someone can inspect the network traffic and grab the OpenAPI definition.

It may make it more inconvenient for your API consumers in case they wish to use the OpenAPI format for their own code generation or validation purposes. You have to determine if the result of hiding the download button is going to make your API consumers despise your choice. We've supported this [option to hide the download button for over 4 years](https://github.com/Redocly/redoc/issues/394#issuecomment-366202659), but we still don't understand the actual use case for doing that with one exception: people who decide to change the location, look, and feel of the link to their OpenAPI definition.

The option to hide the download button is `hideDownloadButton` which has a default value of `false`.

### Redocly configuration file
If you use a [Redocly configuration file](../docs/cli/configuration) (`redocly.yaml`), you can add a feature toggle to hide the download button.

```yaml
# ...

theme:
  openapi:
    hideDownloadButton: true
```

### Redocly portal legacy `page.yaml` format

If you are using the Redocly portal legacy `page.yaml` format, you can add this to the settings configuration.

```yaml
# ...

settings:
  hideDownloadButton: true
```

### Redocly HTML element
If you are using the Redocly [HTML element](../docs-legacy/api-reference-docs/guides/on-premise-html-element.md), you can include the `hideDownloadButton: false` in the options parameter.

```js
      RedoclyReferenceDocs.init(
        '<url to the API definition>',
        { licenseKey: '<license-key.here>',
          hideDownloadButton: true,
        },
        document.querySelector('#redocly_container'),
      );
```

### Redoc HTML element
If you are using the [Redoc HTML element](../docs/redoc/@v2.x/deployment/html.md), you can include the `hideDownloadButton: false` in the options parameter.

```html
<script>
Redoc.init('dist.yaml', {
  hideDownloadButton: true
}, document.getElementById('redoc-container'))
</script>
```

## You try it

Try it with your APIs if you still want to hide that download button.

Let me know how it goes.
