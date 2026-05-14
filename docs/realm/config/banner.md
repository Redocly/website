---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Display announcement banners at the top of your documentation pages.
banner:
  - content: This is how a banner displays on project pages.
    dismissible: false
keywords:
  includes:
    - banner
    - announcement
---
# `banner`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Display announcement banners at the top of your documentation pages.
Banners are sticky notification bars that appear at the top of pages to communicate important announcements, updates, or information to your users.

Banners support Markdown content, can be configured to appear on specific pages using glob patterns, and can be made dismissible so users can hide them.

## Options

Configure banners as an array of banner objects in your `redocly.yaml` file or in page front matter.

{% admonition type="info" %}
If you ejected the `navbar` component before version `0.128.0`, [update it](../customization/eject-components/eject-components-in-reunite.md#update-ejected-component) to have the component's full functionality.
{% /admonition %}

{% table %}

- Option
- Type
- Description

---

- content
- string
- **REQUIRED.**
  The banner content text.
  Supports Markdown syntax for formatting, links, tags and emphasis.
  Partials and variables are not supported.

  Example: `This is **a great announcement.** [Button](https://redocly.com)`

---

- dismissible
- boolean
- Configure whether users can dismiss the banner.
  When `true`, a close button appears on the banner.
  Dismissed banners are stored in browser's `localStorage` and won't appear again for that user.

  Default: `false`

---

- target
- string
- Glob pattern that determines which pages display the banner.
  Uses glob pattern matching to target specific pages or sections.
  If not specified, matches all pages.

  {% admonition type="info" %}
  When configuring banners in front matter, the `target` option is not needed.
  Front matter banners automatically target the page where they're configured.
  {% /admonition %}

  **Pattern examples:**
  - `blog/**` - matches all pages under the `blog/` path
  - `docs/api/**` - matches all pages under `docs/api/`
  - `**` - matches all pages (catch-all)
  - `getting-started.md` - matches a specific page

  **Matching rules:**
  - more specific patterns take priority over less specific ones
  - exact matches take priority over wildcard patterns
  - when multiple banners match a page, only the most specific one is displayed
  - patterns are case-insensitive and normalized for matching
  - front matter banners take priority over global config banners

---

- color
- string
- The visual style tone of the banner.
  Controls the color scheme of the banner.

  **Available colors:**

  - `info` - blue background
  - `success` - green background
  - `warning` - yellow background
  - `error` - red background

  Default: `info`

---

- rbac
- object
- Map of teams to permission levels that determines who can see the banner.
  Controls the visibility of the banner based on the user's team membership.
  If specified, only users belonging to teams with at least `read` access will see the banner.

  See [RBAC configuration](./access/rbac.md) for details.

---

- startAt
- string
- ISO 8601 timestamp (UTC) for when the banner starts displaying.
  The banner is hidden before this time.
  If omitted, the banner displays immediately until `endAt` (or indefinitely if `endAt` is also omitted).
  Banner visibility is evaluated client-side based on the user's clock and re-checked while the page is open.

  Example: `2026-03-15T00:00:00Z`

---

- endAt
- string
- ISO 8601 timestamp (UTC) for when the banner stops displaying.
  The banner is hidden once the current time reaches this value.
  If omitted, the banner displays indefinitely from `startAt` (or immediately if `startAt` isn't defined).
  Banner visibility is evaluated client-side based on the user's clock and re-checked while the page is open.

  Example: `2026-04-01T23:59:59Z`

{% /table %}

## Configuration

Add banners to your `redocly.yaml` file:

```yaml {% title="redocly.yaml" %}
banner:
  - content: This is **a great announcement.** [Button](https://redocly.com)
    dismissible: true
    target: blog/**
  - content: Important update for all users
    target: '**'
    color: warning
```

## Examples

Configure multiple banners for different sections:

```yaml {% title="redocly.yaml" %}
banner:
  - content: Check out our **new blog posts** this week!
    dismissible: true
    target: blog/**
  - content: API documentation has been updated
    target: api/**
  - content: Site maintenance scheduled for this weekend
    dismissible: true
    target: '**'
```

### Role-based visibility

Control banner visibility based on team membership.
In the following example, the banner is only visible to unauthenticated visitors (`anonymous` team).

```yaml {% title="redocly.yaml" %}
banner:
  - content: "🔒 Log in to see all content!"
    color: warning
    rbac:
      anonymous: read
      authenticated: none
```

### Time-based visibility

Schedule banners to appear and disappear automatically by setting `startAt` and `endAt`.
Use UTC timestamps; visibility is evaluated client-side by comparing those absolute UTC boundaries to the browser's current time, so clock accuracy affects when the banner appears—not local timezone reinterpretation of the configured values.
Both fields are optional: omit `endAt` to display the banner indefinitely from `startAt`, or omit `startAt` to display it immediately until `endAt`.

```yaml {% title="redocly.yaml" %}
banner:
  - content: "🎉 Spring Sale: 20% off through April 1st!"
    target: "**"
    startAt: "2026-03-15T00:00:00Z"
    endAt: "2026-04-01T23:59:59Z"
    dismissible: true
  - content: Scheduled maintenance March 20, 2-4 PM EST
    target: "**"
    startAt: "2026-03-20T19:00:00Z"
    endAt: "2026-03-20T21:00:00Z"
    color: warning
```

Configure a banner in the front matter of a specific page:

```md {% title="example.md" %}
---
banner:
  - content: Introducing the miracle of documentation
---

# Example page

This is an example page.

```

## Resources

- **[Navigation elements](../navigation/index.md)** - Overview of navigation components and patterns
- **[Navbar configuration](./navbar.md)** - Configure the top navigation bar
- **[Footer configuration](./footer.md)** - Configure the footer section
- **[Custom styles](../branding/customize-styles.md)** - Customize banner appearance with CSS
- **[Configuration options](./index.md)** - Explore other project configuration options
