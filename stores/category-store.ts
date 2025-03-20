import { makeAutoObservable, runInAction } from 'mobx';
import api from '@/lib/axios';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

class CategoryStore {
  categories: Category[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Получение всех категорий
  async fetchCategories() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get('/categories');
      runInAction(() => {
        this.categories = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке категорий';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Получение категории по ID
  async fetchCategoryById(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке категории';
      });
      return null;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Получение подкатегорий
  getSubcategories(parentId: string) {
    return this.categories.filter(category => category.parentId === parentId);
  }

  // Получение корневых категорий
  getRootCategories() {
    return this.categories.filter(category => !category.parentId);
  }
}

export const categoryStore = new CategoryStore(); 