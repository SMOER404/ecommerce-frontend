import { Product as ApiProduct } from '@poizon-market/api-client';

export type Product = ApiProduct;

export interface ProductFilters {
  search: string;
  minPrice: number;
  maxPrice: number;
  category: string;
}

export interface ProductSort {
  field: keyof Product;
  direction: 'asc' | 'desc';
}
