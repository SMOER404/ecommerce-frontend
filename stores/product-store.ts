import { makeAutoObservable, runInAction } from 'mobx';
import api from '@/lib/axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  brandId: string;
  stock: number;
}

class ProductStore {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  isLoading = false;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  filters = {
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Получение списка продуктов
  async fetchProducts(page: number = 1) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get('/products', {
        params: {
          page,
          ...this.filters
        }
      });
      runInAction(() => {
        this.products = response.data.products;
        this.currentPage = response.data.currentPage;
        this.totalPages = response.data.totalPages;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке продуктов';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Получение популярных продуктов
  async fetchFeaturedProducts() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get('/products/featured');
      runInAction(() => {
        this.featuredProducts = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке популярных продуктов';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Получение продукта по ID
  async fetchProductById(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке продукта';
      });
      return null;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Установка фильтров
  setFilters(filters: Partial<typeof this.filters>) {
    this.filters = { ...this.filters, ...filters };
    this.fetchProducts(1);
  }

  // Сброс фильтров
  resetFilters() {
    this.filters = {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      search: ''
    };
    this.fetchProducts(1);
  }
}

export const productStore = new ProductStore(); 