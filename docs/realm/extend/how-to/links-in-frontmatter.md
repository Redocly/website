---
rbac:
  redocly.owners: read
  redocly.members: read
  Employee: read
---
# Links in front matter

There might be situations when you need to display a link or a list of links to other pages or display an image inside a [custom markdoc tag](https://markdoc.io/docs/tags).
In this case you can use front matter.

## How to specify links in front matter

By default you can specify your configuration under `links` section.

**Example**:

```
---
title: Markdown page with front matter links
links:
  - group: Solutions
    items:
      - label: Set up your infrastructure for hybrid work
        page: ./solutions/hybrid-infrastructure.md
      - label: Set up secure collaboration
        page: ./solutions/secure-collaboration.md
      - label: Deploy threat protection
        page: ./solutions/threat-protection.md
  - group: Architecture
    items:
      - label: Infographics for your users
        page: ./architecture/infographics.md
      - label: Architecture templates
        page: ./architecture/templates.md
  - group: Resources
    items:
      - label: Courses
        href: https://youtube.com
      - label: Other Resources
        href: https://google.com
---
```

If you need to get a path to a static file e.g. some image/icon you can specify a relative path to it under `image` property in front matter:

**Example**:

```
---
title: Markdown page with front matter links
image: ./path/to/image.png
---
```

## Custom front matter keys

By default values under `image` and `links` properties are resolved.
It is possible to override those keys by providing a new list inside `markdown.frontMatterKeysToResolve` property in `redocly.yaml`

**Example**:

```
markdown:
  frontMatterKeysToResolve:
    - pageLinks
    - banner-image
    - card-icon
```

## Display resolved front matter links on the page

Everything that is specified in front matter is accessible via `$frontmatter` [variable](https://markdoc.io/docs/variables) that you may pass to a custom markdoc tag.

## Example of front matter links in `.md` page

**my-page.md**

```{% process=false %}
---
title: Markdown page with front matter links
links:
  solutions:
    image: ./images/solutions.png
    items:
      - label: Set up your infrastructure for hybrid work
        page: ./solutions/hybrid-infrastructure.md
      - label: Set up secure collaboration
        page: ./solutions/secure-collaboration.md
      - label: Deploy threat protection
        page: ./solutions/threat-protection.md
  architecture:
    image: ./images/architecture.png
    items:
      - label: Infographics for your users
        page: ./architecture/infographics.md
      - label: Architecture templates
        page: ./architecture/templates.md
  resources:
    image: ./images/resources.png
    items:
      - label: Courses
        href: https://youtube.com
      - label: Bootcamp
        href: https://basecamp.com
---

```


## Example of front matter links in `*.page.tsx` page

**my-page.page.tsx**
<!-- TODO: Card component was removed. Examples need updates or the entire page needs to be reconsidered. -->
```tsx
import React from 'react';
import styled from 'styled-components';
import { CardsBlock } from '@redocly/theme/components/Cards/CardsBlock';
import { Card } from '@redocly/theme/components/Cards/Card';
import { H1 } from '@redocly/theme/components/Typography/H1';
export const frontmatter = {
  seo: {
    title: 'Tsx page with front matter links',
  },
  links: [
    {
      group: 'Solutions',
      items: [
        {
          label: 'Set up your infrastructure for hybrid work',
          page: './solutions/hybrid-infrastructure.md',
        },
        {
          label: 'Set up secure collaboration',
          page: './solutions/secure-collaboration.md',
        },
        {
          label: 'Deploy threat protection',
          page: './solutions/threat-protection.md',
        },
      ],
    },
    {
      group: 'Architecture',
      items: [
        {
          label: 'Infographics for your users',
          page: './architecture/infographics.md',
        },
        {
          label: 'Architecture templates',
          page: './architecture/templates.md',
        },
      ],
    },
    {
      group: 'Resources',
      items: [
        {
          label: 'Courses',
          href: 'https://youtube.com',
        },
        {
          label: 'Bootcamp',
          href: 'https://basecamp.com',
        },
      ],
    },
  ],
};
export default function ({ pageProps }) {
  return (
    <Wrapper>
      <H1>Frontmatter links in tsx page</H1>
      <CardsBlock>
        {pageProps.frontmatter.links.map((card) => {
          return <Card key={card.label} links={card} title={card.label} />;
        })}
      </CardsBlock>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 40px;
`;
```
