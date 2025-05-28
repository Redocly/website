---
seo:
  title: Enable Apigee management UI components
excludeFromSearch: true

---
# Enable Apigee apps UI functionality

To start creating new apps using the Developer portal, you need to:

- Set up environment variables.
- Create three additional `mdx` pages to enable the `Apps` user interface in the Developer portal.
- Enable navigation to `Apps` through the **login menu**.

{% admonition type="warning" %}
[Set up the Apigee proxy](./setup-apigee-proxy.md) before you make these changes.
{% /admonition %}

## Set up environment variables

The Apigee UI components use environment variables for configuration.

Add your [proxy details](./setup-apigee-proxy.md) in an [environment file](../environment-files.md) named `.env.production` in the root of your repository with these three variables:

- `APIGEE_ORG_NAME`: Enter your Apigee organization name. Your Apigee organization name is displayed under your profile in Apigee.
     ![Apigee organization name](./images/apigee-org-name.png '#display=block;margin=auto;width=200px;')
- `APIGEE_PROXY_URL`: Enter the deployment URL you generated in [Task 3](setup-apigee-proxy.md#task-3-map-authentication-credentials-and-deploy-proxy).
- `APIGEE_VERSION`: (optional) Version of Apigee deployment: `apigeex` (default) or `apigeeedge`.

```shell .env.production
APIGEE_PROXY_URL=https://example.com/apigee-api-proxy/v1
APIGEE_ORG_NAME=apigee-example-123
APIGEE_VERSION=apigeex #or apigeeedge
```

Commit this file to your repository.

## Create MDX pages

Create these three `mdx` files in the root of your Developer portal repository.
{% tabs %}
{% tab label="apps.md" %}
```jsx
---
title: Apps list
requestLogin: true
---

import { AppsPage } from '@redocly/developer-portal/apigee';
import { FullWidthLayout } from '@redocly/developer-portal/ui';

export default FullWidthLayout;

<AppsPage />
```
{% /tab  %}
{% tab label="app.md" %}
```jsx
---
title: App
matchPath: '/app/*'
requiresLogin: true
---

import { AppPage } from '@redocly/developer-portal/apigee';
import { FullWidthLayout } from '@redocly/developer-portal/ui';

export default FullWidthLayout;

<AppPage />
```
{% /tab  %}
{% tab label="create-app.md" %}
```jsx
---
title: Create app
requiresLogin: true
---

import { CreateAppPage } from '@redocly/developer-portal/apigee';
import { FullWidthLayout } from '@redocly/developer-portal/ui';

export default FullWidthLayout;

<CreateAppPage />
```
{% /tab  %}
{% /tabs  %}

{% admonition type="info" name="Further customization" %}
If you wish to customize these components further, we are happy to share their source code with you.
{% /admonition %}

## Enable apps in login menu

Once you have created these pages, we recommend linking them using the **login menu** in the `siteConfig.yaml`.

```yaml siteConfig.yaml excerpt
login:
  label: Sign in
  userAvatar: # can be false
    claim: picture
    fallbackLettersClaim: name
  userLabel: # can be false, but one of userAvatar or userLabel must be not false
    claim: name
    fallback: <unknown user>
  menu:
    - label: Apps
      page: apps.md
    - separatorLine: true
    - label: Sign out
      logout: true
```

## Build the portal

Commit your new and changed files to source control.

Redocly builds a production version of your portal when you commit (or merge your pull request) into your production branch.
