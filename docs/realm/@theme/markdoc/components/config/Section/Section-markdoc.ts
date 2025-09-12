import type { Schema } from '@markdoc/markdoc';

export const ConfigSectionTag: Schema = {
  render: 'ConfigSection',
  children: ['tag'],
  selfClosing: false,
  attributes: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
