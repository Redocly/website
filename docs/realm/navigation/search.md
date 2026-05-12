---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Search in Realm

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Explore how Realm's search engines index and rank your documentation to provide relevant results.

Realm offers two built-in search engines for your project:

- FlexSearch available for all plans
- Typesense included in the Enterprise and Enterprise+ plans

Both FlexSearch and Typesense have been configured to optimize the results for API and text-based documentation.

{% table %}

- Category
- FlexSearch
- Typesense

---

- Relevance tuning
- {% icon name="x" /%}
- [curation](../config/search.md#curate-search-results)

---

- [Facets functionality](../config/search.md#default-facets)
- {% icon name="check" /%}
- {% icon name="check" /%}

---

- Facets filtering
- {% icon name="x" /%}
- {% icon name="check" /%}

---

- Loading additional results per group
- {% icon name="x" /%}
- {% icon name="check" /%}

---
- Group filters
- label only
- labels with counts

{% /table %}

## Supported document types

Search in Realm supports multiple document formats including API description files in YAML and JSON formats, and pages written in Markdown and React.
Each document type is processed according to its specific structure and content characteristics.

## Document processing and indexing

Instead of storing individual files as single documents, Realm divides each file into smaller units called "search documents".
This method optimizes performance, enabling more granular and efficient searching.
Markdown pages are segmented at the level of headings and Markdoc tags, where each segment becomes an independent search document.
For example, if a page contains three headings and a Markdoc table, it is segmented into four search documents.
If a page has only one heading and many paragraphs and lists, it genrates a single search document.

## Search results and pagination

Typesense groups results by category and displays up to 10 most relevant results per group.
When users require additional results beyond the initially displayed pages, they can click **Show more** to display additional results in that group.

With FlexSearch, users see all results at once, categorized into groups.

## Results ranking and priority

Typesense's search algorithm implements a weighted scoring approach where document titles receive higher priority in relevance calculations compared to other content elements.
This ensures that title matches are ranked more prominently in search results, improving the accuracy of document discovery based on primary subject matter rather than incidental content matches.

## Resources

- **[search](../config/search.md)** - Configure search in your project
- **[Navigation](./index.md)** - Explore navigation elements in Realm