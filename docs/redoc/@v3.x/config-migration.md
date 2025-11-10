---
seo:
  title: Migration from Redoc 2.x to 3.x
---

# Migration from Redoc 2.x to 3.x

## Configuration options changes

The following tables show the changes in configuration options between Redoc 2.x and the newest Redoc 3.x configuration.

{% table %}

- Feature/Option
- Old Interface (`Options`)
- New Interface (`Options`)

---

- `theme`
- `ResolvedThemeInterface`
- Removed

---

- `scrollYOffset`
- `() => number`
- `() => number`

---

- `hideHostname`
- `boolean`
- Removed

---

- `expandResponses`
- `{ [code: string]: boolean } |'all'`
- Removed

---

- `requiredPropsFirst`
- `boolean`
- `sortRequiredPropsFirst: boolean`

---

- `sortPropsAlphabetically`
- `boolean`
- Removed

---

- `sortEnumValuesAlphabetically`
- `boolean`
- Removed

---

- `sortOperationsAlphabetically`
- `boolean`
- Removed

---

- `sortTagsAlphabetically`
- `boolean`
- Removed

---

- `nativeScrollbars`
- `boolean`
- Removed

---

- `pathInMiddlePanel`
- `boolean`
- Removed

---

- `hideDownloadButtons`
- `boolean | null`
- `boolean | null`

---

- `downloadDefinitionUrl`
- `string`
- `downloadUrls?: DownloadUrlsConfig`

---

- `disableSearch`
- `boolean`
- Removed

---

- `onlyRequiredInSamples`
- `boolean`
- `boolean`

---

- `generatedPayloadSamplesMaxDepth`
- `number`
- `generatedSamplesMaxDepth: number`

---

- `showExtensions`
- `boolean | string[]`
- `string | string[] | boolean`

---

- `hideSingleRequestSampleTab`
- `boolean`
- Removed

---

- `hideRequestPayloadSample`
- `boolean`
- Removed

---

- `menuToggle`
- `boolean`
- Removed

---

- `jsonSampleExpandLevel`
- `number`
- `jsonSamplesExpandLevel: number`

---

- `enumSkipQuotes`
- `boolean`
- Removed

---

- `hideSchemaTitles`
- `boolean`
- `boolean`

---

- `hideSecuritySection`
- `boolean`
- Removed

---

- `showSecuritySchemeType`
- `boolean`
- Removed

---

- `simpleOneOfTypeLabel`
- `boolean`
- Removed

---

- `payloadSampleIdx`
- `number`
- Removed

---

- `expandSingleSchemaField`
- `boolean`
- Removed

---

- `schemaExpansionLevel`
- `number`
- `schemasExpansionLevel: number | undefined`

---

- `allowedMdComponents`
- `Record<string, MDXComponentMeta>`
- Removed

---

- `expandDefaultServerVariables`
- `boolean`
- Removed

---

- `maxDisplayedEnumValues`
- `number`
- `number`

---

- `ignoreNamedSchemas`
- `Set<string>`
- `Set<string>`

---

- `unstable_ignoreMimeParameters`
- `boolean`
- Removed

---

- `hideSidebar`
- `boolean`
- `boolean`

---

- `hideLoading`
- `boolean`
- `boolean`

---

- `hidePropertiesPrefix`
- `boolean`
- `boolean`

---

- `hideSchemaPattern`
- `boolean`
- Removed

---

- `schemaDefinitionsTagName`
- `string`
- `string`

---

- `minCharacterLengthToInitSearch`
- `number`
- Removed

---

- `showWebhookVerb`
- `boolean`
- Removed

---

- `showObjectSchemaExamples`
- `boolean`
- Removed

---

{% /table %}

## Summary of changes

- **Renamed Options**: Some options have been renamed for clarity or alignment with their functionalities, such as `generatedPayloadSamplesMaxDepth` to `generatedSamplesMaxDepth`.
- **Removed Features**: Several options related to UI customizations and response handling have been removed.
- **Unchanged Options**: Some options remain unchanged, indicating their continued relevance in the new configuration.
- **New Options**: The new interface introduces several options, suggesting new functionalities or approaches.
