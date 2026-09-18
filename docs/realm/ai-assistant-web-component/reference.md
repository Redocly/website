---
products:
  - Redoc
  - Revel
  - Reef
  - Realm
plans:
  - Enterprise
  - Enterprise+
---

# Web component reference

Every attribute, method, and event of the [AI assistant web component](./ai-assistant-web-component.md).

## Attributes

Set these attributes on the `<redocly-ai-assistant>` element.
Boolean attributes (`open`, `trigger-hide`, and `resizable`) are true when present, and false when set to `"false"`.

The component drops an attribute whose value isn't one of the listed possible values, and logs a console warning.

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
  You can supply it through [`setConfig()`](#setconfig-keys) instead of the attribute.

---

- open
- boolean
- If `true`, the assistant is open when the page loads for the first time.
  Default: `false`.

---

- trigger-hide
- boolean
- Hides the built-in floating **Ask AI** button, so you can open the assistant from your own UI.
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
  When omitted, the assistant shows no greeting.

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
  A path, URL, or data URI renders as an image; any other value, such as an emoji or a letter, renders as text.
  When omitted, the component shows the Redocly mark.

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
- Locale the assistant uses for search, and the one it renders its interface in.
  Search needs an exact match with the locale your content carries in the index; the interface falls back by language.
  See [Scope answers to a locale](./ai-assistant-web-component.md#scope-answers-to-a-locale) and [Localize the interface](./ai-assistant-web-component.md#localize-the-interface).
  Default: `default_locale`.

---

- product
- string
- Limits search to one product in a multi-product project.
  Use the product's `name` from your project's [`products` config](../config/products.md), for example `Museum`.

---

- version-folder
- string
- Scopes search to one API version: the version folder name.
  Set it with `version-label`; the component ignores the pair when either is missing.
  Other APIs still contribute their default versions, and non-versioned content is always included.

---

- version-label
- string
- Scopes search to one API version: the version label.
  Set it together with `version-folder`.

{% /table %}

## JavaScript API

The script adds `window.RedoclyAssistant` on load.
Each method acts on every `<redocly-ai-assistant>` element on the page.

### Methods and properties

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
  See [Update configuration at runtime](./ai-assistant-web-component.md#update-configuration-at-runtime).

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

Three more keys work the other way round, and have no attribute:

{% table %}

- setConfig() key
- Type
- Description

---

- identityToken
- string
- JWT that unlocks RBAC-protected content.
  See [Identity tokens](./identity-tokens.md).

---

- getIdentityToken
- function
- Resolves `identityToken` before each request, and may return a promise.
  Wins over `identityToken` when you pass both.

---

- translations
- Map[string, string]
- Interface strings that replace the bundled ones for the active `locale`.
  A key you leave out keeps its bundled translation, and a label attribute still outranks both.
  See [Localize the interface](./ai-assistant-web-component.md#localize-the-interface).

{% /table %}

## Events

The component dispatches events on `window`, so the host page can react to what happens inside the assistant.
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
- A question went out.
  `detail.question` holds the question text.

---

- redocly-assistant:response
- The assistant finished answering.
  `detail` holds `question`, `answer`, `resources`, `conversationId`, and `messageId`.

---

- redocly-assistant:error
- A request to the assistant failed.
  `detail.error` holds the error message.

---

- redocly-assistant:reset
- The assistant cleared the conversation.

---

- redocly-assistant:feedback
- The user rated an answer.
  `detail` holds `messageId`, `feedback` (`like` or `dislike`), and, for a dislike with an explanation, `reason`.

---

- redocly-assistant:identity-expired
- Redocly rejected the [identity token](./identity-tokens.md) the page supplied.
  `detail.status` holds `invalid` or `expired`.
  Never fires for a page that supplies no token.

---

- redocly-assistant:change
- The assistant opened or closed.
  `detail` holds `isOpen` and `element`.

{% /table %}

For example, to track answer ratings with your own analytics:

```js
window.addEventListener('redocly-assistant:feedback', (event) => {
  const { feedback, messageId, reason } = event.detail;
  analytics.track('assistant_feedback', { feedback, messageId, reason });
});
```

## Resources

- **[AI assistant web component](./ai-assistant-web-component.md)** - Embed the assistant on any web page
- **[Identity tokens](./identity-tokens.md)** - Answer from RBAC-protected content for signed-in users
- **[Translation keys](../content/localization/translation-keys.md)** - Every key the `translations` override accepts
- **[Support escalation](../reunite/project/ai-assistant.md)** - Let users send a conversation to your support team
- **[`aiAssistant`](../config/ai-assistant.md)** - Configure the AI assistant built into your project
