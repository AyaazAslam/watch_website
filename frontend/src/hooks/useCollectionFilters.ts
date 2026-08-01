import { useSearchParams } from 'react-router-dom';
import type {
  CatalogProduct,
  CollectionFiltersState,
  ProductGender,
  SortOption,
} from '../types';
import {
  CATALOG_PRODUCTS,
  PRICE_BOUNDS as FALLBACK_BOUNDS,
  slugToBrand,
  brandToSlug,
} from '../data/products';

const SORT_OPTIONS: SortOption[] = [
  'featured',
  'price-asc',
  'price-desc',
  'name-asc',
  'newest',
];

const GENDER_OPTIONS: ProductGender[] = ['male', 'female'];

export type PriceBounds = { min: number; max: number };

export function getPriceBounds(products: CatalogProduct[]): PriceBounds {
  if (!products.length) return FALLBACK_BOUNDS;
  const prices = products.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? { min: Math.max(0, min - 100), max: max + 100 } : { min, max };
}

function sortProducts(products: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  const list = [...products];
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return list.reverse();
    default:
      return list;
  }
}

function parseFilters(
  searchParams: URLSearchParams,
  priceBounds: PriceBounds,
): CollectionFiltersState {
  const brandParam = searchParams.get('brand');
  const brands: string[] = [];
  if (brandParam) {
    brandParam.split(',').forEach((slug) => {
      const brand = slugToBrand(slug.trim());
      if (brand) brands.push(brand);
    });
  }

  const genderParam = searchParams.get('gender');
  const genders: ProductGender[] = [];
  if (genderParam) {
    genderParam.split(',').forEach((value) => {
      const g = value.trim().toLowerCase() as ProductGender;
      if (GENDER_OPTIONS.includes(g)) genders.push(g);
    });
  }

  const sortParam = searchParams.get('sort') as SortOption | null;
  const minParam = searchParams.get('min');
  const maxParam = searchParams.get('max');

  const minPrice = minParam ? Number(minParam) : priceBounds.min;
  const maxPrice = maxParam ? Number(maxParam) : priceBounds.max;

  return {
    brands,
    genders,
    minPrice: Number.isFinite(minPrice) ? minPrice : priceBounds.min,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : priceBounds.max,
    onSaleOnly: false,
    inStockOnly: false,
    sort:
      sortParam && SORT_OPTIONS.includes(sortParam) ? sortParam : 'featured',
    query: searchParams.get('q') ?? '',
  };
}

function filtersToParams(
  filters: CollectionFiltersState,
  priceBounds: PriceBounds,
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.brands.length) {
    params.set('brand', filters.brands.map(brandToSlug).join(','));
  }
  if (filters.genders.length) {
    params.set('gender', filters.genders.join(','));
  }
  if (filters.sort !== 'featured') params.set('sort', filters.sort);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.minPrice > priceBounds.min) params.set('min', String(filters.minPrice));
  if (filters.maxPrice < priceBounds.max) params.set('max', String(filters.maxPrice));

  return params;
}

function matchesQuery(product: CatalogProduct, query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = `${product.title} ${product.brand} ${product.handle}`.toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

function matchesGender(product: CatalogProduct, genders: ProductGender[]) {
  // Empty = All
  if (!genders.length) return true;
  const selected = genders[0];
  const gender = product.gender || 'male';
  if (selected === 'male') return gender === 'male' || gender === 'unisex';
  if (selected === 'female') return gender === 'female' || gender === 'unisex';
  return true;
}

export function useCollectionFilters(products: CatalogProduct[] = CATALOG_PRODUCTS) {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceBounds = getPriceBounds(products);
  const filters = parseFilters(searchParams, priceBounds);

  const updateFilters = (patch: Partial<CollectionFiltersState>) => {
    const next = { ...filters, ...patch };
    setSearchParams(filtersToParams(next, priceBounds), { replace: true });
  };

  const toggleBrand = (brand: string) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    setSearchParams(filtersToParams({ ...filters, brands }, priceBounds), {
      replace: true,
    });
  };

  const toggleGender = (gender: ProductGender | 'all') => {
    const genders = gender === 'all' ? [] : [gender];
    setSearchParams(filtersToParams({ ...filters, genders }, priceBounds), {
      replace: true,
    });
  };

  const resetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = sortProducts(
    products.filter((product) => {
      if (filters.brands.length && !filters.brands.includes(product.brand)) {
        return false;
      }
      if (!matchesGender(product, filters.genders)) {
        return false;
      }
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (!matchesQuery(product, filters.query)) {
        return false;
      }
      return true;
    }),
    filters.sort,
  );

  const activeFilterCount =
    filters.brands.length +
    filters.genders.length +
    (filters.minPrice > priceBounds.min || filters.maxPrice < priceBounds.max
      ? 1
      : 0) +
    (filters.query.trim() ? 1 : 0);

  return {
    filters,
    filteredProducts,
    updateFilters,
    toggleBrand,
    toggleGender,
    resetFilters,
    activeFilterCount,
    totalCount: products.length,
    priceBounds,
  };
}
