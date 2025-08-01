# Display the current locale

You can dynamically display the currently used locale on Markdown and React pages.
The following steps use the first-level heading as an example, but you can display the locale anywhere on the page.

## Markdown pages

To display the current locale in Markdown pages, use the global `$lang` variable in a Markdoc tag, as in the following example:

```markdown {% process=false %}
# Current language: {% $lang %}
```

## React pages

To display the current locale on React pages, use the `useL10n` hook obtained from `useThemeHooks`.

```typescript
import React from 'react';

import { useThemeHooks } from '@redocly/theme/core/hooks';

export default function () {
  const { useL10n } = useThemeHooks();
  const { lang, changeLanguage } = useL10n(); // access current language and the function to change it
  
  // Example of using the current language
  return (
    <div>
      <h1>Current language: {lang}</h1>
      <button onClick={() => changeLanguage('fr')}>Switch to French</button>
    </div>
  );
}
```

## Resources

* Learn how to configure localization in [l10n configuration](../../config/l10n.md).
* Learn how to localize your content files in [Add translated content](./localize-content.md).
