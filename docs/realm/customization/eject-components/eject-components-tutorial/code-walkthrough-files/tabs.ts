import markdoc from '@markdoc/markdoc';

import type { MarkdocSchemaWrapper } from '@redocly/theme/markdoc/tags/types';

import { isTag } from '@redocly/theme/core/utils';

export const tabs: MarkdocSchemaWrapper = {
  schema: {
    // @chunk {"steps": ["add-syncId-markdoc-attribute"]}
    attributes: {
      syncId: { type: String },
    },
    // @chunk-end
    transform(node, config) {
      const attributes = node.transformAttributes(config);
      const children = node.transformChildren(config);

      const tabsContent = children.map((child) => {
        if (isTag(child) && child?.name === 'CodeBlock') {
          const key = child.attributes['data-language'] || 'default';
          const label = child.attributes['data-label'] || key;
          return new markdoc.Tag('div', { label, key }, [child]);
        }
        return child;
      });

      return new markdoc.Tag('Tabs', attributes, tabsContent);
    },
  },
  tagName: 'tabs',
};
