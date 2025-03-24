import axios from "axios";
import { API_BASE_URL } from "./config";
import type { Product, Category, Brand, Order, User } from "./types";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products
export const getProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

// Categories
export const getCategories = async () => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await api.get<Category>(`/categories/${id}`);
  return data;
};

// Brands
export const getBrands = async () => {
  const { data } = await api.get<Brand[]>("/brands");
  return data;
};

export const getBrandById = async (id: string) => {
  const { data } = await api.get<Brand>(`/brands/${id}`);
  return data;
};

// Orders
export const getOrders = async () => {
  const { data } = await api.get<Order[]>("/orders");
  return data;
};

export const getOrderById = async (id: string) => {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
};

// Users
export const getUsers = async () => {
  const { data } = await api.get<User[]>("/users");
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}; 