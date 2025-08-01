# Configure navigation on the navbar

You can configure navigation on the navbar by including links to API reference documentation, catalogs, external links, and markdown files.
You can also create groups which display as drop-downs with options and link to sidebars.

## Add pages to the navbar

Navbar items can be added in the `redocly.yaml` file.
These items are similar to items added to the `sidebars.yaml` file.

To add pages to the navbar:

1. If you don't already have a `redocly.yaml` file, create one and add it to the root of your project.
2. Add the `items` object, under the `navbar` object. For example:
   ```yaml
   navbar:
     items:
   ```
3. Add the `page` or `href` options with the values of the file paths for the items you are including.
   For example, the following heading adds a link to the `changelog.md` file to the navbar:
   ```yaml
   navbar:
     items:
       - page: changelog.md
   ```
4. (Optional) Add the following options to the items in your navbar:
   - `label`: This option is the link text that appears on the navbar for the page.
     If you don't include it, the first heading of the Markdown page will be used for the `page` option,
     or the value for the `href` option will be used.
   - `labelTranslationKey`: This option is used if you are translating the link text into a different language.
     See [Localize labels using translation keys](../content/localization/localize-labels.md) for more information.
   - `external`: This option causes a new tab to open when the user clicks the item in the navbar.
     This option is `false` by default.
   - `icon`: This option allows you to add an icon that displays next to your link text in the navbar.
     The value is the file path to the icon file.
   - `linkedSidebars`: This option allows you to add this item to the breadcrumbs of pages on a specified sidebar or multiple sidebars.
     It is an array of relative paths to these sidebar files. Only for top-level items.

## Add groups to the navbar

You may want to add groups if you have related content you want to organize.
For instance, if you have four different products, and you want to organize the guides by product.
Groups appear as drop-down menus on the navbar.

To add groups to navbars:

1. Add a `group` object, under the `items` object.
   For example, the following configuration adds a link to the `changelog.md` file and to the "Product 1" group:
   ```yaml
   navbar:
     items:
       - page: changelog.md
       - group: Product 1
   ```
2. (Optional) Add the `groupTranslationKey` option.
   For example, the following configuration adds a link to the `changelog.md` file and to the "Product 1" group
   with `sidebar.product` as the translation key:
   ```yaml
   navbar:
     items:
       - page: changelog.md
       - group: Product 1
         groupTranslationKey: sidebar.product1
   ```
3. (Optional) Add the `page` or `href` option with the value of the file path for a landing page for this group.
   For example, the following configuration adds a link to the `changelog.md` file and the "Product 1" group
   with the `overview.md` landing page:
   ```yaml
   navbar:
     items:
       - page: changelog.md
       - group: Product 1
         page: overview.md
   ```
4. Add the `items` object under the `group` object and the `page` or `href` options with the value of the file paths for the items you are including.
   For example, the following configuration adds a link to the `changelog.md` file and the "Product 1" group
   with links to the two Markdown pages, `product1-config.md` and `product1-api-quickstart.md`
   ```yaml
   navbar:
     items:
       - page: changelog.md
       - group: Product 1
         items:
           - page: product1-config.md
           - href: product1-api-quickstart.md
   ```
5. (Optional): Add the following options to the items in your group on your navbar:
   - `label`: This option is the link text that appears on the navbar for the page.
     If you don't include it, the first heading of the Markdown page will be used for the `page` option,
     or the value for the `href` option will be used.
   - `labelTranslationKey`: This option is used if you are translating the link text into a different language.
     See [Localize labels using translation keys](../content/localization/localize-labels.md) for more information.
   - `external`: This option causes a new tab to open when the user clicks the item in the navbar.
     This option is `false` by default.
   - `linkedSidebars`: This option allows you to add this item to the breadcrumbs of pages on a specified sidebar or multiple sidebars.
     It is an array of relative paths to these sidebar files. Only for top-level items.

## Link to sidebars

If you want to link to a sidebar from the navbar,
you must include a link to a markdown page that is listed in the `sidebars.yaml` file.

In your navbar configuration include a link to the landing page for a products or feature set.
Then in the folder for the product or feature set, include a sidebars file with the remaining content.

To link to sidebars from the navbar:

1. Create a folder for the collection of content. For example, a folder for a product:
   ```treeview
    dev_portal/
    ├── product-1/
    ├── redocly.yaml
    └── sidebars.yaml
   ```
2. Add the content for the collection to the folder. A sample file structure:
   ```treeview
    dev_portal/
    ├── product-1/
    │   ├── intro.md
    │   ├── install.md
    │   └── quickstart.md
    ├── redocly.yaml
    └── sidebars.yaml
   ```
3. In the folder for the product, add a sidebars file. A sample file structure:
   ```treeview
    dev_portal/
    ├── product-1/
    │   ├── intro.md
    │   ├── install.md
    │   ├── quickstart.md
    │   └── sidebars.yaml
    ├── redocly.yaml
    └── sidebars.yaml
   ```
   Sample `sidebars.yaml` file for Product 1 that includes links to three Markdown pages with labels:
   ```yaml
   - page: intro.md
     label: Introduction to Product 1
   - page: install.md
     label: Install Product 1
   - page: quickstart.md
     label: Quickstart guide for Product 1
   ```
4. Add a page entry for the landing page for the product to your navbar configuration in your `redocly.yaml` file.
   For example, the following configuration adds a link to the navbar for "Product 1 doc":
   ```yaml
   navbar:
     items:
       - href: ./product1/intro.md
         label: Product 1 doc
   ```
