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

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

## Configuration

{% table %}

- Option
- Type
- Description

---

- scriptUrl
- String
- **REQUIRED.**
  URL of the Adobe Analytics script.
  Find it in the Adobe Analytics admin dashboard.

---

- includeInDevelopment
- Boolean
- Set this option to `true` to enable Adobe Analytics in development mode and preview builds.
  Default: `false`.

---

- pageViewEventName
- String
- Set this option to change the event name for page views.
  Default: `pageView`.

{% /table %}

## Example

```yaml
analytics:
  adobe:
    includeInDevelopment: true
    pageViewEventName: routeChange
    scriptUrl: http://some-script-url.coms/pa-ra-pam-pam-pam.js
```

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
