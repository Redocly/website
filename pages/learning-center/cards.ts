import openApiThumbnail from './images/open-api-thumbnail.svg';
import markdocThumbnail from './images/markdoc-thumbnail.svg';
import yamlThumbnail from './images/yaml-thumbnail.svg';
import apiTestingThumbnail from './images/api-testing-thumbnail.svg';
import arazzoThumbnail from './images/arazzo-thumbnail.svg';

export const cards = [
  {
    id: 1,
    key: 'open-api',
    title: 'OpenAPI',
    description: 'Resources for learning more about OpenAPI and how to use it.',
    thumbnail: openApiThumbnail,
    moreItems: '40 more topics',
    landingPage: '/learn/openapi/learning-openapi',
    items: [
      { title: 'What is OpenAPI?', link: '/learn/openapi/learning-openapi' },
      { title: 'OpenAPI best practices', link: '/learn/openapi/openapi-decisions' },
      { title: '$ref guide', link: '/learn/openapi/ref-guide' },
      { title: 'Discriminator', link: '/learn/openapi/discriminator' },
    ],
  },
  {
    id: 2,
    key: 'arazzo',
    title: 'Arazzo',
    description:
      'Learn how to use Arazzo to describe practical API workflows.',
    thumbnail: arazzoThumbnail,
    moreItems: '4 more topics',
    landingPage: '/learn/arazzo/what-is-arazzo',
    items: [
      { title: 'What is Arazzo?', link: '/learn/arazzo/what-is-arazzo' },
      { title: 'Getting Started with Arazzo', link: '/learn/arazzo/why-arazzo-matters' },
      { title: 'Arazzo walkthrough', link: '/learn/arazzo/arazzo-walkthrough' },
      { title: 'Best Practices for Arazzo Integration', link: '/learn/arazzo/arazzo-basics' },
    ],
  },
  {
    id: 3,
    key: 'markdoc',
    title: 'Markdoc',
    description: 'Next-generation markup resources and detailed tag library.',
    thumbnail: markdocThumbnail,
    moreItems: '11 more topics',
    landingPage: '/learn/markdoc',
    items: [
      { title: 'What is Markdoc?', link: '/learn/markdoc' },
      { title: 'Getting started with Markdoc', link: '/learn/markdoc/write-with-markdoc' },
      { title: 'Markdoc benefits', link: '/learn/markdoc/evaluating-markdoc' },
      { title: 'Table tag', link: '/learn/markdoc/tags/table' },
    ],
  },
  {
    id: 4,
    key: 'yaml',
    title: 'YAML',
    description: 'Learn how to use YAML in your API documentation and configuration.',
    thumbnail: yamlThumbnail,
    moreItems: '4 more topics',
    landingPage: '/learn/yaml',
    items: [
      { title: 'What is YAML?', link: '/learn/yaml' },
      { title: 'The basics of YAML', link: '/learn/yaml/scalars' },
      { title: 'YAML or JSON', link: '/learn/yaml/yaml-or-json' },
      { title: 'Troubleshooting YAML', link: '/learn/yaml/troubleshooting' },
    ],
  },
  // {
  //   id: 5,
  //   key: 'api-governance',
  //   title: 'API governance',
  //   description: 'Use our interactive tool to build linting rules for your API.',
  //   thumbnail: apiGovernanceThumbnail,
  //   moreItems: ' more topics',
  //   landingPage: '/',
  //   items: [
  //     { title: 'What is API governance?', link: '' },
  //     { title: 'Setting Up Linting Rules', link: '' },
  //     { title: 'Customizing API Guidelines ', link: '' },
  //     { title: 'Best Practices for API Standards', link: '' },
  //   ],
  // },
  {
    id: 5,
    key: 'api-testing',
    title: 'API Testing',
    description:
      'Master API testing fundamentals with tools, techniques, and best practices.',
    thumbnail: apiTestingThumbnail,
    moreItems: '1 more topic',
    landingPage: '/learn/testing',
    items: [
      { title: 'Contract Testing 101', link: '/learn/testing/contract-testing-101' },
      { title: 'Tools for API Testing in 2025', link: '/learn/testing/tools-for-api-testing-in-2025' },
    ],
  },
  // {
  //   id: 7,
  //   key: 'api-security',
  //   title: 'API Security',
  //   description:
  //     'Gain insights into securing your APIs with essential resources, tools, and best practices to protect your applications.',
  //   thumbnail: apiSecurityThumbnail,
  //   moreItems: ' more topics',
  //   landingPage: '/',
  //   items: [
  //     { title: 'Introduction to API Security', link: '' },
  //     { title: 'Common API Vulnerabilities', link: '' },
  //     { title: 'Implementing Authentication and Authorization examples', link: '' },
  //     { title: 'Best Practices for Securing APIs', link: '' },
  //   ],
  // },
  // {
  //   id: 8,
  //   key: 'graphql',
  //   title: 'GraphQL',
  //   description:
  //     'Explore resources to deepen your understanding of GraphQL, from the basics to advanced queries and best practices.',
  //   thumbnail: graphqlThumbnail,
  //   moreItems: ' more topics',
  //   landingPage: '/',
  //   items: [
  //     { title: 'What is GraphQL?', link: '' },
  //     { title: 'Getting Started with GraphQL', link: '' },
  //     { title: 'Advanced GraphQL Queries', link: '' },
  //     { title: 'Best Practices for API Integration', link: '' },
  //   ],
  // },

];