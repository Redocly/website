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
# Fullstory Analytics

Integrate Fullstory Analytics into Redocly project to track page views.

## Options

{% table %}

- Option
- Type
- Description

---

- orgId
- string
- Fullstory organization ID

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Fullstory Analytics in development mode and preview builds.
  Default is `false`.

{% /table %}

## Example

```yaml
analytics:
  fullstory:
    includeInDevelopment: true
    orgId: my-org-id
```
