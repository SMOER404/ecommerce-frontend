import apiClient from "../api-client"
import type { Order } from "@/types/order"

class OrderService {
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<Order[]>("/orders")
    return response.data
  }

  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`)
    return response.data
  }

  async createOrder(shippingAddress: string): Promise<Order> {
    const response = await apiClient.post<Order>("/orders", { shippingAddress })
    return response.data
  }

  async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.post<Order>(`/orders/${id}/cancel`)
    return response.data
  }

  // Только для администраторов
  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await apiClient.put<Order>(`/orders/${id}/status`, { status })
    return response.data
  }
}

export const orderService = new OrderService()

