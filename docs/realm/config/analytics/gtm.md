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
# Google Tag Manager analytics

Integrate Google Tag Manager into Redocly project.

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

## Configuration

{% table %}

- Option
- Type
- Description

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable GTM Analytics in development mode and preview builds.
  Default: `false`.

---

- trackingId
- string
- **REQUIRED**GTM tracking ID

---

- gtmAuth
- string
- GTM environment auth string

---

- gtmPreview
- string
- GTM environment preview name

---

- defaultDataLayer
- object
- An arbitrary data layer object.
  Redocly sets it before GTM loads.

---

- dataLayerName
- string
- Name of GTM datalayer

---

- enableWebVitalsTracking
- boolean
- Enable web vitals tracking

---

- selfHostedOrigin
- string
- Set this for custom GTM server hosting

---

- pageViewEventName
- String
- Set this option to change the event name for page views.
  Default: `pageView`.

{% /table %}

## Example

```yaml
analytics:
  gtm:
    includeInDevelopment: true
    trackingId: my-tracking-id
    gtmAuth: my-gtm-auth-string
    gtmPreview: my-gtm-preview-name
    defaultDataLayer:
      platform: redocly
    dataLayerName: my-data-layer-name
    enableWebVitalsTracking: true
    selfHostedOrigin: http://my-gtm-server-host.com
    pageViewEventName: routeChange
```

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
