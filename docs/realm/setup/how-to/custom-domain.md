# Set a custom domain

You can edit the subdomain name and configure a custom domain for your project on the **General** tab of the project's **Settings** page.

1. Log in to your Redocly instance.
2. Select your project.
3. Select **Settings > Custom domain**.
4. Click **Add domain**.
5. Enter the **Custom Domain** without the protocol. For example, "docs.example.com".
6. (Optional) Disable the default domain by unchecking the **Use proxy to URL** checkbox.
7. Click **Save**.
8. Log in to your DNS management provider and complete the following steps:
   * Add a new TXT record with the **name/host** and **value** listed in the Domain verification admonition on the **Custom domain** section of the **Settings** page in your project.
   * Point the domain CNAME record to `ssl.redocly.app`.
     If you have EU data residency, point the CNAME record to `ssl.eu.redocly.app`.
9.  Click **Verify**.
    A **Pending** badge displays next to the domain, until it is verified.
    Once the domain is verified, a **Verified** badge displays next to the domain.
