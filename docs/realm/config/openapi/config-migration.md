# Configuration options changes between reference docs 2.x and newest Redoc configuration

{% table %}
* Feature/Option
* Old Interface (`Options`)
* New Interface (`Options`)
* Notes
---
* **General**
---
* `theme`
* `ResolvedThemeInterface`
* Removed
* Deleted
---
* `scrollYOffset`
* `() => number`
* `() => number`
* Unchanged
---
* `hideHostname`
* `boolean`
* Removed
* Deleted
---
* `hideInfoDescription`
* `boolean`
* Removed
* Deleted
---
* `expandResponses`
* `{ [code: string]: boolean } |'all'`
* Removed
* Deleted
---
* `requiredPropsFirst`
* `boolean`
* `sortRequiredPropsFirst: boolean`
* Renamed
---
* `sortPropsAlphabetically`
* `boolean`
* Removed
* Deleted
---
* `sortEnumValuesAlphabetically`
* `boolean`
* Removed
* Deleted
---
* `sortOperationsAlphabetically`
* `boolean`
* Removed
* Deleted
---
* `sortTagsAlphabetically`
* `boolean`
* Removed
* Deleted
---
* `nativeScrollbars`
* `boolean`
* Removed
* Deleted
---
* `pathInMiddlePanel`
* `boolean`
* Removed
* Deleted
---
* `untrustedDefinition`
* `boolean`
* Removed
* Deleted
---
* `hideDownloadButtons`
* `boolean | null`
* `boolean | null`
* Unchanged
---
* `downloadDefinitionUrl`
* `string`
* `downloadUrls?: DownloadUrlsConfig`
* Renamed and type changed
---
* `disableSearch`
* `boolean`
* Removed
* Deleted
---
* `showChangeLayoutButton`
* `boolean | string`
* Removed
* Deleted
---
* `onlyRequiredInSamples`
* `boolean`
* `boolean`
* Unchanged
---
* `showConsole`
* `boolean`
* Removed
* Deleted
---
* `sendXUserAgentInTryIt`
* `boolean`
* Removed
* Deleted
---
* `generatedPayloadSamplesMaxDepth`
* `number`
* `generatedSamplesMaxDepth: number`
* Renamed
---
* `showExtensions`
* `boolean | string[]`
* `string | string[] | boolean`
* Type changed
---
* `preserveOriginalExtensionsName`
* `boolean`
* Removed
* Deleted
---
* `hideSingleRequestSampleTab`
* `boolean`
* Removed
* Deleted
---
* `hideRequestPayloadSample`
* `boolean`
* Removed
* Deleted
---
* `menuToggle`
* `boolean`
* Removed
* Deleted
---
* `jsonSampleExpandLevel`
* `number`
* `jsonSamplesExpandLevel: number`
* Renamed
---
* `enumSkipQuotes`
* `boolean`
* Removed
* Deleted
---
* `hideSchemaTitles`
* `boolean`
* `boolean`
* Unchanged
---
* `hideSecuritySection`
* `boolean`
* Removed
* Deleted
---
* `showSecuritySchemeType`
* `boolean`
* Removed
* Deleted
---
* `simpleOneOfTypeLabel`
* `boolean`
* Removed
* Deleted
---
* `payloadSampleIdx`
* `number`
* Removed
* Deleted
---
* `expandSingleSchemaField`
* `boolean`
* Removed
* Deleted
---
* `schemaExpansionLevel`
* `number`
* `schemasExpansionLevel: number | undefined`
* Renamed and type changed
---
* `samplesTabsMaxCount`
* `number`
* Removed
* Deleted
---
* `mockServer`
* `{ url: string; position: 'first' | 'last' | 'replace' | 'off'; description: string }`
* `{ url: string; position: 'first' | 'last' | 'replace' | 'off'; description: string }`
* Unchanged
---
* `unstable_tryItButtonOverride`
* `{ label: string; link?: string; onClick?: () => void } | null`
* Removed
* Deleted
---
* `allowedMdComponents`
* `Record<string, MDXComponentMeta>`
* Removed
* Deleted
---
* `expandDefaultServerVariables`
* `boolean`
* Removed
* Deleted
---
* `expandDefaultRequest`
* `boolean`
* Removed
* Deleted
---
* `expandDefaultResponse`
* `boolean`
* Removed
* Deleted
---
* `collapseRequestSamplePanel`
* `boolean`
* Removed
* Deleted
---
* `collapseResponseSamplePanel`
* `boolean`
* Removed
* Deleted
---
* `maxDisplayedEnumValues`
* `number`
* `number`
* Unchanged
---
* `ignoreNamedSchemas`
* `Set<string>`
* `Set<string>`
* Unchanged
---
* `unstable_ignoreMimeParameters`
* `boolean`
* Removed
* Deleted
---
* `unstable_externalCodeSamples`
* `Unstable_ExternalCodeSample[]`
* `Unstable_ExternalCodeSample[]`
* Unchanged
---
* `hooks`
* `HooksConfig`
* `unstable_hooks: HooksConfig`
* Renamed and required
---
* `hideSchemaPattern`
* `boolean`
* Removed
* Deleted
---
* `hideOneOfDescription`
* `boolean`
* Removed
* Deleted
---
* `hideFab`
* `boolean`
* Removed
* Deleted
---
* `markdownHeadingsAnchorLevel`
* `number`
* Removed
* Deleted
---
* `schemaDefinitionsTagName`
* `string`
* `string`
* Unchanged
---
* `minCharacterLengthToInitSearch`
* `number`
* Removed
* Deleted
---
* `maxResponseHeadersToShowInTryIt`
* `number`
* Removed
* Deleted
---
* `showWebhookVerb`
* `boolean`
* Removed
* Deleted
---
* `showObjectSchemaExamples`
* `boolean`
* Removed
* Deleted
---
* `showAccessMode`
* `boolean`
* Removed
* Deleted
---
* `disableTryItRequestUrlEncoding`
* `boolean`
* Removed
* Deleted
---
* **New Options**
* Not available
* Various (e.g., `feedback`, `events`, `routingBasePath`, etc.)
* Several new options added
{% /table %}

## Summary of changes

1. **Renamed Options**: Some options have been renamed for clarity or alignment with their functionalities, such as `generatedPayloadSamplesMaxDepth` to `generatedSamplesMaxDepth`.
2. **Removed Features**: Several options related to UI customizations and response handling have been removed.
3. **Unchanged Options**: Some options remain unchanged, indicating their continued relevance in the new configuration.
4. **New Options**: The new interface introduces several options, suggesting new functionalities or approaches.