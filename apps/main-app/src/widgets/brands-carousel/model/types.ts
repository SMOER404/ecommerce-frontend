import type { Brand } from '@poizon-market/api-client';

export interface BrandsState {
  brands: Brand[];
  isLoading: boolean;
  error: string | null;
} 