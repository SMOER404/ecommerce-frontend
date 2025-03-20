import api from "./api"
import type { Order } from "@/types/order"

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders")
  return response.data
}

export const getOrder = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`)
  return response.data
}

export const createOrder = async (shippingAddress: string): Promise<Order> => {
  const response = await api.post("/orders", { shippingAddress })
  return response.data
}

export const cancelOrder = async (id: string): Promise<Order> => {
  const response = await api.post(`/orders/${id}/cancel`)
  return response.data
}

// Admin only
export const updateOrderStatus = async (id: string, status: string): Promise<Order> => {
  const response = await api.put(`/orders/${id}/status`, { status })
  return response.data
}

