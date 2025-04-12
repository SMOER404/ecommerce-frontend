import { getProducts, getProductById } from '@poizon-market/api-client';
import { Product } from '../model/types';

export const productApi = {
  async getProducts(): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    return getProducts();
  },

  async getProduct(id: string): Promise<Product> {
    return getProductById(id);
  },
};
