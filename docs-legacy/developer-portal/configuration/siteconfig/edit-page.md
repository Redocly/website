---
excludeFromSearch: true
---

# `editPage`

## Usage

Use the `editPage` section to display the edit button above the page table of contents in the top right. Selecting the edit button opens a GitHub or GitLab repository in a new tab.

The `editPage` section should be added to the top level of the `siteConfig.yaml` file.

To override the site-wide configuration, use the `editPage` section [in the front matter](../../guides/markdown.md#editpage) of specific MD(X) pages.

## Options

| Option    | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `baseUrl` | URL of the root folder of your GitHub or GitLab project.         |
| `text`    | Text to display on the edit button. The default value is `Edit`. |
| `icon`    | Path to the image file (svg or png) used as the button icon.     |

## Examples
{% tabs %}
{% tab label="Minimum GitHub configuration" %}
```yaml
editPage:
  baseUrl: https://github.com/github/training-kit
  icon: ./images/pencil.svg
```
{% /tab  %}
{% tab label="GitLab configuration with custom button text" %}
```yaml
editPage:
  baseUrl: https://gitlab.com/gitlab-org/gitlab/-/tree/master/
  text: Contribute to this page
  icon: ./images/pencil.svg
```
{% /tab  %}
{% /tabs  %}
