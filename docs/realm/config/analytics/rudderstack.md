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
# Rudderstack Analytics

Integrate Rudderstack Analytics into Redocly project.

## Configuration

{% table %}

- Option
- Type
- Description

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Rudderstack Analytics in development mode and preview builds.
  Default is `false`.

---

- writeKey
- string
- **REQUIRED.** Rudderstack write key

---

- trackPage
- boolean
- Set this to `false` to disable page visits tracking.
  Defaults to `true`.

---

- dataPlaneUrl
- string
- Set this URL if you need to proxy events through a custom data plane.

---

- controlPlaneUrl
- string
- Set this URL if you are self-hosting the Control Plane

---

- sdkURL
- string
- Set this if you want to serve SDK script from a custom domain

---

- loadOptions
- object
- Rudderstack loading options described in [Rudderstack documentation](https://www.rudderstack.com/docs/sources/event-streams/sdks/rudderstack-javascript-sdk/load-js-sdk/#loading-options)

{% /table %}

## Example

```yaml
analytics:
  rudderstack:
    includeInDevelopment: true
    writeKey: my-write-key
    trackPage: true
    dataPlaneUrl: https://my-data-plane-url.com
    controlPlaneUrl: https://my-control-plane-url.com
    sdkUrl: https://my-custom-sdk-url.com
    loadOptions:
      secureCookie: true
      logLevel: 'INFO'
      useBeacon: true
```
