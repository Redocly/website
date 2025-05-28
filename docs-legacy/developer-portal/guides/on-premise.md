---
seo:
  title: How to host the Developer portal
enableToc: true
excludeFromSearch: true

---
# Hosting options

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

## Host the portal in Redocly Workflows

Like Reference docs, the Developer portal can be hosted in Redocly Workflows. On the **Portals** page, select **Add new** to import a Developer portal from any of the supported sources.

When all configuration options are set and the Developer portal successfully built, you can access it from the **Portals** page. Additional options like custom domain and access control are available in the **Settings** tab for each of the configured Developer portals.

## Host the portal on-premise

You can host the Developer portal on your own servers - either directly as a static site or with Docker. The [role-based access control (RBAC)](../configuration/rbac.md) feature requires the Docker approach if you want to use it on-premise.

{% admonition type="warning" name="Important" %}
On-premise Developer portal deployments currently support a single identity provider configuration.
{% /admonition %}

## How to host the Developer portal with Docker

First, update the `siteConfig.yaml` in your portal repository. The only required change in this step is adding the authentication settings.

```yaml
auth:
  idps:
    main:
      type: oidc
      configurationUrl: https://auth.example.com/.well-known/openid-configuration
      clientId: OIDC CLIENT_ID
      clientSecret: '****'
      scopes:
        - list
        - of
        - scopes
  globalAuthRequirement: public | <idpId>
  allowLoginWith: <idpId>
```

- `main` = the ID of the identity provider.

- `type` = type of the identity provider. Only `oidc` is supported.

- `configurationUrl` = OIDC server configuration URL (.well-known).

- `clientSecret` = can be provided using environment variables, as explained further in this text.

- `globalAuthRequirement` = controls the auth requirement for accessing the site content. You can use the special value `public` here.

- `allowLoginWith` = you can allow login functionality if `globalAuthRequirement` is set to `public`. Auth details can be used by custom components or by [RBAC features](../configuration/rbac.md).

Then, [build](../introduction.md) the Developer portal static site. To do so, run the `npm run build` command in the root directory of the Developer portal project.

When the build is finished, you can run the portal Docker image in two ways. Either create your own Docker image (based on the official image published by Redocly), or run our official image and use the Docker volume to mount the portal directory.

### Create a new Docker image

Add the following lines to a Dockerfile, and build a new image from it:

```docker
FROM redocly/developer-portal-server:latest

COPY ./path/to/portal/public /portal
```

### Mount volume to the existing Docker image

```docker
docker run -p 80:80 -v ./path/to/portal/public:/portal redocly/developer-portal-server:latest
```

## Use environment variables

You can set environment variables at runtime like in the example:

```docker
docker run -p 80:80 --env REDOCLY_IDP_MAIN_CLIENTSECRET=some_value -v ./path/to/portal/public:/portal redocly/developer-portal-server:latest
```

To specify IdP configuration values as environment variables, use the following format:

```shell
REDOCLY_IDP_{{IDP_ID}}_{{PARAMETER_NAME}}
```

`IDP_ID` and `PARAMETER_NAME` parameters must be upper-cased.

To specify `clientSecret` of `main` IdP, use the following environment variable:

```shell
REDOCLY_IDP_MAIN_CLIENTSECRET
```

## Enable HTTPS

To enable the HTTPS protocol support, provide all of the following environment variables:

- `HTTPS_ENABLE=1`
- `SSL_CERT_PATH`, path to the SSL certificate
- `SSL_KEY_PATH`, path to the SSL key
- `SSL_PASSPHRASE`, default with no pass-phrase
- `HTTPS_PORT`, default 443

We suggest mounting a separate Docker volume with the SSL keys for better separation and security between your data and certificates, as in this example:

```docker
docker run -p 443:443 -p 80:80 --env SSL_CERT_PATH=/ssl/cert.pem --env SSL_KEY_PATH=/ssl/key.pem -v /path/to/portal/public/:/portal -v /path/to/ssl/keys/:/ssl redocly-developer-portal-server:latest
```
