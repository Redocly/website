---
description: Store the environments the Replay desktop app uses to send requests.
---
# `replay`

## Introduction

The `replay` section holds the environments the Replay desktop app sends requests with: named sets of input values and server URLs.
Replay maintains this section itself as you edit environments in the app.

Other Redocly products ignore this section; it has no effect on a site build.

## Options

{% table %}

- Option
- Type
- Description

---

- environments
- [Environments object](#environments-object)
- Named environments available in the app.

{% /table %}

### Environments object

{% table %}

- Option
- Type
- Description

---

- `{name}`
- [Environment object](#environment-object)
- Each environment needs a name, which is what the app shows in its environment picker.

{% /table %}

### Environment object

{% table %}

- Option
- Type
- Description

---

- inputs
- Map[string, string or [Secret object](#secret-object)]
- Values available to requests and workflows in this environment.
  A number or boolean is read as text and quoted the next time the app saves.
  Use a secret object to keep the value out of the file.

---

- servers
- Map[string, [Server object](#server-object)]
- Server URL to use per API, keyed by the path of the API description file relative to the project folder.

{% /table %}

### Secret object

{% table %}

- Option
- Type
- Description

---

- provider
- string
- **REQUIRED**.
  Where the app resolves the value from.
  Only `local` is supported: the value is stored on your machine, outside this file.

{% /table %}

### Server object

{% table %}

- Option
- Type
- Description

---

- value
- string
- **REQUIRED**.
  Server URL to send requests to.
  May contain `{variable}` placeholders.

---

- variables
- Map[string, string]
- Values for the placeholders in `value`.

{% /table %}

## Examples

```yaml
replay:
  environments:
    default:
      inputs:
        petId: '42'
      servers:
        openapi/museum.yaml:
          value: https://api.example.com/v1
    staging:
      inputs:
        apiKey:
          provider: local
      servers:
        openapi/museum.yaml:
          value: https://{region}.staging.example.com/v1
          variables:
            region: eu
```

## Related options

- [`apis`](./apis.md) — the API descriptions in the project
- [`env`](./env.md) — per-environment overrides for a site build, unrelated to Replay environments
