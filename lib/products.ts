import api from "./api"
import type { Product } from "@/types/product"

export interface ProductsResponse {
  data: Product[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  categoryId?: string
  brandId?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export const getProducts = async (params: ProductQueryParams = {}): Promise<ProductsResponse> => {
  const response = await api.get("/products", { params })
  return response.data
}

export const getProduct = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  // This could be a special endpoint or just a filtered version of getProducts
  const response = await api.get("/products", {
    params: {
      limit: 4,
      // You might have a featured flag in your API
      // featured: true
    },
  })
  return response.data.data
}

