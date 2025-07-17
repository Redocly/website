# Migrate from custom types

If you were previously using custom types for similar functionality, you can now simplify your schema:

**Before:**
```typescript
import { Link } from '@redocly/theme/markdoc/attributes/link';
import { RawContent } from '@redocly/theme/markdoc/attributes/raw-content';

export const tags: Record<string, Schema> = {
  card: {
    render: 'Card',
    attributes: {
      to: { type: Link },
      content: { type: RawContent }
    },
  }
}
```

**After:**
```typescript
export const tags: Record<string, Schema> = {
  card: {
    render: 'Card',
    attributes: {
      to: { type: String, resolver: 'link' },
      content: { type: String, resolver: 'rawContent' }
    },
  }
}
```
