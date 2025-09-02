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
# Heap Analytics

Integrate Heap Analytics into Redocly project.

## Configuration

{% table %}

- Option
- Type
- Description

---

- appId
- string
- **REQUIRED.** Heap analytics App ID

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Heap Analytics in development mode and preview builds.
  Default is `false`.

{% /table %}

## Example

```yaml
analytics:
  heap:
    includeInDevelopment: true
    aooUd: my-app-id
```
