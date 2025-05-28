---
seo:
  title: Open-source software used in the Redocly developer portal
markdown:
  toc:
    hide: true
excludeFromSearch: true
content:
  licenseName: developer-portal
  code: '@redocly/developer-portal@'
---

# List of open-source software packages

{% partial file="../_snippets/banner-legacy-developer-portal.md" /%}

The table below contains a full list of open-source software used in the Redocly developer portal.
This page is updated periodically and may lag the publishing of a new version of the developer portal.
We may update, add or remove new software as we add new features and patch bugs.

{% licensesPackageVersion content=$frontmatter.content /%}

## Full list

{% licensesTable license=$frontmatter.content.licenseName /%}
