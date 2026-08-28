import type { Schema } from '@markdoc/markdoc';

export const AiAssistantPlaygroundTag: Schema = {
  render: 'AiAssistantPlayground',
  selfClosing: true,
  attributes: {
    apiUrl: {
      type: String,
      required: false,
    },
  },
};
