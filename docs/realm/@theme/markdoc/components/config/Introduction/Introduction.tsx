import * as React from 'react';
import styled from 'styled-components';
import { ProductPicker } from './ProductPicker';
import { Products, Plan } from '../utils/types';
import { PlanPicker } from './PlanPicker';
import { useUrlParams } from '../utils/useUrlParams';

export interface ConfigIntroductionProps {
  title?: string;
  description?: string;
  passedPlan?: Plan;
}

export function ConfigIntroduction({
  title = 'Filter configuration options',
  description = 'Choose your Redocly products and plan to see only the configuration options available to you. Select filters below to get started.',
  passedPlan
}: ConfigIntroductionProps): React.ReactElement {
  const { currentPlan, currentProducts, updateBoth, clearAll } = useUrlParams();
  
  const selectedPlan = currentPlan || passedPlan;
  const selectedProducts = currentProducts;

  const handleProductChange = (products: Products | Products[]): void => {
    const productArray = Array.isArray(products) ? products : [products];
    updateBoth(selectedPlan, productArray);
  };

  const handlePlanChange = (plan: Plan): void => {
    updateBoth(plan, selectedProducts);
  };

  const handleClearFilters = (): void => {
    clearAll();
  };

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardContent>
        <SelectContainer>
          <SelectLabel>Products</SelectLabel>
          <ProductPicker 
            value={selectedProducts}
            onProductChange={handleProductChange} 
          />
        </SelectContainer>
        <SelectContainer>
          <SelectLabel>Plan</SelectLabel>
          <PlanPicker 
            value={selectedPlan}
            onPlanChange={handlePlanChange} 
          />
        </SelectContainer>
      </CardContent>
      <ClearFiltersButton onClick={handleClearFilters}>
        Clear Filters
      </ClearFiltersButton>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: var(--layer-color);
  border: 1px solid var(--border-color-secondary);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const CardDescription = styled.div`
  color: var(--text-color-secondary, #3b3c45);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const SelectLabel = styled.div`
  font-weight: 500;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const ClearFiltersButton = styled.button`
  background: none;
  border-radius: 6px;
  padding: 8px 16px;
  color: var(--text-color-secondary, #6b7280);
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--bg-color-hover, #f9fafb);
    color: var(--text-color-primary, #374151);
    border-color: var(--border-color-secondary, #9ca3af);
  }

  &:active {
    background-color: var(--bg-color-active, #f3f4f6);
  }
`;
