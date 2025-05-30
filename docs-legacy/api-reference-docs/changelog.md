---
tocMaxDepth: 2
---

# Reference docs changelog

---

## 2.42.2 (2023-10-24)

### Features

- Added marketing banner for VSCode extension.

---

## 2.42.1 (2023-08-14)

### Fixes

- Resolved an issue where Client ID and Client Secret fields were cleared by changing the Security Scheme in the Try It panel.

---

## 2.42.0 (2023-07-25)

### Features

- Added visual view for `required` value in request body.

### Fixes

- Resolved an issue where `tryItOpen` event does not send `Closed` actions.
- Resolved an issue where option `routingStrategy: hash` has wrong anchor link.

---

## 2.41.2 (2023-07-17)

### Fixes

- Resolved an issue where description is duplicated for primitive types in `oneOf` schemas.

---

## 2.41.0 (2023-07-10)

### Features

- Added `targetServerSwitch` event that is called when users change the selection of the target server in the _Try it console_.

### Fixes

- Resolved an issue where the 'tryItOpen' analytics event triggered when the close button for the _Try it console_ was clicked.

---

## 2.40.2 (2023-06-16)

### Fixes

- Resolved an issue where 'Go' code samples generating with syntax error

---

## 2.40.0 (2023-04-04)

### Features

- Updated banner for previewing the docs on localhost.

---

## 2.39.2 (2023-03-09)

### Fixes

- Upgraded `openapi-core` package to the latest version (`1.0.0-beta.123`).

---

## 2.39.1 (2023-01-19)

### Fixes

- Upgraded the Openapi sampler package to the latest version (`1.3.1`).

---

## 2.39.0 (2022-12-19)

### Features

- Added a new experimental config option `unstable_hideServerUrlInTryIt` to hide server URL in the _Try it console_.

### Fixes

- Fixed a broken code samples when server url contains a fragment.

---

## 2.38.2 (2022-11-11)

### Fixes

- Removed default server description from servers dropdown

---

## 2.38.1 (2022-09-30)

### Fixes

- Reverted the change related to custom name for an operation sidebar heading.

---

## 2.38.0 (2022-09-22)

### Fixes

- Resolved issue with showing empty security section
- Resolved issue with incorrect validation on path params in _Try it console_.

---

## 2.37.1 (2022-09-20)

### Fixes

- Resolved issue with not valid links in the Developer Portal.

---

## 2.37.0 (2022-09-19)

### Features

- Added `codeSamplesCopy` event. Called when the user copies request or response samples across Reference docs UI.

---

## 2.36.1 (2022-09-12)

### Fixes

- Added spacing under the description text in _Response samples_ panel.
- Resolved issue with crashes when used with specific combination of discriminators and inheritance.

## 2.36.0 (2022-09-05)

### Features

- Added synchronization of discriminator state in the middle panel with samples and _Try it_ panel.
- Added support for markdown formatting inside server variable `description` field in _Try it console_.

### Fixes

- Resolve the issue with synchronization of discriminators inside `oneOf` in the middle panel.
- Resolve the issue with `clientCredentials` OAuth2 flow not sending empty scopes
- Resolve the issue with the mock server not working correctly with the list of servers.

## 2.35.0 (2022-08-31)

### Features

- Added new configuration option `mockServer` which allows to specify mock server URL and it's position in the _Try It console_

## 2.34.0 (2022-08-30)

### Features

- Added new custom hook `AfterApiTitle` to inject additional HTML or React component after API title.

## 2.33.1 (2022-08-29)

### Fixes

- Improve our C# code sample template to match real-life usage
- Fix `text-transform` setting for Panel titles

## 2.33.0 (2022-08-23)

### Features

- Save state of the _Request Body_ in the _Try it console_.

### Fixes

- Resolved an issue with display message if security schema is not valid.
- Resolved an issue with switching languages in code samples not working correctly with duplicated language and different labels.
- Resolved an issue with incorrect code samples with 204 status code.

## 2.32.0 (2022-08-18)

### Features

- The _Target server_ field in the _Try it console_ was moved to the top.
- Added theming options for the titles and subtitles in the middle panel.

### Fixes

- Resolved an issue where `labels.tryItAuthBasicUsername` and `labels.tryItAuthBasicPassword` labels text was not reflected in the generated code samples.
- Resolved an issue with the right panel layout change position while switching between code samples.
- Resolved an issue with switching XML examples now working for the payload and response samples.

## 2.31.1 (2022-08-11)

### Fixes

- Resolved an issue with incorrect recursion handling in nested oneOf.
- Resolved an issue with incorrect handling of OIDC authentication for `code` variant.

## 2.31.0 (2022-08-09)

### Features

- Added a new OpenAPI operation extension, `x-tokenEndpointAuthMethod`. Use it to provide a token endpoint auth method for OAuth2 security schemas.

### Fixes

- Resolved an issue with display operation path in sidebar if operation description or summary is not exist

## 2.30.0 (2022-08-03)

### Features

- Added visual view for `deprecated` in `oneOf` + `discriminator`.

## 2.29.0 (2022-08-02)

### Features

- Added new theme option `nestedAlternativeBackground` for customization background color alternative for nested schemas.

### Fixes

- Resolved an issue with sibling `$refs` in OpenAPI 3.1 definitions.

## 2.28.0 (2022-07-27)

### Features

- Added a support for array parameters (query, header, cookie, path) in the _Try it_ console.
- Add a support for a `simple` style in query parameters.
- Added a copy button to the server list.

### Fixes

- Resolved an issue with a recursion crash for boolean schemas with boolean `items`.
- Resolved an issue with an external pdf file in samples.

## 2.27.3 (2022-07-25)

### Fixes

- Resolved an issue with security details personalization not working with get code samples.
- Resolved an issue with incorrect servers urls with pagination `none` and server URL without the host (`/server/url`)
- Resolved an issue with duplicated enum values when schema uses a specific combination of oneOf and allOf.

## 2.27.2 (2022-07-19)

### Fixes

- Resolved an issue with incorrect property description, `readOnly` and `writeOnly` modifiers when schema uses a specific combination of allOf.

## 2.27.1 (2022-07-18)

### Fixes

- Resolved an issue with `application/hal+json` and similar mime-types not working properly in generated code samples.

## 2.27.0 (2022-07-13)

### Features

- Add a possibility to display the x- prefix for schema extensions.
- Add new configuration option `showAccessMode` allowing to display read-only and write-only flags on properties and parameters.

### Fixes

- Resolved an issue with incorrect recursion handling in oneOf.
- Resolved an issue with nested patternProperties.

## 2.26.4 (2022-07-06)

### Fixes

- Resolved an issue with invalid synchronization of request and response examples with different ids.

## 2.26.3 (2022-07-04)

### Fixes

- Resolved a small regression with false positive circular schema detection introduced in 2.26.2

## 2.26.2 (2022-07-04)

### Fixes

- Resolved an issue with false positive circular schema detection.
- Resolved an issue with not displaying `0` as default parameter in _Try it_ console.

## 2.26.1 (2022-07-01)

### Fixes

- Resolved an issue with OAuth2 state mismatch caused by base64 padding artifacts.

## 2.26.0 (2022-06-27)

### Features

- Add new configuration option `markdownHeadingsAnchorLevel` allowing to have anchors for headings H3 and H4.

### Fixes

- Resolved an issue with code sample being rendered for non-json media-types without the explicit example
- Resolved an issue with different number of examples in the media type object.
- Resolved an issue with displaying deep links inside arrays.

## 2.25.2 (2022-06-22)

### Fixes

- Resolved an issue with Authorization as the parameter is not being passed in the request.
- Resolved an issue with failing preview build when the definition has unclosed PullRight component.

## 2.25.1 (2022-06-21)

### Fixes

- Resolved an issue with displaying an array of strings in the request body samples.

## 2.25.0 (2022-06-20)

### Features

- Allow to clear dropdown selection in the _Try it_ console.

### Fixes

- Resolved an issue with the _Try it_ console: the first enum value could not be selected from the dropdown.
- Resolved an issue with invalid media content example/examples for parameters
- Resolved an issue with parameters examples priority

## 2.24.0 (2022-06-17)

### Features

- Add support for reference docs customizations with functions in workflows

## 2.23.0 (2022-06-14)

### Fixes

- Resolved an issue with wrong link in Next button in pagination section.

### Features

- The code samples now use values from the _Try it_ console.

## 2.22.1 (2022-06-08)

### Fixes

- Resolved an issue with displaying array samples in request body.
- Resolved an issue with `routingStrategy` option not working.
- Resolved an issue with copying null values in samples.


## 2.22.0 (2022-06-01)

### Features

- Add new configuration option `hideSecuritySection` allowing to disable the Security panel.

### Fixes

- Resolved an issue with displaying nested items with $ref.
- Resolved an issue with a clear CDN cache.

## 2.21.0 (2022-05-30)

### Features

- Added support for OAS 3.1 `prefixItems` and `additionalItems`.
- Added `onLoaded` callback to `RedoclyReferenceDocs` component.

## 2.20.0 (2022-05-26)

### Features

- Added support for additional `datatypes` in the multipart requests.
- Added support for conditional operators in OpenAPI 3.1 definitions.
- Added support for presentation of `maxProperties` and `maxProperties` in request and response object.

### Fixes

- Resolved an issue where symbols are not properly encoded in the _Try it_ console by adding new configuration option `disableTryItRequestUrlEncoding`.

## 2.19.1 (2022-05-20)

### Fixes

- Reverted the change related to conditional operators from version `2.17.0`.

## 2.19.0 (2022-05-19)

### Features

- Added new `showSecuritySchemeType` to show security scheme type along with security name.

### Deprecated showSecuritySchemeType

- The `noAutoAuth` configuration option has been deprecated in favor of the new approach of showing security on every endpoint.

## 2.18.0 (2022-05-19)

### Features

- Added support for pattern properties.

### Fixes

- Resolved an issue with Download button is visible in each endpoint.

## 2.17.0 (2022-05-18)

### Features

- Added an option `showWebhookVerb` to render the HTTP request method for webhooks in operations and in the sidebar.
- Added support for conditional operators in OpenAPI 3.1 definitions.
- Added an option `hoverTextDecoration` to the `features.openapi.theme` object (since renamed to `theme.openapi.theme` object). Use it to define how links should be decorated when users hover over them.

## 2.16.0 (2022-05-18)

### Features

- Added a new OpenAPI operation extension, `x-hideTryItPanel`. Use it to hide the _Try it_ panel for a single operation.
- Added an option `schemaDefinitionsTagName` to render all the schema components automatically.
- Added an option `showObjectSchemaExamples` to render object schema example in the properties.

### Deprecated

- The `showConsole` configuration option has been deprecated in favor of the new option `hideTryItPanel`. The new option is set to `false` by default, which means the _Try it_ functionality is enabled by default.

## 2.15.1 (2022-05-17)

### Fixes

- Resolved an issue with the impossibility to stylize the headers of the right panel

## 2.15.0 (2022-05-12)

### Features

- Added a new configuration option called `maxResponseHeadersToShowInTryIt`. Use it to set the maximum number of response headers to show in the _Try it_ console.
- Added support for OAS 3.1 `unevaluatedProperties`.

## 2.14.2 (2022-05-10)

### Fixes

- Resolved an issue with Responses section includes unnecessary divider.

## 2.14.1 (2022-05-10)

### Fixes

- Resolved an issue with Responses section styling.

## 2.14.0 (2022-04-27)

### Fixes

- Resolved an issue with scroll in sidebar menu.

### Features

- Add `minCharacterLengthToInitSearch` configuration option for sets the minimum amount of characters that need to be typed into the search dialog to initiate the search.

---

## 2.13.7 (2022-04-27)

### Fixes

- Resolved an issue with Responses section styling.
- Resolved an issue with loosing local properties on circular oneOf/anyOf.
- Resolved an issue with Expand All, Collapse All buttons for flat schema structures.

---

## 2.13.6 (2022-04-19)

### Fixes

- Resolved an issue with `[`,`]` symbols that are not properly encoded when included in query parameters.
- Resolved an issue with navigation when operationId contains backslash or quotes.
- Resolved an issue with Markdown headings containing quotes.

---

## 2.13.5 (2022-04-14)

### Fixes

- Resolved an issue with CORS if the servers object is defined per operation.

---

## 2.13.4 (2022-04-07)

### Fixes

- Resolved an issue with Download button behavior on multiple API versions.

---

## 2.13.3 (2022-04-04)

### Fixes

- Resolved an issue with the configuration option `downloadDefinitionUrl` not working as intended.

---

## 2.13.2 (2022-04-04)

### Features

- New `SideNavStyle` configuration option `id-only` - shows the operation id in sidebar menu.

---

## 2.13.1 (2022-03-31)

### Fixes

- Resolved an issue with merging generated code samples and passed with `properties` from the Developer portal where the array of strings was displayed as an array of objects.

---

## 2.13.0 (2022-03-25)

### Features

- The `x-usePkce` extension supports two new configuration options: `disableManualConfiguration` and `hideClientSecretInput`.
- The _Try it_ console lets you use `example` values with object properties to set initial values in the `Body` form.

### Fixes

- A warning message is displayed in the build log if tags in the API definition are invalid (should be an array).
- Resolved a minor issue in the _Try it_ console where OAuth scopes were truncated and displayed in two columns.

---

## 2.12.5 (2022-03-17)

- Internal changes of `redocly.yaml` config structure.

---

## 2.12.4 (2022-03-14)

### Fixes

- Added support for customizing the floating action button visible in the mobile view. You can change the background and icon color for the button in the Reference theme, or hide the button altogether by setting `hideFab: true` in your Reference configuration file.

---

## 2.12.3 (2022-03-10)

### Fixes

- Resolved an issue where the `Deprecated` badge wasn't visible in `oneOf` and `anyOf` schemas.

---

## 2.12.2 (2022-03-03)

### Fixes

- Resolved issue with invalid behavior for server variable input.
- Resolved issue with PKCE auth flow in Try it console.

---

## 2.12.1 (2022-02-28)

### Fixes

- Resolved a styling issue with the search popup when using dark background colors in the theme.

---

## 2.12.0 (2022-01-27)

### Features

- The list of supported languages for auto-generated code samples has grown! You can now configure Reference docs to automatically generate **R** code samples.

---

## 2.11.12 (2022-02-21)

### Fixes

- Resolved an issue with allow empty password for basic authorization.

---

## 2.11.10 (2022-02-16)

### Fixes

- Resolved an issue with the width of dropdown menus by making it dynamically adjust to content width.

- Reverted the change related to absolute links from version `2.11.8`.

---

## 2.11.9 (2022-02-16)

### Fixes

- Resolved an issue with broken layout rendering when a `description` field contains HTML elements.

---

## 2.11.8 (2022-02-15)

### Fixes

- Resolved an issue with incorrect absolute links in Markdown when using path prefixes.

---

## 2.11.7 (2022-02-15)

### Fixes

- Resolved an issue with incorrect rendering of options in dropdown menus.

---

## 2.11.2 (2022-02-08)

### Fixes

- Resolved an issue where Try it console incorrect display request body when it includes allOf/oneOf

---

## 2.11.0 (2022-01-27)

### Features

- Added the possibility to keep only the Download button on the API overview page.
- Added an option to hide/minify endpoint requests by default.

### Fixes

- Changed link anchor image to SVG instead of a background image.

---

## 2.10.0 (2022-01-24)

### Features

- Added download button to "Try it" for responses with files.

---

## 2.9.5 (2022-01-20)

### Fixes

- Resolved an issue where Server URLs with many query arguments would overflow and break the Try it console layout.
- Disabled sample code generation for webhooks.
- Resolved an issue where schema titles were displayed incorrectly when the `title` propery was not provided.
- Changed path parameter representation for `curl` code samples.
- Resolved an issue with displaying `writeOnly` parameters for webhooks.

---

## 2.9.4 (2022-01-17)

### Fixes

- Resolved issue where "Try It" does not work when query param names are with dot notation.
- Bump `marked` package version to 4.0.10.

---

## 2.9.3 (2022-01-14)

### Fixes

- Fixed an issue where scroll wasn't working in the "Try it" request body section.

---

## 2.9.2 (2022-01-14)

### Fixes

- Resolved issue: added markdown support for object description oneOf/anyOf.

---

## 2.9.1 (2022-01-13)

### Fixes

- Resolved issue where "Try It" has improper rendering of query params with dot notation.
- Resolved issue where headings in blockquote is causing duplicates.

---

## 2.9.0 (2022-01-06)

### Features

- New theme option `backgroundColor` for Request and Response schema panels.
- Implemented object description for oneOf/anyOf (new config option `hideOneOfDescription` to hide this feature).

### Fixes

- Resolved issue where links in description are not working as expected in docs

---

## 2.8.3 (2021-12-29)

### Fixes

- Resolved issue where "Try it" does not work with Basic Authentication.

---

## 2.8.2 (2021-12-28)

### Fixes

- Resolved a crash for `node v12` after `v2.7.9`.

---

## 2.8.1 (2021-12-20)

### Fixes

- Resolved a crash for `type: array` schemas referencing themselves if used in an `allOf`.

---

## 2.8.0 (2021-12-13)

### Fixes

- The default value for the `searchMaxDepth` configuration option has been lowered to 1.

---

## 2.7.9 (2021-12-08)

### Fixes

- Resolved an issue where multi-version reference docs crash in workflows after `v2.7.7`

---

## 2.7.8 (2021-12-07)

### Fixes

- Undo a breaking change to the default value of `theme.layout.showDarkRightPanel` accidentally made in `v2.7.4`

---

## 2.7.7 (2021-12-07)

### Fixes

- Internal improvements: migrate to webpack 5 and esbuild-loader (instead of babel)

---

## 2.7.6 (2021-12-06)

### Fixes

- Resolve an issue Security links are not working where the pagination is turned off and `routingBasePath` is set

---

## 2.7.5 (2021-12-06)

### Fixes

- Set indentation in request/response samples to two characters.

---

## 2.7.4 (2021-12-02)

### Fixes

- Resolved an issue where right panels were partially cut off when `showDarkRightPanel` is enabled and both layout buttons are disabled.

---

## 2.7.3 (2021-12-01)

### Fixes

- Resolved an issue where server-side rendered styles did not match client-side styles.

---

## 2.7.2 (2021-11-25)

### Fixes

- Resolved an issue where the exclusiveMinimum/Maximum properties showed an incorrect number range (OpenAPI 3.1).
- Resolved an issue with resolving nested $refs for OpenAPI 3.1.

---

## 2.7.1 (2021-11-22)

### Fixes

- Resolved an issue with breakFieldNames not working for expandable fields.

---

## 2.7.0 (2021-11-18)

### Features

- Long server URLs in the _Try it_ console now automatically wrap and adjust to the width of their containing element, giving you a clearer look at the full server URL values. The _Copy_ button for server URLs has also been removed to declutter the space.

### Fixes

- Resolved an issue with misaligned fields in schemas.

---

## 2.6.3 (2021-11-16)

### Fixes

- Resolved an issue with auto-generated NodeJS code samples that were not working properly.

- Resolved an issue with auto-generated PHP code samples that were not showing the HTTP basic authentication details.

- Resolved an issue with the `downloadDefinitionUrl` configuration option which did not allow users to directly download the API definition.

---

## 2.6.2 (2021-11-12)

### Fixes

- Internal improvements to the _Try It_ console for compatibility with Portal components.

---

## 2.6.1 (2021-11-11)

### Fixes

- Resolved an issue with switching the content type in the request body section (when used as the `OpenApiRequestBody` component in the Developer portal).

---

## 2.6.0 (2021-11-10)

### Features

- Implemented a new configuration option called `sendXUserAgentInTryIt` to enable sending the `X-User-Agent: Redocly Try it API console` header with every request made from the _Try it_ console.

**NOTE:** make sure to add `X-User-Agent` to your [`Access-Control-Allow-Headers`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers) CORS header.

### Fixes

- Resolved an issue with handling server template variables in code samples.

---

## 2.5.0 (2021-11-02)

### Features

- Two new configuration options - `separator` and `separatorLine` - are now supported for items configured in `sidebarLinks`. We've also added support for the corresponding theming option called `sidebar > separatorLineColor`.

---

## 2.4.2 (2021-10-28)

### Features

- Implemented support for wildcard domains in on-premise license keys.
- The _Try it_ console now supports PKCE for OAuth2 authorization code flow. To enable it for a specific security definition, add the [`x-usePkce: true`](./specification-extensions/x-use-pkce.md) specification extension:

```yaml
components:
  securitySchemes:
    oauth2_auth:
      type: "oauth2"
      flows:
        authorizationCode:
          x-usePkce: true,
          authorizationUrl: "https://example.com/authorize",
          tokenUrl: "https://example.com/token",
          scopes: {
            api: "Grants complete read/write access to the API"
```

### Fixes

- Resolved an issue with security links not working properly with `routingBasePath`.
- Resolved an issue with default boolean property values not rendered correctly when used with `enumSkipQuotes` setting.

---

## 2.4.1 (2021-10-25)

### Fixes

- Resolved an issue with _Next to_ buttons and sidebar items that were not rendered as proper links, which prevented the search index from crawling Reference docs pages.

---

## 2.4.0 (2021-10-22)

### Features

- Implemented support for a new theming option called `middlePanelMaxWidth`. Add it to the `layout > three-panel` section of the Reference theme to control the width of the content in the middle panel. When this option is used, the content in the middle panel is automatically centered to fit the total middle panel area specified by the `layout > three-panel > maxWidth` option.

### Fixes

- Resolved an issue that prevented users from selecting the response content type from the dropdown in response schemas.

---

## 2.3.0 (2021-10-13)

### Features

- Upgraded the `js-yaml` package from v.3 to v.4 with YAML 1.2 support. This upgrade resolves issues with parsing timestamps and example strings with leading zeros in YAML.

### Fixes

- Resolved an issue with schemas displaying an incorrect number of items in an array when using `maxItems`.

- Resolved an issue with Markdown headings overflowing the width of their containing element.

---

## 2.2.3 (2021-10-12)

- Internal improvements to the _Try It_ console for compatibility with Portal components.

---

## 2.2.2 (2021-10-11)

### Fixes

- Resolved an issue with sibling $refs in OpenAPI 3.1 definitions.

- Resolved an issue with broken deep links for items with multiple content types.

---

## 2.2.1 (2021-10-05)

### Fixes

- The _Try it_ console now correctly renders multiple input fields, supports `x-www-url-encoded`, and relies more on content type when validating the request body for the file upload helper.

---

## 2.1.24 (2021-10-05)

### Fixes

- Resolved an issue with incorrect vertical offset on Reference docs pages integrated into the portal with the `pagination: item` setting.

---

## 2.1.23 (2021-10-05)

### Features

- You can now configure search indexing depth for your Reference docs with the `searchMaxDepth` option. Set it to a number from 1 to 10 to control the maximum level of nested references that should be included in the search index. The default value is 8.

### Fixes

- Resolved a docs rendering issue when the `disableSidebar` configuration option is set to `true`. **If you have been using `disableSidebar` as a way to disable the search feature, you must now explicitly add `disableSearch: true` to your configuration after upgrading to this version.**

---

## 2.1.22 (2021-09-28)

### Features

- The _Try It_ console now supports file uploads for OpenAPI 3.1 definitions that use the `contentEncoding` keyword [according to the specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#considerations-for-file-uploads). If the `requestBody` schema is valid, the _Choose file_ button is visible in the request body section of the _Try It_ console. Select the button to open the file picker dialog and add one or more files to your request.

---

## 2.1.21 (2021-09-24)

### Fixes

- Resolved an issue with response sample tabs.

---

## 2.1.20 (2021-09-24)

### Fixes

- Resolved an issue with array response examples.

---

## 2.1.19 (2021-09-23)

### Fixes

- Resolved an internal issue with code sample component usage in the portal.

---

## 2.1.18 (2021-09-22)

### Fixes

- Resolved an issue with unnecessary transparency effect in the _Request samples_ section when switching between code sample tabs.

---

## 2.1.17 (2021-09-21)

### Fixes

- Resolved a theming issue with the text color of response headers which was not applied properly in Reference docs integrated into the portal.

---

## 2.1.16 (2021-09-21)

- Resolved an issue with the file upload helper in the _Try It_ console.

---

## 2.1.15 (2021-09-21)

Internal changes.

---

## 2.1.14 (2021-09-20)

### Fixes

- Resolved an alignment issue with field titles in schemas in the middle panel.

- Resolved an issue with response status descriptions not rendering when Markdown formatting is used (affected Reference docs 2.x only).

---

## 2.1.13 (2021-09-17)

### Fixes

- Resolved an issue with Reference docs crashing when mismatched examples are used in the OpenAPI document.

---

## 2.1.12 (2021-09-17)

### Features

- The _Try It_ console now lets you upload files to send in your requests. This feature is supported for OpenAPI 3.0.x only, and for specific media types [according to the specification](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#considerations-for-file-uploads). The `requestBody` schema in the OpenAPI document must have valid `type` and `format` properties, and format must be one of the following: `byte`, `binary`, `base64`. When the schema is recognized as valid, the _Choose file_ button is visible in the request body section of the _Try It_ console. Select the button to open the file picker dialog and add one or more files to your request.

---

## 2.1.11 (2021-09-15)

Internal changes.

---

## 2.1.10 (2021-09-09)

### Fixes

- Resolved an issue where switching MIME types would crash Reference docs in some cases.

---

## 2.1.9 (2021-09-09)

### Fixes

- Corrected a minor issue with section title margins for request schemas in the middle panel.

- Resolved issues in the new functionality for synchronizing named examples.

- Resolved an issue with incorrect selection when clicking on sidebar items.

---

## 2.1.8 (2021-09-09)

### Fixes

- Resolved a number of issues in auto-generated Go code samples. Query parameters and `application/json` body are now human-readable. Variable formatting has been improved for extracted oAuth2 `access_token` and for `multipart/form-data` examples.

- Improved variable formatting and capitalization of variables with prefixes in auto-generated code samples for all supported languages.

---

## 2.1.7 (2021-09-08)

Internal changes.

---

## 2.1.6 (2021-09-07)

### Features

- Reference docs can now automatically generate **Ruby** code samples. Learn [how to configure auto-generated code samples](./guides/generate-code-samples.md) in your Reference docs.

---

## 2.1.5 (2021-09-07)

### Features

- If you use custom names for `examples` to map request and response examples in your API definitions, such examples now automatically synchronize with each other when selected in Reference docs pages. How does that work? When you select a request example called `Simple payment` in the _Request samples_ panel, Reference docs looks for a response example with the matching name. If the `Simple payment` response example exists for that endpoint, it is automatically selected in the _Response samples_ panel.

---

## 2.1.4 (2021-09-01)

### Features

- Content type selection in Reference docs is now automatically synchronized between request and response schemas in the middle panel and the response and request examples in the right panel. When you select, for example, `application/json` in a request sample in the right panel, the content type for the request body schema in the middle panel automatically switches to `application/json` - no extra clicks needed!

---

## 2.1.3 (2021-08-31)

### Fixes

- Resolved an issue where schemas for callbacks and webhooks would incorrectly omit `readOnly` and include `writeOnly` properties.

---

## 2.1.2 (2021-08-26)

### Fixes

- Resolved an issue that caused a crash when some `auth` sections were disabled.

---

## 2.1.1 (2021-08-26)

### Features

- You can now customize the font and text color of HTTP method badges in your API documentation thanks to a number of new theming options in the `components.httpBadges` section.

When configured, these options affect all HTTP badges in the navigation sidebar and in the right panel:

- `fontFamily`
- `fontWeight`
- `color`

The following options affect specific badges based on their size (medium or small):

- `sizes.medium.fontSize`, `sizes.medium.lineHeight` - for badges in middle and right panels
- `sizes.small.fontSize`, `sizes.medium.lineHeight` - for badges in the navigation sidebar

### Fixes

- Resolved a UI issue where field names in schemas were misaligned with the content in the details tab.

---

## 2.1.0 (2021-08-26)

### Features

- The list of supported languages for auto-generated code samples has grown! You can now configure Reference docs to automatically generate **PHP** code samples.

- Implemented support for custom sanitize hooks.

### Fixes

- Resolved an issue with the `x-enumDescriptions` not displayed for an array of strings.

- Resolved an issue with duplication of the query string in Python code samples.

---

## 2.0.15 (2021-08-20)

### Fixes

- Resolved an issue with the _Try it_ console ignoring server variables when CORS proxy was used.

- Improved the UI of the **Response** panel in the _Try it_ console.

---

## 2.0.14 (2021-08-18)

### Features

- The `x-enumDescriptions` specification extension now supports Markdown formatting inside the `description` field.

- Two new theming options are supported in Reference docs, letting you control the width of buttons in the _Try it_ console. The options are called `components.tryItButton.fullWidth` and `components.tryItSendButton.fullWidth`. By default, both are set to `false` (disabled), which means the buttons are not set to their full width.

### Fixes

- Improved the approach to wrapping the request URL before the **Send** button in the _Try it_.

---

## 2.0.13 (2021-08-17)

### Fixes

- Resolved an issue with incorrect bearer token parsing.

- Resolved an issue where the security token was not used when the security definition name contained a dot (`.`).

---

## 2.0.12 (2021-08-17)

### Fixes

- Resolved an issue with `enum` values not displayed properly that was introduced in `2.0.11`.

- The _Try it_ console no longer crashes when the security definition name contains a dot (`.`).

---

## 2.0.11 (2021-08-16)

### Fixes

- Resolved an issue with the `x-enumDescriptions` specification extension not working properly.

- Nested schemas are no longer too condensed without the `description` field.

- Resolved an issue with the width of the discriminator dropdown.

- Implemented a workaround to prevent the discriminator dropdown from overflowing the bottom of the scrolling container.

- Resolved an issue where the default value in query parameters with enums was not properly populated in the endpoint URL.

- Resolved an issue with the _Try it_ console not functioning for the OAuth2 authorization code flow.

---

## 2.0.10 (2021-08-11)

### Fixes

- Resolved an issue where `nullable` objects were displayed without nested fields.

---

## 2.0.9 (2021-08-05)

### Fixes

- Resolved an issue with the wrong text color of the active `oneOf` button in specific theming configurations.

---

## 2.0.8 (2021-08-05)

### Fixes

- Improved the spacing of properties in schema tables by reducing unnecessary gaps.

- Implemented minor improvements to deep links.

---

## 2.0.7 (2021-08-05)

Internal changes.

---

## 2.0.6 (2021-08-03)

### Features

- Go is now one of the languages in which Reference docs can automatically generate code samples.

- Support for OpenAPI 3.1 has been further improved by changes related to `contentEncoding` and `contentMediaType`.

### Fixes

- Resolved the `object possibly undefined` issue that would happen during bundling.

---

## 2.0.5 (2021-07-20)

### Fixes

- Resolved an events issue when sending requests from the _Try it_ console.

---

## 2.0.4 (2021-07-20)

### Features

- You can now use the new configuration option `generatedPayloadSamplesMaxDepth` to control the maximum number of schema levels displayed in automatically generated payload samples.

### Fixes

- Added support for `x-examples` and `x-example` specification extensions in OAS 2.0 documents.

---

## Reference docs 2.0 [2.0.3] (2021-07-08)

### Features

- This major release of Reference docs brings a complete visual overhaul to your API reference docs! Enjoy the new, clean and modern look with many usability and performance improvements under the hood.

Notice the following changes:

- Sticky language selection in code sample tabs persists between page reloads and across all operations on the page.
- Deep links let you quickly and easily access parameters and properties in response/request schemas.
- OpenAPI 3.1 is now supported, and Reference docs can build API documentation from your API definitions that use it.
- When using the search functionality, the results are now more readable and displayed in a centered floating window.
- The two buttons in the upper right corner let you control the layout of the page. Select **Hide samples** to remove the right panel with code samples and center the middle panel contents. Select **Change layout** to move the contents of the right panel into the middle panel.
- All request and response sections in middle and right panels are now expandable, and can be expanded/collapsed independently of one another.
- The **Try it** button is now smaller and fits right next to the operation in the right panel. The operation section can expand to show the list of servers.
- You can limit how many code sample tabs to show by default in the right panel with the `samplesTabsMaxCount` configuration option. The rest of the tabs are automatically folded into a "show more" menu.
- Models with `oneOf`, `anyOf`, `allOf` are now displayed in tabs within the middle panel.

**For the full list of changes and upgrade instructions, make sure to read the [migration guide](./guides/migration-guide-2-0.md).**

{% admonition type="warning" name=" How to roll back to the old Reference docs design?" %}
Users who work with Reference docs on-premise should set the `@redocly/reference-docs` version to `1.5.14` to use the old Reference docs design.

For Reference docs hosted in Workflows, select `v1.x (legacy)` in the version dropdown on the **Settings > API reference settings** page of your Reference docs project.
{% /admonition %}

- You can now use custom hooks to inject additional components and modify or override the default Reference docs layout. The following new hooks are supported: `beforeOperation`, `afterOperation`, `beforeOperationSummary`, `afterOperationSummary`, `ReplaceTryItSecurityPanel`.

### Fixes

- Resolved a number of performance and usability issues as part of the redesign.

- Resolved an issue in the _Try it_ console where the password field content overlapped the show/hide button.

- Minor improvements to buttons.

- Fixed the wrong color of the operation path.

- Improved padding between panels when using the `showDarkRightPanel` theming option.

---

## 1.5.14 (2021-07-02)

### Fixes

- Resolved an issue where optional request parameters were included in requests sent from the _Try it_ console even when their values were empty.

---

## 1.5.13 (2021-06-22)

### Features

- A new specification extension `x-defaultClientId` is now supported by Reference docs. Use it in your OpenAPI documents to preset the default `clientId` value in relevant security definitions; for example:

```yaml
type: oauth2
flows:
  implicit:
    x-defaultClientId: example123
    authorizationUrl: https://example.com/api/oauth/dialog
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets
```

### Fixes

- Resolved an issue that prevented the _Try it_ console from functioning properly.

---

## 1.5.12 (2021-06-21)

### Fixes

- Resolved an issue with custom favicon settings that were not applied (the favicon was not visible for the API reference documentation page). Additionally, you can now set a custom favicon when using the Reference docs CLI tool (for example, `reference-docs build openapi.yaml favicon=image.png`).

---

## 1.5.11 (2021-06-16)

### Fixes

- Resolved an issue with the _Try it_ console where an error was displayed in the _Auth_ tab after users corrected their previously incorrect credentials.

- Text in the **Payload** section for response and request samples now correctly applies typography theme settings and uses the font configured in `theme.typography.code.fontFamily`.

---

## 1.5.10 (2021-06-16)

### Fixes

- Resolved an issue that caused a crash when using the Reference docs library with Jest unit tests and a proxy-based mock.

---

## 1.5.9 (2021-06-15)

### Fixes

- Resolved an issue that caused a crash when using the Reference docs library with Jest unit tests without a CSS preprocessor.

---

## 1.5.8 (2021-06-10)

### Fixes

- Resolved a compatibility issue with Webpack 5 so that it no longer requires a special loader when used with Redocly libraries.

---

## 1.5.7 (2021-06-01)

### Fixes

- Resolved an issue with incorrect width of the schema element in the middle panel.

---

## 1.5.6 (2021-06-01)

### Features

- When documenting `enum` values in your OpenAPI definition, you can now add an individual description for each of the values by using the `x-enumDescriptions` object. Reference docs displays the `enum` values and their descriptions as a table in the schema, in the same order as they are listed in the API definition. The table contents are partially hidden and can be expanded on click if there are more `enum` values than specified by the `maxDisplayedEnumValues` configuration option.

The following example shows how to add descriptions to `enum` values in your OpenAPI definition:

```yaml
user_status:
  type: string
  title: Status indicator
  description: 'Indicates the status of the user account. This status is visible only internally to account administrators.'
  x-enumDescriptions:
    ON: User account activated
    OFF: User account deactivated
    BAN: User account banned permanently
    CAT: User is a cat
```

---

## 1.5.5 (2021-05-24)

### Fixes

- Schemas can now be horizontally scrolled when their contents overflow the width of the middle panel.

---

## 1.5.4 (2021-05-20)

### Features

- You can now replace the default "Username" and "Password" label text in the _Try it_ authorization section with any custom text. To do that, use the following options in your Reference docs configuration file(s):

```yaml
labels:
  tryItAuthBasicUsername: 'Your custom username label'
  tryItAuthBasicPassword: 'Your custom password label'
```

---

## 1.5.3 (2021-05-20)

### Fixes

- Resolved an issue with the _Try it_ console which prevented long request bodies from being displayed.

---

## 1.5.2 (2021-05-17)

### Fixes

- Resolved an issue with the _Try it_ console sending the `Accept` header for wrong media types in requests.

---

## 1.5.1 (2021-05-11)

### Fixes

- `Authorizations` are now supported in `labels` and can be overridden in custom components.

---

## 1.5.0 (2021-05-06)

### Features

- A new configuration option `schemaExpansionLevel` lets you automatically expand schemas in your Reference docs. Set it to `all` to expand all schemas regardless of their level, or set it to a number to expand schemas up to the specified level. For example, `schemaExpansionLevel: 3` expands schemas up to three levels deep. The default value is `0`, meaning no schemas are expanded automatically.

- The `reference-docs` CLI tool now supports an option called `--html-template-variables`. Use it to pass custom dynamic values to your Reference docs HTML template at build time. For example, if your HTML template contains `{{{CUSTOM_VARIABLE}}}`, you can run `npx @redocly/reference-docs build openapi.yaml --html-template-variables '{"CUSTOM_VARIABLE": "Redocly"}'` to set its value to "Redocly". Note that the following variable names are reserved: `redocBody`, `redocHTML`, `title`, `redocHead`.

---

## 1.4.0 (2021-04-29)

### Features

- This major release of Reference docs marks an important point for users who rely on the Reference docs package. **The `@redocly/reference-docs-lib` package is now deprecated. For all use cases, you should use only the `@redocly/reference-docs` package (as the CLI tool and the React library)**.

### Fixes

- Resolved an issue where items for `object` query parameters were not displayed in the _Try it_ console.

---

## 1.3.27 (2021-04-12)

### Features

- Improved path parameter handling in auto-generated code samples.

### Fixes

- Checkboxes for oAuth2 scopes in the clientCredentials flow are now properly rendered in the _Try it_ console.

---

## 1.3.26 (2021-03-30)

### Fixes

- Resolved an issue with Reference docs crashing when `operationId` was not defined for `x-webhooks`.

- Resolved an issue that affected the `required` parameter label position and caused extra white spaces in Reference docs labels.

---

## 1.3.25 (2021-03-30)

Broken release.

---

## 1.3.24 (2021-03-30)

### Features

- The `rightPanel > width` theming option now supports media query values, allowing you to customize it depending on the screen size (example: `rightPanel: { width: { medium: '40%', large: '800px'}}`).

### Fixes

- Pinned the version of the `informed` library to prevent an infinite loop when opening the _Try it_ console.

- Long multiline examples/enum values wrap now and do not overflow the parent container.

---

## 1.3.23 (2021-03-26)

### Fixes

- Resolved an issue with incorrect width of the _Try it_ console.

---

## 1.3.22 (2021-03-26)

### Fixes

- Resolved an issue with escaping curly brackets in curl code samples. The fix from Reference docs 1.3.20 is now properly implemented.

- Pinned the versions for Redocly dependencies `redoc-int` and `vscode-json-languageservice`.

---

## 1.3.21 (2021-03-25)

### Fixes

- Reverted the curly brackets fix implemented in the previous version.

---

## 1.3.20 (2021-03-25)

### Fixes

- Implemented several corrections for imports in auto-generated Java code samples.

- Resolved an issue with the missing JSON library import in auto-generated Java code samples.

- Curly brackets in curl code samples are no longer automatically escaped to allow representing variables as a template or a placeholder in the code sample.

---

## 1.3.19 (2021-03-16)

### Fixes

- Resolved an issue with `pagination: item` and `pagination: section` not working when an operation had the `#` symbol in its `operationId`.

- The Try It console now sends the correct payload format when using the `application/x-www-form-urlencoded` content type.

- Resolved an issue with path parameters not being replaced by user-provided values in the Try It console.

---

## 1.3.18 (2021-03-05)

### Features

- Simplified pagination settings are now supported in Reference docs. To configure pagination for your Reference docs, add the `pagination` key to the `referenceDocs` section of your `redocly.yaml` configuration file.

The `pagination` key can be set to any of the following values: `none` (all content is rendered on a single long page), `section` (each tag with a set of associated operations is rendered as a separate page), and `item` (each tag and operation items are rendered on separate pages). The default value is `none`.

### Deprecated

- The following configuration options for Reference docs have been deprecated, and their functionality superseded by the new `pagination` option. These options are still supported in `.redocly.yaml` configuration file(s), but the build logs show warnings if you continue using them. **We strongly recommend adjusting your configuration files to use the new pagination option.**

`layout.scope = all | section | item`

`layout.markdownItemsScope = all | section`

`layout.showTag = true | false`

`layout.showInfoOnEachPage = true | false`

`routingStrategy = browser | hash`

- The default pagination behavior has changed for the following items, and it's no longer configurable:

  - The tag description will not be displayed on each operation page (previously controlled by `layout.showTag = false`)

  - Contents of the `info` object will not be shown on each page (previously controlled by `layout.showInfoOnEachPage = false`)

  - Markdown items from the `info` object are not paginated, and are always displayed on a single page

---

## 1.3.17 (2021-03-04)

### Features

- The _Try it_ API console UX has been improved by allowing users to send requests even if the payload is invalid. Additionally, payloads with $refs schemas are now properly supported in the _Try it_ console.

---

## 1.3.16 (2021-02-26)

### Fixes

- Resolved an issue with multi-version URLs for path-prefixed docs.

- Path-prefixed docs output now works with URLs that don't end with a trailing slash.

---

## 1.3.15 (2021-02-16)

### Features

- Hostnames ending with `.localhost` are now supported when using Reference docs on-premise (running a local development server).

- Reference docs CLI now supports the `--gzip` flag that outputs GZIP-compressed files directly when bundling your API definitions.

---

## 1.3.14 (2021-02-15)

### Fixes

- Resolved an issue with a false-positive "Recursive" label being displayed for parameters when using some combination of `allOf` and `oneOf`.

- The request payload body in the Try It console was not visible until the user clicked in the console area.

---

## 1.3.12 (2021-02-02)

### Fixes

- Resolved an issue with the "Try it" console crashing for API definitions without security schemes.

---

## 1.3.11 (2021-01-31)

### Fixes

- The menu toggle button in mobile view is now functional again. Reference docs in Workflows must be rebuilt for this change to take effect.

- Implemented the latest fixes from Redoc to resolve crashes on multiple examples in the `parameter` object and on code highlights for boolean or number values in examples.

---

## 1.3.10 (2021-01-25)

### Fixes

- The HTTP scheme name (e.g. Bearer) is now capitalized in code samples.

---

## 1.3.9 (2021-01-14)

### Fixes

- Upgraded internal dependencies.

- Improved support for HTTP Bearer scheme.

- Switched to `enableStaticRendering` instead of the deprecated `useStaticRendering`.

---

## 1.3.7 (2020-12-16)

### Features

- Reference docs now support auto-generated C# and Python code samples.

### Fixes

- Resolved a number of typings and MobX observables issues.

- Fixed default indentation for generated code samples.

- Resolved an issue with broken Node.js and JavaScript code samples.

- Resolved an issue with Basic Authentication in Python code samples.

---

## 1.3.6 (2020-12-01)

### Features

- The "Try it" button has moved to a new place<!-- , and you can now hide or show the entire right-side panel with code samples by using the new toggle button-->.

### Fixes

- Resolved an issue with failing examples that had empty headers.

- Deprecated `specs` in favor of `definitions`.

- Fixed an issue with empty headers.

---

## 1.3.5 (2020-11-15)

### Fixes

- Fixed a memory overflow issue on some complicated definitions (with combinatorial explosion pattern). This change has been propagated to Redocly Workflows.

---

## 1.3.4 (2020-11-11)

### Fixes

- Upgraded some internal dependencies.

- Resolved mime-type issues in code samples and issues with OAuth2 clientCredentials with empty scopes.

- Resolved an issue with hash history removing page path on scroll.

---

## 1.3.3 (2020-11-05)

### Features

- Implemented improvements for handling OAuth2.

---

## 1.3.2 (2020-11-02)

### Fixes

- Removed console.log.

---

## 1.3.1 (2020-10-29)

### Fixes

- Fixed TypeScript emit issues.

---

## 1.3.0 (2020-10-29)

### Features

- Integration with our open-source product Redoc has been upgraded to the latest version to support the `hideRequestPayloadSample` configuration option.

- Improved Basic Authentication handling.

- Implemented a number of improvements to code samples.

- Converted code samples to async/await.

- Renamed cURL to curl.

### Fixes

- Fixed `url-encoded` and `x-www-form-urlencoded`.

- Exported setSecurityDetails from standalone package.

- Resolved an issue with multiple auth types.

- Implemented a number of SSR and internal fixes.

- Copied httpsnippet to the repository.

---

## 1.2.8 (2020-10-28)

### Fixes

- Resolved an issue with broken oneOf when used in recursive schemas.

---

## 1.2.7 (2020-10-27)

### Features

- Implemented a new theming option called `schema.breakFieldNames`.

### Fixes

- Fixed a crash in next-to button caused by an empty tag.

---

## 1.2.6 (2020-10-21)

### Fixes

- Resolved an issue with a broken package due to an invalid .npmignore setup.

- Fixed a server-side crash caused by consecutive use of the "Try it" console.

---

## 1.2.5 (2020-10-16)

### Features

- Implemented the `corsProxyUrl` configuration parameter.

### Fixes

- Fixed a crash caused by empty response.

- Resolved an issue with "Try it" console crashing for API definitions with server variables.

- Implemented URL protocol normalization to automatically add `https` when a URL starts with `//`.

---

## 1.2.4 (2020-10-06)

### Features

- Search is now loading from webworker.

---

## 1.2.3 (2020-09-21)

### Fixes

- Upgraded openapi-sampler to fix a memory overflow issue.

- Fixed a crash caused by empty auth schema.

---

## 1.2.2 (2020-09-14)

### Features

- Implemented support for OAuth2 implicit and OpenID Connect.

### Fixes

- Crashes no longer happen on "Try it" blob response.

- Fixed issues that caused crashes and broken server-side rendering when search is disabled.

---

## 1.2.1 (2020-10-10)

### Features

- Reference docs can now use schema or pointer for the `schema` component.

### Fixes

- Full width panel is now used for components without samples.

- Fixed a crash that would happen when disposing the search store.

- Resolved an issue with wrong console width set on initial load.

- Fixed a broken import in the "Try it" feature.

---

## 1.2.0 (2020-08-25)

Reference docs 1.2.0 release!

---
