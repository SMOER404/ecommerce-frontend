import { makeAutoObservable, runInAction } from 'mobx';
import api from '@/lib/axios';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

class CartStore {
  items: CartItem[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Получение корзины
  async fetchCart() {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.get('/cart');
      runInAction(() => {
        this.items = response.data.items;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке корзины';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Добавление товара в корзину
  async addToCart(productId: string, quantity: number = 1) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.post('/cart/items', {
        productId,
        quantity,
      });
      runInAction(() => {
        this.items = response.data.items;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при добавлении товара в корзину';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Удаление товара из корзины
  async removeFromCart(productId: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.delete(`/cart/items/${productId}`);
      runInAction(() => {
        this.items = response.data.items;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при удалении товара из корзины';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Обновление количества товара
  async updateQuantity(productId: string, quantity: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await api.put(`/cart/items/${productId}`, {
        quantity,
      });
      runInAction(() => {
        this.items = response.data.items;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка при обновлении количества товара';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  // Вычисляемые свойства
  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export const cartStore = new CartStore(); 