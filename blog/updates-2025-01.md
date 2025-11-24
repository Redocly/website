---
template: ../@theme/templates/BlogPost
title: January 2025 updates
description: Round-up of product features and enhancements from January 2025
seo:
  title: January 2025 updates
  description: Round-up of product features and enhancements from January 2025
  image: ./images/january-feature-updates.png
author: adam-altman
publishedDate: "2025-02-05"
categories:
  - redocly:product-updates
image: january-feature-updates.png
---
January kicked off with momentum from 2024, and while we focused on refining existing features, we also shipped enhancements that improve search, navigation, and usability.
Bigger updates are coming in the next two quarters, but here’s what’s new right now.

---

## `img` Markdoc tag lightbox

We introduced the `img` Markdoc tag in December, and now we've added a **lightbox feature**! Users can click on an image to see a larger version with a lightbox effect. This was a highly requested feature, and we’re excited to roll it out.

{% markdoc-example renderDemo=true %}
  ```markdown {% title="Image example (click image to see lightbox effect)" %}
  {% img src="./images/january-feature-updates.png" withLightbox=true width="200px" /%}
  ```
{% /markdoc-example %}

---

## Enhanced search for API parameters

Searching API reference docs is now even more powerful.
You can now **search for specific operation parameters** and jump directly to the right place in your API reference.
No more endless scrolling—just fast, precise access.

---

## Programmatically configure API request information

Save time by dynamically configuring [API request information](https://redocly.com/docs/realm/extend/how-to/configure-request-values).
This feature streamlines API request workflows for more efficient testing and integration.


---

## Optional email collection for feedback

Want to follow up on user feedback? You can now add an **optional email input field** to the feedback form, allowing users to share their contact details when submitting feedback.

---

## Improved organization invite functionality

We’ve enhanced organization invites by:
- Adding expiration indicators.
- Tracking creation time for better management.
- Improving invite link sharing capabilities.
- Enhancing the UI with better visual feedback and a more intuitive action menu.

---
## Improved filtering on People page

A new **team filter** has been added to the People page, making it easier to find and manage users by team.

---

## Bitbucket Cloud repository support

Redocly now supports **Bitbucket Cloud** as a Git source. Connect your repositories seamlessly and sync API documentation from Bitbucket.

---

## Navigate to referenced definitions in OpenAPI files quickly

Working with `$ref` in OpenAPI just got easier.
Now, you can instantly navigate to referenced definitions, making it faster to edit and troubleshoot API specs.

---

## Roadmap sneak peek

### 🚀 Coming this month: AI search & Typesense

We’re rolling out AI search and Typesense to general availability to those on our Enterprise and Enterprise Plus plans!
These features will enhance search functionality, helping users find the right API content more efficiently.

- **AI search** has an experimental limit of **750 searches per month** at no extra cost.
- **Typesense** brings powerful new indexing capabilities, improving speed and relevance.
- Both features come with easy configuration options:

```yaml {% title="redocly.yaml" %}
search:
  ai:
    hide: true
  engine: typesense
```

🔍 Interested in AI search or Typesense? [Contact us](https://redocly.com/contact-us) to learn more.


### 🎯 Ready for early access

- Eject components from within Reunite
  {% img src="./images/2024-11-eject-preview.png" alt="Eject preview" height="25px" withLightbox=true /%}
- **API monitoring and contract testing** (should be available in early access this month)
- **Code walkthrough** (should be available in early access this month)

Interested in trying these out?
[Request access](https://redocly.com/contact-us).

### 🔮 Upcoming features include
- Performance enhancements
- Information architecture changes to our docs
- Visual API workflows builder

---

## 🚀 Build Redocly with us!

We’re [hiring software engineers](https://redocly.com/careers#software-engineer) to help us take Redocly to the next level. If you’re passionate about APIs and want to join a team dedicated to innovation, we’d love to hear from you.
