---
products:
  - Revel
  - Realm
plans:
  - Pro
  - Enterprise
  - Enterprise+
---
# Customize theme components

{% configOptionRequirements products=$frontmatter.products plans=$frontmatter.plans /%}

You can customize theme components instead of ejecting them completely.

Customizing components can be useful in several scenarios:

- When developing custom components by reusing existing `theme` functionality, rather than building from scratch.
  This is particularly effective when integrating into more complex components.

- When extending or modifying the styles of existing components, especially in cases where the default theme `variables` are insufficient.

Find a list of available components with their properties in the [components list](./list/index.md) and a full list of supported icons in the [icons list](./list/icons.md).

For detailed instructions, see [Components usage tutorial](./use-in-react-page.md) or [Customize theme components](./wrap-components.md).

## Automated testing for custom components

To prevent regressions after platform updates, we recommend setting up automated testing for your custom components. While Redocly doesn't provide built-in procedures for this, you can use standard React testing tools.

### Testing framework

You can use [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to write unit and integration tests for your custom components. This helps verify that your components continue to behave as expected when the underlying platform or dependencies change.

### Best practices

- **Dependency locking**: Use a `package-lock.json` or `yarn.lock` file to ensure consistent dependency versions across environments.
- **Monitor the Changelog**: Keep an eye on the [Redocly Changelog](https://redocly.com/changelog/) for any breaking changes or updates that might affect your custom components.
- **Regular test runs**: Integrate your tests into your CI/CD pipeline to catch issues early.
