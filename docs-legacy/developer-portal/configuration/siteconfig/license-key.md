---
excludeFromSearch: true
---

# `licenseKey`


{% admonition type="warning" name="Attention" %}
Applies only to on-premise portal deployments, which requires an enterprise-class plan.
{% /admonition %}


## Usage

To start using Redocly Portal on-premise, you need to have a license key. To discuss our Enterprise pricing or request a license key, please contact us at team@redoc.ly.

If you already have an Enterprise-class account with access to the Redocly Workflows app, you can generate the license key for your organization. Your account must have the Owner role in the app.

To generate the license key, log into Redocly Workflows and access the **Settings > On-premise license keys** page. On this page, select the **Generate license key** button. If you have previously generated a license key, it is displayed on the page along with its expiration date and the list of allowed domains. In this case, select the **Regenerate license key** button to generate a new one.

When (re)generating a key, you can add up to 10 domain names to the allowlist. All subdomains of an added domain are included by default. Select the **Add domains** button under the active license key to add more domain names. Note that you can't edit previously added domains for the active license key. To change those domains, you have to generate a new license key.

Any previously generated keys are listed on the page in the *History* section. You can remove those keys from the list after they expire by selecting the recycle bin icon next to each key in the list.

Every license key is a base64-encoded string containing information about the expiration date and allowed domains. To start using the license key you've generated, copy it from the **On-premise license keys** page and save it for future use. The key doesn't need to be encrypted and can be stored in a plain text file and in version control.

To build the developer portal on-premise, you must provide your Redocly license key as the value of the `licenseKey` property. Add it to the top level of the `siteConfig.yaml` file.

## Examples

```yaml
seo:
  title: Example Developer Portal
  description: Learn how to work with Example APIs
licenseKey: ABCD-1234-WXYZ-5678
```
