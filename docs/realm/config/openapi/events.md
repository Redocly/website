---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `events`

Use event hooks to get notified about various user events in your API reference documentation.
This feature provides access to in-page analytics.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "events"} /%}
{% /admonition %}

Each event provides information about a specific event as well as some basic information:

```typescript
    eventType: string;
    resource: string;
    action: string;
    operationId?: string;
    operationPath: string;
    operationHttpVerb: string;
    operationSummary?: string;
```

## Options

{% table %}

- Option
- Type
- Description

---

- codeSamplesLanguageSwitch
- function
- Called when the user switches to a different language tab in the code samples section.
  Provides information about the selected language (lang) and an optional example ID (exampleId).

---

- tryItOpen
- function
- Triggered when the user opens the “Try it” panel.
  Captures actions like opening the panel or navigating using the override links.

---

- targetServerSwitch
- function
- Invoked when the user changes the target server selection.
  Provides the updated server URL (serverUrl).

---

- tryItSent
- function
- Called when the user clicks the “Send” button in the “Try it” panel.
  Captures whether the request was successfully sent (Sent) or if there was a validation failure (ValidationFailed).

---

- panelToggle
- function
- Records when a user expands or collapses any panel in the Reference docs UI (for example, request, responses, request samples, or response samples).
  Includes details about the panel type (panelType) and its state (expanded or collapsed).

---

- codeSamplesCopy
- function
- Triggered when a user copies request or response samples within the Reference docs UI.
  Captures details such as the sample type (request or responses), example ID (if applicable), code sample language (`lang`), and label (`label`).

{% /table %}

## Examples

The following example show the usage of the `events` configuration:

```yaml {% title="redocly.yaml" %}
openapi:
  events:
    codeSamplesLanguageSwitch: '({ lang, label, exampleId}) => {
      console.log(`Switched to language: ${lang}`);
    }'
    tryItOpen: '() => {
      console.log(`Try it panel opened`);
    }'
    targetServerSwitch: '({ serverUrl }) => {
      console.log(`Switched to server: ${serverUrl}`);
    }'
```

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and event configuration principles
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
