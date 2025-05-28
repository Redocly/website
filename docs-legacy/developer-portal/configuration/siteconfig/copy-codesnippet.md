---
excludeFromSearch: true
---

# `copyCodeSnippet`

## Usage

Use the `copyCodeSnippet` section to display the copy button in all Markdown code blocks in the portal. The copy button provides a quick and practical way to copy the whole code block to the clipboard in a single action (tap or click).

Add the `copyCodeSnippet` section to the top level of the `siteConfig.yaml` file and configure supported options inside it.


{% admonition type="info" name="Note" %}
The copy button is a global feature that affects all pages in the portal (cannot be configured per-page in the front matter). It is enabled by default starting from the `1.1.0-beta.55` version. To disable it, set `enable: false` in the `copyCodeSnippet` section.
{% /admonition %}


## Options

| Option  | Description |
| ------------- | ------------- |
| `enable`          | When set to `true`, the copy button is displayed in the upper right corner of all Markdown code blocks. The default value is `true`. |
| `buttonText`      | Sets the text displayed on the button. The default value is `Copy`. |
| `tooltipText`     | Sets the text displayed in the tooltip when hovering over the button. The default value is `Copy the code snippet`. |
| `toasterText`     | Sets the text displayed in the notification that appears after successfully copying the code sample. The default value is `Copied`. |
| `toasterDuration` | Specifies how long the notification is visible (in milliseconds). The default value is `1500`. |


## Examples
{% tabs %}
{% tab label="Default settings" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
copyCodeSnippet:
  enable: true
  buttonText: Copy
  tooltipText: Copy the code snippet
  toasterText: Copied
  toasterDuration: 1500
```
{% /tab  %}
{% tab label="Custom settings" %}
```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
copyCodeSnippet:
  enable: true
  buttonText: Click to copy
  tooltipText: Copy code to clipboard
  toasterText: Success!
  toasterDuration: 2000
```
{% /tab  %}
{% /tabs  %}
