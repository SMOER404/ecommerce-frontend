import { makeAutoObservable } from 'mobx';
import { Product, ProductFilters, ProductSort } from './types';
import { productApi } from '../api/productApi';

class ProductStore {
  products: Product[] = [];
  loading = false;
  error: string | null = null;
  filters: ProductFilters = {
    search: '',
    minPrice: 0,
    maxPrice: Infinity,
    category: '',
  };
  sort: ProductSort = {
    field: 'name',
    direction: 'asc',
  };
  total = 0;
  page = 1;
  limit = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setFilters(filters: ProductFilters) {
    this.filters = filters;
  }

  setSort(sort: ProductSort) {
    this.sort = sort;
  }

  setPagination(total: number, page: number, limit: number) {
    this.total = total;
    this.page = page;
    this.limit = limit;
  }

  async fetchProducts() {
    try {
      this.setLoading(true);
      this.setError(null);
      const response = await productApi.getProducts();
      this.setProducts(response.data);
      this.setPagination(response.total, response.page, response.limit);
    } catch (error) {
      this.setError(
        error instanceof Error ? error.message : 'Произошла ошибка при загрузке продуктов',
      );
    } finally {
      this.setLoading(false);
    }
  }

  get filteredAndSortedProducts() {
    let result = [...this.products];

    if (this.filters.search) {
      const searchLower = this.filters.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower),
      );
    }

    if (this.filters.category) {
      result = result.filter((product) => product.categoryId === this.filters.category);
    }

    result = result.filter(
      (product) => product.price >= this.filters.minPrice && product.price <= this.filters.maxPrice,
    );

    result.sort((a, b) => {
      const aValue = a[this.sort.field];
      const bValue = b[this.sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return this.sort.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return result;
  }
}

export const productStore = new ProductStore();
