# Tune search and SEO

Readers find your documentation in two ways: they search inside your site, or a search engine sends them to a page.
Realm supports both paths.
It builds a search index from your content at build time, and it generates the metadata, sitemaps, and page structure that search engines read.

## Search inside your site

Realm indexes your Markdown, API descriptions, and code samples during each build.
You choose the search engine and tune what the index includes.

- **[Search](../navigation/search.md)** - How Realm processes your content and serves search results
- **[Search configuration](../config/search.md)** - Choose a search engine, add facets, and exclude content from the index
- **[Search API](../customization/search-api/openapi.yaml)** - Query the search index from your own applications

## Search engines and SEO

Realm generates sitemaps, canonical URLs, and structured metadata for every page.
You control titles, descriptions, and indexing behavior per page or across the site.

- **[SEO in Realm](../content/realm-seo.md)** - How Realm builds pages that search engines can read and rank
- **[SEO configuration](../config/seo.md)** - Set metadata, sitemaps, and indexing rules for the site
- **[x-seo extension](../content/api-docs/openapi-extensions/x-seo.md)** - Set SEO metadata on API documentation pages

## Resources

- **[Make docs AI ready](../ai-ready/index.md)** - Serve your documentation to AI assistants and agents
- **[Build navigation](../navigation/index.md)** - Help readers find content after they arrive
