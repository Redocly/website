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

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

## Configuration

{% table %}

- Option
- Type
- Description

---

- apiKey
- string
- **REQUIRED.**
  Amplitude project API key

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Amplitude Analytics in development mode and preview builds.
  Default: `false`.

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
  Default: `pageView`.

---

- outboundClickEventName
- String
- Set this option to change the event name for outbound link clicks.
  Default: `outboundLinkClick`.

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

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
