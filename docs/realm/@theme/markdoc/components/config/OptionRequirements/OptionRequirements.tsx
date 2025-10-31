import * as React from 'react';
import styled from 'styled-components';
import { Products, Plan } from '../utils/types';
import LogosIcons from '../utils/LogosIcons';
import Badge from '../utils/Badge';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--layer-color);
  border: 1px solid var(--border-color-secondary);
  border-radius: var(--border-radius-lg);
  padding: 8px 16px;
  margin-bottom: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  line-height: var(--line-height-base);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  box-sizing: border-box;
  color: var(--text-color-secondary);
`;

export interface OptionRequirementsProps {
  products?: Products[];
  plans?: Plan[];
}

const ConfigOptionRequirements = ({ products = [], plans = [] }: OptionRequirementsProps): React.ReactElement => {
  const renderProducts = Array.isArray(products) && products.length > 0;
  const renderPlans = Array.isArray(plans) && plans.length > 0;

  if (!renderProducts && !renderPlans) {
    return <Container />;
  }

  return (
    <Container>
      {renderProducts && (
        <Row>
          <Label>Products:</Label>
          {products.map((p) => (
            <Badge key={`product-${p}`}>
              <LogosIcons product={p} size={14} />
              {p}
            </Badge>
          ))}
        </Row>
      )}
      {renderPlans && (
        <Row>
          <Label>Plans:</Label>
          {plans.map((pl) => (
            <Badge key={`plan-${pl}`}>{pl}</Badge>
          ))}
        </Row>
      )}
    </Container>
  );
};

export { ConfigOptionRequirements };