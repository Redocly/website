# Mock servers

{% admonition type="info" name="About this feature" %}
The mock server feature is only available to Pro and Enterprise customers.
{% /admonition %}

Only users with the `Admin` project-level role for an API can enable the mock server feature.

{% partial file="../../_snippets/enable-mock-server.md" /%}

To further control the mock server behavior, use [the mockServer object](/docs/cli/configuration#mockserver-object) in your Redocly configuration file. Note that you must add the configuration file to your API project in the registry for settings to apply.

Read more on [how to use the mock server feature](../guides/mock-server-quickstart.md).
