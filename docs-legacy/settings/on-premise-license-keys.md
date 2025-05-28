---
excludeFromSearch: true
---

## On-premise license keys

To use Redocly on-premise, you need to have a license key.

{% admonition type="info" %}
The on-premise functionality is supported only in our Enterprise plans.

- If you already have an Enterprise account with access to the Workflows app, you can generate the license key for your organization.
{% /admonition %}

## Generate a license key

1. Log into Workflows, and navigate to **Settings > On-premise license keys**.

2. On the _On-premise license keys_ page, select **New license key**. The _License key generation_ dialog displays.
   - If you have previously generated a license key, it is displayed on the page along with its expiration date and the list of allowed domains.
   - If there is no existing key, select the **Generate license key** button to generate a new one. When (re)generating a key, you can add up to 10 domain names to the allowlist. All subdomains of an added domain are included by default.

3. On the _License key generation_ dialog, type in your domain and click **Generate key**.

You can add up to 10 domain names for one key. Select **Add domains** under the active license key to add more domain names.

{% admonition type="warning" %}
You cannot edit previously added domains for the currently active license key. To change these domains, you will need to generate a new license key.
{% /admonition %}

Any previously generated keys are listed on the page in the _History_ section. You can remove these keys from the list after they expire by selecting the recycle bin/delete icon next to each key in the list.

### About license keys

Every license key is a base64-encoded string containing information about the expiration date and allowed domains.

To start using the license key you've generated, copy it from the **On-premise license keys** page and save it for future use. The key does not need to be encrypted and can be stored in a plain text file.
