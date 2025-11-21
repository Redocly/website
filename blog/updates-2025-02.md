---
template: ../@theme/templates/BlogPost
title: February 2025 updates
description: Round-up of product features and enhancements from February 2025
seo:
  title: February 2025 updates
  description: Round-up of product features and enhancements from February 2025
  image: ./images/february-feature-updates.png
author: adam-altman
date: "2025-03-18"
categories:
  - redocly:product-updates
image: february-feature-updates.png
---
# February 2025 updates 🚀

February was a **big month at Redocly** as we launched **two new products**: [**Respect**](/pages/respect-cli/respect-cli.page.tsx) and [**Respect Monitoring**](/pages/respect/respect.page.tsx).

We also made **AI-powered search** and **Typesense search** available, enhancing documentation navigation with **faster, smarter** search capabilities.
Another **major milestone**—**theme component ejection** from **Reunite** is now **generally available**, offering even greater customization.

Beyond these key launches, we’ve **continued our commitment to stability**, fixing bugs and optimizing platform performance.

Here’s what’s new:

---

## **🔍 AI Search**

AI search is now generally available for **Enterprise** and **Enterprise Plus** plans. This feature **enhances documentation search capabilities** by:

✅ Understanding **natural language queries**\
✅ Delivering **more relevant results** in less time\
✅ **Reducing friction** in API discovery

AI search is designed to **help developers and technical teams** find the right answers **faster**, cutting down on time spent searching through documentation.

**Want to customize AI search settings?**
You can [add your own custom prompt](/docs/realm/config/search).

Don't want it?
You can also **turn AI search off** in your `redocly.yaml` configuration:

```yaml
search:
  ai:
    hide: true
```
---

## ⚡ Typesense Search

We’ve also introduced **Typesense search**—an alternative search engine that provides:

✅ Ultra-fast API documentation search\
✅ Advanced filtering and facets\
✅ Improved relevancy ranking

This feature is available for Enterprise and Enterprise Plus plans.

To enable it, add the following to your `redocly.yaml` file:

```yaml
search:
  engine: typesense
```

Typesense **enhances search performance** while giving teams more **control over indexing and results**.

---

## 🎨 Eject Components from Within Reunite

Reunite now allows users to eject theme components, enabling even deeper customization of your documentation.

{% img src="./images/2024-11-eject-preview.png" alt="Eject preview" height="100px" withLightbox=true /%}

With component ejection, you can:
- Modify UI elements without affecting core functionality
- Customize styling, layouts, and interactions
- Maintain flexibility while leveraging Redocly’s framework

This gives teams the best of both worlds:

🔹 The power of pre-built themes with the flexibility of custom development.

---

## 🔮 Roadmap Sneak Peek

### 🚀 Coming this month: **Code Walkthroughs**

One of the most anticipated features is Code Walkthroughs—designed to help users:

✅ Navigate complex API integrations step by step\
✅ Understand key implementation details with interactive guides\
✅ Reduce friction for first-time adopters

🔍 Interested in early access? [Contact us](https://redocly.com/contact-us) to learn more.

---

### 🎯 Ready for Early Access: **API Functions and Server-Side Props**

We’re rolling out API Functions and Server-Side Props, allowing teams to:

✅ Extend documentation dynamically\
✅ Improve API-driven workflows\
✅ Customize data retrieval strategies

Interested in trying these out? [Request access](https://redocly.com/contact-us).

---

### 🔮 Upcoming Features
- Performance enhancements – Faster response times and improved stability
- Information architecture updates – Optimized docs structure for better discoverability
- Visual API workflows builder – A new way to model API interactions

---

## 🚀 Build Redocly with Us!

We’re hiring software engineers to help shape the future of API documentation.

✅ Passionate about APIs?\
✅ Excited by cutting-edge developer tools?

Join our team and be part of something big.

[Apply now →](https://redocly.com/careers#software-engineer)