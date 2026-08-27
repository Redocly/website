import markdoc from '@markdoc/markdoc';

import type { Config, Node } from '@markdoc/markdoc';
import type { MarkdocTagSchema } from '@redocly/theme/markdoc/tags/types';

export const DemoTag: MarkdocTagSchema = {
  render: 'Demo',
  attributes: {
    tag: {
      type: String,
      required: true,
      description: 'Name of the built-in Markdoc tag to demonstrate, such as "admonition".',
    },
    properties: {
      type: Object,
      description:
        'Attribute descriptors of the demonstrated tag, either as a flat map or as "groups", "content", and "attributes". Each descriptor holds a "type", and optionally "default", "required", "description", "enum", and "group".',
    },
    layout: {
      type: String,
      default: 'horizontal',
      matches: ['horizontal', 'vertical'],
      description:
        'Places the form beside the preview ("horizontal", the default) or under it ("vertical").',
    },
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    // The body doubles as text, so the form can edit it and the snippet can show it.
    const body = node.children
      .map((child) => markdoc.format(child))
      .join('\n')
      .trim();

    return new markdoc.Tag(
      'Demo',
      { ...attributes, initialChildren: body },
      node.transformChildren(config),
    );
  },
};
