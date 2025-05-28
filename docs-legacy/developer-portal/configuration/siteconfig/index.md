---
excludeFromSearch: true
---

# Developer portal configuration

The `siteConfig.yaml` file is the central place for configuring your developer portal. It contains a number of configuration options, either as standalone top-level items or divided into sections based on the functionality they control.

The order of sections and top-level options in the file is arbitrary - you can list them in any order you want. Pay attention to the indentation when modifying the file.

## Supported configuration options

- [analytics](analytics.md)
- [auth](auth.md)
- [copyCodeSnippet](copy-codesnippet.md)
- [disableImagesOptimization](image-optimization.md)
- [disableLastModified](last-modified.md)
- [disableLinkPrefetching](disableLinkPrefetching.md)
- [editPage](edit-page.md)
- [enableToc](toc.md) - deprecated in favor of `toc`
- [envVariablesAllowedClientSide](env-variables.md)
- [footer](footer.md)
- [licenseKey](license-key.md)
- [linkChecker](link-checker.md)
- [login](login.md)
- [logo](logo.md)
- [meta](meta.md) - deprecated in favor of `seo`
- [nav](nav.md)
- [oasDefinitions](oasdefinitions.md)
- [postBodyScripts](postbody-scripts.md)
- [scripts](scripts.md)
- [seo](seo.md)
- [showNextButton](next-button.md)
- [showPrevButton](prev-button.md)
- [stylesheets](stylesheets.md)
- [toc](table-of-contents.md)
- [tocMaxDepth](toc-depth.md) - deprecated in favor of `toc`

<!-- [Integrations](siteconfig-integrations.md) 2021/05/10 Intentionally undocumented -->
<!-- `redoclyOrgId` 2021/05/10 Intentionally undocumented -->
<!-- `siteVersion` 2021/05/10 Intentionally undocumented -->

## Example siteConfig.yaml file

```yaml
seo:
  title: Redocly Portal Example
  description: The best API documentation generator ever.
  siteUrl: https://portal-demo.redoc.ly
logo:
  image: ./images/logo.png
  altText: Portal logo
toc:
  enable: true
disableLastModified: true
showPrevButton: true
disableImagesOptimization: true
oasDefinitions:
  petstore: ./docs/openapi/petstore.yaml
stylesheets:
  - 'https://fonts.googleapis.com/css?family=Roboto:300,400,600,700'
scripts:
  - ./static/intercom.js
nav:
  - label: Training exercises
    page: developer-portal/index.md
    external: true
  - label: External docs
    icon: ./images/redocly-icon-white.png
    href: 'https://redocly.com/docs-legacy/developer-portal/introduction/'
  - search: true
footer:
  copyrightText: Copyright © Redocly Portal Example
  columns:
    - group: Legal
      items:
        - label: Terms of Use
          href: 'https://redocly.com/subscription-agreement/'
          external: true
        - label: Privacy Notice
          href: 'https://redocly.com/privacy-policy/'
    - group: Support
      items:
        - label: FAQ
          page: faq.md
        - label: Contact us
          page: contact.mdx
```
