# Configure navigation on the footer

You can configure navigation on the footer of your project by updating the copyright info,
and adding links with or without icons to markdown or external pages.

## Add copyright info

You can add a footer to your project site with your copyright info by configuring it in your `redocly.yaml` file.

To add copyright info to your footer:

1. If you don't already have a `redocly.yaml` file, create one and add it to the root of your project.
1. Add the `footer` object, and the `copyrightText` option with the value for your copyright text.
   For example, the following configuration adds a footer with "Copyright © Redocly 2019-2023. All right reserved." copyright text:
   ```yaml
   footer:
     copyrightText: Copyright © Redocly 2019-2023. All right reserved.
   ```

## Add links

Footer items can be added in the `redocly.yaml` file.
These items are similar to items added to the `sidebars.yaml` file.

To add links to your footer:

1. If you don't already have a `redocly.yaml` file, create one and add it to the root of your project.
2. Add the `group` object, under the `items` object.
   For example, the following configuration adds a footer with a "Legal" group:
   ```yaml
   footer:
     items:
       - group: Legal
   ```
3. (Optional) Add the `groupTranslationKey` option.
   For example, the following configuration adds a footer with a "Legal" group with `footer.legal` as the translation key:
   ```yaml
   footer:
     items:
       - group: Legal
         groupTranslationKey: footer.legal
   ```
4. Add the `items` object under the `group` object and the `page` or `href` options with the value of the file paths for the items you are including.
   For example, the following configuration adds a footer with a "Legal" group that includes a link to the `terms.md` Markdown file
   with link text that is the first heading on the page:
   ```yaml
   footer:
     items:
       - group: Legal
         groupTranslationKey: footer.legal
         items:
           - page: terms.md
   ```
5. (Optional) Add the following options to the items in your footer group:
   - `label`: This option is the link text that appears on the footer for the page.
     If you don't include it, the first heading of the Markdown page will be used for the `page` option,
     or the value for the `href` option will be used.
   - `labelTranslationKey`: This option is used if you are translating the link text into a different language.
     See [Localize labels using translation keys](../content/localization/localize-labels.md) for more information.
   - `external`: This option causes a new tab to open when the user clicks the item in the footer.
     This option is `false` by default.
   - `icon`: This option allows you to add an icon that displays next to your link text in the footer.
     The value is the file path to the icon file.
     For example, the following configuration includes a footer with three groups: Legal, Support, and Social.
     The Legal group's items are all external links and the Social group's items are all external:
   ```yaml
   footer:
     copyrightText: Copyright © Redocly 2019-2022. All right reserved.
     items:
       - group: Legal
         items:
           - label: Terms of Use
             href: 'https://redocly.com/subscription-agreement/'
             icon: ./images/logo.png
           - label: Privacy Notice
             href: 'https://redocly.com/privacy-policy/'
             icon: ./images/logo.png
           - label: Cookie Notice
             href: 'https://redocly.com/privacy-policy/'
             icon: ./images/logo.png
       - group: Support
         items:
           - label: FAQ
             page: faq.md
           - label: Contact Us
             page: contact.page.tsx
       - group: Social
         items:
           - label: Facebook
             href: 'https://www.facebook.com/redocly/'
             external: true
           - label: Youtube
             href: 'https://www.youtube.com/channel/UCxYbPjnpqmHCmwg9iWf7wtQ'
             external: true
           - label: Twitter
             href: 'https://twitter.com/Redocly'
             external: true
   ```
