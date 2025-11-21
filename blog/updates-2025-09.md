---
template: ../@theme/templates/BlogPost
title: September 2025 updates
description: Product features and enhancements from September 2025 include built-in MCP server integration, OpenAPI 3.2.0 support, enhanced search capabilities, and improved build processes.
seo:
  title: September 2025 updates
  description: Product features and enhancements from September 2025 include built-in MCP server integration, OpenAPI 3.2.0 support, enhanced search capabilities, and improved build processes.
  image: ./images/september-updates.png
author: adam-altman
date: "2025-10-09"
categories:
  - redocly:product-updates
image: september-updates.png
---
# September 2025 updates ☀️

September brought a wave of powerful improvements across Redocly's product suite, with enhanced search capabilities, OpenAPI 3.2.0 support, built-in MCP server integration, and improved build processes.

Here's what's new:

## 🔍 Search and SEO enhancements

Fine-tune your documentation's discoverability:
- **Front matter keywords configuration**: Boost or demote search rankings for Markdown pages through includes/excludes lists.
- **Improved search indexing**: Enhanced memory efficiency when creating search indexes, reducing build failures due to out-of-memory errors on large projects.
- **Cleaner URL fragments**: Improved heading anchor ID generation by removing dots and slashes.

## 🤖 MCP server integration

Connect your API documentation to AI assistants:
- **Built-in MCP server**: Expose your API docs to AI assistants with our new built-in MCP server.
- **OpenAPI x-mcp extension**: Added support for the `x-mcp` specification extension to render MCP server documentation. 🔥

## 🔌 OpenAPI 3.2.0 support

We've added basic support for the latest OpenAPI specification:
- **Security updates**: Support for the new `deprecated` and `oauth2MetadataUrl` fields, plus the `deviceAuthorization` flow.
- **Device authorization**: Automatic code samples generation for device authorization flow.
- **Server names**: Added support for the `servers.name` property.

More to come...

## OpenAPI reuse 

We've added a way to share components such as schemas in a convenient way to encourage reuse:
- **Schema catalog links**: New `openapi.showSchemaCatalogLinks` configuration option displays links to schemas and requests that can be used as `$ref` values in other OpenAPI files within the same project.

## ⚙️ Configuration and flexibility

More control over your documentation:
- **Partials anywhere**: Added support for `_partials` folders at any directory level, with glob pattern support for the `partialsFolders` configuration.
- **Path prefix support**: Better handling of path prefixes for HTML `href` attributes.
- **Residency validation**: Added validation to ensure residency URLs start with `http://` or `https://`.

## ⚡ GraphQL enhancements

Better control over GraphQL documentation:
- **Built-in visibility control**: New `showBuiltInScalars` and `showBuiltInDirectives` options let you control visibility of built-in GraphQL scalars and directives.
  We don't show built-in scalars and directives by default any longer.

## 🧪 Try it improvements

Enhanced API testing experience:
- **Dynamic Replay configuration**: Added support to configure Replay with dynamic API data, including the OpenAPI info object in the `useConfigureReplay` context.
- **Persistent environments**: User-created environments in Try it now persist between page reloads.

## ✅ Build validation

Catch errors before they reach production:
- **React page validation**: Added validation for React pages to catch runtime errors during the build process.

## 🎨 Enhanced Reunite experience

Better visibility and error handling in your build pipeline:
- **User-friendly error messages**: Clear messages for credential validation failures, missing repositories, and branch errors when interacting with Git providers.
- **Branch management**: Added ability to fetch and search project branches on the Branch Deploy Strategy page.
- **Batch file support**: Added batch file support to the push API while preserving backward compatibility with the legacy Scout push API.

## 🛠️ UI enhancements

Small touches that make a big difference:
- **Sidebar separator icons**: Added icon option to sidebar separators for better visual organization.

---

## 🚀 Build Redocly with Us!

We're hiring software engineers to help shape the future of API documentation.

✅ Passionate about APIs?\
✅ Excited by cutting-edge developer tools?

Join our team and be part of something big.

[Apply now →](https://redocly.com/careers#software-engineer)

---

## 🔮 Roadmap sneak peek

We're continuing to invest in features that make building and running with Redocly even more powerful:
- **MCP servers** – we released some MCP servers but we're doing more... stay tuned.
- **AI assistant** – we're running some experiments with an AI assistant -- stay tuned (we'll have it on our website and in our app this month).
- **Runtime logs** – richer visibility into what's happening behind the scenes.
- **Catalog** – richer ways to describe APIs, entities, and relationships.
- **Visual workflows builder** – model API interactions visually.
- **Performance** – faster response times and improved stability across large projects.

---

That's it for September! 🚀
As always, we'd love your feedback — let us know what you think!
