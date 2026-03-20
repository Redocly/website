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
description: Control build-time statistics for OpenAPI descriptions and optional file-extension usage in your documentation project.
---
# `stats`

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

Use the `stats` option to tune what the build collects for **Statistics** (available at the `/stats` route for signed-in users with access).

During the build, Redocly gathers OpenAPI-related metrics
(similar in spirit to the Redocly CLI `stats` command)
and, when enabled, usage counts for content file extensions.
When a metadata output folder is configured for the build,
the same payload can also be written as JSON for downstream tooling.

## Options

{% table %}

- Option
- Type
- Description

---

- fileExtensions
- boolean
- When `true`, the build scans non-virtual content files and records how many files use each extension (for example `.md`, `.yaml`).
  Default: `false`

---

- apis
- array of objects
- Each object must include **`name`** (string) and **`path`** (string). Paths are matched against bundled OpenAPI definition paths after POSIX-style normalization.
  When `apis` contains at least one entry, statistics are computed **only** for those definitions, and the **`name`** values are used as the labels in stats output.
  When `apis` is omitted or not used this way, the build falls back to the top-level [`apis`](./apis.md) map (API keys and `root` paths) if present, and otherwise includes all bundled API descriptions.

{% /table %}

## Example

Restrict stats to two OpenAPI roots and enable file-extension counts:

```yaml
stats:
  fileExtensions: true
  apis:
    - name: Public API
      path: ./openapi/public.yaml
    - name: Internal API
      path: openapi/internal/openapi.yaml
```

## Behavior summary

| Configuration | API statistics scope |
| --- | --- |
| `stats.apis` with one or more entries | Only definitions whose bundled path matches each listed `path` |
| No `stats.apis` (or not used), with top-level `apis` | All bundled definitions, names taken from `apis` keys |
| Otherwise | All bundled definitions |

File-extension statistics are included only when `stats.fileExtensions` is `true`.
