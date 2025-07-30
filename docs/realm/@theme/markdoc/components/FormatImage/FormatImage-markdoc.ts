import type { Schema } from '@markdoc/markdoc';
export const FormatImageTag: Schema & { tagName: string } = {
  render: 'FormatImage',
  attributes: {
    withLightbox: { type: Boolean, default: true },
    caption: { type: String },
    align: {
      type: String,
      default: 'center',
      matches: ['center', 'left', 'right'],
    },
    width: { type: String, default: 'auto' },
  },
};
