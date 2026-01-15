# Configure Redoc CE

Redoc CE comes with many configuration options to help you customize your API documentation.

Each deployment type has documentation on how to configure options for that type of Redoc CE project.
This page lists all the options you can use with Redoc CE.

**Versions: 2.x**

{% admonition type="info" name="Client-side configuration" %}

If you use Redoc CE as a standalone (HTML or React) tool, provide the options on these page in kebab case.
For example, `scrollYOffset` becomes `scroll-y-offset`, and `expandResponses` becomes `expand-responses`.

{% /admonition %}

## Functional settings

{% table %}

- Option
- Type
- Description

---

- disableSearch
- boolean
- When `true`, disables search indexing and hides the search box from the API documentation page.

---

- minCharacterLengthToInitSearch
- string
- Sets the minimum amount of characters that need to be typed into the search dialog to initiate the search.

  Default: 3.

---

- hideDownloadButtons
- boolean
- When `true`, hides the 'Download' button for saving the API definition source file.
  This setting **does not** make the API definition private; it just hides the button.

---

- hideLoading
- boolean
- When `true`, hides the loading animation.
  Does not apply to CLI or Workflows-rendered docs.

---

- hideSchemaTitles
- boolean
- When `true`, hides the schema title next to to the type.

---

- jsonSamplesExpandLevel
- string
- Sets the default expand level for JSON payload samples (response and request body).
  The maximum supported value is `'+Infinity'`.
  Set the value to `all` to expand all levels.

  Default: `2`.

---

- maxDisplayedEnumValues
- string
- Displays only the specified number of enum values.
  The remaining values are hidden in an expandable area.
  If not set, all values are displayed.

---

- onlyRequiredInSamples
- boolean
- When `true`, displays only the required fields in request samples.

---

- sortRequiredPropsFirst
- boolean
- When `true`, displays the required properties in schemas first, in the same order as in the `required` array.

---

- schemasExpansionLevel
- string
- Specifies how many schema levels to automatically expand.
  Allowed values: `all` or a number.
  `all` expands all schemas regardless of their level.
  For example, `schemasExpansionLevel: 3` expands schemas up to three levels deep.

  Default: `0` - no schemas are expanded automatically.

---

- scrollYOffset
- string
- Specifies a vertical scroll-offset.
  This setting is useful when there are fixed positioned elements at the top of the page, such as navbars, headers, etc.

  You can specify the `scrollYOffset` value:
  - as a number - a fixed number of pixels as the offset.
  - as a CSS selector - the selector of an element.
    The distance from the top of the page to the element's bottom is used as the offset.
  - a getter function - must return a number representing the offset (in pixels).

---

- showExtensions
- boolean | [string]
- Displays specification extensions ('x-' fields).
  Extensions used by Redoc CE are ignored.
  The value can be boolean or a list of extension names.
  When `true`, displays all extensions.

---

- sanitize
- boolean
- If set to `true`, the API definition is considered untrusted and all HTML and Markdown is sanitized to prevent cross-site scripting (XSS).

---

- downloadUrls
- [string]
- Set the URLs to download the OpenAPI description or other documentation related files from the API documentation page.

---

- schemaDefinitionsTagName
- string
- If a value is set, all of the schemas render with the designated tag name.
  The schemas then render and display in the sidebar navigation (with that associated tag name).

---

- generatedSamplesMaxDepth
- string
- Controls how many schema levels are automatically generated for payload samples.

  Default: `8`.

---

- hidePropertiesPrefix
- boolean
- If true, hides parent names for nested properties in complex data structures or object schemas.

  Default: `true`.
---

{% /table %}

## Deprecated Functional settings

The following options are deprecated from Redoc CE v2.x onwards.

<details>

{% table %}

- Option
- Description

---

- hideDownloadButton
- Hides the 'Download' button for saving the API definition source file.
**This setting does not make the API definition private**; it just hides the button.

---

- downloadFileName
- Sets the filename for the downloaded API definition source file.

---

- downloadDefinitionUrl
- Sets the URL for the downloaded API definition source file.

---

- requiredPropsFirst
- Shows required properties in schemas first, ordered in the same order as in the required array.

---

- jsonSampleExpandLevel
- Sets the default expand level for JSON payload samples (response and request body).
  The default value is 2, and the maximum supported value is `'+Infinity'`.
  It can also be configured as a string with the special value `all` that expands all levels.

  _Default: 2_

---

- schemaExpansionLevel
- Specifies whether to automatically expand schemas in Reference docs.
  Set it to `all` to expand all schemas regardless of their level, or set it to a number to expand schemas up to the specified level.
  For example, `schemaExpansionLevel: 3` expands schemas up to three levels deep.
  The default value is `0`, meaning no schemas are expanded automatically.

---

- expandDefaultServerVariables
- Enables or disables expanding default server variables.

---

- expandResponses
- Controls which responses to expand by default.
  Specify one or more responses by providing their response codes as a comma-separated list without spaces, for example `expandResponses='200,201'`.
  Special value 'all' expands all responses by default.
  Be careful: this option can slow down documentation rendering time.

---

- expandSingleSchemaField
- Automatically expands the single field in a schema.

---

- hideHostname
- When set to `true`, the protocol and hostname are not shown in the operation definition.

---

- hideRequestPayloadSample
- Hides request payload examples.

---

- hideOneOfDescription
- When set to `true`, the description for `oneOf`/`anyOf` object is not shown in the schema.

---

- hideSchemaPattern
- When set to `true`, the pattern is not shown in the schema.

---

- hideSecuritySection
- Hides the Security panel section.

---

- hideSingleRequestSampleTab
- Hides the request sample tab for requests with only one sample.

---

- menuToggle
- When set to `true`, selecting an expanded item in the sidebar twice collapses it.

  _Default: true_

---

- nativeScrollbars
- When set to `true`, the sidebar uses the native scrollbar instead of perfect-scroll.
  This setting is a scrolling performance optimization for big API definitions.

---

- pathInMiddlePanel
- Displays the path link and HTTP verb in the middle panel instead of the right panel.

---

- payloadSampleIdx
- If set, the payload sample is inserted at the specified index.
  If there are `N` payload samples and the value configured here is bigger than `N`, the payload sample is inserted last.
  Indexes start from 0.

---

- showObjectSchemaExamples
- Shows object schema example in the properties; default `false`.

---

- showWebhookVerb
- When set to `true`, shows the HTTP request method for webhooks in operations and in the sidebar.

---

- simpleOneOfTypeLabel
- Shows only unique `oneOf` types in the label without titles.

---

- sortEnumValuesAlphabetically
- When set to `true`, sorts all enum values in all schemas alphabetically.

---

- sortOperationsAlphabetically
- When set to `true`, sorts operations in the navigation sidebar and in the middle panel alphabetically.

---

- sortPropsAlphabetically
- When set to `true`, sorts properties in all schemas alphabetically.

---

- sortTagsAlphabetically
- When set to `true`, sorts tags in the navigation sidebar and in the middle panel alphabetically.
  Note that only tags are sorted alphabetically in the middle panel, not the operations associated with each tag.
  To sort operations alphabetically as well, you must set the `sortOperationsAlphabetically` setting to `true`.

  _Default: false_

---

- untrustedSpec
- If set to `true`, the API definition is considered untrusted and all HTML/Markdown is sanitized to prevent XSS.

---

{% /table %}

</details>

## Theme settings
Change styles for the API documentation page.
**Supported in Redoc CE 2.x**.

- `spacing`
  - `unit`: 5 # main spacing unit used in autocomputed theme values later
  - `sectionHorizontal`: 40 # Horizontal section padding. COMPUTED: spacing.unit * 8
  - `sectionVertical`: 40 # Horizontal section padding. COMPUTED: spacing.unit * 8
- `breakpoints` # breakpoints for switching three/two and mobile view layouts
  - `small`: '50rem'
  - `medium`: '85rem'
  - `large`: '105rem'
- `colors`
  - `tonalOffset`: 0.3 # default tonal offset used in computations
- `typography`
  - `fontSize`: '14px'
  - `lineHeight`: '1.5em'
  - `fontWeightRegular`: '400'
  - `fontWeightBold`: '600'
  - `fontWeightLight`: '300'
  - `fontFamily`: 'Roboto, sans-serif'
  - `smoothing`: 'antialiased'
  - `optimizeSpeed`: true
  - `headings`
    - `fontFamily`: 'Montserrat, sans-serif'
    - `fontWeight`: '400'
    - `lineHeight`: '1.6em'
  - `code` # inline code styling
    - `fontSize`: '13px'
    - `fontFamily`: 'Courier, monospace'
    - `lineHeight`: # COMPUTED: typography.lineHeight
    - `fontWeight`: # COMPUTED: typography.fontWeightRegular
    - `color`: '#e53935'
    - `backgroundColor`: 'rgba(38, 50, 56, 0.05)'
    - `wrap`: false # whether to break word for inline blocks (otherwise they can overflow)
  - `links`
    - `color`: # COMPUTED: colors.primary.main
    - `visited`: # COMPUTED: typography.links.color
    - `hover`: # COMPUTED: lighten(0.2 typography.links.color)
    - `textDecoration`: 'auto'
    - `hoverTextDecoration`: 'auto'
- `sidebar`
  - `width`: '260px'
  - `backgroundColor`: '#fafafa'
  - `textColor`: '#333333'
  - `activeTextColor`: # COMPUTED: theme.sidebar.textColor (if set by user) or theme.colors.primary.main
  - `groupItems` # Group headings
    - `activeBackgroundColor`: # COMPUTED: theme.sidebar.backgroundColor
    - `activeTextColor`: # COMPUTED: theme.sidebar.activeTextColor
    - `textTransform`: 'uppercase'
  - `level1Items` # Level 1 items like tags or section 1st level items
    - `activeBackgroundColor`: # COMPUTED: theme.sidebar.backgroundColor
    - `activeTextColor`: # COMPUTED: theme.sidebar.activeTextColor
    - `textTransform`: 'none'
  - `arrow` # sidebar arrow
    - `size`: '1.5em'
    - `color`: # COMPUTED: theme.sidebar.textColor
- `logo`
  - `maxHeight`: # COMPUTED: sidebar.width
  - `maxWidth`: # COMPUTED: sidebar.width
  - `gutter`: '2px' # logo image padding
- `rightPanel`
  - `backgroundColor`: '#263238'
  - `width`: '40%'
  - `textColor`: '#ffffff'
  - `servers`
    - `overlay`
      - `backgroundColor`: '#fafafa'
      - `textColor`: '#263238'
    - `url`
      - `backgroundColor`: '#fff'
- `fab`
  - `backgroundColor`: '#263238'
  - `color`: '#ffffff'

## Additional customization

### Security Definition location

You can inject the Security Definitions widget into any place in your definition `description`.
For more information, refer to [Security definitions injection](./security-definitions-injection.md).

### OpenAPI specification extensions

Redoc CE uses the following [specification extensions](https://redocly.com/docs-legacy/api-reference-docs/spec-extensions/):
- [`x-logo`](./redoc-vendor-extensions.md#x-logo) - is used to specify API logo
- [`x-traitTag`](./redoc-vendor-extensions.md#x-traittag) - useful for handling out common things like Pagination, Rate-Limits, etc
- [`x-codeSamples`](./redoc-vendor-extensions.md#x-codesamples) - specify operation code samples
- [`x-examples`](./redoc-vendor-extensions.md#x-examples) - specify JSON example for requests
- [`x-nullable`](./redoc-vendor-extensions.md#x-nullable) - mark schema param as a nullable
- [`x-displayName`](./redoc-vendor-extensions.md#x-displayname) - specify human-friendly names for the menu categories
- [`x-tagGroups`](./redoc-vendor-extensions.md#x-taggroups) - group tags by categories in the side menu
- [`x-servers`](./redoc-vendor-extensions.md#x-servers) - ability to specify different servers for API (backported from OpenAPI 3.0)
- [`x-additionalPropertiesName`](./redoc-vendor-extensions.md#x-additionalpropertiesname) - ability to supply a descriptive name for the additional property keys
- [`x-summary`](./redoc-vendor-extensions.md#x-summary) - For Response object, use as the response button text, with description rendered under the button
- [`x-explicitMappingOnly`](./redoc-vendor-extensions.md#x-explicitmappingonly) - In Schemas, display a more descriptive property name in objects with additionalProperties when viewing the property list with an object

## Resources

- **[Redoc CE deployment guide](./deployment/intro.md)** - Learn about the different ways you can deploy API documentation with Redoc CE
- **[Use Redocly CLI with Redoc CE](./deployment/cli.md)** - Deploy API documentation using Redoc CE and Redocly CLI
- **[Use the Redoc CE Docker image](./deployment/docker.md)** - Deploy API documentation with Docker
- **[Use Redoc CE in HTML](./deployment/html.md)** - Deploy API documentation embedded in an HTML page
- **[Use Redoc CE React component](./deployment/react.md)** - Deploy API documentation in a React page
- **[Redoc CE vendor extensions](./redoc-vendor-extensions.md)** - Configure specification extensions in Redoc CE
- **[Security definitions injection](./security-definitions-injection.md)** - Learn how to add the Security Definitions widget to your API docs