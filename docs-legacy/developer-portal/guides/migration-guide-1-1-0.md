---
seo:
  title: Redocly Developer portal 1.1.0 migration guide
excludeFromSearch: true

---

# Migration guide: Developer portal 1.1.0

{% partial file="/docs-legacy/_snippets/banner-legacy-developer-portal.md" /%}


> Developer portal 1.1.0 is a major release that implements the new Reference docs 2.0
> features and enhancements for integrated API reference documentation.
> This migration guide highlights changes that impact the appearance and behavior of your portal,
> and provides upgrade instructions for your deployments.


In this guide:

- [Migration guide: Developer portal 1.1.0](#migration-guide-developer-portal-110)
  - [New features](#new-features)
  - [Compatibility changes](#compatibility-changes)
    - [Renamed package](#renamed-package)
    - [Adjust Reference docs configuration options](#adjust-reference-docs-configuration-options)
    - [Redocly CLI integration](#redocly-cli-integration)
    - [Button component usage](#button-component-usage)
    - [Default font settings](#default-font-settings)
  - [Upgrade to Developer portal 1.1.0](#upgrade-to-developer-portal-110)
  - [Continue using Developer portal 1.0.x](#continue-using-developer-portal-10x)


## New features

The biggest feature in Developer portal 1.1.0 is **the integration of Reference docs 2.0**. This means that [all new features, options, and compatibility changes](../../api-reference-docs/guides/migration-guide-2-0.md) from Reference docs 2.0 are included in the Developer portal, and affect the appearance and behavior of integrated API reference documentation.

For more information about deprecated options and required changes, refer to the [Compatibility changes section of the Reference docs 2.0 migration guide](../../api-reference-docs/guides/migration-guide-2-0.md#compatibility-changes).


## Compatibility changes

These changes break compatibility with previous versions. Adjust your portal settings accordingly before upgrading to prevent build failures after the upgrade.

### Renamed package

The package `@redocly/ui` is now deprecated. We recommend you start migrating to the new package `@redocly/developer-portal/ui`, as the old one is supported only for a limited time.


### Adjust Reference docs configuration options

The new Developer portal uses the new Reference docs package which had some compatibility changes. Adjust settings in all `.page.yaml` files according to the [Reference docs migration guide](../../api-reference-docs/guides/migration-guide-2-0.md).

For example:

```diff
  type: reference-docs
  definitionId: petstore
  settings:
-   layout:
-     showNextButton: false
+   showNextButton: false
```

The new Reference docs package introduces a number of new theme knobs. Make sure to adjust some if needed.

### Redocly CLI integration

The new Developer portal uses the latest version of the `redocly-cli` package which may detect new errors that were not found by the previous version.

To prevent such errors from blocking the portal build, you can either:

- disable some rules in the [`rules` object](/docs/cli/rules) of the top-level `redocly.yaml` configuration file

or

- [create a `.redocly.lint-ignore.yaml`](/docs/cli/commands/lint#generate-ignore-file) file to ignore all errors and warnings


### Button component usage

Specifically, you must make the following changes:

- Button defaults to the secondary color (used to be primary), adjust where needed:

  ```diff
  - <Button> My Button </Button>
  + <Button color="primary"> My Button </Button>
  ```

- `transparent` was removed, use `variant="outlined"` instead

  ```diff
  - <Button transparent> My Button </Button>
  + <Button color="primary" variant="outlined"> My Button </Button>
  ```

- `inversed` was removed, use `color="secondary"` instead

  ```diff
  - <Button inversed transparent> My Button </Button>
  + <Button color="secondary" variant="outlined"> My Button </Button>
  ```

- `big` and `small` was removed, use `size` instead

  ```diff
  - <Button big> My Button </Button>
  + <Button color="primary" size="large"> My Button </Button>
  - <Button small> My Button </Button>
  + <Button color="primary" size="small"> My Button </Button>
  ```

- `color` doesn't accept any colors, instead color has to be defined in `theme.colors`

  ```diff page.md
  - <Button color="orange"> My Button </Button>
  + <Button color="myBrand"> My Button </Button>
  ```
  ```diff theme.ts
  colors: {
      primary: { ... }
  + myBrand: { main: "orange", contrastText: "#fff" }
      ...
  }
  ```

### Default font settings

The default font family in the Developer portal theme and in the Reference docs theme has changed to `typography.fontFamily='Source Sans Pro, sans-serif'`.

The default code font family has changed to `typography.code.fontFamily='Source Code Pro, sans-serif'`.

If you don't have your custom fonts specified in `theme.ts` or if you want to use these fonts too, you must add the following to the `stylesheets` section in your `siteConfig.yaml` file:

```diff
  stylesheets:
+   - https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400,600,700|Source+Code+Pro&display=swap`
```

## Upgrade to Developer portal 1.1.0

1. Prior to upgrading the portal, access the root directory of your Developer portal project and remove `yarn.lock` and `node_modules` from it.

2. In the same root directory, access the `package.json` file. Open the file and find `@redocly/developer-portal` in the `@dependencies` section.

3. Change the version number to `1.1.0-beta.28` (or the [most current version](../changelog.md)) like in the following example:

   ```json
     "dependencies": {
     "@redocly/developer-portal": "1.1.0-beta.28"
    }
   ```

3. Save the changes to the `package.json` file.

4. Run `yarn install` in the root directory to upgrade your portal.

Installing the new portal version recreates the `yarn.lock` file. Make sure to commit the changes to that file into your version control system. This is a prerequisite for Developer portal projects hosted in Workflows, because it enables Workflows to build your portal with the new version.


## Continue using Developer portal 1.0.x

The last supported version in the Developer portal 1.0.x release channel is `1.0.0-beta.162`.

We advise all customers to switch to the new Developer portal and upgrade to the `1.1.0-beta.28` or [most current version](../changelog.md).

If you choose to continue using an older version of the Developer portal, keep in mind that you do not receive security upgrades or new features and improvements. Additionally, you are not able to use the new Reference docs 2.0 for integrated API reference documentation in your portal.
