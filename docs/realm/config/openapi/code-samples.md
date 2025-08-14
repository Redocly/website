---
products:
  - Redoc
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `codeSamples`

Configure the code samples generated from your OpenAPI description.

{% admonition type="info" %}
{% partial file="../../_partials/config/_unsupported-redoc-ce.md" variables={"optionName": "codeSamples"} /%}
{% /admonition %}

## Options

{% table %}

* Option
* Type
* Description

---

* languages
* [[language object](#language-object)]
*
  **REQUIRED.**
  Array of [language](#language-object) objects, one per language.
  The samples are displayed in the order that they are listed.
  Default array value is:
  ```javascript
  [
    { lang: curl },
    { lang: JavaScript },
    { lang: Node.js },
    { lang: Python },
    { lang: Java },
    { lang: C# },
    { lang: PHP },
    { lang: Go },
    { lang: Ruby },
    { lang: R },
    { lang: Payload }
  ]
  ```

---

* skipOptionalParameters
* boolean
*
  Excludes optional parameters (cookies, headers, query params) from the generated code samples.
  Defaults to `false`.

{% /table %}

### Language object

{% table %}

* Option
* Type
* Description

---

* lang
* string
*
  **REQUIRED.**
  Sets the language to create code samples for.
  Supported values: `curl`, `C#`, `C#+Newtonsoft`, `Go`, `Java`, `Java8+Apache`, `JavaScript`, `Node.js`, `PHP`, `Python`, `R`, `Ruby`.

  {% admonition type="info" %}
    If you specify a language that is not in the list above, you must manually provide the code samples in your OpenAPI description using `x-codeSamples`.

    Automatic code generation is only available for the supported languages.
   {% /admonition %}

---

* label
* string
*
  Custom label to use for the generated code sample. In the _Request samples_ section of your reference docs, the code sample tab uses the custom label instead of the default `lang` value.

{% /table %}

## Examples

The following example generates code samples for five tech stacks, including only the required parameters:

```yaml {% title="redocly.yaml" %}
openapi:
  codeSamples:
    skipOptionalParameters: true
    languages:
      - lang: 'curl'
        label: 'cURL'
      - lang: 'JavaScript'
        label: 'JS'
      - lang: 'Go'
      - lang: 'Ruby'
      - lang: 'Java8+Apache'
        label: 'Java 8'
```

With this configuration, each endpoint has code samples in these five languages generated and displayed in the documentation.

## Resources

- **[OpenAPI configuration](./index.md)** - Complete guide to OpenAPI configuration options for customizing API reference documentation
- **[OpenAPI Specification](https://spec.openapis.org/oas/latest.html)** - Official OpenAPI Specification documentation for understanding API description standards
- **[OpenAPI visual reference](https://redocly.com/learn/openapi/openapi-visual-reference)** - Visual guide to OpenAPI specification structure and code sample implementation
- **[Configuration options](../index.md)** - Explore other project configuration options for comprehensive documentation customization
