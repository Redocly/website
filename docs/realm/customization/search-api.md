# Search API

Use the Search API to query your project's documentation and API reference content from external tools, scripts, or integrations (for example, MCP servers or custom search UIs).

## Endpoints

{% table %}

- Method
- Path
- Description

---

- `POST`
- `/_search`
- Run a full-text search and return grouped results.

---

- `POST`
- `/_search-facets`
- Get facet counts (and optionally facet values) for filters.

{% /table %}

If your project is deployed with a path prefix, prepend the prefix to the endpoint paths from the table.

**Example of endpoint paths with path prefix:**

Your project has a `docs` path prefix (`https://docs.example.com/docs/`), the Search API paths are: `/docs/_search` and `/docs/_search-facets`.

## Authentication

Search API uses the same authentication as the project:

- **Public projects**
  If the project does not require login (`access.requiresLogin` is not set or is `false`), you can call the Search API without authentication.
  Results include all indexed content.

- **Protected projects**
  If the project requires login (`access.requiresLogin: true`) or uses [RBAC](../access/rbac.md), you must send the same cookie-based session that the browser uses after a user logs in.
  The API does not support API keys or bearer tokens.
  Authentication is session (cookie) only.

When the project is protected and the request is not authenticated, both endpoints return empty results (no documents and no facet counts) instead of an error.
This mechanism ensures that the search behavior stays consistent with the rest of the project.

## Search endpoint: `POST /_search`

Run a full-text search and get results grouped by category (for example, Documentation, API Reference).

### Request

- Headers: `Content-Type: application/json`
- Body: JSON object with only these properties:

{% table %}

- Property
- Type
- Required
- Description

---

- `query`
- string
- yes
- Full-text search query.

---

- `locale`
- string
- yes
- Locale code for the content to search (for example, `en`, `default_locale`).
  Must match a [configured locale](../config/l10n.md).

---

- `filter`
- array
- no
- List of facet filters.
  Each item: `{ "field": "<facetField>", "values": ["value1", "value2"] }`.
  Omit or use `[]` for no filters.

---

- `loadMore`
- object
- no
- For pagination within a result group: `{ "groupKey": "<categoryKey>", "offset": <number> }`.

{% /table %}

**Example request body:**

```json
{
  "query": "getting started",
  "filter": [],
  "locale": "default_locale"
}
```

### Response (200)

JSON object with two top-level properties:

{% table %}

- Property
- Type
- Description

---

- `facets`
- object
- Facet field names to arrays of `{ "value": string, "count": number }`.
  Keys may include `redocly_category`, `redocly_product`, `redocly_version`, `redocly_teams`, `httpMethod`, `httpPath`, `apiTitle`, `apiVersion`, and any custom facet fields.

---

- `documents`
- object
- Category names (e.g. `"Documentation"`, `"API Reference"`) to arrays of search items.

{% /table %}

**Search item** (each element in a `documents` category array):

{% table %}

- Property
- Type
- Description

---

- `document`
- object
- The indexed document: `id`, `url`, `title`, `text`, `path` (array), `redocly_category`, `redocly_product`, `redocly_teams`, `redocly_version` (for example, `{ "isDefault": true }`), and optional API fields (`httpMethod`, `httpPath`, etc.).

---

- `highlight`
- object
- Highlighted snippets: `text`, `title`, `url`, `id`, `redocly_category`, `redocly_product`, and optionally `parameters` (array for API reference).
  Matched terms are wrapped in `<mark>` tags.

{% /table %}

**Example response:**

```json
{
  "facets": {
    "redocly_category": [
      { "value": "Documentation", "count": 2 },
      { "value": "API Reference", "count": 0 }
    ],
    "redocly_product": [],
    "redocly_version": [],
    "redocly_teams": [],
    "httpMethod": [],
    "httpPath": [],
    "apiTitle": [],
    "apiVersion": []
  },
  "documents": {
    "Documentation": [
      {
        "document": {
          "id": "doc-1",
          "url": "/guides/getting-started",
          "title": "Getting started",
          "text": "This guide walks you through the initial setup.",
          "path": [],
          "redocly_category": "Documentation",
          "redocly_product": "",
          "redocly_teams": [],
          "redocly_version": { "isDefault": true }
        },
        "highlight": {
          "id": "doc-1",
          "title": "Getting started",
          "url": "/guides/getting-started",
          "text": "This guide walks you through the <mark>getting</mark> <mark>started</mark> setup.",
          "redocly_category": "Documentation",
          "redocly_product": "",
          "parameters": []
        }
      }
    ]
  }
}
```

## Search facets endpoint: `POST /_search-facets`

Get facet definitions and counts (for building filter UIs or refining search).

### Request

- Headers: `Content-Type: application/json`
- Body: JSON with the following fields:

{% table %}

- Field
- Type
- Required
- Description

---

- `locale`
- string
- yes
- Locale code (same as search).

---

- `field`
- string
- no
- If set, returns only the facet for this field (with values and counts).
  If omitted, returns all configured facets.

---

- `query`
- string
- no
- Search query.
  Facet counts are computed in the context of this query.

---

- `filter`
- array
- no
- Same as in the search endpoint.
  Counts are computed with these filters applied.

---

- `facetQuery`
- string
- no
- Filter facet values by this string (for type-ahead in facet controls).

{% /table %}

**Example: all facets**

```json
{
  "locale": "en"
}
```

**Example: single facet with query and filter**

```json
{
  "locale": "en",
  "field": "redocly_category",
  "query": "api",
  "filter": [
    { "field": "redocly_version", "values": ["v1"] }
  ]
}
```

### Response

- If `field` is set: array with a single facet object, for example: `{ "name": "...", "field": "...", "type": "...", "values": [ { "value": "...", "count": 1 }, ... ] }`.
- If `field` is omitted: array of all facet objects with their `values` (value + count).

Facet `type` can be `multi-select`, `select`, `tags`, etc., as configured in [search filters](../config/search.md#filters-item-object).

## CORS and credentials

When calling the Search API from a browser (for example, a custom search UI on another origin), the project must allow your origin in CORS.
Send credentials (cookies) by using `fetch(..., { credentials: 'include' })` (or the equivalent in your HTTP client) so that session cookies are sent for protected projects.

## Resources

- **[Search configuration](../config/search.md)** – Configure the search bar, engine, facets, and curation in the project.
- **[RBAC](../access/rbac.md)** – When RBAC is enabled, search results are filtered by the authenticated user's teams and permissions.
