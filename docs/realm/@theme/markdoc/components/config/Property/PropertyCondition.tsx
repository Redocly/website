import * as React from 'react';
import styled from 'styled-components';
import { Plan, Products } from '../utils/types';
import LogosIcons from '../utils/LogosIcons';
import { useUrlParams } from '../utils/useUrlParams';
import { ArrowUpRightIcon } from '@redocly/theme';
import { Tooltip } from '@redocly/theme/components/Tooltip/Tooltip';

import Badge from '../utils/Badge';

interface PropertyConditionProps {
  plans: Plan[];
  products: Products[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const MoreBadge = styled(Badge)`
  border-color: var(--border-color-secondary);
  cursor: help;
`;

const UpgradeBadge = styled(Badge)`
  border-color: var(--border-color-secondary);
  background-color: var(--button-bg-color-secondary);
  cursor: help;
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    display: block;
  }
`;

type UseCurrentContextResult = {
  currentPlan: Plan | undefined;
  currentProducts: Products[];
};

const useCurrentContext = (): UseCurrentContextResult => {
  const { currentPlan, currentProducts } = useUrlParams();

  return { currentPlan, currentProducts };
};

type ComputedVisibility = {
  allItems: Array<Plan | Products>;
  visibleItems: Array<Plan | Products>;
  remainingCount: number;
  showUpgradeBadge: boolean;
};

const MAX_VISIBLE_ITEMS = 3;

const computeVisibility = (
  plans: Plan[],
  products: Products[],
  currentPlan: Plan | undefined,
  currentProducts: Products[],
): ComputedVisibility => {
  const plansProvided: boolean = Array.isArray(plans) && plans.length > 0;
  const productsProvided: boolean = Array.isArray(products) && products.length > 0;

  const hasCurrentPlan: boolean = typeof currentPlan !== 'undefined' && currentPlan !== null;
  const hasCurrentProducts: boolean = Array.isArray(currentProducts) && currentProducts.length > 0;

  // Upgrade logic
  const isPlanMismatched: boolean =
    hasCurrentPlan && plansProvided && !plans.includes(currentPlan as Plan);
  const doProductsOverlap: boolean =
    productsProvided && hasCurrentProducts
      ? currentProducts.some((selected) => products.includes(selected))
      : false;
  const isProductsMismatched: boolean =
    productsProvided && hasCurrentProducts && !doProductsOverlap;

  const showUpgradeBadge: boolean = isPlanMismatched || isProductsMismatched;

  // Badge display logic: only show descriptive badges when the user hasn't filtered/selected
  const shouldShowProductBadges: boolean =
    !hasCurrentProducts && productsProvided && !showUpgradeBadge;
  const shouldShowPlanBadges: boolean = !hasCurrentPlan && plansProvided && !showUpgradeBadge;

  const allItems: Array<Plan | Products> = [
    ...(shouldShowProductBadges ? products : []),
    ...(shouldShowPlanBadges ? plans : []),
  ];

  const visibleItems: Array<Plan | Products> = allItems.slice(0, MAX_VISIBLE_ITEMS);
  const remainingCount: number = Math.max(0, allItems.length - MAX_VISIBLE_ITEMS);

  return { allItems, visibleItems, remainingCount, showUpgradeBadge };
};

const isProductsEnumValue = (value: Plan | Products): value is Products => {
  return Object.values(Products).includes(value as Products);
};

const PropertyCondition = ({
  plans = [],
  products = [],
}: PropertyConditionProps): React.ReactElement => {
  const { currentPlan, currentProducts } = useCurrentContext();

  const { allItems, visibleItems, remainingCount, showUpgradeBadge } =
    React.useMemo<ComputedVisibility>(
      (): ComputedVisibility => computeVisibility(plans, products, currentPlan, currentProducts),
      [plans, products, currentPlan, currentProducts],
    );

  return (
    <Container>
      {visibleItems.map((item) => (
        <Badge key={`${isProductsEnumValue(item) ? 'product' : 'plan'}-${String(item)}`}>
          {isProductsEnumValue(item) && <LogosIcons product={item} size={14} />}
          {item}
        </Badge>
      ))}
      {showUpgradeBadge && (
        <Tooltip
          tip={'This configuration is available for different products or higher plans.'}
          children={
            <UpgradeBadge>
              Upgrade
              <ArrowUpRightIcon size={'14px'} />
            </UpgradeBadge>
          }
        />
      )}
      {remainingCount > 0 && (
        <Tooltip
          tip={allItems.join(', ')}
          children={<MoreBadge>+{remainingCount} more</MoreBadge>}
        />
      )}
    </Container>
  );
};

export default PropertyCondition;
