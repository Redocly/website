---
excludeFromSearch: true
markdown:
  toc:
    depth: 2
---

# Gravitee integration: use cases and API calls

## User login and exchange token

Obtain an access token using an identity provider (IdP) login, or via static auth fallback.

### API calls

Exchange an IdP access token for a Gravitee token (if exchange flow is configured).

Note: the same OIDC provider has to be configured for the project SSO and Gravite AM access.

```md
POST /auth/oauth2/gravitee-am-oidc/_exchange?token=<accessToken>
```

### Potential fallback

It is possible to use a static authentication based on configuration. Static auth details are used from the adapter config and are primarily intended for debugging.

```yaml
developerOnboarding:
  auth:
    static: HARD_CODED_TOKEN
```

## Get the list of user apps

Fetch a list of applications the user has access to within Gravitee.

### API calls

Retrieve all user applications from Gravitee.

```text
GET /applications?size=-1 
```

## Get details about the specific app

Fetches detailed information about a single application in Gravitee.

### API calls

#### 1. Retrieve application details

```text
GET /applications/{appId}
```

#### 2. Retrieve the application subscription

Fetch the application's subscriptions (shared and exclusive key modes).

```text
GET /applications/{appId}/subscriptions?applicationId={appId}&size=-1&statuses=ACCEPTED&statuses=PAUSED&statuses=PENDING
```

#### 3. Retrieve subscription details

Fetch the subscription details to get subscription keys.

```text
GET /subscriptions/{subscriptionId}?include=keys
```

## Get the list of available APIs

Fetches available API products (potentially filtered, see Notes below).

```text
/apis?size=-1
```

## Create a new app

Create a new Gravitee application and subscribe it to specified API products.

### API calls

#### 1. Create an application

```text
POST /applications
```

#### 2. Fetch API plans

Retrieve available plans for each specified API product and select the plan to subscribe to.
The plan with `API_KEY` security and `AUTO` validation is preferred.

```text
GET /apis/{apiProductId}/plans?size=-1
```

#### 3. Subscribe to plan

Subscribe the created application to the selected API products.

```text
POST /subscriptions
```


## Revoke app credential

Revoke an application credential in Gravitee.

### API calls

The API call is based on the API key mode of the credential.

*Revoke a shared mode credential.*

```text
POST /applications/{appId}/keys/{credentialId}/_revoke
```

*Revoke an exclusive key mode credential.*

```text
POST /subscriptions/{subscriptionId}/keys/{credentialId}/_revoke
```

## Roll app credential

Creates a new key for an application credential

### API calls

#### 1. Fetch application details

```text
GET /applications/{appId}
```

#### 2. Create a new key

The call is based on the API key mode.


*Create a new key for a shared mode credential.*

```text
POST /applications/{appId}/keys/_renew
```

*Create a new key for an exclusive key mode credential.*

```text
POST /subscriptions/{subscriptionId}/keys/_renew
```

#### 3. Retrieve the app credentials

Retrieve the app credential and find the information on the renewed credential.

*3.1 Fetch the application's subscriptions (shared and exclusive key modes).*

```text
GET /applications/{appId}/subscriptions?applicationId={appId}&size=-1&statuses=ACCEPTED&statuses=PAUSED&statuses=PENDING
```

*3.2 Fetch the subscription details to get subscription keys.*

```text
GET /subscriptions/{subscriptionId}?include=keys
```

## Notes

API product filtering: the adapter allows restricting API product retrieval based on a catalog (catalogApiProducts).
