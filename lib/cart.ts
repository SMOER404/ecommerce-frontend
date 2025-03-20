import api from "./api"
import type { CartItem, CartSummary } from "@/types/cart"

export const getCart = async (): Promise<CartItem[]> => {
  const response = await api.get("/cart")
  return response.data
}

export const getCartSummary = async (): Promise<CartSummary> => {
  const response = await api.get("/cart/summary")
  return response.data
}

export const addToCart = async (productVariantId: string, quantity: number): Promise<CartItem> => {
  const response = await api.post("/cart", { productVariantId, quantity })
  return response.data
}

export const updateCartItem = async (itemId: string, quantity: number): Promise<CartItem> => {
  const response = await api.put(`/cart/${itemId}`, { quantity })
  return response.data
}

export const removeCartItem = async (itemId: string): Promise<void> => {
  await api.delete(`/cart/${itemId}`)
}

export const clearCart = async (): Promise<void> => {
  await api.delete("/cart")
}

