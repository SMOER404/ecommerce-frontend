import type { ProductVariant } from "./product"

export enum OrderStatus {
  NEW = "new",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface OrderItem {
  id: string
  orderId: string
  productVariantId: string
  quantity: number
  price: number
  productVariant: ProductVariant
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  total: number
  paymentId: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
  items: OrderItem[]
}

