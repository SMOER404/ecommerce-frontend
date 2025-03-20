import apiClient from "../api-client"
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

class ProductService {
  async getProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>("/products", { params })
    return response.data
  }

  async getProduct(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<ProductsResponse>("/products", {
      params: {
        limit: 4,
        // Можно добавить параметр для получения только избранных продуктов
        // featured: true
      },
    })
    return response.data.data
  }
}

export const productService = new ProductService()

