import { getProducts, getProductById } from '@poizon-market/api-client';
import { Product } from '../model/types';

export const productApi = {
  async getProducts(): Promise<Product[]> {
    return getProducts();
  },

  async getProduct(id: string): Promise<Product> {
    return getProductById(id);
  }
}; 