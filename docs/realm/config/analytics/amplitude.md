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
# Amplitude Analytics

Integrate Amplitude Analytics into Redocly project to track page views and outbound link clicks

## Configuration

{% table %}

- Option
- Type
- Description

---

- apiKey
- string
- **REQUIRED.** Amplitude project API key

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Amplitude Analytics in development mode and preview builds.
  Default is `false`.

---

- head
- boolean
- Put tracking scripts in the head tag instead of body

---

- exclude
- [string]
- Do not send page view events on certain pages

---

- pageViewEventName
- String
- Set this option to change the event name for page views.
  Default is `pageView`.

---

- outboundClickEventName
- String
- Set this option to change the event name for outbound link clicks.
  Default is `outboundLinkClick`.

---

- amplitudeConfig
- Amplitude JS SDK options
- Amplitude SDK init options as described in [Amplitude docs](https://www.docs.developers.amplitude.com/data/sdks/javascript/?h=includeutm#configuration)

{% /table %}

## Example

```yaml
analytics:
  amplitude:
    includeInDevelopment: true
    apiKey: my-api-key
    head: true
    respectDNT: true
    exclude:
      - /private-docs/**
    outboundClickEventName: linkClick
    pageViewEventName: routeChange
    amplitudeConfig:
      batchEvents: true
      includeReferrer: true
```
