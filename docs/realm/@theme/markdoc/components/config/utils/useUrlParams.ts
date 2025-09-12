import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Plan, Products } from './types';
import { 
  getPlanFromSearchParams, 
  getProductsFromSearchParams, 
  createSearchParams 
} from './urlUtils';

export interface UseUrlParamsResult {
  currentPlan: Plan | undefined;
  currentProducts: Products[];
  updatePlan: (plan: Plan | undefined) => void;
  updateProducts: (products: Products[]) => void;
  updateBoth: (plan: Plan | undefined, products: Products[]) => void;
  clearAll: () => void;
}

export function useUrlParams(): UseUrlParamsResult {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPlan = getPlanFromSearchParams(searchParams);
  const currentProducts = getProductsFromSearchParams(searchParams);

  const updatePlan = useCallback((plan: Plan | undefined): void => {
    const newParams = createSearchParams(plan, currentProducts);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [navigate, currentProducts]);

  const updateProducts = useCallback((products: Products[]): void => {
    const newParams = createSearchParams(currentPlan, products);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [navigate, currentPlan]);

  const updateBoth = useCallback((plan: Plan | undefined, products: Products[]): void => {
    const newParams = createSearchParams(plan, products);
    navigate({ search: newParams.toString() }, { replace: true });
  }, [navigate]);

  const clearAll = useCallback((): void => {
    navigate({ search: '' }, { replace: true });
  }, [navigate]);

  return {
    currentPlan,
    currentProducts,
    updatePlan,
    updateProducts,
    updateBoth,
    clearAll,
  };
}
