import type { Schema } from '@markdoc/markdoc';
import { TagBadgeSchema } from './components/TagBadge/TagBadge-markdoc';
import {
  SplitViewSchema,
  LeftViewSchema,
  RightViewSchema,
} from './components/SplitView/SplitViewSchemas';
import { GroupElementsSchema } from './components/GroupElements/GroupElementsSchema';
import {
  tags as betaDocsTags,
  functions as betaDocsFunctions,
} from '../../docs/realm/@theme/markdoc/schema';

const docsOverview: Schema = {
  attributes: {
    info: { type: 'Object' },
  },
  render: 'DocsOverview',
};

const heroImage: Schema = {
  attributes: {
    src: { type: 'String' },
  },
  render: 'HeroImage',
};

const licensesTable: Schema = {
  attributes: {
    license: { type: 'String' },
  },
  render: 'LicensesTable',
};

const licensesPackageVersion: Schema = {
  attributes: {
    content: { type: 'Object' },
  },
  render: 'LicensesPackageVersion',
};

const wideTileCards: Schema = {
  attributes: {
    content: { type: 'Object' },
  },
  render: 'WideTileCards',
};

const quiz: Schema = {
  render: 'Quiz',
};

export const tags = {
  SplitViewSchema,
  LeftViewSchema,
  RightViewSchema,
  GroupElementsSchema,
  TagBadgeSchema,
  docsOverview,
  heroImage,
  licensesTable,
  licensesPackageVersion,
  wideTileCards,
  quiz,
  ...betaDocsTags,
};

export const functions = {
  ...betaDocsFunctions,
};
