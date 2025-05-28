---
excludeFromSearch: true
---

# `scripts`

## Usage

To extend the functionality of your portal with custom scripts, you must define them in the `scripts` section. Add it to the top level of the `siteConfig.yaml` file.

To include a script, you can either provide the path to a local file or to a global URL where the script is hosted.

The scripts are included as-is and are not minified automatically during the portal build, so you have to minify them in some other way beforehand.


{% admonition type="info" name="Related options" %}
Use [stylesheets](stylesheets.md) to add custom CSS to your portal.

To insert scripts as the last item before the </body> tag, use [postBodyScripts](postbody-scripts.md).
{% /admonition %}


## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
scripts:
  - './static/intercom.js'
  - 'https://example.com/script.js'
```

