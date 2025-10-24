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
description: Customize the ai assistant functionality in your project.
---
# `aiAssistant`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

{% $frontmatter.description %}
By default, ai assistant can be accessed by using a floating trigger button in bottom right corner withing search functionality in the top navigation bar in the far right corner.

Use the `aiAssistant` configuration to:

- Hide the ai search option
- Add suggested pages to the search modal
- Set the prompt
- Add an easily accessible "Ask AI" button

{% partial file="../_partials/config/_supported-config.md" variables={"optionName": "aiAssistant"} /%}

## Options

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the AI search button when set to `true`.
  Default: `true`

---

- prompt
- string
- Built-in instructions for AI search.
  Applied to all AI searches in the project and not visible to users.
  Use to set greeting, tone, or other answer conditions.

---

- suggestions
- [string]
- List of suggestions displayed in the AI search interface.

---

- trigger
- [Trigger button](#trigger-button-object)
- Configures the "Ask AI" floating button

{% /table %}

### Trigger button object

{% table %}

- Option
- Type
- Description

---

- hide
- boolean
- Hides the trigger button when set to `true`.
  Default: `false`.

---

- inputType
- string
- Type of UI component used to render trigger button.
  Possible values: `button`, `icon`.
  Default: `button`.

---

- inputIcon
- string
- Icon of the trigger button component.
  Possible values: `redocly`, `sparkles`, `chat`.
  Default: `sparkles`.

{% /table %}

**Data usage and privacy:** Curious how AI Search uses your data?
Redocly AI Search runs in **inference-only mode** and does not train or fine-tune AI models on your content.
For details, see the [AI Search data usage FAQ](../faq/ai-search-privacy.md).

{% admonition type="info" %}
AI search and Typesense search indexes are only built on the production branch.
Changes to search configuration or content exclusions, like the `excludeFromSearch` front matter option, may not immediately appear in search results until the next production build.
{% /admonition %}

## Examples

Display the AI search button with a custom prompt:

```yaml
aiAssistant:
  hide: false
  prompt: Speak only in rhymes
```

Set AI search suggestions:

```yaml
aiAssistant:
  hide: false
  suggestions:
    - How to create a new API?
    - What is Redocly?
    - How to manage an organization?
```

Display the AI Assistant floating button:


```yaml
aiAssistant:
  trigger:
    hide: false
    inputType: button
    inputIcon: redocly
```
