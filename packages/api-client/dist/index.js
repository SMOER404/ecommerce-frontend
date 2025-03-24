'use strict';

var axios = require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

// src/api.ts

// src/config.ts
var API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
var API_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/categories`,
  brands: `${API_BASE_URL}/brands`,
  orders: `${API_BASE_URL}/orders`,
  users: `${API_BASE_URL}/users`
};

// src/api.ts
var api = axios__default.default.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});
var getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};
var getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
var getCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};
var getCategoryById = async (id) => {
  const { data } = await api.get(`/categories/${id}`);
  return data;
};
var getBrands = async () => {
  const { data } = await api.get("/brands");
  return data;
};
var getBrandById = async (id) => {
  const { data } = await api.get(`/brands/${id}`);
  return data;
};
var getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};
var getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};
var getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
var getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

exports.API_BASE_URL = API_BASE_URL;
exports.API_ENDPOINTS = API_ENDPOINTS;
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
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map