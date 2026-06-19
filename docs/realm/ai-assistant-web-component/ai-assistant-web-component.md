---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
excludeFromSearch: true
---

# AI assistant web component

The AI assistant web component embeds the Redocly AI assistant on any web page with a single `<script>` tag and a custom HTML element.
It's a standard custom element, so you can add it to any site or app, regardless of framework.

{% admonition type="info" name="Early access" %}
The AI assistant web component is an **early access** release.
The API, attributes, and CDN URL may change in future versions.

For now, the assistant works only with **publicly accessible docs**.
{% /admonition %}

## Before you begin

The assistant sends questions from the host page to your project's `_ask-ai` endpoint, usually across origins.
Set the `REDOCLY_CORS_ORIGINS` environment variable on your project to a comma-separated list of origins allowed to call the assistant:

```bash
REDOCLY_CORS_ORIGINS=https://docs.example.com,https://www.example.com
```

Each value in the comma-separated list must exactly match the origin (scheme, host, and port) of a page that embeds the component.

{% admonition type="warning" name="Don't use a wildcard" %}
Don't set `REDOCLY_CORS_ORIGINS` to `*`.
A wildcard lets any website embed your assistant and consume your project's AI search quota and tokens.
List only the origins you trust.
{% /admonition %}

{% admonition type="warning" name="Required for embedding" %}
If the embedding page's origin isn't listed in `REDOCLY_CORS_ORIGINS`, the browser blocks the request to `api-url` and the assistant can't respond.
[Manage environment variables](../reunite/project/env-variables.md#manage-environment-variables)
{% /admonition %}

## Add the web component

Load the script from the Redocly CDN:

```html
https://cdn.redocly.com/ai-assistant/releases/latest/main.js
```

It registers the `<redocly-ai-assistant>` element and the `window.RedoclyAssistant` API on load, so you can add the element directly:

```html
<script src="https://cdn.redocly.com/ai-assistant/releases/latest/main.js"></script>

<redocly-ai-assistant
  api-url="https://your-project.com/_ask-ai"
  welcome-message="Hi! I'm the Acme docs bot. Ask me anything."
></redocly-ai-assistant>
```

Set `api-url` to your project's URL followed by `/_ask-ai`, for example `https://your-project.com/_ask-ai`.

By default, the component renders a floating **Ask AI** button.
To hide it and control the assistant from your own UI, add the [`trigger-hide`](#properties) attribute and use the [programmatic control API](#control-the-assistant-programmatically).

The widget mounts inside a [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), so host-page styles don't affect it and its styles don't leak onto your page.

## Properties

Set these attributes on the `<redocly-ai-assistant>` element.

{% table %}

- Property
- Type
- Description

---

- api-url
- string
- URL of the `_ask-ai` endpoint the assistant sends questions to.
  Required.

---

- welcome-message
- string
- First message the assistant shows when opened.
  When omitted, no greeting is displayed.

---

- trigger-hide
- boolean
- Hides the built-in floating **Ask AI** button so you can open the assistant from your own UI.
  Default: `false`.

---

- open
- boolean
- Whether the assistant is open when the page first loads.
  Default: `false`.

{% /table %}

## Control the assistant programmatically

The script adds a `window.RedoclyAssistant` object that controls every assistant on the page:

```js
window.RedoclyAssistant.open();    // Open all assistants on the page
window.RedoclyAssistant.close();   // Close all assistants on the page
window.RedoclyAssistant.toggle();  // Toggle all assistants on the page
window.RedoclyAssistant.isOpen;    // true when at least one assistant is open
```

The component dispatches a `redocly-assistant:change` event on `window` when it opens or closes:

```js
window.addEventListener('redocly-assistant:change', (event) => {
  console.log(event.detail.isOpen);  // boolean: open or closed
  console.log(event.detail.element); // the <redocly-ai-assistant> element that changed
});
```

## Customize the appearance

Theme values are CSS custom properties defined on the component's `:host`.
Target the element in your CSS to override them, such as colors, sizes, fonts, and spacing:

```css
redocly-ai-assistant {
  --search-ai-gradient: linear-gradient(to right, #00b8d9, #36b37e);
  --ai-assistant-widget-panel-width: 420px;
}
```

Host-page selectors can't reach inside the shadow root, so the header icon uses dedicated variables:

```css
redocly-ai-assistant {
  --ai-assistant-header-icon-display: none;             /* Hide the default Redocly logo */
  --ai-assistant-header-icon-content: url("logo.svg");  /* Or substitute a custom icon */
}
```

To hide the icon, set `--ai-assistant-header-icon-display: none`.
To replace it, set both variables.

## Resources

- **[Environment variables](../reunite/project/env-variables.md#manage-environment-variables)** - Learn how to define and manage environment variables for your project, including `REDOCLY_CORS_ORIGINS`
- **[`aiAssistant`](../config/ai-assistant.md)** - Configure the AI assistant and AI search built into your Redocly project
