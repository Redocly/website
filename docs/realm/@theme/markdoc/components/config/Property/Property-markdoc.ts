import type { Schema } from '@redocly/markdoc';

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
