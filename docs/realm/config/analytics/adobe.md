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
# Adobe Analytics

Integrate Adobe Analytics into Redocly project to track page views

## Configuration

{% table %}

- Option
- Type
- Description

---

- scriptUrl
- String
- **REQUIRED.** URL of the Adobe Analytics script (can be found in the Adobe Analytics admin dashboard).

---

- includeInDevelopment
- Boolean
- Set this option to `true` to enable Adobe Analytics in development mode and preview builds.
  Default is `false`.

---

- pageViewEventName
- String
- Set this option to change the event name for page views.
  Default is `pageView`.

{% /table %}

## Example

```yaml
analytics:
  adobe:
    includeInDevelopment: true
    pageViewEventName: routeChange
    scriptUrl: http://some-script-url.coms/pa-ra-pam-pam-pam.js
```
