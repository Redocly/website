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
# `navigation`

Control the previous and next navigation buttons.

## Options

{% table %}

- Option
- Type
- Description

---

- previousButton
- [PageLink object](#pagelink-object)
- Controls the previous page button.

---

- nextButton
- [PageLink object](#pagelink-object)
- Controls the next page button.

{% /table %}

### PageLink object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Specifies if the navigation link button is hidden. Default `false`.

---

- text
- string
- Label text. Default value: `Next page` or `Previous page`.

{% /table %}

## Examples

### Text example

```yaml
navigation:
  nextButton:
    text: → Next page"
  previousButton:
    hide:
    text:
```

### Hide navigation links example

```yaml
navigation:
  nextButton:
    hide: true
  previousButton:
    hide: true
```

## Related options

## Resources
