import { Schema } from '@markdoc/markdoc';

export const SplitViewSchema: Schema & { tagName: string } = {
  render: 'SplitView',
  children: ['LeftView', 'RightView', 'tag'],
  attributes: {
    leftColWidth: { type: String },
    rightColWidth: { type: String }
  },
  tagName: 'split-view'
};

export const LeftViewSchema: Schema & { tagName: string } = {
  render: 'LeftView',
  attributes: {
    title: { type: String },
    width: { type: String }
  },
  tagName: 'left-view'
};

export const RightViewSchema: Schema & { tagName: string } = {
  render: 'RightView',
  attributes: {
    title: { type: String },
    width: { type: String }
  },
  tagName: 'right-view'
};
