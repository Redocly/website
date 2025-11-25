---
template: ../@theme/templates/BlogPost
title: August 2025 updates
description: Product features and enhancements from August 2025 include enhanced AI integration, improved navigation, workflow upgrades, and a robust feedback system.
seo:
  title: August 2025 updates
  description: Product features and enhancements from August 2025 include enhanced AI integration, improved navigation, workflow upgrades, and a robust feedback system.
  image: ./images/aug-blog-post.png
author: adam-altman
publishedDate: "2025-09-11"
categories:
  - redocly:product-updates
image: aug-blog-post.png
---
# August 2025 updates ☀️

August brought a wave of improvements across Redocly's product suite, with enhanced AI integration, better navigation, improved workflows, and a more robust feedback system.

Here's what's new:

## 🤖 Enhanced AI integration

We're expanding LLM capabilities throughout the platform:
- **GraphQL docs AI actions**: LLM-related page actions are now available in GraphQL documentation, bringing the same AI-powered assistance you love to your GraphQL schemas.
- **Smarter content filtering**: Fixed an issue where LLM page actions appeared on pages excluded from search — now they only show where they're meant to be useful.

## 🧭 Better navigation and UI

Navigation just got a major upgrade with improved breadcrumbs that make exploring large documentation sites effortless:
- **Refined visual design**: Cleaner, more intuitive breadcrumb styling.
- **Smart page name handling**: Long page names are automatically shortened to keep navigation clean.
- **Deep structure support**: Dropdown menus help you navigate complex documentation hierarchies.
- **Related page suggestions**: Discover relevant content as you browse.
- **Icon support**: Add visual cues to your breadcrumb navigation.
- **Multilingual translations**: Breadcrumbs work seamlessly across languages.
- **Cleaner catalog**: Fixed duplicate entries in the catalog for a tidier experience.

## ⚡ GraphQL enhancements

GraphQL documentation continues to get more powerful:
- **Enhanced security documentation**: The `@requiresScopes` directive now includes detailed security section documentation.

## 🔌 OpenAPI enhancements

- **Better discriminator handling**: Added search functionality to discriminator dropdowns for lists longer than six items — no more endless scrolling through options.

## 🔄 Workflow and AsyncAPI improvements

Developer workflows are getting smarter and more flexible:
- **Workflow execution**: You can now run workflows directly with full input schema support.
- **Enhanced Arazzo support**: Expression highlighting, completion support, and x-security integration make writing workflows smoother.
- **AsyncAPI metadata**: Support for the `x-metadata` extension gives you more control over your AsyncAPI documentation.
- **Updated UI elements**: New Play and WorkflowHierarchy icons, plus refreshed collection tree interface.

## 🛠️ Developer experience upgrades

Several quality-of-life improvements for developers:
- **Dynamic component loading**: New dynamic function in `@redocly/theme` enables lazy loading for better performance.
- **Authentication improvements**: 
  - `tokenUrl` values now serve as defaults in Try It security flows
  - Added support for accessing original identity provider tokens
- **Flexible configuration**: Made the `codeSamples->languages` parameter optional for easier setup.
- **Enhanced components**: Classic catalog card component is now part of the ejectable components library.
- **Better Markdoc**: Built-in functions and custom functions are now easily accessible in the Markdoc tags dropdown.

## 📝 Improved feedback system

Feedback management gets a significant boost:
- **Automatic spam detection**: New content-based spam detection keeps your feedback clean automatically.
- **Enhanced workflow**: Added "In Review" and "Resolved" statuses for better feedback lifecycle management.
- **Internal collaboration**: Team members can now add internal comments to feedback entries.
- **Git integration**: Pull request reviews are automatically posted to connected Git providers.

## 🎨 Enhanced Reunite experience

Reunite builds are now more informative and visually appealing:
- **Improved build logs**: Refined emoji usage, better alignment for multiline logs, and colorful status indicators for info and warning messages make tracking builds more intuitive.

## 🐛 Quality improvements

We've also shipped numerous fixes to make your experience smoother:
- **Better error handling**: Fixed crashes during sidebar generation with long folder names.
- **Improved authentication**: Updated environment variable naming (`OAUTH_USE_INTROSPECT` → `REDOCLY_OAUTH_USE_INTROSPECT`) and fixed various SSO-related issues.
- **Enhanced search**: Fixed RBAC-restricted content appearing in search results and improved search index generation.
- **URL handling**: Better support for trailing slashes and path prefixes across the platform.
- **Component fixes**: Resolved issues with code-walkthrough steps, mock servers, and various UI elements.

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
- **Remote content file** - people have been asking to be able to do remote content with a single file (in addition to a folder of files) and it is coming soon.
- **MCP servers** – deeper integration with external tools and workflows.
- **Runtime logs** – richer visibility into what's happening behind the scenes.
- **Catalog** – richer ways to describe APIs, entities, and relationships.
- **Visual workflows builder** – model API interactions visually.
- **Performance** – faster response times and improved stability across large projects.

---

That's it for August! 🚀
As always, we'd love your feedback — let us know what you think!
