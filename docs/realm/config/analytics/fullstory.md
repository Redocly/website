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

With the [`consent`](../consent.md) option on, this integration loads only while the consent state allows the analytics category.
In `opt-in` mode the visitor must accept first.
In `opt-out` mode the category starts on and stays on until the visitor refuses.

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
  Default: `false`.

{% /table %}

## Example

```yaml
analytics:
  fullstory:
    includeInDevelopment: true
    orgId: my-org-id
```

## Resources

- **[Analytics configuration](./index.md)** - Explore configuration for popular analytics providers
