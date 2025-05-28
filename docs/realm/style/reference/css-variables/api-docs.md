# API docs variables

## Dropdown

<details>
<summary>Dropdown</summary>

```css
--docs-dropdown-font-size: var(--font-size-base);
--docs-dropdown-text-color: var(--text-color-secondary);

--docs-dropdown-padding-vertical: 6px;
--docs-dropdown-padding-left: 10px;
--docs-dropdown-padding-right: 26px;
--docs-dropdown-padding: var(--docs-dropdown-padding-vertical) var(--docs-dropdown-padding-right) var(--docs-dropdown-padding-vertical) var(--docs-dropdown-padding-left);
--docs-dropdown-border: 1px solid var(--border-color-primary);
```

</details>

## Response Panel colors

<details>
<summary>Panel response common</summary>

```css
--panel-response-heading-padding: 10px 20px;
--panel-response-heading-font-size: var(--font-size-base);
--panel-response-heading-line-height: var(--line-height-sm);
--panel-response-heading-font-weight: var(--font-weight-bold);
--panel-response-heading-text-color: var(--text-color-primary);

--panel-response-body-text-color: var(--text-color-secondary);
```

</details>
<details>
<summary>Panel response success</summary>

```css
--panel-response-success-border-color: var(--color-success-border);
--panel-response-success-heading-bg-color: var(--color-success-bg);
--panel-response-success-heading-text-color: var(--panel-response-heading-text-color);
--panel-response-success-body-bg-color: transparent;
--panel-response-success-body-text-color: var(--panel-response-body-text-color);
```

</details>
<details>
<summary>Panel response error</summary>

```css
--panel-response-error-border-color: var(--color-error-border);
--panel-response-error-heading-bg-color: var(--color-error-bg);
--panel-response-error-heading-text-color: var(--panel-response-heading-text-color);
--panel-response-error-body-bg-color: transparent;
--panel-response-error-body-text-color: var(--panel-response-body-text-color);
```

</details>
<details>
<summary>Panel response redirect</summary>

```css
--panel-response-redirect-border-color: var(--color-warning-border);
--panel-response-redirect-heading-bg-color: var(--color-warning-bg);
--panel-response-redirect-heading-text-color: var(--panel-response-heading-text-color);
--panel-response-redirect-body-bg-color: transparent;
--panel-response-redirect-body-text-color: var(--panel-response-body-text-color);
```

</details>
<details>
<summary>Panel response info</summary>

```css
--panel-response-info-border-color: var(--color-info-border);
--panel-response-info-heading-bg-color: var(--color-info-bg);
--panel-response-info-heading-text-color: var(--panel-response-heading-text-color);
--panel-response-info-body-bg-color: transparent;
--panel-response-info-body-text-color: var(--panel-response-body-text-color);
```

</details>
<details>
<summary>Panel response callback</summary>

```css
--panel-response-callback-border-color: var(--color-blue-3);
--panel-response-callback-heading-bg-color: var(--color-blue-1);
--panel-response-callback-heading-text-color: var(--panel-response-heading-text-color);
--panel-response-callback-body-bg-color: transparent;
--panel-response-callback-body-text-color: var(--panel-response-body-text-color);
```

</details>

## Panels

### Panel common variables

<details>
<summary>Panel common variables</summary>

```css
--panel-gap-horizontal: var(--spacing-xl);
--panel-gap-vertical: var(--spacing-base);

--panel-border-radius: var(--border-radius);
--panel-border: 1px solid var(--border-color-secondary);

--panel-line-height: var(--line-height-base);
--panel-font-size: var(--font-size-base);
--panel-font-family: var(--font-family-base);
--panel-font-weight: var(--font-weight-semibold);

--panel-heading-font-family: var(--font-family-base);
--panel-heading-font-size: 18px;
--panel-heading-font-weight: var(--font-weight-bold);
--panel-heading-text-color: var(--text-color-primary);
--panel-heading-padding: var(--spacing-md);
--panel-heading-line-height: var(--line-height-base);
--panel-heading-white-space: 'nowrap';
--panel-heading-border: 1px solid var(--border-color-primary);

--panel-body-font-family: var(--font-family-base);
--panel-body-font-size: var(--font-size-base);
--panel-body-font-weight: var(--font-weight-regular);
--panel-body-text-color: var(--text-color-secondary);
--panel-body-padding: var(--spacing-md);
--panel-body-border: 1px solid var(--border-color-primary);
```

</details>

### Panel schemas

> classes `'panel-request-schemas','panel-response-schemas','panel-callback-schemas','panel-security-schemas','panel-default'`

<details>
<summary>Panel schemas with class</summary>

```css
.panel-request-schemas,
.panel-response-schemas,
.panel-callback-schemas,
.panel-security-schemas,
.panel-default {
  --panel-text-color: var(--text-color-primary);
  --panel-font-family-local: var(--panel-font-family);
  --panel-font-size-local: var(--panel-font-size);
  --panel-font-weight-local: var(--panel-font-weight);
  --panel-bg-color: var(--bg-color);
  --panel-border-local: var(--panel-border);
  --panel-border-radius-local: calc(1px + var(--panel-border-radius));
  --panel-chevron-icon-color: var(--text-color-primary);

  --panel-body-text-color: var(--panel-text-color);
  --panel-body-font-family-local: var(--panel-body-font-family);
  --panel-body-font-size-local: var(--panel-body-font-size);
  --panel-body-font-weight-local: var(--panel-body-font-weight);
  --panel-body-padding-local: var(--panel-body-padding);
  --panel-body-bg-color: var(--bg-color);
  --panel-body-border: var(--panel-body-border);

  --panel-heading-text-color: var(--panel-text-color);
  --panel-heading-font-family-local: var(--panel-heading-font-family);
  --panel-heading-font-size-local: var(--panel-heading-font-size);
  --panel-heading-font-weight-local: var(--panel-heading-font-weight);
  --panel-heading-line-height-local: var(--panel-heading-line-height);
  --panel-heading-padding-local: var(--panel-heading-padding);
  --panel-heading-bg-color: var(--bg-color);
  --panel-heading-border: var(--panel-heading-border);
  --panel-heading-white-space-local: var(--panel-heading-white-space);
}
```

</details>

### Panel samples common

<details>
<summary>Panel samples common</summary>

```css
--panel-samples-block-bg-color: var(--bg-color);
--panel-samples-width: 50%;

--panel-samples-text-color: var(--text-color-primary);
--panel-samples-font-family: var(--panel-font-family);
--panel-samples-font-size: var(--panel-font-size);
--panel-samples-font-weight: var(--panel-font-weight);
--panel-samples-bg-color: var(--layer-color);
--panel-samples-border: var(--panel-border);
--panel-samples-chevron-icon-color: var(--text-color-primary);
```

</details>
<details>
<summary>Panel samples body</summary>

```css
--panel-samples-body-text-color: var(--text-color-secondary);
--panel-samples-body-font-family: var(--panel-body-font-family);
--panel-samples-body-font-size: var(--panel-body-font-size);
--panel-samples-body-font-weight: var(--panel-body-font-weight);
--panel-samples-body-padding: var(--panel-body-padding);
--panel-samples-body-bg-color: var(--layer-color);
--panel-samples-body-border: unset;
```

</details>
<details>
<summary>Panel samples heading</summary>

```css
--panel-samples-heading-text-color: var(--text-color-primary);
--panel-samples-heading-font-family: var(--panel-heading-font-family);
--panel-samples-heading-font-size: var(--panel-font-size);
--panel-samples-heading-font-weight: var(--panel-font-weight);
--panel-samples-heading-line-height: var(--line-height-sm);
--panel-samples-heading-padding: 14px var(--spacing-base) 10px 20px;
--panel-samples-heading-bg-color: var(--layer-color);
--panel-samples-heading-border: unset;
```

</details>

### Panel samples with class

> classes `'panel-language-list','panel-overview','panel-download','panel-servers-list','panel-request-samples','panel-response-samples','panel-callback-samples'`

<details>
<summary>Panel samples with class</summary>

```css
.panel-language-list,
.panel-overview,
.panel-download,
.panel-servers-list,
.panel-request-samples,
.panel-response-samples,
.panel-callback-samples {
  --text-color: var(--panel-samples-text-color);
  --panel-text-color: var(--panel-samples-text-color);
  --panel-font-family-local: var(--panel-samples-font-family);
  --panel-font-size-local: var(--panel-samples-font-size);
  --panel-font-weight-local: var(--panel-samples-font-weight);
  --panel-bg-color: var(--panel-samples-bg-color);
  --panel-border-local: var(--panel-samples-border);
  --panel-border-radius-local: var(--panel-border-radius);
  --panel-chevron-icon-color: var(--panel-samples-chevron-icon-color);

  --panel-body-text-color: var(--panel-samples-body-text-color);
  --panel-body-bg-color: var(--panel-samples-body-bg-color);

  --panel-body-font-family-local: var(--panel-samples-body-font-family);
  --panel-body-font-size-local: var(--panel-samples-body-font-size);
  --panel-body-font-weight-local: var(--panel-samples-body-font-weight);
  --panel-body-padding-local: var(--panel-samples-body-padding);
  --panel-body-border-local: var(--panel-samples-body-border);

  --panel-heading-text-color: var(--panel-samples-heading-text-color);
  --panel-heading-bg-color: var(--panel-samples-heading-bg-color);

  --panel-heading-font-family-local: var(--panel-samples-heading-font-family);
  --panel-heading-font-size-local: var(--panel-samples-heading-font-size);
  --panel-heading-font-weight-local: var(--panel-samples-heading-font-weight);
  --panel-heading-line-height-local: var(--panel-samples-heading-line-height);
  --panel-heading-padding-local: var(--panel-samples-heading-padding);

  --panel-heading-border: var(--panel-samples-heading-border);
  --panel-heading-border-bottom: var(--panel-samples-border);
}
```

</details>

### Panel response

<details>
<summary>Panel response common</summary>

```css
.panel-response-success,
.panel-response-info,
.panel-response-error,
.panel-response-redirect,
.panel-response-callback {
  --panel-body-text-color: var(--panel-response-body-text-color);
  --panel-border-radius-local: calc(1px + var(--panel-border-radius));

  --panel-heading-text-color: var(--panel-response-heading-text-color);
  --panel-heading-font-size-local: var(--panel-response-heading-font-size);
  --panel-heading-font-weight-local: var(--panel-response-heading-font-weight);
  --panel-heading-line-height-local: var(--panel-response-heading-line-height);
  --panel-heading-padding-local: var(--panel-response-heading-padding);

  --panel-heading-border: var(--panel-samples-heading-border);
  --panel-heading-white-space-local: normal;
  --panel-body-padding-local: var(--panel-body-padding);
}
```

</details>
<details>
<summary>Panel response success</summary>

```css
.panel-response-success {
  --panel-border-local: 1px solid var(--panel-response-success-border-color);

  --panel-body-text-color: var(--panel-response-success-body-text-color);
  --panel-body-bg-color: var(--panel-response-success-body-bg-color);

  --panel-heading-bg-color: var(--panel-response-success-heading-bg-color);
  --panel-heading-text-color: var(--panel-response-success-heading-text-color);
}
```

</details>
<details>
<summary>Panel response info</summary>

```css
.panel-response-info {
  --panel-border-local: 1px solid var(--panel-response-info-border-color);

  --panel-body-text-color: var(--panel-response-info-body-text-color);
  --panel-body-bg-color: var(--panel-response-info-body-bg-color);

  --panel-heading-bg-color: var(--panel-response-info-heading-bg-color);
  --panel-heading-text-color: var(--panel-response-info-heading-text-color);
}
```

</details>
<details>
<summary>Panel response error</summary>

```css
.panel-response-error {
  --panel-border-local: 1px solid var(--panel-response-error-border-color);

  --panel-body-text-color: var(--panel-response-error-body-text-color);
  --panel-body-bg-color: var(--panel-response-error-body-bg-color);

  --panel-heading-bg-color: var(--panel-response-error-heading-bg-color);
  --panel-heading-text-color: var(--panel-response-error-heading-text-color);
}
```

</details>
<details>
<summary>Panel response redirect</summary>

```css
.panel-response-redirect {
  --panel-border-local: 1px solid var(--panel-response-redirect-border-color);
  --panel-body-text-color: var(--panel-response-redirect-body-text-color);

  --panel-body-bg-color: var(--panel-response-redirect-body-bg-color);
  --panel-heading-bg-color: var(--panel-response-redirect-heading-bg-color);
  --panel-heading-text-color: var(--panel-response-redirect-heading-text-color);
}
```

</details>
<details>
<summary>Panel response callback</summary>

```css
.panel-response-callback {
  --panel-body-text-color: var(--panel-response-callback-body-text-color);
  --panel-body-bg-color: var(--panel-response-callback-body-bg-color);
  --panel-heading-text-color: var(--panel-response-callback-heading-text-color);

  --panel-body-padding-local: 0 0 var(--spacing-base) var(--spacing-lg);
}
```

</details>

### Other panel variables

<details>
<summary>Panel samples tabs</summary>

```css
--panel-samples-tabs-font-size: var(--panel-font-size);
--panel-samples-tabs-font-family: var(--panel-font-family);
--panel-samples-tabs-font-weight: var(--panel-font-weight);

--panel-samples-tabs-text-color: var(--text-color-secondary);
--panel-samples-tabs-text-color-hover: var(--text-color-primary);
--panel-samples-tabs-text-color-active: var(--text-color-primary);
--panel-samples-tabs-text-color-disabled: var(--button-content-color-disabled);

--panel-samples-tabs-bg-color: transparent;
--panel-samples-tabs-bg-color-hover: transparent;
--panel-samples-tabs-bg-color-active: var(--bg-color);

--panel-samples-code-block-bg-color: var(--code-block-bg-color);
```

</details>

<details>
<summary>Panel samples other styles</summary>

```css
--panel-samples-dropdown-bg-color: var(--bg-color);
--panel-samples-dropdown-color: var(--text-color-secondary);
--panel-samples-dropdown-border: 1px solid var(--border-color-primary);
```

</details>
<details>
<summary>Panel servers-list other styles</summary>

```css
--panel-servers-list-input-bg-color: var(--bg-color-raised);
```

</details>

## API docs

<details>
<summary>Layout</summary>

```css
--layout-controls-margin: 20px;
--layout-controls-height: 36px;
--layout-controls-width: 36px;

--layout-stacked-small-max-width: 90%;
--layout-stacked-medium-max-width: 75%;
--layout-stacked-large-max-width: 1200px;

--layout-three-panel-small-max-width: 100%;
--layout-three-panel-medium-max-width: 100%;
--layout-three-panel-large-max-width: 1800px;

--layout-panel-schemas-small-max-width: none;
--layout-panel-schemas-medium-max-width: none;
--layout-panel-schemas-large-max-width: none;
```

</details>
<details>
<summary>Mime-type dropdown</summary>

```css
--schemas-mime-type-dropdown-padding: 0px 26px 0px 4px;
--schemas-mime-type-dropdown-border: var(--docs-dropdown-border);
--schemas-mime-type-dropdown-font-size: var(--docs-dropdown-font-size);
--schemas-mime-type-dropdown-text-color: var(--docs-dropdown-text-color);
```

</details>
<details>
<summary>Discriminator dropdown</summary>

```css
--schemas-discriminator-dropdown-padding: 2px 24px 2px 8px;
--schemas-discriminator-dropdown-border: 1px solid var(--border-color-primary);
--schemas-discriminator-font-size: var(--docs-dropdown-font-size);
--schemas-discriminator-dropdown-text-color: var(--docs-dropdown-text-color);
```

</details>
<details>
<summary>Schema type title</summary>

```css
--schema-type-title-text-color: var(--text-color-secondary);
--schema-type-text-color: var(--text-color-description);
--schema-labels-font-size: var(--font-size-base);
--schema-labels-line-height: var(--line-height-base);
--schema-labels--text-color: var(--text-color-secondary);
```

</details>
<details>
<summary>Schema lines color</summary>

```css
--schemas-lines-color: var(--border-color-primary);
```

</details>
<details>
<summary>Schema inline code</summary>

```css
--schema-inline-code-font-family: var(--inline-code-font-family);
--schema-inline-code-font-size: var(--inline-code-font-size);
--schema-inline-code-font-weight: var(--inline-code-font-weight);
--schema-inline-code-text-color: var(--text-color-secondary);
--schema-inline-code-line-height: var(--inline-code-line-height);
--schema-inline-bg-color: var(--border-color-secondary);
--schema-inline-border-color: var(--border-color-primary);
--schema-inline-border: 1px solid var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema example label</summary>

```css
--schema-example-text-color: var(--schema-inline-code-text-color);
--schema-example-bg-color: var(--schema-inline-bg-color);
--schema-example-border-color: var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema constraint label</summary>

```css
--schema-constraint-text-color: var(--schema-inline-code-text-color);
--schema-constraint-bg-color: var(--schema-inline-bg-color);
--schema-constraint-border-color: var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema enum label</summary>

```css
--schema-enum-text-color: var(--schema-inline-code-text-color);
--schema-enum-bg-color: var(--schema-inline-bg-color);
--schema-enum-border-color: var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema default label</summary>

```css
--schema-default-text-color: var(--schema-inline-code-text-color);
--schema-default-bg-color: var(--schema-inline-bg-color);
--schema-default-border-color: var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema recursive label</summary>

```css
--schema-recursive-text-color: var(--color-warm-grey-1);
--schema-recursive-bg-color: var(--color-persian-green-6);
--schema-recursive-border-color: var(--schema-recursive-bg-color);
```

</details>
<details>
<summary>Schema non-null label</summary>

```css
--schema-non-null-text-color: var(--schema-inline-code-text-color);
--schema-non-null-bg-color: var(--schema-inline-bg-color);
--schema-non-null-border-color: var(--schema-inline-border-color);
```

</details>
<details>
<summary>Schema nested</summary>

```css
--schema-nested-offset: calc(var(--spacing-unit) * 2.5);
--schema-nested-bg-color: var(--tree-bg-color-active);
```

</details>
<details>
<summary>Schema required</summary>

```css
--schema-required-color: #E20C0C;
```

</details>
<details>
<summary>Schema buttons</summary>

```css
--schema-buttons-font-family: var(--code-font-family);
--schema-buttons-font-weight: var(--code-font-weight);
--schema-buttons-font-size: var(--code-font-size);

--schema-buttons-text-color: var(--text-color-secondary);
--schema-buttons-bg-color: transparent;
--schema-buttons-border-color: var(--border-color-primary);

--schema-buttons-bg-color-hover: var(--button-bg-color-secondary-hover);
--schema-buttons-bg-color-active: var(--button-bg-color-secondary-pressed);

--schema-buttons-selected-text-color: var(--schema-buttons-text-color);
--schema-buttons-selected-bg-color: var(--button-bg-color-secondary-pressed);
--schema-buttons-selected-border-color: var(--schema-buttons-border-color);
--schema-buttons-selected-bg-color-hover: var(--button-bg-color-secondary-hover);
--schema-buttons-selected-bg-color-active: var(--button-bg-color-secondary-pressed);
```

</details>
<details>
<summary>Schema property</summary>

```css
--schemas-property-name-text-color: var(--text-color-primary);
--schemas-property-name-font-size: var(--font-size-base);
--schemas-property-name-font-family: var(--code-font-family);
--schemas-property-name-font-weight: var(--font-weight-regular);
--schemas-property-name-line-height: var(--line-height-base);
--schemas-property-name-text-transform: none;

--schemas-property-deprecated-text-color: var(--text-color-primary);

--schema-property-labels-font-size: var(--schema-labels-font-size);
--schema-property-required-label-text-color: var(--schema-required-color);
--schema-property-additional-label-text-color: var(--text-color-secondary);
--schema-property-access-label-text-color: var(--text-color-secondary);

--schema-property-details-width: 70%;
--schema-property-details-spacing: var(--spacing-base);
--schema-fist-property-details-spacing: var(--spacing-sm);
```

</details>
<details>
<summary>Other schema variables</summary>

```css
--schema-chevron-color: var(--text-color-secondary);
--schema-chevron-size: 9px;

--schema-property-deep-link-icon-color: var(--color-primary-base);
--schema-property-deep-link-icon: none;

--loading-spinner-color: var(--color-primary-base);
--linear-progress-color: var(--color-info-base);
--linear-progress-bg-color: var(--color-info-bg);

--fab-bg-color: var(--color-primary-base);
--fab-box-shadow: var(--bg-raised-shadow);

--fab-bg-color-hover: var(--color-primary-base);
--fab-box-shadow-hover: var(--bg-raised-shadow);

--fab-bg-color-active: var(--color-primary-base);
--fab-box-shadow-active: var(--bg-raised-shadow);

--fab-icon-color: var(--navbar-text-color);
```

</details>
