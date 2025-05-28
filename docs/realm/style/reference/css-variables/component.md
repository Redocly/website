# Components Variables

## Admonition

<details>
<summary>Common admonition variables</summary>

```css
--admonition-font-size: var(--font-size-base);
--admonition-font-weight: var(--font-weight-regular);
--admonition-line-height: var(--line-height-base);
--admonition-heading-font-size: var(--font-size-lg);
--admonition-heading-font-weight: var(--font-weight-regular);
--admonition-heading-line-height: var(--line-height-lg);
--admonition-heading-letter-spacing: 0.3px;
--admonition-heading-transform: none;
--admonition-margin-horizontal: 0;
--admonition-margin-vertical: var(--spacing-lg);
--admonition-padding-horizontal: var(--spacing-base);
--admonition-padding-vertical-xs: var(--spacing-xs);
--admonition-padding-vertical-md: var(--spacing-md);
--admonition-icon-size: 24px;
--admonition-border-radius: var(--border-radius-lg);
--admonition-border-style: var(--border-style);
--admonition-border-width: calc(var(--border-width) * 4);
```

</details>
<details>
<summary>Admonition type info</summary>

```css
--admonition-info-bg-color: var(--color-info-bg);
--admonition-info-heading-text-color: var(--text-color-primary);
--admonition-info-text-color: var(--text-color-secondary);
--admonition-info-icon-color: var(--color-info-base);
--admonition-info-border-color: var(--color-info-border);
--admonition-info-border-style: var(--admonition-border-style);
--admonition-info-border-width: var(--admonition-border-width);
--admonition-info-border: var(--admonition-info-border-width) var(--admonition-info-border-style) var(--admonition-info-border-color);
--admonition-info-icon: none;
```

</details>
<details>
<summary>Admonition type warning</summary>

```css
--admonition-warning-bg-color: var(--color-warning-bg);
--admonition-warning-text-color: var(--text-color-secondary);
--admonition-warning-heading-text-color: var(--text-color-primary);
--admonition-warning-icon-color: var(--color-warning-base);
--admonition-warning-border-color: var(--color-warning-border);
--admonition-warning-border-style: var(--admonition-border-style);
--admonition-warning-border-width: var(--admonition-border-width);
--admonition-warning-border: var(--admonition-warning-border-width) var(--admonition-warning-border-style) var(--admonition-warning-border-color);
--admonition-warning-icon: none;
```

</details>
<details>
<summary>Admonition type danger</summary>

```css
  --admonition-danger-bg-color: var(--color-error-bg);
  --admonition-danger-text-color: var(--text-color-secondary);
  --admonition-danger-heading-text-color: var(--text-color-primary);
  --admonition-danger-icon-color: var(--color-error-base);
  --admonition-danger-border-color: var(--color-error-border);
  --admonition-danger-border-style: var(--admonition-border-style);
  --admonition-danger-border-width: var(--admonition-border-width);
  --admonition-danger-border: var(--admonition-danger-border-width) var(--admonition-danger-border-style) var(--admonition-danger-border-color);
  --admonition-danger-icon: none;
```

</details>
<details>
<summary>Admonition type success</summary>

```css
--admonition-success-bg-color: var(--color-success-bg);
--admonition-success-text-color: var(--text-color-secondary);
--admonition-success-heading-text-color: var(--text-color-primary);
--admonition-success-icon-color: var(--color-success-base);
--admonition-success-border-color: var(--color-success-border);
--admonition-success-border-style: var(--admonition-border-style);
--admonition-success-border-width: var(--admonition-border-width);
--admonition-success-border: var(--admonition-success-border-width) var(--admonition-success-border-style) var(--admonition-success-border-color);
--admonition-success-icon: none;
```

</details>

## Badge

<details>
<summary>Default badge</summary>

```css
--badge-text-color: var(--text-color-inverse);
--badge-bg-color: var(--color-purple-6);
--badge-border-radius: var(--border-radius);
```

</details>
<details>
<summary>Deprecated badge</summary>

```css
--badge-deprecated-text-color: var(--color-warm-grey-1);
--badge-deprecated-bg-color: var(--color-warning-base);
--badge-deprecated-border-radius: var(--border-radius);
```

</details>

## Breadcrumbs

<details>
<summary>Breadcrumbs</summary>

```css
--breadcrumbs-text-color: var(--text-color-description);
--breadcrumbs-font-size: var(--font-size-base);
--breadcrumbs-text-color-active: var(--text-color-primary);
--breadcrumbs-text-decoration-hover: underline;
--breadcrumbs-padding: 0;
--breadcrumbs-gap: var(--spacing-xs);
--breadcrumbs-margin-bottom: var(--spacing-lg);
```

</details>

## Button

<details>
<summary>Button color tokens </summary>

```css
--button-content-color: var(--color-warm-grey-10);
--button-content-color-ghost: var(--text-color-secondary);
--button-content-color-inverse: var(--color-white);
--button-content-color-disabled: var(--color-warm-grey-5);

--button-border-color: var(--color-warm-grey-3);
--button-border-color-focused: var(--color-blue-4);
--button-border-color-disabled: var(--color-warm-grey-2);
--button-border-color-danger: var(--color-raspberry-6);
--button-border-color-danger-hover: var(--color-raspberry-7);
--button-border-color-danger-pressed: var(--color-raspberry-8);
--button-border-width-disabled: 0px;

--button-bg-color-disabled: var(--color-warm-grey-1);

--button-content-color-primary: var(--color-blue-6);
--button-content-color-primary-hover: var(--color-blue-7);
--button-content-color-primary-pressed: var(--color-blue-8);

--button-bg-color-primary: var(--color-blue-6);
--button-bg-color-primary-hover: var(--color-blue-7);
--button-bg-color-primary-pressed: var(--color-blue-8);

--button-bg-color-primary-danger: var(--color-raspberry-6);
--button-bg-color-primary-danger-hover: var(--color-raspberry-7);
--button-bg-color-primary-danger-pressed: var(--color-raspberry-8);

--button-content-color-danger: var(--color-raspberry-6);
--button-content-color-danger-hover: var(--color-raspberry-7);
--button-content-color-danger-pressed: var(--color-raspberry-8);

--button-bg-color-secondary: var(--color-warm-grey-2);
--button-bg-color-secondary-hover: var(--color-warm-grey-3);
--button-bg-color-secondary-pressed: var(--color-warm-grey-4);
--button-bg-color-secondary-danger: var(--color-raspberry-1);
--button-bg-color-secondary-danger-hover: var(--color-raspberry-2);
--button-bg-color-secondary-danger-pressed: var(--color-raspberry-3);

--button-content-color-custom: var(--color-warm-grey-8);
--button-content-color-custom-hover: var(--color-warm-grey-11);
--button-bg-color-custom: var(--color-white);

--button-content-color-link: var(--link-color-primary);
--button-content-color-link-hover: var(--link-color-primary-hover);
--button-content-color-link-pressed: var(--link-color-primary-pressed);
```
</details>

<details>
<summary>Button default values</summary>

```css
--button-color: var(--button-content-color);
--button-color-hover: var(--button-content-color);
--button-color-active: var(--button-content-color);

--button-bg-color: transparent;
--button-bg-color-hover: transparent;

--button-border-color-hover: transparent;
--button-border-color-active: transparent;

--button-font-weight: var(--font-weight-regular);
--button-font-size: var(--font-size-base);
--button-line-height: var(--line-height-base);
--button-border-radius: var(--border-radius-md);
--button-padding: 5px var(--spacing-sm);
--button-text-wrap: nowrap;
--button-gap: var(--spacing-xs);

--button-border-width: 0px;
--button-border-style: solid;
--button-margin: 0;
--button-box-shadow: none;
--button-hover-box-shadow: none;
--button-active-box-shadow: none;

--button-icon-size: 16px;
--button-icon-padding: var(--spacing-xs);
--button-icon-padding-small: 3px;
--button-icon-left-padding: 5px var(--spacing-base) 5px 14px;
--button-icon-right-padding: 5px 14px 5px var(--spacing-base);
```

</details>

### Button sizes

<details>
<summary>Button small</summary>

```css
.button-size-small {
  --button-border-radius: var(--border-radius);
  --button-padding: 1px var(--spacing-sm);

  --button-icon-size: 14px;
  --button-icon-padding: 5px;
  --button-icon-left-padding: 1px var(--spacing-sm) 1px 10px;
  --button-icon-right-padding: 1px 10px 1px var(--spacing-sm);
}
```

</details>

<details>
<summary>Button large</summary>

```css
.button-size-large {
  --button-font-size: var(--font-size-lg);
  --button-line-height: var(--line-height-lg);
  --border-radius: var(--border-radius-lg);
  --button-padding: var(--spacing-xs) var(--spacing-md);

  --button-icon-size: 18px;
  --button-icon-padding: 11px;
  --button-icon-left-padding: var(--spacing-xs) var(--spacing-md) var(--spacing-xs) 18px;
  --button-icon-right-padding: var(--spacing-xs) 18px var(--spacing-xs) var(--spacing-md);
}
```

</details>

### Button variants

<details>
<summary>Button primary</summary>

```css
.button-variant-primary {
  --button-color: var(--button-content-color-inverse);
  --button-color-hover: var(--button-content-color-inverse);
  --button-color-active: var(--button-content-color-inverse);
  --button-bg-color: var(--button-bg-color-primary);
  --button-bg-color-hover: var(--button-bg-color-primary-hover);
  --button-bg-color-active: var(--button-bg-color-primary-pressed);
  --button-border-color: transparent;

  --button-bg-color-danger: var(--button-bg-color-primary-danger);
  --button-bg-color-danger-hover: var(--button-bg-color-primary-danger-hover);
  --button-bg-color-danger-pressed: var(--button-bg-color-primary-danger-pressed);
  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
  --button-content-color-danger: var(--button-content-color-inverse);
  --button-content-color-danger-hover: var(--button-content-color-inverse);
  --button-content-color-danger-pressed: var(--button-content-color-inverse);
  --button-border-width-disabled: 1px;
}
```

</details>
<details>
<summary>Button secondary</summary>

```css
.button-variant-secondary {
  --button-bg-color: var(--button-bg-color-secondary);
  --button-bg-color-hover: var(--button-bg-color-secondary-hover);
  --button-bg-color-active: var(--button-bg-color-secondary-pressed);
  --button-border-color: transparent;
  --button-border-color-disabled: transparent;

  --button-bg-color-danger: var(--button-bg-color-secondary-danger);
  --button-bg-color-danger-hover: var(--button-bg-color-secondary-danger-hover);
  --button-bg-color-danger-pressed: var(--button-bg-color-secondary-danger-pressed);
  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
}
```

</details>
<details>
<summary>Button outlined</summary>

```css
.button-variant-outlined {
  --button-color: var(--button-content-color-custom);
  --button-color-hover: var(--button-content-color-custom-hover);
  --button-color-active: var(--button-content-color-custom-hover);
  --button-border-color: var(--border-color-primary);
  --button-border-color-hover: var(--border-color-primary);
  --button-border-color-active: var(--border-color-primary);
  --button-bg-color-disabled: transparent;
  --button-border-width: 1px;
  --button-border-width-disabled: 1px;
}
```

</details>
<details>
<summary>Button text</summary>

```css
.button-variant-text {
  --button-bg-color-hover: var(--button-bg-color-secondary);
  --button-bg-color-active: var(--button-bg-color-secondary-hover);
  --button-bg-color-disabled: transparent;
  --button-border-color: transparent;
  --button-border-color-disabled: transparent;

  --button-bg-color-danger-hover: var(--button-bg-color-secondary-danger);
  --button-bg-color-danger-pressed: var(--button-bg-color-secondary-danger-hover);
  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
}
```

</details>
<details>
<summary>Button link</summary>

```css
.button-variant-link {
  --button-color: var(--button-content-color-link);
  --button-color-hover: var(--button-content-color-link-hover);
  --button-color-active: var(--button-content-color-link-pressed);

  --button-bg-color-disabled: transparent;

  --button-border-color: transparent;
  --button-border-color-disabled: transparent;

  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
  --button-padding: 0;
  --button-icon-left-padding: 0;
  --button-icon-right-padding: 0;
}
```

</details>
<details>
<summary>Button ghost</summary>

```css
.button-variant-ghost {
  --button-color: var(--button-content-color-ghost);
  --button-color-hover: var(--button-content-color);

  --button-bg-color-disabled: transparent;

  --button-border-color: transparent;
  --button-border-color-disabled: transparent;

  --button-border-color-danger: transparent;
  --button-border-color-danger-hover: transparent;
  --button-border-color-danger-pressed: transparent;
  --button-padding: 0;
  --button-icon-left-padding: 0;
  --button-icon-right-padding: 0;
}
```

</details>

## Catalog classic

<details>
<summary>Catalog classic page</summary>

```css
--catalog-classic-page-padding-vertical: var(--spacing-lg);
--catalog-classic-page-padding-horizontal: var(--spacing-xl);
--catalog-classic-page-padding: var(--catalog-classic-page-padding-vertical) var(--catalog-classic-page-padding-horizontal);

--catalog-classic-filter-padding-vertical-mobile: 0;
--catalog-classic-filter-padding-horizontal-mobile: var(--spacing-base);

--catalog-classic-heading-margin: 0 0 var(--spacing-xl) 0;

--catalog-classic-title-text-color: var(--text-color-primary);
--catalog-classic-title-font-weight: var(--font-weight-bold);
--catalog-classic-title-font-size: var(--font-size-heading-3);
--catalog-classic-title-margin: 0 0 var(--spacing-sm) 0;

--catalog-classic-description-text-color: var(--text-color-secondary);
--catalog-classic-description-font-weight: var(--font-weight-regular);
--catalog-classic-description-font-size: var(--font-size-base);
--catalog-classic-description-margin: 0 0 var(--spacing-sm) 0;

--catalog-classic-separator-color: var(--text-color-secondary);
--catalog-classic-separator-font-size: var(--font-size-base);
--catalog-classic-separator-font-weight: var(--font-weight-regular);
--catalog-classic-separator-border-color: var(--border-color-secondary);
--catalog-classic-separator-margin: 0 0 var(--spacing-base) 0;
--catalog-classic-separator-padding: var(--spacing-xxs) 0 0 0;
--catalog-classic-separator-label-margin: 0 var(--spacing-xs);

--catalog-classic-highlight-bg-color: none;
--catalog-classic-highlight-text-color: var(--color-info-base);

--catalog-classic-actions-gap: var(--spacing-xs);
--catalog-classic-actions-padding-vertical: var(--spacing-xs);
--catalog-classic-actions-padding-horizontal: 5%;
--catalog-classic-actions-min-height: 40px;
--catalog-classic-actions-bg-color: var(--bg-color-tonal);

--catalog-classic-page-badge-border-radius: var(--border-radius);
--catalog-classic-page-badge-padding: 0 var(--spacing-xs);
--catalog-classic-page-badge-font-size: var(--font-size-base);
--catalog-classic-page-badge-line-height: var(--line-height-base);

--catalog-classic-page-badge-dot-size: 6px;
--catalog-classic-page-badge-dot-border-color: #ffffff;
```

</details>
<details>
<summary>Catalog card</summary>

```css
--catalog-classic-card-min-height: 194px;
--catalog-classic-card-min-width: 260px;
--catalog-classic-card-padding-vertical: var(--spacing-base);
--catalog-classic-card-padding-horizontal: var(--spacing-md);
--catalog-classic-card-gap: var(--spacing-sm);
--catalog-classic-card-text-color: var(--text-color-secondary);
--catalog-classic-card-font-size: var(--font-size-base);
--catalog-classic-card-font-weight: var(--font-weight-regular);
--catalog-classic-card-bg-color: var(--layer-color);
--catalog-classic-card-border-color: var(--border-color-secondary);
--catalog-classic-card-border-width: var(--border-width);
--catalog-classic-card-border-style: var(--border-style);
--catalog-classic-card-border-color-hover: var(--border-color-primary);
--catalog-classic-card-border-radius: var(--border-radius-xxl);
--catalog-classic-cards-group-margin: 0 0 var(--spacing-base) 0;
--catalog-classic-cards-group-gap: var(--spacing-xl)

--catalog-classic-card-title-color: var(--text-color-primary);
--catalog-classic-card-title-min-height: var(--spacing-xxl);
--catalog-classic-card-title-font-size: var(--font-size-lg);
--catalog-classic-card-title-font-weight: var(--font-weight-bold);
--catalog-classic-card-title-line-height: var(--line-height-lg);
--catalog-classic-card-title-line-clamp: 2;

--catalog-classic-card-description-line-clamp: 3;
--catalog-classic-card-description-color: var(--text-color-secondary);
--catalog-classic-card-description-font-size: var(--font-size-base);
--catalog-classic-card-description-line-height: var(--line-height-base);
--catalog-classic-card-description-font-weight: var(--font-weight-regular);
 --catalog-classic-card-description-height: 62px;

--catalog-classic-card-content-gap: var(--spacing-xxs);

--catalog-classic-card-tag-bg: transparent;
```

</details>

## Code

<details>
<summary>Common code variables</summary>

```css
--code-font-size: var(--font-size-sm);
--code-font-family: var(--font-family-monospaced);
--code-font-weight: var(--font-weight-regular);
--code-line-height: var(--line-height-sm);
--code-wrap: pre;
--code-word-break: break-word;
```

</details>
<details>
<summary>Inline code</summary>

```css
--inline-code-font-size: var(--code-font-size);
--inline-code-font-family: var(--code-font-family);
--inline-code-font-weight: var(--code-font-weight);
--inline-code-line-height: var(--code-line-height);
--inline-code-text-color: var(--text-color-secondary);
--inline-code-bg-color: var(--border-color-secondary);
--inline-code-border-color: var(--border-color-primary);
--inline-code-border-radius: var(--border-radius);
```

</details>
<details>
<summary>Code block</summary>

```css
--code-block-font-size: var(--code-font-size);
--code-block-font-family: var(--code-font-family);
--code-block-line-height: var(--code-line-height);
--code-block-font-weight: var(--code-font-weight);
--code-block-text-color: var(--text-color-secondary);
--code-block-bg-color: var(--layer-color);
--code-block-padding: var(--spacing-xs) 0 var(--spacing-xs) var(--spacing-sm);
--code-block-margin: 0;
--code-block-max-height: calc(100vh - 260px); // Where 260 is combined value of navbar, code block heading, controls height and paddings
--code-block-word-break: initial;
```

</details>
<details>
<summary>Code block controls</summary>

```css
--code-block-controls-font-size: var(--font-size-base);
--code-block-controls-font-family: var(--font-family-base);
--code-block-controls-text-color: var(--text-color-primary);
--code-block-controls-font-weight: var(--font-weight-medium);
--code-block-controls-bg-color: transparent;
--code-block-controls-border: 1px solid var(--border-color-secondary);
--code-block-icon-controls-bg-color: var(--code-block-controls-bg-color);
--code-block-text-controls-bg-color: var(--code-block-controls-bg-color);
--code-block-controls-padding: var(--spacing-unit) var(--spacing-unit) var(--spacing-unit) var(--spacing-base);
--code-block-controls-height: 20px;
--code-block-controls-width: 20px;
```

</details>
<details>
<summary>Code block tokens</summary>

```css
--code-block-tokens-default-color: var(--text-color-secondary);
--code-block-tokens-comment-color: var(--input-content-placeholder-color);
--code-block-tokens-prolog-color: var(--code-block-tokens-comment-color);
--code-block-tokens-doctype-color: var(--code-block-tokens-comment-color);
--code-block-tokens-cdata-color: var(--code-block-tokens-comment-color);
--code-block-tokens-property-color: var(--code-block-tokens-default-color);
--code-block-tokens-tag-color: var(--code-block-tokens-default-color);
--code-block-tokens-number-color: var(--code-block-tokens-default-color);
--code-block-tokens-constant-color: var(--code-block-tokens-default-color);
--code-block-tokens-symbol-color: var(--code-block-tokens-default-color);
--code-block-tokens-boolean-color: var(--color-green-7);
--code-block-tokens-string-color: var(--color-blue-7);
--code-block-tokens-property-string-color: var(--color-blue-7);
--code-block-tokens-selector-color: var(--code-block-tokens-string-color);
--code-block-tokens-attr-name-color: var(--code-block-tokens-string-color);
--code-block-tokens-char-color: var(--code-block-tokens-string-color);
--code-block-tokens-builtin-color: var(--code-block-tokens-string-color);
--code-block-tokens-inserted-color: var(--code-block-tokens-string-color);
--code-block-tokens-link-color: var(--color-blue-7);
--code-block-tokens-operator-color: var(--color-carrot-7);
--code-block-tokens-entity-color: var(--code-block-tokens-operator-color);
--code-block-tokens-url-color: var(--code-block-tokens-operator-color);
--code-block-tokens-variable-color: var(--code-block-tokens-operator-color);
--code-block-tokens-keyword-color: var(--color-magenta-7);
--code-block-tokens-atrule-color: var(--code-block-tokens-keyword-color);
--code-block-tokens-attr-value-color: var(--code-block-tokens-keyword-color);
--code-block-tokens-regex-color: var(--color-carrot-7);
--code-block-tokens-important-color: var(--code-block-tokens-regex-color);
--code-block-tokens-deleted-color: var(--color-red-7);
--code-block-tokens-class-name-color: var(--color-carrot-7);
--code-block-tokens-function-color: var(--color-carrot-7);
```

</details>

## Date picker

<details>
<summary>Date Picker</summary>

```css
--date-picker-nav-color: #000000;
--date-picker-tile-bg-color: var(--color-blue-2);
--date-picker-tile-color: var(--text-color-primary);
--date-picker-tile-bg-color-hover: var(--color-blue-3)
--date-picker-tile-color-hover: var(--text-color-primary);
--date-picker-input-width: var(--spacing-md);
--date-picker-invalid-input-bg-color: var(--bg-color-raised);
--date-picker-button-padding:  var(--spacing-xxs);
--date-picker-icon-stroke: var(--text-color-secondary);
--date-picker-icon-width: var(--spacing-sm);
--date-picker-icon-stroke-hover: var(--text-color-primary);
--date-picker-weekend-days-color: var(--color-error-base);
--date-picker-week-days-color: var(--color-warm-grey-6);
--date-picker-neighboring-month-color: var(--color-warm-grey-6);
--date-picker-wrapper-border-color: var(--border-color-primary);
--date-picker-wrapper-radius: var(--border-radius-md);
--date-picker-wrapper-padding: calc(var(--spacing-xxs) / 2) var(--spacing-xs);
```

</details>

## Dropdown

<details>
<summary>Dropdown</summary>

```css
  --dropdown-font-size: var(--font-size-base);
  --dropdown-font-weight: var(--font-weight-regular);
  --dropdown-line-height: var(--line-height-base);
  --dropdown-content-color-default: var(--color-warm-grey-9);
  --dropdown-border-radius: var(--border-radius);
  --dropdown-border-color: var(--color-warm-grey-3);
  --dropdown-border-color-disabled: var(--color-warm-grey-3);

  --dropdown-bg-color: var(--color-warm-grey-1);

  --dropdown-list-min-width: 100px;
  --dropdown-list-max-width: 424px;
  --dropdown-list-max-height: 300px;
  --dropdown-list-padding: var(--spacing-xxs);
  --dropdown-list-border-radius: var(--border-radius-lg);
  --dropdown-list-box-shadow: var(--bg-raised-shadow);
  --dropdown-list-color-disabled: var(--color-warm-grey-6);
  --dropdown-list-color-hover: var(--color-warm-grey-11);
  --dropdown-list-border-color: var(--border-color-secondary);

  --dropdown-list-item-padding-horizontal: var(--spacing-sm);
  --dropdown-list-item-padding-vertical: 5px;
  --dropdown-list-item-space-between: 2px;
  --dropdown-list-item-separator-padding-top: var(--spacing-xs);
  --dropdown-list-item-separator-padding-bottom: var(--spacing-xxs);
  --dropdown-list-item-border-radius: var(--border-radius);
  --dropdown-list-item-bg-color-active: var(--bg-color-hover);
  --dropdown-list-item-bg-color-hover: var(--bg-color-hover);
  --dropdown-list-item-separator-color: var(--border-color-primary);

  --dropdown-list-item-border-color-focused: var(--color-blue-4);
```

</details>

## Feedback

<details>
<summary>Feedback</summary>

```css
--feedback-padding: var(--spacing-base) 0;
--feedback-font-size: var(--font-size-base);
--feedback-line-height: var(--line-height-base);
--feedback-font-family: var(--font-family-base);
--feedback-text-color: var(--text-color-primary);
--feedback-background-color: transparent;
--feedback-star-color: var(--color-carrot-6);
--feedback-width: fit-content;
--feedback-border-radius: var(--border-radius-lg);
--feedback-report-dialog-max-width: 500px;
--feedback-report-dialog-max-height: 300px;
--feedback-vote-button-wigth: 28px;
--feedback-vote-button-height: 28px;

--feedback-header-text-color: var(--text-color-primary);
--feedback-header-font-size: var(--font-size-lg);
--feedback-header-line-height: var(--line-height-lg);
```

</details>

## Filter

<details>
<summary>Filter common variables</summary>

```css
--filter-group-padding: 0;
--filter-group-gap: var(--spacing-xs);

--filter-title-font-weight: var(--font-weight-medium);
--filter-title-font-size: var(--font-size-base);
--filter-title-line-height: var(--line-height-base);

--filter-options-padding-vertical: 0;
--filter-options-padding-horizontal: 0;
--filter-options-gap: var(--spacing-sm);

--filter-option-font-size: var(--font-size-base);
--filter-option-gap: var(--spacing-xs);
--filter-option-margin: 0;

--filter-option-label-font-size: var(--font-size-base);
--filter-option-label-color: var(--text-color-secondary);

--filter-option-checkbox-padding-left: var(--spacing-xs);

--filter-content-header-padding-vertical: 5px;
--filter-content-header-padding-horizontal: 0;

--filter-content-title-font-size: var(--font-size-base);
--filter-content-title-line-height: var(--line-height-base);
--filter-content-title-font-weight: var(--font-weight-semibold);

--filter-content-padding-vertical: var(--spacing-sm);
--filter-content-padding-horizontal: var(--spacing-base);
--filter-content-gap: var(--spacing-sm);
--filter-content-items-padding: var(--spacing-sm) 0;

--filter-input-border: 1px solid var(--border-color-primary);
--filter-input-min-width: 200px;
--filter-input-padding: var(--input-padding) var(--spacing-sm) var(--input-padding) calc(var(--spacing-unit) * 9);
--filter-input-border-radius: var(--input-border-radius);
--filter-input-bg-color: var(--input-bg-color);
--filter-input-color: var(--text-color-secondary);
--filter-input-font-family: var(--font-family-base);
--filter-input-font-size: var(--font-size-base);
--filter-input-line-height: var(--input-line-height);
--filter-input-placeholder-opacity: 1;
--filter-input-placeholder-color: var(--input-content-placeholder-color);
--filter-input-color-hover: var(--text-color-primary);
--filter-input-border-hover: 1px solid var(--border-color-primary);
--filter-input-color-focus: var(--text-color-primary);
--filter-input-border-focus: 1px solid var(--border-color-primary);

--filter-select-min-height: var(--control-height-base);
--filter-select-max-width: 100%;
--filter-select-color: var(--text-color-primary);
--filter-select-border-color: var(--border-color-primary);
--filter-select-border-radius: calc(var(--spacing-unit) * 1.5);
--filter-select-padding: 0;
--filter-select-border-color-hover: var(--text-color-primary);
--filter-select-option-margin: 0;
--filter-select-wrapper-gap: var(--spacing-xxs);
```

</details>
<details>
<summary>Filter popover</summary>

```css
--filter-popover-bg-color: var(--bg-color);
--filter-popover-header-padding: var(--catalog-classic-filter-padding-vertical-mobile) var(--catalog-classic-filter-padding-horizontal-mobile);
--filter-popover-header-border-color: var(--border-color-secondary);
--filter-popover-header-bg-color: var(--navbar-bg-color);
--filter-popover-header-label-color: var(--navbar-text-color);
--filter-popover-header-label-font-size: var(--font-size-lg);
--filter-popover-header-label-font-weight: var(--font-weight-bold);
--filter-popover-header-button-color: var(--navbar-text-color);
--filter-popover-header-button-height: var(--control-height-base);
--filter-popover-header-button-font-size: var(--font-size-base);
--filter-popover-header-button-font-weight: var(--font-weight-regular);
```

</details>
<details>
<summary>Filter date picker</summary>

```css
--filter-date-picker-color: var(--text-color-primary);
--filter-date-picker-gap: var(--spacing-xs);
--filter-date-picker-width: 50px;
--filter-date-picker-tile-bg-color: var(--color-blue-2);
--filter-date-picker-tile-color: var(--text-color-primary);
--filter-date-picker-tile-bg-color-hover: var(--color-blue-3);
--filter-date-picker-tile-color-hover: var(--text-color-primary);
--filter-date-picker-input-width: var(--spacing-md);
--filter-date-picker-invalid-input-bg-color: var(--bg-color-raised);
--filter-date-picker-button-padding: var(--spacing-xxs);
--filter-date-picker-icon-stroke: var(--text-color-secondary);
--filter-date-picker-icon-width: var(--spacing-sm);
--filter-date-picker-icon-stroke-hover: var(--text-color-primary);
--filter-date-picker-wrapper-border-color: var(--border-color-primary);
--filter-date-picker-wrapper-radius: calc(var(--spacing-unit) * 1.5);
--filter-date-picker-wrapper-padding: calc(var(--spacing-xxs) / 2) var(--spacing-xs);
```

</details>

## Footer

<details>
<summary>Footer</summary>

```css
--footer-bg-color: var(--bg-color-raised);
--footer-text-color: var(--text-color-secondary);
--footer-border-color: var(--border-color-secondary);

--footer-padding-vertical: var(--spacing-xl);
--footer-padding-horizontal: calc(var(--spacing-unit) * 10);

--footer-font-size: var(--font-size-base);
--footer-font-weight: var(--font-weight-regular);

--footer-column-divider-color: var(--footer-border-color);

--footer-title-text-color: var(--text-color-primary);
--footer-title-text-color-hover: var(--text-color-primary);
--footer-title-font-size: var(--font-size-lg);
--footer-title-font-weight: var(--font-weight-bold);

--footer-link-text-color: var(--text-color-secondary);
--footer-link-color-hover: var(--text-color-primary);
--footer-link-padding-vertical: var(--spacing-xs);
--footer-link-padding-horizontal: 0;

--footer-item-icon-width: var(--spacing-lg);
--footer-item-icon-height: var(--spacing-lg);
--footer-item-icon-margin-right: var(--spacing-sm);
--footer-item-icon-border-color: var(--border-color-primary);
--footer-item-icon-border-radius: 12px;
--footer-item-icon-padding: var(--spacing-xxs);

--footer-separator-item-font-size: var(--font-size-sm);
--footer-separator-item-margin: 10px 0 5px 0;
--footer-separator-item-opacity: 0.75;

--footer-column-min-width: calc(var(--spacing-unit) * 30);
--footer-column-title-gap: var(--spacing-xs);
--footer-column-gap: var(--spacing-lg);

--footer-copyright-font-size: var(--footer-font-size);
--footer-copyright-text-align: start;

--footer-logo-height: var(--logo-height);
--footer-logo-width: var(--logo-width);
--footer-logo-max-width: var(--logo-max-width);
--footer-logo-max-height: var(--logo-max-height);
--footer-logo-display: block;

--footer-container-max-width: var(--container-width);
```

</details>
<details>
<summary>Footer for mobile</summary>

```css
--mobile-footer-padding-vertical: var(--spacing-base);
--mobile-footer-padding-horizontal: var(--spacing-base);
```

</details>

## Inputs

<details>
<summary>Input</summary>

```css
--input-bg-color: var(--color-white);
--input-bg-color-ghost: var(--color-white);

--input-font-size: var(--font-size-base);
--input-font-family: var(--font-family-base);
--input-line-height: 1.15em;
--input-text-indent: 16px;

--input-padding: var(--spacing-xs);
--input-padding-horizontal: var(--spacing-sm);
--input-padding-vertical: var(--spacing-xxs);
--input-height: 40px;

--input-border-radius: var(--border-radius-lg);
--input-border-color: var(--color-warm-grey-3);
--input-border: 1px solid var(--input-border-color);
--input-border-color-hover: var(--color-warm-grey-4);
--input-border-hover: 1px solid var(--input-border-color-hover);
--input-border-color-focused: var(--color-info-base);
--input-border-focus: 1px solid var(--input-border-color-focused);

--input-content-color-disabled: var(--color-warm-grey-4);
--input-bg-color-disabled: var(--color-warm-grey-1);
--input-border-color-disabled: var(--color-warm-grey-3);
--input-border-disabled: 1px solid var(--input-border-color-disabled);

--input-content-color-active: var(--color-warm-grey-11);
--input-content-placeholder-color: var(--color-warm-grey-5);

--input-t-icon-color: var(--color-warm-grey-5);

--checkbox-bg-color: var(--bg-color);
--checkbox-checked-bg-color: var(--color-primary-base);
```

</details>

## Language picker

<details>
<summary>Language picker</summary>

```css
--language-picker-dropdown-font-size: var(--dropdown-menu-font-size);
--language-picker-dropdown-font-weight: var(--dropdown-menu-font-weight);
--language-picker-dropdown-line-height: var(--dropdown-menu-line-height);
--language-picker-dropdown-text-color: var(--dropdown-menu-text-color);

--language-picker-dropdown-min-width: var(--dropdown-menu-min-width);
--language-picker-dropdown-max-width: var(--dropdown-menu-max-width);
--language-picker-dropdown-max-height: var(--dropdown-menu-max-height);
--language-picker-dropdown-padding: var(--dropdown-menu-padding );
--language-picker-dropdown-border-radius: var(--dropdown-menu-border-radius);
--language-picker-dropdown-box-shadow: var(--dropdown-menu-box-shadow);

--language-picker-dropdown-border-color: var(--dropdown-menu-border-color);
--language-picker-dropdown-bg-color: var(--dropdown-menu-bg-color);

--language-picker-dropdown-item-padding-horizontal: 20px;
--language-picker-dropdown-item-padding-vertical: var(--dropdown-menu-item-padding-vertical);
--language-picker-dropdown-item-separator-padding-top: var(--dropdown-menu-item-separator-padding-top );
--language-picker-dropdown-item-separator-padding-bottom: var(--dropdown-menu-item-separator-padding-bottom );
--language-picker-dropdown-item-border-radius: var(--dropdown-menu-item-border-radius );
--language-picker-dropdown-item-bg-color-active: var(--dropdown-menu-item-bg-color-active);
--language-picker-dropdown-item-bg-color-hover: var(--dropdown-menu-item-bg-color-hover);
--language-picker-dropdown-item-bg-color-disabled: var(--dropdown-menu-item-bg-color-disabled);
--language-picker-dropdown-item-separator-border-color: var(--dropdown-menu-item-separator-border-color);
--language-picker-dropdown-item-color-dangerous: var(--dropdown-menu-item-color-dangerous);
--language-picker-dropdown-item-color-disabled: var(--dropdown-menu-item-color-disabled);
--language-picker-dropdown-item-color-hover: var(--dropdown-menu-item-color-hover);
--language-picker-dropdown-item-color-active: var(--dropdown-menu-item-color-active);
--language-picker-dropdown-item-border-color-focused: var(--dropdown-menu-item-border-color-focused);
```

</details>

## Last updated

<details>
<summary>Last updated</summary>

```css
--last-updated-text-color: var(--text-color-secondary);
--last-updated-font-size: var(--font-size-sm);
--last-updated-font-family: var(--font-family-base);
--last-updated-line-height: var(--line-height-base);
```

</details>

## Links

<details>
<summary>Link</summary>

```css
--link-color-primary: var(--color-blue-6);
--link-decoration: none;
--link-font-weight: var(--font-weight-regular);
--link-color-primary-hover: var(--color-blue-7);
--link-color-primary-pressed: var(--color-blue-8);
--link-decoration-hover: underline;
--link-color-inverse: var(--color-blue-5);
--link-color-visited: var(--color-purple-7);
--link-visited-decoration: none;
```

</details>

## Logo

<details>
<summary>Logo</summary>

```css
--logo-height: 2rem;
--logo-width: auto;
--logo-margin: 16px;
--logo-max-width: 285px;
--logo-max-height: 285px;
```

</details>

## Markdown

<details>
<summary>Markdown content</summary>

```css
  --md-content-max-width: 688px;
  --md-content-padding: 25px 0px 25px 0px;
  --md-content-font-size: var(--font-size-base);
  --md-content-font-family: var(--font-family-base);
  --md-content-line-height: var(--line-height-base);
  --md-content-font-weight: var(--font-weight-regular);
  --md-content-text-color: var(--text-color-secondary);
```

</details>
<details>
<summary>Markdown blockquote</summary>

```css
--md-blockquote-margin-vertical: 1.5em;
--md-blockquote-margin-horizontal: 0;
--md-blockquote-padding-vertical: 0;
--md-blockquote-padding-horizontal: var(--spacing-base);
--md-blockquote-border-color: var(--border-color-primary);
--md-blockquote-bg-color: transparent;
--md-blockquote-border-left: 4px solid var(--md-blockquote-border-color);
--md-blockquote-text-color: var(--text-color-secondary);
--md-blockquote-box-shadow: none;
```

</details>
<details>
<summary>Markdown paragraph</summary>

```css
--md-paragraph-margin: 0 0 var(--spacing-xs) 0;
```

</details>
<details>
<summary>Markdown tables</summary>

```css
--md-table-font-size: var(--md-content-font-size);
--md-table-line-height: var(--line-height-md);
--md-table-margin-vertical: 20px;
--md-table-bg-color: transparent;
--md-table-border-radius: var(--border-radius);

--md-table-border-width: 1px;
--md-table-header-bg-color: var(--layer-color);
--md-table-border-color: var(--border-color-secondary);

--md-table-stripe-bg-color: var(--md-table-bg-color);

--md-table-cell-text-color: var(--text-color-secondary);
--md-table-cell-padding: var(--spacing-xs) var(--spacing-sm);
--md-table-footer-cell-padding: var(--spacing-xxs) var(--spacing-sm);

--md-table-head-bg-color: var(--md-table-bg-color);
--md-table-head-text-color: var(--text-color-primary);
--md-table-head-font-weight: var(--font-weight-medium);
```

</details>
<details>
<summary>Markdown horizontal rule</summary>

```css
--md-hr-bg-color: transparent;
--md-hr-border-color: var(--border-color-secondary);
--md-hr-height: unset;
--md-hr-margin-vertical: 20px;
```

</details>
<details>
<summary>Markdown list</summary>

```css
--md-list-left-padding: 1.25rem;
--md-list-margin: 0 0 var(--spacing-xs) 0;
--md-list-item-margin: 0.25rem;
--md-list-item-style: inherit;

--md-checkbox-list-item-style: none;

--md-numbered-list-number-display: none;
--md-numbered-list-item-style: var(--md-list-item-style);
--md-numbered-list-number-text-color: var(--md-content-text-color);
--md-numbered-list-number-font-size: var(--md-content-font-size);
--md-numbered-list-number-font-family: var(--md-content-font-family);
--md-numbered-list-number-font-weight: var(--md-content-font-weight);
--md-numbered-list-number-bg-color: var(--bg-color-active);
--md-numbered-list-number-border-radius: 10px;
--md-numbered-list-number-margin-right: 5px;
--md-numbered-list-number-padding: 0 5px;

--md-pre-margin: 0 0 var(--spacing-xs) 0;
```

</details>

<details>
<summary>Markdown tabs component</summary>

```css
--md-tabs-container-text-color: inherit;
--md-tabs-container-font-size: var(--md-content-font-size);
--md-tabs-container-font-family:var(--md-content-font-family);
--md-tabs-container-font-style: normal;
--md-tabs-container-font-weight: var(--font-weight-regular);
--md-tabs-container-bg-color: inherit;
--md-tabs-container-margin: 10px 0;
--md-tabs-container-padding: 0;
--md-tabs-container-border: none;

--md-tabs-border: solid var(--border-color-primary);
--md-tabs-border-width: 0 0 1px 0;
--md-tabs-padding: 0;

--md-tabs-content-text-color: inherit;
--md-tabs-content-font-size: var(--md-content-font-size);
--md-tabs-content-font-family:var(--md-content-font-family);
--md-tabs-content-font-style: normal;
--md-tabs-content-font-weight: var(--font-weight-regular);
--md-tabs-content-bg-color: inherit;
--md-tabs-content-margin: 0;
--md-tabs-content-padding: var(--spacing-base) 0;
--md-tabs-content-border: none;

--md-tabs-tab-text-color: var(--text-color-primary);
--md-tabs-tab-font-size: var(--font-size-lg);
--md-tabs-tab-font-family: var(--md-content-font-family);
--md-tabs-tab-font-style: normal;
--md-tabs-tab-font-weight: var(--font-weight-bold);
--md-tabs-tab-bg-color: none;
--md-tabs-tab-margin: 0 0 -1px 0;
--md-tabs-tab-padding: var(--spacing-sm) var(--spacing-base);
--md-tabs-tab-border: none;
--md-tabs-tab-border-width: 0;
--md-tabs-tab-border-radius: 0;

--md-tabs-active-tab-text-color: var(--text-color-primary);
--md-tabs-active-tab-font-size: var(--md-tabs-tab-font-size);
--md-tabs-active-tab-font-family: var(--md-tabs-tab-font-family);
--md-tabs-active-tab-font-style: normal;
--md-tabs-active-tab-font-weight: var(--md-tabs-tab-font-weight);
--md-tabs-active-tab-bg-color: var(--bg-color);
--md-tabs-active-tab-padding: var(--md-tabs-tab-padding);
--md-tabs-active-tab-border-color: var(--text-color-primary);
--md-tabs-active-tab-border-width: 0 0 2px 0;
--md-tabs-active-tab-border-radius: var(--md-tabs-tab-border-radius);

--md-tabs-hover-tab-text-color: var(--md-tabs-tab-text-color);
--md-tabs-hover-tab-font-size: var(--md-tabs-tab-font-size);
--md-tabs-hover-tab-font-family: var(--md-tabs-tab-font-family);
--md-tabs-hover-tab-font-style: normal;
--md-tabs-hover-tab-font-weight: var(--md-tabs-tab-font-weight);
--md-tabs-hover-tab-bg-color: var(--md-tabs-tab-bg-color);
--md-tabs-hover-tab-padding: var(--md-tabs-tab-padding);
--md-tabs-hover-tab-border-color: var(--border-color-secondary);
--md-tabs-hover-tab-border-width: 0 0 1.5px 0;
--md-tabs-hover-tab-border-radius: var(--md-tabs-tab-border-radius);
```

</details>

## Navbar

<details>
<summary>Navbar common variables</summary>

```css
--navbar-bg-color: var(--bg-color);
--navbar-border-color: var(--border-color-secondary);
--navbar-border: 1px solid var(--navbar-border-color);

--navbar-text-color: var(--text-color-secondary);
--navbar-height: 64px;
--navbar-font-size: var(--font-size-base);
--navbar-padding: 0 var(--spacing-xl);
--navbar-font-family: var(--font-family-base);
--navbar-container-max-width: 100%;

--navbar-menu-items-gap: var(--spacing-sm);
--navbar-menu-justify-content: flex-start;
```

</details>
<details>
<summary>Navbar item</summary>

```css
--navbar-item-font-weight: var(--font-weight-regular);

--navbar-item-text-color-active: var(--text-color-primary);
--navbar-item-text-decoration-active: none;
--navbar-item-bottom-border-active: none;

--navbar-item-padding-vertical: var(--spacing-xxs);
--navbar-item-padding-horizontal: var(--spacing-sm);
--navbar-item-padding: var(--navbar-item-padding-vertical) var(--navbar-item-padding-horizontal);

--navbar-item-line-height: var(--line-height-base);
--navbar-item-bg-color-active: var(--bg-color-active);
--navbar-item-border-radius: var(--border-radius);
--navbar-item-bottom-border: none;

--navbar-item-text-color-hover: var(--text-color-primary);
--navbar-item-text-decoration-hover: none;
--navbar-item-bg-color-hover: var(--bg-color);
--navbar-item-bottom-border-hover: none;

--navbar-item-icon-width: 1.5em;
--navbar-item-icon-height: 1.5em;
--navbar-item-icon-margin-right: 0.5em;
```

</details>
<details>
<summary>Navbar logo</summary>

```css
--navbar-logo-height: var(--logo-height);
--navbar-logo-width: var(--logo-width);
--navbar-logo-margin: var(--logo-margin);
--navbar-logo-max-width: var(--logo-max-width);
--navbar-logo-max-height: var(--logo-max-height);
```

</details>
<details>
<summary>Navbar separator</summary>

```css
--navbar-separator-text-color: var(--text-color-description);
--navbar-separator-font-size: var(--font-size-sm);
--navbar-separator-line-height: var(--line-height-sm);
```

</details>

## Mermaid

<details>
<summary>Mermaid component</summary>

```css
--mermaid-bg-color: var(--bg-color-raised);
--mermaid-border-radius: var(--border-radius-lg);
--mermaid-font-family: var(--font-family-base);
```

</details>

## Product

<details>
<summary>Product logo</summary>

```css
--product-logo-gap: var(--spacing-xs);
```

</details>
<details>
<summary>Product picker</summary>

```css
--product-picker-dropdown-font-size: var(--dropdown-menu-font-size);
--product-picker-dropdown-font-weight: var(--dropdown-menu-font-weight);
--product-picker-dropdown-line-height: var(--dropdown-menu-line-height);
--product-picker-dropdown-text-color: var(--dropdown-menu-text-color);

--product-picker-dropdown-min-width: var(--dropdown-menu-min-width);
--product-picker-dropdown-max-width: var(--dropdown-menu-max-width);
--product-picker-dropdown-max-height: var(--dropdown-menu-max-height);
--product-picker-dropdown-padding: var(--dropdown-menu-padding );
--product-picker-dropdown-border-radius: var(--dropdown-menu-border-radius);
--product-picker-dropdown-box-shadow: var(--dropdown-menu-box-shadow);
--product-picker-dropdown-border-color: var(--dropdown-menu-border-color);
--product-picker-dropdown-bg-color: var(--dropdown-menu-bg-color);

--product-picker-dropdown-item-padding-horizontal: 20px;
--product-picker-dropdown-item-padding-vertical: var(--dropdown-menu-item-padding-vertical);
--product-picker-dropdown-item-separator-padding-top: var(--dropdown-menu-item-separator-padding-top );
--product-picker-dropdown-item-separator-padding-bottom: var(--dropdown-menu-item-separator-padding-bottom );
--product-picker-dropdown-item-border-radius: var(--dropdown-menu-item-border-radius );
--product-picker-dropdown-item-bg-color-active: var(--dropdown-menu-item-bg-color-active);
--product-picker-dropdown-item-bg-color-hover: var(--dropdown-menu-item-bg-color-hover);
--product-picker-dropdown-item-bg-color-disabled: var(--dropdown-menu-item-bg-color-disabled);
--product-picker-dropdown-item-separator-border-color: var(--dropdown-menu-item-separator-border-color);
--product-picker-dropdown-item-color-dangerous: var(--dropdown-menu-item-color-dangerous);
--product-picker-dropdown-item-color-disabled: var(--dropdown-menu-item-color-disabled);
--product-picker-dropdown-item-color-hover: var(--dropdown-menu-item-color-hover);
--product-picker-dropdown-item-color-active: var(--dropdown-menu-item-color-active);

--product-picker-dropdown-item-border-color-focused: var(--dropdown-menu-item-border-color-focused);
```

</details>

## Scorecard

<details>
<summary>Scorecard common variables</summary>

```css
--scorecard-level-color-5-1: var(--color-error-base);
--scorecard-level-color-5-2: var(--color-persian-green-4);
--scorecard-level-color-5-3: var(--color-persian-green-5);
--scorecard-level-color-5-4: var(--color-persian-green-6);
--scorecard-level-color-5-5: var(--color-persian-green-7);

--scorecard-level-color-4-1: var(--color-error-base);
--scorecard-level-color-4-2: var(--color-persian-green-4);
--scorecard-level-color-4-3: var(--color-persian-green-5);
--scorecard-level-color-4-4: var(--color-persian-green-6);

--scorecard-level-color-3-1: var(--color-error-base);
--scorecard-level-color-3-2: var(--color-persian-green-5);
--scorecard-level-color-3-3: var(--color-persian-green-6);

--scorecard-level-color-2-1: var(--color-error-base);
--scorecard-level-color-2-2: var(--color-persian-green-5);
```

</details>

## Search

<details>
<summary>Search common variables</summary>

```css
--search-modal-width: 1100px;
--search-modal-min-width: 455px;
--search-modal-min-height: 530px;
--search-modal-bg-color: var(--modal-bg-color);
--search-modal-box-shadow: var(--modal-box-shadow);
--search-modal-border-radius: var(--border-radius-lg);
--search-modal-border: 1px solid var(--border-color-secondary);

--search-modal-header-bg-color: var(--bg-color-tonal);
--search-modal-header-padding: var(--spacing-sm);

--search-modal-footer-padding: var(--spacing-sm);
--search-modal-footer-gap: var(--spacing-md);

--search-highlight-bg-color: none;
--search-highlight-text-color: var(--color-info-base);

--search-input-font-family: var(--font-family-base);
--search-input-font-size: var(--font-size-base);
--search-input-font-weight: var(--font-weight-regular);
--search-input-line-height: var(--line-height-base);
--search-input-bg-color: var(--bg-color-tonal);
--search-input-text-color: var(--input-content-color-active);
--search-input-icon-color: var(--icon-color-interactive);
--search-input-placeholder-color: var(--input-content-placeholder-color);
--search-input-padding: var(--spacing-sm);
--search-input-gap: var(--spacing-sm);
--search-input-height: 40px;
--search-input-border: none;
--search-input-border-radius: var(--border-radius);

--search-group-title-padding: var(--spacing-sm);
--search-group-title-bg-color: var(--bg-color-tonal);
--search-group-footer-padding: var(--spacing-sm);
--search-group-footer-text-color: var(--link-color-primary);

--search-item-text-color: var(--text-color-secondary);
--search-item-text-color-hover: var(--text-color-primary);
--search-item-title-font-size: var(--font-size-base);
--search-item-title-font-weight: var(--font-weight-medium);
--search-item-title-line-height: var(--line-height-base);
--search-item-title-text-color: var(--text-color-primary);
--search-item-title-padding: var(--spacing-xxs) 0 2px 0;
--search-item-path-text-color: var(--text-color-description);
--search-item-bg-color: transparent;
--search-item-bg-color-hover: var(--layer-color-ontonal-hover);
--search-item-border-color-focused: var(--color-blue-4);
--search-item-padding: var(--spacing-sm) var(--spacing-lg);
--search-item-gap: var(--spacing-xxs);
--search-item-product-icon-size: 16px;

--search-recent-item-font-size: var(--font-size-base);
--search-recent-item-font-weight: var(--font-weight-regular);
--search-recent-item-line-height: var(--line-height-base);
--search-recent-item-padding: var(--spacing-xs) var(--spacing-lg);
--search-recent-item-text-color: var(--search-item-text-color);
--search-recent-item-text-color-hover: var(--search-item-text-color-hover);
--search-recent-item-bg-color-hover: var(--search-item-bg-color-hover);
--search-recent-item-title-font-size: var(--font-size-base);
--search-recent-item-title-font-weight: var(--font-weight-semibold);
--search-recent-item-title-line-height: var(--line-height-base);
--search-recent-item-title-text-color: var(--text-color-primary);
--search-recent-item-title-padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xxs) var(--spacing-lg);
--search-recent-item-bg-color-active: var(--layer-color);
--search-recent-item-border-color-focused: var(--color-blue-4);

--search-suggested-item-font-size: var(--font-size-base);
--search-suggested-item-font-weight: var(--font-weight-regular);
--search-suggested-item-line-height: var(--line-height-base);
--search-suggested-item-padding: var(--spacing-xs) var(--spacing-lg);
--search-suggested-item-text-color: var(--search-item-text-color);
--search-suggested-item-text-color-hover: var(--search-item-text-color-hover);
--search-suggested-item-bg-color-hover: var(--search-item-bg-color-hover);
--search-suggested-item-title-font-size: var(--font-size-base);
--search-suggested-item-title-font-weight: var(--font-weight-semibold);
--search-suggested-item-title-line-height: var(--line-height-base);
--search-suggested-item-title-text-color: var(--text-color-primary);
--search-suggested-item-title-padding: var(--spacing-md) var(--spacing-lg) var(--spacing-xxs) var(--spacing-lg);
--search-suggested-item-bg-color-active: var(--layer-color);
--search-suggested-item-border-color-focused: var(--color-blue-4);

--search-shortcuts-gap: var(--spacing-xs);

--search-message-font-size: var(--font-size-lg);
--search-message-font-weight: var(--font-weight-regular);
--search-message-line-height: var(--line-height-lg);
--search-message-text-color: var(--text-color-secondary);
--search-message-gap: var(--spacing-md);
```

</details>
<details>
<summary>Search filter</summary>

```css
--search-filter-width: 450px;
--search-filter-bg-color: var(--search-modal-bg-color);
--search-filter-padding: var(--spacing-lg);
--search-filter-font-size: var(--font-size-base);
--search-filter-font-weight: var(--font-weight-regular);
--search-filter-line-height: var(--line-height-base);

--search-filter-header-padding: var(--spacing-md) 0;
--search-filter-header-text-color: var(--text-color-helper);
--search-filter-header-z-index: var(--z-index-raised);

--search-filter-fields-gap: var(--spacing-base);

--search-filter-field-select-option-gap: var(--spacing-unit);
--search-filter-field-select-option-text-padding: 0 0 0 var(--spacing-unit);
--search-filter-field-select-footer-padding: 0 0 0 var(--spacing-unit);
--search-filter-field-select-footer-text-color: var(--text-color-helper);

--search-filter-field-tags-gap: var(--spacing-unit);
--search-filter-field-tags-tag-margin: var(--spacing-unit) 0 0 0;
  ```

</details>
<details>
<summary>Search trigger</summary>

```css
--search-trigger-gap: var(--spacing-xs);
--search-trigger-border-width: var(--border-width);
--search-trigger-border-style: var(--border-style);
--search-trigger-border-color: var(--input-border-color);
--search-trigger-border-color-hover: var(--input-border-color-hover);
--search-trigger-border-radius: var(--border-radius-md);
--search-trigger-padding-vertical: var(--input-padding-vertical);
--search-trigger-padding-horizontal: var(--input-padding-horizontal);
--search-trigger-padding: var(--search-trigger-padding-vertical) var(--search-trigger-padding-horizontal);
--search-trigger-color: var(--input-content-placeholder-color);
--search-trigger-bg-color: var(--navbar-bg-color);
--search-trigger-icon-size: 16px;
--search-trigger-line-height: var(--line-height-base);
```

</details>

<details>
<summary>Search AI</summary>

```css
  --search-ai-spinner-icon-color: var(--icon-color-interactive);
  --search-ai-checkmark-icon-color: var(--icon-color-interactive);
  --search-ai-response-padding: var(--spacing-lg);
  --search-ai-response-gap: var(--spacing-sm);

  --search-ai-response-header-gap: var(--spacing-md);

  --search-ai-question-font-size: var(--font-size-xl);
  --search-ai-question-font-weight: var(--font-weight-semibold);
  --search-ai-question-line-height: var(--line-height-xl);
  --search-ai-question-text-color: var(--text-color-primary);

  --search-ai-response-body-gap: var(--spacing-xl);
  --search-ai-response-body-padding: 0 40px;

  --search-ai-text-color: var(--text-color-secondary);
  --search-ai-text-font-size: var(--font-size-lg);
  --search-ai-text-line-height: var(--line-height-lg);

  --search-ai-user-bg-color: var(--color-blue-6);
  --search-ai-user-text-color: var(--color-static-white);
  --search-ai-assistant-bg-color: var(--layer-color);
  --search-ai-assistant-text-color: var(--text-color-primary);
  --search-ai-assistant-border: 1px solid var(--border-color-primary);

  --search-ai-resources-gap: var(--spacing-base);
  --search-ai-resources-title-font-weight: var(--font-weight-medium);
  --search-ai-resources-title-font-size: var(--font-size-lg);
  --search-ai-resources-title-line-height: var(--line-height-lg);

  --search-ai-resource-tags-gap: var(--spacing-base);
  --search-ai-resource-tag-text-color: var(--text-color-secondary);
  --search-ai-resource-tag-icon-color: var(--text-color-secondary);
  --search-ai-resource-tag-icon-size: 16px;

  --search-ai-icon-size: 32px;
  --search-ai-icon-bg-color: var(--search-ai-gradient);
  --search-ai-icon-color: var(--color-static-white);

  --search-ai-button-icon-color: none;

  --search-ai-thinking-dots-gap: 4px;
  --search-ai-thinking-dots-padding: 4px 0;
  --search-ai-thinking-dot-size: 6px;
  --search-ai-thinking-dot-color: var(--search-ai-gradient);

  --search-ai-disclaimer-font-size: var(--font-size-sm);
  --search-ai-disclaimer-line-height: var(--line-height-sm);
  --search-ai-disclaimer-text-color: var(--text-color-secondary);

  --search-ai-gradient: linear-gradient(to right, #715efe, #ff5cdc);

  --search-ai-welcome-margin: var(--spacing-md);
  --search-ai-icon-wrapper-padding: var(--spacing-xs);

  --search-ai-suggestions-title-text-color: var(--text-color-description);
  --search-ai-suggestions-title-font-size: var(--font-size-base);
  --search-ai-suggestions-title-line-height: var(--line-height-base);
  --search-ai-suggestions-title-font-weight: var(--font-weight-light);
  
  --search-ai-suggestions-text-color: var(--text-color-description);

  --search-ai-conversation-input-send-button-bg-color: var(--button-bg-color-primary);
  --search-ai-conversation-input-send-button-bg-color-hover: var(--button-bg-color-primary-hover);
  --search-ai-conversation-input-send-button-bg-color-disabled: var(--button-bg-color-disabled);
  --search-ai-conversation-input-send-button-border-color-disabled: var(--button-border-color-disabled);
  --search-ai-conversation-input-send-button-icon-color: var(--color-static-white);

  --search-ai-dialog-bg-color: var(--bg-color);
  --search-ai-dialog-header-border: var(--search-modal-border);
  --search-ai-dialog-header-bg-color: var(--search-modal-header-bg-color);
  --search-ai-dialog-header-padding: var(--search-modal-header-padding);

  --search-ai-dialog-body-padding: var(--search-ai-response-padding);
  --search-ai-dialog-body-gap: var(--spacing-sm);

  --search-ai-dialog-input-padding: var(--spacing-sm) var(--search-ai-response-padding);
  --search-ai-dialog-input-border: 1px solid var(--border-color-secondary);
  --search-ai-dialog-input-bg-color: var(--bg-color);

  --search-ai-conversation-input-bg-color: var(--bg-color);
  --search-ai-conversation-input-padding: var(--spacing-sm) var(--spacing-md);
  --search-ai-conversation-input-border: 1px solid var(--border-color-secondary);
  --search-ai-conversation-input-border-radius: var(--border-radius-lg);
  --search-ai-conversation-input-font-size: var(--font-size-base);
  --search-ai-conversation-input-placeholder-color: var(--search-input-placeholder-color);
  --search-ai-conversation-input-border-color-focus: var(--color-blue-6);
  --search-ai-conversation-input-border-color-disabled: var(--border-color-secondary);

  --search-ai-conversation-input-send-button-right: 12px;
  --search-ai-conversation-input-send-button-bg-color: var(--button-bg-color-primary);
  --search-ai-conversation-input-send-button-bg-color-hover: var(--button-bg-color-primary-hover);
  --search-ai-conversation-input-send-button-bg-color-disabled: var(--button-bg-color-disabled);
  --search-ai-conversation-input-send-button-border-disabled: 1px solid var(--button-border-color-disabled);

  --search-ai-response-padding: var(--spacing-lg);
  --search-ai-response-gap: var(--spacing-sm);
  --search-ai-response-header-gap: var(--spacing-md);
  --search-ai-response-body-gap: var(--spacing-xl);
  --search-ai-response-body-padding: 0 40px;

  --search-ai-text-color: var(--text-color-secondary);
  --search-ai-text-font-size: var(--font-size-lg);
  --search-ai-text-line-height: var(--line-height-lg);

  --search-ai-thinking-text-margin: var(--md-pre-margin) 0;

  --search-ai-question-font-size: var(--font-size-xl);
  --search-ai-question-font-weight: var(--font-weight-semibold);
  --search-ai-question-line-height: var(--line-height-xl);
  --search-ai-question-text-color: var(--text-color-primary);

  --search-ai-resources-gap: var(--spacing-base);
  --search-ai-resources-title-font-weight: var(--font-weight-medium);
  --search-ai-resources-title-font-size: var(--font-size-lg);
  --search-ai-resources-title-line-height: var(--line-height-lg);

  --search-ai-resource-tags-gap: var(--spacing-base);
  --search-ai-resource-tag-text-color: var(--text-color-secondary);
  --search-ai-resource-tag-icon-color: var(--text-color-secondary);

  --search-ai-suggestions-gap: var(--spacing-sm);
  --search-ai-suggestions-margin-left: var(--spacing-xs);
  --search-ai-suggestion-item-gap: var(--spacing-xs);

  --search-ai-suggestions-title-text-color: var(--text-color-description);
  --search-ai-suggestions-title-font-size: var(--font-size-base);
  --search-ai-suggestions-title-line-height: var(--line-height-base);
  --search-ai-suggestions-title-font-weight: var(--font-weight-light);

  --search-ai-spinner-icon-color: var(--icon-color-interactive);
  --search-ai-checkmark-icon-color: var(--icon-color-interactive);

```

</details>

## Segmented

<details>
<summary>Segmented common variables</summary>

```css
--segmented-font-size: var(--font-size-base);
--segmented-font-weight: var(--font-weight-regular);
--segmented-text-color: var(--text-color-secondary);
--segmented-line-height: var(--line-height-base);

--segmented-font-size-active: var(--font-size-base);
--segmented-font-weight-active: var(--font-weight-medium);
--segmented-text-color-active: var(--text-color-primary);

--segmented-buttons-content-color: var(--color-warm-grey-8);
--segmented-buttons-content-color-hover: var(--color-warm-grey-11);
--segmented-buttons-content-color-active: var(--color-blue-11);
--segmented-buttons-bg-color-inner: var(--color-white);
--segmented-buttons-bg-color-main: var(--color-warm-grey-2);
```

</details>

## Select

<details>
<summary>Select common variables</summary>

```css
--select-font-size: var(--font-size-base);
--select-font-weight: var(--font-weight-regular);
--select-line-height: var(--line-height-base);
--select-text-color: var(--text-color-secondary);
--select-border-radius: var(--border-radius);

--select-input-padding-vertical: 6px;
--select-input-padding-horizontal: 6px;
--select-input-padding: var(--select-input-padding-vertical) var(--select-input-padding-horizontal);
--select-input-gap: var(--spacing-xs);
--select-input-value-gap: var(--spacing-unit);
--select-input-border-radius: var(--border-radius);
--select-input-font-size: var(--font-size-base);
--select-input-font-weight: var(--font-weight-regular);
--select-input-line-height: var(--line-height-base);
--select-input-bg-color: var(--bg-color);
--select-input-placeholder-color: var(--input-content-placeholder-color);

--select-list-min-width: 100px;
--select-list-max-width: 300px;
--select-list-padding: var(--spacing-xxs);
--select-list-border-radius: var(--border-radius-lg);
--select-list-bg-color: var(--bg-color);
--select-list-box-shadow: var(--bg-raised-shadow);

--select-list-item-padding-vertical: var(--spacing-xs);
--select-list-item-padding-horizontal: var(--spacing-base);
--select-list-item-padding: var(--select-list-item-padding-vertical) var(--select-list-item-padding-horizontal);

--select-list-item-gap: var(--spacing-xs);
--select-list-item-border-radius: var(--border-radius);
--select-list-item-bg-color-active: transparent;
--select-list-item-bg-color-hover: var(--menu-item-bg-color-hover);
--select-list-item-font-weight-active: var(--font-weight-medium);
```

</details>

## Sidebar

<details>
<summary>Sidebar common variables</summary>

```css
--sidebar-logo-max-height: 285px;
--sidebar-logo-max-width: 285px;
--sidebar-logo-padding: 2px;

--sidebar-font-size: var(--font-size-base);
--sidebar-font-family: var(--font-family-base);
--sidebar-word-break: inherit;
--sidebar-bg-color: var(--bg-color);
--sidebar-border-color: var(--border-color-secondary);
--sidebar-text-color: var(--tree-content-color-default);
--sidebar-spacing-unit: var(--spacing-base);
--sidebar-width: 285px;
--sidebar-collapsed-width: 55px;
--sidebar-margin-horizontal: var(--spacing-base);
--sidebar-offset-top: var(--sidebar-spacing-unit);
--sidebar-offset-left: var(--sidebar-spacing-unit);

--sidebar-chevron-size: var(--spacing-xs);

--sidebar-header-padding-bottom: var(--sidebar-spacing-unit);

--sidebar-footer-padding-vertical: var(--spacing-sm);
--sidebar-footer-padding-horizontal: var(--spacing-base);

--sidebar-controls-collapsed-gap: var(--spacing-xs);
--sidebar-controls-collapsed-padding-vertical: var(--spacing-xs);
--sidebar-controls-collapsed-padding-horizontal: var(--spacing-xxs);
```

</details>

<details>
<summary>Sidebar back button</summary>

```css
--sidebar-back-button-icon-color: var(--sidebar-item-text-color);
--sidebar-back-button-icon: none;
```

</details>

## Sidebar menu

<details>
<summary>Sidebar menu</summary>

```css
--menu-padding: 0px;
--menu-margin: 0px;
--menu-list-style: none;

--menu-content-color: var(--text-color-secondary);
--menu-content-title-color: var(--text-color-description);
--menu-content-color-active: var(--text-color-primary);
--menu-content-color-disabled: var(--text-color-disabled);
```

</details>
<details>
<summary>Sidebar menu item</summary>

```css
--menu-item-font-family: var(--sidebar-font-family);
--menu-item-font-size: var(--sidebar-font-size);
--menu-item-font-weight: var(--font-weight-regular);
--menu-item-line-height: var(--line-height-base);

--menu-item-text-color: var(--sidebar-text-color);
--menu-item-bg-color: transparent;
--menu-item-bg-color-hover: var(--color-hover-base);
--menu-item-bg-color-active: var(--tree-bg-color-active);

--menu-item-color-hover: var(--tree-content-color-hover);
--menu-item-color-active: var(--tree-content-color-default);

--menu-item-padding-vertical: var(--spacing-unit);
--menu-item-padding-horizontal: var(--spacing-xxs);
--menu-item-nested-offset: var(--spacing-sm);

--menu-item-label-align-items: center;
--menu-item-label-transition: background-color 0.3s, color 0.3s;
--menu-item-label-word-break: break-word;
--menu-item-label-margin-horizontal: var(--sidebar-margin-horizontal);
--menu-item-label-margin-vertical: 0;
--menu-item-label-margin: var(--menu-item-label-margin-vertical) var(--menu-item-label-margin-horizontal);
--menu-item-label-padding: var(--menu-item-padding-vertical) var(--menu-item-padding-horizontal);
--menu-item-label-gap: var(--spacing-xs);
--menu-item-label-border-radius: 6px;
--menu-item-label-chevron-size: 12px;
--menu-item-label-chevron-offset: calc(var(--menu-item-label-gap) + var(--menu-item-label-chevron-size));

--menu-item-sublabel-font-family: inherit; // sublabel is for drilldown only but I would like to support it in general
--menu-item-sublabel-font-size: var(--font-size-sm);
--menu-item-sublabel-font-weight: var(--font-weight-regular);
--menu-item-sublabel-text-color: var(--menu-item-text-color);
--menu-item-sublabel-margin: 0 0 0 var(--spacing-base);

--menu-item-icon-size: var(--spacing-base);
--menu-item-icon-margin: 0px;
--menu-item-icon-border-radius: 100%;

--menu-item-external-icon-size: 10px;
```

</details>
<details>
<summary>Sidebar menu item separator</summary>

> classes `'menu-item-type-separator','menu-item-type-separator-primary','menu-item-type-separator-secondary'`

```css
--menu-item-separator-line-height: 1px;
--menu-item-separator-line-bg-color: var(--border-color-secondary);

.menu-item-type-separator {
  --menu-item-label-chevron-offset: 0px;
}

.menu-item-type-separator-primary {
  --menu-item-font-weight: var(--font-weight-bold);
  --menu-item-text-color: var(--text-color-primary);
  --menu-item-font-size: var(--sidebar-font-size);
  --menu-item-line-height: var(--line-height-base);
}

.menu-item-type-separator-secondary {
  --menu-item-font-weight: var(--font-weight-bold);
  --menu-item-text-color: var(--text-color-secondary);
  --menu-item-font-size: var(--font-size-sm);
  --menu-item-line-height: var(--line-height-sm);
}
```

</details>
<details>
<summary>Sidebar mobile menu</summary>

```css
--menu-mobile-height: calc(100vh - var(--navbar-height));
--menu-mobile-width: 100%;
--menu-mobile-z-index: var(--z-index-raised);
--menu-mobile-left: 0;
--menu-mobile-top: var(--navbar-height);
--menu-mobile-transition: 0.5s;
--menu-mobile-bg: var(--bg-color);
--menu-mobile-margin: var(--menu-mobile-items-margin-top) var(--menu-mobile-margin-horizontal) 0 var(--menu-mobile-margin-horizontal);
--menu-mobile-line-height: var(--line-height-base);
--menu-mobile-padding-top: var(--spacing-sm);
--menu-mobile-margin-horizontal: var(--spacing-xs);
--menu-mobile-items-margin-top: var(--spacing-xxs);

--menu-mobile-profile-bg-color: var(--bg-color);
--menu-mobile-profile-border-color: var(--border-color-secondary);

--menu-mobile-control-button-padding-vertical: var(--spacing-xxs);
--menu-mobile-control-button-padding-horizontal: var(--spacing-xxs);
--menu-mobile-control-button-padding: var(--menu-mobile-control-button-padding-vertical) var(--menu-mobile-control-button-padding-horizontal);
--menu-mobile-control-button-margin-vertical: 0;
--menu-mobile-control-button-margin-horizontal: var(--spacing-xs);
--menu-mobile-control-button-margin: var(--menu-mobile-control-button-margin-vertical) var(--menu-mobile-control-button-margin-horizontal);
--menu-mobile-control-button-font-size: var(--font-size-sm);
--menu-mobile-control-button-weight: var(--font-weight-regular);
--menu-mobile-control-button-line-height: var(--line-height-sm);
--menu-mobile-control-button-color: var(--menu-item-text-color);
--menu-mobile-control-button-color-hover: var(--text-color-primary);
--menu-mobile-control-button-text-align: center;

--menu-mobile-product-name-font-size: var(--menu-item-font-size);
--menu-mobile-product-name-font-weight: var(--font-weight-bold);
--menu-mobile-product-name-line-height: var(--line-height-base);
--menu-mobile-product-name-text-color: var(--menu-item-text-color);
--menu-mobile-product-name-border-radius: var(--menu-item-label-border-radius);
--menu-mobile-product-name-border: none;
--menu-mobile-product-name-padding: var(--menu-item-padding-vertical) var(--menu-item-padding-horizontal);
--menu-mobile-product-name-margin: var(--menu-item-label-margin);

--menu-container-padding-top: var(--sidebar-offset-top);
```

</details>

## Switch

<details>
<summary>Switch</summary>

```css
--switch-bg-color: var(--color-warm-grey-4);
--switch-bg-color-selected: var(--color-warm-grey-9);
--switch-bg-color-hover: var(--color-warm-grey-5);
--switch-bg-color-pressed: var(--color-warm-grey-6);
--switch-bg-color-disabled: var(--color-warm-grey-3);
--switch-knob-bg-color: var(--color-white);
--switch-knob-bg-color-selected: var(--color-white);
--switch-border-radius: var(--border-radius);
--switch-knob-border-radius: calc(var(--border-radius) / 2);
--switch-width: 32px;
--switch-height: 18px;
--switch-padding: calc(var(--spacing-xxs) / 2);
--switch-bg-transition: background-color 0.3s;
--switch-knob-height: 14px;
--switch-knob-width: 14px;
--switch-knob-transition: transform 0.3s;
```

</details>

## Table of content

<details>
<summary>TOC common variables</summary>

```css
--toc-width: 240px;
--toc-bg-color: transparent;
--toc-border-color: var(--border-color-secondary);

--toc-spacing-unit: var(--spacing-xs);
--toc-offset-top: var(--toc-spacing-unit);
```

</details>
<details>
<summary>TOC item</summary>

```css
--toc-item-font-family: var(--font-family-base);
--toc-item-font-size: var(--font-size-base);
--toc-item-line-height: var(--line-height-base);
--toc-item-font-weight: var(--font-weight-regular);
--toc-item-text-color: var(--text-color-description);
--toc-item-text-color-active: var(--text-color-primary);
--toc-item-bg-color: transparent;
--toc-item-nested-offset: calc(var(--toc-spacing-unit) * 2);
--toc-item-padding-vertical: calc(var(--toc-spacing-unit) / 2);
--toc-item-padding-horizontal: calc(var(--toc-spacing-unit) * 2);
--toc-item-border-color-active: var(--border-color-invers);
```

</details>
<details>
<summary>TOC heading</summary>

```css
--toc-heading-font-size: var(--font-size-base);
--toc-heading-font-family: var(--font-family-base);
--toc-heading-font-weight: var(--font-weight-medium);
--toc-heading-text-color: var(--text-color-primary);
--toc-heading-text-transform: none;
--toc-heading-line-height: var(--line-height-base);

```

</details>

## Tags

<details>
<summary>Tags common variables</summary>

```css
--tag-font-size: var(--font-size-sm);
--tag-font-family: inherit;
--tag-font-weight: var(--font-weight-regular);
--tag-line-height: var(--line-height-sm);
--tag-text-transform: capitalize;

--tag-border-width: 1px;
--tag-border-style: solid;
--tag-border-radius: var(--border-radius-xl);
--tag-box-shadow: none;

--tag-status-dot-color-default: var(--color-persian-green-7);
--tag-badge-size: var(--spacing-xs);
--tag-badge-border-width: 1.5px;
--tag-badge-border-color: #ffffff;

--tag-padding: 1px 8px;
--tag-large-padding: 4px 16px;
--tag-margin: 0 5px 0 0;
--tag-gap: 5px;

.tag-size-large {
  --tag-padding: var(--tag-large-padding);
  --tag-font-size: var(--font-size-base);
}

--tag-icon-width: 1em;
--tag-icon-height: 1em;

--tag-basic-content-color: var(--color-warm-grey-9);
--tag-basic-bg-color: var(--color-warm-grey-2);
--tag-basic-border-color: var(--color-warm-grey-2);
```

</details>
<details>
<summary>Tag gray, default, draft, schema</summary>

> classes `'tag-grey,','tag-draft','tag-schema','tag-default'`

```css
.tag-grey,
.tag-draft,
.tag-schema,
.tag-default {
  --tag-color: var(--text-color-primary);
  --tag-bg-color: var(--color-warm-grey-2);
  --tag-border-color: var(--border-color-primary);
}
```

</details>
<details>
<summary>Tag green, success, approved, get</summary>

> classes `'tag-green,','tag-success','tag-approved'`

```css
.tag-green,
.tag-success,
.tag-approved {
  --tag-color: var(--color-success-active);
  --tag-bg-color: var(--color-success-bg);
  --tag-border-color: var(--color-success-active);
}
```

</details>
<details>
<summary>Tag red, error, declined, delete</summary>

> classes `'tag-red,','tag-error','tag-declined'`

```css
.tag-red,
.tag-error,
.tag-declined {
  --tag-color: var(--color-error-active);
  --tag-bg-color: var(--color-error-bg);
  --tag-border-color: var(--color-error-active);
}
```

</details>
<details>
<summary>Tag gold, warning, deprecated, put</summary>

> classes `'tag-gold,','tag-warning','tag-deprecated'`

```css
.tag-gold,
.tag-warning,
.tag-deprecated {
  --tag-color: var(--color-warning-active);
  --tag-bg-color: var(--color-warning-bg);
  --tag-border-color: var(--color-warning-active);
}
```

</details>
<details>
<summary>Tag blue, processing, post</summary>

> classes `'tag-blue,','tag-processing'`

```css
.tag-blue,
.tag-processing {
  --tag-color: var(--color-info-active);
  --tag-bg-color: var(--color-info-bg);
  --tag-border-color: var(--color-info-active);
}
```

</details>
<details>
<summary>Tag purple, head</summary>

> classes `'tag-purple,','tag-head'`

```css
.tag-purple,
.tag-head {
  --tag-color: var(--color-purple-7);
  --tag-bg-color: var(--color-purple-1);
  --tag-border-color: var(--color-purple-7);
}
```

</details>
<details>
<summary>Tag cyan, option</summary>

> classes `'tag-cyan,','tag-option'`

```css
  .tag-cyan,
  .tag-option {
    --tag-color: var(--color-turquoise-7);
    --tag-bg-color: var(--color-turquoise-1);
    --tag-border-color: var(--color-turquoise-7);
  }
```

</details>
<details>
<summary>Tag yellow</summary>

> classes `'tag-yellow'`

```css
.tag-yellow {
  --tag-color: var(--color-carrot-7);
  --tag-bg-color: var(--color-carrot-1);
  --tag-border-color: var(--color-carrot-7);
}
```

</details>
<details>
<summary>Tag geekblue, link</summary>

> classes `'tag-geekblue,','tag-link'`

```css
.tag-geekblue,
.tag-link {
  --tag-color: var(--color-turquoise-7);
  --tag-bg-color: var(--color-turquoise-1);
  --tag-border-color: var(--color-turquoise-7);
}
```

</details>
<details>
<summary>Tag magenta, hook</summary>

> classes `'tag-magenta,','tag-hook'`

```css
.tag-magenta,
.tag-hook {
  --tag-color: var(--color-magenta-7);
  --tag-bg-color: var(--color-magenta-1);
  --tag-border-color: var(--color-magenta-7);
}
```

</details>
<details>
<summary>Tag lime</summary>

> classes `'tag-lime'`

```css
.tag-lime {
  --tag-color: var(--color-green-7);
  --tag-bg-color: none;
  --tag-border-color: var(--color-green-7);
}
```

</details>

<details>
<summary>Tag product</summary>

> classes `'tag-product'`

```css
.tag-product {
  --tag-color: var(--color-green-7);
  --tag-bg-color: none;
  --tag-border-color: var(--color-green-7);
}
```

</details>
<details>
<summary>Tag http</summary>

```css
--http-tag-width: 45px;
--http-tag-height: 22px;
--http-tag-font-family: var(--font-family-monospaced);
--http-tag-font-size: var(--font-size-sm);
--http-tag-font-weight: var(--font-weight-bold);
--http-tag-line-height: var(--line-height-sm);
--http-tag-margin: 0px;
--http-tag-padding: 2px 0 0 0;
--http-tag-border: none;
--http-tag-bg-color: none;

--http-tag-operation-color-delete: #E70B46;
--http-tag-operation-color-get: #25B869;
--http-tag-operation-color-post: #1E65F5;
--http-tag-operation-color-put: #F5901D;
--http-tag-operation-color-patch: #F5C31D;
```

> classes `'tag-http','tag-get','tag-post','tag-put','tag-patch','tag-delete'`

```css
.tag-http {
  --tag-font-family: var(--font-family-monospaced);
  --tag-text-transform: uppercase;
}

.tag-get {
  --tag-color: var(--http-tag-operation-color-get);
}

.tag-post {
  --tag-color: var(--http-tag-operation-color-post);
}

.tag-put {
  --tag-color: var(--http-tag-operation-color-put);
}

.tag-patch {
  --tag-color: var(--http-tag-operation-color-patch);
}

.tag-delete {
  --tag-color: var(--http-tag-operation-color-delete);
}
```

</details>
<details>
<summary>Tag counter</summary>

```css
--counter-tag-padding: 0px var(--spacing-xxs);
--counter-tag-border-radius: var(--border-radius);
--counter-tag-min-width: var(--spacing-md);
```

</details>

## Tooltip

<details>
<summary>Tooltip</summary>

```css
--tooltip-text-color: var(--text-color-secondary);
--tooltip-bg-color: var(--bg-color-raised);
--tooltip-padding-vertical: var(--spacing-xs);
--tooltip-padding-horizontal: var(--spacing-sm);
--tooltip-padding: var(--tooltip-padding-vertical) var(--tooltip-padding-horizontal);
--tooltip-max-width: 250px;
```

</details>
<details>
<summary>Tooltip copy button</summary>

```css
.tooltip-copy-button {
  --tooltip-text-color: var(--text-color-secondary);
  --tooltip-bg-color: var(--bg-color-raised);
}
```

</details>

## User profile

<details>
<summary>User profile avatar</summary>

```css
--user-menu-navbar-button-width: var(--control-height-base);
--user-menu-navbar-button-height: var(--control-height-base);

--user-menu-avatar-width: var(--spacing-xxl);
--user-menu-avatar-height: var(--spacing-xxl);
--user-menu-avatar-border-radius: 50%;
--user-menu-avatar-bg-color: var(--button-bg-color-secondary);

--user-menu-avatar-font-family: var(--navbar-item-font-family);
--user-menu-avatar-font-size: var(--navbar-item-font-size);
--user-menu-avatar-font-weight: var(--font-weight-regular);
--user-menu-avatar-line-height: var(--line-height-base);

--user-menu-user-details-padding-vertical: var(--spacing-base);
--user-menu-user-details-padding-horizontal: var(--spacing-md);
--user-menu-user-details-bg-color: var(--layer-color);

--user-menu-name-font-weight: var(--font-weight-medium);
--user-menu-name-font-size: var(--font-size-lg);
--user-menu-name-line-height: var(--line-height-lg);

--user-menu-user-info-items-gap: var(--spacing-base);

--user-menu-email-font-size: var(--font-size-sm);
--user-menu-email-line-height: var(--line-height-sm);
```

</details>
<details>
<summary>User profile dropdown</summary>

```css
--user-menu-dropdown-font-size: var(--dropdown-menu-font-size);
--user-menu-dropdown-font-weight: var(--dropdown-menu-font-weight);
--user-menu-dropdown-line-height: var(--dropdown-menu-line-height);
--user-menu-dropdown-text-color: var(--dropdown-menu-text-color);

--user-menu-dropdown-min-width: 180px;
--user-menu-dropdown-max-width: var(--dropdown-menu-max-width);
--user-menu-dropdown-max-height: none;
--user-menu-dropdown-padding: var(--dropdown-menu-padding );
--user-menu-dropdown-border-radius: var(--dropdown-menu-border-radius);
--user-menu-dropdown-box-shadow: var(--dropdown-menu-box-shadow);
--user-menu-dropdown-border-color: var(--dropdown-menu-border-color);
--user-menu-dropdown-bg-color: var(--dropdown-menu-bg-color);

--user-menu-dropdown-item-padding-horizontal: 20px;
--user-menu-dropdown-item-padding-vertical: var(--dropdown-menu-item-padding-vertical);
--user-menu-dropdown-item-separator-padding-top: var(--dropdown-menu-item-separator-padding-top );
--user-menu-dropdown-item-separator-padding-bottom: var(--dropdown-menu-item-separator-padding-bottom );
--user-menu-dropdown-item-border-radius: var(--dropdown-menu-item-border-radius );
--user-menu-dropdown-item-bg-color-active: var(--dropdown-menu-item-bg-color-active);
--user-menu-dropdown-item-bg-color-hover: var(--dropdown-menu-item-bg-color-hover);
--user-menu-dropdown-item-bg-color-disabled: var(--dropdown-menu-item-bg-color-disabled);
--user-menu-dropdown-item-separator-border-color: var(--dropdown-menu-item-separator-border-color);
--user-menu-dropdown-item-color-disabled: var(--dropdown-menu-item-color-disabled);
--user-menu-dropdown-item-color-hover: var(--dropdown-menu-item-color-hover);
--user-menu-dropdown-item-color-active: var(--dropdown-menu-item-color-active);
--user-menu-dropdown-item-color-dangerous: var(--dropdown-menu-item-color-dangerous);
--user-menu-dropdown-item-border-color-focused: var(--dropdown-menu-item-border-color-focused);
```

</details>

## Version picker

<details>
<summary>Version picker variables</summary>

```css
--version-picker-font-size: var(--font-size-base);
--version-picker-font-weight: var(--select-font-weight);
--version-picker-line-height: var(--select-line-height);
--version-picker-text-color: var(--select-text-color);
--version-picker-border-radius: var(--select-border-radius);
--version-picker-padding-vertical: 10px;
--version-picker-padding-horizontal: var(--sidebar-margin-horizontal);
--version-picker-border-bottom: 1px solid var(--border-color-primary);

--version-picker-label-font-size: var(--font-size-base);
--version-picker-label-font-weight: var(--font-weight-bold);

--version-picker-input-padding-horizontal: var(--select-input-padding-horizontal);
--version-picker-input-padding-vertical: var(--select-input-padding-vertical);
--version-picker-input-border: 1px solid var(--border-color-primary);
--version-picker-input-border-radius: var(--select-input-border-radius);

--version-picker-list-min-width: var(--select-list-min-width);
--version-picker-list-max-width: var(--select-list-max-width);
--version-picker-list-padding: var(--select-list-padding);
--version-picker-list-border-radius: var(--select-list-border-radius);
--version-picker-list-bg-color: var(--select-list-bg-color);
--version-picker-list-box-shadow: var(--select-list-box-shadow);

--version-picker-list-item-padding-horizontal: var(--select-list-item-padding-horizontal);
--version-picker-list-item-padding-vertical: var(--select-list-item-padding-vertical);
--version-picker-list-item-border-radius: var(--select-list-item-border-radius);
--version-picker-list-item-bg-color-active: var(--select-list-item-bg-color-active);
--version-picker-list-item-bg-color-hover: var(--select-list-item-bg-color-hover);
```

</details>
