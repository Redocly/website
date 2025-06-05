# Gravitee SSO provider plugin

The Gravitee SSO provider plugin enables Gravitee as an SSO provider for your organization.
When using Gravitee as an SSO provider, users can log in to your organization with their Gravitee username and password.
Using Gravitee as an SSO provider also allows you to store Gravitee API access tokens which are used to seamlessly access Gravitee apps in [developer onboarding](../../../../config/developer-onboarding/index.md).

## NPM package

Add the following NPM package to enable the Gravitee SSO Provider plugin: `@redocly/portal-plugin-gravitee-sso`

## Configuration

Configure Gravitee SSO under the `sso` property in your `redocly.yaml` file, the same way you would configure any of the other [SSO providers](../../../../config/sso.md).

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Specifies the type of identity provider.
  Possible value: `GRAVITEE`.

---

- title
- string
- Optional title that can be used on the login page when multiple IdPs are configured.

---

- apiBaseUrl
- string
- **REQUIRED.**
  Base URL of the Gravitee API.
  Example: `https://apim-dev.acme-inc.com`.

---

- env
- string
- **REQUIRED.**
  Name of the environment.
  Default value: `DEFAULT`.

{% /table %}

## Configuration examples

```yaml
sso:
  main:
    type: GRAVITEE
    title: 'Gravitee SSO'
    apiBaseUrl: 'https://apim-dev.acme-inc.com'
    env: DEFAULT
```

## Customize the appearance and behavior of the login page

You can eject the login page by running the following command:

```bash
npx @redocly/cli eject component GraviteeLoginPage -d <CONTENT_DIR> --theme @redocly/portal-plugin-gravitee-sso
```

This will create a `@theme/GraviteeLoginPage.tsx` file in your portal. You can edit this component to customize the appearance and behavior of the login page.
