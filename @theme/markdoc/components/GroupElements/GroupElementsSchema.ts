import { Schema } from '@markdoc/markdoc';

export const GroupElementsSchema: Schema & { tagName: string } = {
  render: 'GroupElements',
  attributes: {
    title: { type: String }
  },
  tagName: 'group-elements'
};
