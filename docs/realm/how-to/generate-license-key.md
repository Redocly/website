---
rbac:
  Employee: read
---
# Generate a license key

To deploy a project on-premises, you must include a valid Redocly license key as the value
of the [`licenseKey` property](../config/license-key.md) in your `redocly.yaml` configuration file.

Every license key is a base64-encoded string containing information about the expiration date and allowed domains.
Keys don't need to be encrypted and can be stored in a plain text file in version control.

## Before you begin

Make sure you have the following before you begin:

- an Enterprise account
- an Owner role in the application

{% admonition type="success" name="Tip" %}
To discuss our Enterprise plus pricing or request a license key, contact us at [team@redocly.com](mailto:team@redocly.com).
{% /admonition %}

To generate the license key:

1. Log in and access the **Settings > On-premise license keys** page.
2. Select **Generate license key**.

   OR

   If you have previously generated a license key, select **Regenerate license key** to generate a new one.

## Add domain names

Select **Add domains** under the active license key to add more domain names.

When (re)generating a key, you can add up to 10 domain names to the allowlist. All subdomains of an added domain are included by default.

You can't edit previously added domains for the active license key. To change those domains, you have to generate a new license key.

## Remove license keys

Any previously generated keys are listed on the page under **History**.
You can remove those keys from the list after they expire by selecting the recycle bin icon next to each key in the list.
