import * as axios from 'axios';

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    images?: string[];
    categoryId: string;
    brandId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    brand?: Brand;
}
interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}
interface Brand {
    id: string;
    name: string;
    description?: string;
    image?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
interface Order {
    id: string;
    userId: string;
    products: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}
interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}
declare const getProducts: (page?: number, limit?: number) => Promise<PaginatedResponse<Product>>;
declare const getProductById: (id: string) => Promise<Product>;
declare const getCategories: () => Promise<Category[]>;
declare const getCategoryById: (id: string) => Promise<Category>;
declare const getBrands: () => Promise<Brand[]>;
declare const getBrandById: (id: string) => Promise<Brand>;
declare const uploadBrandImage: (id: string, imageUrl: string) => Promise<Brand>;
declare const getOrders: (page?: number, limit?: number) => Promise<PaginatedResponse<Order>>;
declare const getOrderById: (id: string) => Promise<Order>;
declare const getUsers: (page?: number, limit?: number) => Promise<PaginatedResponse<User>>;
declare const getUserById: (id: string) => Promise<User>;

declare const API_BASE_URL: string;
declare const API_ENDPOINTS: {
    readonly products: `${string}/products`;
    readonly categories: `${string}/categories`;
    readonly brands: `${string}/brands`;
    readonly orders: `${string}/orders`;
    readonly users: `${string}/users`;
};

declare const apiClient: axios.AxiosInstance;

export { API_BASE_URL, API_ENDPOINTS, type Brand, type Category, type Order, type Product, type User, apiClient, getBrandById, getBrands, getCategories, getCategoryById, getOrderById, getOrders, getProductById, getProducts, getUserById, getUsers, uploadBrandImage };
