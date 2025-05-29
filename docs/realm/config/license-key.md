---
rbac:
  Employee: read
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---
# `licenseKey`

{% admonition type="warning" name="Attention" %}
Applies only to on-premise project deployments, and requires an enterprise-plus-class plan.
{% /admonition %}

To build the developer project on-premise, you must provide your Redocly license key as the value of the `licenseKey` property. Add it to the top level of the `redocly.yaml` file.

## Options

The `licenseKey` accepts a string value.

## Examples

```yaml
licenseKey: ABCD-1234-WXYZ-5678
```

## Related options

## Resources
