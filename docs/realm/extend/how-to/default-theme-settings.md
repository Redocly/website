---
title: Default theme config
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---

# Default theme config

Redocly themes are highly configurable. The values of the default theme are listed below in case you want to reference them during your own theme development.

```yaml
scripts:
  head: []
  body: []
links: []

logo:
  image: null
  altText: null
  link: null
  favicon: null
  hide: false
navbar:
  hide: false
  items: []
footer:
  hide: false
  items: null
sidebar:
  hide: false
search:
  placement: 'navbar'
  hide: false
colorMode:
  ignoreDetection: false
  modes: ['light', 'dark']
  hide: false
navigation:
  nextButton:
    hide: false
    text: 'Next page'
  previousButton:
    hide: false
    text: 'Previous page'
markdown:
  frontMatterKeysToResolve: ['links', 'image']
  partialsFolders: ['_partials']
  lastUpdatedBlock:
    format: timeago
    locale: en-US
    hide: false
  toc:
    header: On this page
    depth: 3
    hide: false
  editPage:
    baseUrl: null
    hide: false
codeSnippet:
  elementFormat: icon
  copy:
    hide: false
  report:
    hide: false
  expand:
    hide: false
  collapse:
    hide: false
openapi: {}
graphql: {}
```

<!-- TODO: detect is default true which is inconsistent with our standard -->
