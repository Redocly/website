---
products:
  - Reef
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# `developerOnboarding`

Configure developer onboarding to enable external developers to self-register applications and manage API credentials through your developer portal.
This feature integrates with API gateway management systems to automate app registration and credential lifecycle management.

## When to use this

Use developer onboarding when you want to:

- Enable external developers to self-service app registration
- Automate credential management for registered applications
- Integrate your developer portal with API gateway systems like Apigee or Gravitee
- Provide developers with a streamlined experience for accessing your APIs

## Options

{% table %}

- Option
- Type
- Description

---

- adapters
- [[Adapter](#adapter-object)]
- **REQUIRED.**
  List of adapter configurations.

{% /table %}

### Adapter object

Choose the appropriate adapter object based on the type.

- [Apigee](#apigee-adapter)
- [Gravitee](#gravitee-adapter)

### Apigee adapter

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Possible values: `APIGEE_X`, `APIGEE_EDGE`.

---

- organizationName
- string
- **REQUIRED.**
  Name of the organization.
  Example: `apigee-eval-10`.

---

- auth
- [Apigee auth object](#apigee-auth-object)
- **REQUIRED.**
  Authentication object for the Apigee management API.

---

- ignoreApiProducts
- [string]
- List of API products to ignore.
  Ignored products are not displayed during app registration or credential management.

---

- allowApiProductsOutsideCatalog
- boolean
- Allow developers to register apps with API products that are not in the catalog.
  Default: `false`.

---

- stage
- string
- Mark the current Apigee instance as production or non-production to mark them in the UI.
  Default: `non-production`.

---

- apiUrl
- string
- URL to send Apigee management console requests to, in case you wish to pass them through a proxy.
  Default: `https://apigee.googleapis.com/v1`.

{% /table %}

#### Apigee auth object

Choose your preferred method of authentication.

- [Service Account](#apigee-service-account-auth-object)
- [OAuth proxy](#apigee-oauth-proxy-auth-object)

#### Apigee service account auth object

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Possible values: `SERVICE_ACCOUNT`

---

- serviceAccountEmail
- string
- **REQUIRED.**
  Email associated with the service account that interacts with the Apigee management API.
  Example: `redocly@apigee-eval-10.iam.gserviceaccount.com`.

---

- serviceAccountPrivateKey
- string
- **REQUIRED.**
  Private key for Apigee management API access.
  Use an environment variable and do **NOT** store your private key directly in the YAML configuration file.
  Example: `{{ process.env.DEMO_PRIVATE_KEY }}`.

{% /table %}

#### Apigee OAuth proxy auth object

This auth object requires you to have an OAuth2 proxy in front of the Apigee management API.

The auth proxy should implement [OAuth2 client credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) flow.
The Apigee adapter uses this token as the `Authorization` bearer token to access the Apigee management API.
Additionally, the Apigee adapter sets the `X-Api-Key` header to the `clientId` value.

You need to implement a custom Apigee authorization proxy and configure `apiUrl` to point to it.
This proxy should:

- Validate the access token received from the OAuth2 proxy.
- Validate if the specific API operation is allowed by your custom authorization logic.
  See the list of [Apigee API operations](./apigee-api-operations.md) used by the Redocly adapter.
- Authorize the request with Apigee (for example using service account).
- Forward request to the Apigee management API.

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Possible values: `OAUTH2`

---

- clientId
- string
- **REQUIRED.**
  Client ID for Apigee management API access.
  Use an environment variable and do **NOT** store your private key directly in the YAML configuration file.
  Example: `{{ process.env.DEMO_CLIENT_ID }}`.

---

- clientSecret
- string
- **REQUIRED.**
  Client secret for Apigee management API access.
  Use an environment variable and do **NOT** store your private key directly in the YAML configuration file.
  Example: `{{ process.env.DEMO_CLIENT_SECRET }}`.

---

- tokenEndpoint
- string
- **REQUIRED.**
  URL to send OAuth2 requests to.
  Example: `https://apigee-eval-10-demo.apigee.net/mgmt-proxy/token`.

{% /table %}

### Gravitee adapter

The Gravitee adapter uses the ID token of the user to authenticate with the Gravitee API.
You need to configure [Identity Provider in the Gravitee API Manager](https://docs.gravitee.io/apim/3.x/apim_installguide_authentication.html).

Contact team@redocly.com before using this adapter.

{% table %}

- Option
- Type
- Description

---

- type
- string
- **REQUIRED.**
  Possible values: `GRAVITEE`

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
  Default: `DEFAULT`.

---

- stage
- string
- Mark the current Gravitee instance as production or non-production to mark them in the UI.
  Default: `non-production`.

---

- allowApiProductsOutsideCatalog
- boolean
- Allow developers to register apps with API products that are not in the catalog.
  Default: `false`.

{% /table %}

## Examples

The following is an example of a developer onboarding configuration with two gateways.

```yaml
developerOnboarding:
  adapters:
    - type: APIGEE_X
      organizationName: apigee-eval-10
      ignoreApiProducts:
        - Infrastructure API
      auth:
        type: SERVICE_ACCOUNT
        serviceAccountEmail: redocly@apigee-eval-10.iam.gserviceaccount.com
        serviceAccountPrivateKey: '{{process.env.MAIN_PRIVATE_KEY}}'
      # apiUrl: https://apigee.googleapis.com/v1 # optional
    - type: APIGEE_X
      organizationName: apigee-eval-10-demo
      auth:
        type: OAUTH2
        clientId: '{{process.env.DEMO_CLIENT_ID}}'
        clientSecret: '{{process.env.DEMO_CLIENT_SECRET}}'
        tokenEndpoint: https://apigee-eval-10-demo.apigee.net/mgmt-proxy/token
      apiUrl: https://apigee-eval-10-demo.apigee.net/mgmt-proxy/
```

The following is an example of a developer onboarding configuration with one gateway.

```yaml
developerOnboarding:
  adapters:
    - type: GRAVITEE
      apiBaseUrl: https://apim-dev.acme-inc.com
```

## Related options

- [sso](../sso.md)

## Resources

- [List of used Apigee API endpoints](./apigee-api-operations.md)
