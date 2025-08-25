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

## Configuration

{% table %}

- Option
- Type
- Description

---

- writeKey
- string
- **REQUIRED.** Amplitude write key

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Segment Analytics in development mode and preview builds. Default is `false`.

---

- trackPage
- boolean
- Set this to `false` to disable page visits tracking. Defaults to `true`.

---

- includeTitleInPageCall
- boolean
- Set this to `false` to exclude page title from page view event. Defaults to `true`

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
