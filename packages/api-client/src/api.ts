import { apiClient } from './index';
import type { Product, Category, Brand, Order, User } from './types';
import { API_ENDPOINTS } from './config';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Products
export const getProducts = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get<PaginatedResponse<Product>>(API_ENDPOINTS.products, {
    params: { page, limit },
  });
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await apiClient.get<Product>(`${API_ENDPOINTS.products}/${id}`);
  return data;
};

// Categories
export const getCategories = async () => {
  const { data } = await apiClient.get<Category[]>(API_ENDPOINTS.categories);
  return data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await apiClient.get<Category>(`${API_ENDPOINTS.categories}/${id}`);
  return data;
};

// Brands
export const getBrands = async () => {
  const { data } = await apiClient.get<PaginatedResponse<Brand>>(API_ENDPOINTS.brands);
  return data.data;
};

export const getBrandById = async (id: string) => {
  const { data } = await apiClient.get<Brand>(`${API_ENDPOINTS.brands}/${id}`);
  return data;
};

export const uploadBrandImage = async (id: string, imageUrl: string) => {
  const { data } = await apiClient.put<Brand>(`${API_ENDPOINTS.brands}/${id}/image`, {
    imageUrl,
  });
  return data;
};

// Orders
export const getOrders = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get<PaginatedResponse<Order>>(API_ENDPOINTS.orders, {
    params: { page, limit },
  });
  return data;
};

export const getOrderById = async (id: string) => {
  const { data } = await apiClient.get<Order>(`${API_ENDPOINTS.orders}/${id}`);
  return data;
};

// Users
export const getUsers = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get<PaginatedResponse<User>>(API_ENDPOINTS.users, {
    params: { page, limit },
  });
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await apiClient.get<User>(`${API_ENDPOINTS.users}/${id}`);
  return data;
};
