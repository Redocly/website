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
  border-radius: 8px;
  margin: 0 0 16px 0;
  padding: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Label = styled.span`
  margin: 0;
  padding: 0;
  display: inline-flex;
  align-items: center;
  height: 24px;
  line-height: 24px;
  font-weight: 500;
  box-sizing: border-box;
  background: transparent;
  color: var(--text-color-secondary, #3b3c45);
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