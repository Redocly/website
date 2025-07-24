---
products:
  - Redoc
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `asyncapi`

{% admonition type="warning" name="Legacy plugin" %}
This page refers to the legacy Redocly AsyncAPI plugin.

AsyncAPI documentation is now supported natively in Realm and requires no configuration.
For information on how to add AsyncAPI description files to your project, see: [Add AsyncAPI descriptions](../author/how-to/add-asyncapi-docs.md).
To migrate to native support for AsyncAPI documentation, see: [Migrate to built-in AsyncAPI docs](../author/how-to/generate-asyncapi-docs.md#migrate-to-built-in-asyncapi-docs).
{% /admonition %}

Customize the behavior and appearance of AsyncAPI documentation. Requires an AsyncAPI definition.

## Options

{% table %}

- Option
- Type
- Description

---

- schemaId
- String
- Schema ID. Defaults to `asyncapi`.

---

- hideInfo
- Boolean
- Set to `true` to hide info section including API title.

---

- hideOperations
- Boolean
- Set to `true` to hide Operations section

---

- hideServers
- Boolean
- Set to `true` to hide Servers section

---

- hideMessages
- Boolean
- Set to `true` to hide Messages section

---

- hideSchemas
- Boolean
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

- Learn more about the [AsyncAPI docs plugin](../setup/reference/plugins/docs/asyncapi.md).
