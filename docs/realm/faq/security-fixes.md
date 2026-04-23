# Security vulnerability fixes

Redocly actively monitors its product packages for known security vulnerabilities and follows a defined process to address them.

## How we detect vulnerabilities

We run automated daily audits against the published stable versions of our packages.
When a vulnerability is found in the dependency tree, our engineering team triages the advisory and determines the appropriate fix.

## How we release fixes

Redocly follows a monthly release cycle for stable versions.
Security fixes are released as patches between stable releases according to the following policy:

{% table %}

- Severity
- Release timeline

---

- **Critical**
- A dedicated patch release is published as soon as the fix is ready.

---

- **High, Moderate, Low**
- Fixes are accumulated and released as a single patch within 14 days of the most recent stable release.

{% /table %}

All security patches include a changeset entry in the [changelog](../changelog.page.tsx), so you can track exactly what was fixed.

## Stay up to date

- **Reunite users** — if your project does not pin a version in `package.json`, it picks up the latest version automatically on each build.
    If you do pin a version, update it in `package.json` and trigger a new build.
- **Local development users** — update the version in your `package.json` and reinstall dependencies.
    See [Upgrade product version](../get-started/upgrade-realm-version.md) for detailed instructions.

## Report a vulnerability

If you discover a security vulnerability in a Redocly product, please contact us at [security@redocly.com](mailto:security@redocly.com).
