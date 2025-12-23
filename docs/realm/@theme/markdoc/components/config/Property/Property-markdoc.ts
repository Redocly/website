import type { Schema } from '@markdoc/markdoc';

export const ConfigPropertyTag: Schema = {
  render: 'ConfigProperty',
  selfClosing: true,
  attributes: {
    file: {
      type: String,
      required: true,
    },
  },
};
