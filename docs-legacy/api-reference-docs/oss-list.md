---
seo:
  title: Open-source software used in the Redocly API reference docs
markdown:
  toc:
    hide: true
excludeFromSearch: true
content:
  licenseName: api-reference-docs
  code: '@redocly/reference-docs@'
---

# List of open-source software packages

The table below contains a full list of open-source software used in the Redocly API reference docs.
This page is updated periodically and may lag the publishing of a new version of the API reference docs.
We may update, add or remove new software as we add new features and patch bugs.

{% licensesPackageVersion content=$frontmatter.content /%}

## Full list

{% licensesTable license=$frontmatter.content.licenseName /%}
