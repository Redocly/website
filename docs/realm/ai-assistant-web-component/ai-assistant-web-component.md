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

# AI assistant web component

The AI assistant web component puts the Redocly AI assistant on any web page.
Use it on your app, your marketing site, or your support portal.
It's a standard custom element, added with one `<script>` tag, so it works with any framework.

The widget renders inside a [shadow root](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).
Host-page styles don't affect it, and its styles don't leak onto your page.

The assistant answers from your project's public content by default.
To let it answer from RBAC-protected content as well, add [identity tokens](./identity-tokens.md).

## Before you begin

Make sure you have:

- the [AI assistant](../config/ai-assistant.md) enabled in your project
- the maintainer or admin role for the project
- the origins of every page that embeds the assistant

The assistant sends questions from the host page to your project's own `_ask-ai` endpoint.
That call usually crosses origins.
Point `api-url` at the endpoint on your project's domain, for example `https://docs.example.com/_ask-ai`.

Set the `REDOCLY_CORS_ORIGINS` variable on your project.
List every origin allowed to call the assistant, separated by commas:

```bash
REDOCLY_CORS_ORIGINS=https://docs.example.com,https://www.example.com
```

Each value must match a host page's origin exactly: scheme, host, and port.
If an origin is missing, the browser blocks the request to `api-url`, and the assistant can't answer.
To set the variable, see [Manage environment variables](../reunite/project/env-variables.md#manage-environment-variables).

{% admonition type="warning" name="Don't use wildcards" %}
Never set `REDOCLY_CORS_ORIGINS` to `*`.
A wildcard lets any website embed your assistant and consume your project's quota.
List only the origins you trust.
{% /admonition %}

## Embed the assistant

Configure the assistant in the playground below.
The snippet updates as you change each option.
The preview answers real questions about Redocly docs.

{% aiAssistantPlayground /%}

The script registers the `<redocly-ai-assistant>` element and the `window.RedoclyAssistant` API, and renders a floating **Ask AI** button by default.
After you add the snippet to your page, reload it, select the button, and send a test question.
If the assistant doesn't answer, check that [`REDOCLY_CORS_ORIGINS`](#before-you-begin) lists the page's origin.

For every option the element accepts, see the [attribute reference](./reference.md#attributes).

### Pin a version

The `latest` script URL updates automatically within a minute of each release.
To control when you take updates, pin a release instead: replace `latest` with a version tag, for example `releases/v0.1.0/main.js`.
A pinned URL never changes after publication.

## Control the assistant from your page

To open the assistant from your own UI, hide the floating **Ask AI** button with the `trigger-hide` attribute.
Then drive it with `window.RedoclyAssistant`, which the script adds on load:

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

Users can also start over with the **New conversation** button in the panel header.
It emits the same `reset` [event](./reference.md#events).

## Update configuration at runtime

Use `setConfig()` to change settings at any time.
It works instead of the matching HTML attributes, or alongside them:

```js
window.RedoclyAssistant.setConfig({
  apiUrl: 'https://your-project.com/_ask-ai', // Can be set here instead of the api-url attribute
  locale: 'fr',
  theme: 'dark',
  suggestions: ['Comment s\'authentifier ?'],
});
```

`setConfig()` follows a few rules:

- Values merge over the HTML attributes.
  A key you pass wins; every attribute you don't pass still applies.
- Every current and future assistant on the page picks up the change.
- You can call it before the page adds the `<redocly-ai-assistant>` element.
- Pass `null` to clear all overrides, so the attributes apply again.
- With `apiUrl` set here, the `api-url` attribute is optional.
  Without either, the assistant stays hidden and logs a console warning; it appears as soon as a later call supplies `apiUrl`.

For the full attribute-to-key mapping, see [`setConfig()` keys](./reference.md#setconfig-keys).

## Answer from RBAC-protected content

By default, the assistant answers as an anonymous visitor.
It uses only the content a signed-out reader can open.

To widen that scope for the users signed in to your own app, set up [identity tokens](./identity-tokens.md).
Your backend mints a short-lived JWT naming the user's [RBAC teams](../access/rbac.md).
Your page passes it to the widget, and Redocly verifies it before answering.

## Escalate to your support team

Turn on [support ticket escalation](../reunite/project/ai-assistant.md), and the assistant can show a **Contact support** button.
It appears when the assistant decides a human should take over.
It also appears after a set number of messages, or when a request fails.
Your support email then gets the ticket, the transcript, and the URL of the host page.

Escalation needs no setup on the host page.
Your project's settings decide when to offer support.

## Scope answers to a locale

The `locale` value does two jobs: it scopes the search, and it picks the [interface language](#localize-the-interface).
The two use different matching rules, so read both before you settle on a value.

The assistant sends `locale` with every question.
Search then returns only documents indexed with that exact value.
What to send depends on how you organize your content:

{% table %}

- Project content
- Locale value to send

---

- No localization configured
- Omit `locale` to search all documents, or keep the default `default_locale`; all documents carry that value.

---

- Default-language content in a localized project
- The `defaultLocale` value from your project's [`l10n` configuration](../config/l10n.md), for example `en`.

---

- Translated content
- The locale folder name inside `@l10n`, for example `es-ES` for content in `@l10n/es-ES/`.

{% /table %}

The match is exact, with no fallback.
Send `es` when the content lives in `@l10n/es-ES/`, and search returns nothing.
The assistant then answers with no docs context, rather than report an error.
So when a translated language turns up nothing, check the value against the folder name.

## Localize the interface

The widget ships interface translations for 14 locales, and `locale` picks one.
The panel header, the buttons, the input placeholder, and the support form all follow it.

Translations ship for `ar`, `de`, `en`, `es`, `fr`, `hi`, `it`, `ja`, `ko`, `pl`, `pt`, `pt-BR`, `uk`, and `zh`.

Matching here is more forgiving than the search matching above:

- A regional value falls back to its language, so `ja-JP` uses `ja` and `zh-Hans` uses `zh`.
- A regional table wins where one exists: `pt-BR` gets Brazilian Portuguese, and `pt` gets European Portuguese.
- Anything else stays English, including the default `default_locale` and a locale the widget doesn't ship.

Arabic sets `dir="rtl"` on the element, so the browser mirrors the layout.
So do `fa`, `he`, and `ur`, which set the direction but ship no strings.
Supply theirs with `translations`.

Only the interface translates.
Answers come back in whatever language the model replies in, and the conversation keeps what the user typed.

### Replace individual strings

Pass `translations` to `setConfig()` to override any interface string.
It layers over the bundled table, so a key you leave out keeps its translation:

```js
window.RedoclyAssistant.setConfig({
  locale: 'ja',
  translations: {
    'aiAssistant.contactSupport': 'サポートチームに連絡',
  },
});
```

`translations` has no HTML attribute; set it with `setConfig()`.
For the keys you can pass, see [Translation keys](../content/localization/translation-keys.md).

The label attributes outrank both layers.
An element with `header-title="Acme Support"` keeps that header in every locale.

### Add a language switcher

One `setConfig()` call switches the search scope, the interface, and your own greeting:

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

Here, `en` is the project's `defaultLocale`, and Spanish content lives in `@l10n/es-ES/`.
Both values match the indexed documents, and `es-ES` falls back to the `es` interface strings.
Only `welcomeMessage` needs a value per language, because it is your content rather than widget chrome.

## Customize the appearance

The widget's colors, sizes, fonts, and spacing are CSS custom properties on the component's `:host`.
Override them by targeting the element in your CSS:

```css
redocly-ai-assistant {
  --search-ai-gradient: linear-gradient(to right, #00b8d9, #36b37e);
  --ai-assistant-widget-panel-width: 420px;
}
```

Host-page selectors can't reach into the shadow root.
The header icon has its own variables:

```css
redocly-ai-assistant {
  --ai-assistant-header-icon-display: none;             /* Hide the default Redocly logo */
  --ai-assistant-header-icon-content: url("logo.svg");  /* Or substitute a custom icon */
}
```

To hide the icon, set `--ai-assistant-header-icon-display: none`.
To replace it, set both variables.

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

- **[Reference](./reference.md)** - Every attribute, method, and event
- **[Identity tokens](./identity-tokens.md)** - Answer from RBAC-protected content for signed-in users
- **[Support escalation](../reunite/project/ai-assistant.md)** - Let users send a conversation to your support team
- **[Analytics](../reunite/project/analytics.md)** - Track assistant conversations and feedback
- **[Environment variables](../reunite/project/env-variables.md#manage-environment-variables)** - Set project variables such as `REDOCLY_CORS_ORIGINS`
- **[`aiAssistant`](../config/ai-assistant.md)** - Configure the AI assistant built into your project
- **[`l10n`](../config/l10n.md)** - Set `defaultLocale`, which the assistant's locale must match
- **[Localize content](../content/localization/localize-content.md)** - Name the `@l10n` folders that supply the assistant's locale values
- **[Translation keys](../content/localization/translation-keys.md)** - Every key the `translations` override accepts
