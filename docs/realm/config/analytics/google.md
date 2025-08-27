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
# Google Analytics

Integrate Google Analytics 4 into Redocly project using the Google tag (gtag.js).

## Configuration

{% table %}

- Option
- Type
- Description

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Google Analytics in development mode and preview builds. Default is `false`.

---

- trackingId
- string
- **REQUIRED.** Google Analytics tracking ID.

---

- conversionId
- string
- Tracking ID obtained in Google Ads.

---

- floodlightId
- string
- Tracking ID obtained in the Google Marketing Platform.

---

- head
- boolean
- Put tracking scripts in the head tag instead of body. Only allowed in root `redocly.yaml`.

---

- anonymizeIp
- boolean
- When present, the IP address of the sender will be masked.  Only allowed in root `redocly.yaml`.

---

- exclude
- [string]
- Do not send page view events on certain pages.

---

- optimizeId
- string
- Google Optimize container ID.

---

- cookieExpires
- number
- Cookie expiration time in seconds. The default value is `63072000` (two years). Only allowed in root `redocly.yaml`.

---

- respectDNT
- boolean
- When set to `true`, Google Analytics will not be loaded at all for visitors that have "Do Not Track" enabled in their browser. Only allowed in root `redocly.yaml`.

{% /table %}

## Example

```yaml
analytics:
  ga:
    includeInDevelopment: true
    trackingId: GA-MY_TRACKING_ID
    exclude:
      - /private-docs/**
    conversionId: AW-MY_CONVERSION_ID
    floodlightId: DS-MY_FLOODLIGHT_ID
    optimizeId: MY_OPTIMIZE_CONTAINER_ID

    # Only configured globally in the root redocly.yaml
    head: true
    anonymizeIp: true
    respectDNT: true
    cookieExpires: 63072000
```
