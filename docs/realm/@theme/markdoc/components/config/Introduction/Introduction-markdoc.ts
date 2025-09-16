import type { Schema } from '@markdoc/markdoc';

export const ConfigIntroductionTag: Schema = {
  render: 'ConfigIntroduction',
  selfClosing: true,
  attributes: {
    title: {
      type: String,
      default: 'Filter configuration options'
    },
    description: {
      type: String,
      default: 'Choose your Redocly products and plan to see only the configuration options available to you. Select filters below to get started.'
    },
    passedPlan: {
      type: String,
      default: undefined
    }
  }
};
