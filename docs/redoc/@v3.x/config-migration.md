---
seo:
  title: Migration from Redoc CE 2.x to 3.x
---

# Migration from Redoc CE 2.x to 3.x

The following table contains the changes in configuration options between Redoc CE 2.x and the newest Redoc CE 3.x configuration.

{% table %}

- Feature/Option
- Old Interface (`Options`)
- New Interface (`Options`)

---

- `theme`
- `ResolvedThemeInterface`
- Removed

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

- `downloadDefinitionUrl`
- `string`
- `downloadUrls?: DownloadUrlsConfig`

---

- `disableSearch`
- `boolean`
- Removed

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

- `unstable_ignoreMimeParameters`
- `boolean`
- Removed

---

- `hideSchemaPattern`
- `boolean`
- Removed

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

## Resources

- **[Configure Redoc CE](./config.md)** - See configuration options for Redoc 3.x
