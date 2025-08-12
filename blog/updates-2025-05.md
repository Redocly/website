---
template: '../@theme/templates/BlogPost'
title: May 2025 updates
description: Round-up of product features and enhancements from March, April, and May 2025
seo:
  title: "Q2 2025 Updates: March through May"
  description: Round-up of product features and enhancements from March, April, and May 2025
  image: ./images/past-quarter.png
author: adam-altman
date: 2025-06-09
categories:
  - company-update
image: past-quarter.png
---

# March, April, and May 2025 updates 🚀

The past few months at Redocly have been packed with progress — from shipping **Code Walkthroughs** and **API Functions** to delivering **llms.txt automation**, performance improvements, and deeper AI capabilities.
Here’s what we’ve been up to:

---

## Changelog and release process improvements

We ship **minor monthly releases** of our new packages (`@redocly/realm`, `@redocly/revel`, and others).
Throughout the month, we may also release **hotfix patches** for important issues.
In addition, we provide a **“next” version channel** where customers eager to try upcoming features can get early access.


This approach keeps our changelog more **digestible** and makes it easier for teams to manage updates on their own schedule.

---

## Code walkthroughs

Code Walkthroughs is one of our most powerful new features. It allows you to create **side-by-side explanations and functional code samples** that stay synchronized as the reader scrolls.

You can also add **interactive elements** — text inputs, toggles, downloads, previews — to make walkthroughs even more engaging.

Example walkthroughs:
- [Explaining an Arazzo file](/learn/arazzo/arazzo-walkthrough.md)
- [API functions tutorial](/docs/realm/customization/api-functions/create-api-functions.md)

As an experiment, we even tested whether LLMs could generate Code Walkthrough docs by giving them a link to our [code walkthrough docs](/docs/realm/content/markdoc-tags/code-walkthrough/index.md).
The test was **successful** — opening up new possibilities for automated doc generation!

---

## `llms.txt` automation

We automatically generate an `llms.txt` file — a **lightweight Markdown index** that helps **LLMs understand your documentation structure**.

This improves the **quality of AI-generated answers** by making your docs more easily consumable.

Example `llms.txt`:

```md
# Redocly Documentation Index

## API Functions
- [API Functions Reference](/docs/realm/customization/api-functions/api-functions-reference.md)
- [Creating API Functions](/docs/realm/customization/api-functions/create-api-functions.md)

## Configuration
- [SEO Configuration](/docs/realm/config/seo.md)
```

In addition, all of your Markdown (and OpenAPI) pages can be linked to in Markdown format by adding a `.md` to the end of the path.

You can configure `llms.txt` generation — see [SEO configuration docs](/docs/realm/config/seo.md#llmstxt-object).

---
## API functions

We added API functions which make it much easier to bring in content from first or third party APIs as well as to power forms and more.

Example of an API function:
```javascript
import type { ApiFunctionsContext } from '@redocly/config';

export default async function (
  request: Request, 
  context: ApiFunctionsContext
) {
  // ...
}
``` 

Read more about [API functions](/docs/realm/customization/api-functions/api-functions-reference.md)

This feature is available to Reef and Realm subscribers.
---

## Quality of life improvements 🚀


Configuration
- Enabled **environment variables** in any `redocly.yaml` config value (previously limited to `rbac`, `developerOnboarding`).
- Introduced `concat` Markdoc function for combining string values.

Search & SEO
- Added **file version filtering** for Typesense search.
- Added **customizable sitemap priorities**.

Performance
- Virtualization in Catalog and Scorecard → faster performance on large API sets.
- Reduced memory usage for large OpenAPI projects.
- Partial loading for large OpenAPI descriptions.

Usability
- Improved Tab navigation in search → first Tab now focuses “Search with AI.”
- Added “Internal server error” page.
- Improved Complex badge detection in OpenAPI docs (`allOf` nesting > 5 levels).
- Added **AI conversations UI** with follow-up questions.

Developer features
- Added context to configure functions → programmatic setup of request values.

---

## 🚀 Build Redocly with Us!

We're hiring software engineers to help shape the future of API documentation.

✅ Passionate about APIs?\
✅ Excited by cutting-edge developer tools?

Join our team and be part of something big.

[Apply now →](https://redocly.com/careers#software-engineer)

---

## 🔮 Roadmap Sneak Peek

### Coming soon: Built-in Analytics 📊

Want to know which pages get viewed? Which searches return no results?
You’re not alone — many customers have asked us for this.

While 3rd party analytics are helpful, they can be difficult to implement (compliance, privacy, etc).
First-party analytics give you **direct visibility** into how your docs are used — without adding extra tracking scripts or worrying about privacy policies.

We’re building first-class, built-in analytics to answer questions like:
- How many users searched for “SSO” this week?
- How many users clicked into SSO docs?
- How many support conversations happened around SSO?

Example from our internal data:
- 9 users searched for SSO last week
- 40 users read SSO docs
- 2 support tickets were opened

This kind of insight helps us measure **support deflection** and **identify gaps** in docs — and soon, you’ll be able to do the same.

---

### Better AsyncAPI docs

We support the official AsyncAPI docs plugin.
That's great, but there is still a lot to be desired.
We use AsyncAPI ourselves to describe websockets, message queues, and more.

We believe the documentation user experience can be improved greatly, and we're working on that.

---

### 🔮 Upcoming Features
- Performance enhancements – Faster response times and improved stability
- Catalog – We're doubling down here and building a richer catalog to allow you to describe more types of entities and relationships
- Visual API workflows builder – A new way to model API interactions
