---
template: ../@theme/templates/BlogPost
title: "What's coming in Redoc CE 3.x"
description: "One engine for OpenAPI 3.2, AsyncAPI, GraphQL, and MCP - plus CSS theming, dark mode, and real routes. A preview before Redoc CE 3.x ships."
seo:
  title: "What's coming in Redoc CE 3.x"
  description: "One engine for OpenAPI 3.2, AsyncAPI, GraphQL, and MCP - plus CSS theming, dark mode, and real routes. A preview before Redoc CE 3.x ships."
  image: ./images/redoc-3-announcement-card.png
author: alex-varchuk
publishedDate: "2026-08-27"
categories:
  - redocly:redoc
  - api-specifications:openapi
  - redocly:product-updates
image: redoc-3-announcement-card.png
---

# What's coming in Redoc CE 3.x

For more than a decade, [Redoc CE](https://redocly.com/redoc-ce) has turned OpenAPI
descriptions into something people can actually read. Point it at a YAML or JSON file, get documentation. That's the whole contract, and it held up well enough that the project
quietly became infrastructure: around **1.5 million downloads a week**
on [npm](https://www.npmjs.com/package/redoc) and **25k+ stars**
on [GitHub](https://github.com/Redocly/redoc). It runs as a React component, as static
HTML built in CI, from a container, and in a great many plain `index.html` files with a
`<redoc>` tag in them.

Redoc CE 3.x is the first substantial change to that contract since 2.0 - and it isn't released yet. This post is the preview: what's coming, why we restarted the release to
get there, and what to plan for before it lands. The next release candidate is `rc.1`, stable 3.0 follows it, and a separate post will announce the release itself.

Nothing here is locked in. That's the point of publishing now.

The short version:

{% table %}

-
- Redoc 2.x
- Redoc 3.x
---
- Specifications
- OpenAPI 2.0, 3.0, 3.1
- Adds OpenAPI 3.2, AsyncAPI, GraphQL, and MCP (via `x-mcp`)
---
- Theming
- Nested JavaScript `theme` object
- CSS custom properties
---
- Options
- 40+
- ~20
---
- Dark mode
- None
- Built in
---
- Large descriptions
- Whole document rendered up front
- Only what's near the viewport
---
- Linking
- Scroll positions on one long page
- A real route per operation, tool, and schema; hash or history routing
---
- Bundle
- UMD
- ESM, loaded with `<script type="module">`
---
- Minimum versions
- React 16.8, Node 6.9
- React 19, Node 22
{% /table %}

⚠️ **Not released yet.** `rc.0` on npm is the old OpenAPI-only engine, so try the demo instead and tell us what breaks.

## Where 2.x ran out of road

The design looked its age. There was no dark mode. Customization meant handing Redoc a deeply nested JavaScript `theme` object, and every styling request that object couldn't satisfy arrived as a GitHub issue asking for one more option. We kept adding them. Forty-odd options later, the destination was clear enough: a configuration surface that could describe everything except the thing you actually wanted.

Large descriptions were worse. Redoc 2.x rendered the entire document up front. On a few-hundred-endpoint API that isn't slow - it's unusable. And descriptions have only grown.

Underneath, the debt compounded. Dependency upgrades got harder, which made security patches harder. Then OpenAPI 3.2 shipped and we were standing still. We had been among the first renderers to support 3.1. Missing 3.2 stung more than the rest of it put together.

## Why we started over

We began 3.x in September 2025 with a straightforward brief: fresh design, real theming, viewport-aware rendering, OpenAPI 3.2. By December it worked, and `3.0.0-rc.0` went to npm. The stable release never followed.

API documentation stopped being OpenAPI-only years ago. Teams describe event-driven
systems in AsyncAPI, ship GraphQL alongside REST, and now describe MCP servers for agents to call by using `x-mcp` - stitching together three or four tools that agree on nothing. We could support all of it, but not on the engine we had just finished. So in January 2026 we set the release candidate aside and started again.

The rebuild rests on one structural change: **the description becomes data before React exists.** Redoc 2.x built a model tree in the browser and rendered one long scrolling page. Real routes, mounting only what's near the viewport, a search index built ahead of time - all of it needs the document to be structured data before a single component
mounts.

So parsing moved out of the render path. Adapters - one each for OpenAPI, AsyncAPI, and GraphQL - turn a description into a flat item tree plus shared stores for schemas, examples, and security schemes. React just renders it. UI state moved from one global store to fine-grained atoms scoped per item.

Everything below follows from that boundary.

## What actually changed

### One renderer, four kinds of API

[OpenAPI](https://www.openapis.org/), [AsyncAPI](https://www.asyncapi.com/), and [GraphQL](https://graphql.org/) are different formats. *Documentation* for them is not: here's an entity, here's what it accepts, here's what it returns, here's how you authenticate. Everything below the adapter - layout, navigation, schema rendering, deep links, search, theming - is shared. That's why AsyncAPI and GraphQL arrive together rather than as two plugins over two years, and why adapters initialize on demand: point Redoc at a GraphQL schema and the OpenAPI and AsyncAPI adapters are never evaluated.

[MCP](https://modelcontextprotocol.io/) is worth stating precisely: Redoc documents an MCP server, it doesn't provide one. When your OpenAPI description carries an `x-mcp` section, the tools, resources, and prompts become first-class entities with their own pages, input schemas, and generated examples, grouped by tag alongside your REST operations.

OpenRPC and gRPC are adapter-sized problems now rather than rewrites.

### OpenAPI 3.2

3.2 support is in the OpenAPI adapter, including the parts of the [3.2 specification](https://spec.openapis.org/oas/v3.2.0.html) that change how a document is structured rather than just what it contains:
- `additionalOperations` on a path item, so methods beyond the fixed HTTP verb set get
 rendered as real operations.
- `querystring` parameters.
- `itemSchema` for sequential media types - server-sent events and newline-delimited
 JSON render as streams of items rather than one opaque blob.
- Richer tags: `summary`, `parent`, and `kind`, which turn a flat tag list into an
 actual navigation hierarchy.

For a fuller tour of the specification itself, see [our take on OpenAPI 3.2](./openapi-3-2.md).

### CSS theming and dark mode

The `theme` object is gone. Design tokens are CSS custom properties now, so restyling
Redoc is a stylesheet instead of a nested JavaScript literal:

```css
:root {
 --color-primary-500: #0f766e;
 --link-color-primary: var(--color-primary-500);
 --text-color-primary: #1f2933;
 --font-family-base: 'Inter', sans-serif;
 --border-radius: 8px;
}
```

Most of the old options existed to work around the model layer we deleted - that's where the smaller configuration surface below comes from.

Dark mode is now built in, so you don't have to create a theme yourself.

**This one is breaking, with no shim.** If you pass a `theme` object today, that's the change to plan for.

### Performance on large descriptions

Only what's near the viewport mounts. The few-hundred-endpoint description that froze 2.x scrolls now - because the document is data before it's components, so the renderer can decide what to skip.

### Search that knows what it's indexing

Search covers schema fields, parameters, and response codes, not just operation titles. It's built from the same item tree everything else renders from, which is what makes indexing the whole document practical in the first place.

### Real routes, and deep links that land on what you meant

Redoc 2.x was one long scrolling page, so every "link" was really a scroll position.
In 3.x each operation, tool, resource, and schema has its own route, and you pick how it appears in the URL bar:

```text
https://example.com/api.html#/docs/openapi/cafe/placeorder   hash (default, works anywhere)
https://example.com/docs/openapi/cafe/placeorder             history (router="history")
```

History routing needs the usual single-page-app rewrite on your server, or deep links will 404 on refresh. Hash routing needs nothing.

Below the route, links get finer. 2.x could point at an operation; 3.x points at a specific field inside a specific response code, through the discriminator variant that contains it. This link is shareable anywhere.

### Four ways to run it

HTML drop-in, React component, [Redocly CLI](https://redocly.com/docs/cli), and Docker.
Same engine and the same options across all four, each expressed the way that platform expects - an attribute, a prop, a CLI flag, or `REDOC_OPTIONS`:

{% tabs %}
 {% tab label="HTML" %}
 ```html
 <script type="module" src="redoc.standalone.js"></script>
 <redoc spec-url="https://redocly.github.io/redoc/museum.yaml"></redoc>
 ```

 {% /tab %}
 {% tab label="React" %}
 ```tsx
 import { RedocStandalone } from 'redoc';

 <RedocStandalone specUrl="https://example.com/openapi.yaml" />;
 ```

 {% /tab %}
 {% tab label="Redocly CLI" %}
 ```sh
 npx @redocly/cli build-docs openapi.yaml
 ```

 {% /tab %}
 {% tab label="Docker" %}
 ```sh
 docker run -p 8080:80 \
   -e SPEC_URL=https://api.example.com/openapi.json \
   -e REDOC_OPTIONS='only-required-in-samples="true" hide-schema-titles="true"' \
   redocly/redoc
 ```

 {% /tab %}
{% /tabs %}

### Always up to date with commercial Redoc

In 2.x, open-source Redoc and the renderer behind our commercial products were separate codebases. They drifted, and the open-source one drifted downhill.

In 3.x there is one codebase. The CE package is generated from the same engine we ship to paying customers, by a build step that mechanically strips the commercial pieces - not a port, not a fork someone remembers to sync. A fix that lands for customers is in CE by construction, because it is the same code. It cannot fall behind again.

A few pieces stay commercial: Try It, the interactive request console, and a handful of
options that support it. Redoc 2.x didn't include Try It either, so nothing that was open
source before has changed hands.

## Caught up with modern JavaScript

Two things in 3.x will show up in your upgrade diff. Both are the project catching up with where JavaScript and Redoc's own configuration should already have been.

**The bundle is ESM.** Redoc 2.x shipped a UMD bundle built for a browser that needed a loader to be told what a module was. Every runtime and bundler in the current support matrix speaks ES modules natively, so that's what we ship - one format, no dual-build, and a `<script type="module">` tag instead of a global.
Alongside it, React 19 and Node 22 as the floor. Dropping the compatibility layers is what let the dependency tree move again, which is what makes security patches routine instead of an archaeology project.

If that floor rules you out today, you're not stranded: 2.x keeps receiving security and critical fixes after stable 3.0 ships. Staying on 2.x while you plan the upgrade is a supported choice, not a dead end.

**The configuration got smaller on purpose.** Forty-something options became around 20. That isn't features removed - it's the option list no longer being the workaround layer for an engine that couldn't be styled. Most of what's gone was sorting flags and hide/show toggles whose behavior is now either the default or one CSS custom property
away.
The full 2.x-to-3.x migration list comes with the release.

## A note on telemetry

This is new in 3.x - Redoc 2.x never sent anything - so it deserves a plain statement: Redoc CE 3.x sends anonymous usage data, on by default.
Here is the whole list of what goes in it:
- **Which format you're rendering** - `openapi`, `asyncapi`, or `graphql`, attached to every event. This is the one we most want, because it tells us where to spend the next six months.
- **How you're running it** - `html`, `cli`, `react`, or `docker`, and which layout you're in.
- **Core Web Vitals** - CLS, LCP, FCP, TTFB.
- **Which features get used** - layout switches, language selection, example switching, expand/collapse, snippet copying, downloads.

We use this to find what's broken. An error we can see is an error we can fix, and on a project this widely deployed most breakage never reaches us as a GitHub issue.

If you'd prefer not to send data, you can turn it off with one flag: `disable-telemetry` in HTML, `disableTelemetry` in React and the CLI, or through `REDOC_OPTIONS` in Docker.

No degraded behavior, no nagging.

## Try it before we lock it in

None of this is on npm. The build published there is still `3.0.0-rc.0`, the OpenAPI-only engine we set aside, so installing it won't show you any of the above.
`rc.1` will be the first release with the new engine, and stable 3.0 follows it. We're not attaching dates to either until the feedback from this preview settles - that's a choice, not an oversight. We'll post again when it's out.

Until then the demo is the real thing, and this is the useful moment to break it: nothing is frozen, so a report now costs us a change instead of a migration path.

- 👀 **See it:** [the Cafe API demo](https://redocly.github.io/redoc/3.x?url=cafe.yaml)
- 📘 **Know what it is:** [the Redoc CE product page](https://redocly.com/redoc-ce)
- 🔍 **Go deeper on 3.2:** [what changed in OpenAPI 3.2](./openapi-3-2.md)
- 🔨 **Break it:** point it at your own description, especially if it's enormous, unusual, or has defeated renderers before. Those are the reports we want most - tell us in [the Redoc 3.x issue](https://github.com/Redocly/redoc/issues/2829), or [open a new one](https://github.com/Redocly/redoc/issues).

Rewrites are a promise, and promises are cheap. What we can offer instead is the source: MIT, the same engine we run ourselves, and [an open issue](https://github.com/Redocly/redoc/issues/2829) waiting for the reports that tell us we got something wrong.