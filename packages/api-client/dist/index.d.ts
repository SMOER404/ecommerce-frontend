interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    stock: number;
    rating: number;
    reviews: number;
    createdAt: string;
    updatedAt: string;
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
    description: string;
    image: string;
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
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}
interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
}

declare const getProducts: () => Promise<Product[]>;
declare const getProductById: (id: string) => Promise<Product>;
declare const getCategories: () => Promise<Category[]>;
declare const getCategoryById: (id: string) => Promise<Category>;
declare const getBrands: () => Promise<Brand[]>;
declare const getBrandById: (id: string) => Promise<Brand>;
declare const getOrders: () => Promise<Order[]>;
declare const getOrderById: (id: string) => Promise<Order>;
declare const getUsers: () => Promise<User[]>;
declare const getUserById: (id: string) => Promise<User>;

declare const API_BASE_URL: string;
declare const API_ENDPOINTS: {
    readonly products: `${string}/products`;
    readonly categories: `${string}/categories`;
    readonly brands: `${string}/brands`;
    readonly orders: `${string}/orders`;
    readonly users: `${string}/users`;
};

export { API_BASE_URL, API_ENDPOINTS, type Brand, type Category, type Order, type Product, type User, getBrandById, getBrands, getCategories, getCategoryById, getOrderById, getOrders, getProductById, getProducts, getUserById, getUsers };
