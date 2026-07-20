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

{% admonition type="warning" name="Don't use wildcards" %}
Never set `REDOCLY_CORS_ORIGINS` to `*`.
A wildcard lets any website embed your assistant and consume your project's AI search quota and tokens.
List only the origins you trust.
{% /admonition %}

If the embedding page's origin isn't listed in `REDOCLY_CORS_ORIGINS`, the browser blocks the request to `api-url` and the assistant can't respond.
To learn how to work with environment variables, see: [Manage environment variables](../reunite/project/env-variables.md#manage-environment-variables)

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

- locale
- string
- Locale the assistant uses for documentation search.
  Must match the locale with which your content is indexed.
  See [Scope answers to a locale](#scope-answers-to-a-locale).
  Default: `default_locale`.

---

- open
- boolean
- If `true`, the assistant is open when the page loads for the first time.
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

## Configure the assistant with JavaScript

Use `window.RedoclyAssistant.setConfig()` to set or change the config dynamically.
You can use it instead of the matching HTML attributes or alongside them:

```js
window.RedoclyAssistant.setConfig({
  apiUrl: 'https://your-project.com/_ask-ai', // Can be set here instead of the api-url attribute
  locale: 'fr',
});
```

`setConfig()` merges into the config derived from HTML attributes.
Values passed here take priority over the matching attribute, and any attribute not overridden still applies.
It's safe to call `setConfig()` before the `<redocly-ai-assistant>` element is added to the page.
Every current and future instance on the page picks up the merged config.

Because `setConfig()` can supply `api-url` itself, the `api-url` attribute becomes optional when you configure the assistant this way.
The assistant only stays hidden (with a console warning) if neither the attribute nor `setConfig()` provides it.
When a later `setConfig()` call supplies `apiUrl`, the assistant appears — already open if the element has the `open` attribute.

`setConfig()` accepts `apiUrl`, `locale`, and `welcomeMessage` — the same settings the `api-url`, `locale`, and `welcome-message` attributes cover.
Other attributes, such as `trigger-hide`, can't be set this way, but the component re-reads all attributes whenever `setConfig()` runs.
An attribute you change on the element applies together with the next `setConfig()` call.

## Scope answers to a locale

The assistant sends `locale` with every question, and the search returns only documents indexed with that exact locale value.
The value to send depends on how your project's content is organized:

{% table %}

- Project content
- Locale value to send

---

- No localization configured
- Omit `locale` to search all documents, or keep the default `default_locale` — all documents are indexed with that value.

---

- Default-language content in a localized project
- The `defaultLocale` value from your project's [`l10n` configuration](../config/l10n.md), for example `en`.

---

- Translated content
- The locale folder name inside `@l10n`, for example `es-ES` for content in `@l10n/es-ES/`.

{% /table %}

The match is an exact string comparison with no fallback: sending `es` when the content lives in `@l10n/es-ES/` returns no documents, and the assistant answers without documentation context instead of reporting an error.
When the assistant finds nothing for a language that has translated content, verify the value matches the folder name exactly.

### Add a language switcher

Use a single `setConfig()` call to switch the assistant's language and greeting from the host page:

```html
<select id="language-select">
  <option value="en" selected>English</option>
  <option value="es-ES">Español</option>
</select>

<script>
  const welcomeMessages = {
    en: 'Hi! Ask me anything about our APIs.',
    'es-ES': '¡Hola! Pregúntame sobre nuestras APIs.',
  };

  document.getElementById('language-select').addEventListener('change', (event) => {
    const locale = event.target.value;
    window.RedoclyAssistant.setConfig({
      locale,
      welcomeMessage: welcomeMessages[locale],
    });
  });
</script>
```

In this example, `en` is the project's `defaultLocale` and Spanish content lives in `@l10n/es-ES/`, so both values match the indexed documents.

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
- **[`l10n`](../config/l10n.md)** - Configure localization for your project, including the `defaultLocale` the assistant's locale must match
- **[Localize content](../content/localization/localize-content.md)** - Organize translated content in `@l10n` folders whose names double as the assistant's locale values
