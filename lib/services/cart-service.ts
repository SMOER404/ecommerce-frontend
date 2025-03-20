import apiClient from "../api-client"
import type { CartItem, CartSummary } from "@/types/cart"

class CartService {
  async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get<CartItem[]>("/cart")
    return response.data
  }

  async getCartSummary(): Promise<CartSummary> {
    const response = await apiClient.get<CartSummary>("/cart/summary")
    return response.data
  }

  async addToCart(productVariantId: string, quantity: number): Promise<CartItem> {
    const response = await apiClient.post<CartItem>("/cart", { productVariantId, quantity })
    return response.data
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    const response = await apiClient.put<CartItem>(`/cart/${itemId}`, { quantity })
    return response.data
  }

  async removeCartItem(itemId: string): Promise<void> {
    await apiClient.delete(`/cart/${itemId}`)
  }

  async clearCart(): Promise<void> {
    await apiClient.delete("/cart")
  }
}

export const cartService = new CartService()

