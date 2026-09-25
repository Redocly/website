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
---
# Segment Analytics

Integrate Segment Analytics into Redocly project.

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

## Configuration

{% table %}

- Option
- Type
- Description

---

- writeKey
- string
- **REQUIRED.**
  Amplitude write key

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Segment Analytics in development mode and preview builds.
  Default: `false`.

---

- trackPage
- boolean
- Set this option to `true` to track page visits.
  Default: `false`.

---

- includeTitleInPageCall
- boolean
- Set this option to `true` to include the page title in page view events.
  Default: `false`.

---

- host
- string
- Set this if you need to proxy events through a custom endpoint

{% /table %}

## Example

```yaml
analytics:
  segment:
    includeInDevelopment: true
    writeKey: my-write-key
    trackPage: true
    includeTitleInPageCall: true
    host: https://my-custom-host.com
```

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
