---
products:
  - Redoc
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `asyncapi`

Customize the behavior and appearance of AsyncAPI documentation.
Requires an AsyncAPI definition.

## Options

{% table %}

- Option
- Type
- Description

---

- schemaId
- string
- Schema ID.
  Defaults to `asyncapi`.

---

- hideInfo
- boolean
- Set to `true` to hide info section including API title.

---

- hideOperations
- boolean
- Set to `true` to hide Operations section

---

- hideServers
- boolean
- Set to `true` to hide Servers section

---

- hideMessages
- boolean
- Set to `true` to hide Messages section

---

- hideSchemas
- boolean
- Set to `true` to hide Schemas section

{% /table %}

## Examples

### Change default schema id and hide servers section

```yaml
plugins:
  # Enable plugin in project
  - '@redocly/portal-plugin-async-api/plugin.js'
asyncapi:
  schemaId: StreetlightAPI
  hideServers: true
```

### Change default schema id and show all the sections except schemas section

```yaml
plugins:
  # Enable plugin in project
  - '@redocly/portal-plugin-async-api/plugin.js'
asyncapi:
  schemaId: StreetlightAPI
  hideErrors: false
  hideInfo: false
  hideOperations: false
  hideServers: false
  hideMessages: false
  hideSchemas: true
```

## Resources

- **[Supported AsyncAPI extensions](../content/api-docs/asyncapi-extensions/index.md)** - Complete list of all AsyncAPI extensions supported by Redocly for enhanced API documentation
