---
template: ../@theme/templates/BlogPost
title: November 2025 updates
description: Product features and enhancements from November 2025 include AI assistant improvements, OpenAPI 3.2.0 support, enhanced MCP integration, and new CLI validation rules.
seo:
  title: November 2025 updates
  description: Product features and enhancements from November 2025 include AI assistant improvements, OpenAPI 3.2.0 support, enhanced MCP integration, and new CLI validation rules.
  image: ./images/november-feature-updates.png
author: adam-altman
date: "2025-11-06"
categories:
  - redocly:product-updates
image: november-feature-updates.png
---
# November 2025 updates 🍂

November brings exciting new features across Redocly's product suite, with AI assistant enhancements, OpenAPI 3.2.0 support, improved MCP integration, and powerful new CLI validation capabilities.

Here's what's new:

## 🔍 Search and SEO enhancements

Fine-tune your documentation's discoverability:
- **x-keywords extension**: Added support for the `x-keywords` extension in OpenAPI documents to boost or exclude search terms through keywords.
- **Project title in SEO**: Added `projectTitle` parameter to SEO configuration to append project name to page titles.

## 🤖 AI Assistant improvements

Enhanced AI-powered documentation experience:
- **Ask AI floating action button**: Added a floating action button to trigger AI Search directly from your documentation.
- **AI Search feedback**: Added the ability to send feedback for AI Search responses to help us improve.
- **Configuration update**: Deprecated `search.ai` config option and replaced it with `aiAssistant`.

## 🔌 MCP server integration

Connect your API documentation to AI assistants:
- **connect-mcp Markdoc tag**: Added new `connect-mcp` Markdoc tag for seamless MCP server integration.
- **Page actions for VSCode and Cursor**: Added page actions that allow you to connect to the MCP server via VSCode and Cursor.

## 🔌 OpenAPI 3.2.0 support

We've added support for the latest OpenAPI specification:
- **Basic OpenAPI 3.2 support**: Added basic support for OpenAPI 3.2 specification.
- **Discriminator default mapping**: Added support for `discriminator.defaultMapping` in OpenAPI 3.2.0.

## ⚙️ Configuration and flexibility

More control over your documentation:
- **Mock server settings**: Added support for configuring mock server settings at the product level.
- **Front matter translation**: Added `frontmatterTranslate` utility to localize React front matter.
- **Custom properties**: Added `additionalProps` to navbar, sidebar, and footer items to enable adding custom properties.
- **Anchor links to tabs**: Added support for anchor links to the tabs Markdoc tag.
- **Tag component styling**: Updated CSS styles for the tag component.

## 🎨 Enhanced Reunite experience

Better visibility and usability:
- **Improved disabled items**: Improved text color of disabled items in the file context menu.

## 🛠️ Redocly CLI enhancements

Powerful new validation and testing capabilities:
- **New recommended rules**: Added `no-invalid-schema-examples` and `no-invalid-parameter-examples` to the recommended ruleset.
- **New spec rules**: Added `no-duplicated-tag-names` to the spec ruleset.
- **OpenAPI 3.2 validation rules**: Added new rules for validating OpenAPI 3.2 description files: `spec-no-invalid-tag-parents`, `spec-example-values`, `spec-discriminator-defaultMapping`, and `spec-no-invalid-encoding-combinations`.
- **Deprecated rule**: Deprecated the `no-example-value-and-externalValue` rule in favor of `spec-example-values`.
- **Respect mTLS certificates**: Added configuration of Respect mTLS certificates on a per-domain basis.
- **Response size output**: Added response size to the Respect terminal and JSON file outputs.
- **Secrets masking option**: Added the `no-secrets-masking` option to the respect command, allowing raw (unmasked) output to be generated.

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
- **MCP servers** – we released some MCP servers and we're still doing more... stay tuned.
- **AI assistant** – we're running some experiments with an AI assistant – it's available in your projects.
- **Runtime logs** – richer visibility into what's happening behind the scenes.
- **Catalog** – richer ways to describe APIs, entities, and relationships.
- **Visual workflows builder** – model API interactions visually.
- **Performance** – faster response times and improved stability across large projects.

---

That's it for November! 🚀
As always, we'd love your feedback — let us know what you think!
