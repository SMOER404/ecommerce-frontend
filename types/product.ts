export interface ProductVariant {
  id: string
  productId: string
  color: string
  size: string
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  description: string
  images: string[]
  categoryId: string
  brandId: string
  category: {
    id: string
    name: string
  }
  brand: {
    id: string
    name: string
    logoUrl: string
  }
  variants: ProductVariant[]
}

