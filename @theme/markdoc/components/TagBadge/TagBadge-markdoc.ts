import type { Schema } from '@markdoc/markdoc';

export const TagBadgeSchema: Schema & { tagName: string } = {
    attributes: {
        badgeType: { 
          type: 'String',
          required: true,
          matches: ['Redocly', 'Built-in'] 
        },
    },
    tagName: 'markdoc-tag-badge',
    render: 'TagBadge',
};
