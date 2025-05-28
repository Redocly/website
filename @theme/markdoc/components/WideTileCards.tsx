import styled from 'styled-components';
import * as React from 'react';

import { Link } from '@redocly/theme/components/Link/Link';

export function WideTileCards({ content }) {
  return (
    <Wrapper>
      {content.cards.map((card) => {
        return (
          <LinkCard to={card.link} key={card.header}>
            <TextWrapper>
              <Title>{card.header}</Title>
              <Text>{card.text}</Text>
            </TextWrapper>
            <Image src={require('./images/arrow.png')} />
          </LinkCard>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const LinkCard = styled(Link)`
  display: flex;
  text-decoration: none!important;

  background-color: var(--layer-color);
  border: 1px solid var(--border-color-secondary);

  padding: 40px 20px;
  border-radius: 10px;
  align-items: center;

  &:hover {
    border: 1px solid var(--border-color-primary);
  }
`;

const TextWrapper = styled.div`
  padding: 0 20px;
  font-family: var(--font-family);
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;

const Title = styled.p`
  font-size: var(--font-size-h4-sm);
  font-weight: 600;
  color: var(--color-text-dimmed);
`;

const Text = styled.p`
  font-size: var(--font-size-small-lg);
  color: var(--color-text-dimmed);
`;
