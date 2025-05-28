---
excludeFromSearch: true
---

# Custom domain

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}

You can edit the subdomain name and configure a custom domain for your portal project on the **Custom domain** page.

{% admonition type="info" name="Note" %}
Custom domains are supported only in Professional and Enterprise plans.
{% /admonition %}


## Edit the portal name

1. Navigate to the **Settings > Custom domain** page for the portal project you want to configure.

2. Select the *Edit* (pencil) icon next to the name. This opens the **Change the portal's name** dialog, where you can enter a new name for the portal project. You can exit the dialog at any time by selecting **Cancel**.

3. The name you enter is prepended to `.redoc.ly` and used as your project's subdomain. It is also used in the Workflows app to identify your project and distinguish it from other portal projects in your organization. Allowed characters are `[a-z],[0-9],-`. The name must be unique, and if it already exists in your or in another Workflows organization, the dialog warns you to change it.

4. After entering a new name, select **Change name** to save your changes. This does not trigger a new portal build.


## Configure a custom domain

1. Navigate to the **Settings > Custom domain** page for the portal project you want to configure.

2. Select the *Edit* (pencil) icon next to the custom domain. This opens the **Change your custom domain** dialog, where you can configure a custom domain for the portal project. You can exit the dialog at any time by selecting **Cancel**.

3. You must enter the custom domain without the protocol. Optionally, you can specify a path prefix to create a subdirectory in your custom domain from which the portal pages are served (for example, `portal.acme.com/docs`, where `/docs` is the path prefix).

4. Optionally, you can disable the portal's default redoc.ly URL.

5. After entering a custom domain, select **Save**. To complete the configuration process, point your domain's CNAME record to `ssl.redocly.com`.

