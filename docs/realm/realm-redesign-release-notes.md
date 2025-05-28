---
excludeFromSearch: true
---
# Realm redesign release notes

With this milestone release, we're providing this overview of the changes as a summary of everything that was included.

## Updates in this release

This release includes:

- Redoc has beeen updated to the latest version, with a full redesign and overhaul of the API reference documentation.
- Interactive API documentation features are now provided by our new API explorer product Replay.
- The existing theme and customization options have been overhauled and improved.

{% admonition type="warning" name="Breaking changes" %}
Check the [migration notes](#migration-notes) for breaking changes if upgrading to this version from older releases.
{% /admonition %}


### Redoc: Better API reference documentation

- API landing pages show the info section. This design has been updated for the new release to improve user experience.
- Presentation of complex schemas is improved to make it easier to navigate both simple and complex APIs. Look for the color-coded indentation features, configurable dot notation options, and better user experience for APIs that have polymorphic objects.
- Code samples are updated and enabled by default; configure the languages that suit your audience or disable this feature completely.
- Pagination improvements include resource-efficient single page continuous scroll (to make developers happy) and instant access to individual routes (for better SEO and discoverability).

### Replay: Interactive API experiences for modern APIs

- The "try it" console is overhauled completely as it is replaced by a Replay component, our new API explorer.
- Replay has features such as environments and request history, along with a UX familiar to many developers.

### Markdoc: Power tools for authors

Improved tags:

- The `openapi-code-sample` tag now supports language and server switchers as well as defining environments. The parameters were also simplified.
- The `json-schema` tag is now more powerful and simple to use, using an inline schema with `$ref` support.

Renamed tags:

- The `openapi-try-it` tag has been renamed and updated as `replay-openapi`.

Removed tags:

- The `details` tag has been removed in favor of the native HTML details tag.
- The `typography` tag has been removed as it was not used.
- The `openapi-request-body` and `openapi-response` tags were removed as they were not used.

The [Markdoc tag library](https://redocly.com/docs/learn-markdoc/tags/tag-library/) has detailed documentation for all tags.

### Customize your site: improved features and experience

The CSS variables set was refactored to improve consistency and maintainability. New variables were added, and some existing variables were renamed or removed. The full list of CSS variables can be found in the [CSS variables documentation](./style/reference/css-variables/index.md).

Many components were redesigned and refactored to provide a more consistent and user-friendly experience.
A set of ejectable components is provided, and will be expanded in future releases.

## Migration notes

Along with the UI improvements, the release contains a number of breaking changes around styling and customization. If you are upgrading from an earlier version of the tool, these are some issues to be aware of:

- Ejectable components are simplified by extracting low-level logic to Redocly-controlled code. This extraction of low-level logic streamlines customization and simplifies future upgrade processes.
- The list of ejectable components is reduced to an updated and well-maintained set of the actively used components.
- A variety of CSS variable names have changed to improve consistency and maintainability.
- Several Markdoc tag parameter signatures have changed to simplify usage.
- A number of configuration options have changed names or properties according to the new design.
- The `openapi` options have changed and all of the available options are [documented](./config/openapi/index.md).

Check the current documentation for information about the current features in each of these areas.
