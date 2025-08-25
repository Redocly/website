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
# `scripts`

To insert custom scripts in the head or body of a page.

## Options

{% table %}

- Option
- Type
- Description

---

- head
- [[Script object](#script-object)]
- Inserts scripts in the head tags of the page.

---

- body
- [[Script object](#script-object)]
- Inserts scripts before the close body tag of the page.

{% /table %}

### Script object

{% table %}

- Option
- Type
- Description

---

- src
- string
- **REQUIRED.**
  URL or path to script.

---

- inline
- boolean
- Inlines the script content into the page. Improves performance for small scripts.
  Default value: `false`.

---

- async
- boolean
- Specifies to add the `async` attribute to the script tag.
  Default value: `false`.

---

- crossorigin
- string
- Adds the `crossorigin` attribute with corresponding value to the script tag.

---

- defer
- boolean
- Specifies to add the `defer` attribute to the script tag.
  Default value: `false`.

---

- fetchpriority
- string
- Adds the `fetchpriority` attribute with corresponding value to the script tag.
  Possible values: `high`, `low`, or `auto`.
  Default value: `auto`.

---

- integrity
- string
- Adds the `integrity` attribute with corresponding value to the script tag.

---

- module
- boolean
- Specifies to add the `module` attribute to the script tag.
  Default value: `false`.

---

- nomodule
- boolean
- Specifies to add the `nomodule` attribute to the script tag.
  Default value: `false`.

---

- nonce
- string
- Adds the `nonce` attribute with corresponding value to the script tag.

---

- referrerpolicy
- string
- Adds the `referrerpolicy` attribute with corresponding value to the script tag.
  Possible values: `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `same-origin`, `strict-origin`, `strict-origin-when-cross-origin`, `unsafe-url`, `''`.
  Default value: `strict-origin-when-cross-origin` (with fallback to `''`).

---

- type
- string
- Adds the `type` attribute with corresponding value to the script tag.

{% /table %}

## Examples

### Add scripts to page header and body

```yaml
scripts:
  head:
    - src: 'https://example.com/script.js'
    - src: ./scripts/script.js
  body:
    - src: 'https://analytics.google.com/ga.js'
      crossorigin: anonymous
      defer: true
```

This configuration produces the following script tags:

```html
  <script src="https://example.com/script.js"></script>
  <script src="/static/script.abf4dc37439374dfa2.js"></script>
</head>
<body>
  ...
  <script src="https://analytics.google.com/ga.js" crossorigin="anonymous" defer>
</body>
```

### Add cookie blocking scripts

The following configuration adds OneTrust's Cookie Auto-Blocking script and an initialization script for OneTrust's cookie consent and privacy compliance platform:

```yaml {% title="redocly.yaml" %}
scripts:
  head:
    - src: https://cdn.cookielaw.org/consent/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/OtAutoBlock.js
      type: text/javascript
    - src: https://cdn.cookielaw.org/scripttemplates/otSDKStub.js
      data-document-language: "true"
      data-domain-script: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
      type: text/javascript
      charset: UTF-8
```

## Resources

- **[Configure links](./links.md)** - Configure link behavior and styling to work seamlessly with custom scripts and interactive elements
- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization