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

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

## Configuration

{% table %}

- Option
- Type
- Description

---

- appId
- string
- **REQUIRED.**
  Heap analytics App ID

---

- includeInDevelopment
- boolean
- Set this option to `true` to enable Heap Analytics in development mode and preview builds.
  Default: `false`.

{% /table %}

## Example

```yaml
analytics:
  heap:
    includeInDevelopment: true
    aooUd: my-app-id
```

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
