import { Plan, Products } from './types';

export function getPlanFromSearchParams(searchParams: URLSearchParams): Plan | undefined {
  const planParam = searchParams.get('plan') as Plan;

  if (planParam && Object.values(Plan).includes(planParam)) {
    return planParam;
  }

  return undefined;
}

export function getProductsFromSearchParams(searchParams: URLSearchParams): Products[] {
  const productsParam = searchParams.get('products');

  if (productsParam) {
    try {
      return JSON.parse(decodeURIComponent(productsParam)) as Products[];
    } catch (error) {
      console.warn('Failed to parse products from URL:', error);
    }
  }

  return [];
}

export function createSearchParams(plan?: Plan, products?: Products[]): URLSearchParams {
  const params = new URLSearchParams();

  if (plan) {
    params.set('plan', plan);
  }

  if (products && products.length > 0) {
    params.set('products', encodeURIComponent(JSON.stringify(products)));
  }

  return params;
}

export function getPlanFromURL(): Plan | undefined {
  if (typeof window === 'undefined') return undefined;

  const urlParams = new URLSearchParams(window.location.search);
  return getPlanFromSearchParams(urlParams);
}

export function getProductsFromURL(): Products[] {
  if (typeof window === 'undefined') return [];

  const urlParams = new URLSearchParams(window.location.search);
  return getProductsFromSearchParams(urlParams);
}

export function updateURLParams(plan?: Plan, products?: Products[]): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const params = createSearchParams(plan, products);

  url.search = params.toString();
  window.history.replaceState({}, '', url.toString());
}

export const ORDERED_PLANS: Plan[] = [
  Plan.COMMUNITY,
  Plan.PRO,
  Plan.ENTERPRISE,
  Plan.ENTERPRISE_PLUS,
];
