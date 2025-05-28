---
excludeFromSearch: true
seo:
  meta:
    - name: robots
      content: noindex
---

# Use legacy portal UI components

The "UI components" from the legacy [Portal](https://redocly.com/docs/developer-portal) product are supported in Redocly's new suite of products.
However, they should only be used to help with migration.
We recommend replacing them as soon as possible.

{% admonition type="warning" name="Warn" %}
  The legacy UI components are deprecated and _will not receive future updates_.
  Redocly's new products provide pre-built elements as [Markdoc tags](https://redocly.com/docs/learn-markdoc/tags/tag-library).
{% /admonition %}

## Install package

Install the @redocly/portal-legacy-ui package with your package manager:

_npm_

```bash
npm install --save @redocly/portal-legacy-ui
```

_yarn_

```bash
yarn add @redocly/portal-legacy-ui
```

_pnpm_

```bash
pnpm add @redocly/portal-legacy-ui
```

## Import components

At the top of a `.tsx` file, import the legacy components from the package:

```javascript
import { ThinTile, TileHeader, TileText, WideTile, Box, Flex, Jumbotron } from '@redocly/portal-legacy-ui';
```

You can use `.tsx` files in your project in two ways:
- [Creating a page with React](../../extend/how-to/create-react-page.md), for example: `example.page.tsx`.
- Creating a component to use in your theme or a [Markdoc tag](https://redocly.com/docs/learn-markdoc/tags/tag-library), for example `SomeComponent.tsx`.

Remember that legacy ui components _will not_ receive future improvements.
Where possible, we recommend factoring them out.

## Example - landing page

The following example shows a landing page built with legacy components from the `@redocly/portal-legacy-ui` package:

```javascript {% title="example.page.tsx" %}
import * as React from 'react';
import styled from 'styled-components';
import { ThinTile, TileHeader, TileText, WideTile, Box, Flex, Jumbotron } from '@redocly/portal-legacy-ui';
import { H1, H2 } from '@redocly/theme';

export const frontmatter = {
  header: {
    hide: true,
  },
  footer: {
    hide: true,
  }
};

export default function () {
  return (
    <PageWrapper>
      <HeroBanner>
        <H1>
          Example page header
        </H1>
        <HeroSubtext>
          with components from @redocly/portal-legacy-ui
        </HeroSubtext>
      </HeroBanner>

      <Features>
        <Flex justifyContent="center">
          <SectionHeader>Key Features</SectionHeader>
          <ThinTile>
            <TileHeader>Cows</TileHeader>
            <TileText>Spots, milk, and Mooooooooooo.</TileText>
          </ThinTile>
          <ThinTile>
            <TileHeader>Frogs</TileHeader>
            <TileText>Hops, long tongues, <br />and ribbit.</TileText>
          </ThinTile>
          <ThinTile>
            <TileHeader>Flamingos</TileHeader>
            <TileText>Pink, long neck, <br />stands on one leg.</TileText>
          </ThinTile>
        </Flex>
      </Features>

      <About justifyContent="center">
          <SectionHeader>About Us</SectionHeader>
          <Description>
            Visit our delightful farm of cool creatures, where cows roam, frogs leap, and flamingos dance. Our team is dedicated to crafting moo-velous solutions that make life as fun as a sunny day at the pond. We're ready to tackle new challenges with cutting-edge lily pad technology.
          </Description>
        <Flex justifyContent="center">
          <WideTile>
            <TileHeader>Address</TileHeader>
            <TileText>
              1234 Creature Farm<br />
              Seattle, WA 12345<br />
              United States
            </TileText>
          </WideTile>
            <WideTile>
              <TileHeader>Contact Information</TileHeader>
              <TileText>
                Email: CowsFrogsFlamingos@example.com<br />
                Phone: (123) 456-7890<br />
              </TileText>
            </WideTile>
          </Flex>
      </About>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 10px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`
export const About = styled(Box)`
  background-color: #f8f9fa;
  padding-top: 20px;
  margin: 0;
`
export const Features = styled(Box)`
  border: 1px dotted lightblue;
  padding-top: 20px;
`
export const SectionHeader = styled(H2)`
  width: 100%;
  text-align: center;
  margin-top: 0;
`

export const HeroBanner = styled(Jumbotron)`
    background-color: lightblue;
    padding-bottom: 98px;
`

export const HeroSubtext = styled.div`
  font-size: 26px;
  font-weight: 300;
  text-align: center;
  margin-top: 0;
`;
```

## Resources

- [Migrate from legacy Portal](../../get-started/migrate-from-legacy-portal.md) - provides instructions on migrating from the Portal product.
- [Learn Markdoc](https://redocly.com/docs/learn-markdoc/tags/tag-library) - learn how Markdoc is used in technical writing.
- [Create page with React](../../extend/how-to/create-react-page.md) - publish a page using React code instead of markup.
