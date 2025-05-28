---
excludeFromSearch: true
---

# `postBodyScripts`


{% admonition type="info" name="Attention" %}
Supported in Developer portal `1.1.0-beta.7` and newer.
{% /admonition %}


## Usage

To insert custom scripts specifically so that they are the last item before the closing </body> tag (the last item to load), list them in the `postBodyScripts` section. Add it to the top level of the `siteConfig.yaml` file.

To insert a script, you can either provide the path to a local file or to a global URL where the script is hosted.

Each of the scripts listed in the `postBodyScripts` section is executed only on the initial site load. All subsequent route changes are handled client-side and the scripts are not executed again.

After every change to the `postBodyScripts` section, you must restart the development server or rebuild the portal for your changes to take effect.


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
postBodyScripts:
  - './scripts/myscript.js'
  - 'https://example.com/script.js'
```
