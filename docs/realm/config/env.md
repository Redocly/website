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
# `env`

The `env` option allows you to customize the `redocly.yaml` configuration based on the current environment.
You can override the configuration by adding the necessary nested options directly or by creating an environment
configuration file in the **root** directory and referencing it in the `env` option.

## Options

{% table %}

- Option
- Type
- Description

---

- preview
- [[Redocly config](./index.md) | [Reference object](#reference-object)]
- Configuration for the preview environment.

---

---

- development
- [[Redocly config](./index.md) | [Reference object](#reference-object)]
- Configuration for the development environment.

---

---

- production
- [[Redocly config](./index.md) | [Reference object](#reference-object)]
- Configuration for the production environment.

---

{% /table %}

### Reference object

{% table %}

- Option
- Type
- Description

---

- $ref
- string
- Environment configuration file name

---

{% /table %}

## Examples

The following example demonstrates how to override specific configuration options inline within the `env` option:

```yaml
env:
  preview:
    breadcrumbs:
      hide: true
    logo:
      image: ./images/custom-logo.png
```

Or how to set the environment configuration for the `preview` environment by referencing an external file:

```yaml
env:
  preview:
    $ref: redocly.preview.yaml
```

The following example shows a `preview` environment configuration file that overrides the default configuration:

`redocly.preview.yaml`

```yaml
breadcrumbs:
  hide: true
logo:
  image: ./images/redocly.png
navbar:
  items:
    - label: External docs
      href: https://redocly.com
```

## Resources

- **[Configuration options](./index.md)** - Explore other project configuration options for comprehensive documentation and platform customization