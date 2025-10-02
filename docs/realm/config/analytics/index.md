---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
description: Configure popular analytics providers for your documentation project.
---
# `analytics`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Configure popular analytics providers for your documentation project.
This configuration adds analytics tracking to all pages, except those specifically excluded.

## Options

{% table %}

- Option
- Type
- Description

---

- adobe
- [Adobe config](./adobe.md)
- Configures Adobe analytics

---

- amplitude
- [Amplitude config](./amplitude.md)
- Configures Amplitude analytics

---

- fullstory
- [Fullstory config](./fullstory.md)
- Configures Fullstory analytics

---

- google
- [Google analytics config](./google.md)
- Configures Google analytics via `analytics.js`

---

- gtm
- [Google Tag Manager config](./gtm.md)
- Configures Google Tag Manager

---

- heap
- [Heap config](./heap.md)
- Configures Heap analytics

---

- segment
- [Segment config](./segment.md)
- Configures Segment analytics

{% /table %}
