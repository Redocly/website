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

The AI assistant web component embeds the Redocly AI assistant on any web page: your app, your marketing site, or your support portal.
It's a standard custom element, added with a single `<script>` tag, so it works with any framework.
The widget renders inside a [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).
Host-page styles don't affect it and its styles don't leak onto your page.

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
A wildcard lets any website embed your assistant and consume your project's quota.
List only the origins you trust.
{% /admonition %}

If the embedding page's origin isn't listed in `REDOCLY_CORS_ORIGINS`, the browser blocks the request to `api-url` and the assistant can't respond.
To learn how to work with environment variables, see [Manage environment variables](../reunite/project/env-variables.md#manage-environment-variables).

## Install and configure

Configure the assistant in the playground.
The install snippet updates as you change each option, and the preview is a live assistant that answers questions about Redocly docs.

{% aiAssistantPlayground /%}

The script registers the `<redocly-ai-assistant>` element and the `window.RedoclyAssistant` API, and renders a floating **Ask AI** button by default.
After you add the snippet to your page, reload it, select the button, and send a test question.
If the assistant doesn't answer, check that the page's origin is listed in [`REDOCLY_CORS_ORIGINS`](#before-you-begin).

The `latest` script URL updates automatically within a minute of each release.
To control when you take updates, pin a release instead: replace `latest` with a version tag, for example `releases/v0.1.0/main.js`.
A pinned URL never changes after publication.

## Let users escalate to support

When [support ticket escalation](../reunite/project/ai-assistant.md) is configured for your project, the assistant can show a **Contact support** button.
The button appears when the assistant decides a human is needed, when the conversation reaches a configured length, or when a request fails.
The submitted ticket is delivered to your support email together with the conversation transcript and the URL of the embedding page.

Escalation requires no setup on the embedding page: the decision to offer support comes from your project's settings.

## Control the assistant programmatically

To open the assistant from your own UI, hide the floating **Ask AI** button with the `trigger-hide` attribute and use the `window.RedoclyAssistant` object.
The script adds it on load, and it controls every assistant on the page:

```js
window.RedoclyAssistant.open();    // Open all assistants on the page
window.RedoclyAssistant.close();   // Close all assistants on the page
window.RedoclyAssistant.toggle();  // Toggle all assistants on the page
window.RedoclyAssistant.ask('How do I authenticate?');  // Send a question
window.RedoclyAssistant.reset();   // Start a fresh conversation
window.RedoclyAssistant.isOpen;    // true when at least one assistant is open
```

`ask()` opens the assistant before sending the question.
Pass `{ open: false }` as the second argument to send it without opening.

Users can also start over with the **New conversation** button in the panel header; it emits the same `reset` [event](#event-reference).

## Update configuration at runtime

Use `window.RedoclyAssistant.setConfig()` to set or change the config dynamically.
You can use it instead of the matching HTML attributes or alongside them:

```js
window.RedoclyAssistant.setConfig({
  apiUrl: 'https://your-project.com/_ask-ai', // Can be set here instead of the api-url attribute
  locale: 'fr',
  theme: 'dark',
  suggestions: ['Comment s\'authentifier ?'],
});
```

`setConfig()` follows a few rules:

- Values merge over the HTML attributes: a key you pass wins, and every attribute you don't pass still applies.
- Every current and future assistant on the page picks up the change.
- You can call it before the `<redocly-ai-assistant>` element is added to the page.
- Pass `null` to clear all overrides, so the attributes apply again.
- With `apiUrl` set here, the `api-url` attribute is optional.
  Without either, the assistant stays hidden and logs a console warning; it appears as soon as a later call supplies `apiUrl`.

For the full attribute-to-key mapping, see [`setConfig()` keys](#setconfig-keys).

## Scope answers to a locale

The assistant sends `locale` with every question, and the search returns only documents indexed with that exact locale value.
The value to send depends on how your project's content is organized:

{% table %}

- Project content
- Locale value to send

---

- No localization configured
- Omit `locale` to search all documents, or keep the default `default_locale`; all documents are indexed with that value.

---

- Default-language content in a localized project
- The `defaultLocale` value from your project's [`l10n` configuration](../config/l10n.md), for example `en`.

---

- Translated content
- The locale folder name inside `@l10n`, for example `es-ES` for content in `@l10n/es-ES/`.

{% /table %}

The match is an exact string comparison with no fallback: sending `es` when the content lives in `@l10n/es-ES/` returns no documents.
The assistant then answers without documentation context instead of reporting an error.
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

The widget's colors, sizes, fonts, and spacing are CSS custom properties defined on the component's `:host`.
Override them by targeting the element in your CSS:

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

## Attribute reference

Set these attributes on the `<redocly-ai-assistant>` element.
Boolean attributes (`open`, `trigger-hide`, `resizable`) are true when present and false when set to `"false"`.

### Behavior

{% table %}

- Attribute
- Type
- Description

---

- api-url
- string
- **REQUIRED.**
  URL of the `_ask-ai` endpoint the assistant sends questions to.
  Can also be supplied with [`setConfig()`](#update-configuration-at-runtime) instead of the attribute.

---

- open
- boolean
- If `true`, the assistant is open when the page loads for the first time.
  Default: `false`.

---

- trigger-hide
- boolean
- Hides the built-in floating **Ask AI** button so you can open the assistant from your own UI.
  Default: `false`.

{% /table %}

### Text and branding

{% table %}

- Attribute
- Type
- Description

---

- welcome-message
- string
- First message the assistant shows when opened.
  When omitted, no greeting is displayed.

---

- suggestions
- [string]
- Starter questions shown as a clickable list while the conversation is empty.
  Pass a JSON array of strings, for example `suggestions='["How do I authenticate?"]'`.
  Selecting a suggestion sends it as a question.

---

- suggestions-heading
- string
- Heading displayed above the starter questions.
  Default: `Suggestions`.

---

- header-title
- string
- Panel header text.
  Default: `AI Assistant`.

---

- logo
- string
- Header icon.
  A path, URL, or data URI renders as an image; any other value (an emoji, a letter) renders as text.
  When omitted, the Redocly mark is displayed.

---

- trigger-text
- string
- Label of the floating button.
  Default: `Ask AI`.

---

- placeholder
- string
- Input placeholder shown while the conversation is empty.

---

- disclaimer
- string
- Small-print text displayed under the input, for example "AI responses may contain mistakes."
  Rendered only when provided.

{% /table %}

### Appearance and position

{% table %}

- Attribute
- Type
- Description

---

- theme
- string
- Color scheme of the assistant.
  Possible values: `light`, `dark`, `system` (follows the user's `prefers-color-scheme`).
  Default: `light`.

---

- variant
- string
- Presentation of the assistant panel.
  Possible values: `widget` (popover anchored to the floating button), `modal` (centered dialog), `panel` (side drawer).
  Default: `widget`.

---

- side
- string
- Screen edge for the floating button; the popover and drawer anchor near it.
  Possible values: `bottom`, `top`, `left`, `right`, `inline-start`, `inline-end`.
  Default: `bottom`.

---

- align
- string
- Alignment along the chosen edge.
  Possible values: `start`, `center`, `end`.
  Default: `end`.

---

- width
- string
- Initial panel width as a CSS length, for example `480px` or `40vw`.
  Applies to every variant.

---

- height
- string
- Initial panel height as a CSS length.
  The full-height `panel` variant ignores it.

---

- resizable
- boolean
- Lets users resize the panel by dragging its edge.
  Default: `false`.

{% /table %}

### Answer scope

{% table %}

- Attribute
- Type
- Description

---

- locale
- string
- Locale the assistant uses for documentation search.
  Must match the locale with which your content is indexed.
  See [Scope answers to a locale](#scope-answers-to-a-locale).
  Default: `default_locale`.

---

- product
- string
- Limits documentation search to one product in a multi-product project.
  Use the product's `name` from your project's [`products` configuration](../config/products.md), for example `Museum`.

---

- version-folder
- string
- Scopes documentation search to one API version: the version folder name.
  Set together with `version-label`; the pair is ignored when either is missing.
  Other APIs still contribute their default versions, and non-versioned content is always included.

---

- version-label
- string
- Scopes documentation search to one API version: the version label.
  Set together with `version-folder`.

{% /table %}

## JavaScript API reference

### Methods

The `window.RedoclyAssistant` object exposes these methods and properties.
Each method acts on every `<redocly-ai-assistant>` instance on the page.

{% table %}

- Method
- Description

---

- open()
- Opens the assistant.

---

- close()
- Closes the assistant.

---

- toggle()
- Toggles the assistant.

---

- ask(question, options)
- Sends a question.
  Opens the assistant first unless `options` is `{ open: false }`.

---

- reset()
- Clears the conversation, the same as the **New conversation** button.

---

- setConfig(config)
- Sets or merges configuration at runtime.
  See [Update configuration at runtime](#update-configuration-at-runtime).

---

- isOpen
- Property that reads `true` while at least one assistant on the page is open.

{% /table %}

### setConfig() keys

`setConfig()` accepts the camelCase form of each attribute:

{% table %}

- Attribute
- setConfig() key

---

- theme, variant, side, align, width, height, product, locale, logo, suggestions, placeholder, disclaimer
- Same name as the attribute.

---

- api-url
- apiUrl

---

- welcome-message
- welcomeMessage

---

- suggestions-heading
- suggestionsHeading

---

- header-title
- headerTitle

---

- trigger-text
- triggerText

---

- version-folder, version-label
- version, as an object: `{ folder: '...', label: '...' }`

{% /table %}

`open`, `trigger-hide`, and `resizable` have no `setConfig()` key; set them as attributes.

## Event reference

The component dispatches events on `window` so the host page can react to what happens inside the assistant.
Every event's `detail` includes `element`, the `<redocly-ai-assistant>` element that emitted it.

{% table %}

- Event
- Description

---

- redocly-assistant:open
- The assistant opened.

---

- redocly-assistant:close
- The assistant closed.

---

- redocly-assistant:ask
- A question was sent.
  `detail.question` contains the question text.

---

- redocly-assistant:response
- The assistant finished answering.
  `detail` contains `question`, `answer`, `resources`, `conversationId`, and `messageId`.

---

- redocly-assistant:error
- A request to the assistant failed.
  `detail.error` contains the error message.

---

- redocly-assistant:reset
- The conversation was cleared.

---

- redocly-assistant:feedback
- The user rated an answer.
  `detail` contains `messageId`, `feedback` (`like` or `dislike`), and, for a dislike with an explanation, `reason`.

---

- redocly-assistant:change
- The assistant opened or closed.
  `detail` contains `isOpen` and `element`.

{% /table %}

For example, to track answer ratings with your own analytics:

```js
window.addEventListener('redocly-assistant:feedback', (event) => {
  const { feedback, messageId, reason } = event.detail;
  analytics.track('assistant_feedback', { feedback, messageId, reason });
});
```

## Content Security Policy

If your site sets a `Content-Security-Policy` header, extend it with the sources the widget needs.
For a page embedding the assistant from `https://your-project.com`:

```http
Content-Security-Policy:
  script-src 'self' https://cdn.redocly.com;
  connect-src 'self' https://your-project.com;
  style-src 'self' 'unsafe-inline'
```

{% table %}

- Directive {% width="18%" %}
- Source {% width="34%" %}
- Required for

---

- script-src
- `https://cdn.redocly.com`
- The widget bundle.

---

- connect-src
- Your `api-url` origin
- The streamed `_ask-ai` answer, and the feedback and escalation endpoints on the same origin.

---

- style-src
- `'unsafe-inline'`
- Styles the widget injects into its shadow root.
  The widget doesn't support CSP nonces, so `'unsafe-inline'` also permits every other inline style on the page.

---

- img-src
- Your logo's origin, or `data:`
- Loading a custom `logo` image or data URI.

{% /table %}

The widget needs no `font-src` (it uses the system font stack) and no `frame-src` (it creates no iframes).

## Resources

- **[Configure AI assistant support escalation](../reunite/project/ai-assistant.md)** - Let end users escalate a conversation to your support team from the embedded assistant
- **[Analytics](../reunite/project/analytics.md)** - Track assistant conversations and feedback for your project
- **[Environment variables](../reunite/project/env-variables.md#manage-environment-variables)** - Learn how to define and manage environment variables for your project, including `REDOCLY_CORS_ORIGINS`
- **[`aiAssistant`](../config/ai-assistant.md)** - Configure the AI assistant built into your project
- **[`l10n`](../config/l10n.md)** - Configure localization for your project, including the `defaultLocale` the assistant's locale must match
- **[Localize content](../content/localization/localize-content.md)** - Organize translated content in `@l10n` folders whose names double as the assistant's locale values
