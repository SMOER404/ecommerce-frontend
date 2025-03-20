import type { Product, ProductVariant } from "./product"

export interface CartItem {
  id: string
  userId: string
  productVariantId: string
  quantity: number
  productVariant: ProductVariant & {
    product: Pick<Product, "id" | "name" | "images">
  }
}

export interface CartSummary {
  subtotal: number
  tax: number
  shipping: number
  total: number
  itemCount: number
}

