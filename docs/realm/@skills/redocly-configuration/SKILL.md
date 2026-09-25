---
name: redocly-configuration
description: >-
  Use when changing site-wide settings in redocly.yaml of a Redocly documentation project (Realm,
  Revel, Reef, or Redoc): SEO, sitemap, llms.txt, banners, search, AI assistant, feedback form,
  code block buttons, the table of contents, "Last updated", and the edit button (markdown),
  redirects, ignored files, metadata, analytics, login and access control (RBAC, SSO), environment
  variables, scripts, plugins, response headers, the Docs MCP server, or published agent skills.
  Also use for the full list of front matter fields, to override a site setting for one page in its
  front matter, or to hide a page from search or search engines.
  Not for the logo, colors, fonts, or CSS (use redocly-styling), sidebars, navbar, or footer
  (use redocly-navigation), or API reference options (use redocly-api-reference).
---

# Redocly configuration reference

Reference for `redocly.yaml` site settings, access, environment variables, and front matter in Redocly documentation projects.

If a detail is not in this file, fetch the `Full reference` link of the section. Do not guess option names.

## redocly.yaml

`redocly.yaml` in the project root configures the site and API linting in one file.
Use it for settings that apply to the full site.
To change settings of one page only, use its front matter (see [Front matter](#front-matter)).

```yaml {% title="redocly.yaml" %}
seo:
  projectTitle: Example Docs
  siteUrl: https://docs.example.com
redirects:
  '/old-guide/':
    to: '/guides/'
```

- Validate the file with `npx @redocly/cli check-config`. It names unknown keys.
- Paths in `redocly.yaml` resolve from the project root.
- Indentation is significant. Most options nest two or three levels.

Full reference: https://redocly.com/docs/realm/config.md

## SEO and search

### seo

Set the default SEO data, the site name in browser titles, the sitemap, and `llms.txt`.

| Option | Description |
|--------|-------------|
| `title` | Default page title. The front matter `seo.title` and the first H1 of a page win over it. |
| `projectTitle` | Site name. Every browser title becomes `<page title> \| <projectTitle>`. |
| `description` | Meta description. Up to 150 characters. |
| `image` | Social share image. The file must exist in the project. |
| `keywords`, `lang`, `jsonLd` | Meta keywords, language tag (such as `en-US`), and JSON-LD data. |
| `meta` | Extra meta tags: a list of `name` and `content`. |
| `siteUrl` | Site origin. Necessary for `sitemap.xml` and canonical links. Not in the front matter. |
| `llmstxt` | `llms.txt` settings: `hide`, `title`, `description`, `excludeFiles`, `sections`. Not in the front matter. |

The sitemap leaves out RBAC-protected pages, `ignore` paths, and pages with `excludeFromSearch: true`.
To use your own sitemap, put `sitemap.xml` in `static/`.

Full reference: https://redocly.com/docs/realm/config/seo.md

### search

Change the search engine, shortcuts, suggested pages, and filters.

```yaml {% title="redocly.yaml" %}
search:
  engine: typesense
  suggestedPages:
    - page: guides/quickstart.md
  filters:
    facets:
      - name: Owner
        field: owner
        type: select
```

| Option | Default | Description |
|--------|---------|-------------|
| `engine` | `flexsearch` | `flexsearch` or `typesense`. |
| `hide` | `false` | Hide the search bar and turn off its shortcuts. |
| `shortcuts` | `ctrl+k` | Keys that open search. |
| `suggestedPages` | - | Pages to suggest: `page` (required), `label`. |
| `filters` | - | `hide`, and `facets`: `name`, `field`, `type` (`multi-select`, `select`, `tags`), all required. |

- Search facets and curation (`keywords` in the front matter, `x-keywords` in OpenAPI) need Typesense.
  FlexSearch supports only the group facet.
- Set facet values with `metadata` in the front matter, `x-metadata` in OpenAPI, or `metadataGlobs` in `redocly.yaml`.
- Typesense and AI search indexes build only on the production branch.

Full reference: https://redocly.com/docs/realm/config/search.md

### aiAssistant

Change or hide the AI assistant.
Options: `hide`, `prompt` (hidden instructions for each answer), `suggestions` (suggested questions), and `trigger` (`hide`, `inputType`: `button` or `icon`, `inputIcon`).
Control who can use it with `access.rbac.features.aiSearch`.

Full reference: https://redocly.com/docs/realm/config/ai-assistant.md

### metadata and metadataGlobs

Add key-value data to pages, for search facets and catalogs.

```yaml {% title="redocly.yaml" %}
metadata:
  owner: Docs Team
metadataGlobs:
  'blog/**':
    redocly_category: Blog
```

`redocly_category` sets the search group.
For one page, OpenAPI `x-metadata` wins over front matter `metadata`, which wins over `redocly.yaml`. A more specific glob wins over a broader one.

Full reference: https://redocly.com/docs/realm/config/metadata.md

## Page elements

### banner

Show an announcement at the top of some or all pages.

```yaml {% title="redocly.yaml" %}
banner:
  - content: Scheduled maintenance on March 20. [Details](/status/)
    color: warning
    dismissible: true
    target: '**'
    startAt: '2026-03-20T19:00:00Z'
    endAt: '2026-03-20T21:00:00Z'
```

| Option | Default | Description |
|--------|---------|-------------|
| `content` | - | **Required.** Markdown text. Partials and variables are not supported. |
| `color` | `info` | `info`, `success`, `warning`, or `error`. |
| `dismissible` | `false` | Show a close button. |
| `target` | all pages | Glob of the pages that show the banner. Not needed in the front matter. |
| `rbac` | - | Teams that see the banner. |
| `startAt`, `endAt` | - | Start and end time, ISO 8601 UTC. |

When several banners match a page, only the most specific one shows. Exact matches win over wildcards, and front matter banners win over global banners.

Full reference: https://redocly.com/docs/realm/config/banner.md

### codeSnippet, feedback, and markdown

| Option | Use it to | Sub-options |
|--------|-----------|-------------|
| `codeSnippet` | Change the buttons on code blocks. | `elementFormat` (`icon`, `text`), `copy.hide`, `report.hide` (default `true`: set `false` to show the report button), `expand.hide`, `collapse.hide`. |
| `feedback` | Change or hide the feedback form at the bottom of pages. | `hide`, `type` (`sentiment` (default), `mood`, `rating`, `scale`, `comment`), `settings` (`label`, `submitText`, `comment`, `reasons`, `optionalEmail`). |
| `markdown` | Change the partials folders, "Last updated", the table of contents, and the edit button. | `partialsFolders`, `lastUpdatedBlock` (`format`, `locale`, `hide`), `toc` (`header`, `depth` (default `3`), `hide`), `editPage` (`baseUrl`, `hide` (default `true`)), `template`, `frontMatterKeysToResolve`. |

- `markdown.partialsFolders` replaces the default (`**/_partials/**`). Include `_partials` if you still need it.
- When you use `translations.yaml`, do not set feedback text in `redocly.yaml`. It overrides the translations.

Full reference: https://redocly.com/docs/realm/config/markdown.md

## Site structure

### redirects

Send old URLs to new pages after you move or delete a page.

```yaml {% title="redocly.yaml" %}
redirects:
  '/old-url/':
    to: '/new-url/'
  '/guides/*':
    to: '/tutorials/*'
  '/roadmap':
    to: 'https://example.com/roadmap'
    type: 302
```

- A source is an absolute path that starts with `/`. Use `*` only as the last segment.
- `to` is an absolute path or a URL. `type` is the HTTP status code (default `301`).
- Leave out `index`: `guides/index.md` is `/guides/`.
- A specific redirect wins over a matching wildcard.
- To keep redirects in a separate file, use `redirects: {$ref: './redirects.yaml'}`.

Full reference: https://redocly.com/docs/realm/config/redirects.md

### ignore

Keep files and folders out of the build without deleting them.

```yaml {% title="redocly.yaml" %}
ignore:
  - 'drafts/**'
  - '!drafts/keep.md'
```

- Use globs. `!` adds an exception.
- Restart the preview after a change.
- Remove ignored pages from sidebars and links, or the build reports broken links.
- `README.md` in the project root is ignored automatically.

Full reference: https://redocly.com/docs/realm/config/ignore.md

## Access

Use the `access` object to control who can see the site and its content:
require a login for the full site, select the identity providers that users log in with, and give teams access to pages and features (role-based access control, RBAC).
Root-level `requiresLogin`, `rbac`, and `sso` are deprecated. Put them under `access`.

```yaml {% title="redocly.yaml" %}
access:
  sso:
    - CORPORATE
  rbac:
    content:
      '**':
        anonymous: read
      'internal/**':
        Employees: read
    features:
      mcp:
        Developers: read
```

| Option | Description |
|--------|-------------|
| `requiresLogin` | All content needs a login. Do not use it with `rbac`. |
| `logoutReturnUrl` | Page to open after logout. |
| `rbac` | `content` (page glob to team to role), `features` (`aiSearch`, `mcp`), and team settings. |
| `sso` | Identity provider types: `REDOCLY`, `CORPORATE`, `GUEST`. Mutually exclusive with `idps`. |
| `idps` | Identity provider IDs from Reunite. Mutually exclusive with `sso`. |
| `residency` | Hosting region URL. |

- Built-in teams: `anonymous` (not logged in), `authenticated` (logged in), and `*` (all teams not listed).
- Roles: `none`, `read`, `write`, `triage`, `maintain`, `admin`.
- `sso` alone does not require a login. Add `rbac` or `requiresLogin`.
- Protect files in `static/` with globs that start with `static/`.
- In the front matter, `rbac` is a flat map for the page: `rbac: {Admin: admin, Developers: none}`.
- `userMenu` (`hide`, `hideLoginButton`, `items`) changes the menu of logged-in users.

Full reference: https://redocly.com/docs/realm/config/access.md

## Environment variables

Use environment variables for values that change between environments, such as URLs, tracking IDs, and labels for each branch.

```yaml {% title="redocly.yaml" %}
navbar:
  items:
    - page: index.md
      label: '{{ process.env.HOME_LABEL || "Home" }}'
```

- Use `{{ process.env.VAR_NAME }}` in `redocly.yaml`. Only string values are supported. The default after `||` applies only when the variable is not set.
- Define variables in `.env`, in the shell, or in Reunite under **Settings** > **Environment variables**.
- Pages can read only variables whose name starts with `PUBLIC_`, as `$env.PUBLIC_NAME`. All users can see them, so do not put secrets in them.
- `.env.production`, `.env.preview`, `.env.development`, and `.env.branch.<branch-name>` override `.env`. Replace `/` in a branch name with `-`.

To override options for one environment or branch, use `env`:

```yaml {% title="redocly.yaml" %}
env:
  preview:
    breadcrumbs:
      hide: true
  branch.feature-new-look:
    navbar:
      hide: true
```

Full reference: https://redocly.com/docs/realm/config/env.md

## Integrations

| Option | Use it to | Reference |
|--------|-----------|-----------|
| `analytics` | Track page views. Providers: `adobe`, `amplitude`, `fullstory`, `google`, `gtm`, `heap`, `rudderstack`, `segment`. Each has its own fields. | https://redocly.com/docs/realm/config/analytics.md |
| `scripts` | Add scripts to all pages: `head` and `body` lists, each item with `src` (required) and flags such as `async`, `defer`, `module`. | https://redocly.com/docs/realm/config/scripts.md |
| `plugins` | Add plugin files. List a plugin here before you use it. | https://redocly.com/docs/realm/config/plugins.md |
| `responseHeaders` | Add HTTP headers to paths that match a glob: a list of `name` and `value`. | https://redocly.com/docs/realm/config/response-headers.md |
| `mcp` | Change or hide the Docs MCP server that the Redocly project makes from the site: `hide`, `docs` (`hide`, `name`, `ignore`, `publicEndpoint`). | https://redocly.com/docs/realm/config/mcp.md |
| `skills` | Stop publishing the agent skills in `@skills/` (`hide`), or exclude some of them (`excludeFiles`). | https://redocly.com/docs/realm/config/skills.md |
| `removeAttribution` | Hide the Redocly attribution. | https://redocly.com/docs/realm/config/remove-attribution.md |

## Front matter

Front matter is YAML between `---` lines at the top of a Markdown page.
It sets options for that page only. React pages use `export const frontmatter = { ... }`.
The page title comes from `seo.title`, or else from the first H1. A `title:` key does not set it.

```yaml
---
seo:
  title: Rate limits
  description: The request limits of the API.
slug: [/rate-limits, /limits]
feedback:
  hide: true
markdown:
  toc:
    depth: 2
---
```

### Front matter only

| Field | Type | Description |
|-------|------|-------------|
| `excludeFromSearch` | boolean | Remove the page from site search, AI search, `llms.txt`, and the sitemap. Does not stop external search engines. |
| `slug` | string or [string] | Custom URL. A list serves the page at more than one URL. |
| `sidebar.path` | string | The sidebar file for this page. No other sub-option: no `label`, no `hide`. |
| `navigation.nextButton.page`, `.label` | string | Target and text of the next button. Also `previousButton`. |
| `template` | string | Path to a custom page template, without the extension. |
| `keywords` | object | Curate search results with `includes` and `excludes`. Needs the Typesense search engine. |
| `seo.priority` | number | Sitemap priority of the page. |

### Front matter overrides

Most `redocly.yaml` options also work in the front matter of a page, and the front matter value wins for that page.

| Field | Description |
|-------|-------------|
| `seo` | `title`, `description`, `image`, `keywords`, `lang`, `jsonLd`, `meta`. Not `siteUrl` or `llmstxt`. |
| `banner` | Page banners, with no `target`. |
| `breadcrumbs`, `codeSnippet` | Same options as in `redocly.yaml`. |
| `feedback` | Same options. Options that you do not set come from `redocly.yaml`. |
| `colorMode`, `footer`, `navbar` | `hide` only. |
| `markdown` | `lastUpdatedBlock`, `toc`, `editPage`. |
| `metadata` | Page metadata for search facets and catalogs. |
| `navigation` | Next and previous buttons: `hide`, `text`. |
| `rbac` | Team-to-role map for the page: `rbac: {Admin: admin, Developers: none}`. |
| `redirects` | Source paths that redirect to this page, with no `to`: `redirects: {'/old-page/': {type: 301}}`. |
| `search` | React pages only: `title`, `description`, `keywords` of the search entry. No effect on a Markdown page. |
| `versionPicker` | `hide`, `showForUnversioned`. |

Full reference: https://redocly.com/docs/realm/config/front-matter-config.md

## Hide or exclude a page

Several options hide a page, and each one hides it from a different place.
Select the option that matches the goal, and use only that option:

| Goal | Use |
|------|-----|
| Remove from site search, AI search, `llms.txt`, and the sitemap | Front matter `excludeFromSearch: true` |
| Stop external search engines | `seo.meta: [{name: robots, content: noindex}]`, or an `X-Robots-Tag: noindex` header in `responseHeaders` |
| Remove from the build | `ignore` |
| Hide from the sidebar only | Leave the page out of every `sidebars.yaml` |
| Restrict to some users | `access.rbac` or `access.requiresLogin` |
| Leave out of `llms.txt` only | `seo.llmstxt.excludeFiles` |
| Leave out of the Docs MCP server only | `mcp.docs.ignore` |

`excludeFromSearch` does not stop Google. `noindex` does not remove the page from site search, and does not restrict access.

## Common mistakes

| Mistake | Correct approach |
|---------|------------------|
| `seo.title` to name the site | `seo.projectTitle` |
| `seo.siteUrl` or `seo.llmstxt` in the front matter | Only in `redocly.yaml` |
| `seo.noindex: true` | `seo.meta: [{name: robots, content: noindex}]` |
| `excludeFromSearch` to stop Google | A `robots` `noindex` meta tag |
| A redirect source without a leading `/`, or with `*` in the middle | An absolute source, with `*` only as the last segment |
| `to:` in a front matter redirect | The target is the page. List only the sources |
| `ignore` expected to apply at once in the preview | Restart the preview |
| `partialsFolders: [snippets]`, and partials in `_partials` stop working | List `_partials` too |
| `requiresLogin: true` with `rbac` | Use one of them. For mixed access, use `rbac` with `anonymous` and `authenticated` |
| Root-level `rbac`, `sso`, or `requiresLogin` | Put them under `access` |
| `sso` alone to require a login | Add `rbac` or `requiresLogin` |
| The report button expected on code blocks by default | Set `codeSnippet.report.hide: false` |
| Search facets or curation with FlexSearch | Set `search.engine: typesense` |
| Secrets in `PUBLIC_` variables | All users can read them |
