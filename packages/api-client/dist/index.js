'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

// src/index.ts

// src/config.ts
var API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : "http://localhost:3001/api";
var API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/categories`,
  brands: `${API_BASE_URL}/brands`,
  orders: `${API_BASE_URL}/orders`,
  users: `${API_BASE_URL}/users`
};

// src/api.ts
var getProducts = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get(API_ENDPOINTS.products, {
    params: { page, limit }
  });
  return data;
};
var getProductById = async (id) => {
  const { data } = await apiClient.get(`${API_ENDPOINTS.products}/${id}`);
  return data;
};
var getCategories = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.categories);
  return data;
};
var getCategoryById = async (id) => {
  const { data } = await apiClient.get(`${API_ENDPOINTS.categories}/${id}`);
  return data;
};
var getBrands = async () => {
  const { data } = await apiClient.get(API_ENDPOINTS.brands);
  return data.data;
};
var getBrandById = async (id) => {
  const { data } = await apiClient.get(`${API_ENDPOINTS.brands}/${id}`);
  return data;
};
var uploadBrandImage = async (id, imageUrl) => {
  const { data } = await apiClient.put(`${API_ENDPOINTS.brands}/${id}/image`, {
    imageUrl
  });
  return data;
};
var getOrders = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get(API_ENDPOINTS.orders, {
    params: { page, limit }
  });
  return data;
};
var getOrderById = async (id) => {
  const { data } = await apiClient.get(`${API_ENDPOINTS.orders}/${id}`);
  return data;
};
var getUsers = async (page = 1, limit = 10) => {
  const { data } = await apiClient.get(API_ENDPOINTS.users, {
    params: { page, limit }
  });
  return data;
};
var getUserById = async (id) => {
  const { data } = await apiClient.get(`${API_ENDPOINTS.users}/${id}`);
  return data;
};

// src/index.ts
var apiClient = axios__default.default.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

exports.API_BASE_URL = API_BASE_URL;
exports.API_ENDPOINTS = API_ENDPOINTS;
exports.apiClient = apiClient;
exports.getBrandById = getBrandById;
exports.getBrands = getBrands;
exports.getCategories = getCategories;
exports.getCategoryById = getCategoryById;
exports.getOrderById = getOrderById;
exports.getOrders = getOrders;
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.uploadBrandImage = uploadBrandImage;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map