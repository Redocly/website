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
# `ignore`

{% admonition type="warning" %}
Changes to the **ignore** configuration in develop mode take effect only after restarting the server.
{% /admonition %}

This configuration option helps to exclude files and folders from the project build without removing the source files from your project.
You can use **glob patterns** to specify which files and folders to ignore, and **negations** to exclude files or directories that would otherwise be ignored by a previous pattern.

## Examples

```yaml
ignore:
  - 'foo/bar.md' # Ignores specific file
  - 'foo' # Ignores specific folder
  - '**/foo/**/*' # Ignores all 'foo' folders
  - '!**/foo/baz.md' # Add exception for 'foo/baz.md'
```

## Resources

- **[Ignore static folders and files](../customization/theme-static-assets.md#ignore-static-folders-and-files)** - Configure which static assets and folders to exclude from your documentation build process
