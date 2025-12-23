import * as React from 'react';
import styled from 'styled-components';
import { ProductPicker } from './ProductPicker';
import { Products, Plan } from '../utils/types';
import { PlanPicker } from './PlanPicker';
import { useUrlParams } from '../utils/useUrlParams';
import { Button } from '@redocly/theme/components/Button/Button';

export interface ConfigIntroductionProps {
  title?: string;
  description?: string;
  passedPlan?: Plan;
}

export function ConfigIntroduction({
  title = 'Filter configuration options',
  description = 'Choose your Redocly products and plan to see only the configuration options available to you. Select filters below to get started.',
  passedPlan,
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

  const shouldDisableClearFilters = !selectedPlan && selectedProducts.length === 0;

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectContainer>
          <SelectLabel>Products</SelectLabel>
          <ProductPicker value={selectedProducts} onProductChange={handleProductChange} />
        </SelectContainer>
        <SelectContainer>
          <SelectLabel>Plan</SelectLabel>
          <PlanPicker value={selectedPlan} onPlanChange={handlePlanChange} />
        </SelectContainer>
      </CardContent>
      <ClearFiltersButton
        variant="text"
        size="medium"
        onClick={handleClearFilters}
        disabled={shouldDisableClearFilters}
      >
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

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardTitle = styled.div`
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-lg);
  color: var(--text-color-primary);
`;

const CardDescription = styled.div`
  color: var(--text-color-secondary);
  line-height: var(--line-height-base);
  font-size: var(--font-size-base);
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const SelectLabel = styled.div`
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--text-color-secondary);
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const ClearFiltersButton = styled(Button)`
  width: fit-content;
`;
