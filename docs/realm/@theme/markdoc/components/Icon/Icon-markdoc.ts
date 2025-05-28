import type { Schema } from '@markdoc/markdoc';

export const IconTag: Schema = {
  render: 'Icon',
  selfClosing: true,
  attributes: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
};
